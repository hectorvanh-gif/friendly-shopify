import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowRight, Sparkles, ShieldCheck, Award } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { useCartSync } from "@/hooks/useCartSync";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useCartSync();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 24, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const products = data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/30 rounded-full">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
                Tecnología médico-estética
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Aparatología
              <br />
              <span className="italic text-accent">premium</span> para
              <br />
              profesionales.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Equipos de alta gama —láser, HIFU, hidrafacial, EMSzero— al servicio de tu clínica.
              Resultados clínicos comprobados.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-3 h-12 px-7 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs uppercase tracking-[0.25em] font-medium"
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center h-12 px-7 border border-foreground/20 hover:border-foreground transition-colors text-xs uppercase tracking-[0.25em] font-medium"
              >
                Asesoría
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={heroImage}
                alt="Equipo de aparatología estética DermaTek"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background border border-border p-5 max-w-[200px] hidden lg:block">
              <p className="font-display text-4xl text-accent">40+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Equipos disponibles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section id="tecnologia" className="border-y border-border/60 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid md:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, title: "Uso médico-estético", desc: "Equipos certificados de grado profesional." },
            { icon: Award, title: "Marcas reconocidas", desc: "Tecnología validada por clínicas líderes." },
            { icon: Sparkles, title: "Asesoría especializada", desc: "Te acompañamos en la selección ideal." },
          ].map((f) => (
            <div key={f.title} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg leading-tight mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
              Colección · {products.length} equipos
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-xl">
              Nuestro catálogo
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Aparatología estética profesional seleccionada para resultados clínicos y experiencia del paciente.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border">
            <p className="font-display text-2xl mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">
              Crea un producto contándole al chat qué quieres ofrecer.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
