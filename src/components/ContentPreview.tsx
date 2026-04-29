import Image, { type StaticImageData } from "next/image";
import type { Collab, ContentFormat } from "@/lib/data";

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

function PreviewImage({ src }: { src: StaticImageData }) {
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
  return <PreviewImage src={item.cover} />;
}

function CarouselContent({
  item,
  activeSlide = 0,
}: {
  item: Collab;
  activeSlide?: number;
}) {
  return <PreviewImage src={item.images?.[activeSlide] ?? item.cover} />;
}

function StoryContent({
  item,
  storySlide = 0,
}: {
  item: Collab;
  storySlide?: number;
}) {
  return <PreviewImage src={item.images?.[storySlide] ?? item.cover} />;
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
