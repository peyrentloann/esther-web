import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";

const CERTIFICATIONS = [
  { year: "2024 — actuel", title: "Membre ANQ", org: "Association des naturothérapeutes du Québec", desc: "Reçus disponibles pour assurances privées en naturothérapie." },
  { year: "2024", title: "Hormonothérapie féminine bio-identique", org: "Dre Sylvie Demers", desc: "Formation intensive avec une sommité en la matière des hormones féminines." },
  { year: "2024", title: "Élixir de fleurs & Aromathérapie", org: "École de Naturothérapie du Québec", desc: "Approches complémentaires aux soins énergétiques et hormonaux." },
  { year: "2019 — 2024", title: "Reiki Usui niveaux 1 à 4", org: "Valérie Berthelette, Homéovie", desc: "Maître enseignant depuis janvier 2024. Pratique à temps plein depuis 2 ans." },
  { year: "2003 — 2006", title: "Baccalauréat Administration — Ressources Humaines", org: "UQAM Téluq", desc: "Compétences de leader et communicatrice développées en parallèle de la vie de famille." },
  { year: "1996 — 1999", title: "Technique d'intervention en délinquance", org: "Cégep Ahuntsic", desc: "Premier parcours en intervention auprès des femmes victimes de violence conjugale." },
];

const PILLARS = [
  { icon: "👂", title: "Écoute profonde", desc: "Un espace sans jugement où chaque mot compte, pour identifier les racines réelles de vos déséquilibres." },
  { icon: "∞", title: "Approche holistique", desc: "Le lien indissociable entre le corps, le mental et l'âme pour une prise en charge véritablement complète." },
  { icon: "♡", title: "Accompagnement doux", desc: "Une progression à votre rythme, respectant les limites et les besoins spécifiques de votre corps." },
];

