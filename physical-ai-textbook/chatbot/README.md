# Physical AI Textbook - RAG Chatbot Setup Guide

This guide walks you through setting up the AI-powered chatbot for the Physical AI & Humanoid Robotics textbook.

## 🎯 Overview

The chatbot uses:
- **Qdrant Cloud** for vector storage
- **Cohere** for embeddings (embed-english-v3.0)
- **Google Gemini 1.5 Flash** for intelligent responses (via OpenAI-compatible API)
- **FastAPI** backend with agentic RAG
- **React** frontend integrated into Docusaurus

---

## 📋 Prerequisites

1. **Python 3.9+** installed
2. **Node.js 18+** installed (for Docusaurus)
3. **API Keys:**
   - ✅ Qdrant Cloud credentials (provided)
   - ✅ Cohere API key (provided)
   - ⚠️ Google Gemini API key (`GOOGLE_API_KEY` – add your own)

---

## 🚀 Quick Start

### Step 1: Install Python Dependencies

```bash
# Navigate to chatbot directory
cd physical-ai-textbook/chatbot

# Install all required packages
pip install -r requirements.txt
```

**Alternative (using virtual environment - recommended):**
```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Configure Environment Variables

```bash
# Copy example .env file
copy .env.example .env

# Edit .env file and add your Google Gemini API key
# The file already has Qdrant and Cohere keys configured
```

**Edit `.env` file:**
```bash
# Qdrant Vector Database (Already configured)
QDRANT_URL=https://999b85bb-0895-4dd4-b996-a8256b6e6d50.europe-west3-0.gcp.cloud.qdrant.io:6333
QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.Y9LhvcHGhhiLhNFGYllXGcU8vr79z1pz2S8arE51d7c

# Cohere API (Already configured)
COHERE_API_KEY=cyr1l2b6auE1x5RrajvIFu1I1hUOOiQb36UDo0aY

# Google Gemini API (ADD YOUR KEY HERE)
GOOGLE_API_KEY=your-gemini-api-key

# Optional Configuration
COLLECTION_NAME=physical_ai_book
CHUNK_SIZE=800
CHUNK_OVERLAP=100
TOP_K_RESULTS=5
```

### Step 3: Ingest Textbook Data

This step loads all MDX files, chunks them, embeds with Cohere, and stores in Qdrant.

```bash
# Make sure you're in the chatbot directory
cd chatbot

# Run the ingestion script
python ingest_data.py
```

**Expected Output:**
```
==================================================
Physical AI Textbook - Data Ingestion Pipeline
==================================================

1. Loading MDX files...
Loading MDX files: 100%|████████████| 44/44 [00:02<00:00]
Loaded 44 documents

2. Creating Qdrant collection...
Deleted existing collection: physical_ai_book
Created collection: physical_ai_book

3. Embedding and upserting to Qdrant...
Processing documents: 100%|████████| 44/44 [00:15<00:00]
Successfully upserted 523 chunks to Qdrant

==================================================
✅ Ingestion Complete!
Collection: physical_ai_book
Total vectors: 523
==================================================
```

### Step 4: Start the Backend Server

```bash
# Start FastAPI server (from chatbot directory)
python api.py

# Or use uvicorn directly for hot-reload during development
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Test the API:**
```bash
# Health check
curl http://localhost:8000/health

# Test search (optional)
curl -X POST http://localhost:8000/search?query=What%20is%20ROS%202
```

### Step 5: Start Docusaurus Frontend

```bash
# Open a new terminal, navigate to project root
cd physical-ai-textbook

# Start Docusaurus dev server
npm start
```

The site will open at **http://localhost:3000**

---

## 💬 Using the Chatbot

