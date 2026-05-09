import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import confetti from "canvas-confetti";
import { Check, ChevronRight } from "lucide-react";
import { useCart, cartStore, cartTotals } from "@/lib/cart-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NimbusCart" }] }),
  component: Checkout,
});

const shipSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(4, "Required"),
  city: z.string().min(2, "Required"),
  zip: z.string().min(3, "Required"),
});
const paySchema = z.object({
  card: z.string().min(13, "Card number required"),
  exp: z.string().regex(/^\d{2}\/\d{2}$/, "MM/YY"),
  cvc: z.string().min(3, "3 digits").max(4),
});
type Ship = z.infer<typeof shipSchema>;
type Pay = z.infer<typeof paySchema>;

function Checkout() {
  const lines = useCart();
  const t = cartTotals(lines);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [ship, setShip] = useState<Ship | null>(null);
  const [pay, setPay] = useState<Pay | null>(null);
  const navigate = useNavigate();

  const shipForm = useForm<Ship>({ resolver: zodResolver(shipSchema) });
  const payForm = useForm<Pay>({ resolver: zodResolver(paySchema) });

  if (lines.length === 0 && step < 3) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold">Nothing to checkout</h1>
        <Button className="mt-6 brand-gradient text-white" onClick={() => navigate({ to: "/shop" })}>Browse shop</Button>
      </div>
    );
  }

  const placeOrder = () => {
    confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
    cartStore.clear();
    setStep(3);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>

      {step < 3 && (
        <ol className="mt-6 flex items-center gap-3 text-sm">
          {["Shipping", "Payment", "Review"].map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${i <= step ? "brand-gradient text-white" : "bg-muted text-muted-foreground"}`}>{i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>
              <span className={i === step ? "font-semibold" : "text-muted-foreground"}>{label}</span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </li>
          ))}
        </ol>
      )}

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        {step === 0 && (
          <form className="grid gap-4" onSubmit={shipForm.handleSubmit((d) => { setShip(d); setStep(1); })}>
            <Field label="Full name" error={shipForm.formState.errors.name?.message}><Input {...shipForm.register("name")} /></Field>
            <Field label="Email" error={shipForm.formState.errors.email?.message}><Input type="email" {...shipForm.register("email")} /></Field>
            <Field label="Address" error={shipForm.formState.errors.address?.message}><Input {...shipForm.register("address")} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City" error={shipForm.formState.errors.city?.message}><Input {...shipForm.register("city")} /></Field>
              <Field label="ZIP" error={shipForm.formState.errors.zip?.message}><Input {...shipForm.register("zip")} /></Field>
            </div>
            <Button className="brand-gradient text-white" size="lg">Continue to payment</Button>
          </form>
        )}
        {step === 1 && (
          <form className="grid gap-4" onSubmit={payForm.handleSubmit((d) => { setPay(d); setStep(2); })}>
            <Field label="Card number" error={payForm.formState.errors.card?.message}><Input placeholder="4242 4242 4242 4242" {...payForm.register("card")} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expires" error={payForm.formState.errors.exp?.message}><Input placeholder="MM/YY" {...payForm.register("exp")} /></Field>
              <Field label="CVC" error={payForm.formState.errors.cvc?.message}><Input placeholder="123" {...payForm.register("cvc")} /></Field>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1 brand-gradient text-white" size="lg">Review order</Button>
            </div>
          </form>
        )}
        {step === 2 && ship && pay && (
          <div className="grid gap-4 text-sm">
            <Section title="Shipping to">{ship.name} · {ship.address}, {ship.city} {ship.zip} · {ship.email}</Section>
            <Section title="Paying with">•••• •••• •••• {pay.card.slice(-4)}</Section>
            <div className="rounded-xl border border-border p-4">
              <p className="font-semibold">{lines.reduce((s, l) => s + l.qty, 0)} items · ${t.total.toFixed(2)}</p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 brand-gradient text-white" size="lg" onClick={placeOrder}>Place order</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="py-12 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full brand-gradient text-white"><Check className="h-7 w-7" /></span>
            <h2 className="mt-5 text-2xl font-semibold">Order placed</h2>
            <p className="mt-2 text-sm text-muted-foreground">A confirmation is on its way to your inbox.</p>
            <Button className="mt-6 brand-gradient text-white" onClick={() => navigate({ to: "/" })}>Back to home</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="grid gap-1.5">
    <Label>{label}</Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border p-4"><p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p><p className="mt-1">{children}</p></div>
);
