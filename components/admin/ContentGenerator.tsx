"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Tab = "ideas" | "text" | "visual";
type ContentType = "article" | "evenement" | "instagram" | "email";
type VisualStyle = "botanique" | "naturel" | "minimaliste";
type VisualFormat = "1:1" | "9:16" | "16:9" | "4:5";

interface HistoryItem {
  id: string;
  type: ContentType;
  title: string;
  date: string;
  preview: string;
}

interface FormField {
  key: string;
  label: string;
  type: "text" | "select" | "textarea" | "toggle";
  placeholder?: string;
  options?: string[];
}

const CONTENT_TYPES: { value: ContentType; label: string; emoji: string }[] = [
  { value: "article", label: "Article Journal", emoji: "📝" },
  { value: "evenement", label: "Événement", emoji: "✨" },
  { value: "instagram", label: "Post Instagram", emoji: "📸" },
  { value: "email", label: "Email Newsletter", emoji: "💌" },
];

const FORM_CONFIG: Record<ContentType, FormField[]> = {
  article: [
    { key: "sujet", label: "Sujet de l'article", type: "text", placeholder: "ex: cycle menstruel et alimentation" },
    { key: "angle", label: "Angle / approche spécifique", type: "text", placeholder: "ex: lien entre stress et déséquilibre hormonal" },
    { key: "mots_cles", label: "Mots-clés (séparés par des virgules)", type: "text", placeholder: "ex: naturopathie, hormones, bien-être féminin" },
    { key: "longueur", label: "Longueur", type: "select", options: ["court (~300 mots)", "moyen (~600 mots)", "long (~1000 mots)"] },
  ],
  evenement: [
    { key: "titre", label: "Titre de l'événement", type: "text", placeholder: "ex: Retraite Reiki au chalet" },
    { key: "type_evt", label: "Type d'événement", type: "select", options: ["Soin de groupe", "Retraite", "Rencontre", "Collaboration"] },
    { key: "themes", label: "Thèmes abordés", type: "text", placeholder: "ex: équilibre, lâcher-prise, connexion à la nature" },
    { key: "public", label: "Public cible", type: "text", placeholder: "ex: femmes, tous publics, mères" },
    { key: "duree", label: "Durée", type: "text", placeholder: "ex: 2h30" },
    { key: "prix", label: "Prix", type: "text", placeholder: "ex: 85$" },
  ],
  instagram: [
    { key: "sujet", label: "Sujet du post", type: "text", placeholder: "ex: bienfaits du Reiki sur le sommeil" },
    { key: "humeur", label: "Ton du post", type: "select", options: ["Inspirant", "Éducatif", "Promotionnel", "Personnel"] },
    { key: "hashtags", label: "Inclure des hashtags", type: "toggle" },
  ],
  email: [
    { key: "sujet", label: "Sujet de l'email", type: "text", placeholder: "ex: Nouveau cycle de soins hormonaux" },
    { key: "points_cles", label: "Points clés à aborder", type: "textarea", placeholder: "Listez les points principaux à développer dans l'email..." },
    { key: "type_email", label: "Type d'email", type: "select", options: ["Informatif", "Promotionnel", "Saisonnier"] },
  ],
};

const TYPE_BADGES: Record<ContentType, string> = {
  article: "bg-primary/10 text-primary",
  evenement: "bg-secondary/10 text-secondary",
  instagram: "bg-tertiary-fixed-dim/40 text-[#3e2a00]",
  email: "bg-surface-container-high text-outline",
};

const FORMAT_OPTIONS: { value: VisualFormat; label: string; desc: string }[] = [
  { value: "1:1", label: "Carré", desc: "Instagram post" },
  { value: "9:16", label: "Story", desc: "Instagram / Facebook story" },
  { value: "16:9", label: "Paysage", desc: "Facebook / LinkedIn" },
  { value: "4:5", label: "Portrait", desc: "Pinterest / feed" },
];

const STYLE_OPTIONS: { value: VisualStyle; label: string; desc: string }[] = [
  { value: "botanique", label: "Botanique", desc: "Illustrations, fleurs séchées" },
  { value: "naturel", label: "Naturel", desc: "Photo lumière dorée" },
  { value: "minimaliste", label: "Minimaliste", desc: "Épuré, beaucoup d'espace" },
];

const HISTORY_KEY = "esther_content_history";

