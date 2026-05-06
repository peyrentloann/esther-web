"use client";

import { useState } from "react";
import { toast } from "sonner";

type Service = "reiki" | "soin-hormonal" | "demandes-speciales" | null;
type Format = "presentiel" | "en-ligne" | null;

interface BookingData {
  service: Service;
  format: Format;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

const SERVICES = [
  { id: "reiki" as const, label: "Reiki", sub: "Harmonisation énergétique", icon: "✦" },
  { id: "soin-hormonal" as const, label: "Soin Hormonal", sub: "Équilibre & Féminité", icon: "♀" },
  { id: "demandes-speciales" as const, label: "Demande spéciale", sub: "Accompagnement musical & soins", icon: "🕊️" },
];

const FORMATS = [
  { id: "presentiel" as const, label: "En présentiel", sub: "📍 Shefford, QC", address: "Shefford, Québec" },
  { id: "en-ligne" as const, label: "En ligne", sub: "Via Zoom", address: null },
];

const HOURS = ["9h00", "10h00", "10h30", "11h00", "13h30", "14h00", "15h00", "15h30", "16h30"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const DAYS_FR = ["D", "L", "M", "M", "J", "V", "S"];

export default function BookingForm({ defaultService }: { defaultService?: string }) {
  const today = new Date();
  const [step, setStep] = useState(1);
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [done, setDone] = useState(false);

  const [data, setData] = useState<BookingData>({
    service: (defaultService as Service) || null,
    format: null,
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    consent: false,
  });

  const progress = (step / 5) * 100;

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // Placeholder — will connect to Supabase
    console.log("Booking submitted:", data);
    toast.success("Rendez-vous confirmé! Vous recevrez un email de confirmation.");
    setDone(true);
  };

  if (done) {
    return (
      <div className="w-full max-w-[600px] mx-auto bg-surface-container-lowest rounded-3xl shadow-[0_40px_80px_-20px_rgba(21,51,40,0.08)] overflow-hidden p-12 text-center space-y-6">
        <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto text-4xl">
          ✓
        </div>
        <h2 className="font-serif text-3xl text-primary">Rendez-vous confirmé!</h2>
        <p className="text-on-surface-variant">
          Merci {data.name}. Un email de confirmation a été envoyé à {data.email}.
        </p>
        <div className="bg-surface-container p-6 rounded-2xl text-left space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-outline uppercase tracking-wider text-xs font-semibold">Service</span>
            <span className="text-primary font-medium capitalize">{data.service?.replace("-", " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline uppercase tracking-wider text-xs font-semibold">Format</span>
            <span className="text-primary font-medium capitalize">{data.format?.replace("-", " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline uppercase tracking-wider text-xs font-semibold">Date</span>
            <span className="text-primary font-medium">{data.date} à {data.time}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => {
              const [y, m, d] = data.date.split("-");
              const [h, min] = data.time.replace("h", ":").split(":");
              const start = `${y}${m}${d}T${h.padStart(2, "0")}${(min || "00")}00`;
              window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Soin+avec+Esther+Laframboise&dates=${start}/${start}&details=Soin+${data.service}&location=${data.format === "presentiel" ? "Shefford,+QC" : "Zoom"}`, "_blank");
            }}
            className="text-sm text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Ajouter à mon calendrier →
          </button>
          <a href="/" className="text-sm text-outline hover:text-on-surface transition-colors">
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[600px] mx-auto bg-surface-container-lowest rounded-3xl shadow-[0_40px_80px_-20px_rgba(21,51,40,0.08)] overflow-hidden flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-variant">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-8 md:p-12 flex-1">
        {/* Step header */}
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-outline font-label">
            Étape {step} sur 5
          </span>
          <h2 className="font-serif text-3xl mt-2 text-primary">
            {step === 1 && "Choisir un soin"}
            {step === 2 && "Choisir le format"}
            {step === 3 && "Choisir une date"}
            {step === 4 && "Tes coordonnées"}
            {step === 5 && "Confirmation"}
          </h2>
        </div>

        {/* Step 1 — Service */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setData({ ...data, service: s.id })}
                className={`relative group cursor-pointer border-2 rounded-xl p-6 transition-all ${
                  data.service === s.id
                    ? "border-primary bg-surface-container-low"
                    : "border-transparent bg-surface-container-low hover:border-outline-variant hover:bg-surface-container-high"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      data.service === s.id
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-highest text-primary"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold">{s.label}</h4>
                    <p className="text-xs text-on-surface-variant mt-1 italic">{s.sub}</p>
                  </div>
                </div>
                {data.service === s.id && (
                  <div className="absolute top-3 right-3 text-primary">✓</div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Format */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setData({ ...data, format: f.id })}
                className={`relative group cursor-pointer border-2 rounded-xl p-6 transition-all ${
                  data.format === f.id
                    ? "border-primary bg-surface-container-low"
                    : "border-transparent bg-surface-container-low hover:border-outline-variant hover:bg-surface-container-high"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-3xl">{f.id === "presentiel" ? "🏡" : "💻"}</div>
                  <div>
                    <h4 className="font-serif text-lg font-bold">{f.label}</h4>
                    <p className="text-xs text-on-surface-variant mt-1">{f.sub}</p>
                    {data.format === f.id && f.address && (
                      <p className="text-xs text-primary mt-2 font-medium">{f.address}</p>
                    )}
                  </div>
                </div>
                {data.format === f.id && (
                  <div className="absolute top-3 right-3 text-primary">✓</div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 3 — Date & Heure */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-surface-container rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => {
                    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                    else setCalMonth(calMonth - 1);
                  }}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  ‹
                </button>
                <h3 className="font-serif text-lg">
                  {MONTHS_FR[calMonth]} {calYear}
                </h3>
                <button
                  onClick={() => {
                    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                    else setCalMonth(calMonth + 1);
                  }}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-3">
                {DAYS_FR.map((d) => (
                  <div key={d} className="text-center text-xs text-outline font-bold py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: getFirstDayOfMonth(calYear, calMonth) }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: getDaysInMonth(calYear, calMonth) }, (_, i) => i + 1).map((day) => {
                  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isPast = new Date(dateStr) < new Date(today.toDateString());
                  const isSelected = data.date === dateStr;
                  const isToday = dateStr === today.toISOString().split("T")[0];

                  return (
                    <button
                      key={day}
                      disabled={isPast}
                      onClick={() => setData({ ...data, date: dateStr, time: "" })}
                      className={`w-9 h-9 mx-auto flex items-center justify-center rounded-full text-sm transition-colors ${
                        isSelected
                          ? "bg-primary text-on-primary font-medium"
                          : isPast
                          ? "text-outline-variant cursor-not-allowed line-through"
                          : isToday
                          ? "ring-2 ring-primary text-primary hover:bg-surface-container-highest"
                          : "hover:bg-surface-container-highest"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            {data.date && (
              <div className="grid grid-cols-3 gap-3">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setData({ ...data, time: h })}
                    className={`py-3 px-4 rounded-full text-sm transition-all ${
                      data.time === h
                        ? "bg-primary text-on-primary font-medium"
                        : "border border-outline-variant hover:bg-primary-container hover:text-on-primary-container"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 4 — Coordonnées */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Marie Tremblay"
                className="w-full bg-surface-container rounded-xl px-5 py-4 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">
                Adresse courriel *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="marie@exemple.com"
                className="w-full bg-surface-container rounded-xl px-5 py-4 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="450-XXX-XXXX"
                className="w-full bg-surface-container rounded-xl px-5 py-4 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => setData({ ...data, consent: e.target.checked })}
                className="mt-1 accent-primary"
              />
              <span className="text-sm text-on-surface-variant leading-relaxed">
                J&apos;accepte de recevoir la newsletter d&apos;Esther Laframboise (facultatif)
              </span>
            </label>
            <p className="text-xs text-outline italic">
              🔒 Tes informations ne seront jamais partagées.
            </p>
          </div>
        )}

        {/* Step 5 — Récapitulatif */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="bg-surface-container p-6 rounded-2xl space-y-4 text-sm">
              {[
                { label: "Service", value: data.service?.replace("-", " ") },
                { label: "Format", value: data.format?.replace("-", " ") },
                { label: "Date", value: data.date },
                { label: "Heure", value: data.time },
                { label: "Nom", value: data.name },
                { label: "Courriel", value: data.email },
                { label: "Téléphone", value: data.phone || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-outline-variant/10 last:border-0">
                  <span className="text-outline uppercase tracking-wider text-xs font-semibold">
                    {label}
                  </span>
                  <span className="text-primary font-medium capitalize">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-on-surface-variant text-center">
              En confirmant, tu recevras un email de confirmation à l&apos;adresse fournie.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-auto">
        {step < 5 ? (
          <div className="flex">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 py-5 px-8 text-sm uppercase tracking-[0.2em] font-label text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
              >
                ← Retour
              </button>
            )}
            <button
              onClick={nextStep}
              disabled={
                (step === 1 && !data.service) ||
                (step === 2 && !data.format) ||
                (step === 3 && (!data.date || !data.time)) ||
                (step === 4 && (!data.name || !data.email))
              }
              className="flex-1 bg-primary text-on-primary py-5 px-8 text-sm uppercase tracking-[0.25em] font-label flex items-center justify-center gap-4 hover:bg-primary/95 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer →
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              onClick={prevStep}
              className="flex-1 py-5 px-8 text-sm uppercase tracking-[0.2em] font-label text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              ← Retour
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-primary text-on-primary py-5 px-8 text-sm uppercase tracking-[0.25em] font-label flex items-center justify-center gap-4 hover:bg-primary/95 transition-all active:scale-[0.98]"
            >
              Confirmer mon rendez-vous ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
