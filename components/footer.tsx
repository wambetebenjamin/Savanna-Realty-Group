import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";

const CATEGORY_LINKS = [
  { label: "Apartments", href: "/properties?type=Apartment" },
  { label: "Maisonettes", href: "/properties?type=Maisonette" },
  { label: "Townhouses", href: "/properties?type=Townhouse" },
  { label: "Commercial", href: "/properties?type=Commercial" },
  { label: "Land", href: "/properties?type=Land" },
  { label: "New Developments", href: "/properties?type=New+Development" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Meet the Agents", href: "/agents" },
  { label: "Our Services", href: "/services" },
  { label: "Market Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="navbar__logo" style={{ color: "var(--ink)" }}>
              <span className="navbar__logo-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 20V10.5L12 3l9 7.5V20h-6v-6h-6v6H3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="navbar__logo-text">Savanna Realty</span>
                <span className="navbar__logo-sub">Group, Nairobi</span>
              </span>
            </Link>
            <p>
              Helping buyers, sellers, investors and diaspora Kenyans find their
              place in Nairobi since 2014. Licensed by the Estate Agents
              Registration Board.
            </p>
            <div className="footer__social">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={17} />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <Twitter size={17} />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer__title">Property Categories</h3>
            <div className="footer__links">
              {CATEGORY_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  <ArrowRight size={13} aria-hidden="true" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer__title">Company</h3>
            <div className="footer__links">
              {COMPANY_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  <ArrowRight size={13} aria-hidden="true" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer__title">Visit or Call</h3>
            <div className="footer__contact">
              <span>
                <MapPin size={16} aria-hidden="true" />
                {SITE.address}
              </span>
              <a href={`tel:${SITE.phone}`}>
                <Phone size={16} aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`}>
                <Mail size={16} aria-hidden="true" />
                {SITE.email}
              </a>
            </div>
            <h3 className="footer__title" style={{ marginTop: 26 }}>
              Market Insights Newsletter
            </h3>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
              Quarterly Nairobi price data and new listings, straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>
            Photography by Pexels contributors.{" "}
            <Link href="/image-credits">Image credits</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
