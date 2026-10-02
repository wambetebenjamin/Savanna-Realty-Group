import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SmartImage } from "@/components/smart-image";
import { Reveal } from "@/components/reveal";
import { getPostMetas } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Market Insights",
  description:
    "Nairobi property market trends, buying guides and investment tips from the Savanna Realty Group team.",
};

export default function BlogPage() {
  const posts = getPostMetas();

  return (
    <>
      <PageHeader
        title="Market Insights"
        image="nairobi-skyline-dusk"
        imageAlt="Aerial view of the Nairobi skyline at dusk"
        crumb="Market Insights"
      />
      <section className="page-content">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">From Our Desk</span>
            <h2 className="h2">Research and guidance for Nairobi property</h2>
            <p className="lead">
              Street level price intelligence, practical buying guides and
              investment thinking, written by the agents who walk these
              neighbourhoods daily.
            </p>
          </div>
          <div className="blog-cards">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <article className="post-card">
                  <Link href={`/blog/${post.slug}`} className="post-card__media">
                    <SmartImage name={post.cover} alt={post.title} fill sizes="(max-width: 640px) 100vw, 33vw" />
                  </Link>
                  <div className="post-card__body">
                    <span className="post-card__tag">{post.category}</span>
                    <h3 className="post-card__title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="post-card__excerpt">{post.excerpt}</p>
                    <div className="post-card__meta">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
