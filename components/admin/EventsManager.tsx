"use client";

import { useState } from "react";

type EventStatus = "upcoming" | "past" | "full";
type Category = "Soin de groupe" | "Retraite" | "Rencontre" | "Collaboration";

interface Event {
  id: string;
  title: string;
  category: Category;
  description: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  maxSpots: number;
  spotsUsed: number;
  price: string;
  published: boolean;
  registrants: Registrant[];
}

interface Registrant {
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
}

const INITIAL_EVENTS: Event[] = [
  {
    id: "1",
    title: "Cercle de Reiki & Sons Sacrés",
    category: "Soin de groupe",
    description: "Une soirée pour se reconnecter à soi-même à travers le Reiki et les sons vibratoires.",
    date: "2026-04-12",
    timeStart: "18:30",
    timeEnd: "20:30",
    location: "Studio Namaste, Shefford",
    maxSpots: 12,
    spotsUsed: 9,
    price: "45",
    published: true,
    registrants: [
      { name: "Marie-Eve L.", email: "marie@email.com", phone: "450-123-4567", registeredAt: "2026-03-15" },
      { name: "Sophie G.", email: "sophie@email.com", phone: "450-234-5678", registeredAt: "2026-03-18" },
      { name: "Julie R.", email: "julie@email.com", phone: "450-345-6789", registeredAt: "2026-03-20" },
    ],
  },
  {
    id: "2",
    title: "L'Éveil des Sens en Forêt",
    category: "Retraite",
    description: "Un week-end de retraite immersive en pleine nature pour se ressourcer profondément.",
    date: "2026-05-02",
    timeStart: "09:00",
    timeEnd: "17:00",
    location: "Domaine des Pins, Estrie",
    maxSpots: 10,
    spotsUsed: 2,
    price: "480",
    published: true,
    registrants: [
      { name: "Catherine M.", email: "catherine@email.com", phone: "450-456-7890", registeredAt: "2026-03-22" },
    ],
  },
  {
    id: "3",
    title: "Herboristerie & Cycle Féminin",
    category: "Collaboration",
    description: "Un atelier collaboratif pour explorer les plantes médicinales et leur lien avec les cycles féminins.",
    date: "2026-05-18",
    timeStart: "14:00",
    timeEnd: "17:00",
    location: "Atelier Flore, Montréal",
    maxSpots: 20,
    spotsUsed: 10,
    price: "65",
    published: false,
    registrants: [],
  },
];

const CATEGORIES: Category[] = ["Soin de groupe", "Retraite", "Rencontre", "Collaboration"];

const EMPTY_FORM = {
  title: "",
  category: "Soin de groupe" as Category,
  description: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  location: "",
  maxSpots: 12,
  price: "",
  published: false,
};

function getStatus(event: Event): EventStatus {
  if (event.spotsUsed >= event.maxSpots) return "full";
  if (new Date(event.date) < new Date()) return "past";
  return "upcoming";
}

