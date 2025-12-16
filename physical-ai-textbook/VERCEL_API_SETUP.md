# Vercel API Routes Setup Guide

## Overview

This document explains the new Vercel API routes that have been created to handle backend communication on Vercel deployments.

## Files Created

### 1. `/api/health.ts`
**Purpose:** Health check endpoint for monitoring backend connectivity

**Behavior:**
- Returns `200 OK` with status info if backend is reachable
- Returns `200 OK` with "backend: offline" message if backend is unavailable (graceful degradation)
- The endpoint itself never fails, allowing the frontend to load even when backend is down

**Response Example (Backend Connected):**
```json
{
  "status": "healthy",
  "backend": "connected",
  "qdrant": "connected",
  "vectors": 1234,
  "collection": "physical_ai_book"
}
```

**Response Example (Backend Offline):**
```json
{
  "status": "online",
  "backend": "offline",
  "message": "Frontend is running but backend service is unavailable",
  "timestamp": "2025-12-17T10:30:00.000Z"
}
```

### 2. `/api/chat.ts`
**Purpose:** Proxy chat requests to your backend FastAPI service

**Behavior:**
- Accepts POST requests with `message` and `conversation_history`
- Proxies to `${BACKEND_API_URL}/chat`
- Handles CORS for cross-origin requests
- Returns graceful error if backend is unavailable

**Request Example:**
```json
{
  "message": "Explain ROS 2 basics",
  "conversation_history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ]
}
```

## Updated Components

### `src/components/ChatAssistant.tsx`
- Updated `API_URL` from hardcoded domain to `/api` for Vercel
- Local development still uses `http://localhost:8000`
- Now works seamlessly with both local and Vercel deployments

```typescript
const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : '/api';
```

## Environment Configuration

### For Local Development
No action needed - the component detects localhost and uses `http://localhost:8000`

### For Vercel Deployment

1. **Set BACKEND_API_URL in Vercel Project Settings:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `BACKEND_API_URL` = Your deployed backend URL
   
   Examples:
   - Railway: `https://your-app.railway.app`
   - Render: `https://your-app.onrender.com`
   - AWS/Other: Your backend's public URL

2. **If backend is not deployed yet:**
   - The health check will show "backend: offline"
   - Chat requests will return a service unavailable message
   - Frontend remains operational

## Deployment Checklist

- [ ] Create API routes (✅ Already done)
- [ ] Update ChatAssistant component (✅ Already done)
- [ ] Deploy backend to production (Railway, Render, AWS, etc.)
- [ ] Set BACKEND_API_URL environment variable in Vercel
- [ ] Test health check: Visit `/api/health`
- [ ] Test chat: Send a message in the chat widget
- [ ] Verify no 404 errors in browser console

## Testing

### Local Testing
```bash
# Start local backend
cd chatbot
python api.py

# In another terminal, start Docusaurus dev server
npm run start

# Chat widget should connect to localhost:8000
```

### Production Testing
1. Verify health endpoint: `https://your-domain.vercel.app/api/health`
2. Should return backend connection status
3. Chat widget should work without 404 errors

## Troubleshooting

### Still Getting 404 on `/api/health`?
- Ensure the `/api` directory exists in your project root
- Redeploy after adding the files: `git push` or redeploy in Vercel dashboard

### Chat returns "Service unavailable"?
- Check that `BACKEND_API_URL` environment variable is set in Vercel
- Verify backend service is running and accessible
- Check CORS settings in backend API

### Local development shows 404?
- Make sure you're running `npm run start` (not `npm run build`)
- Local API routes only work in dev mode

## Next Steps

1. **Deploy your Python backend:**
   - [Railway](https://railway.app) - Easiest option
   - [Render](https://render.com) - Free tier available
   - [AWS EC2](https://aws.amazon.com/ec2/)
   - Other providers: Heroku (paid), Google Cloud, Azure

2. **Set environment variables in Vercel**

3. **Test the full integration**

4. **Monitor health checks in production**

## Architecture Diagram

```
[User Browser]
    ↓
[Vercel Frontend] 
    ├─→ `/api/health` → [Backend Health Check]
    └─→ `/api/chat` → [Backend Chat Service]
         ↓
    [Python FastAPI Backend]
         ↓
    [Qdrant Vector Database]
```

