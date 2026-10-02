export type PropertyType =
  | "Apartment"
  | "Maisonette"
  | "Townhouse"
  | "Commercial"
  | "Land"
  | "New Development";

export type ListingKind = "buy" | "rent";

export interface Development {
  launchDate: string;
  completion: string;
  startingPrice: string;
  units: string;
}

export interface Property {
  slug: string;
  name: string;
  type: PropertyType;
  listing: ListingKind;
  location: string;
  price: number;
  priceSuffix?: string;
  beds: number;
  baths: number;
  sqft: number;
  sqftLabel?: string;
  shortDescription: string;
  description: string[];
  amenities: string[];
  images: string[];
  agent: string;
  lat: number;
  lng: number;
  featured?: boolean;
  development?: Development;
  yearBuilt?: string;
  parking?: number;
}

export const PROPERTY_TYPES: PropertyType[] = [
  "Apartment",
  "Maisonette",
  "Townhouse",
  "Commercial",
  "Land",
  "New Development",
];

export const LOCATIONS = [
  "Kilimani",
  "Westlands",
  "Karen",
  "Lavington",
  "Kileleshwa",
  "Runda",
  "Syokimau",
  "Ruaka",
];

export function formatKES(price: number, suffix?: string): string {
  const formatted = new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(price);
  return suffix ? `KES ${formatted} ${suffix}` : `KES ${formatted}`;
}

