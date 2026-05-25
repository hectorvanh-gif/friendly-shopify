import { Link } from "@tanstack/react-router";
import { X, GitCompareArrows } from "lucide-react";
import { useCompareStore, MAX_COMPARE } from "@/stores/compareStore";

export function CompareBar() {
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
      <div className="bg-primary text-primary-foreground shadow-2xl rounded-md border border-primary/20 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 pr-3 border-r border-primary-foreground/20">
          <GitCompareArrows className="w-4 h-4 text-accent" />
          <span className="text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
            Comparar <span className="text-accent">{items.length}</span>/{MAX_COMPARE}
          </span>
        </div>
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {items.map((p) => {
            const img = p.node.images.edges[0]?.node;
            return (
              <div
                key={p.node.id}
                className="flex items-center gap-2 bg-primary-foreground/10 pl-1 pr-2 py-1 rounded-sm flex-shrink-0"
              >
                <div className="w-8 h-8 bg-background overflow-hidden rounded-sm flex-shrink-0">
                  {img && <img src={img.url} alt="" className="w-full h-full object-cover" />}
                </div>
                <span className="text-xs max-w-[110px] truncate">{p.node.title}</span>
                <button
                  onClick={() => remove(p.node.id)}
                  className="text-primary-foreground/60 hover:text-accent transition-colors"
                  aria-label="Quitar"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={clear}
          className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60 hover:text-primary-foreground hidden sm:block"
        >
          Limpiar
        </button>
        <Link
          to="/comparar"
          className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors whitespace-nowrap ${items.length < 2 ? "opacity-50 pointer-events-none" : ""}`}
        >
          Comparar →
        </Link>
      </div>
    </div>
  );
}