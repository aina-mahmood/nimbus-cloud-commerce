import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Plus, Minus, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { getProduct, imageFor, products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/nimbus/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cartStore } from "@/lib/cart-store";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.product.name} — NimbusCart` : "NimbusCart" }] }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">← Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const images = [
    imageFor(product.keyword, 900, 900, 1),
    imageFor(product.keyword, 900, 900, 7),
    imageFor(product.keyword, 900, 900, 13),
  ];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-muted">
            <img src={images[active]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {images.map((src, i) => (
              <button key={i} onClick={() => setActive(i)} className={`aspect-square overflow-hidden rounded-xl bg-muted ring-2 ${active === i ? "ring-primary" : "ring-transparent"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-current text-amber-500" />
            {product.rating.toFixed(1)} · {product.reviews} reviews
          </div>
          <p className="mt-6 text-3xl font-semibold">${product.price}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" className="brand-gradient flex-1 text-white hover:opacity-90" onClick={() => { cartStore.add(product, qty); toast.success(`${product.name} added to cart`); }}>
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl border border-border p-3"><Truck className="h-4 w-4 text-primary" /> Free shipping over $100</div>
            <div className="flex items-center gap-2 rounded-xl border border-border p-3"><ShieldCheck className="h-4 w-4 text-primary" /> 30-day free returns</div>
          </div>

          <Tabs defaultValue="desc" className="mt-10">
            <TabsList>
              <TabsTrigger value="desc">Description</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="desc" className="prose prose-sm max-w-none pt-4 text-muted-foreground">
              <p>{product.description} Engineered with care, the {product.name.toLowerCase()} is designed to feel premium from the first unbox.</p>
            </TabsContent>
            <TabsContent value="specs" className="pt-4">
              <dl className="grid gap-2 text-sm">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-border py-2">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4 text-sm text-muted-foreground">
              <p>{product.reviews.toLocaleString()} verified reviews · average {product.rating.toFixed(1)}/5. Customers love the build quality and fast cloud-shipped delivery.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">You might also like</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
