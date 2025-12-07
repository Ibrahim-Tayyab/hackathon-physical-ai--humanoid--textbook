"""
Test script to verify the RAG chatbot setup
"""

import os
import sys
from dotenv import load_dotenv

def test_environment():
    """Test if all environment variables are set"""
    print("=" * 50)
    print("Testing Environment Variables")
    print("=" * 50)
    
    load_dotenv()
    
    required_vars = [
        "QDRANT_URL",
        "QDRANT_API_KEY",
        "COHERE_API_KEY",
        "OPENAI_API_KEY"
    ]
    
    missing = []
    for var in required_vars:
        value = os.getenv(var)
        if not value or value == "your_openai_api_key_here":
            print(f"❌ {var}: Missing or not configured")
            missing.append(var)
        else:
            # Show first 10 chars for security
            masked = value[:10] + "..." if len(value) > 10 else value
            print(f"✅ {var}: {masked}")
    
    if missing:
        print(f"\n⚠️  Please configure: {', '.join(missing)}")
        return False
    
    print("\n✅ All environment variables configured!")
    return True


def test_dependencies():
    """Test if all required packages are installed"""
    print("\n" + "=" * 50)
    print("Testing Python Dependencies")
    print("=" * 50)
    
    required_packages = [
        "fastapi",
        "uvicorn",
        "qdrant_client",
        "cohere",
        "openai",
        "python-dotenv",
        "langchain"
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package.replace("-", "_"))
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package}: Not installed")
            missing.append(package)
    
    if missing:
        print(f"\n⚠️  Run: pip install {' '.join(missing)}")
        return False
    
    print("\n✅ All dependencies installed!")
    return True


def test_qdrant_connection():
    """Test connection to Qdrant"""
    print("\n" + "=" * 50)
    print("Testing Qdrant Connection")
    print("=" * 50)
    
    try:
        from qdrant_client import QdrantClient
        load_dotenv()
        
        client = QdrantClient(
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY")
        )
        
        # Try to get collection info
        collections = client.get_collections()
        print(f"✅ Connected to Qdrant")
        print(f"   Collections: {len(collections.collections)}")
        
        # Check if our collection exists
        collection_name = os.getenv("COLLECTION_NAME", "physical_ai_book")
        try:
            info = client.get_collection(collection_name=collection_name)
            print(f"✅ Collection '{collection_name}' exists")
            print(f"   Vectors: {info.points_count}")
        except Exception:
            print(f"⚠️  Collection '{collection_name}' not found")
            print("   Run: python ingest_data.py")
        
        return True
    
    except Exception as e:
        print(f"❌ Qdrant connection failed: {str(e)}")
        return False


def test_cohere_api():
    """Test Cohere API"""
    print("\n" + "=" * 50)
    print("Testing Cohere API")
    print("=" * 50)
    
    try:
        import cohere
        load_dotenv()
        
        client = cohere.Client(os.getenv("COHERE_API_KEY"))
        
        # Test embedding
        response = client.embed(
            texts=["Test embedding"],
            model="embed-english-v3.0",
            input_type="search_query"
        )
        
        print(f"✅ Cohere API working")
        print(f"   Embedding dimension: {len(response.embeddings[0])}")
        return True
    
    except Exception as e:
        print(f"❌ Cohere API failed: {str(e)}")
        return False


def test_openai_api():
    """Test OpenAI API"""
    print("\n" + "=" * 50)
    print("Testing OpenAI API")
    print("=" * 50)
    
    try:
        from openai import OpenAI
        load_dotenv()
        
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Test simple completion
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "Say 'API test successful'"}],
            max_tokens=10
        )
        
        print(f"✅ OpenAI API working")
        print(f"   Model: gpt-4o-mini")
        print(f"   Response: {response.choices[0].message.content}")
        return True
    
    except Exception as e:
        print(f"❌ OpenAI API failed: {str(e)}")
        if "api_key" in str(e).lower():
            print("   Check your OPENAI_API_KEY in .env")
        return False


def test_docs_directory():
    """Test if docs directory exists and has MDX files"""
    print("\n" + "=" * 50)
    print("Testing Documentation Files")
    print("=" * 50)
    
    docs_path = "../docs"
    if not os.path.exists(docs_path):
        print(f"❌ Docs directory not found at: {docs_path}")
        return False
    
    from pathlib import Path
    mdx_files = list(Path(docs_path).rglob("*.mdx"))
    md_files = list(Path(docs_path).rglob("*.md"))
    
    total_files = len(mdx_files) + len(md_files)
    print(f"✅ Found {total_files} documentation files")
    print(f"   MDX: {len(mdx_files)}")
    print(f"   MD: {len(md_files)}")
    
    return True


def main():
    """Run all tests"""
    print("\n" + "=" * 50)
    print("Physical AI Chatbot - System Check")
    print("=" * 50 + "\n")
    
    tests = [
        ("Environment Variables", test_environment),
        ("Python Dependencies", test_dependencies),
        ("Qdrant Connection", test_qdrant_connection),
        ("Cohere API", test_cohere_api),
        ("OpenAI API", test_openai_api),
        ("Documentation Files", test_docs_directory)
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n❌ {name} test crashed: {str(e)}")
            results.append((name, False))
    
    # Summary
    print("\n" + "=" * 50)
    print("Test Summary")
    print("=" * 50)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! System is ready.")
        print("\nNext steps:")
        print("1. Run: python ingest_data.py (if collection not found)")
        print("2. Run: python api.py")
        print("3. Run: npm start (in parent directory)")
    else:
        print("\n⚠️  Some tests failed. Fix the issues above and try again.")
        sys.exit(1)


if __name__ == "__main__":
    main()
