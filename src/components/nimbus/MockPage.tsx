import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function MockPage({ title, kicker, paragraphs }: { title: string; kicker: string; paragraphs: [string, string] }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 blur-3xl">
        <div className="absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full brand-gradient" />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to NimbusCart</Link>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-aws" /> {kicker} · Coming soon
        </div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl"><span className="brand-gradient-text">{title}</span></h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{paragraphs[0]}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{paragraphs[1]}</p>
      </div>
    </div>
  );
}
