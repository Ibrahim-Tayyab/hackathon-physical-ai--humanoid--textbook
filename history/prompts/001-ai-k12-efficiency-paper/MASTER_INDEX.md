# 📘 Physical AI Textbook - Complete Documentation Index

## 🚀 Getting Started (Start Here!)

| Document | Purpose | Time | Audience |
|----------|---------|------|----------|
| **[DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md)** | Quick deployment summary | 5 min | Everyone |
| **[PRE_PUSH_CHECKLIST.md](./PRE_PUSH_CHECKLIST.md)** | Security checks before pushing | 5 min | Developers |
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Complete deployment instructions | 20 min | Developers |

## 📚 Core Documentation

### Project Overview
- **[physical-ai-textbook/README.md](./physical-ai-textbook/README.md)** - Project overview and quick start
- **[physical-ai-textbook/ARCHITECTURE.md](./physical-ai-textbook/ARCHITECTURE.md)** - Technical architecture

### Chatbot Backend
- **[physical-ai-textbook/CHATBOT_README.md](./physical-ai-textbook/CHATBOT_README.md)** - Backend setup and API docs
- **[physical-ai-textbook/chatbot/README.md](./physical-ai-textbook/chatbot/README.md)** - Detailed chatbot guide

### Frontend/Design
- **[HOMEPAGE_REDESIGN_COMPLETE.md](./HOMEPAGE_REDESIGN_COMPLETE.md)** - Landing page design
- **[DESIGN_REFERENCE_GUIDE.md](./DESIGN_REFERENCE_GUIDE.md)** - UI/UX guidelines

## 📋 Deployment Workflow

### Phase 1: Preparation (10 minutes)
1. Read **[DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md)**
2. Run **[PRE_PUSH_CHECKLIST.md](./PRE_PUSH_CHECKLIST.md)** checks
3. Get Google Gemini API key

### Phase 2: GitHub (5 minutes)
1. Initialize git repository
2. Verify `.gitignore` files
3. Push to GitHub

**Detailed Steps**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#github-deployment)

### Phase 3: Vercel (5 minutes)
1. Import GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

**Detailed Steps**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#vercel-deployment)

### Phase 4: Backend Setup (5 minutes)
1. Load textbook data to Qdrant
2. Update production API URL
3. Test chatbot

**Detailed Steps**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#post-deployment-tasks)

## 🗂️ Files You Must Push

### ✅ Required Files

```
physical-ai-textbook/
├── docs/                          # All textbook content (44 MDX files)
│   ├── Introduction/
│   ├── Module-1-ROS/
│   ├── Module-2-Simulation/
│   ├── Module-3-VLA/
│   ├── Module-4-Integration/
│   └── Appendices/
│
├── src/                           # React components
│   ├── components/
│   │   ├── ChatAssistant.tsx     # ⚠️ Must update API URL after deployment
│   │   ├── HomepageFeatures/
│   │   └── ModuleCards/
│   ├── pages/
│   │   └── index.tsx
│   ├── css/
│   └── theme/
│
├── chatbot/                       # Backend
│   ├── api.py                    # FastAPI server
│   ├── ingest_data.py            # Data loading
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # ✅ Push this (template)
│   ├── .gitignore                # ✅ Excludes .env
│   └── README.md
│
├── static/                        # Assets
│   ├── img/
│   └── ...
│
├── blog/                          # Blog posts
│
├── .gitignore                    # ⚠️ CRITICAL: Excludes secrets
├── docusaurus.config.ts          # Site configuration
├── sidebars.ts                   # Navigation
├── package.json                  # Dependencies + scripts
├── vercel.json                   # ⚠️ Vercel deployment config
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### ❌ NEVER Push (Verify in .gitignore)

```
❌ .env                          # Contains API keys!
❌ chatbot/.env                  # Contains API keys!
❌ node_modules/                 # Large, auto-installed
❌ chatbot/venv/                 # Python virtual env
❌ build/                        # Generated files
❌ .docusaurus/                  # Cache
❌ *.log                         # Log files
```

## 🔑 Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Source |
|----------|-------|--------|
| `QDRANT_URL` | `https://999b85bb-0895-4dd4-b996-a8256b6e6d50...` | chatbot/.env.example |
| `QDRANT_API_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | chatbot/.env.example |
| `COHERE_API_KEY` | `cyr1l2b6auE1x5RrajvIFu1I1hUOOiQb36UDo0aY` | chatbot/.env.example |
| `GOOGLE_API_KEY` | `AIza...` (your key) | [Get here](https://aistudio.google.com/apikey) |
| `COLLECTION_NAME` | `physical_ai_book` | Default |
| `TOP_K_RESULTS` | `5` | Default |
| `MODEL_NAME` | `gemini-1.5-flash` | Default |

**⚠️ Important**: Only Google Gemini key needs to be obtained. Others are provided.

## 🧪 Testing Checklist

### Before Pushing
- [ ] Run `npm run build` (should succeed)
- [ ] No `.env` files in `git status`
- [ ] No API keys in code: `git diff --cached | findstr /i "api_key"`

### After Deployment
- [ ] Homepage loads: `https://your-app.vercel.app`
- [ ] Textbook pages work: `https://your-app.vercel.app/docs/Introduction/vision`
- [ ] Health check passes: `https://your-app.vercel.app/api/health`
- [ ] Chatbot shows "Online"
- [ ] Test query works
- [ ] Sources display correctly

