"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Magnetic } from "./magnetic";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    const base = href.split("?")[0];
    if (base !== pathname) return false;
    if (href.includes("?")) {
      return href === pathname + href.slice(pathname.length);
    }
    return true;
  }

  return (
    <header className={`navbar ftco-navbar-light ${scrolled || open ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo" aria-label={`${SITE.name} home`}>
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
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link ${isActive(link.href) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Magnetic>
          <Link href="/contact#book" className="btn btn--terracotta navbar__cta">
            <Calendar size={15} aria-hidden="true" />
            Book a Viewing
          </Link>
        </Magnetic>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`navbar__mobile ${open ? "open" : ""}`}>
        <nav className="navbar__mobile-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__mobile-link ${isActive(link.href) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact#book" className="btn btn--terracotta btn--block">
          <Calendar size={15} aria-hidden="true" />
          Book a Viewing
        </Link>
      </div>
    </header>
  );
}
