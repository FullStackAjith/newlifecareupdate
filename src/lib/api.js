import { SITE, whatsappUrl } from '../config/site.js';

const API_BASE = import.meta.env?.VITE_API_BASE || '/api';

export class EnquiryError extends Error {
  constructor(kind) {
    super(kind);
    this.kind = kind; // 'network' | 'server'
  }
}

/** Build a plain-text WhatsApp message from an enquiry payload. */
export function buildWhatsAppEnquiryMessage(payload) {
  const lines = [
    'New website enquiry – New Life Care Rehab',
    '',
  ];
  if (payload.type) lines.push(`Type: ${payload.type}`);
  if (payload.name) lines.push(`Name: ${payload.name}`);
  if (payload.phone) lines.push(`Phone: ${payload.phone}`);
  if (payload.service) lines.push(`Topic: ${payload.service}`);
  if (payload.contactMethod) lines.push(`Preferred contact: ${payload.contactMethod}`);
  if (payload.seeking) lines.push(`Who is seeking help: ${payload.seeking}`);
  if (payload.callback) lines.push(`Preferred callback: ${payload.callback}`);
  if (payload.message) lines.push(`Message: ${payload.message}`);
  lines.push('', 'Sent from the New Life Care Rehab website.');
  return lines.join('\n');
}

/**
 * Deliver enquiry to the centre WhatsApp number.
 * Opens WhatsApp (app or web) with a pre-filled message. No backend required.
 * Optionally still POSTs to the API if one is configured (does not block success).
 */
export async function postEnquiry(payload) {
  // Honeypot: silent success for bots
  if (payload.website) {
    return { ok: true, via: 'honeypot' };
  }

  const message = buildWhatsAppEnquiryMessage(payload);
  const url = whatsappUrl(message);

  // Open company WhatsApp with the enquiry details
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    // Popup blocked – fall back to same-tab navigation
    window.location.href = url;
  }

  // Best-effort API save if a backend exists (do not fail the user flow)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).catch(() => null);
    clearTimeout(timer);
  } catch {
    /* API optional */
  }

  return { ok: true, via: 'whatsapp', reference: `WA-${Date.now().toString(36).toUpperCase()}` };
}

export async function postChat(message, language) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Chat service not configured');
  return data.reply;
}