export const PROPERTIES: Property[] = [
  {
    slug: "amani-heights-kilimani",
    name: "Amani Heights, Kilimani",
    type: "Apartment",
    listing: "buy",
    location: "Kilimani",
    price: 14500000,
    beds: 3,
    baths: 2,
    sqft: 1450,
    shortDescription:
      "A light-filled 3 bedroom apartment on Wood Avenue with a wide balcony facing mature ngong nursery greenery.",
    description: [
      "Amani Heights is a quiet, well-managed block of 24 units on Wood Avenue, a short drive from Yaya Centre and the Kilimani shopping stretch. This 3 bedroom unit sits on the fourth floor with a north-facing balcony that catches morning sun.",
      "The living and dining area is open plan with large windows and ceramic tile flooring. The master bedroom is ensuite and the two remaining bedrooms share a family bathroom. The kitchen comes fitted with granite worktops and ample pantry space.",
      "The estate offers secure basement parking for two cars, borehole water with city backup, a rooftop terrace for residents and 24 hour manned security with CCTV. Ideal for a young family or as a rental investment in one of Nairobi's most lettable neighbourhoods.",
    ],
    amenities: [
      "Lift access",
      "Balcony",
      "Fitted kitchen",
      "Borehole water",
      "24/7 security",
      "CCTV surveillance",
      "Basement parking",
      "Rooftop terrace",
    ],
    images: ["apartment-1", "interior-living-1", "interior-kitchen-1", "interior-bedroom-1"],
    agent: "wanjiku-kamau",
    lat: -1.2921,
    lng: 36.783,
    featured: true,
    yearBuilt: "2021",
    parking: 2,
  },
  {
    slug: "skyline-residences-westlands",
    name: "Skyline Residences, Westlands",
    type: "Apartment",
    listing: "buy",
    location: "Westlands",
    price: 9800000,
    beds: 2,
    baths: 2,
    sqft: 980,
    shortDescription:
      "Modern 2 bedroom unit a short walk from Sarit Centre, ideal for professionals and short let investors.",
    description: [
      "Skyline Residences sits off Ring Road Parklands, minutes from Sarit Centre, Westgate and the office nodes of Westlands. This 2 bedroom, 2 bathroom unit is on the third floor of a 2019 building with clean modern finishes.",
      "The apartment has an open plan kitchen with a breakfast counter, a roomy living area opening to a private balcony and two well-proportioned bedrooms, both with fitted wardrobes. The master is ensuite.",
      "Residents enjoy a shared gym, landscaped courtyard, lift access to all floors, standby generator for common areas and fibre internet readiness. A dependable performer for the short let market given the neighbourhood's business traffic.",
    ],
    amenities: [
      "Lift access",
      "Balcony",
      "Fitted kitchen",
      "Shared gym",
      "Backup generator",
      "Fibre internet",
      "24/7 security",
      "Visitor parking",
    ],
    images: ["apartment-2", "interior-living-2", "interior-kitchen-2", "interior-bedroom-2"],
    agent: "wanjiku-kamau",
    lat: -1.2649,
    lng: 36.8039,
    yearBuilt: "2019",
    parking: 1,
  },
  {
    slug: "acacia-meadow-karen",
    name: "Acacia Meadow Maisonette, Karen",
    type: "Maisonette",
    listing: "buy",
    location: "Karen",
    price: 32000000,
    beds: 4,
    baths: 3,
    sqft: 2600,
    shortDescription:
      "A 4 bedroom maisonette on a quarter acre in a gated close of six units, surrounded by acacia trees.",
    description: [
      "Acacia Meadow is a gated development of six maisonettes on Bogani East Road. This corner unit has a private garden wrapped in mature acacias, giving the quarter acre plot unusual privacy for Karen.",
      "Downstairs is a sunken lounge with a fireplace, a separate dining room, a fitted kitchen with a pantry and a guest bedroom. Upstairs are three bedrooms, all ensuite or sharing a modern family bathroom, with the master opening onto a balcony overlooking the garden.",
      "The close has a resident association, borehole water, solar water heating, electric fencing and a manned gate. DSQ included. Karen shopping centre, schools and the Langata link road are all within ten minutes.",
    ],
    amenities: [
      "Gated community",
      "Private garden",
      "Solar water heating",
      "Borehole water",
      "Electric fencing",
      "DSQ included",
      "Fireplace",
      "Manned gate",
    ],
    images: ["house-1", "interior-living-3", "interior-kitchen-3", "interior-bath-1"],
    agent: "david-otieno",
    lat: -1.3197,
    lng: 36.7076,
    featured: true,
    yearBuilt: "2018",
    parking: 3,
  },
  {
    slug: "runda-garden-townhouse",
    name: "Runda Garden Townhouse",
    type: "Townhouse",
    listing: "buy",
    location: "Runda",
    price: 48500000,
    beds: 5,
    baths: 4,
    sqft: 3400,
    shortDescription:
      "A five bedroom townhouse on half an acre in a boutique estate of eight units along Ruaka Road.",
    description: [
      "Set in a boutique estate of just eight townhouses off Ruaka Road, this five bedroom home delivers the space and calm that Runda is known for, with the convenience of a managed community.",
      "The ground floor flows from a double height entrance hall into a formal lounge, a family room with doors to the terrace, a dining area for ten and a chef's kitchen with an island. A study and guest cloakroom complete the level.",
      "Upstairs, the master suite has a walk-in dressing room and a spa-inspired bathroom. Three further ensuite bedrooms and a family TV room fill the rest of the floor. The landscaped half acre includes a kitchen garden, staff quarters for two and a double carport plus open parking for four.",
    ],
    amenities: [
      "Gated estate",
      "Half acre garden",
      "Ensuite bedrooms",
      "Walk-in dressing room",
      "Staff quarters",
      "Solar water heating",
      "Borehole water",
      "24/7 security",
    ],
    images: ["house-2", "interior-living-4", "interior-bedroom-3", "interior-kitchen-4"],
    agent: "david-otieno",
    lat: -1.2075,
    lng: 36.789,
    featured: true,
    yearBuilt: "2016",
    parking: 4,
  },
  {
    slug: "kileleshwa-courts-loft",
    name: "Kileleshwa Courts Loft",
    type: "Apartment",
    listing: "buy",
    location: "Kileleshwa",
    price: 11200000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    shortDescription:
      "A double height loft apartment in a converted block off Laikipia Road, full of character and light.",
    description: [
      "Kileleshwa Courts is a small converted block off Laikipia Road where each unit is different. This loft apartment has a double height window wall in the living area, exposed brick detailing and a mezzanine that works as a home office or guest nook.",
      "The kitchen is semi open with a serving hatch, and both bedrooms sit on the quiet side of the building away from the road. A family bathroom serves the second bedroom while the master has a shower ensuite.",
      "A rare option for buyers who want character rather than a standard box, in a neighbourhood that remains one of the best value pockets close to the CBD. One allocated parking bay and water storage tanks included.",
    ],
    amenities: [
      "Double height windows",
      "Mezzanine level",
      "Home office nook",
      "Water storage",
      "Gated parking",
      "24/7 security",
      "Pet friendly",
      "Fibre internet",
    ],
    images: ["apartment-3", "interior-living-5", "interior-bath-2", "interior-bedroom-4"],
    agent: "wanjiku-kamau",
    lat: -1.2831,
    lng: 36.7686,
    yearBuilt: "2017",
    parking: 1,
  },
  {
    slug: "lavington-green-maisonette",
    name: "Lavington Green Maisonette",
    type: "Maisonette",
    listing: "buy",
    location: "Lavington",
    price: 27500000,
    beds: 4,
    baths: 2,
    sqft: 2250,
    shortDescription:
      "A four bedroom maisonette with a mature garden in a quiet Lavington lane near Gitanga Road.",
    description: [
      "Tucked in a cul de sac off Gitanga Road, this four bedroom maisonette offers 2,250 square feet of family living in one of Nairobi's most established neighbourhoods.",
      "The house has a covered veranda entrance, a lounge with bay windows, a dining room, a fitted kitchen with utility yard and a guest bedroom on the ground floor. Three bedrooms upstairs share a recently refurbished bathroom, with the master enjoying a private balcony.",
      "The garden is genuinely mature, with jacaranda and bottlebrush shade and room for a kitchen garden. There is a single DSQ, two parking bays and a perimeter wall with an intercom gate. Lavington Mall and the Junction are both under ten minutes away.",
    ],
    amenities: [
      "Mature garden",
      "Private balcony",
      "Fitted kitchen",
      "Utility yard",
      "DSQ included",
      "Intercom gate",
      "Guest bedroom",
      "Water storage",
    ],
    images: ["house-3", "interior-kitchen-5", "interior-living-1", "interior-bath-3"],
    agent: "david-otieno",
    lat: -1.279,
    lng: 36.759,
    yearBuilt: "2014",
    parking: 2,
  },
  {
    slug: "westgate-commercial-floor",
    name: "Westgate Commercial Floor",
    type: "Commercial",
    listing: "buy",
    location: "Westlands",
    price: 95000000,
    beds: 0,
    baths: 4,
    sqft: 4800,
    shortDescription:
      "An entire 4,800 sqft office floor in a managed Westlands block, ideal for owner occupancy or a fixed income asset.",
    description: [
      "This is a full floor plate of approximately 4,800 square feet in a professionally managed commercial building on Peponi Road, Westlands. The floor is currently fitted as open plan with two meeting rooms, a server room and a kitchenette.",
      "The building has passenger and service lifts, backup power to all floors, borehole water, fibre from two providers and basement parking allocated at four bays per floor. Common areas are managed and cleaned under a service charge.",
      "Westlands remains the most liquid commercial micro market in Nairobi outside the CBD. The floor currently produces a steady income from a blue chip tenant on a renewable lease, and owner occupiers can be accommodated at the end of the current term.",
    ],
    amenities: [
      "Passenger lift",
      "Service lift",
      "Backup power",
      "Fibre internet",
      "Basement parking",
      "Server room",
      "Meeting rooms",
      "Service charge managed",
    ],
    images: ["office-1", "office-2", "office-3", "office-4"],
    agent: "amina-hassan",
    lat: -1.2613,
    lng: 36.8028,
    yearBuilt: "2015",
    parking: 4,
  },
  {
    slug: "syokimau-quarter-acre",
    name: "Syokimau Quarter Acre Plot",
    type: "Land",
    listing: "buy",
    location: "Syokimau",
    price: 8500000,
    beds: 0,
    baths: 0,
    sqft: 10890,
    sqftLabel: "0.25 acres",
    shortDescription:
      "A flat, serviced quarter acre plot with a ready title deed, ten minutes from the SGR terminus.",
    description: [
      "This quarter acre plot sits in a planned residential scheme in Syokimau, about ten minutes from the SGR terminus and the Eastern Bypass. The land is flat, red soil and clearly beaconed, with neighbouring homes already built.",
      "Services are on the scheme: tarmac access roads, mains water and electricity at the plot boundary, and a fenced scheme perimeter with a gate. The title is freehold with a clean search available to serious buyers.",
      "Syokimau continues to draw families and investors who want space near the airport and the Standard Gauge Railway link. Suitable for a family home, a rental development of up to eight units or a land bank play.",
    ],
    amenities: [
      "Ready title deed",
      "Freehold tenure",
      "Mains water on site",
      "Electricity at boundary",
      "Tarmac access road",
      "Fenced scheme",
      "Beaconed plot",
      "Near SGR terminus",
    ],
    images: ["land-1", "land-2", "land-3", "nairobi-cityscape"],
    agent: "brian-kiprop",
    lat: -1.3647,
    lng: 36.9411,
  },
  {
    slug: "ruaka-ridge-townhouse",
    name: "Ruaka Ridge Townhouse",
    type: "Townhouse",
    listing: "buy",
    location: "Ruaka",
    price: 26000000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    shortDescription:
      "A contemporary four bedroom townhouse in a new estate of ten units, minutes from Two Rivers.",
    description: [
      "Ruaka Ridge is a new development of ten townhouses on Gacharage Road, positioned between Ruaka town and Limuru Road. This corner unit has the largest garden in the estate at just over 2,800 square feet of built space.",
      "The design is contemporary: double volume living room, engineered oak stair treads, a fitted kitchen with a pantry and utility, guest bedroom downstairs and three ensuite bedrooms upstairs including a master with a dressing area.",
      "The estate is gated with a residents' gym, children's playground, borehole and generator backup. Two parking bays per house plus visitor parking. Two Rivers Mall and the new Ruaka retail strip are five minutes away, with easy access to the Northern Bypass.",
    ],
    amenities: [
      "Gated estate",
      "Residents gym",
      "Children playground",
      "Borehole water",
      "Backup generator",
      "Double volume living",
      "Ensuite bedrooms",
      "Visitor parking",
    ],
    images: ["house-4", "interior-living-3", "interior-bedroom-1", "interior-kitchen-2"],
    agent: "david-otieno",
    lat: -1.1866,
    lng: 36.7819,
    yearBuilt: "2023",
    parking: 2,
  },
  {
    slug: "kilimani-sky-apartment",
    name: "Kilimani Sky Apartment",
    type: "Apartment",
    listing: "rent",
    location: "Kilimani",
    price: 120000,
    priceSuffix: "per month",
    beds: 2,
    baths: 2,
    sqft: 950,
    shortDescription:
      "A furnished 2 bedroom rental on the 7th floor with skyline views, available on flexible terms.",
    description: [
      "This seventh floor apartment in a serviced block off Argwings Kodhek Road comes fully furnished and equipped, ready for immediate move in. The living room faces the city skyline with floor to ceiling glazing and a wide balcony.",
      "Two bedrooms, both with air conditioning and blackout curtains, a modern kitchen with appliances included, high speed internet and DStv connections. Weekly housekeeping is available on request.",
      "Rent is inclusive of service charge and water, with electricity on prepaid meter. A dedicated parking bay in the basement, 24 hour reception and a residents' rooftop lounge complete the package. Minimum lease six months.",
    ],
    amenities: [
      "Fully furnished",
      "Skyline views",
      "Air conditioning",
      "High speed internet",
      "Basement parking",
      "24 hour reception",
      "Rooftop lounge",
      "Weekly housekeeping",
    ],
    images: ["apartment-4", "interior-living-2", "interior-kitchen-1", "interior-bedroom-2"],
    agent: "wanjiku-kamau",
    lat: -1.2895,
    lng: 36.7875,
    parking: 1,
  },
  {
    slug: "lavington-family-maisonette",
    name: "Lavington Family Maisonette",
    type: "Maisonette",
    listing: "rent",
    location: "Lavington",
    price: 250000,
    priceSuffix: "per month",
    beds: 4,
    baths: 3,
    sqft: 2400,
    shortDescription:
      "A spacious four bedroom maisonette to let in a secure Lavington compound with a shared garden.",
    description: [
      "Available to let in a well maintained compound of four units off James Gichuru Road, this maisonette offers 2,400 square feet of family space with a private yard and access to a shared landscaped garden.",
      "Four bedrooms upstairs, master ensuite with a balcony, plus a ground floor guest room that works well as a study. The kitchen is fitted with a pantry, and there is a separate laundry area and DSQ.",
      "The compound has electric fencing, CCTV, a manned gate and borehole backup. Schools including Strathmore and St Mary's are within a short drive, and the compound is pet friendly by agreement. One year lease preferred.",
    ],
    amenities: [
      "Private yard",
      "Shared garden",
      "Ensuite master",
      "Balcony",
      "DSQ included",
      "Electric fencing",
      "Borehole backup",
      "Pet friendly",
    ],
    images: ["house-5", "interior-living-4", "interior-bedroom-3", "interior-kitchen-3"],
    agent: "david-otieno",
    lat: -1.2772,
    lng: 36.7642,
    parking: 2,
  },
  {
    slug: "westlands-work-suite",
    name: "Westlands Work Suite",
    type: "Commercial",
    listing: "rent",
    location: "Westlands",
    price: 180000,
    priceSuffix: "per month",
    beds: 0,
    baths: 2,
    sqft: 1200,
    shortDescription:
      "A fitted 1,200 sqft office suite on the third floor of a Delta Corner area building, ready to move in.",
    description: [
      "A practical, fitted office suite in a professionally managed building near Delta Corner, Westlands. The 1,200 square foot floor plate is configured as an open workspace with two glass partitioned meeting rooms and a kitchenette.",
      "The suite benefits from natural light on two sides, fibre internet readiness, split unit air conditioning and shared washrooms on the floor. Backup power covers the suite, and four dedicated parking bays are included in the rent.",
      "Service charge covers cleaning of common areas, security and building maintenance. The building is walkable to the Sarit and Westgate retail cluster, which makes recruitment and client meetings easy.",
    ],
    amenities: [
      "Fitted office",
      "Meeting rooms",
      "Air conditioning",
      "Fibre internet",
      "Backup power",
      "Four parking bays",
      "Natural light",
      "Managed building",
    ],
    images: ["office-3", "office-4", "office-2", "office-1"],
    agent: "amina-hassan",
    lat: -1.2586,
    lng: 36.7997,
    parking: 4,
  },
  {
    slug: "the-wren-kileleshwa",
    name: "The Wren, Kileleshwa",
    type: "New Development",
    listing: "buy",
    location: "Kileleshwa",
    price: 8900000,
    beds: 2,
    baths: 2,
    sqft: 920,
    shortDescription:
      "Off plan 1 and 2 bedroom apartments in a boutique block of 30 units, launching this quarter.",
    description: [
      "The Wren is a boutique development of 30 apartments on Oloitokitok Road, Kileleshwa, designed for first time buyers and investors who want a manageable entry into the market.",
      "Units range from 640 square foot one bedrooms to 920 square foot two bedrooms, each with a private balcony, fitted kitchen and ceramic finishes throughout. The block has a residents' rooftop, lift access to all floors, borehole water and a generator for common services.",
      "The developer offers a staged payment plan: 20 percent on booking, 40 percent at ground slab, 30 percent on window fitting and 10 percent on handover. Deposits are held in a project escrow account, and title is transferred on completion.",
    ],
    amenities: [
      "Rooftop terrace",
      "Lift access",
      "Balcony",
      "Fitted kitchen",
      "Borehole water",
      "Backup generator",
      "Escrow protected",
      "Staged payment plan",
    ],
    images: ["apartment-5", "dev-1", "interior-living-5", "interior-kitchen-3"],
    agent: "brian-kiprop",
    lat: -1.2843,
    lng: 36.7712,
    development: {
      launchDate: "Launching March 2026",
      completion: "Q3 2027",
      startingPrice: "KES 6.4M",
      units: "30 units, 1 to 2 bedrooms",
    },
  },
  {
    slug: "savanna-court-karen",
    name: "Savanna Court, Karen",
    type: "New Development",
    listing: "buy",
    location: "Karen",
    price: 24000000,
    beds: 4,
    baths: 4,
    sqft: 3100,
    shortDescription:
      "Gated community of 12 four bedroom villas on Dagoreti Road, Karen, with half acre gardens.",
    description: [
      "Savanna Court is our flagship villa development: twelve four bedroom homes on half acre plots along Dagoreti Road, Karen, each with a private garden and a design language drawn from the acacia woodlands around it.",
      "Homes deliver 3,100 square feet across two floors, with a double volume lounge, a family room, a fitted kitchen with pantry and utility, guest suite downstairs, three ensuite bedrooms upstairs and a two room staff quarters annex.",
      "The shared estate amenities include a residents' clubhouse, gym, children's playground and jogging track. Each home has solar water heating, a 10,000 litre water reserve, borehole supply and two car garages plus open parking. Construction is supervised by an independent quantity surveyor with quarterly buyer site visits.",
    ],
    amenities: [
      "Half acre plots",
      "Residents clubhouse",
      "Gym",
      "Children playground",
      "Jogging track",
      "Solar water heating",
      "Staff quarters",
      "Independent QS supervision",
    ],
    images: ["dev-3", "house-4", "land-3", "dev-4"],
    agent: "brian-kiprop",
    lat: -1.3126,
    lng: 36.6847,
    development: {
      launchDate: "Launching June 2026",
      completion: "Q4 2027",
      startingPrice: "KES 24M",
      units: "12 villas, 4 bedrooms",
    },
  },
  {
    slug: "tamasha-towers-westlands",
    name: "Tamasha Towers, Westlands",
    type: "New Development",
    listing: "buy",
    location: "Westlands",
    price: 12500000,
    beds: 3,
    baths: 3,
    sqft: 1350,
    shortDescription:
      "Premium 2 and 3 bedroom apartments with skyline views in a 14 storey Rhapta Road tower.",
    description: [
      "Tamasha Towers rises fourteen storeys on Rhapta Road, Westlands, with apartments oriented to capture both the city skyline and the tree canopy of the Nairobi Arboretum side of the ridge.",
      "Two and three bedroom configurations from 980 to 1,350 square feet, each with a wide balcony, full height glazing, engineered stone kitchen worktops and premium sanitary ware. Residents get a sky lounge on the thirteenth floor, a gym, a business centre and two basement parking bays per unit.",
      "Off plan pricing opens at KES 9.2M for two bedrooms. The payment structure is 30 percent deposit and the balance spread across construction milestones, with financing available from partner banks for qualifying buyers. Expected rental yield on completion is projected at 7.5 percent per annum.",
    ],
    amenities: [
      "Sky lounge",
      "Gym",
      "Business centre",
      "Two parking bays",
      "Full height glazing",
      "Wide balcony",
      "Bank financing",
      "Projected 7.5% yield",
    ],
    images: ["dev-2", "apartment-3", "dev-4", "interior-living-4"],
    agent: "amina-hassan",
    lat: -1.2627,
    lng: 36.7965,
    development: {
      launchDate: "Launching January 2026",
      completion: "Q2 2027",
      startingPrice: "KES 9.2M",
      units: "84 units, 2 to 3 bedrooms",
    },
  },
];

