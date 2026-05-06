import Link from "next/link";
import Image from "next/image";
import SwipeCarousel from "@/components/SwipeCarousel";

const GALLERY = [
  { src: "/esther/journal/journal-02.jpg", alt: "Journal hormonal sur table en bois avec thé et fleurs séchées" },
  { src: "/esther/journal/journal-03.jpg", alt: "Journal hormonal posé sur planche en bois avec lavande et eucalyptus" },
  { src: "/esther/journal/journal-04.jpg", alt: "Journal hormonal sur table avec thé et lavande" },
  { src: "/esther/journal/journal-05.jpg", alt: "Journal hormonal flat lay sur tissu écru" },
  { src: "/esther/journal/journal-06.jpg", alt: "Journal hormonal mockup propre" },
];

const WHAT_INSIDE = [
  { icon: "🌙", title: "Suivi des cycles", desc: "Espace quotidien pour noter ta phase, tes symptômes et ton énergie." },
  { icon: "💭", title: "Réflexions guidées", desc: "Questions profondes pour mieux te connaître à travers tes cycles." },
  { icon: "🌿", title: "Conseils naturo", desc: "Recommandations d'Esther adaptées à chaque phase hormonale." },
  { icon: "✨", title: "Rituels de bien-être", desc: "Pratiques douces pour honorer ton corps à chaque étape du mois." },
];

const TESTIMONIALS = [
  { quote: "Ce journal a complètement changé ma relation avec mon cycle. En 3 mois, j'ai compris des patterns que j'ignorais depuis des années.", name: "Marie-Hélène G." },
  { quote: "La qualité est magnifique et les questions sont vraiment profondes. C'est bien plus qu'un agenda — c'est un outil de transformation.", name: "Caroline B." },
];

export default function JournalHormonal() {
  return (
    <>
      {/* ── Hero produit ── */}
      <section className="pt-40 pb-24 bg-secondary-fixed/20 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-secondary text-on-secondary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              Présentement en rupture de stock
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-secondary leading-tight">
              Le Journal Hormonal d&apos;Esther
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Un guide quotidien pour noter tes cycles, tes émotions et retrouver ta puissance
              féminine. 12 mois d&apos;accompagnement par Esther Laframboise.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-serif text-3xl text-secondary font-bold">34,95$</span>
              <span className="text-outline text-sm">+ livraison</span>
            </div>

            {/* Waitlist */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-5">
              <p className="font-serif text-lg text-primary">
                Rejoins la liste d&apos;attente — sois la première avisée à la prochaine impression.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="ton@email.com"
                  className="flex-1 bg-surface-container rounded-full px-5 py-3 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
                />
                <button
                  type="submit"
                  className="bg-secondary text-on-secondary px-7 py-3 rounded-full font-medium hover:scale-105 transition-transform whitespace-nowrap"
                >
                  Me prévenir →
                </button>
              </form>
            </div>
          </div>

          {/* Mockup */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl shadow-2xl rotate-3 overflow-hidden bg-surface-container-low">
              <Image
                src="/esther/journal/journal-01.jpg"
                alt="Journal Hormonal — Mon journal hormonal par Isabelle Fleury et Esther Laframboise"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Ce qu'il contient ── */}
      <section className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-primary mb-16">
            Ce que tu trouveras à l&apos;intérieur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHAT_INSIDE.map((item) => (
              <div
                key={item.title}
                className="bg-secondary-fixed/20 p-8 rounded-2xl text-center space-y-4"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-serif text-xl text-secondary">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galerie ── */}
      <section className="py-24 bg-secondary-fixed/10 px-6 md:px-12 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-outline mb-4 block font-label">
              En images
            </span>
            <h2 className="font-serif text-4xl text-secondary">
              Un objet pensé pour t&apos;accompagner au quotidien
            </h2>
          </div>
          <SwipeCarousel
            ariaLabel="Galerie photos du journal hormonal"
            desktopPerView={3}
            slides={GALLERY.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-surface-container"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          />
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-primary mb-16">
            Ce qu&apos;elles en disent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-surface-container-lowest p-8 rounded-2xl"
              >
                <p className="font-serif italic text-primary text-lg leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-xs uppercase tracking-widest font-bold text-secondary">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 text-center px-6">
        <h2 className="font-serif text-4xl text-primary mb-4">
          Prête à retrouver ta puissance féminine?
        </h2>
        <p className="text-on-surface-variant mb-10 max-w-md mx-auto">
          En attendant la prochaine édition, réserve ton exemplaire maintenant.
        </p>
        <Link
          href="/rendez-vous"
          className="bg-primary text-on-primary px-10 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all"
        >
          Prendre rendez-vous avec Esther
        </Link>
      </section>
    </>
  );
}
