import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Trash2,
  Pencil,
  RefreshCw,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  getAgent,
  listMessages,
  clearMessages,
  streamChat,
} from "../lib/api";
import { computeUsage, fmtCost, fmtTokens } from "../lib/usage";

export default function Chat() {
  const { id } = useParams();
  const nav = useNavigate();
  const [agent, setAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamBuf, setStreamBuf] = useState("");
  const [err, setErr] = useState("");
  const [lastSent, setLastSent] = useState("");
  const endRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getAgent(id), listMessages(id)])
      .then(([a, m]) => {
        if (cancelled) return;
        setAgent(a);
        setMessages(m);
      })
      .catch(() => {
        if (!cancelled) setErr("Agent not found");
      });
    return () => {
      cancelled = true;
      if (abortRef.current) abortRef.current.abort();
    };
  }, [id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streamBuf]);

  const onSend = async (overrideText) => {
    const useOverride = typeof overrideText === "string";
    const text = (useOverride ? overrideText : draft).trim();
    if (!text || streaming) return;
    setErr("");
    setLastSent(text);
    if (!useOverride) setDraft("");
    setStreaming(true);
    setStreamBuf("");

    const optimistic = {
      id: `tmp-${Date.now()}`,
      agent_id: id,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, optimistic]);

    const controller = new AbortController();
    abortRef.current = controller;
    let acc = "";
    try {
      for await (const evt of streamChat(id, text, controller.signal)) {
        if (evt.type === "delta") {
          acc += evt.content;
          setStreamBuf(acc);
        } else if (evt.type === "error") {
          setErr(evt.content || "Stream error");
        } else if (evt.type === "done") {
          break;
        }
      }
      // refresh from server so we get persisted ids
      const fresh = await listMessages(id);
      setMessages(fresh);
    } catch (e) {
      if (e.name !== "AbortError") {
        setErr(e.message || "Chat failed");
      }
    } finally {
      setStreaming(false);
      setStreamBuf("");
      abortRef.current = null;
    }
  };

  const onClear = async () => {
    if (!window.confirm("Clear the entire conversation?")) return;
    await clearMessages(id);
    setMessages([]);
  };

  if (err && !agent) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <p className="font-mono text-sm text-red-400">✗ {err}</p>
        <Link
          to="/library"
          className="inline-block mt-6 text-[#ff4d00] underline"
        >
          Back to library
        </Link>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20">
        <div className="font-mono text-sm text-zinc-500 scan-line border border-white/10 p-8">
          Loading agent
          <span className="blink-cursor" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] grid grid-cols-1 lg:grid-cols-[320px_1fr]">
      {/* LEFT PANEL */}
      <aside className="hidden lg:flex flex-col border-r border-white/10 bg-[#0a0a0b] overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <button
            onClick={() => nav("/library")}
            data-testid="chat-back-btn"
            className="font-mono text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1 mb-4"
          >
            <ArrowLeft size={12} /> library
          </button>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff4d00]">
            ◆ Chatting With
          </div>
          <h2 className="text-2xl font-medium mt-2 leading-tight">
            {agent.name}
          </h2>
          {agent.description && (
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              {agent.description}
            </p>
          )}
        </div>

        <div className="p-6 space-y-5 text-xs flex-1">
          <Spec label="Provider" value={agent.provider} />
          <Spec label="Model" value={agent.model} mono />
          <Spec label="Temperature" value={agent.temperature.toFixed(2)} mono />
          <UsagePanel messages={messages} model={agent.model} />
          <div>
            <div className="font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 text-xs">
              Instructions
            </div>
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap bg-[#121214] border border-white/10 p-4 max-h-72 overflow-y-auto rounded">
              {agent.system_prompt}
            </pre>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex flex-col gap-3">
          <Link
            to={`/builder/${agent.id}`}
            data-testid="chat-edit-agent-btn"
            className="inline-flex items-center justify-center gap-2 text-sm border border-white/10 hover:bg-white/5 text-zinc-300 px-4 py-2.5 transition-colors font-medium"
          >
            <Pencil size={16} /> Edit Agent
          </Link>
          <button
            onClick={onClear}
            data-testid="chat-clear-btn"
            className="inline-flex items-center justify-center gap-2 text-sm border border-white/10 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 text-zinc-300 px-4 py-2.5 transition-colors font-medium"
          >
            <Trash2 size={16} /> Clear Chat
          </button>
        </div>
      </aside>

      {/* CHAT */}
      <main className="flex flex-col min-h-0">
        <div
          className="flex-1 overflow-y-auto"
          data-testid="chat-thread"
        >
          <div className="max-w-3xl mx-auto px-6 py-8">
            {messages.length === 0 && !streaming && (
              <div className="border border-dashed border-white/10 p-12 text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff4d00] mb-4">
                  ◆ Ready to Chat
                </div>
                <h3 className="text-2xl font-medium">
                  Start chatting with{" "}
                  <span className="text-[#ff4d00]">{agent.name}</span>
                </h3>
                <p className="text-base text-zinc-400 mt-3">
                  Ask a question or give instructions. Your agent will respond instantly.
                </p>
              </div>
            )}

            <div className="space-y-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} m={m} />
              ))}
              {streaming && (
                <MessageBubble
                  m={{
                    id: "stream",
                    role: "assistant",
                    content: streamBuf,
                  }}
                  streaming
                />
              )}
            </div>

            {err && (
              <div
                data-testid="chat-error"
                className="mt-6 border border-red-500/50 bg-red-500/10 px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    size={16}
                    className="text-red-400 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-300">
                      stream error
                    </div>
                    <div className="mt-1 font-mono text-xs text-red-200 break-words whitespace-pre-wrap">
                      {err}
                    </div>
                    {lastSent && (
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => onSend(lastSent)}
                          disabled={streaming}
                          data-testid="chat-retry-btn"
                          className="inline-flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-100 px-3 py-1.5 transition-colors font-mono"
                        >
                          <RefreshCw size={12} /> retry
                        </button>
                        <button
                          onClick={() => setErr("")}
                          data-testid="chat-error-dismiss"
                          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1.5 transition-colors font-mono"
                        >
                          <X size={12} /> dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        </div>

        {/* INPUT */}
        <div className="border-t border-white/10 bg-[#0a0a0b]">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-end gap-2 border border-white/10 focus-within:border-[#ff4d00] transition-colors bg-[#121214]">
              <textarea
                data-testid="chat-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                placeholder={`Type your message... (Shift+Enter for new line)`}
                rows={1}
                className="flex-1 bg-transparent px-4 py-3 text-base resize-none focus:outline-none placeholder:text-zinc-600 max-h-40"
              />
              <button
                onClick={onSend}
                disabled={streaming || !draft.trim()}
                data-testid="chat-send-btn"
                className="m-2 inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white px-5 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {streaming ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span className="text-sm">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span className="text-base">Send</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-3 font-mono text-xs text-zinc-600 flex items-center justify-between">
              <span>
                {agent.provider} · {agent.model} · Creativity {agent.temperature.toFixed(2)}
              </span>
              <span>Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Spec({ label, value, mono }) {
  return (
    <div>
      <div className="font-mono uppercase tracking-[0.2em] text-zinc-500 text-[10px]">
        {label}
      </div>
      <div
        className={`mt-1 text-sm text-white ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function UsagePanel({ messages, model }) {
  const usage = useMemo(
    () => computeUsage(messages, model),
    [messages, model],
  );
  return (
    <div data-testid="chat-usage-panel">
      <div className="font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 text-[10px]">
        Usage
        <span className="ml-1 normal-case tracking-normal text-zinc-600">
          (approx)
        </span>
      </div>
      <div className="border border-white/10 bg-[#121214]">
        <UsageRow label="In" value={fmtTokens(usage.input)} hint="tokens" />
        <UsageRow label="Out" value={fmtTokens(usage.output)} hint="tokens" />
        <UsageRow
          label="Total"
          value={fmtTokens(usage.total)}
          hint="tokens"
          bold
        />
        <UsageRow
          label="Cost"
          value={usage.priced ? fmtCost(usage.cost) : "—"}
          hint={usage.priced ? "est." : "n/a"}
          accent
        />
      </div>
    </div>
  );
}

function UsageRow({ label, value, hint, bold, accent }) {
  return (
    <div className="flex items-baseline justify-between px-3 py-2 border-b border-white/5 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </span>
      <span
        className={`font-mono text-xs tabular-nums ${
          accent ? "text-[#ff4d00]" : bold ? "text-white" : "text-zinc-300"
        }`}
      >
        {value}{" "}
        <span className="text-zinc-600 text-[10px] normal-case">{hint}</span>
      </span>
    </div>
  );
}


function MessageBubble({ m, streaming }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end" data-testid="msg-user">
        <div className="max-w-[80%] bg-white/5 border border-white/10 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
          {m.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3" data-testid="msg-assistant">
      <div className="w-6 h-6 flex-shrink-0 bg-[#ff4d00] mt-1 flex items-center justify-center">
        <span className="font-mono text-[10px] text-black font-bold">A</span>
      </div>
      <div className="flex-1 text-sm leading-relaxed text-zinc-100 whitespace-pre-wrap font-mono">
        {m.content || (
          <span className="text-zinc-500">
            thinking<span className="blink-cursor" />
          </span>
        )}
        {streaming && m.content && <span className="blink-cursor" />}
      </div>
    </div>
  );
}
