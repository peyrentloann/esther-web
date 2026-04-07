import Link from "next/link";
import Image from "next/image";

const CERTIFICATIONS = [
  { year: "2022 — 2023", title: "Maîtrise Reiki", org: "Institut de Reiki du Québec", desc: "Formation complète jusqu'au grade de Maître Reiki, techniques avancées d'harmonisation énergétique." },
  { year: "2019 — 2021", title: "Diplôme en Naturothérapie", org: "École Supérieure de Naturopathie", desc: "Formation intensive en santé holistique, phytothérapie, nutrition thérapeutique et hygiène de vie." },
  { year: "2018", title: "Spécialisation en Santé Hormonale", org: "Formation continue", desc: "Accompagnement des cycles féminins, de la puberté à la post-ménopause." },
  { year: "2015 — 2018", title: "Certification en Aromathérapie", org: "Association québécoise d'aromathérapie", desc: "Utilisation thérapeutique des huiles essentielles en complément des soins énergétiques." },
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
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-6 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-container-high relative">
              <Image
                src="/esther/portrait-principal.jpg"
                alt="Esther Laframboise"
                fill
                className="object-cover grayscale-[20%]"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest text-primary/70 font-label block">
                Bienvenue dans mon univers
              </span>
              <h1 className="font-serif text-6xl md:text-7xl text-primary leading-tight">
                Bonjour, je suis <span className="italic">Esther</span>
              </h1>
              <p className="font-serif text-2xl text-on-surface-variant italic">
                Naturothérapeute certifiée &amp; Maître Reiki
              </p>
            </div>
            <p className="text-lg leading-relaxed text-on-surface-variant max-w-xl">
              J&apos;accompagne les femmes à retrouver leur équilibre vital à travers une approche
              qui unit la sagesse ancestrale du Reiki et la rigueur de la naturothérapie moderne. Ma
              mission est de créer un espace de guérison où votre corps et votre esprit peuvent
              enfin s&apos;harmoniser.
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
          </div>
        </div>
      </section>

      {/* ── Histoire ── */}
      <section className="bg-surface-container-low py-32 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 space-y-32 relative z-10">
          {/* Bloc 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
            <div className="md:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/5 aspect-square bg-surface-container relative">
                <Image
                  src="/esther/portrait-about.jpg"
                  alt="Mon parcours"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 space-y-6">
              <h2 className="font-serif text-4xl text-primary">
                Au commencement était le besoin de lenteur
              </h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Mon voyage n&apos;a pas commencé dans un cabinet de consultation, mais dans le
                tumulte d&apos;une vie qui allait trop vite. C&apos;est à travers mes propres défis
                de santé hormonale que j&apos;ai découvert la puissance de la naturopathie. Ce fut
                une révélation : notre corps ne nous trahit jamais, il nous parle simplement un
                langage que nous avons oublié d&apos;écouter.
              </p>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Après des années d&apos;études et d&apos;expérimentations personnelles, j&apos;ai
                décidé de dédier ma vie à aider les autres à traduire ces messages. La rencontre
                avec le Reiki a été le chaînon manquant, apportant la dimension énergétique
                nécessaire pour une guérison complète.
              </p>
            </div>
          </div>

          {/* Bloc 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
            <div className="md:col-span-7 order-2 md:order-1 space-y-6">
              <h2 className="font-serif text-4xl text-primary">
                Une philosophie ancrée dans la terre
              </h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Je ne crois pas aux solutions miracles ou aux protocoles rigides. Chaque individu
                est un écosystème unique. Mon approche fusionne l&apos;écoute attentive de vos
                symptômes physiques avec une compréhension profonde de vos blocages émotionnels.
              </p>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Ici, nous prenons le temps. Nous cultivons la patience. Nous apprenons à travailler
                avec les cycles de la nature plutôt que de lutter contre eux. C&apos;est cette
                douceur radicale qui permet les transformations les plus durables.
              </p>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="rounded-full aspect-square overflow-hidden border-[12px] border-surface bg-surface-container relative">
                <Image
                  src="/esther/portrait-about.jpg"
                  alt="Philosophie Esther"
                  fill
                  className="object-cover scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="py-32 max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24 space-y-4">
          <span className="text-sm uppercase tracking-[0.2em] text-primary/60 font-label block">
            Mes piliers
          </span>
          <h2 className="font-serif text-5xl text-primary">Une approche holistique</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-surface-container-lowest p-12 rounded-xl text-center space-y-6 border border-outline-variant/10 hover:border-primary-container/30 transition-colors duration-500"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-3xl">
                {p.icon}
              </div>
              <h3 className="font-serif text-2xl text-primary">{p.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formations ── */}
      <section className="py-32 bg-surface-container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-primary mb-4">Parcours &amp; Formations</h2>
            <div className="h-1 w-24 bg-primary/10 mx-auto rounded-full" />
          </div>
          <div className="space-y-12 relative before:absolute before:left-[1.625rem] before:top-4 before:bottom-4 before:w-[2px] before:bg-primary-container/20">
            {CERTIFICATIONS.map((c) => (
              <div key={c.title} className="relative pl-16 group">
                <div className="absolute left-0 top-1 w-[3.5rem] h-[3.5rem] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary-container ring-8 ring-primary-container/10 group-hover:scale-125 transition-transform duration-300" />
                </div>
                <div className="bg-surface p-8 rounded-xl border border-outline-variant/10 shadow-sm transition-transform duration-400 group-hover:-translate-y-1">
                  <span className="text-sm text-primary-container font-bold mb-2 block">
                    {c.year}
                  </span>
                  <h3 className="font-serif text-xl text-primary mb-1">{c.title}</h3>
                  <p className="text-sm text-outline mb-3">{c.org}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA double ── */}
      <section className="py-24 text-center px-6 bg-surface">
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
      </section>
    </>
  );
}
