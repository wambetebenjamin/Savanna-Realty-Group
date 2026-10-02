import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Building2, CalendarDays, Car, MapPin, Phone, Ruler } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { SmartImage } from "@/components/smart-image";
import { amenityIcon } from "@/components/amenity-icon";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Magnetic } from "@/components/magnetic";
import { PropertyCard } from "@/components/property-card";
import { agentById } from "@/lib/agents";
import { formatKES, PROPERTIES, propertyBySlug } from "@/lib/properties";
import { SITE, waLink } from "@/lib/site";

export const revalidate = 300;

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = propertyBySlug(params.slug);
  if (!property) return { title: "Property Not Found" };
  const price = property.development?.startingPrice ?? formatKES(property.price, property.priceSuffix);
  return {
    title: `${property.name}, ${property.location}`,
    description: property.shortDescription,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "article",
      title: `${property.name} | ${price} | ${SITE.name}`,
      description: property.shortDescription,
      images: [
        {
          url: `/images/${property.images[0]}.jpg`,
          width: 500,
          height: 625,
          alt: `${property.name}, ${property.location}, Nairobi`,
        },
      ],
    },
  };
}

export default function PropertyDetailPage({ params }: PageProps) {
  const property = propertyBySlug(params.slug);
  if (!property) notFound();

  const agent = agentById(property.agent);
  const price = property.development?.startingPrice ?? formatKES(property.price, property.priceSuffix);
  const agentWa = waLink(
    `Hello, I am interested in ${property.name} (${property.location}) listed at ${price}. I would like to book a viewing.`,
  );
  const similar = PROPERTIES.filter(
    (p) => p.slug !== property.slug && (p.type === property.type || p.location === property.location),
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    url: `${SITE.url}/properties/${property.slug}`,
    description: property.shortDescription,
    image: [`${SITE.url}/images/${property.images[0]}.jpg`],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.lat,
      longitude: property.lng,
    },
    numberOfRooms: property.beds || undefined,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "FTK",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-content">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ color: "var(--muted)", marginBottom: 22 }}>
            <Link href="/">Home</Link>
            <span className="crumb-sep" style={{ color: "var(--terracotta)" }}>/</span>
            <Link href="/properties">Properties</Link>
            <span className="crumb-sep" style={{ color: "var(--terracotta)" }}>/</span>
            <span style={{ color: "var(--ink)" }} aria-current="page">
              {property.name}
            </span>
          </nav>

          <div className="detail-top">
            <Gallery images={property.images} alt={property.name} />

            <aside className="detail-panel">
              <div>
                <div className="card__price" style={{ fontSize: 28 }}>
                  {price}
                </div>
                <span className="meta" style={{ color: "var(--sage)", marginTop: 6, display: "inline-block" }}>
                  {property.development ? "Off plan, staged payments" : property.listing === "rent" ? "To rent" : "For sale"}
                </span>
              </div>
              <h1 className="h3" style={{ fontSize: 22 }}>{property.name}</h1>
              <span className="card__location">
                <MapPin size={15} aria-hidden="true" />
                {property.location}, Nairobi
              </span>

              <div className="detail-panel__specs">
                {property.beds > 0 && (
                  <div className="detail-panel__spec">
                    <BedDouble size={17} aria-hidden="true" />
                    {property.beds} bedrooms
                  </div>
                )}
                {property.baths > 0 && (
                  <div className="detail-panel__spec">
                    <Bath size={17} aria-hidden="true" />
                    {property.baths} bathrooms
                  </div>
                )}
                <div className="detail-panel__spec">
                  <Ruler size={17} aria-hidden="true" />
                  {property.sqftLabel ?? `${property.sqft.toLocaleString("en-KE")} sqft`}
                </div>
                {property.parking ? (
                  <div className="detail-panel__spec">
                    <Car size={17} aria-hidden="true" />
                    {property.parking} parking
                  </div>
                ) : (
                  <div className="detail-panel__spec">
                    <Building2 size={17} aria-hidden="true" />
                    {property.type}
                  </div>
                )}
              </div>

              {property.development && (
                <div style={{ display: "grid", gap: 8 }}>
                  <div className="dev-card__row">
                    <CalendarDays size={15} aria-hidden="true" />
                    Launching {property.development.launchDate.replace("Launching ", "")}
                  </div>
                  <div className="dev-card__row">
                    <CalendarDays size={15} aria-hidden="true" />
                    Completion {property.development.completion}
                  </div>
                </div>
              )}

              <div className="agent-panel">
                <div className="agent-panel__photo">
                  <SmartImage name={agent.image} alt={`${agent.name}, ${agent.title}`} width={168} height={168} />
                </div>
                <div>
                  <div className="agent-panel__name">{agent.name}</div>
                  <div className="agent-panel__role">{agent.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                    {agent.listings} active listings
                  </div>
                </div>
              </div>

              <div className="agent-panel__actions">
                <Magnetic className="agent-action">
                  <a href={`tel:${SITE.phone}`} className="btn btn--sage btn--block">
                    <Phone size={15} aria-hidden="true" />
                    Call Agent
                  </a>
                </Magnetic>
                <Magnetic className="agent-action">
                  <a href={agentWa} target="_blank" rel="noopener noreferrer" className="btn btn--terracotta btn--block">
                    <WhatsAppIcon size={15} />
                    WhatsApp Agent
                  </a>
                </Magnetic>
              </div>
            </aside>
          </div>

          <div className="split" style={{ alignItems: "start", gap: 48 }}>
            <div>
              <h2 className="h2" style={{ fontSize: 26, marginBottom: 16 }}>
                About this property
              </h2>
              {property.description.map((para) => (
                <p key={para.slice(0, 24)} style={{ marginBottom: 16, color: "var(--muted)" }}>
                  {para}
                </p>
              ))}

              <h2 className="h2" style={{ fontSize: 26, margin: "36px 0 4px" }}>
                Amenities and features
              </h2>
              <div className="detail-amenities">
                {property.amenities.map((a) => {
                  const Icon = amenityIcon(a);
                  return (
                    <div className="amenity" key={a}>
                      <Icon size={17} aria-hidden="true" />
                      {a}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="h2" style={{ fontSize: 26, marginBottom: 16 }}>
                Location
              </h2>
              <div className="map-embed">
                <iframe
                  title={`Map of ${property.location}, Nairobi`}
                  src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 12 }}>
                Exact address shared on booking. Viewings are accompanied by a
                Savanna Realty agent at no cost to you.
              </p>
            </div>
          </div>

          {similar.length > 0 && (
            <div style={{ marginTop: 72 }}>
              <h2 className="h2" style={{ fontSize: 26, marginBottom: 28 }}>
                Similar properties
              </h2>
              <div className="grid-cards">
                {similar.map((p) => (
                  <PropertyCard key={p.slug} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
