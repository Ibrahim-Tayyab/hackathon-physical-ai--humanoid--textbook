# Google Gemini Setup Guide

## 🎯 Overview
This chatbot now uses **Google Gemini** models via the OpenAI SDK compatibility layer. This keeps the chatbot **completely FREE** while maintaining the same agentic RAG architecture.

## 🔑 Get Your Free Google API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key (starts with `AIza...`)

## ⚙️ Configuration

### Update .env File
```bash
# Google Gemini API (for LLM via OpenAI SDK)
GOOGLE_API_KEY=AIzaSyC...your_actual_key_here

# Model Configuration
MODEL_NAME=gemini-1.5-flash-latest
```

### Available Models
- `gemini-1.5-flash-latest` - Stable compatibility model (recommended, free)
- `gemini-2.0-flash-exp` - Newest experimental model (availability varies)
- `gemini-1.5-pro` - More capable (free with limits)

## 🔧 How It Works

### OpenAI SDK Compatibility
Google Gemini now supports the OpenAI library format. The implementation uses:

```python
from openai import OpenAI

client = OpenAI(
    api_key=GOOGLE_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Standard OpenAI chat completions format
response = client.chat.completions.create(
  model="gemini-1.5-flash-latest",
    messages=[...],
    tools=[...],  # Function calling works!
    tool_choice="auto"
)
```

### Agentic RAG Flow
1. **User asks question** → Sent to Gemini
2. **Gemini decides** → "I need to search the textbook" (calls retrieve_knowledge tool)
3. **Retrieve context** → Semantic search via Cohere + Qdrant
4. **Gemini generates answer** → Using only retrieved context
5. **Return to user** → Answer with source citations

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd chatbot
pip install -r requirements.txt

# 2. Update .env with your Google API key
# (Edit GOOGLE_API_KEY in .env)

# 3. Load textbook data (one-time, ~20 seconds)
python ingest_data.py

# 4. Start the backend
python api.py

# 5. In new terminal, start frontend
cd ..
npm start
```

## 📊 Cost Comparison

| Service | Previous (OpenAI) | Now (Google Gemini) |
|---------|-------------------|---------------------|
| LLM Calls | $5-10 per 1K queries | **FREE** ✅ |
| Embeddings (Cohere) | $0.20 per 1K | $0.20 per 1K |
| Vector DB (Qdrant) | FREE | FREE |
| **Total Cost** | ~$5-10 per 1K | **~$0.20 per 1K** 🎉 |

**Savings: 96-98% cost reduction!**

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:8000/health
```

Expected:
```json
{
  "status": "healthy",
  "qdrant": "connected",
  "vectors": 250,
  "collection": "physical_ai_book"
}
```

### Test Chat Endpoint
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"What is ROS 2?\"}"
```

Expected: JSON response with answer and sources

### Test via UI
1. Visit http://localhost:3000
2. Click floating 🤖 button (bottom-right)
3. Type: "What is ROS 2?"
4. Should get answer with module citations

## 🔍 Verification

### Check Gemini API Key
```bash
# Windows PowerShell
$env:GOOGLE_API_KEY = "YOUR_KEY"
curl -X POST "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions" \
  -H "Authorization: Bearer $env:GOOGLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-1.5-flash-latest","messages":[{"role":"user","content":"Say hello"}]}'
```

## 🐛 Troubleshooting

### Error: "The api_key client option must be set"
**Fix:** Add GOOGLE_API_KEY to .env file

### Error: "Model not found"
**Fix:** Use `gemini-1.5-flash-latest` or another model listed by `https://generativelanguage.googleapis.com/v1beta/openai/models`

### Error: "Invalid API key"
**Fix:** Get new key from https://aistudio.google.com/app/apikey

### Error: "Rate limit exceeded"
**Solution:** Gemini free tier limits:
- 15 requests per minute
- 1500 requests per day
- Wait 60 seconds or upgrade to paid tier

### Chatbot returns generic answers (not from textbook)
**Check:**
1. Data ingestion completed: `python ingest_data.py`
2. Qdrant has vectors: Check `/health` endpoint
3. Tool calling enabled: System prompt should force retrieve_knowledge use

## 📚 API Rate Limits (Free Tier)

| Limit Type | Gemini 2.0 Flash | Gemini 1.5 Flash |
|------------|------------------|------------------|
| RPM (Requests/min) | 15 | 15 |
| RPD (Requests/day) | 1,500 | 1,500 |
| TPM (Tokens/min) | 1M | 1M |
| Cost | FREE | FREE |

**For production:** Consider upgrading to paid tier for higher limits

## 🎓 Educational Benefits

Students can:
- Ask unlimited questions (within rate limits)
- Get accurate textbook-based answers
- See source citations for verification
- Learn at their own pace

**Total cost for small course:** ~$0-5/month (Cohere embeddings only)

## 🔐 Security Notes

- Never commit .env file to Git
- Keep API keys secure
- Use environment variables in production
- Consider rate limiting on frontend for shared deployments

## 📖 Additional Resources

- [Google Gemini Documentation](https://ai.google.dev/docs)
- [OpenAI Compatibility Guide](https://ai.google.dev/gemini-api/docs/openai)
- [Function Calling with Gemini](https://ai.google.dev/gemini-api/docs/function-calling)

---

**Status:** ✅ Ready to use with Google Gemini (FREE)
**Implementation:** OpenAI SDK with base_url override
**Cost:** ~$0.20 per 1000 queries (96% savings vs OpenAI)
