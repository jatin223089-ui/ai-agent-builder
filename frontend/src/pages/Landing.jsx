import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Layers, MessageSquare, Sliders, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative">
      {/* HERO with Modern Animation */}
      <section className="relative border-b border-white/10 overflow-hidden bg-[#0a0a0b]">
        {/* Modern Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient orbs for depth */}
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          
          {/* Animated lines */}
          <div className="animated-line line-1" />
          <div className="animated-line line-2" />
          <div className="animated-line line-3" />
          <div className="animated-line line-4" />
          <div className="animated-line line-5" />
          
          {/* Floating particles - more of them */}
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
          <div className="particle particle-5" />
          <div className="particle particle-6" />
          <div className="particle particle-7" />
          <div className="particle particle-8" />
          <div className="particle particle-9" />
          <div className="particle particle-10" />
          <div className="particle particle-11" />
          <div className="particle particle-12" />
          
          {/* Geometric shapes */}
          <div className="geo-shape shape-1" />
          <div className="geo-shape shape-2" />
          <div className="geo-shape shape-3" />
          <div className="geo-shape shape-4" />
          
          {/* Pulsing dots */}
          <div className="pulse-dot dot-1" />
          <div className="pulse-dot dot-2" />
          <div className="pulse-dot dot-3" />
          <div className="pulse-dot dot-4" />
          <div className="pulse-dot dot-5" />
          
          {/* Grid with subtle animation */}
          <div className="absolute inset-0 grid-bg opacity-15" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0b]/70 to-[#0a0a0b]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-32 lg:pt-24 lg:pb-36">
          {/* Main Content */}
          <div className="text-center fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#ff4d00]/30 bg-[#ff4d00]/10 backdrop-blur-sm mb-6 hover:border-[#ff4d00]/50 transition-all">
              <div className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff4d00] font-semibold">
                Free AI Agent Builder
              </span>
              <div className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] max-w-5xl mx-auto">
              Build AI Agents
              <br />
              <span className="bg-gradient-to-r from-[#ff4d00] via-[#ff6b2b] to-[#ff4d00] bg-clip-text text-transparent">
                In Minutes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-zinc-300 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Create custom AI assistants with ease. Choose from templates,
              customize behavior, and start chatting instantly.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quiz"
                data-testid="landing-cta-quiz"
                className="group relative inline-flex items-center gap-3 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white px-10 py-5 text-lg font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] w-full sm:w-auto justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Sparkles size={20} className="relative z-10" />
                <span className="relative z-10">Take Quiz</span>
                <ArrowRight
                  size={20}
                  className="relative z-10 transition-transform group-hover:translate-x-2"
                />
              </Link>
              <Link
                to="/builder"
                data-testid="landing-cta-build"
                className="group inline-flex items-center gap-3 border-2 border-white/20 hover:border-[#ff4d00] hover:bg-white/5 text-white px-10 py-5 text-lg font-semibold transition-all w-full sm:w-auto justify-center"
              >
                Create Custom
              </Link>
              <Link
                to="/library"
                data-testid="landing-cta-library"
                className="group inline-flex items-center gap-3 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-10 py-5 text-lg font-semibold transition-all w-full sm:w-auto justify-center"
              >
                View Templates
                <Layers size={18} className="transition-transform group-hover:scale-110" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <Stat value="100%" label="Free Forever" icon="💎" />
              <Stat value="4+" label="AI Models" icon="🤖" />
              <Stat value="6" label="Templates" icon="⚡" />
              <Stat value="< 2min" label="Quick Setup" icon="🚀" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#ff4d00] mb-4">
            <span>◆</span> Features <span>◆</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold max-w-3xl mx-auto">
            Everything you need.
            <br />
            <span className="text-zinc-500">Nothing you don't.</span>
          </h2>
          <p className="mt-5 text-zinc-400 text-lg max-w-2xl mx-auto">
            Powerful features designed for simplicity and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            n="01"
            icon={<Layers size={24} />}
            title="Ready Templates"
            body="Start with pre-made agents for research, coding, writing, and more. Or create your own from scratch."
          />
          <Feature
            n="02"
            icon={<Sliders size={24} />}
            title="Easy Builder"
            body="Write simple instructions, choose your AI model, and adjust settings. No coding required."
          />
          <Feature
            n="03"
            icon={<MessageSquare size={24} />}
            title="Live Chat"
            body="Chat with your agents instantly. All conversations are saved automatically."
          />
          <Feature
            n="04"
            icon={<Zap size={24} />}
            title="Multiple Models"
            body="Use different AI models - fast ones for quick tasks, powerful ones for complex work. All free with Groq."
          />
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="border-t border-white/10 bg-[#0a0a0b]">
        <div className="max-w-[1400px] mx-auto px-6 py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff4d00] mb-3">
              ◆ How It Works
            </div>
            <h3 className="text-3xl tracking-tight font-medium">
              Three simple steps.
              <br />
              <span className="text-zinc-500">Start chatting fast.</span>
            </h3>
            <ol className="mt-8 space-y-6">
              {[
                { num: "01", title: "Choose", desc: "Pick a template or start from scratch" },
                { num: "02", title: "Customize", desc: "Write instructions and select your AI model" },
                { num: "03", title: "Chat", desc: "Start talking with your agent immediately" },
              ].map((step) => (
                <li key={step.num} className="flex gap-5">
                  <span className="text-2xl font-bold text-[#ff4d00] tabular-nums w-12">
                    {step.num}
                  </span>
                  <div>
                    <div className="text-xl font-medium text-white">{step.title}</div>
                    <div className="mt-1 text-zinc-400">{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-[#121214] p-6 font-mono text-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="w-2 h-2 bg-[#ff4d00]" />
                <span className="text-zinc-500">agent.config</span>
                <span className="ml-auto text-zinc-600">forge/v1.0</span>
              </div>
              <pre className="mt-4 text-zinc-300 leading-relaxed whitespace-pre-wrap">
{`{
  "name": "Research Assistant",
  "model": "llama-3.1-70b",
  "creativity": 0.3,
  "instructions": "You research topics...",
  "provider": "groq"
}`}
              </pre>
              <div className="mt-6 text-zinc-500">
                <span className="text-[#ff4d00]">$</span> forge chat --agent research
              </div>
              <div className="mt-2 text-zinc-300">
                ↳ streaming response<span className="blink-cursor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 bg-[#0a0a0b]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-500">
          <span>Forge AI Agent Builder · Easy to Use</span>
          <span>Powered by Groq</span>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  );
}

function Feature({ n, icon, title, body }) {
  return (
    <div className="bg-[#0a0a0b] p-6 hover:bg-[#121214] transition-colors">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[#ff4d00]">{icon}</span>
        <span className="font-mono text-xs text-zinc-600">{n}</span>
      </div>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
    </div>
  );
}
