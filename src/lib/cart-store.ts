import { useSyncExternalStore } from "react";
import type { Product } from "./products";

export interface CartLine { product: Product; qty: number; }

let lines: CartLine[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const cartStore = {
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
  get() { return lines; },
  add(product: Product, qty = 1) {
    const i = lines.findIndex((l) => l.product.id === product.id);
    if (i >= 0) lines = lines.map((l, idx) => idx === i ? { ...l, qty: l.qty + qty } : l);
    else lines = [...lines, { product, qty }];
    emit();
  },
  setQty(id: string, qty: number) {
    lines = qty <= 0 ? lines.filter((l) => l.product.id !== id) : lines.map((l) => l.product.id === id ? { ...l, qty } : l);
    emit();
  },
  remove(id: string) { lines = lines.filter((l) => l.product.id !== id); emit(); },
  clear() { lines = []; emit(); },
};

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.get, () => lines);
}

export const cartTotals = (l: CartLine[]) => {
  const subtotal = l.reduce((s, x) => s + x.product.price * x.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  return { subtotal: +subtotal.toFixed(2), shipping, tax, total };
};
