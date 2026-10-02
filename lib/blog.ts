import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  cover: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function loadPosts(): BlogPost[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .reverse();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: String(data.title ?? ""),
      category: String(data.category ?? "Market Insights"),
      author: String(data.author ?? "Savanna Realty Group"),
      authorRole: String(data.authorRole ?? ""),
      date: String(data.date ?? ""),
      readTime: String(data.readTime ?? "5 min read"),
      cover: String(data.cover ?? "nairobi-cityscape"),
      excerpt: String(data.excerpt ?? ""),
      content,
    };
  });
}

let cached: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (!cached) cached = loadPosts();
  return cached;
}

export function getPostMetas(): BlogPostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
