import { cookies } from "next/headers";

const ATLAS_URL = "https://api.atlascloud.ai/api/v1/model/generateImage";

const FORMAT_CONTEXT: Record<string, string> = {
  "1:1":  "square Instagram post format, centered composition",
  "9:16": "vertical Instagram story or Reel cover, full-bleed composition",
  "16:9": "horizontal Facebook or LinkedIn banner, wide landscape",
  "4:5":  "portrait Instagram feed post, vertical crop",
};

const STYLE_DESC: Record<string, string> = {
  botanique:
    "flat lay photography of fresh herbs, wildflowers and crystals on a cream linen background, warm natural light from the side, vibrant colours, highly detailed botanicals",
  naturel:
    "bright lifestyle photography, warm golden hour sunlight, woman's hands holding a plant or crystal, organic textures, inviting and energetic atmosphere",
  minimaliste:
    "clean minimalist flat lay, single hero object centred on a white or cream background, crisp professional lighting, bold negative space, high contrast",
};

const TYPE_BOOST: Record<string, string> = {
  instagram: "scroll-stopping social media marketing visual, highly engaging Instagram content",
  reel:      "dynamic eye-catching Reel thumbnail, bold and energetic",
  story:     "vibrant Instagram Story graphic, strong visual hierarchy",
  evenement: "professional event promotion visual, aspirational and inviting",
  newsletter: "warm lifestyle email header, trustworthy and welcoming",
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { textContext, style, format, contentType } = await request.json();

  const styleDesc = STYLE_DESC[style] || STYLE_DESC.botanique;
  const typeBoost = TYPE_BOOST[contentType] || TYPE_BOOST.instagram;
  const formatCtx = FORMAT_CONTEXT[format] || FORMAT_CONTEXT["1:1"];

  const prompt = `${typeBoost}, ${formatCtx}. ${styleDesc}. Brand colours: deep forest green (#153328), warm cream (#fdf9f4), soft gold accents. Wellness and naturopathy brand for women. ${textContext ? `Subject: ${String(textContext).slice(0, 100)}.` : ""} Professional photography, sharp focus, vibrant and marketing-ready. No text, no words in image.`;

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
