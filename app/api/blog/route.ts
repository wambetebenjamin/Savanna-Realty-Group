import { NextResponse } from "next/server";
import { getPostMetas } from "@/lib/blog";

export const revalidate = 300;

/**
 * GET /api/blog
 * Returns market insight article metadata parsed from MDX files.
 */
export async function GET() {
  const posts = getPostMetas();
  return NextResponse.json({ count: posts.length, posts });
}