const STATUS_LABELS: Record<EventStatus, { label: string; classes: string }> = {
  upcoming: { label: "À venir", classes: "bg-primary-fixed text-primary" },
  past: { label: "Passé", classes: "bg-surface-container-high text-outline" },
  full: { label: "Complet", classes: "bg-error-container text-error" },
};

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [modal, setModal] = useState<"create" | "edit" | "registrants" | "delete" | null>(null);
  const [selected, setSelected] = useState<Event | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setSelected(null);
    setModal("create");
  };

  const openEdit = (event: Event) => {
    setSelected(event);
    setForm({
      title: event.title,
      category: event.category,
      description: event.description,
      date: event.date,
      timeStart: event.timeStart,
      timeEnd: event.timeEnd,
      location: event.location,
      maxSpots: event.maxSpots,
      price: event.price,
      published: event.published,
    });
    setModal("edit");
  };

  const openRegistrants = (event: Event) => {
    setSelected(event);
    setModal("registrants");
  };

  const openDelete = (event: Event) => {
    setSelected(event);
    setModal("delete");
  };

  const handleSave = () => {
    if (modal === "create") {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...form,
        spotsUsed: 0,
        registrants: [],
      };
      setEvents([...events, newEvent]);
    } else if (modal === "edit" && selected) {
      setEvents(events.map((e) => e.id === selected.id ? { ...e, ...form } : e));
    }
    setModal(null);
  };

  const handleDelete = () => {
    if (selected) setEvents(events.filter((e) => e.id !== selected.id));
    setModal(null);
  };

  const togglePublished = (id: string) => {
    setEvents(events.map((e) => e.id === id ? { ...e, published: !e.published } : e));
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h2 className="font-serif text-4xl text-primary mb-2">Événements & Retraites</h2>
          <p className="text-outline">{events.length} événements au total</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-primary text-on-primary px-6 py-3 rounded-full font-medium hover:scale-105 transition-all flex items-center gap-2"
        >
          + Créer un événement
        </button>
      </header>

      {/* Liste */}
      <div className="space-y-4">
        {events.map((event) => {
          const status = getStatus(event);
          const spotsLeft = event.maxSpots - event.spotsUsed;
          const fillPct = Math.round((event.spotsUsed / event.maxSpots) * 100);

          return (
            <div
              key={event.id}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(21,51,40,0.06)] flex flex-col md:flex-row md:items-center gap-6"
            >
              {/* Infos principales */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${STATUS_LABELS[status].classes}`}>
                    {STATUS_LABELS[status].label}
                  </span>
                  <span className="text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant font-medium">
                    {event.category}
                  </span>
                  {!event.published && (
                    <span className="text-xs bg-tertiary-fixed/40 text-tertiary px-3 py-1 rounded-full font-medium">
                      Brouillon
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl text-primary">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
                  <span>📅 {event.date} · {event.timeStart}–{event.timeEnd}</span>
                  <span>📍 {event.location}</span>
                  <span>💳 {event.price}$</span>
                </div>
              </div>

              {/* Places */}
              <div className="w-40 shrink-0">
                <div className="flex justify-between text-xs text-outline mb-1">
                  <span>{event.spotsUsed} inscrits</span>
                  <span>{event.maxSpots} places</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fillPct >= 100 ? "bg-error" : fillPct >= 80 ? "bg-tertiary-fixed-dim" : "bg-primary-fixed-dim"
                    }`}
                    style={{ width: `${Math.min(fillPct, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-outline mt-1">
                  {spotsLeft > 0 ? `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}` : "Complet"}
                </p>
              </div>

              {/* Toggle publié */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePublished(event.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    event.published ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                      event.published ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-xs text-outline">{event.published ? "Publié" : "Masqué"}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openRegistrants(event)}
                  className="text-xs bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-full transition-colors font-medium"
                >
                  👥 {event.registrants.length} inscrits
                </button>
                <button
                  onClick={() => openEdit(event)}
                  className="text-xs bg-primary-fixed hover:bg-primary-fixed-dim px-4 py-2 rounded-full transition-colors font-medium text-primary"
                >
                  Modifier
                </button>
                <button
                  onClick={() => openDelete(event)}
                  className="text-xs text-error hover:bg-error-container px-3 py-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modal Créer / Modifier ── */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif text-2xl text-primary">
                  {modal === "create" ? "Créer un événement" : "Modifier l'événement"}
                </h3>
                <button onClick={() => setModal(null)} className="text-outline hover:text-on-surface text-xl">✕</button>
              </div>

              <div className="space-y-5">
                {/* Titre */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Titre *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Cercle de Reiki & Sons Sacrés"
                    className="w-full bg-surface-container rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                    className="w-full bg-surface-container rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    placeholder="Décris l'événement..."
                    className="w-full bg-surface-container rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                  />
                </div>

                {/* Date + heures */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-surface-container rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Début</label>
                    <input
                      type="time"
                      value={form.timeStart}
                      onChange={(e) => setForm({ ...form, timeStart: e.target.value })}
                      className="w-full bg-surface-container rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Fin</label>
                    <input
                      type="time"
                      value={form.timeEnd}
                      onChange={(e) => setForm({ ...form, timeEnd: e.target.value })}
                      className="w-full bg-surface-container rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                {/* Lieu */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Lieu</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Studio Namaste, Shefford"
                    className="w-full bg-surface-container rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                {/* Places + Prix */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Places max</label>
                    <input
                      type="number"
                      value={form.maxSpots}
                      onChange={(e) => setForm({ ...form, maxSpots: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface-container rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-outline block mb-2">Prix ($)</label>
                    <input
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="45"
                      className="w-full bg-surface-container rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                {/* Publié */}
                <label className="flex items-center gap-4 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, published: !form.published })}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      form.published ? "bg-primary" : "bg-outline-variant"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                        form.published ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                  <span className="font-medium text-on-surface">
                    {form.published ? "Publié sur le site" : "Brouillon (non visible)"}
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.title || !form.date}
                  className="flex-1 py-3 rounded-full bg-primary text-on-primary font-medium hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {modal === "create" ? "Créer l'événement" : "Enregistrer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Inscrits ── */}
      {modal === "registrants" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-serif text-2xl text-primary">Inscrits</h3>
                <button onClick={() => setModal(null)} className="text-outline hover:text-on-surface text-xl">✕</button>
              </div>
              <p className="text-outline text-sm mb-8">{selected.title}</p>

              {selected.registrants.length === 0 ? (
                <p className="text-center text-outline italic py-12">Aucun inscrit pour l&apos;instant</p>
              ) : (
                <div className="space-y-3">
                  {selected.registrants.map((r, i) => (
                    <div key={i} className="bg-surface-container p-5 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-medium text-primary">{r.name}</p>
                        <p className="text-sm text-outline">{r.email} · {r.phone}</p>
                      </div>
                      <p className="text-xs text-outline">{r.registeredAt}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/10">
                <p className="text-sm text-outline">
                  {selected.registrants.length} / {selected.maxSpots} places
                </p>
                {selected.registrants.length > 0 && (
                  <button className="text-xs bg-primary-fixed text-primary px-4 py-2 rounded-full hover:bg-primary-fixed-dim transition-colors font-medium">
                    Exporter CSV
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Suppression ── */}
      {modal === "delete" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="font-serif text-xl text-primary mb-2">Supprimer cet événement?</h3>
            <p className="text-on-surface-variant text-sm mb-8">
              &ldquo;{selected.title}&rdquo; sera définitivement supprimé.
              {selected.registrants.length > 0 && (
                <span className="block mt-2 text-error font-medium">
                  ⚠️ {selected.registrants.length} inscrit(s) seront affectés.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-full bg-error text-on-error font-medium hover:scale-105 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
