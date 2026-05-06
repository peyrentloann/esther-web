import { isGoogleConnected } from "@/lib/google-calendar";
import { startGoogleConnect, disconnectGoogleAction } from "./actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ google?: string }>;

export default async function ParametresPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const connected = await isGoogleConnected();
  const flash = params.google;

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-primary mb-2">Paramètres</h2>
        <p className="text-outline">Gestion des intégrations et préférences</p>
      </header>

      {flash === "connected" && (
        <div className="mb-8 p-4 bg-primary-fixed/50 text-on-primary-fixed rounded-xl">
          ✓ Google Calendar connecté avec succès.
        </div>
      )}
      {flash === "error" && (
        <div className="mb-8 p-4 bg-error-container text-error rounded-xl">
          Erreur lors de la connexion à Google Calendar. Réessaye.
        </div>
      )}

      <section className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] mb-8">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center text-3xl">
            📅
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-2xl text-primary mb-2">Google Calendar</h3>
            <p className="text-on-surface-variant mb-6 max-w-xl leading-relaxed">
              Quand un rendez-vous est pris sur le site, il s&apos;ajoute automatiquement à
              ton agenda Google avec rappels par courriel. Les annulations depuis l&apos;admin
              suppriment l&apos;événement de ton agenda.
            </p>

            {connected ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary-fixed/40 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  ● Connecté
                </div>
                <form action={disconnectGoogleAction}>
                  <button
                    type="submit"
                    className="block text-sm text-error underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Déconnecter Google Calendar
                  </button>
                </form>
              </div>
            ) : (
              <form action={startGoogleConnect}>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition-all"
                >
                  Connecter Google Calendar →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)]">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center text-3xl">
            ⏱
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-2xl text-primary mb-2">Horaires de disponibilité</h3>
            <p className="text-on-surface-variant max-w-xl leading-relaxed">
              Définis tes plages horaires hebdomadaires pour qu&apos;elles apparaissent dans le
              formulaire de réservation public.
            </p>
            <p className="text-xs text-outline italic mt-4">À venir</p>
          </div>
        </div>
      </section>
    </>
  );
}
