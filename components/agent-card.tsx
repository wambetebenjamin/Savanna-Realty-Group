"use client";

import { useRef } from "react";
import { Briefcase } from "lucide-react";
import type { Agent } from "@/lib/agents";
import { SmartImage } from "./smart-image";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Agent card with a slight 3D perspective shift on hover (pointer devices
 * only, disabled for reduced motion).
 */
export function AgentCard({ agent }: { agent: Agent }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-relY * 3).toFixed(
      2,
    )}deg) rotateY(${(relX * 4).toFixed(2)}deg)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <article ref={ref} className="agent-card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="agent-card__media">
        <SmartImage
          name={agent.image}
          alt={`${agent.name}, ${agent.title} at Savanna Realty Group`}
          width={500}
          height={560}
          sizes="(max-width: 640px) 76vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="agent-card__body">
        <div className="agent-card__name">{agent.name}</div>
        <div className="agent-card__title">{agent.title}</div>
        <p className="agent-card__spec">{agent.specialisation}</p>
        <div className="agent-card__meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Briefcase size={14} aria-hidden="true" />
            {agent.listings} listings
          </span>
          <a
            href={agent.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="agent-card__wa"
          >
            <WhatsAppIcon size={13} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
