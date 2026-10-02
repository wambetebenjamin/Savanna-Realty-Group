import { NextRequest, NextResponse } from "next/server";
import { propertyBySlug } from "@/lib/properties";

export const dynamic = "force-dynamic";

/**
 * GET /api/properties/[slug]
 * Returns a single property detail payload.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const property = propertyBySlug(params.slug);
  if (!property) {
    return NextResponse.json(
      { error: "Property not found", slug: params.slug },
      { status: 404 },
    );
  }
  return NextResponse.json({ property });
}
