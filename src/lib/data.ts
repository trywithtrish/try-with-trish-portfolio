export type Category = "Hotels" | "Food" | "Travel";
export type ContentFormat = "Reel" | "Carousel" | "Story";

export type Collab = {
  id: number;
  brand: string;
  title: string;
  cat: Category;
  type: ContentFormat;
  color: string;
  stripe: string;
  deliverables: string[];
  views?: string;
  slides?: number;
  storyHandle?: string;
  description?: string;
};

/**
 * Featured collaborations — shown in the horizontal scroll above-the-fold.
 * These are Trisha's three real, recent luxury collaborations.
 */
export const FEATURED: Collab[] = [
  {
    id: 1,
    brand: "Ritz-Carlton Half Moon Bay",
    title: "A room with a view",
    cat: "Hotels",
    type: "Reel",
    color: "#C4A882",
    stripe: "rgba(180,155,120,0.3)",
    deliverables: ["Reel"],
    views: "Reel",
    description:
      "Two-day room experience along the Northern California coast, captured as an editorial Instagram Reel.",
  },
  {
    id: 2,
    brand: "Ritz-Carlton Half Moon Bay",
    title: "Coastal stay carousel",
    cat: "Hotels",
    type: "Carousel",
    color: "#9BAE9A",
    stripe: "rgba(120,150,118,0.28)",
    deliverables: ["Carousel"],
    slides: 6,
    views: "Carousel",
    description:
      "A swipe-through Instagram post highlighting the room, coastline, dining moments, and property details from the stay.",
  },
  {
    id: 3,
    brand: "Ritz-Carlton Half Moon Bay",
    title: "Brand story repost",
    cat: "Hotels",
    type: "Story",
    color: "#A8B8C8",
    stripe: "rgba(140,160,178,0.3)",
    deliverables: ["Story Repost"],
    storyHandle: "ritzcarltonhmb",
    views: "Story repost",
    description:
      "Live story screenshots reshared by the official property account, showing the brand amplifying Trisha's coverage.",
  },
];

/**
 * The full work grid — each entry represents one portfolio asset.
 * Add more items here as new reels, carousels, and story reposts are produced.
 */
export const WORK: Collab[] = [
  ...FEATURED,
  {
    id: 4,
    brand: "Ritz-Carlton San Francisco",
    title: "35th anniversary afternoon tea",
    cat: "Food",
    type: "Reel",
    color: "#D9967A",
    stripe: "rgba(192,122,90,0.28)",
    deliverables: ["Reel"],
    views: "Reel",
    description:
      "Coral-themed afternoon tea celebrating the property's 35th anniversary, focused on pastry, tradition, and editorial dining detail.",
  },
  {
    id: 5,
    brand: "Bustronome London",
    title: "Fine dining above London",
    cat: "Travel",
    type: "Reel",
    color: "#A8B8C8",
    stripe: "rgba(140,160,178,0.3)",
    deliverables: ["Reel"],
    views: "Reel",
    description:
      "A panoramic glass-roof double-decker bus serves a multi-course tasting menu while touring London's landmarks.",
  },
];

export const COLORS: Record<Category, string> = {
  Hotels: "#C4A882",
  Food: "#9BAE9A",
  Travel: "#A8B8C8",
};

export const FILTERS: ("All" | Category)[] = ["All", "Hotels", "Food", "Travel"];
export const FORMAT_FILTERS: ("All" | ContentFormat)[] = [
  "All",
  "Reel",
  "Carousel",
  "Story",
];
