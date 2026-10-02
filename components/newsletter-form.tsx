"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage("You are on the list. Market updates are on the way.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div>
      <form className="footer__news-form" onSubmit={onSubmit} noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
        />
        <button
          type="submit"
          className="btn btn--sage"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className="footer__news-status" role="status">
          {status === "ok" && <CheckCircle2 size={14} style={{ display: "inline", marginRight: 4 }} aria-hidden="true" />}
          {message}
        </p>
      )}
    </div>
  );
}
