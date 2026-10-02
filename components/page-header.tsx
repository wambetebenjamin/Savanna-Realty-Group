import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SmartImage } from "./smart-image";

interface PageHeaderProps {
  title: string;
  image: string;
  imageAlt: string;
  crumb: string;
}

/**
 * Compact inner-page hero band (from the uptown hero-wrap-2 pattern):
 * background photo, dark overlay, page title and breadcrumb.
 */
export function PageHeader({ title, image, imageAlt, crumb }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header__bg">
        <SmartImage name={image} alt={imageAlt} fill priority sizes="100vw" />
      </div>
      <div className="page-header__overlay" />
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} className="crumb-sep" aria-hidden="true" />
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
