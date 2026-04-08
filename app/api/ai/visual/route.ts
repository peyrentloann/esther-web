import { cookies } from "next/headers";

const ATLAS_URL = "https://api.atlascloud.ai/api/v1/model/generateImage";

const STYLE_DESC: Record<string, string> = {
  botanique:
    "botanical aesthetic with pressed wildflowers and herbs, organic paper textures, hand-drawn botanical illustrations",
  naturel:
    "natural photography style, soft golden daylight, organic linen materials, terracotta clay tones",
  minimaliste:
    "minimalist clean composition, generous white space, elegant serif typography, understated luxury",
};

const TYPE_CONTEXT: Record<string, string> = {
  article: "wellness blog header image, editorial magazine layout",
  evenement: "wellness retreat event announcement, serene invitation",
  instagram: "Instagram square post for holistic wellness practitioner",
  email: "email newsletter header, warm and inviting",
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { textContext, style, format, contentType } = await request.json();

  const styleDesc = STYLE_DESC[style] || STYLE_DESC.botanique;
  const typeCtx = TYPE_CONTEXT[contentType] || TYPE_CONTEXT.instagram;

  const prompt = `${typeCtx}. ${styleDesc}. Warm earthy cream palette, deep forest green accents, soft gold touches. High-end French Canadian wellness brand, naturothérapeute and Reiki master. ${textContext ? `Theme/context: "${String(textContext).slice(0, 120)}"` : ""}. Professional, serene, inviting atmosphere. No text overlay. Soft focus, dreamy quality.`;

  const response = await fetch(ATLAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ATLASCLOUD_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/nano-banana-pro/text-to-image-ultra",
      prompt,
      aspect_ratio: format || "1:1",
      resolution: "4k",
      output_format: "jpeg",
      enable_sync_mode: false,
    }),
  });

  const data = await response.json();
  console.log("[visual] Atlas response:", JSON.stringify(data));

  const predictionId = data?.data?.id;

  if (!predictionId) {
    return Response.json(
      { error: data?.error || data?.message || JSON.stringify(data) },
      { status: 500 }
    );
  }

  return Response.json({ predictionId });
}
