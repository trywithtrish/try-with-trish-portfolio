"use client";

import type { Collab } from "@/lib/data";
import { FEATURED } from "@/lib/data";
import {
  FormatIcon,
  formatBadgeClass,
  formatLabel,
  PhoneContent,
} from "./ContentPreview";
import { DeviceFrame } from "./DeviceFrame";

type Props = {
  onOpen: (item: Collab, trigger: HTMLElement) => void;
};

export function Featured({ onOpen }: Props) {
  return (
    <section id="featured" aria-labelledby="featured-heading">
      <header className="featured-header">
        <div>
          <p className="section-label">Featured collabs</p>
          <h2 id="featured-heading" className="section-title">
            Work I&apos;m <em>proud of</em>
          </h2>
        </div>
        <a href="#work" className="btn-ghost" style={{ marginBottom: 8 }}>
          Browse all work
        </a>
      </header>
      <div className="featured-scroll" role="list">
        {FEATURED.map((item) => (
          <button
            key={item.id}
            type="button"
            className="phone-card"
            role="listitem"
            aria-label={`Open details for ${item.title} — ${item.brand}`}
            onClick={(e) => onOpen(item, e.currentTarget)}
          >
            <DeviceFrame>
              <PhoneContent item={item} />
            </DeviceFrame>
            <div className="phone-card-label">
              <span className={formatBadgeClass(item.type)}>
                <FormatIcon type={item.type} size={10} />
                {formatLabel(item.type)}
              </span>
              <div className="card-title">{item.title}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
