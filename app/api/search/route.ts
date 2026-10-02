import { NextRequest, NextResponse } from "next/server";
import { searchProperties, type SearchFilters } from "@/lib/properties";

export const dynamic = "force-dynamic";

/**
 * GET /api/search
 * Query params: listing (buy|rent), type, location, minPrice, maxPrice,
 * beds, q. Returns matching listings.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const filters: SearchFilters = {
    listing: sp.get("listing") ?? undefined,
    type: sp.get("type") ?? undefined,
    location: sp.get("location") ?? undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    beds: sp.get("beds") ? Number(sp.get("beds")) : undefined,
    q: sp.get("q") ?? undefined,
  };

  const results = searchProperties(filters);

  return NextResponse.json({
    count: results.length,
    filters,
    properties: results,
  });
}
