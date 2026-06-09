// Rough token + cost estimator.
// Token approximation: ~4 chars per token (good enough for a meter).
// Pricing per 1K tokens (USD) — directional, kept conservative.
// Source: published list prices, rounded for display.
const PRICING = {
  // openai
  "gpt-5": { in: 0.005, out: 0.015 },
  "gpt-5.2": { in: 0.005, out: 0.015 },
  "gpt-5.1": { in: 0.005, out: 0.015 },
  "gpt-5-mini": { in: 0.001, out: 0.003 },
  "gpt-4o": { in: 0.0025, out: 0.01 },
  "gpt-4o-mini": { in: 0.00015, out: 0.0006 },
  // anthropic
  "claude-sonnet-4-5-20250929": { in: 0.003, out: 0.015 },
  "claude-sonnet-4-6": { in: 0.003, out: 0.015 },
  "claude-haiku-4-5-20251001": { in: 0.0008, out: 0.004 },
  // gemini
  "gemini-2.5-flash": { in: 0.0003, out: 0.0025 },
  "gemini-3-flash-preview": { in: 0.0003, out: 0.0025 },
  "gemini-2.5-pro": { in: 0.00125, out: 0.005 },
};

export function approxTokens(text = "") {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

export function computeUsage(messages, model) {
  let inTok = 0;
  let outTok = 0;
  for (const m of messages) {
    const t = approxTokens(m.content);
    if (m.role === "user") inTok += t;
    else outTok += t;
  }
  const price = PRICING[model] || { in: 0, out: 0 };
  const cost = (inTok / 1000) * price.in + (outTok / 1000) * price.out;
  return {
    input: inTok,
    output: outTok,
    total: inTok + outTok,
    cost,
    priced: Boolean(PRICING[model]),
  };
}

export function fmtCost(c) {
  if (c < 0.0001) return "<$0.0001";
  if (c < 0.01) return `$${c.toFixed(4)}`;
  return `$${c.toFixed(3)}`;
}

export function fmtTokens(n) {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1)}k`;
}
