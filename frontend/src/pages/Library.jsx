import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Pencil,
  Trash2,
  Plus,
  Sparkles,
} from "lucide-react";
import { listAgents, deleteAgent } from "../lib/api";

export default function Library() {
  const [agents, setAgents] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    listAgents().then(setAgents).catch(() => setAgents([]));
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this agent and its chat history?")) return;
    setBusyId(id);
    await deleteAgent(id);
    setAgents((prev) => prev.filter((a) => a.id !== id));
    setBusyId(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff4d00] mb-2">
            ◆ Your Agents
          </div>
          <h1 className="text-4xl tracking-tight font-medium">Agent Library</h1>
          <p className="text-zinc-400 mt-2 text-base">
            All your AI agents in one place. Chat, edit, or delete them.
          </p>
        </div>
        <Link
          to="/builder"
          data-testid="library-new-agent-btn"
          className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white px-6 py-3 font-medium transition-colors"
        >
          <Plus size={18} />
          Create New Agent
        </Link>
      </div>

      <div className="mt-10">
        {agents === null && (
          <div className="border border-white/10 bg-[#121214] p-10 scan-line">
            <span className="font-mono text-sm text-zinc-500">
              Loading agents
              <span className="blink-cursor" />
            </span>
          </div>
        )}

        {agents && agents.length === 0 && (
          <div className="border border-dashed border-white/15 p-16 text-center">
            <Sparkles size={32} className="mx-auto text-[#ff4d00]" />
            <h3 className="mt-6 text-2xl font-medium">No Agents Yet</h3>
            <p className="mt-3 text-zinc-400 text-base max-w-md mx-auto">
              You haven't created any AI agents yet. Create your first one to get started.
            </p>
            <Link
              to="/builder"
              data-testid="library-empty-cta"
              className="inline-flex mt-8 items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white px-6 py-3 font-medium transition-colors"
            >
              <Plus size={18} />
              Create Your First Agent
            </Link>
          </div>
        )}

        {agents && agents.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-white/10 bg-white/5"
            data-testid="library-grid"
          >
            {agents.map((a) => (
              <div
                key={a.id}
                data-testid={`agent-card-${a.id}`}
                className="bg-[#0a0a0b] hover:bg-[#121214] p-6 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium leading-tight">
                    {a.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-1.5 py-0.5 border border-white/10 text-zinc-400 whitespace-nowrap">
                    {a.provider}/{a.model}
                  </span>
                </div>
                {a.description && (
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {a.description}
                  </p>
                )}
                <div className="mt-4 text-[11px] font-mono text-zinc-600 line-clamp-2">
                  ▍ {a.system_prompt}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => nav(`/chat/${a.id}`)}
                    data-testid={`agent-chat-${a.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm bg-[#ff4d00] hover:bg-[#ff6b2b] text-white py-2.5 transition-colors font-medium"
                  >
                    <MessageSquare size={16} />
                    Start Chat
                  </button>
                  <button
                    onClick={() => nav(`/builder/${a.id}`)}
                    data-testid={`agent-edit-${a.id}`}
                    className="inline-flex items-center justify-center text-sm border border-white/10 hover:bg-white/5 text-zinc-300 px-3 py-2.5 transition-colors"
                    title="Edit Agent"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(a.id)}
                    disabled={busyId === a.id}
                    data-testid={`agent-delete-${a.id}`}
                    className="inline-flex items-center justify-center text-sm border border-white/10 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 text-zinc-300 px-3 py-2.5 transition-colors disabled:opacity-50"
                    title="Delete Agent"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
