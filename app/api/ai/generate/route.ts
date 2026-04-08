import { cookies } from "next/headers";

const OR_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `Tu es l'assistante de contenu d'Esther Laframboise, naturothérapeute et Maître Reiki à Shefford, QC. Tu rédiges en français québécois, avec un ton chaleureux, expert et ancré dans la nature et le bien-être. Tu évites le jargon médical abusif. Tu valorises l'approche holistique, la connexion corps-esprit-nature. Tu écris toujours en français, jamais en anglais.`;

function buildPrompt(type: string, fields: Record<string, string>): string {
  switch (type) {
    case "article":
      return `Écris un article de blog ${fields.longueur || "moyen (~600 mots)"} sur : ${fields.sujet}.
Angle : ${fields.angle || "aborder le sujet de façon pratique et accessible"}.
Mots-clés à intégrer naturellement : ${fields.mots_cles || "naturopathie, bien-être"}.
Structure : titre accrocheur en H1 (avec #), introduction chaleureuse, 2-3 sections avec sous-titres (##), conclusion avec invitation douce à prendre soin de soi.`;

    case "evenement":
      return `Écris une description d'événement pour : ${fields.titre || "événement bien-être"}.
Type : ${fields.type_evt || "Soin de groupe"}. Thèmes : ${fields.themes || "bien-être, nature"}. Public : ${fields.public || "tous publics"}. Durée : ${fields.duree || "à préciser"}. Prix : ${fields.prix || "à préciser"}.
Inclure : une accroche émotionnelle, ce que les participantes vont vivre et ressentir, 3-4 bénéfices clés en liste (avec tirets), invitation douce à s'inscrire. 150-200 mots.`;

    case "instagram":
      return `Écris un post Instagram ${fields.humeur || "inspirant"} sur : ${fields.sujet}.
Commencer par une accroche forte (question ou affirmation percutante). Corps : 120-180 mots, ton naturel et authentique d'Esther. 1-2 emojis subtils et bien placés.
${fields.hashtags === "true" ? "Ajouter une ligne vide puis 8-10 hashtags pertinents (mélange français/anglais, niche naturopathie/bien-être/Reiki)." : ""}`;

    case "email":
      return `Écris un email newsletter ${fields.type_email || "informatif"} pour les clientes d'Esther.
Sujet : ${fields.sujet || "actualités bien-être"}.
Points clés à développer : ${fields.points_cles || "actualités de la pratique"}.
Structure : salutation chaleureuse ("Chère amie," ou "Bonjour [prénom],"), développement naturel des points clés, clôture avec invitation à prendre rendez-vous, signature "Avec amour, Esther 🌿".`;

    default:
      return `Écris du contenu de type ${type} sur : ${JSON.stringify(fields)}`;
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { type, fields } = await request.json();
  const userPrompt = buildPrompt(type, fields || {});

  const response = await fetch(OR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-4-5",
      max_tokens: 1500,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  // Parse SSE stream from OpenRouter and pipe only the text deltas
  return new Response(
    new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const text = json.choices?.[0]?.delta?.content;
              if (text) controller.enqueue(new TextEncoder().encode(text));
            } catch {
              // ignore malformed chunks
            }
          }
        }
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
