import { google } from "googleapis";
import { getServiceClient } from "./supabase";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const TOKEN_KEY = "google_calendar_tokens";

function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing Google OAuth env vars");
  }
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getAuthUrl() {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
}

export async function exchangeCodeForTokens(code: string) {
  const client = getOAuth2Client();
  const { tokens } = await client.getToken(code);
  const supabase = getServiceClient();
  await supabase
    .from("settings")
    .upsert({ key: TOKEN_KEY, value: tokens, updated_at: new Date().toISOString() });
  return tokens;
}

async function getAuthorizedClient() {
  const supabase = getServiceClient();
  const { data } = await supabase.from("settings").select("value").eq("key", TOKEN_KEY).single();
  if (!data?.value) return null;

  const client = getOAuth2Client();
  client.setCredentials(data.value);

  // Refresh if needed and persist new tokens
  client.on("tokens", async (tokens) => {
    const merged = { ...data.value, ...tokens };
    await supabase
      .from("settings")
      .upsert({ key: TOKEN_KEY, value: merged, updated_at: new Date().toISOString() });
  });

  return client;
}

export async function isGoogleConnected() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("settings")
      .select("key")
      .eq("key", TOKEN_KEY)
      .maybeSingle();
    if (error) return false;
    return !!data;
  } catch {
    return false;
  }
}

export async function disconnectGoogle() {
  const supabase = getServiceClient();
  await supabase.from("settings").delete().eq("key", TOKEN_KEY);
}

type CreateEventArgs = {
  summary: string;
  description: string;
  location: string;
  startISO: string;
  durationMin: number;
  attendeeEmail?: string;
};

export async function createGoogleCalendarEvent(args: CreateEventArgs): Promise<string | null> {
  const auth = await getAuthorizedClient();
  if (!auth) return null;

  const calendar = google.calendar({ version: "v3", auth });
  const start = new Date(args.startISO);
  const end = new Date(start.getTime() + args.durationMin * 60_000);

  const res = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: args.summary,
      description: args.description,
      location: args.location,
      start: { dateTime: start.toISOString(), timeZone: "America/Montreal" },
      end: { dateTime: end.toISOString(), timeZone: "America/Montreal" },
      attendees: args.attendeeEmail ? [{ email: args.attendeeEmail }] : undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    },
    sendUpdates: "all",
  });

  return res.data.id ?? null;
}

export async function deleteGoogleCalendarEvent(eventId: string) {
  const auth = await getAuthorizedClient();
  if (!auth) return;
  const calendar = google.calendar({ version: "v3", auth });
  await calendar.events.delete({ calendarId: "primary", eventId, sendUpdates: "all" });
}

export async function getBusySlots(timeMinISO: string, timeMaxISO: string) {
  const auth = await getAuthorizedClient();
  if (!auth) return [];
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      timeZone: "America/Montreal",
      items: [{ id: "primary" }],
    },
  });
  const busy = res.data.calendars?.primary?.busy ?? [];
  return busy.map((b) => ({ start: b.start!, end: b.end! }));
}
