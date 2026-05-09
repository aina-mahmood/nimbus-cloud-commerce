import { Link } from "@tanstack/react-router";
import { Cloud } from "lucide-react";

const shop = [
  ["Electronics", "Electronics"],
  ["Apparel", "Apparel"],
  ["Home", "Home"],
  ["Beauty", "Beauty"],
] as const;

const company: [string, string][] = [
  ["About", "/about"],
  ["Careers", "/careers"],
  ["Press", "/press"],
  ["Blog", "/blog"],
];
const resources: [string, string][] = [
  ["Help Center", "/help"],
  ["Returns", "/returns"],
  ["Shipping", "/shipping"],
  ["Contact", "/contact"],
];
const legal: [string, string][] = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Cookies", "/cookies"],
  ["Accessibility", "/accessibility"],
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg brand-gradient text-white">
              <Cloud className="h-4 w-4" />
            </span>
            NimbusCart
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">Commerce in the cloud. Built for resilience, scale, and a delightful checkout.</p>
          <Link to="/architecture" className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:border-foreground/30 hover:text-foreground">
            <span className="h-2 w-2 rounded-full bg-aws" />
            Hosted on AWS
          </Link>
        </div>
        <FooterCol title="Shop">
          {shop.map(([label, cat]) => (
            <Link key={cat} to="/shop" search={{ category: cat, q: undefined, sort: undefined }} className="hover:text-foreground">{label}</Link>
          ))}
        </FooterCol>
        <FooterCol title="Company">
          {company.map(([l, h]) => <Link key={h} to={h} className="hover:text-foreground">{l}</Link>)}
        </FooterCol>
        <FooterCol title="Resources">
          {resources.map(([l, h]) => <Link key={h} to={h} className="hover:text-foreground">{l}</Link>)}
        </FooterCol>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <p>© {new Date().getFullYear()} NimbusCart. A university Cloud Computing assignment.</p>
          <div className="flex flex-wrap gap-4">
            {legal.map(([l, h]) => <Link key={h} to={h} className="hover:text-foreground">{l}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
