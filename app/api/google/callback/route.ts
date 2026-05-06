import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForTokens } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== process.env.ADMIN_PIN) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/admin/parametres?google=error", req.url));
  }

  try {
    await exchangeCodeForTokens(code);
    return NextResponse.redirect(new URL("/admin/parametres?google=connected", req.url));
  } catch (e) {
    console.error("Google OAuth callback error", e);
    return NextResponse.redirect(new URL("/admin/parametres?google=error", req.url));
  }
}
