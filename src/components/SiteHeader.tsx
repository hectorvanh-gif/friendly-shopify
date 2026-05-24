import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";

export function SiteHeader() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/catalogo", search: { q: q.trim() || undefined, cat: undefined, sort: "newest" } });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-tight">
            Derma<span className="text-accent">Tek</span>
          </span>
        </Link>
        <form onSubmit={submit} className="hidden md:flex flex-1 max-w-xl relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar equipos, tecnologías, marcas…"
            className="w-full h-10 pl-11 pr-4 bg-muted/50 border border-border/60 rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:bg-background transition-colors"
          />
        </form>
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/catalogo" className="hover:text-foreground transition-colors">
            Catálogo
          </Link>
          <a href="#tecnologia" className="hover:text-foreground transition-colors">
            Tecnología
          </a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}