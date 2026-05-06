"use server";

import { Resend } from "resend";
import { getServiceClient } from "./supabase";
import { createGoogleCalendarEvent } from "./google-calendar";

type Service = "reiki" | "soin-hormonal" | "demandes-speciales";
type Format = "presentiel" | "en-ligne";

type BookingInput = {
  service: Service;
  format: Format;
  starts_at: string; // ISO datetime
  duration_min?: number;
  client_name: string;
  client_email: string;
  client_phone?: string;
  newsletter_opt_in?: boolean;
};

const SERVICE_LABEL: Record<Service, string> = {
  reiki: "Soin Reiki",
  "soin-hormonal": "Soin Hormonal",
  "demandes-speciales": "Demande spéciale",
};

const FORMAT_LABEL: Record<Format, string> = {
  presentiel: "En présentiel — Shefford, QC",
  "en-ligne": "En ligne — Zoom",
};

export async function createBooking(input: BookingInput) {
  const supabase = getServiceClient();

  const { data: appt, error } = await supabase
    .from("appointments")
    .insert({
      service: input.service,
      format: input.format,
      starts_at: input.starts_at,
      duration_min: input.duration_min ?? 90,
      client_name: input.client_name,
      client_email: input.client_email,
      client_phone: input.client_phone || null,
      newsletter_opt_in: input.newsletter_opt_in ?? false,
      status: "pending",
    })
    .select()
    .single();

  if (error || !appt) {
    console.error("Booking insert failed", error);
    return { ok: false as const, error: "Erreur lors de l'enregistrement du rendez-vous." };
  }

  // Push to Google Calendar (best-effort — ne bloque pas la réservation si Google indispo)
  try {
    const eventId = await createGoogleCalendarEvent({
      summary: `${SERVICE_LABEL[input.service]} — ${input.client_name}`,
      description: [
        `Service : ${SERVICE_LABEL[input.service]}`,
        `Format : ${FORMAT_LABEL[input.format]}`,
        `Cliente : ${input.client_name}`,
        `Courriel : ${input.client_email}`,
        input.client_phone ? `Téléphone : ${input.client_phone}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      location: input.format === "presentiel" ? "Shefford, QC" : "Zoom",
      startISO: input.starts_at,
      durationMin: input.duration_min ?? 90,
      attendeeEmail: input.client_email,
    });

    if (eventId) {
      await supabase
        .from("appointments")
        .update({ google_event_id: eventId })
        .eq("id", appt.id);
    }
  } catch (e) {
    console.error("Google Calendar push failed", e);
  }

  // Confirmation emails (best-effort)
  try {
    await sendBookingEmails({
      service: SERVICE_LABEL[input.service],
      format: FORMAT_LABEL[input.format],
      startsAt: input.starts_at,
      clientName: input.client_name,
      clientEmail: input.client_email,
      clientPhone: input.client_phone,
    });
  } catch (e) {
    console.error("Email send failed", e);
  }

  return { ok: true as const, id: appt.id };
}

async function sendBookingEmails(args: {
  service: string;
  format: string;
  startsAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !from) return;

  const resend = new Resend(apiKey);
  const date = new Date(args.startsAt);
  const dateFr = date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeFr = date.toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" });

  const clientHtml = `
    <div style="font-family: sans-serif; max-width: 560px; margin: auto; color: #1c1c19;">
      <h2 style="font-family: Georgia, serif; color: #153328;">Rendez-vous confirmé ✓</h2>
      <p>Bonjour ${args.clientName},</p>
      <p>Ton rendez-vous avec Esther Laframboise est enregistré.</p>
      <div style="background: #f1ede8; padding: 24px; border-radius: 16px; margin: 24px 0;">
        <p style="margin:0 0 8px"><strong>Service :</strong> ${args.service}</p>
        <p style="margin:0 0 8px"><strong>Format :</strong> ${args.format}</p>
        <p style="margin:0 0 8px"><strong>Date :</strong> ${dateFr}</p>
        <p style="margin:0"><strong>Heure :</strong> ${timeFr}</p>
      </div>
      <p>Esther te contactera pour confirmer les derniers détails.</p>
      <p style="color:#727974; font-size:12px; margin-top:32px;">— Esther Laframboise · Naturothérapeute &amp; Maître Reiki · Shefford, QC</p>
    </div>`;

  await resend.emails.send({
    from,
    to: args.clientEmail,
    subject: "Ton rendez-vous avec Esther est confirmé",
    html: clientHtml,
  });

  if (adminEmail) {
    await resend.emails.send({
      from,
      to: adminEmail,
      subject: `Nouveau RDV — ${args.clientName} (${args.service})`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: auto;">
          <h2 style="font-family: Georgia, serif; color: #153328;">Nouveau rendez-vous</h2>
          <p><strong>${args.clientName}</strong></p>
          <ul style="list-style:none; padding:0;">
            <li>📅 ${dateFr} à ${timeFr}</li>
            <li>✦ ${args.service}</li>
            <li>📍 ${args.format}</li>
            <li>📧 ${args.clientEmail}</li>
            ${args.clientPhone ? `<li>📞 ${args.clientPhone}</li>` : ""}
          </ul>
          <p style="margin-top:24px;"><a href="https://esther-web.vercel.app/admin/rendez-vous">Voir dans l'admin →</a></p>
        </div>
      `,
    });
  }
}
