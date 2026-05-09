import { Link } from "@tanstack/react-router";
import { Cloud, ShoppingBag, Search, Sun, Moon, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

export function Header() {
  const lines = useCart();
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const { dark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg brand-gradient text-white">
            <Cloud className="h-4 w-4" />
          </span>
          <span className="text-base">NimbusCart</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/shop" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>Shop</Link>
          <Link to="/architecture" className="hover:text-foreground">Architecture</Link>
          <Link to="/admin" className="hover:text-foreground">Admin</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/shop" className="hidden text-muted-foreground hover:text-foreground sm:block" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/admin" className="hidden md:block">
            <Button variant="ghost" size="icon" aria-label="Admin">
              <ShieldCheck className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full brand-gradient px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
