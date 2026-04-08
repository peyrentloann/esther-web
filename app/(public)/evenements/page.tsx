import Link from "next/link";

const EVENTS = [
  {
    slug: "cercle-reiki-sons-sacres",
    category: "Soin de groupe",
    title: "Cercle de Reiki & Sons Sacrés",
    date: "12 Avril 2026 — 18h30",
    location: "Studio Namaste, Shefford",
    price: "45$",
    spots: 3,
    maxSpots: 12,
  },
  {
    slug: "retraite-eveil-sens-foret",
    category: "Retraite",
    title: "L'Éveil des Sens en Forêt",
    date: "2-4 Mai 2026",
    location: "Domaine des Pins, Estrie",
    price: "À partir de 480$",
    spots: 8,
    maxSpots: 10,
  },
  {
    slug: "herboristerie-cycle-feminin",
    category: "Collaboration",
    title: "Herboristerie & Cycle Féminin",
    date: "18 Mai 2026 — 14h00",
    location: "Atelier Flore, Montréal",
    price: "65$",
    spots: 10,
    maxSpots: 20,
  },
];

const FILTERS = ["Tous", "Soins de groupe", "Retraites", "Rencontres", "Collaborations"];

const TESTIMONIALS = [
  {
    quote: "La retraite de novembre a été un véritable tournant pour moi. Esther crée un espace de sécurité et de douceur incroyable. Je suis repartie avec une clarté mentale que je n'avais pas ressentie depuis des années.",
    name: "Marie-Eve L.",
    role: "Participante Retraite Automne 2025",
  },
  {
    quote: "Ses soins de groupe sont des moments de pure magie. On ressent l'énergie collective et la puissance du Reiki de manière si profonde.",
    name: "Sophie R.",
    role: "Cercle de Pleine Lune",
  },
];

export default function Evenements() {
  return (
    <>
      {/* ── Hero ── */}
      <header className="relative min-h-[500px] flex items-center justify-center px-6 md:px-12 py-20 bg-surface pt-40">
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-primary leading-[1.1] mb-6">
            Événements &amp; Retraites
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Soins de groupe, retraites bien-être, rencontres et collaborations pour nourrir
            l&apos;âme et le corps.
          </p>
        </div>
      </header>

      {/* ── Filtres ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                i === 0
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container hover:bg-surface-container-high text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── Événements à venir ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-8 mb-12">
          <h2 className="font-serif text-4xl text-primary whitespace-nowrap">À venir</h2>
          <div className="h-px flex-grow bg-outline-variant/30 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event) => {
            const spotsLeft = event.maxSpots - event.spots;
            const isAlmostFull = spotsLeft <= 3;

            return (
              <div
                key={event.slug}
                className="group bg-surface-container-low rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-500 flex flex-col"
              >
                {/* Image placeholder */}
                <div className="relative h-64 overflow-hidden rounded-t-xl bg-surface-container-high">
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  {isAlmostFull && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {spotsLeft} places restantes
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-serif text-2xl text-primary mb-4">{event.title}</h3>
                  <div className="space-y-3 mb-8 text-on-surface-variant">
                    <div className="flex items-center gap-3">
                      <span>📅</span>
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>📍</span>
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>💳</span>
                      <span className="text-sm font-semibold">{event.price}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={`/evenements/${event.slug}`}
                      className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all duration-300"
                    >
                      Voir les détails →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="bg-surface-container py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-surface p-10 rounded-2xl relative shadow-sm border border-outline-variant/10"
            >
              <span className="text-6xl text-tertiary-fixed-dim/50 absolute -top-6 left-6 font-serif leading-none">
                &ldquo;
              </span>
              <p className="font-serif text-xl md:text-2xl text-primary italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <cite className="not-italic block">
                <span className="font-bold text-primary">— {t.name}</span>
                <span className="text-on-surface-variant block text-sm">{t.role}</span>
              </cite>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Newsletter ── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 my-24">
        <div className="bg-primary rounded-[40px] py-16 px-8 md:px-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-on-primary mb-4">
            Ne manque aucun événement
          </h2>
          <p className="text-on-primary/70 text-lg mb-10 max-w-xl mx-auto">
            Reçois les prochaines dates directement dans ta boîte courriel.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ton@email.com"
              className="flex-1 bg-white/10 text-on-primary placeholder:text-on-primary/40 border border-on-primary/20 rounded-full px-6 py-3 focus:outline-none focus:border-on-primary/50 transition"
            />
            <button
              type="submit"
              className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform whitespace-nowrap"
            >
              S&apos;inscrire →
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
