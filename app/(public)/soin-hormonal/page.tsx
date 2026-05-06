import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";

const BENEFITS = [
  { icon: "🌀", title: "Régulation des cycles", desc: "Retrouvez un cycle harmonieux et prévisible mois après mois." },
  { icon: "⚡", title: "Énergie retrouvée", desc: "Dites adieu à la fatigue hormonale et retrouvez votre vitalité naturelle." },
  { icon: "💆", title: "Gestion du stress", desc: "Apprenez à naviguer les fluctuations émotionnelles liées aux hormones." },
  { icon: "🌸", title: "Ménopause accompagnée", desc: "Traversez cette transition avec sérénité et compréhension." },
  { icon: "🌱", title: "Santé digestive", desc: "Harmonisez votre microbiome en lien avec vos hormones féminines." },
  { icon: "✨", title: "Confiance en soi", desc: "Reconnectez-vous avec votre corps et votre puissance féminine innée." },
];

const TESTIMONIALS = [
  { quote: "En quelques séances, j'ai compris ce que mon corps essayait de me dire depuis des années. Esther a cette capacité rare de tout rendre clair.", name: "Annie B." },
  { quote: "Ma ménopause est devenue une transition douce grâce à l'accompagnement d'Esther. Je me sens comprise et soutenue à chaque étape.", name: "Diane F." },
  { quote: "Mon SPM a diminué de 80% en deux mois. L'approche holistique d'Esther est simplement transformatrice.", name: "Catherine M." },
];

export default function SoinHormonal() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden px-6 pt-24"
        style={{ background: "linear-gradient(135deg, #874f48 0%, #C4837A 50%, #fdb5aa 100%)" }}
      >
        <Reveal y={24} className="relative z-10 text-center max-w-4xl mx-auto py-24">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight tracking-tight">
            Soin Hormonal avec{" "}
            <span className="italic font-normal">Esther Laframboise</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 font-light">
            Naturothérapeute certifiée à Shefford, Québec
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/rendez-vous?service=soin-hormonal"
              className="bg-white text-secondary px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all shadow-xl"
            >
              Réserver mon soin hormonal
            </Link>
            <p className="text-white/70 max-w-xl font-light italic text-lg">
              &ldquo;Une approche douce et personnalisée pour harmoniser tes hormones, de la
              puberté à la post-ménopause.&rdquo;
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── C'est quoi ── */}
      <section className="py-16 md:py-32 bg-secondary-fixed/20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <Reveal className="space-y-8">
            <span className="text-4xl">♀</span>
            <h2 className="font-serif text-4xl md:text-5xl text-secondary">
              Reconnecter avec tes cycles
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Le soin hormonal est une approche naturopathique personnalisée qui t&apos;aide à
                comprendre et harmoniser tes hormones féminines à travers toutes les phases de ta
                vie.
              </p>
              <p>
                Ensemble, nous explorons tes cycles, ton alimentation, ton sommeil et ton niveau de
                stress pour créer un protocole unique, doux et respectueux de ta biologie.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2} y={40} className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container group">
            <Image
              src="/esther/soin-hormonal-ambiance/soin.jpg"
              alt="Soin Hormonal Esther"
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
              Bienfaits du soin hormonal
            </span>
            <h2 className="font-serif text-4xl text-secondary">
              Pour chaque femme, à chaque étape
            </h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-secondary-fixed/20 p-10 rounded-xl hover:bg-secondary-fixed/40 hover:-translate-y-1 transition-all duration-400 group"
              >
                <span className="text-3xl mb-6 block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {b.icon}
                </span>
                <h3 className="font-serif text-xl text-secondary mb-3">{b.title}</h3>
                <p className="text-on-surface-variant font-light">{b.desc}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── CTA milieu ── */}
      <section id="rendez-vous" className="py-24 px-6" style={{ background: "#874f48" }}>
        <Reveal className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            Prête à retrouver ton équilibre?
          </h2>
          <p className="text-white/70 text-xl font-light">
            Ton corps a une sagesse innée. Je t&apos;aide à l&apos;écouter.
          </p>
          <Link
            href="/rendez-vous?service=soin-hormonal"
            className="inline-block bg-white text-secondary px-12 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all"
          >
            Réserver maintenant
          </Link>
        </Reveal>
      </section>

      {/* ── Témoignages & Infos ── */}
      <section className="py-16 md:py-32 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-12" stagger={0.15}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-10 bg-secondary-fixed/20 rounded-2xl relative hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
                <span className="text-4xl text-secondary/40 absolute -top-5 left-8 bg-surface px-2">
                  &ldquo;
                </span>
                <p className="italic text-on-surface-variant mb-8 leading-relaxed">{t.quote}</p>
                <p className="text-xs tracking-widest font-bold text-secondary uppercase">
                  — {t.name}
                </p>
              </div>
            ))}
          </RevealStagger>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
            {[
              { icon: "⏱", title: "Durée", detail: "75 à 90 minutes par séance" },
              { icon: "📍", title: "Format", detail: "Présentiel ou en ligne" },
              { icon: "💳", title: "Tarif", detail: "Contactez-moi pour détails" },
            ].map((info) => (
              <div
                key={info.title}
                className="flex items-center gap-6 p-8 border border-secondary/20 rounded-xl hover:border-secondary/40 hover:bg-secondary-fixed/10 transition-all duration-400"
              >
                <span className="text-4xl">{info.icon}</span>
                <div>
                  <p className="font-serif text-lg text-secondary">{info.title}</p>
                  <p className="text-on-surface-variant">{info.detail}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 border-t border-secondary/10 text-center px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-secondary mb-8 italic">
            Ton cycle est une boussole. Apprends à le lire.
          </h2>
          <Link
            href="/rendez-vous?service=soin-hormonal"
            className="inline-block bg-secondary text-on-secondary px-14 py-6 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            Réserver maintenant
          </Link>
        </Reveal>
      </section>
    </>
  );
}
