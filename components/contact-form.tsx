"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2 } from "lucide-react";

/**
 * Viewing booking form on the contact page. Posts to /api/valuation with
 * kind "viewing" (the shared lead capture endpoint), which saves the
 * request and pings the business on WhatsApp.
 */
export function ContactForm({ properties }: { properties: { slug: string; name: string }[] }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    property: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "viewing", ...form, address: form.property }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(
        "Booking request received. We will confirm your viewing slot by phone within a few hours.",
      );
      setForm({ name: "", phone: "", property: "", message: "" });
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or reach us on WhatsApp.");
    }
  }

  return (
    <form className="form form--light" id="book" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="bk-name">Name</label>
          <input
            id="bk-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your full name"
          />
        </div>
        <div className="field">
          <label htmlFor="bk-phone">Phone</label>
          <input
            id="bk-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="07XX XXX XXX"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="bk-property">Property to View</label>
        <select
          id="bk-property"
          required
          value={form.property}
          onChange={(e) => setForm((f) => ({ ...f, property: e.target.value }))}
        >
          <option value="">Select a property</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="General enquiry">General enquiry, no specific property</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="bk-message">Preferred Date and Notes</label>
        <textarea
          id="bk-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="e.g. Saturday morning, or any weekday after 5pm"
        />
      </div>
      <button type="submit" className="btn btn--terracotta btn--block" disabled={status === "loading"}>
        <CalendarCheck size={15} aria-hidden="true" />
        {status === "loading" ? "Booking..." : "Request Viewing"}
      </button>
      {message && (
        <p className={`form__status form__status--${status === "ok" ? "ok" : "error"}`} role="status">
          {status === "ok" ? (
            <CheckCircle2 size={16} aria-hidden="true" />
          ) : (
            <AlertCircle size={16} aria-hidden="true" />
          )}
          {message}
        </p>
      )}
    </form>
  );
}
