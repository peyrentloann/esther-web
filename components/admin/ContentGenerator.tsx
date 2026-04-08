"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Category = "instagram" | "reel" | "story" | "evenement" | "newsletter";
type IdeaType = "photo" | "video" | "graphic";
type VisualStyle = "botanique" | "naturel" | "minimaliste";
type VisualFormat = "1:1" | "9:16" | "16:9" | "4:5";

interface Idea {
  type: IdeaType;
  titre: string;
  caption?: string;
  scriptIdea?: string;
  visualPrompt?: string | null;
}

interface HistoryItem {
  titre: string;
  date: string;
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  titre: string;
  category: string;
  format: string;
  date: string;
}

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "instagram", label: "Post Instagram", emoji: "📸" },
  { value: "reel", label: "Réel / Vidéo", emoji: "🎬" },
  { value: "story", label: "Story", emoji: "✨" },
  { value: "evenement", label: "Événement", emoji: "🌿" },
  { value: "newsletter", label: "Newsletter", emoji: "💌" },
];

const FORMAT_OPTIONS: { value: VisualFormat; label: string; sub: string }[] = [
  { value: "1:1", label: "Carré", sub: "Post" },
  { value: "9:16", label: "Story", sub: "9:16" },
  { value: "16:9", label: "Paysage", sub: "16:9" },
  { value: "4:5", label: "Portrait", sub: "4:5" },
];

const STYLE_OPTIONS: { value: VisualStyle; label: string }[] = [
  { value: "botanique", label: "Botanique" },
  { value: "naturel", label: "Naturel" },
  { value: "minimaliste", label: "Minimaliste" },
];

const STYLE_SUFFIX: Record<VisualStyle, string> = {
  botanique: "botanical pressed flowers herbs organic paper textures warm earthy cream tones",
  naturel: "natural soft golden daylight organic linen materials terracotta tones",
  minimaliste: "minimalist clean composition generous white space elegant serif typography",
};

const TYPE_CONFIG: Record<IdeaType, { emoji: string; label: string; color: string }> = {
  photo: { emoji: "📸", label: "Photo", color: "bg-primary/10 text-primary" },
  video: { emoji: "🎬", label: "Vidéo", color: "bg-secondary/10 text-secondary" },
  graphic: { emoji: "🎨", label: "Graphique", color: "bg-tertiary-fixed-dim/40 text-[#3e2a00]" },
};

const HISTORY_KEY = "esther_content_history";
const GALLERY_KEY = "esther_visual_gallery";

