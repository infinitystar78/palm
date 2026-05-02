create table if not exists invite_sessions (
  id text primary key,
  creator_token_hash text not null,
  creator_profile jsonb not null,
  recipient_profile jsonb,
  compatibility_result jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'expired')),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  expires_at timestamptz not null default (now() + interval '14 days')
);

create index if not exists invite_sessions_status_idx
  on invite_sessions (status);

create index if not exists invite_sessions_expires_at_idx
  on invite_sessions (expires_at);
