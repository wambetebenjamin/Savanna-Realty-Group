"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { formatKES, type Property } from "@/lib/properties";
import { SmartImage } from "./smart-image";

interface PropertyCardProps {
  property: Property;
}

/**
 * Listing card with a gentle 3D perspective tilt on hover, soft image zoom
 * to 1.04 and an expanding shadow. Reduced motion users get no tilt.
 */
export function PropertyCard({ property }: PropertyCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-relY * 4).toFixed(
      2,
    )}deg) rotateY(${(relX * 5).toFixed(2)}deg) translateY(-6px)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <article ref={ref} className="card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <Link href={`/properties/${property.slug}`} className="card__media" aria-label={property.name}>
        <SmartImage
          name={property.images[0]}
          alt={`${property.name}, ${property.location}, Nairobi`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {property.development ? (
          <span className="card__badge card__badge--terracotta">New Development</span>
        ) : property.listing === "rent" ? (
          <span className="card__badge">For Rent</span>
        ) : null}
      </Link>
      <div className="card__body">
        <div className="card__price">
          {property.development?.startingPrice ?? formatKES(property.price, property.priceSuffix)}
        </div>
        <h3 className="card__title">
          <Link href={`/properties/${property.slug}`}>{property.name}</Link>
        </h3>
        <span className="card__location">
          <MapPin size={14} aria-hidden="true" />
          {property.location}, Nairobi
        </span>
        <div className="card__specs">
          {property.beds > 0 && (
            <span className="card__spec">
              <BedDouble size={15} aria-hidden="true" />
              {property.beds} beds
            </span>
          )}
          {property.baths > 0 && (
            <span className="card__spec">
              <Bath size={15} aria-hidden="true" />
              {property.baths} baths
            </span>
          )}
          <span className="card__spec">
            <Ruler size={15} aria-hidden="true" />
            {property.sqftLabel ?? `${property.sqft.toLocaleString("en-KE")} sqft`}
          </span>
        </div>
        <div className="card__footer">
          <Link href={`/properties/${property.slug}`} className="btn btn--outline btn--block">
            View Property
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