export default function ContentGenerator() {
  const [category, setCategory] = useState<Category>("instagram");
  const [userIdea, setUserIdea] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Visual state per idea index
  const [expandedVisual, setExpandedVisual] = useState<number | null>(null);
  const [visualFormat, setVisualFormat] = useState<VisualFormat>("1:1");
  const [visualStyle, setVisualStyle] = useState<VisualStyle>("botanique");
  const [loadingVisual, setLoadingVisual] = useState(false);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [visualError, setVisualError] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
      const savedGallery = localStorage.getItem(GALLERY_KEY);
      if (savedGallery) setGallery(JSON.parse(savedGallery));
    } catch { /* ignore */ }
  }, []);

  // Poll visual result
  useEffect(() => {
    if (!predictionId || expandedVisual === null) return;
    const ideaIndex = expandedVisual;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/ai/visual/status?id=${predictionId}`);
        const data = await res.json();
        if (data.status === "completed" || data.status === "succeeded") {
          setProgress(100);
          setProgressMsg("Image prête ✓");
          const url = data.imageUrl;
          const idea = ideas[ideaIndex];
          if (url && idea) saveToGallery(url, idea.titre, visualFormat);
          setTimeout(() => {
            setGeneratedImages((prev) => ({ ...prev, [ideaIndex]: url }));
            setLoadingVisual(false);
            setPredictionId(null);
          }, 400);
          clearInterval(interval);
        } else if (data.status === "failed") {
          setVisualError("Génération échouée. Réessaie.");
          setLoadingVisual(false);
          setPredictionId(null);
          clearInterval(interval);
        }
      } catch {
        setVisualError("Erreur réseau.");
        setLoadingVisual(false);
        setPredictionId(null);
        clearInterval(interval);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [predictionId, expandedVisual]);

  // Animate progress bar while loading visual
  const PROGRESS_STEPS = [
    { at: 2,  msg: "Initialisation du modèle…" },
    { at: 15, msg: "Composition du visuel…" },
    { at: 40, msg: "Ajout des détails botaniques…" },
    { at: 65, msg: "Affinage des couleurs…" },
    { at: 82, msg: "Finalisation de l'image…" },
    { at: 90, msg: "Presque prêt…" },
  ];
  useEffect(() => {
    if (!loadingVisual) { setProgress(0); setProgressMsg(""); return; }
    setProgress(2);
    setProgressMsg(PROGRESS_STEPS[0].msg);
    // Advance through steps over ~28 seconds total, slow down near 90%
    const timings = [3000, 6000, 5000, 5000, 5000];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    PROGRESS_STEPS.slice(1).forEach((step, i) => {
      const delay = timings.slice(0, i + 1).reduce((a, b) => a + b, 0);
      timeouts.push(setTimeout(() => {
        setProgress(step.at);
        setProgressMsg(step.msg);
      }, delay));
    });
    return () => timeouts.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingVisual]);

  function saveToHistory(titre: string) {
    const item: HistoryItem = {
      titre,
      date: new Date().toLocaleDateString("fr-CA"),
    };
    const updated = [item, ...history].slice(0, 15);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  }

  function saveToGallery(imageUrl: string, titre: string, format: string) {
    const item: GalleryItem = {
      id: Date.now().toString(),
      imageUrl,
      titre,
      category,
      format,
      date: new Date().toLocaleDateString("fr-CA"),
    };
    setGallery((prev) => {
      const updated = [item, ...prev];
      localStorage.setItem(GALLERY_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function deleteFromGallery(id: string) {
    setGallery((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      localStorage.setItem(GALLERY_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  async function generateIdeas() {
    setLoading(true);
    setIdeas([]);
    setError("");
    setExpandedVisual(null);
    setGeneratedImages({});
    try {
      const res = await fetch("/api/ai/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          userIdea,
          history: history.map((h) => h.titre).slice(0, 6),
        }),
      });
      const data = await res.json();
      if (!data.ideas?.length) throw new Error("Aucune idée retournée");
      setIdeas(data.ideas);
      data.ideas.forEach((idea: Idea) => saveToHistory(idea.titre));
    } catch {
      setError("Erreur lors de la génération. Réessaie.");
    }
    setLoading(false);
  }

  async function generateVisual(idea: Idea, index: number) {
    setVisualError("");
    setLoadingVisual(true);
    setGeneratedImages((prev) => { const n = { ...prev }; delete n[index]; return n; });

    const styleDesc = STYLE_SUFFIX[visualStyle];
    const prompt = `${idea.visualPrompt || idea.titre}. ${styleDesc}. Warm earthy cream palette deep forest green accents soft gold touches. High-end French Canadian wellness brand. Professional serene inviting. No text overlay.`;

    try {
      const res = await fetch("/api/ai/visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textContext: prompt,
          style: visualStyle,
          format: visualFormat,
          contentType: category,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.predictionId) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setPredictionId(data.predictionId);
    } catch (e) {
      setVisualError(`Erreur : ${e instanceof Error ? e.message : "inconnue"}`);
      setLoadingVisual(false);
    }
  }

  async function downloadImage(url: string, index: number) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objUrl;
      a.download = `esther-post-${index + 1}-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(objUrl);
    } catch {
      window.open(url, "_blank");
    }
  }

  function toggleVisual(index: number) {
    if (expandedVisual === index) {
      setExpandedVisual(null);
    } else {
      setExpandedVisual(index);
      setVisualError("");
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="label-md uppercase tracking-widest text-outline mb-1">Admin</p>
        <h1 className="font-serif text-3xl text-primary">Créer du contenu</h1>
        <p className="text-outline mt-1 text-sm">Pour tes réseaux sociaux et communications.</p>
      </div>

      {/* Step 1 — Setup */}
      <div className="bg-surface-container-low rounded-2xl p-6 space-y-5">
        {/* Category */}
        <div>
          <p className="text-sm text-outline mb-3">Type de contenu</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-400 ${
                  category === cat.value
                    ? "bg-primary text-surface"
                    : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional idea */}
        <div>
          <label className="block text-sm text-outline mb-1.5">
            Ton idée générale <span className="text-outline/50">(optionnel — laisse vide pour des suggestions)</span>
          </label>
          <input
            type="text"
            value={userIdea}
            onChange={(e) => setUserIdea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateIdeas()}
            placeholder="ex: bienfaits du Reiki sur le sommeil, ma retraite de juin…"
            className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-outline/50 outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <button
          onClick={generateIdeas}
          disabled={loading}
          className="w-full py-3 px-6 rounded-full bg-tertiary-fixed-dim text-[#3e2a00] font-semibold text-sm hover:scale-[1.02] transition-all duration-400 disabled:opacity-60 disabled:scale-100"
        >
          {loading ? "Génération des idées…" : "✨ Générer 3 idées"}
        </button>

        {error && <p className="text-sm text-error text-center">{error}</p>}
      </div>

      {/* Step 2 — Ideas */}
      {ideas.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-outline px-1">3 idées générées — clique sur une idée pour créer le visuel</p>
          {ideas.map((idea, i) => {
            const cfg = TYPE_CONFIG[idea.type] || TYPE_CONFIG.photo;
            const isExpanded = expandedVisual === i;
            const imgUrl = generatedImages[i];
            const canVisual = idea.type !== "video" && idea.visualPrompt !== null;

            return (
              <div key={i} className="bg-surface-container-low rounded-2xl overflow-hidden">
                {/* Idea card */}
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.color}`}>
                      {cfg.emoji} {cfg.label}
                    </span>
                  </div>
                  <p className="font-serif text-on-surface text-lg mt-3 leading-snug">{idea.titre}</p>

                  {idea.caption && (
                    <p className="text-sm text-outline mt-2 leading-relaxed line-clamp-2 italic">
                      "{idea.caption}"
                    </p>
                  )}
                  {idea.scriptIdea && (
                    <p className="text-sm text-outline mt-2 leading-relaxed">
                      💡 {idea.scriptIdea}
                    </p>
                  )}

                  {canVisual && (
                    <button
                      onClick={() => toggleVisual(i)}
                      className={`mt-4 py-2 px-5 rounded-full text-sm font-medium transition-all duration-400 ${
                        isExpanded
                          ? "bg-primary text-surface"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {isExpanded ? "✕ Fermer" : "🎨 Créer le visuel"}
                    </button>
                  )}
                </div>

                {/* Visual panel — inline expand */}
                {isExpanded && canVisual && (
                  <div className="border-t border-outline-variant/15 bg-surface-container-lowest p-5 space-y-4">
                    {/* Format + Style */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-outline mb-2">Format</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {FORMAT_OPTIONS.map((f) => (
                            <button
                              key={f.value}
                              onClick={() => setVisualFormat(f.value)}
                              className={`py-2 px-2 rounded-xl text-xs font-medium transition-all duration-400 ${
                                visualFormat === f.value
                                  ? "bg-primary-fixed text-primary"
                                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                              }`}
                            >
                              {f.label}
                              <span className={`block text-[10px] mt-0.5 ${visualFormat === f.value ? "text-primary/60" : "text-outline"}`}>{f.sub}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-outline mb-2">Style</p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {STYLE_OPTIONS.map((s) => (
                            <button
                              key={s.value}
                              onClick={() => setVisualStyle(s.value)}
                              className={`py-2 px-3 rounded-xl text-xs font-medium transition-all duration-400 text-left ${
                                visualStyle === s.value
                                  ? "bg-primary-fixed text-primary"
                                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    {!loadingVisual && !imgUrl && (
                      <button
                        onClick={() => generateVisual(idea, i)}
                        className="w-full py-3 rounded-full bg-tertiary-fixed-dim text-[#3e2a00] font-semibold text-sm hover:scale-[1.02] transition-all duration-400"
                      >
                        Générer le post →
                      </button>
                    )}

                    {visualError && (
                      <p className="text-sm text-error text-center">{visualError}</p>
                    )}

                    {/* Loading */}
                    {loadingVisual && (
                      <div className="py-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-outline">{progressMsg}</p>
                          <p className="text-xs font-medium text-primary">{progress}%</p>
                        </div>
                        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-fixed rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-outline/50 text-center">Nano Banana Pro génère ton image…</p>
                      </div>
                    )}

                    {/* Result */}
                    {imgUrl && (
                      <div className="space-y-3">
                        <div className="rounded-xl overflow-hidden">
                          <Image
                            src={imgUrl}
                            alt={idea.titre}
                            width={800}
                            height={800}
                            className="w-full h-auto"
                            unoptimized
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadImage(imgUrl, i)}
                            className="flex-1 py-2 rounded-full bg-primary text-surface text-sm font-medium hover:bg-primary/90 transition-all duration-400"
                          >
                            ↓ Télécharger
                          </button>
                          <button
                            onClick={() => generateVisual(idea, i)}
                            className="py-2 px-4 rounded-full bg-surface-container text-outline text-sm hover:bg-surface-container-high transition-all duration-400"
                          >
                            Regénérer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Regénérer 3 nouvelles idées */}
          <button
            onClick={generateIdeas}
            disabled={loading}
            className="w-full py-2.5 rounded-full border border-outline-variant/30 text-outline text-sm hover:bg-surface-container-low transition-all duration-400 disabled:opacity-50"
          >
            ↺ Générer 3 autres idées
          </button>
        </div>
      )}

      {/* Empty state */}
      {ideas.length === 0 && !loading && (
        <div className="text-center py-16 text-outline space-y-2">
          <p className="text-5xl">✨</p>
          <p className="text-sm">Sélectionne un type de contenu et génère des idées</p>
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-outline-variant/15">
          <button
            onClick={() => setGalleryOpen((o) => !o)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-on-surface">🖼️ Mes visuels</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{gallery.length}</span>
            </div>
            <span className="text-outline text-xs">{galleryOpen ? "▲ Réduire" : "▼ Voir tout"}</span>
          </button>

          {galleryOpen && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((item) => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden bg-surface-container aspect-square">
                  <Image
                    src={item.imageUrl}
                    alt={item.titre}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => deleteFromGallery(item.id)}
                        className="w-7 h-7 rounded-full bg-white/20 text-white text-xs flex items-center justify-center hover:bg-error/80 transition-colors duration-300"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-white text-xs font-medium line-clamp-2 leading-tight">{item.titre}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">{item.format}</span>
                        <span className="text-[10px] text-white/60">{item.date}</span>
                      </div>
                      <button
                        onClick={() => downloadImage(item.imageUrl, parseInt(item.id))}
                        className="w-full py-1.5 rounded-full bg-tertiary-fixed-dim text-[#3e2a00] text-xs font-medium hover:scale-[1.02] transition-all duration-400"
                      >
                        ↓ Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-outline-variant/15">
          <div className="flex justify-between items-center">
            <p className="text-xs text-outline">Récemment généré</p>
            <button
              onClick={() => { setHistory([]); localStorage.removeItem(HISTORY_KEY); }}
              className="text-xs text-outline/50 hover:text-error transition-colors duration-400"
            >
              Effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 8).map((h, i) => (
              <span key={i} className="text-xs bg-surface-container-low text-outline px-3 py-1 rounded-full">
                {h.titre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
