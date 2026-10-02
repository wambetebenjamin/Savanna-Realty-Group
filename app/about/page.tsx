import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SmartImage } from "@/components/smart-image";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { TestimonialCarousel } from "@/components/testimonials";
import { Magnetic } from "@/components/magnetic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Savanna Realty Group is a Nairobi real estate agency built on verified listings, honest valuation advice and diaspora friendly service since 2014.",
};

const VALUES = [
  {
    title: "Verified listings only",
    text: "Every property we market is physically inspected and title checked before it goes live. No ghost listings, no bait pricing.",
  },
  {
    title: "Advice before sales",
    text: "Our valuation team is paid to tell you what a property is worth, not what you want to hear. Sometimes the answer is do not sell.",
  },
  {
    title: "Diaspora by design",
    text: "Video walkthroughs, escrow verified payments and quarterly asset reports. Distance should never mean blind trust.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="We Put People First"
        image="family-new-home"
        imageAlt="A joyful family unpacking boxes in their new home"
        crumb="About Us"
      />

      <section className="page-content">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <SmartImage
                name="nairobi-skyline-vibrant"
                alt="Nairobi skyline viewed from above"
                width={640}
                height={540}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="h2">Twelve years of Nairobi ground truth</h2>
              <p style={{ color: "var(--muted)", marginTop: 16 }}>
                Savanna Realty Group opened its doors in Westlands in 2014 with
                two agents, one laptop and a stubborn belief that Nairobi
                deserved an agency buyers could trust. Today we are a team of
                eleven covering 24 neighbourhoods, from Kilimani apartments to
                Karen villas and quarter acre plots in Syokimau.
              </p>
              <p style={{ color: "var(--muted)", marginTop: 12 }}>
                We have stayed deliberately mid sized. Big enough to know every
                street, small enough that the agent who picks up your phone call
                is the one who walks the viewing with you.
              </p>
              <div className="mt-3" style={{ display: "grid", gap: 10 }}>
                {VALUES.map((v) => (
                  <div key={v.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 size={18} style={{ color: "var(--sage)", flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                    <div>
                      <strong>{v.title}.</strong>{" "}
                      <span style={{ color: "var(--muted)" }}>{v.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stat">
              <Counter to={480} suffix="+" />
              <div className="stat__label">Properties Sold</div>
            </div>
            <div className="stat">
              <Counter to={3.2} prefix="KES " suffix="B+" />
              <div className="stat__label">2025 Sales Volume</div>
            </div>
            <div className="stat">
              <Counter to={11} />
              <div className="stat__label">Team Members</div>
            </div>
            <div className="stat">
              <Counter to={98} suffix="%" />
              <div className="stat__label">Would Refer Us</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Client Stories</span>
            <h2 className="h2">What our clients say</h2>
          </div>
          <TestimonialCarousel />
          <div className="text-center mt-4">
            <Magnetic>
              <Link href="/contact" className="btn btn--sage">
                Talk to Our Team
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