export default function ContentGenerator() {
  const [activeTab, setActiveTab] = useState<Tab>("ideas");

  // Ideas
  const [ideasType, setIdeasType] = useState<ContentType>("instagram");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [ideasError, setIdeasError] = useState("");

  // Text
  const [textType, setTextType] = useState<ContentType>("instagram");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [generatedText, setGeneratedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);

  // Visual
  const [visualText, setVisualText] = useState("");
  const [visualStyle, setVisualStyle] = useState<VisualStyle>("botanique");
  const [visualFormat, setVisualFormat] = useState<VisualFormat>("1:1");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingVisual, setLoadingVisual] = useState(false);
  const [predictionId, setPredictionId] = useState("");
  const [visualError, setVisualError] = useState("");

  // History
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  // Poll for visual result
  useEffect(() => {
    if (!predictionId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/ai/visual/status?id=${predictionId}`);
        const data = await res.json();
        if (data.status === "completed" || data.status === "succeeded") {
          setImageUrl(data.imageUrl);
          setLoadingVisual(false);
          setPredictionId("");
          clearInterval(interval);
        } else if (data.status === "failed") {
          setVisualError("La génération a échoué. Réessaie.");
          setLoadingVisual(false);
          setPredictionId("");
          clearInterval(interval);
        }
      } catch {
        setVisualError("Erreur réseau. Réessaie.");
        setLoadingVisual(false);
        setPredictionId("");
        clearInterval(interval);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [predictionId]);

  function saveToHistory(type: ContentType, title: string, preview: string) {
    const item: HistoryItem = {
      id: Date.now().toString(),
      type,
      title,
      date: new Date().toLocaleDateString("fr-CA"),
      preview: preview.slice(0, 90),
    };
    const newHistory = [item, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  }

  async function generateIdeas() {
    setLoadingIdeas(true);
    setIdeas([]);
    setIdeasError("");
    try {
      const res = await fetch("/api/ai/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: ideasType,
          history: history.map((h) => h.title).slice(0, 10),
        }),
      });
      const data = await res.json();
      setIdeas(data.ideas || []);
    } catch {
      setIdeasError("Erreur lors de la génération des idées.");
    }
    setLoadingIdeas(false);
  }

  function selectIdea(idea: string) {
    setTextType(ideasType);
    setFields({ sujet: idea });
    setGeneratedText("");
    setActiveTab("text");
  }

  async function generateText() {
    setGeneratedText("");
    setIsStreaming(true);
    setCopied(false);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: textType, fields }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setGeneratedText((prev) => prev + chunk);
      }
      const title = fields.sujet || fields.titre || "Contenu généré";
      saveToHistory(textType, title, fullText);
    } catch {
      setGeneratedText("Erreur lors de la génération. Réessaie.");
    }
    setIsStreaming(false);
  }

  async function copyText() {
    await navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function sendToVisual() {
    const preview = generatedText.slice(0, 120);
    setVisualText(preview);
    setActiveTab("visual");
  }

  async function generateVisual() {
    setImageUrl("");
    setVisualError("");
    setLoadingVisual(true);
    try {
      const res = await fetch("/api/ai/visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textContext: visualText,
          style: visualStyle,
          format: visualFormat,
          contentType: textType,
        }),
      });
      const data = await res.json();
      if (!data.predictionId) throw new Error("No prediction ID");
      setPredictionId(data.predictionId);
    } catch {
      setVisualError("Erreur lors du lancement de la génération.");
      setLoadingVisual(false);
    }
  }

  async function downloadImage() {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `esther-visuel-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }

  function updateField(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="label-md uppercase tracking-widest text-outline mb-1">Admin</p>
        <h1 className="font-serif text-3xl text-primary">Outil contenu IA</h1>
        <p className="text-outline mt-1">Génère du contenu pour ton site et tes réseaux sociaux.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-surface-container-low rounded-2xl p-1.5">
        {(
          [
            { key: "ideas", label: "💡 Idées" },
            { key: "text", label: "✍️ Texte" },
            { key: "visual", label: "🎨 Visuel" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-400 ${
              activeTab === tab.key
                ? "bg-surface-container-lowest shadow-sm text-primary"
                : "text-outline hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB: IDEAS ──────────────────────────────────────── */}
      {activeTab === "ideas" && (
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
            <p className="text-sm text-outline">Type de contenu</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CONTENT_TYPES.map((ct) => (
                <button
                  key={ct.value}
                  onClick={() => setIdeasType(ct.value)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-400 text-left ${
                    ideasType === ct.value
                      ? "bg-primary text-surface"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="block text-lg mb-1">{ct.emoji}</span>
                  {ct.label}
                </button>
              ))}
            </div>

            <button
              onClick={generateIdeas}
              disabled={loadingIdeas}
              className="w-full py-3 px-6 rounded-full bg-tertiary-fixed-dim text-[#3e2a00] font-medium text-sm hover:scale-[1.02] transition-all duration-400 disabled:opacity-60 disabled:scale-100"
            >
              {loadingIdeas ? "Génération en cours…" : "✨ Suggère 6 idées"}
            </button>
          </div>

          {ideasError && (
            <p className="text-sm text-error text-center">{ideasError}</p>
          )}

          {ideas.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ideas.map((idea, i) => (
                <button
                  key={i}
                  onClick={() => selectIdea(idea)}
                  className="bg-surface-container-low hover:bg-surface-container rounded-2xl p-5 text-left transition-all duration-400 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-tertiary-fixed-dim font-serif text-2xl leading-none mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-on-surface text-sm font-medium leading-snug">{idea}</p>
                      <p className="text-outline text-xs mt-2 group-hover:text-primary transition-colors duration-400">
                        Utiliser cette idée →
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {ideas.length === 0 && !loadingIdeas && (
            <div className="text-center py-12 text-outline">
              <p className="text-4xl mb-3">💡</p>
              <p className="text-sm">Sélectionne un type et clique sur "Suggère 6 idées"</p>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB: TEXTE ──────────────────────────────────────── */}
      {activeTab === "text" && (
        <div className="space-y-6">
          {/* Type selector */}
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
            <p className="text-sm text-outline">Type de contenu</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CONTENT_TYPES.map((ct) => (
                <button
                  key={ct.value}
                  onClick={() => { setTextType(ct.value); setFields({}); setGeneratedText(""); }}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-400 text-left ${
                    textType === ct.value
                      ? "bg-primary text-surface"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="block text-lg mb-1">{ct.emoji}</span>
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic form */}
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
            {FORM_CONFIG[textType].map((field) => (
              <div key={field.key}>
                <label className="block text-sm text-outline mb-1.5">{field.label}</label>
                {field.type === "text" && (
                  <input
                    type="text"
                    value={fields[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-outline/60 outline-none focus:ring-1 focus:ring-primary/30"
                  />
                )}
                {field.type === "select" && (
                  <select
                    value={fields[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary/30"
                  >
                    <option value="">Sélectionner…</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {field.type === "textarea" && (
                  <textarea
                    value={fields[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-outline/60 outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                  />
                )}
                {field.type === "toggle" && (
                  <button
                    onClick={() => updateField(field.key, fields[field.key] === "true" ? "false" : "true")}
                    className={`relative w-11 h-6 rounded-full transition-all duration-400 ${
                      fields[field.key] === "true" ? "bg-primary" : "bg-surface-container-high"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-400 ${
                        fields[field.key] === "true" ? "left-5.5" : "left-0.5"
                      }`}
                    />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={generateText}
              disabled={isStreaming}
              className="w-full py-3 px-6 rounded-full bg-tertiary-fixed-dim text-[#3e2a00] font-medium text-sm hover:scale-[1.02] transition-all duration-400 disabled:opacity-60 disabled:scale-100 mt-2"
            >
              {isStreaming ? "Génération en cours…" : "✨ Générer le contenu"}
            </button>
          </div>

          {/* Generated output */}
          {(generatedText || isStreaming) && (
            <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-on-surface">Contenu généré</p>
                <div className="flex gap-2">
                  {generatedText && !isStreaming && (
                    <>
                      <button
                        onClick={copyText}
                        className="py-1.5 px-4 rounded-full text-xs font-medium bg-surface-container-high hover:bg-surface-container text-on-surface transition-all duration-400"
                      >
                        {copied ? "✓ Copié" : "Copier"}
                      </button>
                      <button
                        onClick={sendToVisual}
                        className="py-1.5 px-4 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-400"
                      >
                        → Créer le visuel
                      </button>
                      <button
                        onClick={generateText}
                        className="py-1.5 px-4 rounded-full text-xs font-medium bg-surface-container-high hover:bg-surface-container text-outline transition-all duration-400"
                      >
                        Regénérer
                      </button>
                    </>
                  )}
                </div>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm text-on-surface leading-relaxed min-h-[120px]">
                {generatedText}
                {isStreaming && <span className="animate-pulse text-primary">▋</span>}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB: VISUEL ─────────────────────────────────────── */}
      {activeTab === "visual" && (
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-5">
            {/* Context text */}
            <div>
              <label className="block text-sm text-outline mb-1.5">Contexte / thème du visuel</label>
              <textarea
                value={visualText}
                onChange={(e) => setVisualText(e.target.value)}
                placeholder="Décris le contenu ou colle l'extrait de texte généré…"
                rows={3}
                className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-outline/60 outline-none focus:ring-1 focus:ring-primary/30 resize-none"
              />
            </div>

            {/* Style */}
            <div>
              <p className="text-sm text-outline mb-2">Style visuel</p>
              <div className="grid grid-cols-3 gap-3">
                {STYLE_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setVisualStyle(s.value)}
                    className={`py-3 px-3 rounded-xl text-left transition-all duration-400 ${
                      visualStyle === s.value
                        ? "bg-primary text-surface"
                        : "bg-surface-container-lowest hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className={`text-xs mt-0.5 ${visualStyle === s.value ? "text-surface/70" : "text-outline"}`}>{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div>
              <p className="text-sm text-outline mb-2">Format</p>
              <div className="grid grid-cols-4 gap-3">
                {FORMAT_OPTIONS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setVisualFormat(f.value)}
                    className={`py-3 px-3 rounded-xl text-left transition-all duration-400 ${
                      visualFormat === f.value
                        ? "bg-primary text-surface"
                        : "bg-surface-container-lowest hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className={`text-xs mt-0.5 ${visualFormat === f.value ? "text-surface/70" : "text-outline"}`}>{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {visualError && (
              <p className="text-sm text-error text-center">{visualError}</p>
            )}
          </div>

          {/* CTA séparé — bien visible */}
          {!loadingVisual && !imageUrl && (
            <div className="bg-primary rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
              <p className="font-serif text-surface text-lg">Prête à créer ton visuel ?</p>
              <p className="text-surface/60 text-sm">
                {visualFormat === "9:16" ? "Story Instagram / Facebook" :
                 visualFormat === "16:9" ? "Post paysage (Facebook / LinkedIn)" :
                 visualFormat === "4:5" ? "Post portrait (Pinterest)" :
                 "Post carré Instagram"} · Style {STYLE_OPTIONS.find(s => s.value === visualStyle)?.label}
              </p>
              <button
                onClick={generateVisual}
                className="mt-1 py-3 px-8 rounded-full bg-tertiary-fixed-dim text-[#3e2a00] font-semibold text-sm hover:scale-[1.02] transition-all duration-400"
              >
                Générer le post →
              </button>
            </div>
          )}

          {/* Loading state */}
          {loadingVisual && (
            <div className="bg-surface-container-low rounded-2xl p-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto" />
              <p className="text-sm text-outline">Nano Banana Pro génère ton visuel…</p>
              <p className="text-xs text-outline/60">Ça prend environ 15–30 secondes</p>
            </div>
          )}

          {/* Result */}
          {imageUrl && !loadingVisual && (
            <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-on-surface">Visuel généré</p>
                <div className="flex gap-2">
                  <button
                    onClick={downloadImage}
                    className="py-1.5 px-4 rounded-full text-xs font-medium bg-primary text-surface hover:bg-primary/90 transition-all duration-400"
                  >
                    ↓ Télécharger
                  </button>
                  <button
                    onClick={generateVisual}
                    className="py-1.5 px-4 rounded-full text-xs font-medium bg-surface-container-high hover:bg-surface-container text-outline transition-all duration-400"
                  >
                    Regénérer
                  </button>
                </div>
              </div>
              <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container">
                <Image
                  src={imageUrl}
                  alt="Visuel généré"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          )}

          {!imageUrl && !loadingVisual && (
            <div className="text-center py-12 text-outline">
              <p className="text-4xl mb-3">🎨</p>
              <p className="text-sm">Configure le style et le format, puis génère ton visuel</p>
            </div>
          )}
        </div>
      )}

      {/* ─── HISTORIQUE ──────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-on-surface">Historique ({history.length})</p>
            <button
              onClick={clearHistory}
              className="text-xs text-outline hover:text-error transition-colors duration-400"
            >
              Effacer tout
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 bg-surface-container-low rounded-xl p-3"
              >
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_BADGES[item.type]}`}>
                  {CONTENT_TYPES.find((ct) => ct.value === item.type)?.label}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-on-surface truncate">{item.title}</p>
                  <p className="text-xs text-outline mt-0.5 line-clamp-1">{item.preview}</p>
                </div>
                <span className="shrink-0 text-xs text-outline">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
