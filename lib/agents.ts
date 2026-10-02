import { waLink } from "./site";

export interface Agent {
  id: string;
  name: string;
  title: string;
  specialisation: string;
  listings: number;
  image: string;
  languages: string[];
  whatsapp: string;
}

const agentWa = (name: string) =>
  waLink(`Hello ${name}, I found your profile on the Savanna Realty Group website and I would like to talk about property.`);

export const AGENTS: Agent[] = [
  {
    id: "wanjiku-kamau",
    name: "Wanjiku Kamau",
    title: "Lead Property Consultant",
    specialisation: "Apartments in Kilimani, Kileleshwa and Lavington",
    listings: 38,
    image: "agent-wanjiku",
    languages: ["English", "Kiswahili", "Kikuyu"],
    whatsapp: agentWa("Wanjiku"),
  },
  {
    id: "david-otieno",
    name: "David Otieno",
    title: "Senior Sales Agent",
    specialisation: "Maisonettes and townhouses in Karen, Runda and Ruaka",
    listings: 45,
    image: "agent-david",
    languages: ["English", "Kiswahili", "Dholuo"],
    whatsapp: agentWa("David"),
  },
  {
    id: "amina-hassan",
    name: "Amina Hassan",
    title: "Commercial and Investments Lead",
    specialisation: "Commercial floors and investment suites in Westlands and the CBD",
    listings: 27,
    image: "agent-amina",
    languages: ["English", "Kiswahili", "Arabic"],
    whatsapp: agentWa("Amina"),
  },
  {
    id: "brian-kiprop",
    name: "Brian Kiprop",
    title: "Diaspora Client Manager",
    specialisation: "Land parcels and new developments for diaspora investors",
    listings: 31,
    image: "agent-brian",
    languages: ["English", "Kiswahili", "Kalenjin"],
    whatsapp: agentWa("Brian"),
  },
];

export function agentById(id: string): Agent {
  return AGENTS.find((a) => a.id === id) ?? AGENTS[0];
}
