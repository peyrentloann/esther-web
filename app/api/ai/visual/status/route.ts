import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const response = await fetch(
    `https://api.atlascloud.ai/api/v1/model/prediction/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ATLASCLOUD_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  const status = data?.data?.status;
  const outputs = data?.data?.outputs;

  return Response.json({
    status,
    imageUrl:
      status === "completed" || status === "succeeded"
        ? outputs?.[0] ?? null
        : null,
  });
}