**Full Testing Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#testing-your-deployment)

## 🛠️ Quick Commands Reference

### Local Development
```bash
# Start frontend
npm start

# Start backend (separate terminal)
cd chatbot
venv\Scripts\activate
python api.py
```

### Build & Deploy
```bash
# Test production build
npm run build
npm run serve

# Push to GitHub (auto-deploys to Vercel)
git add .
git commit -m "Your message"
git push
```

### Backend Setup (One-Time)
```bash
cd chatbot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python ingest_data.py  # Loads textbook to Qdrant
```

## 📊 Project Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Docusaurus 3.9 + React 19 | Static site generator |
| **Styling** | Tailwind CSS 4 + Framer Motion | UI & animations |
| **Backend** | FastAPI + Python 3.9 | API server |
| **Vector DB** | Qdrant Cloud | Semantic search |
| **Embeddings** | Cohere embed-v3 | Text vectorization |
| **LLM** | Google Gemini 1.5 Flash | AI responses |
| **Hosting** | Vercel | Deployment + serverless |

## 🔗 Important Links

### Services
- **Google AI Studio**: https://aistudio.google.com/apikey (Get Gemini key)
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Qdrant Console**: https://cloud.qdrant.io/ (View vectors)
- **Cohere Dashboard**: https://dashboard.cohere.com/

### Documentation
- **Docusaurus**: https://docusaurus.io/docs
- **FastAPI**: https://fastapi.tiangolo.com/
- **Vercel Deployment**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## 📞 Support & Troubleshooting

### Common Issues

| Issue | Solution | Reference |
|-------|----------|-----------|
| Chatbot shows "Offline" | Check env vars in Vercel | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#issue-2-chatbot-shows-offline) |
| Build fails | Run `npm run build` locally | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#issue-1-failed-to-compile-error) |
| 404 errors | Check `baseUrl: '/'` in config | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#issue-3-404-not-found-on-pages) |
| Slow responses | Check `MODEL_NAME` is `flash` | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#issue-5-chatbot-responses-are-slow) |

**Full Troubleshooting**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#common-issues--solutions)

## 📈 Success Metrics

After successful deployment:

- ✅ Website loads in < 3 seconds
- ✅ Chatbot responds in 2-5 seconds
- ✅ All 44 textbook pages accessible
- ✅ Images load correctly
- ✅ Mobile-responsive
- ✅ HTTPS enabled (automatic)
- ✅ Source citations work

## 🗺️ Project Roadmap

### Completed ✅
- [x] Core textbook content (5 modules, 44 pages)
- [x] RAG chatbot with Gemini
- [x] Modern landing page
- [x] Dark theme UI
- [x] Deployment configuration
- [x] Comprehensive documentation

### Planned 🔮
- [ ] User authentication
- [ ] Progress tracking
- [ ] Quiz system
- [ ] Code playground
- [ ] Video tutorials
- [ ] Mobile app

## 📄 Document Versions

| Document | Version | Last Updated |
|----------|---------|--------------|
| DEPLOYMENT_GUIDE.md | 1.0 | Dec 7, 2025 |
| DEPLOYMENT_QUICK_REFERENCE.md | 1.0 | Dec 7, 2025 |
| PRE_PUSH_CHECKLIST.md | 1.0 | Dec 7, 2025 |
| MASTER_INDEX.md | 1.0 | Dec 7, 2025 |

## 🤝 Contributing

Want to improve the textbook or chatbot?

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Make changes
4. Test locally
5. Submit pull request

**Guidelines**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#contributing)

## 📜 License

MIT License - See LICENSE file

---

## 🎯 Next Steps

**New to the project?**
1. Start with [DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md)
2. Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) step by step
3. Use [PRE_PUSH_CHECKLIST.md](./PRE_PUSH_CHECKLIST.md) before pushing

**Already deployed?**
- Monitor Vercel Dashboard for traffic
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#post-deployment-tasks)
- Set up custom domain (optional)

**Questions?**
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#support--resources)
- Review troubleshooting section
- Create GitHub issue

---

**Total Setup Time**: ~25 minutes  
**Cost**: $0 (all free tiers)  
**Skill Level**: Beginner-friendly  

**Happy Deploying! 🚀**