export function propertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function featuredProperties(): Property[] {
  return PROPERTIES.filter((p) => p.featured);
}

export function developments(): Property[] {
  return PROPERTIES.filter((p) => Boolean(p.development));
}

export type SearchFilters = {
  listing?: string;
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  q?: string;
};

export function searchProperties(filters: SearchFilters): Property[] {
  return PROPERTIES.filter((p) => {
    if (filters.listing && filters.listing !== "all" && p.listing !== filters.listing) return false;
    if (filters.type && filters.type !== "all" && p.type !== filters.type) return false;
    if (filters.location && filters.location !== "all" && p.location !== filters.location) return false;
    if (typeof filters.minPrice === "number" && p.price < filters.minPrice) return false;
    if (typeof filters.maxPrice === "number" && filters.maxPrice > 0 && p.price > filters.maxPrice) return false;
    if (typeof filters.beds === "number" && filters.beds > 0 && p.beds < filters.beds) return false;
    if (filters.q) {
      const needle = filters.q.toLowerCase();
      const haystack = `${p.name} ${p.location} ${p.type} ${p.shortDescription}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

export const PRICE_BANDS = [
  { label: "Any budget", min: 0, max: 0 },
  { label: "Under 10M", min: 0, max: 10000000 },
  { label: "10M to 25M", min: 10000000, max: 25000000 },
  { label: "25M to 50M", min: 25000000, max: 50000000 },
  { label: "Over 50M", min: 50000000, max: 0 },
  { label: "Under 150K per month", min: 0, max: 150000 },
  { label: "150K to 300K per month", min: 150000, max: 300000 },
];
