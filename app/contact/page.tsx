import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { PROPERTIES } from "@/lib/properties";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Book a Viewing",
  description:
    "Talk to Savanna Realty Group in Westlands, Nairobi. Book a property viewing, request a valuation or ask about our diaspora client programme.",
};

export default function ContactPage() {
  const options = PROPERTIES.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <>
      <PageHeader
        title="Contact Us"
        image="nairobi-uhuru-park"
        imageAlt="Panoramic view of the Nairobi skyline from Uhuru Park"
        crumb="Contact"
      />

      <section className="page-content">
        <div className="container">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-card__icon">
                <MapPin size={22} aria-hidden="true" />
              </div>
              <div>
                <h3>Visit the Office</h3>
                <p>{SITE.address}</p>
                <p className="mt-2" style={{ marginTop: 8 }}>
                  <Clock size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} aria-hidden="true" />
                  {SITE.hours}
                </p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card__icon">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div>
                <h3>Call Us</h3>
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
                <p style={{ marginTop: 8 }}>Same day response, Mon to Sat.</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card__icon">
                <WhatsAppIcon size={22} />
              </div>
              <div>
                <h3>WhatsApp an Agent</h3>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  Start a chat instantly
                </a>
                <p style={{ marginTop: 8 }}>
                  Photos, pricing and viewing slots, straight to your phone.
                </p>
              </div>
            </div>
          </div>

          <div className="split" style={{ alignItems: "start", gap: 48 }}>
            <div>
              <span className="eyebrow">Book a Viewing</span>
              <h2 className="h2">See it in person, or on a video call</h2>
              <p style={{ color: "var(--muted)", marginTop: 14 }}>
                Pick a property and tell us when you are free. We confirm
                viewing slots by phone within a few hours, and every viewing is
                accompanied by one of our agents at no cost to you. Diaspora
                clients can book live video walkthroughs in the same way.
              </p>
              <div className="map-embed" style={{ marginTop: 28 }}>
                <iframe
                  title="Savanna Realty Group office, Westlands, Nairobi"
                  src="https://www.google.com/maps?q=Riverside+Square,+Riverside+Drive,+Westlands,+Nairobi&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <ContactForm properties={options} />
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 14, display: "flex", gap: 8 }}>
                <Mail size={15} style={{ flexShrink: 0, marginTop: 1, color: "var(--sage)" }} aria-hidden="true" />
                Prefer email? Write to{" "}
                <a href={`mailto:${SITE.email}`} style={{ color: "var(--sage)", fontWeight: 600 }}>
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
