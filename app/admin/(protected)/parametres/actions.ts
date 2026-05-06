"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { getAuthUrl, disconnectGoogle } from "@/lib/google-calendar";

export async function startGoogleConnect() {
  await requireAdmin();
  const url = getAuthUrl();
  redirect(url);
}

export async function disconnectGoogleAction() {
  await requireAdmin();
  await disconnectGoogle();
  revalidatePath("/admin/parametres");
}
