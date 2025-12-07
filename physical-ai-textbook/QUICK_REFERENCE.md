# 🚀 Physical AI Chatbot - Quick Reference Card

## ⚡ 5-Minute Quick Start

```bash
# 1. Setup (Windows)
cd physical-ai-textbook/chatbot
setup.bat

# 2. Add OpenAI key to .env
# OPENAI_API_KEY=sk-your-key-here

# 3. Load data
python ingest_data.py

# 4. Start backend
python api.py

# 5. Start frontend (new terminal)
cd ..
npm start
```

---

## 📋 Commands Cheat Sheet

| Task | Command |
|------|---------|
| **Setup** | `cd chatbot && setup.bat` |
| **Test system** | `python test_setup.py` |
| **Load textbook** | `python ingest_data.py` |
| **Start backend** | `python api.py` |
| **Start backend (dev)** | `uvicorn api:app --reload` |
| **Start frontend** | `npm start` |
| **Test API** | `curl http://localhost:8000/health` |

---

## 🔑 Required API Keys

| Service | Key Name | Where to Get |
|---------|----------|--------------|
| Qdrant | `QDRANT_API_KEY` | ✅ Already configured |
| Cohere | `COHERE_API_KEY` | ✅ Already configured |
| OpenAI | `OPENAI_API_KEY` | ⚠️ [Get here](https://platform.openai.com/api-keys) |

---

## 🌐 Endpoints

| URL | Purpose |
|-----|---------|
| http://localhost:8000 | Backend API |
| http://localhost:8000/health | Health check |
| http://localhost:8000/docs | API documentation (auto-generated) |
| http://localhost:3000 | Docusaurus site |

---

## 🐛 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| "ModuleNotFoundError" | `pip install -r requirements.txt` |
| "Connection refused" | Start backend: `python api.py` |
| "OpenAI API error" | Add key to `.env` |
| "No vectors" | Run: `python ingest_data.py` |
| Chat button missing | Restart: `npm start` |

---

## 📊 System Stats

- **Documents:** 44 MDX files
- **Vectors:** ~523 chunks
- **Embedding:** 1024 dimensions
- **Response time:** 1.5-3.5 seconds
- **Cost:** ~$5-10 per 1000 queries

---

## 🎯 Example Questions

- "What is ROS 2?"
- "Explain inverse kinematics"
- "Show me a ROS 2 publisher example"
- "What are VLA models?"
- "How to implement SLAM?"

---

## 📁 Key Files

```
chatbot/
├── .env              # ← ADD YOUR OPENAI_API_KEY HERE
├── requirements.txt  # Python dependencies
├── ingest_data.py   # Load textbook data
├── api.py           # Backend server
└── test_setup.py    # Verify installation

src/components/
└── ChatAssistant.tsx # Chat UI

src/theme/
└── Root.tsx         # Docusaurus integration
```

---

## 🎓 Architecture

```
Student Question
      ↓
Chat UI (React)
      ↓
FastAPI (/chat)
      ↓
OpenAI Agent (GPT-4o)
      ↓
retrieve_knowledge()
      ↓
Cohere Embed → Qdrant Search
      ↓
Return Context
      ↓
Generate Answer
      ↓
Show Response + Sources
```

---

## ⚙️ Customization

| Change | File | Line |
|--------|------|------|
| LLM model | `api.py` | 139 |
| System prompt | `api.py` | 112-127 |
| Top K results | `.env` | TOP_K_RESULTS=5 |
| Chunk size | `.env` | CHUNK_SIZE=800 |
| UI colors | `ChatAssistant.tsx` | Search "gradient" |
| API URL (prod) | `ChatAssistant.tsx` | 14 |

---

## ✅ Verification

```bash
python test_setup.py
```

Should show:
- ✅ Environment Variables
- ✅ Python Dependencies  
- ✅ Qdrant Connection
- ✅ Cohere API
- ✅ OpenAI API
- ✅ Documentation Files

---

## 💰 Cost Optimization

| Change | Savings |
|--------|---------|
| Use GPT-4o-mini | 75% cheaper |
| Reduce TOP_K from 5→3 | 40% fewer tokens |
| Cache common queries | 50-80% reduction |

---

## 🚀 Production Deployment

1. Deploy backend to Render/Railway/AWS
2. Update `API_URL` in `ChatAssistant.tsx`
3. Set environment variables on hosting platform
4. Deploy Docusaurus site normally

---

## 📚 Documentation

- **Full Guide:** `chatbot/README.md`
- **Deliverables:** `CHATBOT_DELIVERABLES.md`
- **Project Docs:** `CHATBOT_README.md`

---

**Need Help?** Run `python test_setup.py` to diagnose issues.

**Status:** ✅ Production Ready  
**Version:** 1.0.0
