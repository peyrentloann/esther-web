import { cookies } from "next/headers";

const OR_URL = "https://openrouter.ai/api/v1/chat/completions";

const CATEGORY_LABELS: Record<string, string> = {
  instagram: "post Instagram (photo ou graphique)",
  reel: "Réel ou vidéo courte (TikTok / Instagram Reel)",
  story: "Story Instagram ou Facebook",
  evenement: "promotion d'un événement ou retraite bien-être",
  newsletter: "email newsletter pour clientes",
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { category, userIdea, history } = await request.json();
  const label = CATEGORY_LABELS[category] || category;

  // Angles créatifs pour forcer la variété à chaque appel
  const ANGLES = [
    "une anecdote personnelle ou témoignage de cliente",
    "un mythe à déconstruire ou une idée reçue à corriger",
    "un conseil pratique pour la maison ou le quotidien",
    "une question engageante pour créer de l'interaction",
    "un fait surprenant ou peu connu sur le sujet",
    "une routine ou habitude simple à adopter",
    "une comparaison saison / cycle naturel / corps",
    "une émotion ou transformation vécue par une cliente",
    "un outil ou plante méconnu à découvrir",
    "un lien entre Reiki et vie quotidienne moderne",
  ];
  const randomAngle = ANGLES[Math.floor(Math.random() * ANGLES.length)];
  const now = new Date();
  const dateCtx = `Nous sommes le ${now.toLocaleDateString("fr-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;

  const ideaContext = userIdea?.trim()
    ? `Thème suggéré par Esther : "${userIdea}". Développe ce thème de 3 façons créativement différentes.`
    : `Propose 3 idées TOTALEMENT DIFFÉRENTES l'une de l'autre. Angle créatif à explorer pour au moins une idée : ${randomAngle}.`;

  const historyNote =
    history?.length > 0
      ? `\n\nIDÉES DÉJÀ GÉNÉRÉES — ne pas répéter ces sujets ni rien de similaire : ${history.slice(0, 10).join(" | ")}.`
      : "";

  const response = await fetch(OR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5",
      max_tokens: 900,
      temperature: 1.1,
      messages: [
        {
          role: "user",
          content: `Tu es l'assistante d'Esther Laframboise, naturothérapeute et Maître Reiki à Shefford, QC. ${dateCtx} Elle veut créer du contenu pour : ${label}.${historyNote}

${ideaContext}

IMPORTANT : Les 3 idées doivent être distinctes en format ET en sujet. Évite les généralités comme "bienfaits du Reiki" ou "conseil bien-être" — sois précise et originale.

Pour chaque idée, détermine si c'est du contenu "photo", "video" ou "graphic" (infographie/carrousel).

Retourne UNIQUEMENT un tableau JSON de 3 objets, sans markdown. Format exact :
[
  {
    "type": "photo",
    "titre": "Titre court et accrocheur (max 8 mots)",
    "caption": "Début de la caption Instagram (2-3 phrases, ton d'Esther, en français)",
    "visualPrompt": "Description en anglais pour génération d'image IA (décor, ambiance, éléments visuels, max 30 mots)"
  }
]

Pour type "video" : remplace "caption" par "scriptIdea" (idée de script en 1-2 phrases) et "visualPrompt" par null.
Pour type "graphic" : "visualPrompt" décrit l'infographie ou le design.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content?.trim() ?? "[]";

  let ideas = [];
  try {
    const match = raw.match(/\[[\s\S]*\]/);
    ideas = match ? JSON.parse(match[0]) : [];
  } catch {
    ideas = [];
  }

  return Response.json({ ideas });
}
