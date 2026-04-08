import Link from "next/link";
import Image from "next/image";
import QuizInteractif from "@/components/QuizInteractif";

const TESTIMONIALS = [
  {
    quote: "Une expérience transformatrice. Esther a su mettre les mots sur des maux que je portais depuis des années.",
    name: "Marie-Ève L.",
    city: "Bromont, QC",
    color: "bg-secondary-fixed",
    elevated: false,
  },
  {
    quote: "Le soin hormonal a changé ma relation avec mon cycle. Je me sens enfin en contrôle et apaisée.",
    name: "Sophie G.",
    city: "Magog, QC",
    color: "bg-primary-fixed",
    elevated: true,
  },
  {
    quote: "Esther est d'une bienveillance rare. Ses retraites sont des parenthèses enchantées indispensables.",
    name: "Julie R.",
    city: "Sherbrooke, QC",
    color: "bg-tertiary-fixed",
    elevated: false,
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="md:w-1/2">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-primary leading-tight tracking-tight mb-6">
              Retrouvez l&apos;équilibre.{" "}
              <span className="italic block mt-2 text-on-primary-container">
                Corps, âme et hormones.
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
              Esther Laframboise — Naturothérapeute certifiée &amp; Maître Reiki à Shefford. Une
              approche holistique pour harmoniser votre santé féminine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/rendez-vous"
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-400 active:scale-95"
              >
                Prendre rendez-vous
              </Link>
              <Link
                href="/journal-hormonal"
                className="border border-secondary-container text-secondary px-8 py-4 rounded-full font-medium text-lg hover:bg-secondary-container/20 transition-all duration-400"
              >
                Commander mon journal hormonal
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[10rem] overflow-hidden shadow-2xl bg-surface-container-low">
              <Image
                src="/esther/portrait-principal.jpg"
                alt="Esther Laframboise"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-container rounded-full flex items-center justify-center p-8 text-on-primary text-center font-serif text-sm leading-tight italic">
              Équilibre &amp; Sérénité au quotidien
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/reiki"
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all duration-500 group block"
            >
              <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center mb-8 text-primary text-3xl">
                ✦
              </div>
              <h3 className="font-serif text-2xl text-primary mb-4">Reiki</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Un soin énergétique ancestral pour libérer les blocages et restaurer la vitalité de
                votre corps.
              </p>
              <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus →
              </span>
            </Link>

            <Link
              href="/soin-hormonal"
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all duration-500 group block border-t-4 border-secondary-container"
            >
              <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center mb-8 text-secondary text-3xl">
                ♀
              </div>
              <h3 className="font-serif text-2xl text-secondary mb-4">Soin Hormonal</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Accompagnement ciblé pour naviguer vos cycles avec douceur, de la puberté à la
                ménopause.
              </p>
              <span className="text-secondary font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus →
              </span>
            </Link>

            <Link
              href="/evenements"
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all duration-500 group block border-t-4 border-tertiary-fixed-dim"
            >
              <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-8 text-tertiary text-3xl">
                ◈
              </div>
              <h3 className="font-serif text-2xl text-tertiary mb-4">Événements &amp; Retraites</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Des moments de sororité et de connexion profonde au cœur de la nature de Shefford.
              </p>
              <span className="text-tertiary font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                Voir les dates →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quiz interactif ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            Quel soin est fait pour toi?
          </h2>
          <p className="text-on-surface-variant mb-12 text-lg">
            Réponds à 4 questions pour découvrir si le Reiki ou le Soin Hormonal te correspond.
          </p>
          <QuizInteractif />
        </div>
      </section>

      {/* ── À propos teaser ── */}
      <section className="py-24 bg-primary-fixed/30 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl rotate-3 scale-95 bg-surface-container-low relative">
              <Image
                src="/esther/portrait-about.jpg"
                alt="Esther dans son studio"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="font-serif text-5xl text-primary leading-tight">Qui est Esther?</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed italic font-serif">
              &ldquo;Ma mission est de vous aider à reconnecter avec la sagesse innée de votre
              corps. À travers la naturopathie et le Reiki, nous créons un espace sacré pour la
              guérison.&rdquo;
            </p>
            <p className="text-lg text-on-surface leading-relaxed">
              Depuis plus de 10 ans, j&apos;accompagne les femmes de Shefford et d&apos;ailleurs
              vers une harmonie hormonale et une paix intérieure durable. Ma pratique combine
              rigueur scientifique et intuition profonde.
            </p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-3 text-primary font-bold text-lg group"
            >
              Mon histoire complète{" "}
              <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-4xl text-center text-primary mb-16">
            Ce qu&apos;elles disent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className={`${
                  t.elevated
                    ? "bg-surface-container-high md:-translate-y-8"
                    : "bg-surface-container"
                } p-10 rounded-3xl`}
              >
                <div className="flex gap-1 text-tertiary-fixed-dim mb-6 text-xl">★★★★★</div>
                <p className="font-serif text-xl italic text-primary leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.color}`} />
                  <div>
                    <div className="font-bold text-primary">{t.name}</div>
                    <div className="text-sm text-on-surface-variant">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal bannière ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-24">
        <div className="bg-secondary-container rounded-[4rem] overflow-hidden flex flex-col md:flex-row items-center relative">
          <div className="absolute top-8 right-8 bg-on-secondary-container text-secondary-container px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            Liste d&apos;attente disponible
          </div>
          <div className="md:w-1/2 p-12 md:p-24 order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-5xl text-on-secondary-container mb-6">
              Le Journal Hormonal d&apos;Esther
            </h2>
            <p className="text-xl text-secondary mb-10 leading-relaxed">
              Un guide quotidien pour noter tes cycles, tes émotions et retrouver ta puissance
              féminine. Un outil précieux pour ton cheminement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/journal-hormonal"
                className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
              >
                Commander maintenant →
              </Link>
              <span className="text-secondary font-medium text-sm py-4 italic">
                Présentement en rupture de stock
              </span>
            </div>
          </div>
          <div className="md:w-1/2 h-full order-1 md:order-2 bg-on-secondary-fixed/5 p-12 flex justify-center items-center min-h-64">
            <div className="relative w-full max-w-sm aspect-square rounded-xl shadow-2xl rotate-3 overflow-hidden">
              <Image src="/esther/journal-mockup.jpg" alt="Journal Hormonal" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
