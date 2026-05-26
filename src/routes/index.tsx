import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowRight, Sparkles, ShieldCheck, Award, MessageCircle, GitCompareArrows } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { QuoteButton } from "@/components/QuoteButton";
import { useCartSync } from "@/hooks/useCartSync";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { TREATMENTS, productsForTreatment } from "@/lib/treatments";
import heroImage from "@/assets/hero.jpg";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import imgRejuvenecimiento from "@/assets/treatment-rejuvenecimiento.jpg";
import imgReduccion from "@/assets/treatment-reduccion.jpg";
import imgDepilacion from "@/assets/treatment-depilacion.jpg";
import imgFlacidez from "@/assets/treatment-flacidez.jpg";
import imgTonificacion from "@/assets/treatment-tonificacion.jpg";
import imgManchas from "@/assets/treatment-manchas.jpg";

const TREATMENT_IMAGES: Record<string, string> = {
  "rejuvenecimiento-facial": imgRejuvenecimiento,
  "reduccion-de-grasa": imgReduccion,
  depilacion: imgDepilacion,
  "flacidez-y-lifting": imgFlacidez,
  "tonificacion-muscular": imgTonificacion,
  "manchas-y-acne": imgManchas,
};

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useCartSync();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 100, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const products = data ?? [];
  const featured = products.slice(0, 8);

  const treatmentImage = (slug: string) => TREATMENT_IMAGES[slug];
  const treatmentCount = (slug: string) => productsForTreatment(products, slug).length;

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
                Marketplace médico-estético
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Elige por
              <br />
              <span className="italic text-accent">tratamiento,</span>
              <br />
              no por marca.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Encuentra el equipo ideal para tu clínica según el resultado clínico que quieres ofrecer.
              Compara hasta 3 equipos y cotiza por WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                search={{ sort: "newest" }}
                className="inline-flex items-center gap-3 h-12 px-7 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs uppercase tracking-[0.25em] font-medium"
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <QuoteButton variant="outline" size="lg" label="Solicitar cotización" />
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <video
                src={heroVideo.url}
                poster={heroImage}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Equipos de aparatología estética DermaTek"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background border border-border p-5 max-w-[200px] hidden lg:block">
              <p className="font-display text-4xl text-accent">{products.length || "40+"}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Equipos disponibles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos */}
      <section id="tratamientos" className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
              Explora por necesidad clínica
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-xl">
              ¿Qué tratamiento quieres ofrecer?
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Cada categoría incluye una guía clínica con criterios para elegir el equipo correcto para tu cartera.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TREATMENTS.map((t) => {
            const img = treatmentImage(t.slug);
            const count = treatmentCount(t.slug);
            return (
              <Link
                key={t.slug}
                to="/tratamiento/$slug"
                params={{ slug: t.slug }}
                className="group relative aspect-[5/6] overflow-hidden bg-primary"
              >
                {img && (
                  <img
                    src={img}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                    {count} {count === 1 ? "equipo" : "equipos"}
                  </p>
                  <h3 className="font-display text-2xl leading-tight mb-2">{t.name}</h3>
                  <p className="text-xs text-primary-foreground/70 leading-relaxed mb-4 line-clamp-2">
                    {t.short}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                    Ver guía + equipos <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-card border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">Cómo funciona</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-12">
            Marketplace pensado para clínicas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", icon: Sparkles, title: "Explora por tratamiento", desc: "Encuentra el equipo según el resultado clínico que quieres vender." },
              { n: "02", icon: GitCompareArrows, title: "Compara hasta 3 equipos", desc: "Specs lado a lado: precio, opciones, marca y disponibilidad." },
              { n: "03", icon: MessageCircle, title: "Cotiza por WhatsApp", desc: "Envía tu selección y recibe propuesta formal con condiciones." },
            ].map((s) => (
              <div key={s.n} className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl text-accent">{s.n}</span>
                  <s.icon className="w-5 h-5 text-foreground/40" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section id="tecnologia" className="border-b border-border/60 bg-background">
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

      {/* Destacados */}
      <section id="catalogo" className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
              Destacados
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-xl">
              Equipos seleccionados
            </h2>
          </div>
          <Link
            to="/catalogo"
            search={{ sort: "newest" }}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            Ver catálogo completo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border">
            <p className="font-display text-2xl mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">
              Crea un producto contándole al chat qué quieres ofrecer.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14">
            {featured.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
