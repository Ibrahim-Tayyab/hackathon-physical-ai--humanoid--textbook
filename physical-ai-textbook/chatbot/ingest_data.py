"""
Data Ingestion Pipeline for Physical AI Textbook
Loads MDX files, chunks them, embeds with Cohere, and stores in Qdrant
"""

import os
import re
from pathlib import Path
from typing import List, Dict
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import cohere
from tqdm import tqdm
import hashlib

# Load environment variables
load_dotenv()

# Configuration
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "physical_ai_book")
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "800"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "100"))
DOCS_DIR = "../docs"

# Initialize clients
qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
cohere_client = cohere.Client(COHERE_API_KEY)


def extract_frontmatter_and_content(file_content: str) -> Dict[str, str]:
    """Extract MDX frontmatter and content"""
    frontmatter_pattern = r'^---\n(.*?)\n---\n(.*)$'
    match = re.match(frontmatter_pattern, file_content, re.DOTALL)
    
    if match:
        frontmatter_raw = match.group(1)
        content = match.group(2)
        
        # Parse frontmatter
        frontmatter = {}
        for line in frontmatter_raw.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                frontmatter[key.strip()] = value.strip().strip('"\'')
        
        return {
            'title': frontmatter.get('title', 'Untitled'),
            'sidebar_position': frontmatter.get('sidebar_position', ''),
            'content': content
        }
    
    return {'title': 'Untitled', 'sidebar_position': '', 'content': file_content}


def clean_mdx_content(content: str) -> str:
    """Clean MDX content while preserving code blocks"""
    # Remove JSX/React imports
    content = re.sub(r'^import .+$', '', content, flags=re.MULTILINE)
    
    # Remove HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Preserve code blocks but clean other formatting
    # Split by code blocks
    code_block_pattern = r'(```[\s\S]*?```)'
    parts = re.split(code_block_pattern, content)
    
    cleaned_parts = []
    for i, part in enumerate(parts):
        if part.startswith('```'):
            # Keep code blocks as-is
            cleaned_parts.append(part)
        else:
            # Clean non-code content
            part = re.sub(r'<[^>]+>', '', part)  # Remove HTML tags
            part = re.sub(r'\n{3,}', '\n\n', part)  # Normalize line breaks
            cleaned_parts.append(part)
    
    return ''.join(cleaned_parts).strip()


def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> List[str]:
    """
    Chunk text into overlapping segments while respecting code blocks and sections
    """
    chunks = []
    
    # Split by major sections (h2 headers)
    sections = re.split(r'\n## ', text)
    
    for i, section in enumerate(sections):
        if i > 0:
            section = '## ' + section  # Re-add header
        
        # Check if section is small enough
        if len(section) <= chunk_size:
            if section.strip():
                chunks.append(section.strip())
            continue
        
        # Split large sections by paragraphs
        paragraphs = section.split('\n\n')
        current_chunk = ""
        
        for para in paragraphs:
            # If paragraph contains code block, treat specially
            if '```' in para:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                    current_chunk = ""
                chunks.append(para.strip())
            elif len(current_chunk) + len(para) < chunk_size:
                current_chunk += para + "\n\n"
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = para + "\n\n"
        
        if current_chunk.strip():
            chunks.append(current_chunk.strip())
    
    return chunks


def load_mdx_files(docs_dir: str) -> List[Dict]:
    """Load all MDX files from docs directory"""
    docs_path = Path(docs_dir)
    mdx_files = list(docs_path.rglob("*.mdx")) + list(docs_path.rglob("*.md"))
    
    documents = []
    
    for file_path in tqdm(mdx_files, desc="Loading MDX files"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            parsed = extract_frontmatter_and_content(content)
            cleaned_content = clean_mdx_content(parsed['content'])
            
            # Get relative path for metadata
            relative_path = file_path.relative_to(docs_path)
            
            # Extract module/chapter info from path
            path_parts = str(relative_path).split(os.sep)
            module = path_parts[0] if len(path_parts) > 0 else "General"
            
            documents.append({
                'file_path': str(relative_path),
                'title': parsed['title'],
                'module': module,
                'content': cleaned_content
            })
        
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
    
    return documents


def create_collection():
    """Create or recreate Qdrant collection"""
    try:
        qdrant_client.delete_collection(collection_name=COLLECTION_NAME)
        print(f"Deleted existing collection: {COLLECTION_NAME}")
    except Exception:
        pass
    
    # Create collection with Cohere embedding dimensions (1024 for embed-english-v3.0)
    qdrant_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=1024, distance=Distance.COSINE)
    )
    print(f"Created collection: {COLLECTION_NAME}")


