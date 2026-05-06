import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const BENEFITS = [
  { icon: "🧠", title: "Réduction du stress", desc: "Libérez les tensions accumulées pour un calme mental immédiat." },
  { icon: "♡", title: "Équilibre émotionnel", desc: "Apaisez vos émotions et retrouvez une sérénité durable." },
  { icon: "🌙", title: "Sommeil réparateur", desc: "Retrouvez des nuits paisibles et un réveil énergisant." },
  { icon: "⚡", title: "Vitalité accrue", desc: "Relancez votre énergie vitale pour mieux affronter le quotidien." },
  { icon: "✦", title: "Soulagement physique", desc: "Accélérez le processus naturel de récupération du corps." },
  { icon: "💡", title: "Clarté mentale", desc: "Dissipez le brouillard mental pour des décisions plus alignées." },
];

const TOOLS = [
  { title: "Shruti Box", desc: "Boîte à vent indienne au son proche de la cornemuse. Idéale pour les soins de groupe — son qui porte loin.", icon: "🎐", bg: "bg-primary-fixed/40" },
  { title: "Quartzophone", desc: "Xylophone en cristal de quartz, fréquence ajustée au cœur. Provient de la mine de Cristal de Bonsecours.", icon: "💎", bg: "bg-tertiary-fixed/40" },
  { title: "Tank Drum", desc: "Percussion artisanale québécoise faite de bonbonnes recyclées. Gamme C celtique mineur — vibrations apaisantes.", icon: "🪘", bg: "bg-primary-fixed/20" },
  { title: "Tambours", desc: "Peau de Bison et de Wapiti (fabriqué à la main). Le rythme s'apparente à un cœur qui bat.", icon: "🥁", bg: "bg-tertiary-fixed/20" },
  { title: "Bols de Cristal", desc: "Bols 18 et 20 pouces, utilisés en groupe Reiki. Vibration en duo puissante et durable.", icon: "🔔", bg: "bg-primary-fixed/40" },
  { title: "Voix & Kotodamas", desc: "Sons sacrés propres au Reiki qui amplifient le soin. Ma signature unique.", icon: "✦", bg: "bg-tertiary-fixed/40" },
];

const TESTIMONIALS = [
  {
    quote: "Esther est la douceur incarnée. De sa magnifique personne émane tant de bienveillance et d'ouverture. Sans jugement et dotée d'une grande empathie, elle me met rapidement en confiance. Elle offre des soins d'une grande qualité. C'est pourquoi je l'appelle ma petite fée 🧚🏼‍♀️",
    name: "Marie Ève",
  },
  {
    quote: "Esther est précieuse dans mon processus d'évolution intérieure. Sa voix et son tambour me permettent de déloger ce qui est bloqué en moi. Une dose parfaite de béatitude et d'alignement. 💜",
    name: "Claudine D.",
  },
  {
    quote: "J'adore Esther, pour sa douceur, pour l'attention qu'elle porte à ce que je lui nomme. Un soin avec elle m'amène dans une profondeur, et sa voix céleste dans mon ressenti. 😌",
    name: "Josée T.",
  },
  {
    quote: "Sa voix de cœur et l'accompagnement de ses instruments sont sa couleur unique et si riche ! Je dirais qu'elle a un équilibre inspirant « entre ciel et terre ».",
    name: "Estelle",
  },
  {
    quote: "Esther est une personne de cœur, vraie, qui possède une belle humilité. Sa voix résonne au son de ses instruments et crée une ambiance propice à la guérison.",
    name: "Marilou",
  },
];

export default function Reiki() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-container to-primary px-6 pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/esther/reiki-ambiance/soin.jpg" alt="" fill className="object-cover opacity-20 ken-burns" />
        </div>
        <Reveal y={24} className="relative z-10 text-center max-w-4xl mx-auto py-24">
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
        </Reveal>
      </section>

      {/* ── C'est quoi le Reiki ── */}
      <section className="py-16 md:py-32 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <Reveal className="space-y-8">
            <span className="text-4xl text-on-tertiary-container">✦</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">
              C&apos;est quoi le Reiki?
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Reiki signifie <em>énergie universelle</em> en japonais. Ce soin a été développé
                par Mikao Usui Sensei au Japon il y a un peu plus d&apos;un siècle. J&apos;ai
                reçu les initiations nécessaires pour en transmettre l&apos;énergie sans utiliser
                la mienne.
              </p>
              <p>
                Le Reiki est transmis par les mains, mais également par les yeux, le souffle et
                la voix. Il a des sons propres — les <strong>Kotodamas</strong> — qui viennent
                amplifier le soin. La couleur de mes soins vient de l&apos;utilisation de ces
                sons accompagnés d&apos;instruments variés : tank drum, shruti box, quartzophone
                et mes tambours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2} y={40} className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container group">
            <Image
              src="/esther/reiki-ambiance/soin.jpg"
              alt="Soin Reiki Esther"
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Bienfaits ── */}
      <section className="py-16 md:py-32 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-outline mb-4 block font-label">
              Bienfaits du Reiki
            </span>
            <h2 className="font-serif text-4xl text-primary">
              Harmonisez votre corps et votre esprit
            </h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-primary-fixed/30 p-10 rounded-xl hover:bg-primary-fixed/50 hover:-translate-y-1 transition-all duration-400 group"
              >
                <span className="text-3xl mb-6 block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {b.icon}
                </span>
                <h3 className="font-serif text-xl text-primary mb-3">{b.title}</h3>
                <p className="text-on-surface-variant font-light">{b.desc}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Outils ── */}
      <section className="py-16 md:py-32 bg-surface-container-high px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Mes Outils Vibratoires</h2>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Chaque soin est personnalisé grâce à l&apos;utilisation d&apos;instruments sacrés qui
              amplifient les fréquences de guérison.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {TOOLS.map((t) => (
              <div
                key={t.title}
                className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
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
          </RevealStagger>
        </div>
      </section>

      {/* ── CTA milieu ── */}
      <section id="rendez-vous" className="py-24 bg-primary px-6">
        <Reveal className="max-w-4xl mx-auto text-center space-y-10">
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
        </Reveal>
      </section>

      {/* ── Témoignages & Infos ── */}
      <section className="py-16 md:py-32 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          <Reveal>
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
            {[
              { icon: "⏱", title: "Durée", detail: "1h30 (1ère rencontre) · 1h à 1h30 (suivantes)" },
              { icon: "📍", title: "Format", detail: "Shefford, en ligne ou à domicile" },
              { icon: "💳", title: "Tarif", detail: "150$ première · 100$ suivantes · 75$ mensuel" },
            ].map((info) => (
              <div
                key={info.title}
                className="flex items-center gap-6 p-8 border border-outline-variant/20 rounded-xl hover:border-primary/30 hover:bg-surface-container-low transition-all duration-400"
              >
                <span className="text-4xl">{info.icon}</span>
                <div>
                  <p className="font-serif text-lg text-primary">{info.title}</p>
                  <p className="text-on-surface-variant">{info.detail}</p>
                </div>
              </div>
            ))}
          </RevealStagger>

          <Reveal className="mt-12 text-center text-sm text-outline italic">
            <p>
              Politique d&apos;annulation : 50% de la rencontre facturé pour toute annulation à
              moins de 24h du rendez-vous.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 border-t border-primary/10 text-center px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-primary mb-8 italic">
            Prête à reconnecter avec votre essence?
          </h2>
          <Link
            href="/rendez-vous?service=reiki"
            className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-14 py-6 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            Réserver maintenant
          </Link>
        </Reveal>
      </section>
    </>
  );
}
