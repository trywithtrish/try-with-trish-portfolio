"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s" }}
    >
      <div className="hero-right" aria-hidden="true">
        <div className="hero-portrait-placeholder">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--taupe)"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <span className="hero-portrait-label">portrait photo</span>
        </div>
        <div className="hero-portrait-border-br" />
        <div className="hero-portrait-border-tl" />
      </div>
      <div className="hero-left">
        <h1 className="hero-title">
          Experiences
          <br />
          worth <em>sharing.</em>
        </h1>
        <p className="hero-desc">
          I&apos;m Trisha — documenting extraordinary hotels, restaurants, and
          destinations through reels, carousels, and story coverage that help
          luxury experiences feel worth booking.
        </p>
        <div className="hero-actions">
          <a href="#featured" className="btn-primary">
            View my work
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
