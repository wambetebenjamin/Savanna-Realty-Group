/**
 * WhatsApp notification helper for lead capture endpoints.
 *
 * Two supported transports, both optional:
 *  1. WhatsApp Cloud API (Meta): set WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID
 *     and WHATSAPP_RECIPIENT (the business number, e.g. 254112272061).
 *  2. Generic webhook: set WHATSAPP_WEBHOOK_URL to any endpoint that accepts a
 *     JSON POST (for example a Make, Zapier or n8n scenario that forwards to
 *     WhatsApp).
 *
 * When neither is configured the lead is still saved (Vercel KV or fallback)
 * and the API returns a wa.me link the visitor can tap to deliver the same
 * message to the agent instantly, so no lead is ever lost in development.
 */

export interface LeadNotification {
  kind: "valuation" | "viewing" | "contact" | "newsletter";
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  message?: string;
}

const BUSINESS_NUMBER = "254112272061";

export function leadToText(lead: LeadNotification): string {
  const lines = [`New ${lead.kind} request from the Savanna Realty website`];
  if (lead.name) lines.push(`Name: ${lead.name}`);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.email) lines.push(`Email: ${lead.email}`);
  if (lead.address) lines.push(`Property: ${lead.address}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  return lines.join("\n");
}

export async function notifyWhatsApp(lead: LeadNotification): Promise<boolean> {
  const text = leadToText(lead);

  if (
    process.env.WHATSAPP_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID &&
    process.env.WHATSAPP_RECIPIENT
  ) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: process.env.WHATSAPP_RECIPIENT,
            type: "text",
            text: { body: text },
          }),
        },
      );
      if (res.ok) return true;
      console.error("[whatsapp] Cloud API responded", res.status);
    } catch (err) {
      console.error("[whatsapp] Cloud API failed", err);
    }
  }

  if (process.env.WHATSAPP_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: BUSINESS_NUMBER, ...lead, text }),
      });
      return res.ok;
    } catch (err) {
      console.error("[whatsapp] webhook failed", err);
    }
  }

  console.log(`[whatsapp:not-configured] ${text}`);
  return false;
}

export function leadWaLink(lead: LeadNotification): string {
  return `https://wa.me/${BUSINESS_NUMBER}?text=${encodeURIComponent(
    leadToText(lead),
  )}`;
}
