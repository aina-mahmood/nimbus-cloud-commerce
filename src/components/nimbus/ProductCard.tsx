import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { imageFor } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/product/$id" params={{ id: product.id }} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <img
          src={imageFor(product.keyword, 600, 600, 1)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="mt-0.5 line-clamp-1 text-sm font-medium">{product.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-current text-amber-500" />
            {product.rating.toFixed(1)} <span>· {product.reviews}</span>
          </div>
        </div>
        <span className="shrink-0 text-sm font-semibold">${product.price}</span>
      </div>
    </Link>
  );
}
