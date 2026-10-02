export const SITE = {
  name: "Savanna Realty Group",
  shortName: "Savanna Realty",
  tagline: "Find Your Place in Nairobi.",
  description:
    "Savanna Realty Group helps buyers, sellers, investors and diaspora Kenyans find, view and secure property across Nairobi. Apartments, maisonettes, townhouses, commercial spaces, land and new developments.",
  url: "https://savanna-realty-group.vercel.app",
  phone: "+254112272061",
  phoneDisplay: "+254 112 272 061",
  email: "hello@savannarealtygroup.com",
  address: "Riverside Square, Riverside Drive, Westlands, Nairobi, Kenya",
  hours: "Mon to Sat, 8:30am to 6:00pm",
  whatsapp:
    "https://wa.me/254112272061?text=Hello!%20I%20am%20interested%20in%20a%20property%20listing.",
  social: {
    facebook: "https://www.facebook.com/savannarealtygroup",
    instagram: "https://www.instagram.com/savannarealtygroup",
    twitter: "https://twitter.com/savannarealty",
    linkedin: "https://www.linkedin.com/company/savanna-realty-group",
  },
};

export function waLink(message: string): string {
  return `https://wa.me/254112272061?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties?listing=buy", label: "Buy" },
  { href: "/properties?listing=rent", label: "Rent" },
  { href: "/services", label: "Sell" },
  { href: "/properties?type=New+Development", label: "New Developments" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
