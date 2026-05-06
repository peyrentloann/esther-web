"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { getServiceClient } from "@/lib/supabase";
import { deleteGoogleCalendarEvent } from "@/lib/google-calendar";

export async function updateAppointmentStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled" | "done",
) {
  await requireAdmin();
  const supabase = getServiceClient();

  if (status === "cancelled") {
    const { data: appt } = await supabase
      .from("appointments")
      .select("google_event_id")
      .eq("id", id)
      .single();
    if (appt?.google_event_id) {
      try {
        await deleteGoogleCalendarEvent(appt.google_event_id);
      } catch (e) {
        console.error("Failed to delete Google event", e);
      }
    }
  }

  const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/admin/rendez-vous");
  revalidatePath("/admin/dashboard");
  return { ok: true as const };
}

export async function deleteAppointment(id: string) {
  await requireAdmin();
  const supabase = getServiceClient();

  const { data: appt } = await supabase
    .from("appointments")
    .select("google_event_id")
    .eq("id", id)
    .single();
  if (appt?.google_event_id) {
    try {
      await deleteGoogleCalendarEvent(appt.google_event_id);
    } catch (e) {
      console.error("Failed to delete Google event", e);
    }
  }

  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/admin/rendez-vous");
  revalidatePath("/admin/dashboard");
  return { ok: true as const };
}
