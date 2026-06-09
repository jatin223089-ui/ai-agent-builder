# 🤖 Forge - AI Agent Builder

Build custom AI agents in minutes. No coding required.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- **6 Ready Templates** - Research, Code, Writing, Learning, Strategy, Custom
- **Interactive Quiz** - Find your perfect agent with a 5-question quiz
- **Multiple AI Models** - Choose from Llama 3.1 8B, 70B, 3.3 70B, Mixtral
- **Live Chat** - Real-time streaming conversations with your agents
- **Easy Customization** - Simple instructions, no coding needed
- **Free Forever** - Powered by Groq API (14,400 requests/day free)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and Yarn
- Python 3.11+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ai-agent-main
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file:
```env
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:3000
```

Start backend:
```bash
python -m uvicorn server:app --reload --port 8000
```

3. **Frontend Setup**
```bash
cd frontend
yarn install
```

Create `.env` file:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

Start frontend:
```bash
yarn start
```

4. **Open Browser**
Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
ai-agent-main/
├── backend/                 # FastAPI Python backend
│   ├── server.py           # Main API server
│   ├── database.py         # SQLite database
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example       # Environment variables template
│   └── Procfile           # Railway/Render deployment config
├── frontend/               # React frontend
│   ├── src/
│   │   ├── pages/         # Main pages (Landing, Library, Builder, Chat, Quiz)
│   │   ├── components/    # Reusable components (Logo, TopBar, UI)
│   │   ├── lib/          # Utilities (agents, API client)
│   │   └── index.css     # Global styles + animations
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── DEPLOY.md             # Deployment guide
├── QUICK_START.md        # Getting started guide
├── FREE_API_SETUP.md     # Groq API setup guide
├── QUIZ_FEATURE.md       # Quiz feature documentation
└── README.md             # This file
```

---

## 🎨 Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icons
- **Axios** - HTTP client

### Backend
- **FastAPI** - Python web framework
- **SQLite** - Database
- **Groq API** - LLM provider (Llama models)
- **Pydantic** - Data validation

---

## 🎯 Available Templates

1. **Research Assistant** - Thorough research with detailed answers
2. **Code Assistant** - Clean code with explanations
3. **Writing Coach** - Constructive feedback on writing
4. **Learning Tutor** - Teaches through guided questions
5. **Product Strategist** - Strategic analysis and feedback
6. **Custom Agent** - Start from scratch

---

## 🌐 Deployment

See [DEPLOY.md](./DEPLOY.md) for complete deployment instructions.

**Recommended Stack (Free Tier):**
- Frontend: Vercel
- Backend: Railway or Render
- Database: SQLite (included) or MongoDB Atlas

---

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [DEPLOY.md](./DEPLOY.md) - Deployment instructions
- [FREE_API_SETUP.md](./FREE_API_SETUP.md) - Groq API setup
- [QUIZ_FEATURE.md](./QUIZ_FEATURE.md) - Quiz feature details

---

## 🎮 Usage

### Creating an Agent

1. **Take the Quiz** - Answer 5 questions to find your perfect template
2. **Or Choose Template** - Pick from 6 pre-made templates
3. **Or Create Custom** - Start from scratch

### Customization

- **Name & Description** - Identify your agent
- **Instructions** - Tell it how to behave
- **AI Model** - Choose speed vs quality
- **Creativity Level** - Adjust temperature (0 = focused, 1 = creative)

### Chatting

- Type your message and press Enter
- Responses stream in real-time
- All conversations auto-save
- Edit or delete agents anytime

---

## 🎨 UI Features

### Animations
- Floating gradient orbs in hero section
- Animated lines sweeping across screen
- Floating particles with 3D transforms
- Rotating geometric shapes
- Pulsing dots with expanding glow
- Smooth hover effects and transitions

### Design System
- **Colors:** Dark theme (#0a0a0b) with orange accent (#ff4d00)
- **Typography:** IBM Plex Sans + JetBrains Mono
- **Layout:** Maximum 1400px width, consistent spacing
- **Buttons:** 44-48px height for accessibility

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
GROQ_API_KEY=gsk_...
CORS_ORIGINS=http://localhost:3000
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Available AI Models

- `llama-3.1-8b-instant` - Fastest, great for quick responses
- `llama-3.1-70b-versatile` - Balanced, best for most tasks
- `llama-3.3-70b-versatile` - Highest quality, most capable
- `mixtral-8x7b-32768` - Long context (32K tokens)

---

## 🐛 Troubleshooting

### CORS Error
- Ensure `CORS_ORIGINS` in backend matches frontend URL exactly
- No trailing slashes

### Database Issues
- Delete `backend/forge.db` to reset database
- Check file permissions

### API Errors
- Verify Groq API key is correct
- Check rate limits (14,400 requests/day)

### Build Errors
- Clear node_modules: `rm -rf node_modules && yarn install`
- Clear cache: `yarn cache clean`

---

## 📊 API Limits (Groq Free Tier)

- **Requests:** 14,400/day
- **Tokens:** 750,000/day
- **Rate:** 30 requests/minute
- **Context:** Varies by model (8K-32K tokens)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## 🙏 Acknowledgments

- **Groq** - For fast, free LLM inference
- **React Team** - For the amazing framework
- **Tailwind CSS** - For utility-first styling
- **FastAPI** - For the blazing-fast Python framework

---

## 📧 Support

For issues or questions:
1. Check [Documentation](./QUICK_START.md)
2. Search [Issues](../../issues)
3. Create new issue if needed

---

## 🎉 What's Next?

Your AI Agent Builder is production-ready! 

**Try it now:**
1. Visit `http://localhost:3000`
2. Click "Take Quiz" for personalized recommendations
3. Or browse templates and create your first agent
4. Start chatting and building amazing things!

---

**Built with ❤️ using React, FastAPI, and Groq**

*Last updated: 2026*
