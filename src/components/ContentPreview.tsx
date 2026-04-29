import Image, { type StaticImageData } from "next/image";
import type { Collab, ContentFormat } from "@/lib/data";
import { COLORS } from "@/lib/data";

type IconProps = {
  type: ContentFormat;
  size?: number;
};

export function FormatIcon({ type, size = 12 }: IconProps) {
  if (type === "Carousel") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="10" height="10" rx="1.5" strokeWidth="1.8" />
        <rect
          x="13"
          y="5"
          width="2"
          height="6"
          rx="1"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
      </svg>
    );
  }

  if (type === "Story") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="4" strokeWidth="1.8" />
        <circle
          cx="8"
          cy="8"
          r="6.5"
          strokeDasharray="2 1.5"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="4,2 13,8 4,14" />
    </svg>
  );
}

export function formatLabel(type: ContentFormat) {
  return type === "Story" ? "Story Repost" : type;
}

export function formatBadgeClass(type: ContentFormat) {
  return `format-badge badge-${type.toLowerCase()}`;
}

export function getCarouselCount(item: Collab) {
  return item.images?.length ?? item.slides ?? 4;
}

export function getStoryCount(item: Collab) {
  return item.images?.length ?? 3;
}

function PlaceholderBg({
  item,
  opacity = 0.12,
}: {
  item: Collab;
  opacity?: number;
}) {
  const bg = item.color || COLORS[item.cat] || "#C4B4A0";

  return (
    <div className="content-bg" style={{ background: bg }} aria-hidden="true">
      <div
        className="content-bg-stripes"
        style={{
          background: `repeating-linear-gradient(135deg, rgba(255,255,255,${opacity}) 0px, rgba(255,255,255,${opacity}) 1px, transparent 1px, transparent 18px)`,
        }}
      />
      <div className="content-bg-label">
        {item.brand}
        <br />
        content here
      </div>
    </div>
  );
}

function PreviewImage({
  src,
  item,
  opacity,
}: {
  src?: StaticImageData;
  item: Collab;
  opacity?: number;
}) {
  if (!src) return <PlaceholderBg item={item} opacity={opacity} />;
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      fill
      sizes="(max-width: 768px) 60vw, 280px"
      placeholder="blur"
      className="content-img"
      style={{ objectFit: "cover" }}
    />
  );
}

function ReelContent({ item }: { item: Collab }) {
  return (
    <>
      <PreviewImage src={item.cover} item={item} />
      <div className="play-btn-circle">
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <polygon points="4,2 13,8 4,14" />
        </svg>
      </div>
      <div className="phone-bottom-label">
        <div className="phone-bottom-brand">{item.brand}</div>
        <div className="phone-bottom-title">{item.title}</div>
      </div>
    </>
  );
}

function CarouselContent({
  item,
  activeSlide = 0,
}: {
  item: Collab;
  activeSlide?: number;
}) {
  const slides = getCarouselCount(item);
  const src = item.images?.[activeSlide] ?? item.cover;

  return (
    <>
      <PreviewImage src={src} item={item} />
      <div className="carousel-stack" aria-hidden="true" />
      <div className="carousel-stack2" aria-hidden="true" />
      <div className="carousel-counter">
        {activeSlide + 1}/{slides}
      </div>
      <div className="carousel-dots" aria-hidden="true">
        {Array.from({ length: Math.min(slides, 5) }).map((_, i) => (
          <span
            key={i}
            className={`c-dot ${i === activeSlide % 5 ? "active" : ""}`}
          />
        ))}
        {slides > 5 && <span className="c-more">+{slides - 5}</span>}
      </div>
      <div className="phone-bottom-label carousel">
        <div className="phone-bottom-brand">{item.brand}</div>
        <div className="phone-bottom-title">{item.title}</div>
      </div>
    </>
  );
}

function StoryContent({
  item,
  storySlide = 0,
}: {
  item: Collab;
  storySlide?: number;
}) {
  const handle = item.storyHandle ?? "brand";
  const total = getStoryCount(item);
  const src = item.images?.[storySlide] ?? item.cover;

  return (
    <>
      <PreviewImage src={src} item={item} opacity={0.08} />
      <div className="story-progress" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`story-prog-bar ${i < storySlide ? "done" : ""} ${
              i === storySlide ? "active" : ""
            }`}
          />
        ))}
      </div>
      <div className="story-account-bar">
        <div className="story-avatar" aria-hidden="true">
          ig
        </div>
        <div>
          <div className="story-handle">@{handle}</div>
          <div className="story-sub">Brand repost</div>
        </div>
        <div className="story-repost-badge">Repost</div>
      </div>
      <div className="story-watermark">
        <div>Originally by</div>
        <strong>@TryWithTrish</strong>
      </div>
    </>
  );
}

type PreviewProps = {
  item: Collab;
  activeSlide?: number;
  storySlide?: number;
};

export function PhoneContent({ item, activeSlide, storySlide }: PreviewProps) {
  if (item.type === "Carousel") {
    return <CarouselContent item={item} activeSlide={activeSlide} />;
  }

  if (item.type === "Story") {
    return <StoryContent item={item} storySlide={storySlide} />;
  }

  return <ReelContent item={item} />;
}
