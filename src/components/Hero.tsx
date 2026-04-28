import { FEATURED } from "@/lib/data";
import { PhoneContent } from "./ContentPreview";

const HERO_PHONES = [
  {
    top: "12%",
    left: "6%",
    rotate: "-7deg",
    item: FEATURED[0],
    z: 1,
    scale: 0.85,
  },
  {
    top: "6%",
    left: "30%",
    rotate: "0deg",
    item: FEATURED[1],
    z: 3,
    scale: 1,
  },
  {
    top: "16%",
    left: "55%",
    rotate: "6deg",
    item: FEATURED[2],
    z: 2,
    scale: 0.87,
  },
];

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">
          Luxury Travel & Dining · Instagram Content
        </p>
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
        <dl className="hero-stats">
          <div>
            <dt className="stat-label">Followers</dt>
            <dd className="stat-num">—</dd>
          </div>
          <div>
            <dt className="stat-label">Avg. engagement</dt>
            <dd className="stat-num">—</dd>
          </div>
          <div>
            <dt className="stat-label">Brand collabs</dt>
            <dd className="stat-num">3+</dd>
          </div>
        </dl>
      </div>
      <div className="hero-right" aria-hidden="true">
        <div className="hero-collage">
          {HERO_PHONES.map((p, i) => (
            <div
              key={i}
              className="hero-phone"
              style={{
                top: p.top,
                left: p.left,
                transform: `rotate(${p.rotate}) scale(${p.scale})`,
                zIndex: p.z,
              }}
            >
              <div className="hero-phone-screen">
                <PhoneContent item={p.item} small />
              </div>
            </div>
          ))}
          <div className="hero-floating-label">
            <div className="hero-floating-eyebrow">Latest collab</div>
            <div className="hero-floating-brand">Ritz-Carlton Half Moon Bay</div>
          </div>
        </div>
      </div>
    </section>
  );
}
