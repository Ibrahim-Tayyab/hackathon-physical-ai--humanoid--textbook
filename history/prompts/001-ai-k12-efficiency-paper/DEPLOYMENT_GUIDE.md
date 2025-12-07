# 🚀 Complete Deployment Guide: Physical AI Textbook Website

## 📋 Overview

This guide walks you through deploying the **Physical AI & Humanoid Robotics** textbook website with a working AI chatbot backend to GitHub and Vercel.

### What You're Deploying

1. **Frontend**: Docusaurus-based textbook website (static site)
2. **Backend**: FastAPI RAG chatbot with Qdrant + Cohere + Google Gemini
3. **Database**: Qdrant Cloud (already configured)

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Vercel                              │
│                                                             │
│  ┌──────────────────────┐     ┌─────────────────────────┐ │
│  │  Static Frontend     │     │  Serverless Backend     │ │
│  │  (Docusaurus Build)  │────▶│  (Python FastAPI)       │ │
│  │  Port: 443           │     │  /api/* routes          │ │
│  └──────────────────────┘     └─────────────────────────┘ │
│                                         │                   │
└─────────────────────────────────────────┼───────────────────┘
                                          │
                              ┌───────────▼──────────────┐
                              │   Qdrant Cloud Vector DB  │
                              │   (Embeddings Storage)    │
                              └──────────────────────────┘
```

---

## 📂 Files to Push to GitHub

### ✅ MUST INCLUDE (Frontend)
```
physical-ai-textbook/
├── docs/                          # All textbook content
├── src/                           # React components
│   ├── components/
│   │   └── ChatAssistant.tsx     # Chatbot UI
│   ├── css/
│   ├── pages/
│   └── theme/
├── static/                        # Images, assets
├── blog/                          # Blog posts
├── docusaurus.config.ts          # Main config
├── sidebars.ts                   # Navigation
├── package.json                  # Dependencies
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

### ✅ MUST INCLUDE (Backend)
```
physical-ai-textbook/chatbot/
├── api.py                        # FastAPI server
├── ingest_data.py               # Data loading
├── requirements.txt             # Python dependencies
├── .env.example                 # Template (NO secrets)
└── README.md                    # Backend docs
```

### ✅ MUST INCLUDE (Root)
```
/
├── .gitignore                   # Exclude node_modules, .env, build/
├── vercel.json                  # Vercel configuration (CREATE THIS)
├── DEPLOYMENT_GUIDE.md          # This file
└── README.md                    # Project overview
```

### ❌ DO NOT PUSH
```
node_modules/                    # Installed dependencies
build/                          # Built files
.docusaurus/                    # Cache
.env                            # Contains API keys! ⚠️
chatbot/.env                    # Contains API keys! ⚠️
chatbot/venv/                   # Python virtual environment
*.log                           # Log files
.DS_Store                       # Mac system files
```

---

## 🔧 Pre-Deployment Setup

### Step 1: Verify Your `.gitignore` Files

#### Root `.gitignore`
Create/verify `physical-ai-textbook/.gitignore`:

```gitignore
# Dependencies
node_modules/
/node_modules

# Production build
/build
build/

# Docusaurus cache
.docusaurus/
.cache-loader/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
```

#### Chatbot `.gitignore`
Create/verify `physical-ai-textbook/chatbot/.gitignore`:

```gitignore
# Virtual environment
venv/
env/
ENV/
.venv/

# Environment variables (CRITICAL - contains API keys)
.env
*.env
!.env.example

# Python cache
__pycache__/
*.py[cod]
*$py.class
*.so

# Testing
.pytest_cache/
.coverage
htmlcov/

# IDE
.vscode/
.idea/
*.swp
```

### Step 2: Update API URL for Production

Edit `physical-ai-textbook/src/components/ChatAssistant.tsx`:

**BEFORE (Line 18):**
```typescript
const API_URL = 'http://localhost:8000';
```

**AFTER:**
```typescript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app/api'  // Replace with your actual URL after deployment
  : 'http://localhost:8000';
```

*Note: You'll update the production URL after first deployment.*

### Step 3: Create `vercel.json` Configuration

Create `physical-ai-textbook/vercel.json`:

```json
{
  "version": 2,
  "name": "physical-ai-textbook",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "chatbot/api.py",
      "use": "@vercel/python",
      "config": {
        "maxLambdaSize": "50mb"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "chatbot/api.py"
    },
    {
      "src": "/(.*)",
      "dest": "/build/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "outputDirectory": "build"
}
```

### Step 4: Add Vercel Build Script

Edit `physical-ai-textbook/package.json` to add:

```json
{
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "vercel-build": "npm run build",  // ADD THIS LINE
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve"
  }
}
```

---

## 📤 GitHub Deployment

### Step 1: Initialize Git Repository (if not done)

```bash
cd e:\Hackathon_AI\hackathon-youtube\physical-ai-textbook
git init
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"** (green button)
3. Fill in:
   - **Repository name**: `physical-ai-textbook` (or your choice)
   - **Description**: "Interactive Physical AI & Humanoid Robotics textbook with RAG chatbot"
   - **Visibility**: Public (required for free Vercel hosting) or Private (requires paid Vercel)
   - **DO NOT** initialize with README (you have one)
4. Click **"Create repository"**

### Step 3: Connect Local Repository to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/physical-ai-textbook.git

# Verify remote
git remote -v
```

### Step 4: Stage and Commit Files

```bash
# Check what will be committed (should NOT show .env files!)
git status

# Add all files (respecting .gitignore)
git add .

# Commit
git commit -m "Initial commit: Physical AI textbook with RAG chatbot"

# Push to GitHub
git push -u origin main
```

**⚠️ CRITICAL CHECK**: Before pushing, verify no secrets:
```bash
git diff --cached | grep -i "api_key"
```
If this shows API keys, **STOP** and fix your `.gitignore`!

### Step 5: Verify GitHub Upload

Visit `https://github.com/YOUR-USERNAME/physical-ai-textbook` and check:
- ✅ `docs/` folder present
- ✅ `src/` folder present
- ✅ `chatbot/` folder present
- ✅ `package.json` present
- ❌ NO `.env` files visible
- ❌ NO `node_modules/` folder

---

## 🌐 Vercel Deployment

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your `physical-ai-textbook` repository
3. Click **"Import"**

### Step 3: Configure Build Settings

On the configuration screen:

#### Framework Preset
- Select: **Other** (Docusaurus isn't in the preset list)

#### Root Directory
- Leave as: `./` (root)
- Or select: `physical-ai-textbook` if you pushed the parent directory

#### Build & Output Settings
```
Build Command:        npm run build
Output Directory:     build
Install Command:      npm install
```

#### Environment Variables (CRITICAL)

Click **"Environment Variables"** and add these one by one:

| Name | Value | Where to Get |
|------|-------|--------------|
| `QDRANT_URL` | `https://999b85bb-0895-4dd4-b996-a8256b6e6d50.europe-west3-0.gcp.cloud.qdrant.io:6333` | From chatbot/.env.example |
| `QDRANT_API_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | From chatbot/.env.example |
| `COHERE_API_KEY` | `cyr1l2b6auE1x5RrajvIFu1I1hUOOiQb36UDo0aY` | From chatbot/.env.example |
| `GOOGLE_API_KEY` | `YOUR_GOOGLE_GEMINI_KEY` | Get from [Google AI Studio](https://aistudio.google.com/apikey) |
| `COLLECTION_NAME` | `physical_ai_book` | Default |
| `TOP_K_RESULTS` | `5` | Default |
| `MODEL_NAME` | `gemini-1.5-flash` | Default |

**⚠️ IMPORTANT**: 
- Click **"Add"** after each variable
- Choose **"Production"**, **"Preview"**, and **"Development"** for all
- Google Gemini API is FREE (100K requests/day)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes while Vercel:
   - Installs dependencies
   - Builds Docusaurus site
   - Deploys static files
   - Sets up serverless functions

### Step 5: Get Your Production URL

After deployment completes:
1. You'll see: **"Congratulations! Your project has been deployed"**
2. Copy your URL: `https://physical-ai-textbook-xxxxx.vercel.app`

### Step 6: Update Frontend API URL

Now that you have your production URL, update the frontend:

**Edit `physical-ai-textbook/src/components/ChatAssistant.tsx`:**

Replace line 18-20:
```typescript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://physical-ai-textbook-xxxxx.vercel.app/api'  // YOUR ACTUAL URL HERE
  : 'http://localhost:8000';
```

**Commit and push:**
```bash
git add src/components/ChatAssistant.tsx
git commit -m "Update production API URL"
git push
```

Vercel will auto-deploy the update in ~2 minutes.

---

## 🧪 Testing Your Deployment

### Frontend Tests

1. **Homepage Load**
   - Visit: `https://your-app.vercel.app`
   - ✅ Should load modern landing page with hero section
   - ✅ Navigation should work

2. **Textbook Content**
   - Visit: `https://your-app.vercel.app/docs/Introduction/vision`
   - ✅ Content renders correctly
   - ✅ Sidebar navigation works
   - ✅ Images load

3. **Module Pages**
   - Click through modules
   - ✅ All modules accessible
   - ✅ No 404 errors

### Backend Tests

1. **Health Check**
   ```bash
   curl https://your-app.vercel.app/api/health
   ```
   
   **Expected Response:**
   ```json
   {
     "status": "healthy",
     "collection": "physical_ai_book",
     "vectors": 523,
     "model": "gemini-1.5-flash"
   }
   ```

2. **Search Endpoint**
   ```bash
   curl -X POST "https://your-app.vercel.app/api/search?query=ROS%202&top_k=3"
   ```
   
   **Should return:** JSON with search results and sources

3. **Chat Endpoint**
   ```bash
   curl -X POST https://your-app.vercel.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{
       "message": "What is ROS 2?",
       "conversation_history": []
     }'
   ```
   
   **Should return:** AI-generated response with sources

### Chatbot UI Tests

1. **Open Chat**
   - Click the robot icon (🤖) in bottom-right corner
   - ✅ Chat panel slides open smoothly
   - ✅ Shows connection status (checking → online)

2. **Test Quick Prompts**
   - Click: "Give me a ROS 2 quickstart."
   - ✅ Response in 2-5 seconds
   - ✅ Sources shown at bottom
   - ✅ "View" links work

3. **Test Custom Query**
   - Type: "Explain inverse kinematics"
   - Send message
   - ✅ Response relevant to textbook
   - ✅ Cites specific modules
   - ✅ No hallucinations (only textbook content)

4. **Test Conversation**
   - Ask follow-up: "Show me code for this"
   - ✅ Maintains context
   - ✅ Generates code snippets
   - ✅ Fast response time

---

## 🔧 Common Issues & Solutions

### Issue 1: "Failed to compile" Error

**Symptom:** Vercel build fails with TypeScript errors

**Solution:**
```bash
# Locally test build
cd physical-ai-textbook
npm run build

# Fix any errors shown
# Commit and push fixes
```

### Issue 2: Chatbot Shows "Offline"

**Symptom:** Chat button shows "Backend offline"

**Causes & Fixes:**

1. **Environment variables missing**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Verify all 7 variables are present
   - Redeploy: Deployments → ⋯ → Redeploy

2. **API route misconfigured**
   - Check `vercel.json` has correct routes
   - Verify `chatbot/api.py` is in repository

3. **CORS issues**
   - Check `api.py` line 114-119 has proper CORS middleware
   - Should allow your Vercel domain

### Issue 3: "404 Not Found" on Pages

**Symptom:** Direct links to docs pages fail

**Solution:** Check `docusaurus.config.ts`:
```typescript
url: 'https://your-app.vercel.app',  // Must match deployment URL
baseUrl: '/',                         // Must be '/' for Vercel
```

### Issue 4: Images Not Loading

**Symptom:** Broken image icons

**Solution:**
```bash
# Check images are in static/
ls physical-ai-textbook/static/img/

# Reference in docs as:
![Alt text](/img/your-image.png)
# NOT: ../static/img/your-image.png
```

### Issue 5: Chatbot Responses are Slow (>10 seconds)

**Causes & Fixes:**

1. **Cold start** (first request after inactivity)
   - Normal for serverless functions
   - Subsequent requests will be fast

2. **Using wrong model**
   - Check Environment Variables: `MODEL_NAME=gemini-1.5-flash`
   - Flash is fastest (1-3s), Pro is slower but smarter

3. **Too many retrieved chunks**
   - Reduce: `TOP_K_RESULTS=3` (default is 5)

### Issue 6: Build Exceeds Vercel Limits

**Symptom:** "Bundle size exceeds limit"

**Solutions:**

1. **Reduce images**
   ```bash
   # Compress images in static/
   # Use WebP format
   # Max 1MB per image
   ```

2. **Split bundle**
   - Use dynamic imports in React components
   - Lazy load heavy components

3. **Upgrade Vercel plan**
   - Free tier: 1 GB
   - Pro tier: 2.5 GB

### Issue 7: "Python runtime error"

**Symptom:** `/api/health` returns 500 error

**Solution:**

1. Check `requirements.txt` is valid:
   ```bash
   pip install -r chatbot/requirements.txt
   # Should succeed locally
   ```

2. Check Python version in `vercel.json`:
   ```json
   {
     "builds": [
       {
         "src": "chatbot/api.py",
         "use": "@vercel/python",
         "config": {
           "runtime": "python3.9"  // Try python3.11
         }
       }
     ]
   }
   ```

---

## 📊 Vercel Dashboard Overview

### Deployments Tab
- View all deployments (Production, Preview)
- See build logs for debugging
- Instant rollback to previous versions

### Settings → Environment Variables
- Add/edit API keys
- Separate variables for Production/Preview/Development
- Changes require redeployment

### Settings → Domains
- Add custom domain (e.g., `physicalai.com`)
- Free SSL certificates
- Automatic HTTPS

### Analytics (Pro plan)
- Page views
- Top pages
- Geographic distribution
- Core Web Vitals

---

## 🚀 Post-Deployment Tasks

### 1. Load Textbook Data into Qdrant

The vector database needs content. Run locally (one-time):

```bash
cd physical-ai-textbook/chatbot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Add your API keys to .env
# Copy from .env.example and add GOOGLE_API_KEY

# Load data
python ingest_data.py
```

**Output should show:**
```
✓ Loaded 44 MDX files
✓ Created 523 chunks
✓ Embedded with Cohere
✓ Stored in Qdrant collection 'physical_ai_book'
```

This is a **one-time setup**. Data persists in Qdrant Cloud.

### 2. Test Everything

Use the testing checklist above to verify:
- ✅ Frontend loads
- ✅ Backend health check passes
- ✅ Chatbot connects
- ✅ Conversations work
- ✅ Sources are accurate

### 3. Monitor Usage

#### Vercel (Free Tier Limits)
- **Bandwidth**: 100 GB/month
- **Serverless Executions**: 100 GB-hours
- **Edge Functions**: 100k requests

#### Google Gemini (Free Tier)
- **Requests**: 15 requests/minute, 1,500/day
- **Tokens**: 1 million tokens/minute

#### Qdrant Cloud (Free Tier)
- **Memory**: 1 GB
- **Vectors**: ~1M for 512-dim embeddings
- **Requests**: Unlimited

#### Cohere (Trial)
- **Requests**: 100 calls/minute
- **Embeddings**: ~5,000/month free

### 4. Set Up Custom Domain (Optional)

1. Buy domain (e.g., Namecheap, GoDaddy)
2. Vercel Dashboard → Settings → Domains
3. Add domain: `physicalai.com`
4. Update DNS records (Vercel provides instructions)
5. Wait 24-48 hours for propagation

### 5. Enable Analytics (Optional)

**Vercel Analytics (Free):**
```bash
npm install @vercel/analytics
```

**Add to `src/theme/Root.tsx`:**
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function Root({children}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
```

---

## 🔐 Security Best Practices

### ✅ DO's

1. **Never commit `.env` files**
   - Always in `.gitignore`
   - Use `.env.example` as template

2. **Rotate API keys regularly**
   - Every 90 days minimum
   - Update in Vercel Environment Variables

3. **Use separate keys for dev/prod**
   - Development: Local `.env`
   - Production: Vercel Environment Variables

4. **Enable rate limiting**
   - Prevent abuse of chatbot
   - Add to `api.py` (optional)

5. **Monitor logs**
   - Vercel Dashboard → Functions → Logs
   - Check for suspicious activity

### ❌ DON'Ts

1. **Never hardcode API keys**
   - ❌ `COHERE_API_KEY = "abc123"`
   - ✅ `COHERE_API_KEY = os.getenv("COHERE_API_KEY")`

2. **Don't expose backend errors to users**
   - Log detailed errors server-side
   - Return generic messages to frontend

3. **Don't skip HTTPS**
   - Vercel enforces HTTPS automatically
   - Never use `http://` in production

---

## 📈 Scaling Your Deployment

### When You Outgrow Free Tiers

#### Vercel Pro ($20/month)
- 1 TB bandwidth
- 1000 GB-hours serverless
- Advanced analytics
- Priority support

#### Qdrant Cloud Paid
- Starts at $25/month
- 2 GB memory
- Dedicated resources
- 99.9% SLA

#### Google Gemini Pay-as-you-go
- $0.50 per 1M tokens (Flash)
- $5.00 per 1M tokens (Pro)
- No rate limits

#### Cohere Production
- Starts at $20/month
- 10K calls/month included
- Custom pricing for high volume

---

## 🎯 Quick Command Reference

### Local Development

```bash
# Start frontend
cd physical-ai-textbook
npm start

# Start backend
cd physical-ai-textbook/chatbot
python api.py

# Build for production
npm run build

# Test production build
npm run serve
```

### Git Operations

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description"

# Push to GitHub (triggers Vercel deployment)
git push

# View remote
git remote -v
```

### Vercel CLI (Optional)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from local
vercel --prod

# View logs
vercel logs

# View environment variables
vercel env ls
```

---

## 📞 Support & Resources

### Documentation
- **Docusaurus**: https://docusaurus.io/docs
- **Vercel**: https://vercel.com/docs
- **FastAPI**: https://fastapi.tiangolo.com
- **Qdrant**: https://qdrant.tech/documentation
- **Google Gemini**: https://ai.google.dev/docs

### Get Help
- **Vercel Support**: support@vercel.com
- **GitHub Issues**: Create issue in your repository
- **Community**: 
  - [Docusaurus Discord](https://discord.gg/docusaurus)
  - [FastAPI Discord](https://discord.com/invite/VQjSZaeJmf)

### Your Project Files
- **CHATBOT_README.md**: Backend setup details
- **QUICK_START.md**: Local development guide
- **HOMEPAGE_REDESIGN_COMPLETE.md**: Frontend changes

---

## ✅ Deployment Checklist

Use this checklist before going live:

### Pre-Push
- [ ] `.env` files in `.gitignore`
- [ ] No API keys in code
- [ ] `vercel.json` created
- [ ] Production API URL configured
- [ ] All files committed

### GitHub
- [ ] Repository created
- [ ] Code pushed successfully
- [ ] No secrets visible on GitHub
- [ ] README updated

### Vercel
- [ ] Account created and GitHub connected
- [ ] Project imported
- [ ] All 7 environment variables added
- [ ] Build settings configured
- [ ] First deployment successful

### Backend
- [ ] Health check returns 200
- [ ] Search endpoint works
- [ ] Chat endpoint works
- [ ] Qdrant data loaded (523 vectors)

### Frontend
- [ ] Homepage loads
- [ ] All textbook pages accessible
- [ ] Navigation works
- [ ] Images load correctly
- [ ] No console errors

### Chatbot
- [ ] Robot button visible
- [ ] Chat opens smoothly
- [ ] Shows "Online" status
- [ ] Quick prompts work
- [ ] Custom queries work
- [ ] Sources display correctly
- [ ] Response time <5 seconds

### Final
- [ ] Test from mobile device
- [ ] Test from different browsers
- [ ] Share link with colleague
- [ ] Monitor Vercel logs for errors
- [ ] Set up monitoring/alerts (optional)

---

## 🎉 Congratulations!

Your Physical AI textbook is now live! 

**What you've accomplished:**
✅ Full-stack web application deployed
✅ AI-powered chatbot with RAG
✅ Scalable vector database
✅ Production-ready infrastructure
✅ Automatic deployments via GitHub

**Share your site:**
- Tweet your deployment URL
- Add to your portfolio
- Share with students/colleagues
- Contribute improvements via GitHub

---

## 📝 Troubleshooting Log Template

If you encounter issues, document them here:

```markdown
### Issue: [Brief description]
**Date**: YYYY-MM-DD
**Symptom**: What's broken
**Environment**: Production / Preview / Local
**Error Message**: 
```
[Paste exact error]
```
**Steps Taken**:
1. 
2. 
3. 

**Solution**:
[What fixed it]

**Prevention**:
[How to avoid in future]
```

---

**Document Version**: 1.0  
**Last Updated**: December 7, 2025  
**Maintained By**: Physical AI Team  
**Repository**: https://github.com/YOUR-USERNAME/physical-ai-textbook
