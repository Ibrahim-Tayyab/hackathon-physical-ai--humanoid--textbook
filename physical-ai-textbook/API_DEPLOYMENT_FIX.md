# Vercel API Deployment Fix - Documentation

## Problem
The Vercel deployment was returning:
- **405 Method Not Allowed** on `POST /api/chat`
- **404 Not Found** on `GET /api/health`

This was because Vercel didn't have serverless functions configured for these endpoints.

## Solution Implemented

### 1. Created Vercel Serverless Functions
Created two TypeScript serverless functions in the `/api` directory:

#### `/api/chat.ts`
- Handles `POST` requests to `/api/chat`
- Forwards requests to the local FastAPI backend
- Includes proper CORS headers
- Returns 405 for non-POST requests

#### `/api/health.ts`
- Handles `GET` requests to `/api/health`
- Forwards requests to the local FastAPI backend
- Includes proper CORS headers
- Returns 405 for non-GET requests

### 2. Updated Configuration

#### `package.json`
- Added `@vercel/node` dependency for TypeScript serverless function support

#### `vercel.json` (NEW)
- Configures build output
- Sets up environment variables
- Defines function resources (memory, timeout)

## Deployment Steps

### Step 1: Install Dependencies
```bash
cd physical-ai-textbook
npm install
```

### Step 2: Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings and add:
```
BACKEND_URL=https://your-fastapi-backend-url.com
```

**Important:** You need a publicly accessible FastAPI backend URL. Options:
- **Option A (Recommended):** Deploy your FastAPI backend to a service like:
  - Railway.app
  - Render.com
  - Heroku (alternative)
  - AWS Lambda/API Gateway
  - Google Cloud Run

- **Option B:** Keep it local for testing only (won't work on Vercel)

### Step 3: Deploy to Vercel
```bash
vercel deploy
```

Or push to your Git repository and let Vercel auto-deploy.

### Step 4: Test the Endpoints

```bash
# Test health check
curl https://your-app.vercel.app/api/health

# Test chat
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is ROS 2?",
    "conversation_history": []
  }'
```

## How It Works

1. **User → Frontend** (Vercel): Makes a request to `/api/chat`
2. **Vercel Function** (`/api/chat.ts`): Receives the request and forwards it to the backend
3. **FastAPI Backend**: Processes the request and returns the AI response
4. **Vercel Function**: Returns the response to the frontend

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ POST /api/chat
       ▼
┌─────────────────────────┐
│  Vercel Serverless Fn   │
│  (/api/chat.ts)         │
└──────┬──────────────────┘
       │ Forwards to
       ▼
┌──────────────────────┐
│  FastAPI Backend     │
│  (api.py)            │
└──────────────────────┘
```

## Troubleshooting

### Issue: Still Getting 405 Error
- ✅ Check that `/api/chat.ts` and `/api/health.ts` exist
- ✅ Verify `@vercel/node` is in `package.json`
- ✅ Rebuild and redeploy: `npm run build && vercel deploy`

### Issue: 500 Error / Backend Unavailable
- ✅ Verify `BACKEND_URL` environment variable is set correctly
- ✅ Check that the FastAPI backend is running and accessible
- ✅ Ensure the backend has CORS enabled (already configured in `api.py`)

### Issue: Connection Timeout
- ✅ Check if the backend service is online
- ✅ Verify network connectivity between Vercel and backend
- ✅ Check backend logs for errors

## Files Modified/Created

✅ **Created:**
- `/api/chat.ts` - Chat endpoint handler
- `/api/health.ts` - Health check endpoint handler
- `vercel.json` - Vercel configuration

✅ **Updated:**
- `package.json` - Added `@vercel/node` dependency

## IMPORTANT: Backend Deployment

Your Python FastAPI backend (`chatbot/api.py`) needs to be deployed to a service accessible from Vercel. You **cannot** run it locally when using Vercel.

### Recommended: Deploy FastAPI to Railway.app (5 min setup)

1. Sign up at https://railway.app
2. Connect your GitHub repo
3. Create new project → GitHub repo
4. Add environment variables from `.env`
5. Deploy
6. Get the public URL and set it as `BACKEND_URL` in Vercel

See deployment guides:
- Railway: https://docs.railway.app/guides/python
- Render: https://render.com/docs/deploy-python
- Google Cloud Run: https://cloud.google.com/run/docs/quickstarts/build-and-deploy/python

