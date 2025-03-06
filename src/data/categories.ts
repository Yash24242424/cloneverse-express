
export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "tech",
    name: "Tech & Gadgets",
    slug: "tech-gadgets",
    count: 125,
  },
  {
    id: "home",
    name: "Home",
    slug: "home",
    count: 84,
  },
  {
    id: "audio",
    name: "Audio",
    slug: "audio",
    count: 67,
  },
  {
    id: "wearables",
    name: "Wearables",
    slug: "wearables",
    count: 43,
  },
  {
    id: "outdoor",
    name: "Outdoor",
    slug: "outdoor",
    count: 56,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    slug: "lifestyle",
    count: 92,
  },
  {
    id: "travel",
    name: "Travel",
    slug: "travel",
    count: 38,
  },
  {
    id: "eco",
    name: "Eco-Friendly",
    slug: "eco-friendly",
    count: 29,
  },
];
