"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`site-nav ${scrolled ? "scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <a href="#hero" className="nav-logo">
        TryWithTrish
      </a>
      <ul className="nav-links">
        <li>
          <a href="#featured">Work</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <a href="#contact" className="nav-cta">
        Work with me
      </a>
    </nav>
  );
}
