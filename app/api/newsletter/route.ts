import { NextRequest, NextResponse } from "next/server";
import { kvListPush } from "@/lib/kv";
import { notifyWhatsApp } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/newsletter
 * Saves a subscriber to the Vercel KV list "newsletter-subscribers".
 */
export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = (await req.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 },
    );
  }

  await kvListPush("newsletter-subscribers", {
    email,
    subscribedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, saved: true }, { status: 201 });
}
