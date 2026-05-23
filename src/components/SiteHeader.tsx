import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-tight">
            Derma<span className="text-accent">Tek</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/" hash="catalogo" className="hover:text-foreground transition-colors">
            Catálogo
          </Link>
          <a href="#tecnologia" className="hover:text-foreground transition-colors">
            Tecnología
          </a>
          <a href="#contacto" className="hover:text-foreground transition-colors">
            Contacto
          </a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}