1. **Access any docs page** (e.g., http://localhost:3000/docs/Introduction/vision)
2. **Click the floating robot button** in the bottom-right corner
3. **Ask questions** like:
   - "What is ROS 2?"
   - "Explain inverse kinematics for humanoid robots"
   - "How do I implement a ROS 2 publisher?"
   - "What are VLA models?"
   - "Show me example code for URDF"

The AI will:
- ✅ Retrieve relevant textbook sections
- ✅ Answer based ONLY on textbook content
- ✅ Show source citations (module/chapter)
- ✅ Refuse to hallucinate if info isn't in the book

---

## 🛠️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   STUDENT                           │
│            (Docusaurus Frontend)                    │
└───────────────────┬─────────────────────────────────┘
                    │ HTTP POST /chat
                    ▼
┌─────────────────────────────────────────────────────┐
│              FastAPI Backend                        │
│           (api.py - Port 8000)                      │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Gemini Agent (Gemini 1.5 Flash)             │  │
│  │  - OpenAI-compatible function calling        │  │
│  │  - retrieve_knowledge() tool                 │  │
│  └──────────────┬───────────────────────────────┘  │
│                 │                                    │
└─────────────────┼────────────────────────────────────┘
                  │
                  │ 1. Query → Cohere Embed
                  │ 2. Search → Qdrant
                  │ 3. Retrieve Context
                  ▼
    ┌─────────────────────────┐      ┌──────────────┐
    │   Cohere Embeddings     │      │   Qdrant     │
    │   (embed-english-v3.0)  │◄────►│  (Cloud DB)  │
    └─────────────────────────┘      └──────────────┘
                                       523 vectors
                                       (textbook chunks)
```

---

## 📁 Project Structure

```
physical-ai-textbook/
├── chatbot/
│   ├── .env                    # Environment variables (CREATE THIS)
│   ├── .env.example            # Template
│   ├── requirements.txt        # Python dependencies
│   ├── ingest_data.py         # Data ingestion pipeline
│   └── api.py                 # FastAPI backend
├── src/
│   ├── components/
│   │   └── ChatAssistant.tsx  # React chat UI
│   └── theme/
│       └── Root.tsx           # Docusaurus layout integration
└── docs/                       # Textbook MDX files (44 files)
```

---

## 🔧 Configuration Options

### Adjust Retrieval Settings

Edit `.env` to tune RAG performance:

```bash
# Number of text chunks to retrieve per query
TOP_K_RESULTS=5          # Default: 5 (increase for more context)

# Chunk size (tokens per chunk)
CHUNK_SIZE=800           # Default: 800 (increase for longer chunks)

# Overlap between chunks
CHUNK_OVERLAP=100        # Default: 100 (higher = more context preservation)
```

### Change LLM Model

Edit `api.py` line 139:

```python
# Use GPT-4o (default - most intelligent)
model="gpt-4o"

# Or use GPT-4o-mini (faster, cheaper)
model="gpt-4o-mini"

# Or use GPT-3.5-turbo (cheapest)
model="gpt-3.5-turbo"
```

### Customize System Prompt

Edit `SYSTEM_PROMPT` in `api.py` (lines 112-127) to change the AI's personality or rules.

---

## 🧪 Testing the System

### Test 1: Health Check
```bash
curl http://localhost:8000/health
```
**Expected:** `{"status":"healthy","qdrant":"connected","vectors":523}`

### Test 2: Direct Search (No LLM)
```bash
curl -X POST "http://localhost:8000/search?query=ROS%202%20nodes&top_k=3"
```
**Expected:** JSON with top 3 relevant chunks

### Test 3: Chat Endpoint
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is ROS 2?",
    "conversation_history": []
  }'
```
**Expected:** JSON with AI response + sources

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'X'"
**Solution:** Reinstall dependencies
```bash
pip install -r requirements.txt
```

### Issue: "Connection refused to Qdrant"
**Solution:** Check your `.env` file has correct `QDRANT_URL` and `QDRANT_API_KEY`

### Issue: "Gemini API error"
**Solution:** Verify your `GOOGLE_API_KEY` in `.env` is valid and has quota

### Issue: "No vectors in collection"
**Solution:** Re-run the ingestion script
```bash
python ingest_data.py
```

### Issue: "CORS error in browser"
**Solution:** The API already has CORS enabled for `localhost:3000`. If using a different port, update `api.py` line 40.

### Issue: Chat button doesn't appear
**Solution:** 
1. Check `src/theme/Root.tsx` exists
2. Restart Docusaurus: `npm start`
3. Clear browser cache

---

## 📊 Performance Benchmarks

**Ingestion:**
- 44 MDX files → ~523 chunks
- Processing time: ~15-20 seconds
- Cohere embed-english-v3.0: 1024 dimensions

**Query Performance:**
- Embedding: ~100ms
- Qdrant search: ~50ms
- Gemini response: ~1-3 seconds
- **Total latency: ~1.5-3.5 seconds**

---

## 💰 Cost Estimates (per 1000 queries)

- **Cohere Embeddings:** ~$0.10 (embed-english-v3.0)
- **Gemini 1.5 Flash:** ~$2-4 (depending on context length)
- **Qdrant Cloud:** Free tier (1GB)
- **Total:** ~$3-5 per 1000 queries

**Cost Optimization Tips:**
1. Use a lighter Gemini variant (e.g., `gemini-1.5-flash-latest`) if latency or cost spikes.
2. Reduce `TOP_K_RESULTS` from 5 to 3.
3. Cache common queries.

---

## 🚀 Production Deployment

### Backend (FastAPI)
Deploy on:
- **Render.com** (free tier available)
- **Railway.app** (easy deployment)
- **AWS EC2** (scalable)

### Frontend (Docusaurus)
- Already integrated - just deploy your Docusaurus site normally
- Update `API_URL` in `ChatAssistant.tsx` to your production backend URL

### Environment Variables
Make sure to set all `.env` variables on your hosting platform.

---

## 📚 Additional Resources

- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Cohere Embeddings API](https://docs.cohere.com/docs/embeddings)
- [Gemini OpenAI-Compatible API](https://ai.google.dev/gemini-api/docs/openai)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

---

## 🎓 How It Works (Student-Friendly Explanation)

1. **Ingestion:** All textbook chapters are split into 500-800 token chunks and converted into vectors (numbers representing meaning) using Cohere AI.

2. **Storage:** These vectors are stored in Qdrant (a specialized database for searching by meaning, not keywords).

3. **Query:** When you ask a question:
   - Your question is converted to a vector
   - Qdrant finds the 5 most similar textbook chunks
   - Gemini 1.5 Flash reads those chunks and answers your question

4. **Safety:** The AI is programmed to ONLY use textbook content, never making up information.

---

**Setup Complete! 🎉**

If you encounter any issues, check the troubleshooting section or raise an issue on GitHub.

*Happy Learning!* 🤖📚
