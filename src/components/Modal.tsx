"use client";

import { useEffect, useRef, useState } from "react";
import type { Collab } from "@/lib/data";
import {
  FormatIcon,
  formatBadgeClass,
  formatLabel,
  getCarouselCount,
  getStoryCount,
  PhoneContent,
} from "./ContentPreview";
import { DeviceFrame } from "./DeviceFrame";

type Props = {
  item: Collab | null;
  onClose: () => void;
};

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({ item, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [previewState, setPreviewState] = useState<{
    itemId: number | null;
    carouselSlide: number;
    storySlide: number;
  }>({ itemId: null, carouselSlide: 0, storySlide: 0 });

  useEffect(() => {
    if (!item) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus the close button (first focusable in dialog) when it opens
    const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusables[0]?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const elements = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKey);
    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, onClose]);

  const totalSlides = item ? getCarouselCount(item) : 4;
  const totalStories = item ? getStoryCount(item) : 3;
  const carouselSlide =
    item && previewState.itemId === item.id ? previewState.carouselSlide : 0;
  const storySlide =
    item && previewState.itemId === item.id ? previewState.storySlide : 0;

  return (
    <div
      className={`modal-backdrop ${item ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!item}
    >
      {item && (
        <div
          ref={dialogRef}
          className="modal-wrap"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
          <div className="modal-phone-wrap">
            <DeviceFrame>
              {item.type === "Reel" && item.videoUrl ? (
                <video
                  src={item.videoUrl}
                  className="content-video"
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <PhoneContent
                  item={item}
                  activeSlide={carouselSlide}
                  storySlide={storySlide}
                />
              )}
              {item.type === "Story" && (
                <button
                  className="story-advance"
                  type="button"
                  onClick={() =>
                    setPreviewState((current) => ({
                      itemId: item.id,
                      carouselSlide: current.carouselSlide,
                      storySlide: (storySlide + 1) % totalStories,
                    }))
                  }
                  aria-label="Advance story preview"
                />
              )}
            </DeviceFrame>
            {item.type === "Carousel" && (
              <div className="modal-controls">
                <button
                  type="button"
                  className="modal-side-btn prev"
                  onClick={() =>
                    setPreviewState((current) => ({
                      itemId: item.id,
                      carouselSlide: Math.max(0, carouselSlide - 1),
                      storySlide: current.storySlide,
                    }))
                  }
                  disabled={carouselSlide === 0}
                  aria-label="Previous carousel slide"
                >
                  ‹
                </button>
                <div className="modal-controls-progress">
                  Slide {carouselSlide + 1} of {totalSlides}
                </div>
                <button
                  type="button"
                  className="modal-side-btn next"
                  onClick={() =>
                    setPreviewState((current) => ({
                      itemId: item.id,
                      carouselSlide: Math.min(totalSlides - 1, carouselSlide + 1),
                      storySlide: current.storySlide,
                    }))
                  }
                  disabled={carouselSlide === totalSlides - 1}
                  aria-label="Next carousel slide"
                >
                  ›
                </button>
              </div>
            )}
          </div>
          <div className="modal-info">
            <span className={`modal-info-type ${formatBadgeClass(item.type)}`}>
              <FormatIcon type={item.type} size={10} />
              {formatLabel(item.type)}
            </span>
            <h2 id="modal-title" className="modal-info-title">
              {item.title}
            </h2>
            <div className="modal-info-brand">
              {item.brand} · {item.cat}
            </div>
            {item.type === "Carousel" && (
              <div className="modal-format-detail">
                <div className="modal-detail-kicker">Jump to slide</div>
                <div className="modal-slide-scrubber">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={i === carouselSlide ? "active" : ""}
                      onClick={() =>
                        setPreviewState((current) => ({
                          itemId: item.id,
                          carouselSlide: i,
                          storySlide: current.storySlide,
                        }))
                      }
                      aria-label={`Show carousel slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            {item.type === "Story" && (
              <div className="modal-format-detail">
                <div className="modal-detail-kicker">
                  Tap phone to advance stories
                </div>
                <p>
                  Brand repost from @{item.storyHandle ?? "brand"} showing the
                  official account sharing Trisha&apos;s story coverage.
                </p>
              </div>
            )}
            {item.type === "Reel" && (
              <p className="modal-format-detail">
                {item.videoUrl
                  ? "Short-form Instagram Reel."
                  : item.cover
                    ? "Short-form Instagram Reel — final video coming soon, cover preview shown."
                    : "Short-form Instagram Reel. Drop your video link or file here when ready."}
              </p>
            )}
          </div>
          <span id="modal-desc" className="sr-only">
            {item.description ?? `Collaboration with ${item.brand}.`}
          </span>
        </div>
      )}
    </div>
  );
}
