# Physical AI Textbook - RAG Chatbot 🤖📚

An intelligent AI tutor chatbot for the **Physical AI & Humanoid Robotics** textbook, built with RAG (Retrieval-Augmented Generation) and agentic workflows.

## 🌟 Features

- ✅ **Semantic Search** - Uses Cohere embeddings + Qdrant vector DB
- ✅ **Agentic RAG** - OpenAI GPT-4o with function calling
- ✅ **Source Citations** - Shows which chapter/module each answer comes from
- ✅ **No Hallucinations** - Answers ONLY from textbook content
- ✅ **Beautiful UI** - Professional brown/gold theme matching the site
- ✅ **Fast Responses** - ~1.5-3.5 second latency
- ✅ **Easy Integration** - Embedded directly in Docusaurus

## 🎬 Demo

![Chatbot Demo](demo.gif)

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Python 3.9+
- Node.js 18+
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Step 1: Setup Backend

```bash
# Navigate to chatbot directory
cd physical-ai-textbook/chatbot

# Run automated setup (Windows)
setup.bat

# Or manual setup
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### Step 2: Configure API Keys

Edit `chatbot/.env` and add your OpenAI key:

```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

(Qdrant and Cohere keys are already configured)

### Step 3: Load Textbook Data

```bash
python ingest_data.py
```

This will:
- Load 44 MDX files
- Chunk them into ~523 segments
- Embed with Cohere
- Store in Qdrant Cloud

### Step 4: Start Backend Server

```bash
python api.py
# Or: uvicorn api:app --reload
```

Server runs at http://localhost:8000

### Step 5: Start Frontend

```bash
# In parent directory
cd ..
npm start
```

Site opens at http://localhost:3000

**🎉 Done! Click the robot button in bottom-right corner to chat.**

## 📁 Project Structure

```
chatbot/
├── .env                    # API keys (CREATE THIS)
├── .env.example            # Template
├── requirements.txt        # Python dependencies
├── ingest_data.py         # Data loading pipeline
├── api.py                 # FastAPI backend
├── README.md              # This file
├── setup.bat              # Automated setup (Windows)
├── setup.sh               # Automated setup (Mac/Linux)
└── start_backend.bat      # Quick start script
```

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Vector DB** | Qdrant Cloud | Store textbook embeddings |
| **Embeddings** | Cohere embed-english-v3.0 | Convert text to vectors |
| **LLM** | OpenAI GPT-4o | Generate intelligent answers |
| **Backend** | FastAPI | API server with CORS |
| **Frontend** | React + Framer Motion | Beautiful chat UI |
| **Framework** | Docusaurus | Documentation site |

## 📊 Architecture

```
Student → React UI → FastAPI → OpenAI Agent
                              ↓ (function call)
                         retrieve_knowledge()
                              ↓
                         Cohere Embed
                              ↓
                         Qdrant Search
                              ↓
                         Return Context
                              ↓
                    OpenAI generates answer
```

## 🧪 API Endpoints

### Health Check
```bash
GET http://localhost:8000/health
```

### Chat
```bash
POST http://localhost:8000/chat
Content-Type: application/json

{
  "message": "What is ROS 2?",
  "conversation_history": []
}
```

### Direct Search (for testing)
```bash
POST http://localhost:8000/search?query=inverse%20kinematics&top_k=3
```

## 💡 Usage Examples

**Student:** "What is ROS 2?"

**AI Tutor:** "ROS 2 (Robot Operating System 2) is an open-source middleware framework for building robot applications. Key features include:
- Real-time performance with DDS
- Distributed architecture
- Quality of Service (QoS) settings
- Built-in security

*Source: Module 1 - ROS 2 Foundations*"

---

**Student:** "Show me code for a ROS 2 publisher"

**AI Tutor:** "Here's a basic ROS 2 publisher in Python:
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        # ... rest of code
```

*Source: Module 1 - ROS 2 Python (rclpy)*"

## ⚙️ Configuration

### Adjust Retrieval Quality

Edit `.env`:

```bash
TOP_K_RESULTS=5          # Retrieve top 5 chunks (increase for more context)
CHUNK_SIZE=800           # 800 tokens per chunk
CHUNK_OVERLAP=100        # 100 token overlap between chunks
```

### Change LLM Model

Edit `api.py` line 139:

```python
model="gpt-4o"          # Most intelligent (default)
# model="gpt-4o-mini"   # Faster, 75% cheaper
# model="gpt-3.5-turbo" # Cheapest
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Connection refused" | Check backend is running: `python api.py` |
| "OpenAI API error" | Verify your API key in `.env` has credits |
| "No vectors in collection" | Run `python ingest_data.py` again |
| "CORS error" | Backend CORS already configured for localhost:3000 |
| Chat button doesn't show | Restart Docusaurus: `npm start` |

## 📈 Performance

- **Ingestion:** 44 files → 523 chunks in ~15-20 seconds
- **Query Latency:** 
  - Embedding: ~100ms
  - Vector search: ~50ms
  - LLM response: ~1-3s
  - **Total: ~1.5-3.5 seconds**

## 💰 Cost Estimates

Per 1000 queries:
- Cohere embeddings: ~$0.10
- OpenAI GPT-4o: ~$5-10
- Qdrant Cloud: Free (1GB)
- **Total: ~$5-10**

Use GPT-4o-mini to reduce costs by 75%.

## 🚀 Production Deployment

### Backend
Deploy on:
- Render.com (free tier)
- Railway.app
- AWS EC2

Update `API_URL` in `src/components/ChatAssistant.tsx` to your production URL.

### Environment Variables
Set on hosting platform:
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `COHERE_API_KEY`
- `OPENAI_API_KEY`

## 📚 How It Works

1. **Ingestion:** Textbook chapters are chunked and embedded using Cohere's `embed-english-v3.0` model (1024 dimensions)

2. **Storage:** Embeddings stored in Qdrant Cloud with metadata (title, module, file path)

3. **Query Processing:**
   - Student asks a question
   - Question is embedded using Cohere
   - Top 5 similar chunks retrieved from Qdrant
   - Chunks passed to OpenAI GPT-4o

4. **Agentic Response:**
   - OpenAI agent has access to `retrieve_knowledge()` function
   - Uses function calling to search textbook
   - Generates answer ONLY from retrieved context
   - Refuses to hallucinate if answer not found

5. **Citation:** Shows source module/chapter for transparency

## 🔒 Security & Safety

- ✅ API keys stored in `.env` (not committed to git)
- ✅ CORS restricted to localhost during dev
- ✅ Rate limiting (implement for production)
- ✅ Agent constitution prevents hallucination

## 🤝 Contributing

This is a course project. For improvements:
1. Fork the repo
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - Educational use encouraged

## 👨‍💻 Author

**Muhammed Ibrahim**
- GitHub: [@Ibrahim-Tayyab](https://github.com/Ibrahim-Tayyab)
- Textbook: [Physical AI & Humanoid Robotics](https://github.com/Ibrahim-Tayyab?tab=repositories)

## 🙏 Acknowledgments

- OpenAI for GPT-4o
- Cohere for embeddings
- Qdrant for vector database
- Docusaurus team for awesome framework

---

**Ready to teach robots with AI? Let's go! 🤖🚀**

For detailed setup instructions, see [chatbot/README.md](README.md)
