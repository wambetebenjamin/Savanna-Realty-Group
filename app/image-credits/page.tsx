import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Image Credits",
  description:
    "Credits for the free Pexels photography used across the Savanna Realty Group website.",
};

interface CreditRow {
  file: string;
  note: string;
  link: string;
  label: string;
}

function loadCredits(): CreditRow[] {
  const raw = fs.readFileSync(path.join(process.cwd(), "IMAGE-CREDITS.md"), "utf8");
  const rows: CreditRow[] = [];
  for (const line of raw.split("\n")) {
    if (!line.startsWith("| `/images/")) continue;
    const cells = line.split("|").map((c) => c.trim());
    const file = (cells[1] ?? "").replace(/`/g, "");
    const note = cells[2] ?? "";
    const linkMatch = (cells[3] ?? "").match(/\((https?:\/\/[^)]+)\)/);
    const labelMatch = (cells[3] ?? "").match(/\[([^\]]+)\]/);
    if (file) {
      rows.push({
        file,
        note,
        link: linkMatch?.[1] ?? "",
        label: labelMatch?.[1] ?? "Pexels",
      });
    }
  }
  return rows;
}

export default function ImageCreditsPage() {
  const rows = loadCredits();

  return (
    <>
      <PageHeader
        title="Image Credits"
        image="nairobi-cityscape"
        imageAlt="Nairobi cityscape"
        crumb="Image Credits"
      />
      <section className="page-content">
        <div className="container">
          <p style={{ color: "var(--muted)", maxWidth: 640, marginBottom: 32 }}>
            All photography on this site is free stock photography sourced from
            Pexels and used under the Pexels License. Credits are listed below
            as a courtesy to the photographers and for traceability.
          </p>
          <div className="detail-amenities" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {rows.map((row) => (
              <div className="amenity" key={row.file} style={{ alignItems: "flex-start" }}>
                <div style={{ minWidth: 0 }}>
                  <code style={{ fontSize: 12.5, wordBreak: "break-all" }}>{row.file}</code>
                  <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>
                    {row.note}
                  </div>
                  {row.link && (
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12.5, color: "var(--sage)", fontWeight: 600 }}
                    >
                      {row.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
