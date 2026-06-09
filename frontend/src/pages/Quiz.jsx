import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { TEMPLATES } from "../lib/agents";

const QUESTIONS = [
  {
    id: 1,
    question: "What's your main goal?",
    options: [
      { text: "Learn and understand topics deeply", points: { researcher: 3, socratic: 2 } },
      { text: "Build and code projects", points: { "code-helper": 3, blank: 1 } },
      { text: "Improve my writing", points: { "writing-coach": 3 } },
      { text: "Make strategic decisions", points: { "product-strategist": 3 } },
      { text: "Something custom", points: { blank: 3 } },
    ],
  },
  {
    id: 2,
    question: "How do you prefer to learn?",
    options: [
      { text: "Give me direct answers quickly", points: { researcher: 2, "code-helper": 2 } },
      { text: "Guide me with questions to discover myself", points: { socratic: 3 } },
      { text: "Show examples and explain step-by-step", points: { "code-helper": 2, "writing-coach": 2 } },
      { text: "Challenge my assumptions critically", points: { "product-strategist": 3 } },
    ],
  },
  {
    id: 3,
    question: "What type of tasks will you do most?",
    options: [
      { text: "Research topics and gather information", points: { researcher: 3 } },
      { text: "Write and debug code", points: { "code-helper": 3 } },
      { text: "Write articles, emails, or content", points: { "writing-coach": 3 } },
      { text: "Brainstorm and evaluate ideas", points: { "product-strategist": 2, socratic: 1 } },
      { text: "Mix of everything", points: { blank: 2 } },
    ],
  },
  {
    id: 4,
    question: "What's your experience level?",
    options: [
      { text: "Beginner - I'm just starting out", points: { socratic: 2, researcher: 1 } },
      { text: "Intermediate - I know the basics", points: { "code-helper": 1, "writing-coach": 1 } },
      { text: "Advanced - I need expert-level help", points: { "product-strategist": 2, "code-helper": 2 } },
      { text: "Mixed - depends on the topic", points: { blank: 2 } },
    ],
  },
  {
    id: 5,
    question: "How detailed should responses be?",
    options: [
      { text: "Concise and to the point", points: { "code-helper": 2 } },
      { text: "Detailed with thorough explanations", points: { researcher: 3, "writing-coach": 2 } },
      { text: "Balanced - not too short or long", points: { "product-strategist": 2, socratic: 1 } },
      { text: "Let me decide case by case", points: { blank: 2 } },
    ],
  },
];

export default function Quiz() {
  const nav = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate result
      const scores = {};
      newAnswers.forEach((answer) => {
        Object.entries(answer.points).forEach(([templateId, points]) => {
          scores[templateId] = (scores[templateId] || 0) + points;
        });
      });

      // Find highest scoring template
      const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      const template = TEMPLATES.find((t) => t.id === winner);
      setResult(template);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  };

  const handleUseTemplate = () => {
    nav("/builder", { state: { templateId: result.id } });
  };

  // Result Screen
  if (result) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Result Card */}
          <div className="border border-white/10 bg-[#0a0a0b] p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="gradient-orb orb-1" style={{ width: 300, height: 300 }} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-[#ff4d00] bg-[#ff4d00]/10 mb-6">
                <Sparkles size={40} className="text-[#ff4d00]" />
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Your Perfect Match!
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#ff4d00]/30 bg-[#ff4d00]/10 mb-6">
                <span className="font-mono text-sm uppercase tracking-wider text-[#ff4d00] font-semibold">
                  {result.name}
                </span>
              </div>

              <p className="text-xl text-zinc-300 mb-8 leading-relaxed max-w-xl mx-auto">
                {result.description}
              </p>

              {/* Template Details */}
              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm max-w-md mx-auto">
                  <div className="text-left">
                    <div className="text-zinc-500 mb-1">AI Model</div>
                    <div className="text-white font-medium">
                      {result.model.includes("70b") ? "Llama 3.1 70B" : "Llama 3.1 8B"}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-zinc-500 mb-1">Creativity</div>
                    <div className="text-white font-medium">
                      {result.temperature < 0.4
                        ? "Focused"
                        : result.temperature > 0.6
                        ? "Creative"
                        : "Balanced"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleUseTemplate}
                  className="group inline-flex items-center gap-3 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white px-8 py-4 text-lg font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] w-full sm:w-auto justify-center"
                >
                  Create Agent
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-2"
                  />
                </button>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-[#ff4d00] hover:bg-white/5 text-white px-8 py-4 text-lg font-semibold transition-all w-full sm:w-auto justify-center"
                >
                  Retake Quiz
                </button>
              </div>

              <button
                onClick={() => nav("/builder")}
                className="mt-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Or browse all templates →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Questions
  const question = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              Question {currentQ + 1} of {QUESTIONS.length}
            </span>
            <span className="font-mono text-xs text-zinc-500">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#ff4d00] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="border border-white/10 bg-[#0a0a0b] p-8 lg:p-12 mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="group w-full text-left p-5 border border-white/10 hover:border-[#ff4d00] hover:bg-[#ff4d00]/5 transition-all text-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-white/20 group-hover:border-[#ff4d00] group-hover:bg-[#ff4d00] flex items-center justify-center font-mono text-sm transition-all">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-zinc-300 group-hover:text-white transition-colors">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentQ === 0}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            <span className="font-mono text-sm">Back</span>
          </button>

          <button
            onClick={() => nav("/builder")}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Skip quiz →
          </button>
        </div>
      </div>
    </div>
  );
}
