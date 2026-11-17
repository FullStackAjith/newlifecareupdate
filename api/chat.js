// Vercel serverless function: POST /api/chat
// Works without the Express server. Set ONE of these in Vercel → Settings → Environment Variables:
//   GEMINI_API_KEY  (free tier available, recommended)   optional GEMINI_MODEL (default gemini-2.5-flash)
//   OPENAI_API_KEY                                       optional OPENAI_MODEL (default gpt-4o-mini)
import { centreFacts } from '../server/centre-facts.js';

const clean = (v, max) => (typeof v === 'string' ? v.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max) : '');

// Best-effort per-instance rate limit (serverless instances are short-lived, so this only blunts bursts).
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 40;
}

async function askGemini(system, history, message) {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const contents = [...history.map((h) => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })), { role: 'user', parts: [{ text: message }] }];
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { temperature: 0.2, maxOutputTokens: 400, thinkingConfig: { thinkingBudget: 0 } },
    }),
  });
  if (!r.ok) throw new Error(`Gemini ${r.status}`);
  const data = await r.json();
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
}

async function askOpenAI(system, history, message) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      max_tokens: 300,
      messages: [{ role: 'system', content: system }, ...history, { role: 'user', content: message }],
    }),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}`);
  const data = await r.json();
  return data.choices?.[0]?.message?.content?.trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'Too many messages. Please try again later.' });

  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : req.body || {};
  const message = clean(body.message, 1200);
  const language = body.language === 'ta' ? 'Tamil' : 'English';
  const history = (Array.isArray(body.history) ? body.history : []).slice(-6)
    .filter((h) => (h?.role === 'user' || h?.role === 'assistant') && typeof h.content === 'string')
    .map((h) => ({ role: h.role, content: clean(h.content, 600) }));
  if (!message) return res.status(400).json({ error: 'Please enter a question.' });

  const system = `${centreFacts}\nRespond in ${language}.`;
  try {
    let reply;
    if (process.env.GEMINI_API_KEY) reply = await askGemini(system, history, message);
    else if (process.env.OPENAI_API_KEY) reply = await askOpenAI(system, history, message);
    else return res.status(503).json({ error: 'AI chat has not been configured.' });
    if (!reply) throw new Error('Empty AI response');
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('AI chat failed:', error?.message || 'unknown error');
    return res.status(502).json({ error: 'The assistant is temporarily unavailable.' });
  }
}
