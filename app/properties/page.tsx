import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PropertiesExplorer } from "@/components/properties-explorer";
import { PillFilter } from "@/components/pill-filter";
import { searchProperties, type SearchFilters } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties for Sale and Rent in Nairobi",
  description:
    "Search apartments, maisonettes, townhouses, commercial floors, land and new developments across Nairobi. Filter by location, price and bedrooms.",
  openGraph: {
    title: "Properties for Sale and Rent in Nairobi | Savanna Realty Group",
    description:
      "Search verified property listings across Nairobi, from Kilimani apartments to Karen villas and Syokimau land.",
  },
};

interface PageProps {
  searchParams: {
    listing?: string;
    type?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    q?: string;
    page?: string;
  };
}

export default function PropertiesPage({ searchParams }: PageProps) {
  const filters: SearchFilters & { page?: number } = {
    listing: searchParams.listing,
    type: searchParams.type,
    location: searchParams.location,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    beds: searchParams.beds ? Number(searchParams.beds) : undefined,
    q: searchParams.q,
    page: searchParams.page ? Number(searchParams.page) : 1,
  };

  const initial = searchProperties(filters);

  return (
    <>
      <PageHeader
        title="Choose Your Desired Home"
        image="nairobi-cityscape"
        imageAlt="Nairobi cityscape at daytime"
        crumb="Properties"
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <PillFilter activeType={searchParams.type ?? ""} />
          </div>
          <PropertiesExplorer initial={initial} initialFilters={filters} />
        </div>
      </section>
    </>
  );
}
