import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TYPE_LABELS: Record<string, string> = {
  article: "article de blog sur la naturopathie / santé hormonale / bien-être",
  evenement: "description d'événement (retraite, soin de groupe, rencontre bien-être)",
  instagram: "post Instagram pour praticienne en bien-être",
  email: "email newsletter pour clientes en naturopathie",
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { type, history } = await request.json();
  const label = TYPE_LABELS[type] || type;
  const historyNote =
    history && history.length > 0
      ? `\n\nSujets déjà traités récemment (à éviter) : ${history.slice(0, 8).join(", ")}.`
      : "";

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 600,
    messages: [
      {
        role: "user",
        content: `Tu es l'assistante d'Esther Laframboise, naturothérapeute et Maître Reiki à Shefford, QC. Propose 6 idées originales de ${label} pour sa clientèle (femmes, approche holistique, santé féminine, Reiki, naturopathie).${historyNote}

Retourne UNIQUEMENT un tableau JSON de 6 chaînes de caractères (titres / idées courtes, max 10 mots chacune), sans markdown, sans explication. Exemple : ["Idée 1", "Idée 2", "Idée 3", "Idée 4", "Idée 5", "Idée 6"]`,
      },
    ],
  });

  const raw =
    response.content[0].type === "text" ? response.content[0].text.trim() : "[]";
  let ideas: string[] = [];
  try {
    const match = raw.match(/\[[\s\S]*\]/);
    ideas = match ? JSON.parse(match[0]) : [];
  } catch {
    ideas = [];
  }

  return Response.json({ ideas });
}
