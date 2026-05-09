import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import { useCart, cartStore, cartTotals } from "@/lib/cart-store";
import { imageFor } from "@/lib/products";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — NimbusCart" }] }),
  component: Cart,
});

function Cart() {
  const lines = useCart();
  const t = cartTotals(lines);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Find something you love.</p>
        <Link to="/shop" className="mt-6 inline-block"><Button className="brand-gradient text-white">Browse the shop</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-4 py-5">
              <Link to="/product/$id" params={{ id: product.id }} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <img src={imageFor(product.keyword, 200, 200, 1)} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
                    <Link to="/product/$id" params={{ id: product.id }} className="font-medium hover:underline">{product.name}</Link>
                  </div>
                  <button onClick={() => cartStore.remove(product.id)} aria-label="Remove" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <Button variant="ghost" size="icon" onClick={() => cartStore.setQty(product.id, qty - 1)}><Minus className="h-4 w-4" /></Button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <Button variant="ghost" size="icon" onClick={() => cartStore.setQty(product.id, qty + 1)}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <span className="font-semibold">${(product.price * qty).toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row k="Subtotal" v={`$${t.subtotal.toFixed(2)}`} />
            <Row k="Shipping" v={t.shipping === 0 ? "Free" : `$${t.shipping.toFixed(2)}`} />
            <Row k="Tax" v={`$${t.tax.toFixed(2)}`} />
          </dl>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span><span>${t.total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="mt-6 block">
            <Button className="w-full brand-gradient text-white hover:opacity-90" size="lg">Checkout</Button>
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
);
