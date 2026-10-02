import { NextResponse } from "next/server";
import { PROPERTIES } from "@/lib/properties";
import { kvGet } from "@/lib/kv";

export const dynamic = "force-dynamic";

/**
 * GET /api/properties
 * Returns all listings. Reads overrides from Vercel KV when configured,
 * falling back to the bundled JSON dataset.
 */
export async function GET() {
  const { value: overrides, source } = await kvGet<unknown[]>("properties");

  let properties = PROPERTIES;
  if (Array.isArray(overrides) && overrides.length > 0) {
    properties = overrides as typeof PROPERTIES;
  }

  return NextResponse.json({
    count: properties.length,
    source: source === "vercel-kv" ? "vercel-kv" : "json",
    properties,
  });
}
