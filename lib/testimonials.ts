export interface Testimonial {
  name: string;
  purchase: string;
  quote: string;
  rating: number;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Grace Wambui",
    purchase: "3 bedroom apartment, Kilimani",
    quote:
      "Wanjiku arranged three viewings in one Saturday and negotiated KES 800,000 off the asking price. The paperwork was handled before I could even worry about it. I felt guided, not sold to.",
    rating: 5,
    image: "client-2",
  },
  {
    name: "Samuel Mwangi",
    purchase: "Maisonette, Karen",
    quote:
      "As a first time buyer I had a hundred questions. David answered every one patiently and the title search he coordinated flagged a small rates arrears that the seller cleared before we closed.",
    rating: 5,
    image: "client-1",
  },
  {
    name: "Neema Achieng",
    purchase: "Townhouse, Runda",
    quote:
      "We moved from Kisumu and bought sight unseen apart from the video walkthrough David did for us. The house was exactly as shown. That kind of honesty is rare in this industry.",
    rating: 5,
    image: "client-4",
  },
  {
    name: "James Kariuki",
    purchase: "Quarter acre plot, Syokimau (diaspora client)",
    quote:
      "I bought my plot from Texas. Brian video called me from the beacons, sent the official search, and my advocate confirmed everything. Six weeks later the title was in my name.",
    rating: 5,
    image: "client-3",
  },
  {
    name: "Peter Omondi",
    purchase: "Office floor, Westlands",
    quote:
      "Amina understood yield from an investor's point of view. She talked me out of two properties that looked good on paper and into one that has been fully let since completion.",
    rating: 4,
    image: "client-5",
  },
];
