import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Save, ArrowLeft, Wand2 } from "lucide-react";
import { TEMPLATES, MODELS, PROVIDERS } from "../lib/agents";
import { createAgent, getAgent, updateAgent } from "../lib/api";

const empty = {
  name: "",
  description: "",
  system_prompt: "You are a helpful assistant.",
  provider: "groq",
  model: "llama-3.1-8b-instant",
  temperature: 0.7,
  template: null,
};

export default function Builder() {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const editMode = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(editMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editMode) {
      getAgent(id)
        .then((a) => {
          setForm({
            name: a.name,
            description: a.description || "",
            system_prompt: a.system_prompt,
            provider: a.provider,
            model: a.model,
            temperature: a.temperature,
            template: a.template,
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Agent not found");
          setLoading(false);
        });
    } else if (location.state?.templateId) {
      // Apply template from quiz
      const template = TEMPLATES.find(t => t.id === location.state.templateId);
      if (template) {
        applyTemplate(template);
      }
    }
  }, [editMode, id, location.state]);

  const applyTemplate = (t) => {
    setForm((f) => ({
      ...f,
      name: f.name || t.name,
      description: f.description || t.description,
      system_prompt: t.system_prompt,
      provider: t.provider,
      model: t.model,
      temperature: t.temperature,
      template: t.id,
    }));
  };

  const onProviderChange = (p) => {
    const firstModel = MODELS[p] && MODELS[p].length > 0 ? MODELS[p][0].id : "llama-3.1-8b-instant";
    setForm((f) => ({ ...f, provider: p, model: firstModel }));
  };

  const onSave = async () => {
    setError("");
    if (!form.name.trim()) {
      setError("Give your agent a name.");
      return;
    }
    if (!form.system_prompt.trim()) {
      setError("System prompt cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      const agent = editMode
        ? await updateAgent(id, form)
        : await createAgent(form);
      nav(`/chat/${agent.id}`);
    } catch (e) {
      // Extract error message properly
      let errorMsg = "Save failed.";
      if (e?.response?.data?.detail) {
        const detail = e.response.data.detail;
        // If detail is an array (Pydantic validation errors)
        if (Array.isArray(detail)) {
          errorMsg = detail.map(err => `${err.loc?.join('.')} - ${err.msg}`).join('; ');
        } 
        // If detail is a string
        else if (typeof detail === 'string') {
          errorMsg = detail;
        }
        // If it's an object with errors array (our custom format)
        else if (detail.errors && Array.isArray(detail.errors)) {
          errorMsg = detail.errors.map(err => `${err.field}: ${err.message}`).join('; ');
        }
      }
      setError(errorMsg);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="font-mono text-sm text-zinc-500 scan-line border border-white/10 p-8">
          Loading agent
          <span className="blink-cursor" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <button
        onClick={() => nav(-1)}
        data-testid="builder-back-btn"
        className="font-mono text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1 mb-6"
      >
        <ArrowLeft size={12} /> back
      </button>

      <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff4d00] mb-2">
        ◆ {editMode ? "Edit Agent" : "Create Agent"}
      </div>
      <h1 className="text-4xl tracking-tight font-medium">
        {editMode ? form.name || "Edit Agent" : "Build Your AI Agent"}
      </h1>
      <p className="text-zinc-400 mt-2 text-base">
        {editMode ? "Update your agent's settings and instructions." : "Choose a template or start from scratch. Customize and start chatting."}
      </p>

      {!editMode && (
        <div className="mt-10">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mb-4">
            Choose a Template
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px border border-white/10 bg-white/5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t)}
                data-testid={`template-${t.id}`}
                className={`text-left p-6 transition-colors ${
                  form.template === t.id
                    ? "bg-[#1c1c1f] border-l-4 border-l-[#ff4d00]"
                    : "bg-[#0a0a0b] hover:bg-[#121214]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-base">{t.name}</span>
                  {form.template === t.id && (
                    <span className="font-mono text-[10px] text-[#ff4d00] uppercase tracking-widest">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 space-y-8">
        <Field label="Name" hint="Give your agent a name">
          <input
            data-testid="builder-name-input"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g., Research Assistant"
            className="w-full bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#ff4d00] transition-colors text-base"
          />
        </Field>

        <Field label="Description" hint="Optional - What does this agent do?">
          <input
            data-testid="builder-description-input"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="e.g., Researches topics and provides detailed answers"
            className="w-full bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#ff4d00] transition-colors text-base"
          />
        </Field>

        <Field
          label="Instructions"
          hint="Tell your agent how to behave and respond"
        >
          <textarea
            data-testid="builder-prompt-input"
            value={form.system_prompt}
            onChange={(e) =>
              setForm((f) => ({ ...f, system_prompt: e.target.value }))
            }
            rows={10}
            className="w-full bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#ff4d00] transition-colors text-base leading-relaxed resize-y"
            placeholder="e.g., You are a helpful assistant that provides clear and accurate information..."
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Field label="Provider" hint="AI service powering your agent">
            <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/5">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  data-testid={`provider-${p.id}`}
                  onClick={() => onProviderChange(p.id)}
                  className={`py-3 text-base font-medium transition-colors ${
                    form.provider === p.id
                      ? "bg-[#ff4d00] text-white"
                      : "bg-[#0a0a0b] hover:bg-[#121214] text-zinc-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Model" hint="Which AI model to use">
            <select
              data-testid="builder-model-select"
              value={form.model}
              onChange={(e) =>
                setForm((f) => ({ ...f, model: e.target.value }))
              }
              className="w-full bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#ff4d00] transition-colors text-base"
            >
              {MODELS[form.provider] && MODELS[form.provider].map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label={
            <span className="flex items-center justify-between w-full">
              <span>Creativity Level</span>
              <span className="font-mono text-base text-[#ff4d00] tabular-nums">
                {form.temperature.toFixed(2)}
              </span>
            </span>
          }
          hint="0 = Very focused and consistent · 1 = Very creative and varied"
        >
          <input
            type="range"
            data-testid="builder-temp-slider"
            min="0"
            max="1"
            step="0.05"
            value={form.temperature}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                temperature: parseFloat(e.target.value),
              }))
            }
            className="w-full accent-[#ff4d00] h-2"
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-2">
            <span>Focused</span>
            <span>Creative</span>
          </div>
        </Field>

        {error && (
          <div
            data-testid="builder-error"
            className="border border-red-500/40 bg-red-500/5 text-red-300 font-mono text-xs px-4 py-3"
          >
            ✗ {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
          <button
            onClick={() => nav("/library")}
            data-testid="builder-cancel-btn"
            className="px-6 py-3 border border-white/10 hover:bg-white/5 text-zinc-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            data-testid="builder-save-btn"
            className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white px-8 py-3 font-medium transition-colors disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="font-mono text-sm">Saving...</span>
                <span className="blink-cursor" />
              </>
            ) : editMode ? (
              <>
                <Save size={18} /> Save Changes
              </>
            ) : (
              <>
                <Wand2 size={18} /> Create & Chat
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          {label}
        </label>
        {hint && <span className="text-[11px] text-zinc-600">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
