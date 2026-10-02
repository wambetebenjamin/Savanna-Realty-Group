import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, CalendarDays, Clock, Tag, User } from "lucide-react";
import { SmartImage } from "@/components/smart-image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: `/images/${post.cover}.jpg`, width: 500, height: 750, alt: post.title }],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name },
    image: `${SITE.url}/images/${post.cover}.jpg`,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-content" style={{ paddingTop: 140 }}>
        <div className="container">
          <div style={{ maxWidth: 760, marginInline: "auto" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: "var(--sage)",
                marginBottom: 22,
              }}
            >
              <ArrowLeft size={15} aria-hidden="true" />
              All Market Insights
            </Link>

            <span className="post-card__tag">{post.category}</span>
            <h1 className="h1" style={{ margin: "14px 0 18px" }}>
              {post.title}
            </h1>

            <div className="post-card__meta" style={{ border: 0, paddingTop: 0, marginBottom: 30 }}>
              <span>
                <User size={14} aria-hidden="true" />
                {post.author}, {post.authorRole}
              </span>
              <span>
                <CalendarDays size={14} aria-hidden="true" />
                {post.date}
              </span>
              <span>
                <Clock size={14} aria-hidden="true" />
                {post.readTime}
              </span>
              <span>
                <Tag size={14} aria-hidden="true" />
                {post.category}
              </span>
            </div>

            <div className="article-hero">
              <SmartImage name={post.cover} alt={post.title} fill priority sizes="100vw" />
            </div>

            <div className="prose">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
