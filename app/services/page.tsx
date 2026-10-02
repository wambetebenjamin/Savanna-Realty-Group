import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  KeyRound,
  Search,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ValuationForm } from "@/components/valuation-form";
import { Magnetic } from "@/components/magnetic";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Property sales, lettings and management, valuations, land acquisition and off plan investment advisory across Nairobi.",
};

const SERVICES = [
  {
    icon: KeyRound,
    title: "Residential Sales",
    text: "Marketing, viewings, negotiation and conveyancing support for houses and apartments across Nairobi's established suburbs.",
  },
  {
    icon: Building2,
    title: "Lettings and Management",
    text: "Tenant vetting, rent collection, inspections and full management at 5 to 8 percent of rent, with quarterly owner reports.",
  },
  {
    icon: Banknote,
    title: "Property Valuation",
    text: "Market backed valuations for sale, mortgage, insurance or probate, delivered within one working day of the site visit.",
  },
  {
    icon: Search,
    title: "Land Acquisition",
    text: "Scheme land in Syokimau, Kitengela, Ruaka and the bypass corridors, with title searches handled before you commit a shilling.",
  },
  {
    icon: TrendingUp,
    title: "Off Plan Advisory",
    text: "We underwrite every development before listing it: developer track record, escrow structure and independent QS supervision.",
  },
  {
    icon: KeyRound,
    title: "Diaspora Client Programme",
    text: "Live video viewings, power of attorney templates, escrow verified payments and asset management while you are away.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="How We Can Help"
        image="house-6"
        imageAlt="Modern villa with swimming pool and patio"
        crumb="Services"
      />

      <section className="page-content">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Services</span>
            <h2 className="h2">Everything a Nairobi property owner needs</h2>
            <p className="lead">
              Whether you are selling, letting, buying land or investing from
              abroad, there is a Savanna Realty service built for it.
            </p>
          </div>

          <div className="service-cards">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <article className="service-card">
                  <div className="service-card__icon">
                    <s.icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="split mt-4" style={{ marginTop: 80, alignItems: "start" }}>
            <div id="valuation">
              <span className="eyebrow">Selling or Letting?</span>
              <h2 className="h2">Start with a free valuation</h2>
              <p style={{ color: "var(--muted)", marginTop: 14 }}>
                Tell us about your property and our valuation team will come
                back within one working day with comparable sales data from
                your street and a clear recommendation: sell, let or hold.
              </p>
              <ul style={{ marginTop: 18, display: "grid", gap: 10, color: "var(--muted)", paddingLeft: 20 }}>
                <li>No obligation and no viewing fees</li>
                <li>Mortgage and insurance valuation formats available</li>
                <li>Diaspora owners: we can value from video walkthrough plus records</li>
              </ul>
              <div className="mt-3">
                <Magnetic>
                  <Link href="/properties" className="btn btn--sage">
                    See What We Are Selling
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </Magnetic>
              </div>
            </div>
            <div className="form--light" style={{ borderRadius: "var(--radius)" }}>
              <h3 className="h3" style={{ marginBottom: 16 }}>
                Request your valuation
              </h3>
              <ValuationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
