import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Handshake,
  KeyRound,
  MapPin,
  Search,
  TrendingUp,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { PillFilter } from "@/components/pill-filter";
import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { ParallaxBg } from "@/components/parallax";
import { AgentCard } from "@/components/agent-card";
import { TestimonialCarousel } from "@/components/testimonials";
import { ValuationForm } from "@/components/valuation-form";
import { SmartImage } from "@/components/smart-image";
import { Magnetic } from "@/components/magnetic";
import { AGENTS } from "@/lib/agents";
import { developments, featuredProperties } from "@/lib/properties";
import { SITE } from "@/lib/site";

const STEPS = [
  {
    icon: Search,
    title: "Search",
    text: "Browse verified listings across 24 Nairobi neighbourhoods, or tell us what you need and we will find it.",
  },
  {
    icon: CalendarDays,
    title: "Book a Viewing",
    text: "Pick a property and we arrange a guided viewing within 48 hours, in person or live on video call.",
  },
  {
    icon: Handshake,
    title: "Make an Offer",
    text: "We negotiate, run the title search with an independent advocate and structure the payment milestones.",
  },
  {
    icon: KeyRound,
    title: "Move In",
    text: "Transfer registers at Ardhi House, keys are handed over, and we stay on call for utilities and settling in.",
  },
];

export default function HomePage() {
  const featured = featuredProperties();
  const projects = developments();

  return (
    <>
      <Hero />

      {/* quick filter pills */}
      <section className="section section--tight" style={{ paddingBottom: 24 }}>
        <div className="container">
          <PillFilter />
        </div>
      </section>

      {/* featured listings */}
      <section className="section" id="featured">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Featured Listings</span>
            <h2 className="h2">Handpicked homes, verified by our agents</h2>
          </div>
          <div className="grid-cards">
            {featured.map((property, i) => (
              <Reveal key={property.slug} delay={i * 60}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-4">
            <Magnetic>
              <Link href="/properties" className="btn btn--sage">
                Browse All Properties
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* stats band (uptown counter) */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stat">
              <Counter to={480} suffix="+" />
              <div className="stat__label">Properties Sold</div>
            </div>
            <div className="stat">
              <Counter to={12} />
              <div className="stat__label">Years in Nairobi</div>
            </div>
            <div className="stat">
              <Counter to={24} />
              <div className="stat__label">Neighbourhoods</div>
            </div>
            <div className="stat">
              <Counter to={98} suffix="%" />
              <div className="stat__label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* new developments */}
      <section className="band" id="developments">
        <ParallaxBg
          image="dev-1"
          alt="Tower cranes over a residential development under construction"
        />
        <div className="band__overlay" />
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">New Developments</span>
            <h2 className="h2">Off plan opportunities launching soon</h2>
            <p className="lead">
              Buy early, pay in milestones and watch your asset rise. Every
              project we take on is escrow protected and independently
              supervised.
            </p>
          </div>
          <div className="dev-cards">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90}>
                <article className="dev-card">
                  <div className="dev-card__media">
                    <SmartImage
                      name={project.images[0]}
                      alt={`${project.name} development in ${project.location}, Nairobi`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <span className="dev-card__launch">
                      <TrendingUp size={12} aria-hidden="true" />
                      {project.development?.launchDate}
                    </span>
                  </div>
                  <div className="dev-card__body">
                    <h3 className="card__title">{project.name}</h3>
                    <div className="dev-card__row">
                      <MapPin size={14} aria-hidden="true" />
                      {project.location}, Nairobi
                    </div>
                    <div className="dev-card__row">
                      <CalendarDays size={14} aria-hidden="true" />
                      Completion {project.development?.completion}
                    </div>
                    <div className="dev-card__row">
                      <CheckCircle2 size={14} aria-hidden="true" />
                      {project.development?.units}
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: 8 }}>
                      <div className="meta" style={{ marginBottom: 4 }}>Starting from</div>
                      <div className="dev-card__price">{project.development?.startingPrice}</div>
                    </div>
                    <Link href={`/properties/${project.slug}`} className="btn btn--outline btn--block">
                      View Project
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="band" id="how-it-works">
        <ParallaxBg
          image="interior-living-2"
          alt="Elegant modern living room interior"
        />
        <div className="band__overlay" />
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">How It Works</span>
            <h2 className="h2">Four steps from search to keys</h2>
          </div>
          <div className="steps">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="step">
                  <span className="step__num">0{i + 1}</span>
                  <div className="step__icon">
                    <step.icon size={22} aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* meet the agents */}
      <section className="section section--sand" id="agents">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Meet the Agents</span>
            <h2 className="h2">The people who will pick up the phone</h2>
          </div>
          <div className="agents-row">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 60}>
                <AgentCard agent={agent} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="section section--sand" id="testimonials">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Client Stories</span>
            <h2 className="h2">Buyers who found their place</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* valuation CTA */}
      <section className="band valuation" id="valuation">
        <div className="container valuation__inner">
          <div>
            <span className="eyebrow">Free Property Valuation</span>
            <h2 className="h2">Get a Free Property Valuation</h2>
            <p>
              Thinking of selling or letting? Tell us about the property and we
              will come back within one working day with a market backed
              valuation, no obligation attached.
            </p>
            <div className="valuation__points">
              <span>
                <CheckCircle2 size={16} aria-hidden="true" />
                Comparable sales data from your street
              </span>
              <span>
                <CheckCircle2 size={16} aria-hidden="true" />
                Honest advice on whether to sell, let or hold
              </span>
              <span>
                <CheckCircle2 size={16} aria-hidden="true" />
                Diaspora owners handled over video call
              </span>
            </div>
          </div>
          <ValuationForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.url,
          }),
        }}
      />
    </>
  );
}
