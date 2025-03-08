export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  rating: number;
  image: string;
  badges: string[];
  category: string;
  featured?: boolean;
  isNew?: boolean;
  brand: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium TWS Earbuds",
    slug: "premium-tws-earbuds",
    description: "High-quality wireless earbuds with active noise cancellation and 36-hour battery life.",
    price: 9999,
    salePrice: 7999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3",
    badges: ["Limited Time Deal", "Best Seller"],
    category: "audio",
    featured: true,
    isNew: true,
    brand: "SoundLife"
  },
  {
    id: "2",
    name: "UltraBook Pro",
    slug: "ultrabook-pro",
    description: "Ultra-thin laptop with 14-inch 4K display, 32GB RAM, and 1TB SSD.",
    price: 89999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3",
    badges: ["Editor's Choice"],
    category: "tech",
    featured: true,
    brand: "TechPro"
  },
  {
    id: "3",
    name: "HomeGuard Security Camera",
    slug: "homeguard-security-camera",
    description: "Smart security camera with 4K resolution, night vision, and motion detection.",
    price: 14999,
    salePrice: 11999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?ixlib=rb-4.0.3",
    badges: ["Top Rated"],
    category: "home",
    brand: "SecurityPlus"
  },
  {
    id: "4",
    name: "Quantum Smart Watch",
    slug: "quantum-smart-watch",
    description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
    price: 21999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3",
    badges: ["New Release"],
    category: "wearables",
    isNew: true,
    brand: "TechFit"
  },
  {
    id: "5",
    name: "EcoFlask Insulated Bottle",
    slug: "ecoflask-insulated-bottle",
    description: "Vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 2999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602083973990-c933e90f7469?ixlib=rb-4.0.3",
    badges: ["Eco-Friendly"],
    category: "lifestyle",
    brand: "GreenLife"
  },
  {
    id: "6",
    name: "LuxSmart LED Bulb Set",
    slug: "luxsmart-led-bulb-set",
    description: "Smart LED bulbs with voice control, millions of colors, and energy-saving features.",
    price: 5999,
    salePrice: 4499,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1592294419385-dd5e7c0ac69d?ixlib=rb-4.0.3",
    badges: ["Limited Time Deal"],
    category: "home",
    brand: "SmartHome"
  },
  {
    id: "7",
    name: "TrailBlazer Hiking Backpack",
    slug: "trailblazer-hiking-backpack",
    description: "Durable 45L hiking backpack with hydration system and multiple compartments.",
    price: 9999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3",
    badges: ["Best for Adventures"],
    category: "outdoor",
    brand: "OutdoorPlus"
  },
  {
    id: "8",
    name: "SkyView Telescope",
    slug: "skyview-telescope",
    description: "Advanced digital telescope with smartphone connectivity and star tracking.",
    price: 25999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1605726268825-95a88f749e5a?ixlib=rb-4.0.3",
    badges: ["Staff Pick"],
    category: "lifestyle",
    brand: "StarGazer"
  },
  {
    id: "9",
    name: "PowerCharge 10K",
    slug: "powercharge-10k",
    description: "10,000mAh power bank with fast charging and dual USB ports.",
    price: 3499,
    salePrice: 2999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1583863733615-3e279393e55d?ixlib=rb-4.0.3",
    badges: ["Travel Essential"],
    category: "tech",
    brand: "PowerMax"
  },
  {
    id: "10",
    name: "VoyageGrip Camera Stabilizer",
    slug: "voyagegrip-camera-stabilizer",
    description: "Professional 3-axis gimbal stabilizer for smartphones and compact cameras.",
    price: 8999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589019121253-226beb77e7e4?ixlib=rb-4.0.3",
    badges: ["Creator's Choice"],
    category: "tech",
    featured: true,
    brand: "CameraGear"
  },
  {
    id: "11",
    name: "SonicWave Sound System",
    slug: "sonicwave-sound-system",
    description: "Wireless home theater system with Dolby Atmos and voice control.",
    price: 44999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3",
    badges: ["Premium Quality"],
    category: "audio",
    brand: "SoundWave"
  },
  {
    id: "12",
    name: "ZenSleep Mattress",
    slug: "zensleep-mattress",
    description: "Memory foam mattress with cooling gel and pressure relief technology.",
    price: 67999,
    salePrice: 52999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1631157826904-df79fa419420?ixlib=rb-4.0.3",
    badges: ["Limited Time Deal", "Top Rated"],
    category: "home",
    brand: "DreamSleep"
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};
