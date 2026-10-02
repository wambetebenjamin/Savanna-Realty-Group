import { NextRequest, NextResponse } from "next/server";
import { kvListPush } from "@/lib/kv";
import { notifyWhatsApp, leadWaLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

interface ValuationBody {
  name?: string;
  phone?: string;
  address?: string;
  kind?: "valuation" | "viewing" | "contact";
  message?: string;
}

/**
 * POST /api/valuation
 * Saves a valuation request (or viewing / contact request) to Vercel KV and
 * sends a WhatsApp notification to the business number when a transport is
 * configured. Always returns a wa.me link as a guaranteed delivery channel.
 */
export async function POST(req: NextRequest) {
  let body: ValuationBody;
  try {
    body = (await req.json()) as ValuationBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const address = body.address?.trim();
  const kind = body.kind === "viewing" || body.kind === "contact" ? body.kind : "valuation";

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 422 },
    );
  }
  if (kind === "valuation" && !address) {
    return NextResponse.json(
      { error: "Property address is required for a valuation." },
      { status: 422 },
    );
  }

  const record = {
    kind,
    name,
    phone,
    address: address ?? "",
    message: body.message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  await kvListPush("valuation-requests", record);
  const notified = await notifyWhatsApp({
    kind,
    name,
    phone,
    address: record.address,
    message: record.message,
  });

  return NextResponse.json(
    {
      ok: true,
      saved: true,
      whatsappNotified: notified,
      whatsappUrl: leadWaLink({
        kind,
        name,
        phone,
        address: record.address,
        message: record.message,
      }),
    },
    { status: 201 },
  );
}
