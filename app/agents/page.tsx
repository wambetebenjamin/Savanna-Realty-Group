import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AgentCard } from "@/components/agent-card";
import { Reveal } from "@/components/reveal";
import { AGENTS } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Meet Our Agents",
  description:
    "Meet the Savanna Realty Group team: apartment specialists, townhouse experts, commercial investment leads and a dedicated diaspora client manager.",
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        title="Agents Who Know Their Patch"
        image="nairobi-skyline-vibrant"
        imageAlt="Vibrant view of the Nairobi skyline"
        crumb="Agents"
      />
      <section className="page-content">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Team</span>
            <h2 className="h2">Four specialists, one standard of service</h2>
            <p className="lead">
              Every agent at Savanna Realty is licensed, area specialised and
              measured on client outcomes, not just volume. Message any of them
              directly on WhatsApp.
            </p>
          </div>
          <div className="agents-row">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 60}>
                <AgentCard agent={agent} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
