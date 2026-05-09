import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdmin, authStore } from "@/lib/auth-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — NimbusCart" }] }),
  component: Admin,
});

function Admin() {
  const isAdmin = useAdmin();
  return isAdmin ? <Dashboard /> : <Login />;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <h1 className="text-2xl font-semibold">Admin sign-in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Demo: <code>admin@nimbus.io</code> / <code>demo</code></p>
      <form className="mt-6 grid gap-4" onSubmit={(e) => { e.preventDefault(); if (!authStore.login(email, password)) setErr("Invalid credentials"); }}>
        <div className="grid gap-1.5"><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="grid gap-1.5"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        {err && <p className="text-xs text-destructive">{err}</p>}
        <Button className="brand-gradient text-white">Sign in</Button>
      </form>
    </div>
  );
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const revenueData = days.map((d, i) => ({ day: d, revenue: 4200 + Math.round(Math.sin(i) * 1200 + i * 700) }));
const topData = products.slice(0, 6).map((p) => ({ name: p.name.split(" ")[0], sold: 220 - p.id.charCodeAt(2) * 2 }));
const catMix = ["Electronics", "Apparel", "Home", "Beauty"].map((c, i) => ({ name: c, value: [42, 26, 19, 13][i] }));
const COLORS = ["oklch(0.51 0.22 280)", "oklch(0.55 0.25 305)", "oklch(0.72 0.18 55)", "oklch(0.65 0.18 200)"];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold">Sales overview</h1>
        </div>
        <Button variant="outline" onClick={() => authStore.logout()}>Sign out</Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { l: "Revenue (7d)", v: "$48,210", d: "+12.4%" },
          { l: "Orders", v: "1,284", d: "+8.1%" },
          { l: "Avg order value", v: "$37.55", d: "+3.2%" },
          { l: "Conversion", v: "3.8%", d: "+0.4%" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-2 text-2xl font-semibold">{k.v}</p>
            <p className="text-xs text-emerald-500">{k.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 font-semibold">Daily revenue</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.51 0.22 280)" stopOpacity={0.5} /><stop offset="100%" stopColor="oklch(0.51 0.22 280)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0 / 30%)" />
              <XAxis dataKey="day" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} />
              <Tooltip />
              <Area dataKey="revenue" stroke="oklch(0.51 0.22 280)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-semibold">Category mix</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={catMix} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {catMix.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-semibold">Top products</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0 / 30%)" />
              <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} />
              <Tooltip />
              <Bar dataKey="sold" fill="oklch(0.55 0.25 305)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-semibold">Recent orders</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="py-2">Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {[
                ["#10421", "Priya N.", "$248.00", "Shipped"],
                ["#10420", "Marco D.", "$129.00", "Processing"],
                ["#10419", "Lena K.", "$78.50", "Delivered"],
                ["#10418", "Sam O.", "$1,399.00", "Shipped"],
                ["#10417", "Rita V.", "$59.00", "Delivered"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-border"><td className="py-2 font-medium">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{r[3]}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
