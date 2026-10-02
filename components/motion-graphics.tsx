"use client";

import { Building2, KeyRound, MapPin, Sparkles, Star } from "lucide-react";

/** A lightweight animated visual layer shared by every route. */
export function MotionGraphics() {
  return (
    <div className="motion-graphics" aria-hidden="true">
      <div className="motion-graphics__orb motion-graphics__orb--one" />
      <div className="motion-graphics__orb motion-graphics__orb--two" />
      <div className="motion-graphics__ring motion-graphics__ring--one" />
      <div className="motion-graphics__ring motion-graphics__ring--two" />
      <div className="motion-graphics__photo motion-graphics__photo--one">
        <img src="/images/nairobi-skyline-vibrant.jpg" alt="" />
        <span><Building2 size={16} /> Nairobi</span>
      </div>
      <div className="motion-graphics__photo motion-graphics__photo--two">
        <img src="/images/interior-living-3.jpg" alt="" />
        <span><KeyRound size={15} /> Your next chapter</span>
      </div>
      <div className="motion-graphics__badge motion-graphics__badge--one"><Sparkles size={16} /> Verified homes</div>
      <div className="motion-graphics__badge motion-graphics__badge--two"><MapPin size={15} /> 24 neighbourhoods</div>
      <div className="motion-graphics__stars"><Star size={14} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
    </div>
  );
}
