# 🔒 Pre-Push Security & Quality Checklist

## ⚠️ CRITICAL: Run These Checks Before `git push`

### 1. Security Check: No API Keys in Code

```bash
# Check staged files for API keys
git diff --cached | findstr /i "api_key openai cohere qdrant google"

# Should return NOTHING!
# If you see API keys, STOP and fix immediately
```

**If keys found:**
```bash
# Remove from staging
git reset HEAD <file-with-keys>

# Move keys to .env
# Add .env to .gitignore
# Never hardcode keys in code
```

### 2. Verify .env Files Are Ignored

```bash
# Check that .env is NOT staged
git status

# Output should NOT show:
# ❌ chatbot/.env
# ❌ .env
# ❌ Any file containing credentials

# Should ONLY show:
# ✅ chatbot/.env.example
```

**Fix if needed:**
```bash
# If .env is staged, remove it
git rm --cached chatbot/.env
git rm --cached .env

# Verify .gitignore includes:
echo .env >> .gitignore
echo chatbot/.env >> chatbot/.gitignore
```

### 3. Verify Required Files Exist

```bash
cd physical-ai-textbook

# Check for required files
dir vercel.json
dir package.json
dir chatbot\requirements.txt
dir chatbot\.env.example

# All should exist
```

### 4. Test Local Build

```bash
# Build should succeed without errors
npm run build

# Should output:
# ✓ Client bundle compiled successfully
# ✓ Server bundle compiled successfully
```

**If build fails:**
- Fix TypeScript errors
- Fix broken imports
- Fix missing dependencies

### 5. Check File Sizes

```bash
# Large files slow deployment
dir /s static\img\*.png
dir /s static\img\*.jpg

# Images should be:
# ✓ < 1 MB each
# ✓ Optimized (use WebP if possible)
```

### 6. Verify API URL Configuration

Open `src/components/ChatAssistant.tsx` and check line ~18:

```typescript
// ✅ CORRECT (dynamic based on environment)
const API_URL = typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
    ? 'https://your-vercel-app.vercel.app/api'
    : 'http://localhost:8000';

// ❌ WRONG (hardcoded localhost)
const API_URL = 'http://localhost:8000';
```

### 7. Verify .gitignore Coverage

**Root `.gitignore` should include:**
```gitignore
node_modules/
build/
.docusaurus/
.env
*.env
!.env.example
*.log
.DS_Store
__pycache__/
venv/
```

**chatbot/.gitignore should include:**
```gitignore
venv/
.env
*.env
!.env.example
__pycache__/
*.log
```

### 8. Check for Sensitive Data

```bash
# Search entire project for potential secrets
findstr /s /i "password secret token key api" *.ts *.tsx *.py *.json

# Review results carefully
# Acceptable: References to environment variables (process.env.XXX)
# Unacceptable: Actual key values
```

### 9. Verify Package.json Scripts

Ensure `package.json` has:
```json
{
  "scripts": {
    "build": "docusaurus build",
    "vercel-build": "npm run build"
  }
}
```

### 10. Test Python Backend Locally (Optional)

```bash
cd chatbot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Should install without errors
# If errors, fix requirements.txt
```

## 📋 Final Checklist

Before pushing, verify:

- [ ] ✅ No `.env` files staged
- [ ] ✅ No API keys in code
- [ ] ✅ `vercel.json` exists and configured
- [ ] ✅ `.gitignore` files comprehensive
- [ ] ✅ `npm run build` succeeds
- [ ] ✅ API URL is environment-aware
- [ ] ✅ All images < 1MB
- [ ] ✅ `chatbot/requirements.txt` complete
- [ ] ✅ `chatbot/.env.example` present
- [ ] ✅ No `node_modules/` in git
- [ ] ✅ No `venv/` in git
- [ ] ✅ README updated
- [ ] ✅ Commit message descriptive

## 🚦 Ready to Push

If all checks pass:

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Initial deployment with RAG chatbot

- Added Docusaurus textbook with 5 modules
- Integrated FastAPI backend with Gemini
- Configured Vercel deployment
- Updated documentation"

# Push to GitHub
git push origin main
```

## ⚠️ Emergency: Accidentally Pushed Secrets

If you accidentally pushed API keys:

### Immediate Actions

1. **Revoke compromised keys immediately:**
   - Google Gemini: [API Console](https://console.cloud.google.com/apis/credentials)
   - OpenAI: [API Keys](https://platform.openai.com/api-keys)
   - Cohere: [Dashboard](https://dashboard.cohere.com/)
   - Qdrant: [Cloud Console](https://cloud.qdrant.io/)

2. **Remove from Git history:**
   ```bash
   # Remove file from all commits (DANGEROUS)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch chatbot/.env" \
     --prune-empty --tag-name-filter cat -- --all

   # Force push (rewrites history)
   git push origin --force --all
   ```

3. **Generate new keys:**
   - Create new API keys for all services
   - Update Vercel environment variables
   - Test deployment

4. **Prevent future incidents:**
   - Add to `.gitignore`
   - Set up pre-commit hooks
   - Use Git secrets scanner

## 🛡️ Prevention: Git Hooks (Recommended)

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Check for API keys before commit

if git diff --cached | grep -E 'api_key|OPENAI|COHERE|QDRANT|GOOGLE.*KEY'; then
  echo "❌ ERROR: Potential API key found in staged changes!"
  echo "Remove API keys and use environment variables instead."
  exit 1
fi

echo "✅ No API keys detected"
```

Make executable:
```bash
chmod +x .git/hooks/pre-commit
```

## 📞 Need Help?

- **Security Issue**: [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

**Remember**: Once secrets are pushed to GitHub, assume they are compromised. Always revoke and regenerate.
