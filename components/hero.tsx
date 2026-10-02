import { MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { SmartImage } from "./smart-image";
import { SearchBar } from "./search-bar";
import { HeroParticles } from "./hero-particles";

const HEADLINE = "Find Your Place in Nairobi.";

/**
 * Home hero: cinematic Nairobi aerial photo, letter-by-letter staggered
 * headline (0.04s per character), search bar sliding up on load, and a
 * restrained Three.js particle field.
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <SmartImage
          name="hero-nairobi"
          alt="Aerial view of Nairobi residential neighbourhoods and the expressway"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero__overlay" />
      <HeroParticles />

      <div className="hero__content">
        <div className="container">
          <h1 className="hero__title" aria-label={HEADLINE}>
            {HEADLINE.split("").map((ch, i) => (
              <span
                key={i}
                className="ltr"
                style={{ "--i": i } as React.CSSProperties}
                aria-hidden="true"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
          <p className="hero__sub">
            Apartments, maisonettes, townhouses, commercial floors, land and new
            developments across Nairobi. Viewings arranged within 48 hours,
            diaspora clients welcome.
          </p>
          <SearchBar />
          <div className="hero__meta">
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              EARB licensed agency
            </span>
            <span>
              <TrendingUp size={16} aria-hidden="true" />
              KES 3.2B+ in 2025 sales
            </span>
            <span>
              <MapPin size={16} aria-hidden="true" />
              24 neighbourhoods covered
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
