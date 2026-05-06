import Link from "next/link";
import Image from "next/image";

const TYPES = [
  {
    icon: "🕊️",
    title: "Accompagnement en fin de vie",
    desc: "Présence musicale et énergétique au chevet d'un proche en soins palliatifs, à l'hôpital ou à domicile.",
  },
  {
    icon: "🎵",
    title: "Musique de soin",
    desc: "Voix, bols chantants et instruments doux pour apaiser, accompagner et soutenir la personne et ses proches.",
  },
  {
    icon: "🏥",
    title: "Visite en CHSLD ou hôpital",
    desc: "Déplacement sur place pour offrir un moment de paix, de réconfort et de connexion.",
  },
  {
    icon: "💜",
    title: "Soutien dans le deuil",
    desc: "Soin Reiki et accompagnement spirituel pour les familles qui traversent une perte ou un passage difficile.",
  },
  {
    icon: "🌿",
    title: "Soin à domicile",
    desc: "Pour les personnes qui ne peuvent pas se déplacer — séance complète apportée chez vous.",
  },
  {
    icon: "✦",
    title: "Demande sur mesure",
    desc: "Chaque situation est unique. Si votre besoin n'entre dans aucune case, parlons-en simplement.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Vous m'écrivez",
    desc: "Décrivez la situation, le lieu et ce qui serait le plus aidant. Aucune demande n'est trop petite ou trop délicate.",
  },
  {
    num: "02",
    title: "On échange",
    desc: "Je vous rappelle pour comprendre le contexte, répondre à vos questions et proposer un accompagnement adapté.",
  },
  {
    num: "03",
    title: "Je me déplace",
    desc: "Je viens à l'endroit prévu — hôpital, CHSLD, domicile — avec tout le matériel nécessaire pour offrir un moment de paix.",
  },
];

export default function DemandesSpeciales() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-container to-primary px-6 pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/esther/reiki-ambiance/soin.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto py-24">
          <span className="text-sm uppercase tracking-widest text-on-primary-container/80 mb-6 block font-label">
            Accompagnement humain
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-on-primary mb-6 leading-tight tracking-tight">
            Demandes <span className="italic font-normal">spéciales</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-primary-container mb-12 font-light max-w-2xl mx-auto">
            Pour les moments délicats de la vie où une présence douce, musicale
            et énergétique fait toute la différence.
          </p>
          <Link
            href="/rendez-vous?service=demandes-speciales"
            className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all shadow-xl shadow-primary/20 inline-block"
          >
            Faire une demande
          </Link>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 md:py-32 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="space-y-8">
            <span className="text-4xl text-on-tertiary-container">✦</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              Quand la musique et l&apos;énergie deviennent un soin
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Il existe des moments où les mots ne suffisent plus. Quand un
                proche est en fin de vie, quand une famille traverse un deuil,
                quand quelqu&apos;un ne peut plus se déplacer — c&apos;est là
                que je me déplace, moi.
              </p>
              <p>
                J&apos;apporte ma voix, mes bols chantants, mes mains et ma
                présence. Pas pour soigner une maladie, mais pour offrir un
                espace de paix, de douceur et de connexion. Un moment suspendu
                au milieu du difficile.
              </p>
              <p className="italic text-primary">
                Aucune situation n&apos;est trop petite, trop délicate, trop
                tardive. Si vous y pensez, c&apos;est qu&apos;il y a quelque
                chose à offrir.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container">
            <Image
              src="/esther/reiki-ambiance/soin.jpg"
              alt="Accompagnement Esther Laframboise"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Types de demandes ── */}
      <section className="py-16 md:py-32 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-outline mb-4 block font-label">
              Types d&apos;accompagnement
            </span>
            <h2 className="font-serif text-4xl text-primary">
              Ce que je peux offrir
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TYPES.map((t) => (
              <div
                key={t.title}
                className="bg-primary-fixed/30 p-10 rounded-xl hover:bg-primary-fixed/50 transition-colors duration-400 group"
              >
                <span className="text-3xl mb-6 block group-hover:scale-110 transition-transform">
                  {t.icon}
                </span>
                <h3 className="font-serif text-xl text-primary mb-3">
                  {t.title}
                </h3>
                <p className="text-on-surface-variant font-light">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça se passe ── */}
      <section className="py-16 md:py-32 bg-surface-container-high px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-sm uppercase tracking-widest text-outline mb-4 block font-label">
              Démarche
            </span>
            <h2 className="font-serif text-4xl text-primary">
              Comment ça se passe
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="bg-surface-container-lowest p-10 rounded-xl"
              >
                <span className="font-serif text-5xl text-on-tertiary-container/60 block mb-6">
                  {s.num}
                </span>
                <h3 className="font-serif text-xl text-primary mb-4">
                  {s.title}
                </h3>
                <p className="text-on-surface-variant font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Note honoraires ── */}
      <section className="py-16 md:py-24 bg-surface px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-3xl text-on-tertiary-container">♡</span>
          <h2 className="font-serif text-3xl text-primary">
            Une question d&apos;honoraires?
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed font-light">
            Chaque demande est unique. Le tarif est ajusté selon la situation,
            le déplacement et la durée. N&apos;hésitez pas à me contacter
            même si la question financière est délicate — on trouve toujours
            une solution.
          </p>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 bg-primary px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="font-serif text-4xl md:text-5xl text-on-primary">
            Vous pensez à quelqu&apos;un?
          </h2>
          <p className="text-on-primary-container text-xl font-light max-w-2xl mx-auto">
            Écrivez-moi. Je vous rappelle rapidement pour comprendre votre
            situation et voir ensemble ce qui serait le plus aidant.
          </p>
          <Link
            href="/rendez-vous?service=demandes-speciales"
            className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-12 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all"
          >
            Faire une demande
          </Link>
        </div>
      </section>
    </>
  );
}
