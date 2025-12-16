# Deploy to Vercel (Complete Backend + Frontend)

## Quick Setup (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Vercel backend deployment"
git push origin main
```

### Step 2: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Step 3: Set Environment Variables in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables

Add these variables:

| Variable | Value | How to get |
|----------|-------|-----------|
| `QDRANT_URL` | Your Qdrant cloud URL | [Qdrant Console](https://cloud.qdrant.io) |
| `QDRANT_API_KEY` | Your Qdrant API key | Qdrant Console → API Key |
| `COHERE_API_KEY` | Your Cohere API key | [Cohere Dashboard](https://dashboard.cohere.com) |
| `GOOGLE_API_KEY` | Your Google Gemini API key | [Google AI Studio](https://aistudio.google.com/app/apikey) |

**Example values from your setup:**
```
QDRANT_URL=https://999b85bb-0895-4dd4-b996-a8256b6e6d50.europe-west3-0.gcp.cloud.qdrant.io:6333
COHERE_API_KEY=cyr1l2b6auE1x5RrajvIFu1I1hUOOiQb36UDo0aY
GOOGLE_API_KEY=AIzaSyCcDVb5t7Vq4jxZSVcfduytIEgZafiGmYs
```

### Step 4: Redeploy
```bash
vercel --prod
```

### Step 5: Test
- Visit: `https://your-app.vercel.app/api/health`
- Should see: `{"status":"healthy","deployment":"vercel",...}`
- Chat widget should now work without 503 errors!

---

## What's Happening

You now have **both frontend AND backend on Vercel**:

```
┌─────────────────────────────────────┐
│   https://your-app.vercel.app       │
├─────────────────────────────────────┤
│  Docusaurus Frontend                │
│  ├─ /docs                           │
│  ├─ /blog                           │
│  └─ /api/health ← Detects backend   │
│     /api/chat ← Routes to /chat     │
├─────────────────────────────────────┤
│  Python FastAPI Backend             │
│  ├─ /health                         │
│  ├─ /chat                           │
│  └─ Connects to Qdrant              │
└─────────────────────────────────────┘
```

---

## Configuration Files

### `vercel.json` (Root)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "chatbot/api.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "chatbot/api.py"
    }
  ]
}
```

This tells Vercel to:
1. Build the Python backend with `@vercel/python`
2. Route all requests to `/` through the Python app

### `physical-ai-textbook/api/health.ts`
Smart endpoint that:
- If backend is on same Vercel deployment → returns healthy
- If backend is external → checks external backend
- If backend is offline → returns graceful offline status (no 503!)

### `physical-ai-textbook/api/chat.ts`
Routes chat requests:
- If backend is same deployment → routes to `/chat`
- If backend is external → routes to `${BACKEND_API_URL}/chat`

---

## Troubleshooting

### Still Getting 503?
1. Check environment variables are set in Vercel dashboard
2. Verify QDRANT_URL and API keys are correct
3. Check Vercel logs: `vercel logs <project-name>`
4. Redeploy: `vercel --prod`

### Python dependencies missing?
Vercel automatically reads from `chatbot/requirements.txt`

If not installed, create:
```bash
cd chatbot
pip freeze > requirements.txt
```

Then:
```bash
git add chatbot/requirements.txt
git commit -m "Add requirements.txt"
git push
vercel --prod
```

### Build fails?
- Check Python version (needs 3.9+)
- Check for import errors: `python -m py_compile chatbot/api.py`
- View logs: `vercel logs <app-name> --tail`

### CORS errors?
Headers are already configured in `/api/chat.ts`, should work automatically.

---

## Architecture

**Before (Local Development):**
```
Browser (localhost:3000)
  ↓
Frontend: http://localhost:3000
  ↓
Backend: http://localhost:8000
  ↓
Qdrant: Cloud
```

**After (Production on Vercel):**
```
Browser (Vercel URL)
  ↓
Frontend + Backend: https://app.vercel.app
  ├─ /docs, /blog (Static Docusaurus)
  ├─ /api/health (Routes to /health)
  └─ /api/chat (Routes to /chat)
  ↓
Qdrant: Cloud (unchanged)
```

---

## Performance Notes

### Cold Starts
- First request may take 10-15 seconds (Python startup)
- Subsequent requests are fast (warm containers)
- Use health checks to pre-warm: Set up a cron job to ping `/api/health` every 5 minutes

### Timeout Limits
- Vercel function timeout: 60 seconds (Pro) / 10 seconds (Free)
- Increase if needed in Pro plan
- Chat responses must complete within timeout

### Bandwidth
- Vercel Free: 100 GB/month
- Usually sufficient for a textbook site with light chat usage

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Run `vercel --prod`
3. ✅ Set environment variables in Vercel dashboard
4. ✅ Redeploy with `vercel --prod`
5. ✅ Test: Visit `/api/health`
6. ✅ Test chat widget
7. ✅ Monitor logs in Vercel dashboard

**Your app is now running on Vercel with full backend support!**