def embed_and_upsert(documents: List[Dict]):
    """Embed document chunks and upsert to Qdrant"""
    
    def chunk_text_local(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> List[str]:
        """Chunk text into overlapping segments while respecting code blocks and sections"""
        chunks = []
        
        # Split by major sections (h2 headers)
        sections = re.split(r'\n## ', text)
        
        for i, section in enumerate(sections):
            if i > 0:
                section = '## ' + section  # Re-add header
            
            # Check if section is small enough
            if len(section) <= chunk_size:
                if section.strip():
                    chunks.append(section.strip())
                continue
            
            # Split large sections by paragraphs
            paragraphs = section.split('\n\n')
            current_chunk = ""
            
            for para in paragraphs:
                # If paragraph contains code block, treat specially
                if '```' in para:
                    if current_chunk:
                        chunks.append(current_chunk.strip())
                        current_chunk = ""
                    chunks.append(para.strip())
                elif len(current_chunk) + len(para) < chunk_size:
                    current_chunk += para + "\n\n"
                else:
                    if current_chunk:
                        chunks.append(current_chunk.strip())
                    current_chunk = para + "\n\n"
            
            if current_chunk.strip():
                chunks.append(current_chunk.strip())
        
        return chunks
    
    all_points = []
    point_id = 0
    
    for doc in tqdm(documents, desc="Processing documents"):
        chunks = chunk_text_local(doc['content'])
        
        if not chunks:
            continue
        
        # Batch embed chunks (Cohere supports batch embedding)
        try:
            response = cohere_client.embed(
                texts=chunks,
                model='embed-english-v3.0',
                input_type='search_document'
            )
            
            embeddings = response.embeddings
            
            for chunk_text, embedding in zip(chunks, embeddings):
                # Create unique ID
                chunk_id = hashlib.md5(
                    f"{doc['file_path']}_{point_id}".encode()
                ).hexdigest()
                
                point = PointStruct(
                    id=point_id,
                    vector=embedding,
                    payload={
                        'text': chunk_text,
                        'file_path': doc['file_path'],
                        'title': doc['title'],
                        'module': doc['module'],
                        'chunk_id': chunk_id
                    }
                )
                
                all_points.append(point)
                point_id += 1
                
                # Batch upsert every 100 points
                if len(all_points) >= 100:
                    qdrant_client.upsert(
                        collection_name=COLLECTION_NAME,
                        points=all_points
                    )
                    all_points = []
        
        except Exception as e:
            print(f"Error embedding document {doc['file_path']}: {e}")
    
    # Upsert remaining points
    if all_points:
        qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            points=all_points
        )
    
    print(f"Successfully upserted {point_id} chunks to Qdrant")


def main():
    """Main ingestion pipeline"""
    print("=" * 50)
    print("Physical AI Textbook - Data Ingestion Pipeline")
    print("=" * 50)
    
    # Validate environment variables
    if not all([QDRANT_URL, QDRANT_API_KEY, COHERE_API_KEY]):
        raise ValueError("Missing required environment variables. Check .env file.")
    
    print("\n1. Loading MDX files...")
    documents = load_mdx_files(DOCS_DIR)
    print(f"Loaded {len(documents)} documents")
    
    print("\n2. Creating Qdrant collection...")
    create_collection()
    
    print("\n3. Embedding and upserting to Qdrant...")
    embed_and_upsert(documents)
    
    # Get collection info
    collection_info = qdrant_client.get_collection(collection_name=COLLECTION_NAME)
    print("\n" + "=" * 50)
    print(f"✅ Ingestion Complete!")
    print(f"Collection: {COLLECTION_NAME}")
    print(f"Total vectors: {collection_info.points_count}")
    print("=" * 50)


if __name__ == "__main__":
    main()
