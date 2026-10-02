import type { Metadata, Viewport } from "next";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/900.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Property for Sale and Rent in Nairobi`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | Find Your Place in Nairobi`,
    description: SITE.description,
    images: [{ url: "/images/hero-nairobi.jpg", width: 1600, height: 1066, alt: "Nairobi skyline aerial view" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Find Your Place in Nairobi`,
    description: SITE.description,
    images: ["/images/hero-nairobi.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2D6A4F",
  width: "device-width",
  initialScale: 1,
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Riverside Square, Riverside Drive",
    addressLocality: "Westlands, Nairobi",
    addressCountry: "KE",
  },
  areaServed: "Nairobi, Kenya",
  openingHours: "Mo-Sa 08:30-18:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
