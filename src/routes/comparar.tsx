import { createFileRoute, Link } from "@tanstack/react-router";
import { X, Check, Minus } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { QuoteButton } from "@/components/QuoteButton";
import { useCompareStore } from "@/stores/compareStore";
import { useCartSync } from "@/hooks/useCartSync";
import { formatPrice } from "@/lib/shopify";

export const Route = createFileRoute("/comparar")({
  head: () => ({
    meta: [
      { title: "Comparar equipos — DermaTek" },
      { name: "description", content: "Compara especificaciones técnicas y precios de equipos de aparatología estética lado a lado." },
      { property: "og:title", content: "Comparar equipos — DermaTek" },
    ],
  }),
  component: CompararPage,
});

function CompararPage() {
  useCartSync();
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);

  // Construir filas de specs uniendo opciones de todos los productos
  const allOptionNames = Array.from(
    new Set(items.flatMap((p) => (p.node.options ?? []).map((o) => o.name))),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">Comparador</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-3">
          Compara equipos lado a lado
        </h1>
        <p className="text-sm text-muted-foreground mb-12 max-w-xl">
          Hasta 3 equipos. Revisa especificaciones, precio y solicita cotización conjunta por WhatsApp.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border">
            <p className="font-display text-2xl mb-2">Sin equipos en el comparador</p>
            <p className="text-sm text-muted-foreground mb-6">
              Añade equipos desde el catálogo usando el botón “Comparar”.
            </p>
            <Link
              to="/catalogo"
              search={{ sort: "newest", cat: undefined, q: undefined }}
              className="inline-flex items-center h-11 px-6 border border-foreground/20 hover:border-foreground text-xs uppercase tracking-[0.25em]"
            >
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto -mx-6 lg:mx-0">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-40 text-left p-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground align-bottom"></th>
                    {items.map((p) => {
                      const img = p.node.images.edges[0]?.node;
                      return (
                        <th key={p.node.id} className="p-4 text-left align-bottom border-l border-border">
                          <div className="aspect-[4/5] bg-muted overflow-hidden mb-4 relative">
                            {img && <img src={img.url} alt="" className="w-full h-full object-cover" />}
                            <button
                              onClick={() => remove(p.node.id)}
                              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              aria-label="Quitar"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {p.node.productType && (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
                              {p.node.productType}
                            </p>
                          )}
                          <Link
                            to="/product/$handle"
                            params={{ handle: p.node.handle }}
                            className="font-display text-lg leading-tight hover:text-accent block"
                          >
                            {p.node.title}
                          </Link>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <Row label="Precio">
                    {items.map((p) => {
                      const v = p.node.priceRange.minVariantPrice;
                      const has = parseFloat(v.amount) > 0;
                      return (
                        <td key={p.node.id} className="p-4 border-l border-border align-top">
                          <span className="font-display text-lg">
                            {has ? formatPrice(v.amount, v.currencyCode) : "Cotizar"}
                          </span>
                        </td>
                      );
                    })}
                  </Row>
                  <Row label="Marca">
                    {items.map((p) => (
                      <td key={p.node.id} className="p-4 border-l border-border align-top">
                        {p.node.vendor || <Minus className="w-3 h-3 text-muted-foreground" />}
                      </td>
                    ))}
                  </Row>
                  <Row label="Categoría">
                    {items.map((p) => (
                      <td key={p.node.id} className="p-4 border-l border-border align-top">
                        {p.node.productType || <Minus className="w-3 h-3 text-muted-foreground" />}
                      </td>
                    ))}
                  </Row>
                  <Row label="Disponible">
                    {items.map((p) => {
                      const ok = p.node.variants.edges[0]?.node.availableForSale;
                      return (
                        <td key={p.node.id} className="p-4 border-l border-border align-top">
                          {ok ? <Check className="w-4 h-4 text-accent" /> : <Minus className="w-3 h-3 text-muted-foreground" />}
                        </td>
                      );
                    })}
                  </Row>
                  {allOptionNames.map((opt) => (
                    <Row key={opt} label={opt}>
                      {items.map((p) => {
                        const o = p.node.options?.find((x) => x.name === opt);
                        return (
                          <td key={p.node.id} className="p-4 border-l border-border align-top text-foreground/80">
                            {o ? o.values.join(", ") : <Minus className="w-3 h-3 text-muted-foreground" />}
                          </td>
                        );
                      })}
                    </Row>
                  ))}
                  <Row label="Descripción">
                    {items.map((p) => (
                      <td key={p.node.id} className="p-4 border-l border-border align-top text-foreground/70 leading-relaxed">
                        <span className="line-clamp-6 block">{p.node.description || "—"}</span>
                      </td>
                    ))}
                  </Row>
                </tbody>
              </table>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-card border border-border">
              <div>
                <p className="font-display text-xl mb-1">¿Listo para decidir?</p>
                <p className="text-sm text-muted-foreground">
                  Solicita cotización formal de los {items.length} equipos seleccionados.
                </p>
              </div>
              <QuoteButton products={items} variant="primary" size="lg" label="Cotizar selección" />
            </div>
          </>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="border-t border-border">
      <td className="p-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground align-top">
        {label}
      </td>
      {children}
    </tr>
  );
}