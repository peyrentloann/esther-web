"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(pin: string) {
  if (pin === process.env.ADMIN_PIN) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", pin, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });
    redirect("/admin/dashboard");
  }
  return { error: "PIN incorrect" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin");
}
