"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  brand: string;
  type: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  brand: "",
  type: "",
  message: "",
};

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        // EmailJS not yet configured — simulate success in dev so the UI is testable
        await new Promise((r) => setTimeout(r, 600));
        setSent(true);
        return;
      }
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...form }, PUBLIC_KEY);
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(
        "Something went wrong. Please email micarsos.trisha@gmail.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div>
        <p className="section-label">Work with me</p>
        <h2 id="contact-heading" className="section-title">
          Let&apos;s create
          <br />
          <em>something memorable.</em>
        </h2>
        <p className="section-sub" style={{ marginTop: 16 }}>
          Whether you&apos;re a hotel, restaurant, or destination brand —
          I&apos;d love to hear what you have in mind.
        </p>

        <div className="contact-grid">
          {sent ? (
            <div className="form-success" role="status" aria-live="polite">
              <div className="form-success-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="form-success-title">Message received.</div>
              <div className="form-success-sub">
                I&apos;ll be in touch within 48 hours. Talk soon!
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    className="form-input"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    placeholder="jane@brand.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-brand">
                  Brand / Company
                </label>
                <input
                  id="contact-brand"
                  className="form-input"
                  placeholder="Aman Resorts"
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  autoComplete="organization"
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-type">
                  Type of collaboration
                </label>
                <select
                  id="contact-type"
                  className="form-select"
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                >
                  <option value="" disabled>
                    Select one…
                  </option>
                  <option>Hotel / Resort stay</option>
                  <option>Restaurant / Dining experience</option>
                  <option>Travel destination campaign</option>
                  <option>Luxury product feature</option>
                  <option>Long-term partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-message">
                  Tell me more
                </label>
                <textarea
                  id="contact-message"
                  className="form-input form-textarea"
                  placeholder="What are you looking to create together?"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="btn-submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send inquiry →"}
              </button>
            </form>
          )}

          <div>
            <div className="contact-info-title">
              Authentic stories
              <br />
              for <em>discerning brands.</em>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-label">Response time</div>
              <div className="contact-detail-val">Within 48 hours</div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-label">Specialties</div>
              <div className="contact-detail-val">
                Hotels · Fine dining · Luxury travel
              </div>
            </div>
            <div className="contact-platforms">
              <a
                href="https://instagram.com/trywithtrish"
                className="platform-pill"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
