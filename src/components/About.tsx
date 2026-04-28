export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="about-grid">
        <div className="about-photo-wrap">
          <div className="about-photo">
            <div className="about-photo-inner">
              <span className="about-photo-label">portrait photo</span>
            </div>
          </div>
          <div className="about-accent" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">About Trisha</p>
          <h2
            id="about-heading"
            className="section-title"
            style={{ marginBottom: 24 }}
          >
            Luxury, <em>lived &amp; told.</em>
          </h2>
          <p className="about-bio">
            I document the world&apos;s most extraordinary places — from
            Michelin-starred kitchens to overwater villas — and turn each into
            short-form content that feels as good to watch as the experience
            itself.
          </p>
          <p className="about-bio">
            My audience trusts me because I only say yes to things I genuinely
            love. If I&apos;m posting it, I mean it.
          </p>
          <a
            href="https://instagram.com/trywithtrish"
            className="about-ig-link"
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
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            @TryWithTrish on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
