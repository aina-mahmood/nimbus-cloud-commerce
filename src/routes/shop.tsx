import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/nimbus/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  category: fallback(z.enum(["Electronics", "Apparel", "Home", "Beauty"]).optional(), undefined),
  q: fallback(z.string().optional(), undefined),
  sort: fallback(z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(), undefined),
});

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop — NimbusCart" }] }),
  validateSearch: zodValidator(schema),
  component: Shop,
});

function Shop() {
  const { category, q, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const setSearch = (patch: Record<string, unknown>) =>
    navigate({ search: ((prev: Record<string, unknown>) => ({ ...prev, ...patch })) as never });

  const filtered = useMemo(() => {
    let r = products.slice();
    if (category) r = r.filter((p) => p.category === category);
    if (q) {
      const s = q.toLowerCase();
      r = r.filter((p) => p.name.toLowerCase().includes(s) || p.keyword.includes(s));
    }
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    else if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [category, q, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Catalog</p>
        <h1 className="text-4xl font-semibold tracking-tight">{category ?? "All products"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{filtered.length} items · free shipping over $100</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-y border-border py-4">
        <div className="flex flex-wrap gap-2">
          <Button variant={!category ? "default" : "outline"} size="sm" onClick={() => setSearch({ category: undefined })}>All</Button>
          {categories.map((c) => (
            <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setSearch({ category: c })}>{c}</Button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Input
            placeholder="Search..."
            defaultValue={q ?? ""}
            onChange={(e) => setSearch({ q: e.target.value || undefined })}
            className="h-9 w-44"
          />
          <select
            value={sort ?? "featured"}
            onChange={(e) => setSearch({ sort: e.target.value === "featured" ? undefined : (e.target.value as never) })}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {filtered.length === 0 && <p className="py-20 text-center text-muted-foreground">No products match those filters.</p>}
    </div>
  );
}
