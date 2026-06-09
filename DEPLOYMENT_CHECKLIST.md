# 📋 Deployment Checklist

Use this checklist to ensure smooth deployment of your AI Agent Builder.

---

## ✅ Pre-Deployment Checklist

### Local Testing
- [ ] Backend running on `http://localhost:8000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Can create agents
- [ ] Can chat with agents (streaming works)
- [ ] Quiz feature works
- [ ] All pages load correctly

### Code Review
- [ ] No console errors in browser
- [ ] No Python errors in terminal
- [ ] `.env` files not committed to Git
- [ ] `.gitignore` includes `.env`, `__pycache__`, `node_modules`, `forge.db`
- [ ] All unnecessary files removed

### API Keys
- [ ] Groq API key obtained from [console.groq.com](https://console.groq.com)
- [ ] API key tested locally and working
- [ ] API key saved securely (not in code)

---

## 🚀 Deployment Steps

### Step 1: Prepare Repository
- [ ] Push code to GitHub/GitLab
- [ ] Verify both `/backend` and `/frontend` folders are in repo
- [ ] Verify `.env` files are NOT in repo (use `.env.example` instead)
- [ ] Repository is public or accessible to deployment platform

### Step 2: Deploy Backend (Railway or Render)

#### Railway
- [ ] Sign up at [railway.app](https://railway.app)
- [ ] Create new project → Deploy from GitHub
- [ ] Set root directory to `backend`
- [ ] Add environment variables:
  - [ ] `GROQ_API_KEY` = `your_groq_key`
  - [ ] `CORS_ORIGINS` = `*` (temporary, will update later)
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy backend URL (e.g., `https://xyz.railway.app`)
- [ ] Test: Visit `https://your-backend.railway.app/api/` → Should see `{"message":"Forge agent builder API","status":"ok"}`

#### Or Render
- [ ] Sign up at [render.com](https://render.com)
- [ ] New → Web Service → Connect GitHub repo
- [ ] Set root directory to `backend`
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] Add environment variables:
  - [ ] `GROQ_API_KEY` = `your_groq_key`
  - [ ] `CORS_ORIGINS` = `*` (temporary)
- [ ] Wait for deployment
- [ ] Copy backend URL
- [ ] Test backend URL

### Step 3: Deploy Frontend (Vercel)
- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Add New Project → Import from GitHub
- [ ] Set root directory to `frontend`
- [ ] Add environment variable:
  - [ ] `REACT_APP_BACKEND_URL` = `https://your-backend-url` (no trailing slash)
- [ ] Click Deploy
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy frontend URL (e.g., `https://forge-xyz.vercel.app`)

### Step 4: Update CORS
- [ ] Go back to Railway/Render
- [ ] Update `CORS_ORIGINS` environment variable:
  - [ ] Change from `*` to your Vercel URL (e.g., `https://forge-xyz.vercel.app`)
  - [ ] **No trailing slash!**
- [ ] Save → Backend will redeploy
- [ ] Wait for redeploy to complete

### Step 5: Final Testing
- [ ] Open your Vercel URL
- [ ] Homepage loads correctly
- [ ] Animations are working
- [ ] Click "Take Quiz" → Quiz works
- [ ] Create an agent → Works
- [ ] Chat with agent → Streaming works
- [ ] No CORS errors in browser console
- [ ] Test on mobile device

---

## 🔍 Post-Deployment Verification

### Functionality Tests
- [ ] Homepage animations smooth
- [ ] Logo glows on hover
- [ ] Quiz completes successfully
- [ ] Can create agents from quiz results
- [ ] Can create agents from templates
- [ ] Can create custom agents
- [ ] Agent list shows all agents
- [ ] Can edit existing agents
- [ ] Can delete agents
- [ ] Chat interface loads
- [ ] Messages send successfully
- [ ] Responses stream in real-time
- [ ] Conversations save automatically

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] No JavaScript errors in console
- [ ] Images/icons load correctly
- [ ] Mobile responsive design works
- [ ] Buttons are clickable on mobile

### API Tests
- [ ] Backend responds quickly
- [ ] Groq API integration working
- [ ] No rate limit errors
- [ ] Database saves data correctly

---

## 🐛 Troubleshooting

### CORS Error
**Symptom:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Fix:**
1. Backend `CORS_ORIGINS` must exactly match frontend URL
2. No trailing slash in URL
3. Use `https://` not `http://`
4. Redeploy backend after changing
5. Clear browser cache

### Backend 500 Error
**Symptom:** API returns 500 Internal Server Error

**Fix:**
1. Check backend logs (Railway/Render dashboard)
2. Verify `GROQ_API_KEY` is correct
3. Test API key locally first
4. Check Groq API status

### Streaming Not Working
**Symptom:** Chat responses don't stream, appear all at once

**Fix:**
1. Ensure backend is on Railway/Render (NOT Vercel)
2. Vercel kills long-running connections
3. Check browser console for errors

### Build Fails
**Symptom:** Deployment fails during build

**Fix:**
1. Check build logs for errors
2. Verify `requirements.txt` / `package.json` are correct
3. Check Node/Python version compatibility
4. Clear build cache and retry

---

## 📊 Monitoring

### After 24 Hours
- [ ] Check Groq API usage (should be < 14,400 requests/day)
- [ ] Review backend logs for errors
- [ ] Test from different devices
- [ ] Monitor response times

### After 1 Week
- [ ] Review user feedback
- [ ] Check for any error patterns
- [ ] Optimize if needed
- [ ] Consider scaling if traffic high

---

## 🔒 Security Review

- [ ] API keys not exposed in frontend code
- [ ] `.env` files not in Git repository
- [ ] CORS properly configured (not `*` in production)
- [ ] No sensitive data in logs
- [ ] Database secured (if using external DB)

---

## 📈 Optional Enhancements

### Custom Domain
- [ ] Purchase domain name
- [ ] Add to Vercel (Settings → Domains)
- [ ] Update `CORS_ORIGINS` on backend
- [ ] Update DNS records
- [ ] Test with new domain

### Analytics
- [ ] Add Google Analytics
- [ ] Add Vercel Analytics
- [ ] Track user behavior
- [ ] Monitor errors with Sentry

### Improvements
- [ ] Add user authentication
- [ ] Add usage limits per user
- [ ] Add export/import agents
- [ ] Add more templates
- [ ] Add voice input

---

## ✅ Deployment Complete!

When all items are checked:
- ✅ Your app is live
- ✅ Users can access it
- ✅ Everything works as expected
- ✅ You're ready to share!

---

## 📧 Support

If you encounter issues:
1. Check `DEPLOY.md` for detailed instructions
2. Review this checklist again
3. Check backend logs
4. Test locally to isolate issue
5. Search for error messages online

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Homepage loads in < 3 seconds
- ✅ Quiz completes without errors
- ✅ Agents can be created and edited
- ✅ Chat streams responses in real-time
- ✅ Mobile experience is smooth
- ✅ No console errors

---

**Congratulations on your deployment!** 🚀

Share your live URL and let users enjoy your AI Agent Builder!

---

**Estimated Total Deployment Time:** 15-25 minutes

**Difficulty Level:** Easy (if following this checklist)

**Cost:** $0 (using free tiers)
