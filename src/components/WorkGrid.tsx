"use client";

import { useState } from "react";
import type { Category, Collab, ContentFormat } from "@/lib/data";
import { FILTERS, FORMAT_FILTERS, WORK } from "@/lib/data";
import {
  FormatIcon,
  formatBadgeClass,
  formatLabel,
  PhoneContent,
} from "./ContentPreview";

type Props = {
  onOpen: (item: Collab, trigger: HTMLElement) => void;
};

export function WorkGrid({ onOpen }: Props) {
  const [categoryFilter, setCategoryFilter] =
    useState<(typeof FILTERS)[number]>("All");
  const [formatFilter, setFormatFilter] =
    useState<(typeof FORMAT_FILTERS)[number]>("All");

  const items = WORK.filter(
    (item) =>
      (categoryFilter === "All" ||
        item.cat === (categoryFilter as Category)) &&
      (formatFilter === "All" || item.type === (formatFilter as ContentFormat)),
  );

  return (
    <section id="work" aria-labelledby="work-heading">
      <div className="work-header">
        <p className="section-label">All work</p>
        <div className="work-header-row">
          <h2 id="work-heading" className="section-title">
            Browse by <em>category</em>
          </h2>
        </div>
        <div className="filter-panel">
          <div className="filter-group">
            <div className="filter-group-label">Topic</div>
            <div
              className="filter-bar"
              role="group"
              aria-label="Filter work by category"
            >
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="filter-btn"
                  aria-pressed={categoryFilter === f}
                  onClick={() => setCategoryFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-divider" aria-hidden="true" />
          <div className="filter-group">
            <div className="filter-group-label">Format</div>
            <div
              className="filter-bar"
              role="group"
              aria-label="Filter work by content format"
            >
              {FORMAT_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="filter-btn"
                  aria-pressed={formatFilter === f}
                  onClick={() => setFormatFilter(f)}
                >
                  <span className="filter-btn-content">
                    {f !== "All" && (
                      <FormatIcon type={f as ContentFormat} size={11} />
                    )}
                    {f === "All" ? "All" : formatLabel(f as ContentFormat)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-results" role="status">
          <div className="empty-results-title">No results</div>
          <div className="empty-results-copy">
            Try a different combination of filters.
          </div>
        </div>
      ) : (
        <ul
          className="work-grid"
          aria-live="polite"
          aria-label={`${items.length} ${items.length === 1 ? "item" : "items"}, filtered by ${categoryFilter} and ${formatFilter}`}
        >
          {items.map((item) => (
            <li key={item.id} style={{ listStyle: "none" }}>
              <button
                type="button"
                className="work-item"
                aria-label={`Open ${item.title} — ${item.brand}`}
                onClick={(e) => onOpen(item, e.currentTarget)}
              >
                <div className="work-phone">
                  <div className="work-notch" aria-hidden="true" />
                  <div className="work-screen">
                    <PhoneContent item={item} small />
                  </div>
                </div>
                <div className="work-info">
                  <span className={formatBadgeClass(item.type)}>
                    <FormatIcon type={item.type} size={9} />
                    {formatLabel(item.type)}
                  </span>
                  <div className="work-cat-label">{item.brand}</div>
                  <div className="work-name">{item.title}</div>
                  <div className="work-deliverables">{item.views}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
