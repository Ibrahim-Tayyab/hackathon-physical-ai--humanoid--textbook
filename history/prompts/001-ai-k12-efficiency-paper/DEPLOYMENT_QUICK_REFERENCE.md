# 🚀 Quick Deployment Summary

## What You Need to Push

### ✅ Essential Files
```
physical-ai-textbook/
├── docs/              ← All textbook content
├── src/               ← React components (ChatAssistant.tsx)
├── static/            ← Images and assets
├── chatbot/
│   ├── api.py        ← FastAPI backend
│   ├── ingest_data.py
│   ├── requirements.txt
│   └── .env.example  ← Template only (NO .env file!)
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
├── vercel.json       ← Deployment config
├── .gitignore        ← Excludes secrets
└── README.md
```

### ❌ NEVER Push
- `.env` files (contain API keys!)
- `node_modules/`
- `build/`
- `chatbot/venv/`
- `.docusaurus/`

## Deployment Steps

### 1. GitHub Setup (5 minutes)

```bash
cd e:\Hackathon_AI\hackathon-youtube\physical-ai-textbook

# Verify .env is NOT staged
git status | findstr .env
# Should show NOTHING. If it shows .env, add to .gitignore!

# Add all files
git add .

# Commit
git commit -m "Initial commit: Physical AI textbook with RAG chatbot"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR-USERNAME/physical-ai-textbook.git
git push -u origin main
```

### 2. Vercel Deployment (5 minutes)

1. **Go to [vercel.com](https://vercel.com)** → Sign up with GitHub
2. **Click "New Project"** → Import `physical-ai-textbook`
3. **Configure Settings**:
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Add Environment Variables** (7 required):
   ```
   QDRANT_URL=https://999b85bb-0895-4dd4-b996-a8256b6e6d50.europe-west3-0.gcp.cloud.qdrant.io:6333
   QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.Y9LhvcHGhhiLhNFGYllXGcU8vr79z1pz2S8arE51d7c
   COHERE_API_KEY=cyr1l2b6auE1x5RrajvIFu1I1hUOOiQb36UDo0aY
   GOOGLE_API_KEY=<YOUR_KEY_FROM_GOOGLE_AI_STUDIO>
   COLLECTION_NAME=physical_ai_book
   TOP_K_RESULTS=5
   MODEL_NAME=gemini-1.5-flash
   ```

5. **Click "Deploy"** → Wait 3-5 minutes

### 3. Update Production URL

After deployment, copy your Vercel URL (e.g., `https://physical-ai-xxxxx.vercel.app`)

Edit `src/components/ChatAssistant.tsx` line 18:
```typescript
const API_URL = typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
    ? 'https://physical-ai-xxxxx.vercel.app/api'  // YOUR ACTUAL URL
    : 'http://localhost:8000';
```

Commit and push:
```bash
git add src/components/ChatAssistant.tsx
git commit -m "Update production API URL"
git push
```

Vercel auto-deploys in ~2 minutes.

### 4. Load Vector Database (One-Time, 5 minutes)

Run locally:
```bash
cd e:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\chatbot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env and add your GOOGLE_API_KEY

# Load data
python ingest_data.py
```

Should show:
```
✓ Loaded 44 MDX files
✓ Created 523 chunks
✓ Stored in Qdrant
```

This uploads textbook content to Qdrant Cloud. Only needs to be done ONCE.

## Testing Checklist

### Frontend
- [ ] Visit `https://your-app.vercel.app`
- [ ] Homepage loads with hero section
- [ ] Navigation to textbook works
- [ ] Images load correctly

### Backend
- [ ] Test health: `https://your-app.vercel.app/api/health`
- [ ] Should return JSON with `"status": "healthy"`

### Chatbot
- [ ] Robot icon (🤖) visible in bottom-right
- [ ] Click to open chat
- [ ] Status shows "Online"
- [ ] Test query: "What is ROS 2?"
- [ ] Response in 2-5 seconds
- [ ] Sources shown with "View" links

## Get API Keys

### Google Gemini (Required)
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy key (starts with `AIza...`)
4. Add to Vercel Environment Variables

**Free Tier**: 1,500 requests/day

### Already Configured
- ✅ Qdrant Cloud (vector database)
- ✅ Cohere (embeddings)

Keys are in `.env.example` and safe to use (project-specific).

## Troubleshooting

### Chatbot Shows "Offline"
1. Check Vercel → Settings → Environment Variables (all 7 present?)
2. Check `vercel.json` exists in repository
3. Redeploy: Deployments → ⋯ → Redeploy

### Build Fails
```bash
# Test locally first
npm run build
# Fix any errors shown
```

### Images Missing
Ensure images are in `static/img/` and referenced as:
```markdown
![Alt](/img/image.png)  ← Correct
![Alt](../static/img/image.png)  ← Wrong
```

## Files Modified for Production

✅ **Created**:
- `vercel.json` - Vercel deployment config
- `DEPLOYMENT_GUIDE.md` - Full instructions

✅ **Updated**:
- `package.json` - Added `vercel-build` script
- `src/components/ChatAssistant.tsx` - Dynamic API URL
- `.gitignore` - Enhanced to exclude all secrets
- `README.md` - Updated with deployment info

## Important Commands

```bash
# Local testing
npm start                 # Start frontend (port 3000)
cd chatbot && python api.py  # Start backend (port 8000)

# Production build
npm run build            # Build static site
npm run serve            # Test production build

# Deploy
git add .
git commit -m "Message"
git push                 # Auto-deploys to Vercel
```

## Support

📖 **Full Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)  
💬 **Chatbot Setup**: [physical-ai-textbook/CHATBOT_README.md](./physical-ai-textbook/CHATBOT_README.md)  
🏗️ **Architecture**: [physical-ai-textbook/ARCHITECTURE.md](./physical-ai-textbook/ARCHITECTURE.md)

---

**Total Setup Time**: ~20 minutes  
**Cost**: $0 (all free tiers)  
**Maintenance**: Automatic via Vercel
