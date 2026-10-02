"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  Home,
  House,
  LandPlot,
  Store,
  Trees,
} from "lucide-react";

const PILLS = [
  { label: "Apartments", type: "Apartment", icon: Building2 },
  { label: "Maisonettes", type: "Maisonette", icon: Home },
  { label: "Townhouses", type: "Townhouse", icon: House },
  { label: "Commercial", type: "Commercial", icon: Store },
  { label: "Land", type: "Land", icon: LandPlot },
  { label: "New Developments", type: "New Development", icon: Trees },
];

/**
 * Horizontal quick-filter pill strip. Each pill jumps to the listings page
 * pre-filtered by property type.
 */
export function PillFilter({ activeType }: { activeType?: string }) {
  const router = useRouter();
  const [active, setActive] = useState(activeType ?? "");

  function select(type: string, label: string) {
    setActive(type === active ? "" : type);
    router.push(type === active ? "/properties" : `/properties?type=${encodeURIComponent(label)}`);
  }

  return (
    <div className="pills" role="tablist" aria-label="Property type quick filters">
      {PILLS.map((pill) => {
        const Icon = pill.icon;
        const isActive = active === pill.type;
        return (
          <button
            key={pill.type}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`pill ${isActive ? "pill--active" : ""}`}
            onClick={() => select(pill.type, pill.label)}
          >
            <Icon size={16} aria-hidden="true" />
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}
