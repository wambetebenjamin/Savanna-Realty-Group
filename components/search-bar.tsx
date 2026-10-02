"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Building2, ChevronDown, MapPin, Search, Wallet } from "lucide-react";
import { LOCATIONS, PROPERTY_TYPES } from "@/lib/properties";

const LISTING_OPTIONS = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

const BUDGET_BUY = [
  { label: "Any budget", min: "", max: "" },
  { label: "Under 10M", min: "", max: "10000000" },
  { label: "10M to 25M", min: "10000000", max: "25000000" },
  { label: "25M to 50M", min: "25000000", max: "50000000" },
  { label: "Over 50M", min: "50000000", max: "" },
];

const BUDGET_RENT = [
  { label: "Any budget", min: "", max: "" },
  { label: "Under 100K / month", min: "", max: "100000" },
  { label: "100K to 200K / month", min: "100000", max: "200000" },
  { label: "Over 200K / month", min: "200000", max: "" },
];

/**
 * Hero property search: Buy or Rent, Location, Property Type, Budget range.
 * Submits to /properties with query parameters.
 */
export function SearchBar() {
  const router = useRouter();
  const [listing, setListing] = useState("buy");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState("any");

  const budgets = listing === "rent" ? BUDGET_RENT : BUDGET_BUY;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("listing", listing);
    if (location !== "all") params.set("location", location);
    if (type !== "all") params.set("type", type);
    const band = budgets.find((b) => b.label === budget);
    if (band) {
      if (band.min) params.set("minPrice", band.min);
      if (band.max) params.set("maxPrice", band.max);
    }
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form className="searchbar" onSubmit={onSubmit} role="search" aria-label="Property search">
      <label className="searchbar__field">
        <span className="searchbar__label">
          <Building2 size={12} aria-hidden="true" />
          Buy or Rent
        </span>
        <select
          className="searchbar__select"
          value={listing}
          onChange={(e) => {
            setListing(e.target.value);
            setBudget("any");
          }}
        >
          {LISTING_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="field-caret" aria-hidden="true" />
      </label>

      <label className="searchbar__field">
        <span className="searchbar__label">
          <MapPin size={12} aria-hidden="true" />
          Location
        </span>
        <select
          className="searchbar__select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="all">All Nairobi areas</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="field-caret" aria-hidden="true" />
      </label>

      <label className="searchbar__field">
        <span className="searchbar__label">
          <Building2 size={12} aria-hidden="true" />
          Property Type
        </span>
        <select className="searchbar__select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All types</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="field-caret" aria-hidden="true" />
      </label>

      <label className="searchbar__field">
        <span className="searchbar__label">
          <Wallet size={12} aria-hidden="true" />
          Budget Range
        </span>
        <select className="searchbar__select" value={budget} onChange={(e) => setBudget(e.target.value)}>
          {budgets.map((b) => (
            <option key={b.label} value={b.label}>
              {b.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="field-caret" aria-hidden="true" />
      </label>

      <button type="submit" className="btn btn--sage">
        <Search size={15} aria-hidden="true" />
        Search
      </button>
    </form>
  );
}
