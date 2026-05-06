import Link from "next/link";

export default function DemandeSpecialeCallout({
  variant = "inline",
}: {
  variant?: "hero" | "inline";
}) {
  if (variant === "hero") {
    return (
      <section className="py-20 md:py-28 px-6 md:px-12 bg-primary-fixed/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="text-sm uppercase tracking-[0.2em] text-primary/70 font-label block">
              Accompagnement humain
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              Demandes <span className="italic">spéciales</span>
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              Pour les moments délicats : musique au chevet d&apos;un proche en
              fin de vie, accompagnement en CHSLD, soutien dans le deuil,
              soin à domicile pour les personnes qui ne peuvent se déplacer.
              Je viens à vous, avec ma voix et mes instruments, pour offrir
              un moment de paix.
            </p>
            <Link
              href="/rendez-vous?service=demandes-speciales"
              className="inline-block bg-primary text-on-primary px-10 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-400 shadow-lg shadow-primary/20"
            >
              Faire une demande
            </Link>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-surface flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-primary/20" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              <span className="text-7xl md:text-8xl">🕊️</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-primary-fixed/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface flex items-center justify-center text-4xl md:text-5xl">
          🕊️
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <h3 className="font-serif text-2xl md:text-3xl text-primary">
            Une demande spéciale?
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Musique en fin de vie, accompagnement en CHSLD, soin à domicile,
            soutien dans le deuil — je me déplace pour les situations qui
            sortent du cadre habituel.
          </p>
        </div>
        <Link
          href="/rendez-vous?service=demandes-speciales"
          className="shrink-0 bg-primary text-on-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition-all duration-400 whitespace-nowrap"
        >
          Faire une demande
        </Link>
      </div>
    </section>
  );
}
