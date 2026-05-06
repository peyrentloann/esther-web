import Link from "next/link";
import Image from "next/image";
import QuizInteractif from "@/components/QuizInteractif";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import HeroTitle from "@/components/motion/HeroTitle";
import BloomingFlower from "@/components/motion/BloomingFlower";
import SwipeCarousel from "@/components/SwipeCarousel";

const TESTIMONIALS = [
  {
    quote: "Esther est la douceur incarnée. De sa magnifique personne émane tant de bienveillance et d'ouverture. Sans jugement et dotée d'une grande empathie, elle me met rapidement en confiance. C'est pourquoi je l'appelle ma petite fée 🧚🏼‍♀️",
    name: "Marie Ève",
    city: "Reiki",
    color: "bg-secondary-fixed",
  },
  {
    quote: "Esther est précieuse dans mon processus d'évolution intérieure. Sa voix et son tambour me permettent de déloger ce qui est bloqué en moi. Une dose parfaite de béatitude et d'alignement. 💜",
    name: "Claudine D.",
    city: "Reiki",
    color: "bg-primary-fixed",
  },
  {
    quote: "J'adore Esther, pour sa douceur, pour l'attention qu'elle porte à ce que je lui nomme. Un soin avec elle m'amène dans une profondeur, et sa voix céleste dans mon ressenti. 😌",
    name: "Josée T.",
    city: "Reiki & Retraite",
    color: "bg-tertiary-fixed",
  },
  {
    quote: "Ses soins se sont tellement enrichis en peu de temps. Sa voix de cœur et l'accompagnement de ses instruments sont sa couleur unique et si riche. Un équilibre inspirant « entre ciel et terre ».",
    name: "Estelle",
    city: "Formation Reiki",
    color: "bg-secondary-fixed",
  },
  {
    quote: "Esther est une personne de cœur, vraie, qui possède une belle humilité et qui sait être à l'écoute des besoins des autres. Sa voix résonne au son de ses instruments et crée une ambiance propice à la guérison.",
    name: "Marilou",
    city: "Reiki",
    color: "bg-primary-fixed",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
          <div className="md:w-1/2">
            <HeroTitle
              before="Retrouvez l'équilibre."
              italic="Corps, âme et hormones."
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-primary leading-tight tracking-tight mb-6"
              italicClassName="italic block mt-2 text-on-primary-container"
            />
            <Reveal delay={0.5} y={20}>
              <p className="text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                Naturothérapeute &amp; Maître Reiki à Shefford. Soins énergétiques par la voix
                et les instruments, accompagnement en santé hormonale féminine — ou les deux
                combinés.
              </p>
            </Reveal>
            <Reveal delay={0.7} y={16}>
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
            </Reveal>
          </div>

          <Reveal delay={0.3} y={40} className="w-full md:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[10rem] overflow-hidden shadow-2xl bg-surface-container-low">
              <Image
                src="/esther/portrait-principal.jpg"
                alt="Esther Laframboise"
                fill
                className="object-cover ken-burns"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-container rounded-full hidden md:flex items-center justify-center p-8 text-on-primary text-center font-serif text-sm leading-tight italic">
              Équilibre &amp; Sérénité au quotidien
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Fleur 3D ── */}
      <section className="relative py-16 md:py-24 bg-surface overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div
            className="w-[800px] h-[800px] rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(238,192,104,0.5) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          <BloomingFlower size={520} className="mb-12" />
          <Reveal delay={2.8}>
            <p className="font-serif text-2xl md:text-3xl text-primary italic max-w-2xl leading-relaxed">
              Comme une fleur qui s&apos;ouvre, votre essence se révèle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            <Link
              href="/reiki"
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group block h-full"
            >
              <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center mb-8 text-primary text-3xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
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
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group block border-t-4 border-secondary-container h-full"
            >
              <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center mb-8 text-secondary text-3xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
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
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group block border-t-4 border-tertiary-fixed-dim h-full"
            >
              <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-8 text-tertiary text-3xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
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
          </RevealStagger>
        </div>
      </section>

      {/* ── Quiz interactif ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Quel soin est fait pour toi?
            </h2>
            <p className="text-on-surface-variant mb-12 text-lg">
              Réponds à 4 questions pour découvrir si le Reiki ou le Soin Hormonal te correspond.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <QuizInteractif />
          </Reveal>
        </div>
      </section>

      {/* ── À propos teaser ── */}
      <section className="py-24 bg-primary-fixed/30 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <Reveal y={40} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl rotate-3 scale-95 bg-surface-container-low relative group">
              <Image
                src="/esther/portrait-about.jpg"
                alt="Esther dans son studio"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="space-y-8">
            <h2 className="font-serif text-5xl text-primary leading-tight">Qui est Esther?</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed italic font-serif">
              &ldquo;Ma philosophie est de soutenir la personne pour qu&apos;elle cultive son
              pouvoir d&apos;agir et exerce son libre-arbitre. Informer, éclairer, questionner
              et réfléchir avec elle, dans le respect et l&apos;accueil.&rdquo;
            </p>
            <p className="text-lg text-on-surface leading-relaxed">
              Maître Reiki depuis janvier 2024 et membre de l&apos;Association des
              naturothérapeutes du Québec. Mon parcours combine 12 ans en gestion communautaire,
              une formation en intervention auprès des femmes, et une expérience personnelle
              forte avec la santé hormonale.
            </p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-3 text-primary font-bold text-lg group"
            >
              Mon histoire complète{" "}
              <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="font-serif text-4xl text-center text-primary mb-16">
              Ce qu&apos;elles disent
            </h2>
          </Reveal>
          <Reveal>
            <SwipeCarousel
              ariaLabel="Témoignages clients"
              slides={TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-surface-container p-10 md:p-12 rounded-3xl h-full"
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
            />
          </Reveal>
        </div>
      </section>

      {/* ── Journal bannière ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-24">
        <Reveal y={40}>
          <div className="bg-secondary-container rounded-[4rem] overflow-hidden flex flex-col md:flex-row items-center relative">
            <div className="absolute top-8 right-8 bg-on-secondary-container text-secondary-container px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hidden sm:block">
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
            <div className="w-full md:w-1/2 h-full order-1 md:order-2 bg-on-secondary-fixed/5 p-12 flex justify-center items-center min-h-64">
              <div className="relative w-full max-w-sm aspect-square rounded-xl shadow-2xl rotate-3 overflow-hidden hover:rotate-0 hover:scale-105 transition-all duration-700">
                <Image src="/esther/journal-mockup.jpg" alt="Journal Hormonal" fill className="object-cover" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
