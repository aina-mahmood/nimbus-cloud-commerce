import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, Server, Database, Globe, Shield, BarChart3 } from "lucide-react";
import { products, categories, imageFor } from "@/lib/products";
import { ProductCard } from "@/components/nimbus/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "NimbusCart — Commerce in the cloud" }] }),
  component: Home,
});

function Home() {
  const trending = products.slice(0, 8);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl brand-gradient" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Cloud className="h-3 w-3" /> Built on AWS · Multi-AZ · Global edge
            </span>
            <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="brand-gradient-text">Commerce</span> in the cloud.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              A storefront engineered like a platform. Sub-second loads from 450+ edge POPs, resilient by design, beautifully curated.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/shop"><Button size="lg" className="brand-gradient text-white hover:opacity-90">Shop the catalog <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
              <Link to="/architecture"><Button size="lg" variant="outline">View architecture</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => {
            const sample = products.find((p) => p.category === c)!;
            return (
              <Link key={c} to="/shop" search={{ category: c, q: undefined, sort: undefined }} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
                <img src={imageFor(sample.keyword, 800, 1000, 2)} alt={c} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs opacity-80">Shop</p>
                  <p className="text-xl font-semibold">{c}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">This week</p>
            <h2 className="text-3xl font-semibold tracking-tight">Trending now</h2>
          </div>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* AWS strip */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Built on AWS</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Eight services. One resilient platform.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              { i: Server, l: "EC2 + ASG" },
              { i: Cloud, l: "Elastic Beanstalk" },
              { i: Database, l: "RDS PostgreSQL" },
              { i: Globe, l: "CloudFront + WAF" },
              { i: Shield, l: "IAM + Cognito" },
              { i: BarChart3, l: "Athena + QuickSight" },
            ].map(({ i: Icon, l }) => (
              <div key={l} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-aws/15 text-aws"><Icon className="h-4 w-4" /></span>
                <span className="text-sm font-medium">{l}</span>
              </div>
            ))}
          </div>
          <Link to="/architecture" className="mt-6 inline-flex text-sm text-muted-foreground hover:text-foreground">See the full architecture →</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { q: "Checkout in under a second from Sydney. Felt like a native app.", a: "— Priya N., Customer" },
            { q: "The rolling deploys mean we ship daily without anyone noticing.", a: "— Marco D., SRE" },
            { q: "Finally a storefront that's as polished as the products it sells.", a: "— Lena K., Buyer" },
          ].map((t) => (
            <figure key={t.a} className="rounded-2xl border border-border bg-card p-6">
              <blockquote className="text-base leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">{t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
