import Link from "next/link";
import Image from "next/image";

const BENEFITS = [
  { icon: "🧠", title: "Réduction du stress", desc: "Libérez les tensions accumulées pour un calme mental immédiat." },
  { icon: "♡", title: "Équilibre émotionnel", desc: "Apaisez vos émotions et retrouvez une sérénité durable." },
  { icon: "🌙", title: "Sommeil réparateur", desc: "Retrouvez des nuits paisibles et un réveil énergisant." },
  { icon: "⚡", title: "Vitalité accrue", desc: "Relancez votre énergie vitale pour mieux affronter le quotidien." },
  { icon: "✦", title: "Soulagement physique", desc: "Accélérez le processus naturel de récupération du corps." },
  { icon: "💡", title: "Clarté mentale", desc: "Dissipez le brouillard mental pour des décisions plus alignées." },
];

const TOOLS = [
  { title: "Cristaux", desc: "Pierres précieuses sélectionnées pour ancrer et purifier vos énergies spécifiques.", icon: "💎", bg: "bg-primary-fixed/40" },
  { title: "Bols chantants", desc: "Fréquences sonores pour harmoniser les cellules et apaiser le système nerveux.", icon: "🔔", bg: "bg-tertiary-fixed/40" },
  { title: "Pendule", desc: "Outil de diagnostic pour identifier avec précision les blocages des chakras.", icon: "🔮", bg: "bg-primary-fixed/20" },
  { title: "Huiles essentielles", desc: "Aromathérapie ciblée pour soutenir l'ouverture émotionnelle durant la séance.", icon: "🌿", bg: "bg-tertiary-fixed/20" },
];

const TESTIMONIALS = [
  { quote: "Une séance avec Esther est un voyage. J'ai ressenti une chaleur apaisante et une libération émotionnelle que je n'avais jamais connue auparavant.", name: "Marie-Claude P." },
  { quote: "Maître Reiki d'une grande écoute. Esther sait exactement où porter son attention. Je repars toujours avec une clarté d'esprit incroyable.", name: "Julien R." },
  { quote: "Le cadre à Shefford est magnifique et l'énergie d'Esther est si bienveillante. Mes douleurs chroniques ont diminué dès la première séance.", name: "Sophie L." },
];

export default function Reiki() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-container to-primary px-6 pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/esther/reiki-ambiance/soin.jpg" alt="" fill className="object-cover opacity-20" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto py-24">
          <h1 className="font-serif text-5xl md:text-7xl text-on-primary mb-6 leading-tight tracking-tight">
            Soins Reiki avec{" "}
            <span className="italic font-normal">Esther Laframboise</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-primary-container mb-12 font-light">
            Maître Reiki certifiée à Shefford, Québec
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/rendez-vous?service=reiki"
              className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Réserver mon soin Reiki
            </Link>
            <p className="text-on-primary-container/80 max-w-xl font-light italic text-lg">
              &ldquo;Une technique japonaise de relaxation qui favorise la guérison en canalisant
              l&apos;énergie universelle par l&apos;imposition des mains.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── C'est quoi le Reiki ── */}
      <section className="py-32 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-4xl text-on-tertiary-container">✦</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">
              L&apos;art sacré de l&apos;énergie
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Le Reiki est bien plus qu&apos;une simple relaxation ; c&apos;est un dialogue
                silencieux entre votre corps et l&apos;énergie vitale universelle. En tant que
                Maître Reiki, j&apos;agis comme un canal pour harmoniser vos centres énergétiques.
              </p>
              <p>
                Cette approche holistique permet de libérer les blocages émotionnels et physiques,
                ramenant votre être vers son état naturel d&apos;équilibre et de paix intérieure.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container">
            <Image
              src="/esther/reiki-ambiance/soin.jpg"
              alt="Soin Reiki Esther"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Bienfaits ── */}
      <section className="py-32 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-outline mb-4 block font-label">
              Bienfaits du Reiki
            </span>
            <h2 className="font-serif text-4xl text-primary">
              Harmonisez votre corps et votre esprit
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-primary-fixed/30 p-10 rounded-xl hover:bg-primary-fixed/50 transition-colors duration-400 group"
              >
                <span className="text-3xl mb-6 block group-hover:scale-110 transition-transform">
                  {b.icon}
                </span>
                <h3 className="font-serif text-xl text-primary mb-3">{b.title}</h3>
                <p className="text-on-surface-variant font-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outils ── */}
      <section className="py-32 bg-surface-container-high px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Mes Outils Vibratoires</h2>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Chaque soin est personnalisé grâce à l&apos;utilisation d&apos;instruments sacrés qui
              amplifient les fréquences de guérison.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map((t) => (
              <div
                key={t.title}
                className="bg-surface-container-lowest rounded-xl overflow-hidden group"
              >
                <div className={`aspect-square flex items-center justify-center text-6xl ${t.bg} group-hover:scale-110 transition-transform duration-700`}>
                  {t.icon}
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-lg text-primary mb-2">{t.title}</h4>
                  <p className="text-sm text-on-surface-variant">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA milieu ── */}
      <section id="rendez-vous" className="py-24 bg-primary px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="font-serif text-4xl md:text-5xl text-on-primary">
            Prête à vivre l&apos;expérience?
          </h2>
          <p className="text-on-primary-container text-xl font-light">
            Le premier pas vers une version plus apaisée de vous-même commence ici.
          </p>
          <Link
            href="/rendez-vous?service=reiki"
            className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-12 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>

      {/* ── Témoignages & Infos ── */}
      <section className="py-32 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-10 bg-surface-container rounded-2xl relative">
                <span className="text-4xl text-on-tertiary-container absolute -top-5 left-8 bg-surface px-2">
                  &ldquo;
                </span>
                <p className="italic text-on-surface-variant mb-8 leading-relaxed">{t.quote}</p>
                <p className="text-xs tracking-widest font-bold text-primary uppercase">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "⏱", title: "Durée", detail: "60 à 90 minutes par soin" },
              { icon: "📍", title: "Format", detail: "Présentiel ou en ligne" },
              { icon: "💳", title: "Tarif", detail: "Contactez-moi pour détails" },
            ].map((info) => (
              <div
                key={info.title}
                className="flex items-center gap-6 p-8 border border-outline-variant/20 rounded-xl"
              >
                <span className="text-4xl">{info.icon}</span>
                <div>
                  <p className="font-serif text-lg text-primary">{info.title}</p>
                  <p className="text-on-surface-variant">{info.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 border-t border-primary/10 text-center px-6">
        <h2 className="font-serif text-3xl text-primary mb-8 italic">
          Prête à reconnecter avec votre essence?
        </h2>
        <Link
          href="/rendez-vous?service=reiki"
          className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-14 py-6 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg"
        >
          Réserver maintenant
        </Link>
      </section>
    </>
  );
}
