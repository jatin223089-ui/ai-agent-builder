# 🆓 Free AI API Setup Guide

This guide shows you how to use **completely FREE** AI APIs with your Agent Builder.

---

## ✅ Recommended: Groq (Fastest & Easiest)

### Why Groq?
- ✅ **14,400 requests per day FREE**
- ✅ **Super fast responses** (faster than OpenAI)
- ✅ **No credit card required**
- ✅ Access to Llama 3, Mixtral, Gemma models

### Setup Steps:

1. **Sign up for free**: https://console.groq.com
2. **Create API Key**:
   - Go to https://console.groq.com/keys
   - Click "Create API Key"
   - Copy your key (starts with `gsk_`)
3. **Add to your .env file**:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```
4. **Restart the backend server**
5. **Use these models**:
   - `llama3-8b-8192` (fast, good quality)
   - `llama3-70b-8192` (slower, best quality)
   - `mixtral-8x7b-32768` (great for long context)
   - `gemma-7b-it` (Google's model)

---

## Alternative Free Options

### 1. Hugging Face Inference API

**Free Tier**: Rate limited but works well

1. Sign up: https://huggingface.co/join
2. Get API key: https://huggingface.co/settings/tokens
3. Add to `.env`:
   ```
   HUGGINGFACE_API_KEY=hf_your_key_here
   ```

### 2. Together AI

**Free Credits**: $25 on sign-up

1. Sign up: https://api.together.xyz/signup
2. Get API key from dashboard
3. Add to `.env`:
   ```
   TOGETHER_API_KEY=your_key_here
   ```

---

## Current Priority Order

Your backend checks for API keys in this order:

1. **GROQ_API_KEY** (FREE - recommended)
2. **EMERGENT_LLM_KEY** (if you have access)
3. **OPENAI_API_KEY** (requires billing)

Just add the one you want to use in your `.env` file!

---

## Quick Start with Groq

1. Get your free key from: https://console.groq.com/keys
2. Open: `backend/.env`
3. Replace:
   ```
   GROQ_API_KEY=
   ```
   With:
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```
4. Restart backend server
5. Start chatting! 🎉

---

## Troubleshooting

**"No API key configured" error?**
- Make sure you added the key to `backend/.env`
- Restart the backend server
- Check the server logs to see which API it's using

**Models not working?**
- For Groq, use: `llama3-8b-8192`, `llama3-70b-8192`, or `mixtral-8x7b-32768`
- Check Groq docs for latest model names: https://console.groq.com/docs/models

**Rate limit hit?**
- Groq free tier: 14,400 requests/day
- Wait for reset or sign up for another service

---

## Benefits of Each Service

| Service | Free Tier | Speed | Best For |
|---------|-----------|-------|----------|
| **Groq** | 14,400/day | ⚡ Very Fast | General use, daily projects |
| Hugging Face | Rate limited | Medium | Experimentation |
| Together AI | $25 credit | Fast | Testing before committing |
| Emergent | Depends | Medium | Multi-model access |
| OpenAI | None | Fast | Production (paid) |

---

## 🎯 Start Using Free AI Now!

1. Go to: https://console.groq.com
2. Sign up (no credit card)
3. Get your API key
4. Add it to `.env`
5. Build unlimited AI agents for FREE! 🚀
