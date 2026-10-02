"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * Inline valuation request form (Name, Phone, Property Address) posting to
 * /api/valuation, which stores the lead and notifies the business on
 * WhatsApp.
 */
export function ValuationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [waUrl, setWaUrl] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "valuation", name, phone, address }),
      });
      const data = (await res.json()) as { error?: string; whatsappUrl?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage("Request received. An agent will call you within one working day.");
      setWaUrl(data.whatsappUrl ?? "");
      setName("");
      setPhone("");
      setAddress("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or reach us on WhatsApp.");
    }
  }

  return (
    <form className="form form--inline" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="val-name">Name</label>
          <input
            id="val-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="field">
          <label htmlFor="val-phone">Phone</label>
          <input
            id="val-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07XX XXX XXX"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="val-address">Property Address</label>
        <input
          id="val-address"
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 3 bedroom house, Kileleshwa"
        />
      </div>
      <button type="submit" className="btn btn--terracotta btn--block" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Get My Free Valuation"}
      </button>
      {message && (
        <p className={`form__status form__status--${status === "ok" ? "ok" : "error"}`} role="status">
          {status === "ok" ? (
            <CheckCircle2 size={16} aria-hidden="true" />
          ) : (
            <AlertCircle size={16} aria-hidden="true" />
          )}
          <span>
            {message}
            {status === "ok" && waUrl && (
              <>
                {" "}
                <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                  Forward details on WhatsApp
                </a>
              </>
            )}
          </span>
        </p>
      )}
      <p className="form__note">
        No obligation. We cover Nairobi and the surrounding satellite towns.
      </p>
    </form>
  );
}
