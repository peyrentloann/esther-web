-- ─────────────────────────────────────────────────────────
-- Esther Web — Schema initial
-- ─────────────────────────────────────────────────────────

-- ─── APPOINTMENTS ────────────────────────────────────────
create table if not exists appointments (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  service         text not null check (service in ('reiki', 'soin-hormonal', 'demandes-speciales')),
  format          text not null check (format in ('presentiel', 'en-ligne')),
  starts_at       timestamptz not null,
  duration_min    int not null default 90,
  client_name     text not null,
  client_email    text not null,
  client_phone    text,
  notes           text,
  status          text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'done')),
  google_event_id text,
  newsletter_opt_in boolean default false
);

create index if not exists appointments_starts_at_idx on appointments(starts_at);
create index if not exists appointments_status_idx on appointments(status);
create index if not exists appointments_email_idx on appointments(client_email);

-- ─── SETTINGS (key-value pour tokens Google etc) ─────────
create table if not exists settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ─── AVAILABILITY (créneaux récurrents hebdo) ────────────
create table if not exists availability (
  id          uuid primary key default gen_random_uuid(),
  weekday     int not null check (weekday between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─── RLS : tout est géré côté serveur via service role ──
alter table appointments disable row level security;
alter table settings disable row level security;
alter table availability disable row level security;