export default function APropos() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-28 pb-16 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <Reveal y={40} className="md:col-span-6 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-container-high relative group">
              <Image
                src="/esther/portrait-principal.jpg"
                alt="Esther Laframboise"
                fill
                className="object-cover grayscale-[20%] transition-all duration-[2000ms] group-hover:scale-110 group-hover:grayscale-0"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest text-primary/70 font-label block">
                Bienvenue dans mon univers
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary leading-tight">
                Bonjour, je suis <span className="italic">Esther</span>
              </h1>
              <p className="font-serif text-2xl text-on-surface-variant italic">
                Naturothérapeute certifiée &amp; Maître Reiki
              </p>
            </div>
            <p className="text-lg leading-relaxed text-on-surface-variant max-w-xl">
              Riche de mes expériences personnelles et de mes formations en soins énergétiques
              Reiki et en santé hormonale féminine, j&apos;offre des rencontres qui répondent à
              l&apos;un ou l&apos;autre des domaines — ou aux deux combinés. Dans les soins
              Reiki, je me distingue par l&apos;utilisation de ma <em>voix</em> et
              d&apos;<em>instruments de musique</em> pour vous faire vivre une expérience
              transformatrice douce et puissante à la fois.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 bg-surface-container-low px-6 py-3 rounded-full border border-outline-variant/15">
                <span className="text-primary-container">✓</span>
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Certifiée en Reiki
                </span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-6 py-3 rounded-full border border-outline-variant/15">
                <span className="text-primary-container">✓</span>
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Spécialiste en santé hormonale
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Histoire ── */}
      <section className="bg-surface-container-low py-16 md:py-32 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 space-y-16 md:space-y-32 relative z-10">
          {/* Bloc 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center">
            <Reveal y={40} className="md:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/5 aspect-square bg-surface-container relative group">
                <Image
                  src="/esther/portrait-about.jpg"
                  alt="Mon parcours"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="md:col-span-7 space-y-6">
              <h2 className="font-serif text-4xl text-primary">
                Un parcours qui m&apos;a ramenée à mon essence
              </h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Depuis mon adolescence, la psychologie et la croissance humaine me fascinent.
                J&apos;ai d&apos;abord étudié en intervention en délinquance et débuté mon
                parcours auprès des femmes victimes de violence conjugale. Plus tard, j&apos;ai
                amorcé un baccalauréat en administration des ressources humaines, et travaillé
                plus de 12 ans comme gestionnaire dans le milieu communautaire.
              </p>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Ma vie a pris un tournant à 180 degrés avec un changement de carrière qui
                n&apos;était pas prévu à mon agenda. J&apos;adhère à la maxime d&apos;Aldous
                Huxley : <em>&laquo;&nbsp;L&apos;expérience ce n&apos;est pas ce qui nous
                arrive, mais ce que nous faisons de ce qui nous arrive.&nbsp;&raquo;</em> J&apos;ai
                choisi que ce changement me permette de réinventer ma vie et de plonger à la
                source de ce que j&apos;avais vraiment envie d&apos;ÊTRE.
              </p>
            </Reveal>
          </div>

          {/* Bloc 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center">
            <Reveal className="md:col-span-7 order-2 md:order-1 space-y-6">
              <h2 className="font-serif text-4xl text-primary">
                Pourquoi le Reiki et la santé hormonale
              </h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Le Reiki est arrivé par référence d&apos;une acupunctrice. Je ne comprenais pas
                rationnellement comment cela fonctionnait, mais mon corps, mes émotions, mon
                équilibre s&apos;en portaient mieux. C&apos;était bon pour moi, alors j&apos;ai
                continué. J&apos;ai découvert avec ce soin que ma grande sensibilité était une
                <em> force</em> et non une faiblesse. J&apos;ai suivi les niveaux 1 à 3 entre
                2019 et 2022, puis complété ma formation comme maître enseignant en janvier
                2024. Cela fait deux ans que je suis à temps plein dans ma pratique.
              </p>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Pour la santé hormonale, en 2024, j&apos;ai eu accès à un atelier sur les
                hormones féminines. À 44 ans, je ne pensais pas du tout être rendue dans cette
                période de ma vie. Pourtant, après <strong>7 ans d&apos;insomnie</strong> et
                <strong> 9 ans de règles hémorragiques</strong>, j&apos;avais essayé beaucoup de
                choses et j&apos;étais au bout de mes ressources. Mon parcours personnel m&apos;a
                convaincue que je devais et pouvais aider les femmes à ce niveau.
              </p>
              <p className="text-lg leading-relaxed text-primary italic">
                Ma philosophie : soutenir la personne pour qu&apos;elle cultive son pouvoir
                d&apos;agir et exerce son libre-arbitre. Informer, éclairer, questionner et
                réfléchir <em>avec</em> elle, dans le respect et l&apos;accueil.
              </p>
            </Reveal>
            <Reveal delay={0.2} y={40} className="md:col-span-5 order-1 md:order-2">
              <div className="rounded-full aspect-square overflow-hidden border-[12px] border-surface bg-surface-container relative group">
                <Image
                  src="/esther/portrait-about.jpg"
                  alt="Philosophie Esther"
                  fill
                  className="object-cover scale-110 transition-transform duration-[2000ms] group-hover:scale-125"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="py-16 md:py-32 max-w-screen-2xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-24 space-y-4">
          <span className="text-sm uppercase tracking-[0.2em] text-primary/60 font-label block">
            Mes piliers
          </span>
          <h2 className="font-serif text-5xl text-primary">Une approche holistique</h2>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-12" stagger={0.15}>
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-surface-container-lowest p-12 rounded-xl text-center space-y-6 border border-outline-variant/10 hover:border-primary-container/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                {p.icon}
              </div>
              <h3 className="font-serif text-2xl text-primary">{p.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── Formations ── */}
      <section className="py-16 md:py-32 bg-surface-container px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-20">
            <h2 className="font-serif text-4xl text-primary mb-4">Parcours &amp; Formations</h2>
            <div className="h-1 w-24 bg-primary/10 mx-auto rounded-full" />
          </Reveal>
          <RevealStagger className="space-y-12 relative before:absolute before:left-[1.625rem] before:top-4 before:bottom-4 before:w-[2px] before:bg-primary-container/20" stagger={0.15}>
            {CERTIFICATIONS.map((c) => (
              <div key={c.title} className="relative pl-16 group">
                <div className="absolute left-0 top-1 w-[3.5rem] h-[3.5rem] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary-container ring-8 ring-primary-container/10 group-hover:scale-125 transition-transform duration-300" />
                </div>
                <div className="bg-surface p-8 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-400 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <span className="text-sm text-primary-container font-bold mb-2 block">
                    {c.year}
                  </span>
                  <h3 className="font-serif text-xl text-primary mb-1">{c.title}</h3>
                  <p className="text-sm text-outline mb-3">{c.org}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── CTA double ── */}
      <section className="py-24 text-center px-6 bg-surface">
        <Reveal>
          <h2 className="font-serif text-4xl text-primary mb-4">Prête à commencer ton parcours?</h2>
          <p className="text-on-surface-variant mb-12 text-lg max-w-xl mx-auto">
            Je serais heureuse de t&apos;accompagner vers un mieux-être durable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rendez-vous"
              className="bg-primary text-on-primary px-10 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all"
            >
              Prendre rendez-vous
            </Link>
            <Link
              href="/reiki"
              className="border border-primary/30 text-primary px-10 py-4 rounded-full font-medium text-lg hover:bg-primary/5 transition-all"
            >
              Découvrir mes soins
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
