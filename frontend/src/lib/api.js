import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API });

export const listAgents = () => client.get("/agents").then((r) => r.data);
export const getAgent = (id) => client.get(`/agents/${id}`).then((r) => r.data);
export const createAgent = (payload) =>
  client.post("/agents", payload).then((r) => r.data);
export const updateAgent = (id, payload) =>
  client.put(`/agents/${id}`, payload).then((r) => r.data);
export const deleteAgent = (id) =>
  client.delete(`/agents/${id}`).then((r) => r.data);
export const listMessages = (id) =>
  client.get(`/agents/${id}/messages`).then((r) => r.data);
export const clearMessages = (id) =>
  client.delete(`/agents/${id}/messages`).then((r) => r.data);

// Streaming chat: returns async iterator of deltas
export async function* streamChat(agentId, message, signal) {
  const res = await fetch(`${API}/agents/${agentId}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal,
  });
  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(`Chat failed: ${res.status} ${text}`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload) continue;
      try {
        const evt = JSON.parse(payload);
        yield evt;
      } catch (_e) {
        // ignore
      }
    }
  }
}
