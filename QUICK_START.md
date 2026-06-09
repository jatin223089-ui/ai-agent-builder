# Quick Start Guide

## Get Your AI Agent Builder Running in 2 Minutes

### Prerequisites
✅ Python 3.11+  
✅ Node.js 18+  
✅ Yarn  
✅ Groq API Key (free from https://console.groq.com/keys)

---

## Step 1: Configure Backend (30 seconds)

```bash
cd backend
```

Edit `.env` file and add your Groq API key:
```env
GROQ_API_KEY=your_actual_key_here
```

---

## Step 2: Start Backend (30 seconds)

```bash
python -m uvicorn server:app --reload --port 8000
```

✅ Wait for: "Application startup complete"  
✅ Backend running at: http://localhost:8000

---

## Step 3: Start Frontend (30 seconds)

Open a NEW terminal:

```bash
cd frontend
yarn start
```

✅ Wait for: "webpack compiled successfully"  
✅ Frontend running at: http://localhost:3000

---

## Step 4: Create Your First Agent (30 seconds)

1. Open browser: http://localhost:3000
2. Click **"Create Your First Agent"**
3. Choose a template (or Custom)
4. Click **"Create & Chat"**
5. Start chatting!

---

## That's It! 🎉

Your AI Agent Builder is now running.

### What to Try:
- Create a **Research Assistant** for finding information
- Create a **Code Assistant** for programming help
- Create a **Writing Coach** for improving text
- Create a **Custom Agent** for anything else

### Stuck?
- Check `PROJECT_SUMMARY.md` for full documentation
- Check `FIXES_APPLIED.md` for troubleshooting
- Visit http://localhost:8000/docs for API docs

---

## Quick Commands

### Stop Servers
Press `Ctrl+C` in each terminal

### Restart Backend
```bash
cd backend
python -m uvicorn server:app --reload --port 8000
```

### Restart Frontend
```bash
cd frontend
yarn start
```

### Reset Database
```bash
cd backend
# Stop backend first, then:
rm forge.db
# Start backend again - fresh database created
```

---

## Keyboard Shortcuts

### In Chat:
- **Enter** - Send message
- **Shift+Enter** - New line
- **Ctrl+K** - (Future: Clear input)

### In Builder:
- **Tab** - Move between fields
- **Ctrl+S** - (Future: Quick save)

---

## Tips

💡 **Start Simple**: Begin with a template  
💡 **Experiment**: Try different creativity levels  
💡 **Save Often**: Changes save automatically  
💡 **Refresh Page**: If something looks wrong  
💡 **Check Console**: For any errors (F12)  

---

## Common Issues

### "Backend not responding"
→ Make sure backend is running on port 8000

### "Model error"
→ Check your Groq API key in backend/.env

### "Page won't load"
→ Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### "Database error"
→ Delete forge.db and restart backend

---

## Need More Help?

📖 **Full Guide**: See `PROJECT_SUMMARY.md`  
🎨 **UI Details**: See `UI_UX_IMPROVEMENTS.md`  
🔧 **Fixes**: See `FIXES_APPLIED.md`  
📝 **Original**: See `README.md`  

---

**Ready to build AI agents? Let's go! 🚀**
