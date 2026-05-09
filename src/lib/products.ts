export type Category = "Electronics" | "Apparel" | "Home" | "Beauty";

export interface Product {
  id: string;
  name: string;
  keyword: string;
  category: Category;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  specs: { label: string; value: string }[];
  badge?: string;
}

export const imageFor = (keyword: string, w = 600, h = 600, sig = 1) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keyword)},product?lock=${sig}`;

const mk = (id: string, name: string, keyword: string, category: Category, price: number, rating: number, reviews: number, description: string, badge?: string): Product => ({
  id, name, keyword, category, price, rating, reviews, description, badge,
  specs: [
    { label: "SKU", value: `NC-${id.toUpperCase()}` },
    { label: "Ships in", value: "1–2 business days" },
    { label: "Warranty", value: "2 years limited" },
    { label: "Returns", value: "30 days, free" },
  ],
});

export const products: Product[] = [
  mk("p01", "Nimbus Pro Wireless Headphones", "headphones", "Electronics", 249, 4.8, 1284, "Studio-grade ANC headphones with 40h battery and adaptive EQ.", "Bestseller"),
  mk("p02", "AeroBook 14 Laptop", "laptop", "Electronics", 1399, 4.7, 642, "14-inch OLED ultrabook, 16GB RAM, 1TB SSD, 18-hour battery."),
  mk("p03", "StratoCam Mirrorless 24MP", "camera", "Electronics", 1099, 4.6, 318, "24MP full-frame mirrorless with 4K60 video and dual SD."),
  mk("p04", "PulseFit Smartwatch 3", "smartwatch", "Electronics", 329, 4.5, 902, "ECG, SpO2, GPS, 7-day battery, sapphire crystal.", "New"),
  mk("p05", "OrbitPods Earbuds", "earbuds", "Electronics", 179, 4.6, 2210, "ANC earbuds with spatial audio and wireless charging."),
  mk("p06", "MeshLink Wi-Fi 6E Router", "router", "Electronics", 219, 4.4, 411, "Tri-band Wi-Fi 6E mesh, 6,000 sq ft coverage."),
  mk("p07", "GlideKey Mechanical Keyboard", "keyboard", "Electronics", 159, 4.7, 588, "Hot-swappable, low-latency, RGB per key."),
  mk("p08", "VortexVR Headset", "vr-headset", "Electronics", 499, 4.5, 277, "4K per eye, inside-out tracking, standalone or PC link."),
  mk("p09", "Cirrus Hooded Sweatshirt", "hoodie", "Apparel", 89, 4.7, 1530, "Heavyweight organic cotton fleece, brushed inside."),
  mk("p10", "Stratus Slim Tee", "t-shirt", "Apparel", 32, 4.5, 980, "Pima cotton tee with a tailored slim fit."),
  mk("p11", "Nimbus Runner Sneakers", "sneakers", "Apparel", 139, 4.6, 1860, "Carbon-plate runners with responsive foam.", "Trending"),
  mk("p12", "AltoCloud Denim Jacket", "denim-jacket", "Apparel", 149, 4.4, 412, "Selvedge denim trucker, garment-washed."),
  mk("p13", "ZephyrFit Joggers", "joggers", "Apparel", 79, 4.5, 720, "Four-way stretch tapered joggers."),
  mk("p14", "Cumulus Crew Socks (5-Pack)", "socks", "Apparel", 28, 4.8, 2100, "Combed cotton crew socks with arch support."),
  mk("p15", "Halo Smart Lamp", "lamp", "Home", 129, 4.6, 540, "16M color smart lamp with circadian scenes."),
  mk("p16", "BrewCloud Espresso Machine", "espresso-machine", "Home", 699, 4.7, 388, "Dual boiler espresso with PID temp control.", "Premium"),
  mk("p17", "VeloChef Blender 1500W", "blender", "Home", 199, 4.5, 612, "1500W variable-speed blender with vacuum lid."),
  mk("p18", "AuraDiff Diffuser", "diffuser", "Home", 59, 4.4, 290, "Ultrasonic essential oil diffuser, 12-hour run."),
  mk("p19", "GlideRug Throw", "rug", "Home", 189, 4.5, 178, "Hand-tufted wool throw rug, 4×6 ft."),
  mk("p20", "CalmGlow Candle Set", "candle", "Home", 49, 4.7, 820, "Trio of soy candles: cedar, fig, neroli."),
  mk("p21", "DewLuxe Hydrating Serum", "serum", "Beauty", 68, 4.8, 1340, "Hyaluronic + niacinamide daily serum."),
  mk("p22", "LuminaBalm Lip Tint", "lipstick", "Beauty", 24, 4.6, 980, "Buildable tint with squalane and shea."),
  mk("p23", "SilkScape Hairbrush", "hairbrush", "Beauty", 39, 4.5, 410, "Boar-bristle paddle brush for shine."),
  mk("p24", "NimbusGlow Face Cream", "face-cream", "Beauty", 78, 4.7, 720, "Peptide-rich night cream for plump skin."),
  mk("p25", "SunVeil SPF 50", "sunscreen", "Beauty", 34, 4.8, 1620, "Lightweight broad-spectrum mineral SPF 50.", "Editor's Pick"),
];

export const categories: Category[] = ["Electronics", "Apparel", "Home", "Beauty"];

export const getProduct = (id: string) => products.find((p) => p.id === id);
