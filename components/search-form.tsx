"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchForm() {
  const [mode, setMode] = useState<"Buy" | "Rent">("Buy");
  return <form className="uptown-search-form" action="/properties" role="search">
    <div className="uptown-search-tabs"><button type="button" className={mode === "Buy" ? "active" : ""} onClick={() => setMode("Buy")}>Buy</button><button type="button" className={mode === "Rent" ? "active" : ""} onClick={() => setMode("Rent")}>Rent</button></div>
    <input type="hidden" name="status" value={mode === "Buy" ? "sale" : "rent"} />
    <label><span>Location</span><select name="location" defaultValue=""><option value="">Choose a location</option><option>Westlands</option><option>Kilimani</option><option>Runda</option><option>Karen</option><option>Kiambu Road</option></select></label>
    <label><span>Property type</span><select name="type" defaultValue=""><option value="">Any property type</option><option>Apartment</option><option>House</option><option>Land</option><option>Commercial</option></select></label>
    <label className="keyword"><span>Keyword</span><input name="q" placeholder="e.g. 3 bedroom" /></label>
    <button className="uptown-search-submit" type="submit"><Search size={17} /> Search</button>
  </form>;
}
