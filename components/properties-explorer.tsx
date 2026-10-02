"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Home, RotateCcw, SearchX } from "lucide-react";
import {
  LOCATIONS,
  PROPERTY_TYPES,
  searchProperties,
  type Property,
  type SearchFilters,
} from "@/lib/properties";
import { PropertyCard } from "./property-card";

const PAGE_SIZE = 6;

interface PropertiesExplorerProps {
  initial: Property[];
  initialFilters: SearchFilters & { page?: number };
}

interface UiFilters {
  listing: string;
  types: string[];
  location: string;
  minPrice: number;
  maxPrice: number;
  beds: number;
  q: string;
}

function filtersToQuery(f: UiFilters, page: number): string {
  const params = new URLSearchParams();
  if (f.listing !== "all") params.set("listing", f.listing);
  if (f.types.length === 1) params.set("type", f.types[0]);
  if (f.location !== "all") params.set("location", f.location);
  if (f.minPrice) params.set("minPrice", String(f.minPrice));
  if (f.maxPrice) params.set("maxPrice", String(f.maxPrice));
  if (f.beds) params.set("beds", String(f.beds));
  if (f.q) params.set("q", f.q);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/properties?${qs}` : "/properties";
}

/**
 * Client-side listing explorer: left sidebar filters, responsive card grid,
 * pagination, URL sync, and results served through /api/search with a
 * local filtering fallback.
 */
export function PropertiesExplorer({ initial, initialFilters }: PropertiesExplorerProps) {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<UiFilters>({
    listing: initialFilters.listing ?? "all",
    types: initialFilters.type && initialFilters.type !== "all" ? [initialFilters.type] : [],
    location: initialFilters.location ?? "all",
    minPrice: initialFilters.minPrice ?? 0,
    maxPrice: initialFilters.maxPrice ?? 0,
    beds: initialFilters.beds ?? 0,
    q: initialFilters.q ?? "",
  });
  const [page, setPage] = useState(initialFilters.page ?? 1);
  const [results, setResults] = useState<Property[]>(initial);

  const runSearch = useCallback(async (f: UiFilters) => {
    const apiFilters: SearchFilters = {
      listing: f.listing,
      type: f.types.length === 1 ? f.types[0] : undefined,
      location: f.location,
      minPrice: f.minPrice || undefined,
      maxPrice: f.maxPrice || undefined,
      beds: f.beds || undefined,
      q: f.q || undefined,
    };
    try {
      const params = new URLSearchParams();
      Object.entries(apiFilters).forEach(([k, v]) => {
        if (v !== undefined && v !== "" && v !== "all") params.set(k, String(v));
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error("api failed");
      const data = (await res.json()) as { properties: Property[] };
      setResults(data.properties);
    } catch {
      setResults(searchProperties(apiFilters));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void runSearch(filters);
    }, 180);
    return () => clearTimeout(timer);
  }, [filters, runSearch]);

  useEffect(() => {
    const url = filtersToQuery(filters, page);
    window.history.replaceState(null, "", url);
  }, [filters, page]);

  useEffect(() => {
    router.prefetch("/properties");
  }, [router]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = useMemo(
    () => results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [results, safePage],
  );

  function update(patch: Partial<UiFilters>) {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  }

  function toggleType(type: string) {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type) ? f.types.filter((t) => t !== type) : [...f.types, type],
    }));
    setPage(1);
  }

  function reset() {
    setFilters({
      listing: "all",
      types: [],
      location: "all",
      minPrice: 0,
      maxPrice: 0,
      beds: 0,
      q: "",
    });
    setPage(1);
  }

  function goToPage(p: number) {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="listing-layout" ref={topRef}>
      <aside className="filters" aria-label="Listing filters">
        <div className="filters__head">
          <h3>Filters</h3>
          <button type="button" className="filters__reset" onClick={reset}>
            <RotateCcw size={13} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div>
          <div className="filters__group-title">Buy or Rent</div>
          <div className="filters__options">
            {[
              { value: "all", label: "All listings" },
              { value: "buy", label: "For sale" },
              { value: "rent", label: "To rent" },
            ].map((o) => (
              <button
                key={o.value}
                type="button"
                className={`filters__option ${filters.listing === o.value ? "checked" : ""}`}
                onClick={() => update({ listing: o.value })}
                aria-pressed={filters.listing === o.value}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="filters__group-title">Property Type</div>
          <div className="filters__options">
            {PROPERTY_TYPES.map((t) => (
              <label key={t} className={`filters__option ${filters.types.includes(t) ? "checked" : ""}`}>
                <input type="checkbox" checked={filters.types.includes(t)} onChange={() => toggleType(t)} />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="f-location">Location</label>
          <select
            id="f-location"
            value={filters.location}
            onChange={(e) => update({ location: e.target.value })}
          >
            <option value="all">All Nairobi areas</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="f-price">Price Range (KES)</label>
          <select
            id="f-price"
            value={`${filters.minPrice}-${filters.maxPrice}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-").map(Number);
              update({ minPrice: min || 0, maxPrice: max || 0 });
            }}
          >
            <option value="0-0">Any price</option>
            <option value="0-10000000">Under 10M</option>
            <option value="10000000-25000000">10M to 25M</option>
            <option value="25000000-50000000">25M to 50M</option>
            <option value="50000000-0">Over 50M</option>
            <option value="0-150000">Rent under 150K / month</option>
            <option value="150000-300000">Rent 150K to 300K / month</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="f-beds">Bedrooms</label>
          <select id="f-beds" value={filters.beds} onChange={(e) => update({ beds: Number(e.target.value) })}>
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="f-q">Keyword</label>
          <input
            id="f-q"
            type="search"
            value={filters.q}
            placeholder="e.g. garden, escrow, skyline"
            onChange={(e) => update({ q: e.target.value })}
          />
        </div>
      </aside>

      <div>
        <div className="listing-toolbar">
          <p className="listing-toolbar__count">
            <strong>{results.length}</strong> {results.length === 1 ? "property" : "properties"} found
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="listing-grid">
            {visible.map((p, i) => (
              <div key={p.slug} className="reveal in-view" style={{ transitionDelay: `${i * 60}ms` }}>
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={36} aria-hidden="true" />
            <h3 className="h3">No properties match these filters</h3>
            <p>Try widening the price range or clearing the property type selection.</p>
            <button type="button" className="btn btn--sage" onClick={reset}>
              <RotateCcw size={14} aria-hidden="true" />
              Reset Filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            <button
              type="button"
              className="pagination__btn"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={15} aria-hidden="true" />
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`pagination__btn ${safePage === i + 1 ? "active" : ""}`}
                onClick={() => goToPage(i + 1)}
                aria-current={safePage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="pagination__btn"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              Next
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
