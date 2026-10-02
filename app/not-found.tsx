import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { PillFilter } from "@/components/pill-filter";

export default function NotFound() {
  return (
    <section className="page-content" style={{ paddingTop: 160, paddingBottom: 120 }}>
      <div className="container">
        <div style={{ maxWidth: 560, marginInline: "auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Error 404</span>
          <h1 className="h1">This address does not exist</h1>
          <p style={{ color: "var(--muted)", margin: "14px 0 26px" }}>
            The page you are looking for may have been sold, let or moved.
            Try one of these instead.
          </p>
          <Link href="/" className="btn btn--sage">
            <Home size={15} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
        <div style={{ marginTop: 56 }}>
          <PillFilter />
          <p className="text-center" style={{ marginTop: 14 }}>
            <Link
              href="/properties"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: "var(--sage)",
              }}
            >
              Browse all properties
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
