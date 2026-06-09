# 🚀 Deploy Your AI Agent Builder - Step by Step

## Prerequisites Checklist
- ✅ Code is clean and ready
- ✅ Both servers tested locally
- ✅ Groq API key ready
- ⚠️ Need GitHub account
- ⚠️ Need Vercel account
- ⚠️ Need Railway account

---

## STEP 1: Push to GitHub (START HERE!)

### Option A: Create New Repository on GitHub
1. Go to [github.com](https://github.com) → Click "New repository"
2. Name: `ai-agent-builder` (or your choice)
3. Keep it **Public**
4. **Don't** initialize with README (we already have one)
5. Click "Create repository"

### Option B: Use Existing Repository
If you already have a repo, skip to commands below.

### Push Your Code
Open a new terminal in your project folder and run:

```bash
cd d:\ai-agent\ai-agent-main

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Agent Builder with Quiz feature"

# Add your GitHub repo as remote (replace with YOUR username and repo name)
git remote add origin https://github.com/YOUR-USERNAME/ai-agent-builder.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Verify:** Go to your GitHub repo URL and confirm all files are there.

---

## STEP 2: Deploy Backend to Railway (10 minutes)

### 2.1 Sign Up for Railway
1. Go to [railway.app](https://railway.app)
2. Click "Login" → **Sign up with GitHub**
3. Authorize Railway to access your repos

### 2.2 Create New Project
1. Click "**New Project**"
2. Select "**Deploy from GitHub repo**"
3. Choose your repository: `ai-agent-builder`
4. Railway will detect your project

### 2.3 Configure Backend Service
1. Railway creates a service automatically
2. Click on the service card
3. Go to **Settings** tab:
   - **Root Directory:** Type `backend` and save
   - **Watch Paths:** Leave as default

### 2.4 Add Environment Variables
1. Click "**Variables**" tab
2. Click "**+ New Variable**" for each:

```
GROQ_API_KEY
```
Value: `your-groq-api-key-here` (from console.groq.com)

```
CORS_ORIGINS
```
Value: `*` (temporary, we'll update this later)

3. Click "**Add** for each variable

### 2.5 Generate Domain
1. Go to "**Settings**" tab
2. Scroll to "**Networking**" section
3. Click "**Generate Domain**"
4. Copy your backend URL: `https://xyz-production.up.railway.app`
5. **SAVE THIS URL** - you'll need it!

### 2.6 Verify Backend is Running
1. Wait 2-3 minutes for deployment
2. Open your backend URL in browser: `https://your-url.railway.app/api/`
3. Should see: `{"message":"Forge agent builder API","status":"ok"}`

**✅ Backend is live!**

---

## STEP 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "**Sign Up**" → Use GitHub
3. Authorize Vercel

### 3.2 Import Project
1. Click "**Add New...**" → "**Project**"
2. Find your repository: `ai-agent-builder`
3. Click "**Import**"

### 3.3 Configure Project
1. **Framework Preset:** Auto-detected as "Create React App" ✅
2. **Root Directory:** Click "**Edit**" → Change to `frontend` → **Save**
3. **Build Command:** Leave as `yarn build` ✅
4. **Output Directory:** Leave as `build` ✅

### 3.4 Add Environment Variable
1. Expand "**Environment Variables**"
2. Add variable:

**Name:**
```
REACT_APP_BACKEND_URL
```

**Value:** (Your Railway backend URL from Step 2.5)
```
https://your-backend-production.up.railway.app
```
⚠️ **No trailing slash!**

3. Click "**Add**"

### 3.5 Deploy
1. Click "**Deploy**"
2. Wait 2-3 minutes
3. You'll see "**Congratulations!**" when done
4. Click "**Visit**" or copy your URL: `https://your-project.vercel.app`

**✅ Frontend is live!**

---

## STEP 4: Connect Frontend & Backend (2 minutes)

### 4.1 Update Backend CORS
1. Go back to **Railway** dashboard
2. Click your backend service
3. Go to "**Variables**" tab
4. Find `CORS_ORIGINS` variable
5. Click "**Edit**" (pencil icon)
6. Change from `*` to your Vercel URL:
   ```
   https://your-project.vercel.app
   ```
   ⚠️ **No trailing slash!**
7. Click "**Save**"
8. Railway will **automatically redeploy** (wait 1-2 minutes)

### 4.2 Wait for Redeploy
Watch for the green checkmark ✅ in Railway dashboard

---

## STEP 5: Test Your Live App! 🎉

### 5.1 Open Your App
Go to your Vercel URL: `https://your-project.vercel.app`

### 5.2 Test Everything
- ✅ Homepage loads with animations
- ✅ Logo glows on hover
- ✅ Click "Take Quiz" → Quiz works
- ✅ Complete quiz → Redirects to builder
- ✅ Create an agent → Works
- ✅ Go to library → See your agents
- ✅ Click on agent → Chat opens
- ✅ Send message → Response streams ✅

### 5.3 Check Browser Console
1. Press F12 → Console tab
2. Should have **NO errors**
3. If you see CORS error, verify Step 4.1 again

---

## 🎊 SUCCESS! Your App is Live!

You now have:
- ✅ Backend running on Railway
- ✅ Frontend running on Vercel
- ✅ Database (SQLite on Railway)
- ✅ Free Groq API working
- ✅ Everything connected

### Share Your App:
```
https://your-project.vercel.app
```

---

## 🔧 Troubleshooting

### "CORS Error" in Console
**Fix:**
1. Railway → Variables → `CORS_ORIGINS` must exactly match Vercel URL
2. No trailing slash: `https://abc.vercel.app` ✅ not `https://abc.vercel.app/` ❌
3. Use `https://` not `http://`
4. Wait for Railway redeploy (2 minutes)
5. Hard refresh browser (Ctrl + Shift + R)

### Backend Returns 500 Error
**Fix:**
1. Railway → Your service → Click "View Logs"
2. Look for error message
3. Usually: Check `GROQ_API_KEY` is correct
4. Go to [console.groq.com](https://console.groq.com) → Copy fresh key
5. Update in Railway variables

### Chat Not Streaming
**Fix:**
1. Ensure backend is on Railway (NOT Vercel - Vercel kills streams)
2. Check browser console for errors
3. Test backend directly: `https://your-backend.railway.app/api/`

### Frontend Won't Build
**Fix:**
1. Vercel → Your project → Settings → General
2. Verify Root Directory = `frontend`
3. Redeploy from Vercel dashboard

---

## 📊 Your Live URLs

Fill these in after deployment:

**Backend (Railway):**
```
https://_________________.up.railway.app
```

**Frontend (Vercel):**
```
https://_________________.vercel.app
```

**Test Backend:**
```
https://your-backend.railway.app/api/
```
Should return: `{"message":"Forge agent builder API","status":"ok"}`

---

## 🎯 Next Steps

### Optional Improvements:
1. **Custom Domain**
   - Vercel → Settings → Domains → Add your domain
   - Update Railway CORS to new domain

2. **Monitor Usage**
   - Check Groq dashboard for API usage
   - Railway → Metrics tab

3. **Share on Social Media**
   - Tweet your project!
   - Post on LinkedIn
   - Share with friends

---

## 💰 Costs (All Free!)

- **Railway:** Free tier (500 hours/month = 24/7)
- **Vercel:** Free tier (unlimited)
- **Groq:** Free 14,400 requests/day
- **Total:** $0/month 🎉

---

## 🆘 Need Help?

1. Check Railway logs for backend errors
2. Check Vercel logs for frontend errors
3. Test locally first to isolate issue
4. Review `DEPLOY.md` for detailed info

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway backend deployed
- [ ] Backend URL obtained
- [ ] Vercel frontend deployed
- [ ] Frontend URL obtained
- [ ] CORS updated on Railway
- [ ] Both services redeployed
- [ ] Tested live app
- [ ] No console errors
- [ ] Quiz works
- [ ] Chat streams correctly
- [ ] Shared with friends 🎉

---

**Estimated Total Time:** 20 minutes

**Difficulty:** Easy (following this guide)

**Result:** Live AI Agent Builder! 🚀

---

🎉 **Congratulations on deploying your first full-stack AI app!**
