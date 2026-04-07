import { Suspense } from "react";
import BookingFormWrapper from "@/components/BookingFormWrapper";

export const metadata = {
  title: "Prendre rendez-vous — Esther Laframboise",
  description: "Réservez votre soin Reiki ou accompagnement hormonal avec Esther Laframboise à Shefford, QC.",
};

export default function RendezVous() {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-20 px-6 flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-outline font-label block mb-3">
          Esther Laframboise
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">Réserver un moment</h1>
        <p className="text-on-surface-variant mt-4 text-lg">
          Shefford, QC · Présentiel ou en ligne
        </p>
      </div>
      <Suspense fallback={<div className="w-full max-w-[600px] h-96 bg-surface-container-low rounded-3xl animate-pulse" />}>
        <BookingFormWrapper />
      </Suspense>
    </main>
  );
}
