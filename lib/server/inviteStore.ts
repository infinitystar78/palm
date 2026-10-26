import "server-only";

import { neon } from "@neondatabase/serverless";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { ApiError, type JsonObject } from "./api";

export type InviteStatus = "pending" | "completed" | "expired";

export type PublicInvite = {
  id: string;
  status: InviteStatus;
  creatorProfile: unknown;
  createdAt: string;
  completedAt: string | null;
  expiresAt: string;
};

export type CreatorInviteResult = {
  id: string;
  status: InviteStatus;
  recipientProfile?: unknown;
  compatibilityResult?: unknown;
  createdAt: string;
  completedAt: string | null;
  expiresAt: string;
};

type InviteRow = {
  id: string;
  creator_token_hash?: string;
  creator_profile?: unknown;
  recipient_profile?: unknown;
  compatibility_result?: unknown;
  status: InviteStatus;
  created_at: string | Date;
  completed_at: string | Date | null;
  expires_at: string | Date;
};

type SqlClient = ReturnType<typeof neon>;

let cachedSql: SqlClient | undefined;

export function normalizeInviteId(id: string): string {
  const decoded = decodeURIComponent(id).trim();
  if (!/^[A-Za-z0-9_-]{10,180}$/.test(decoded)) {
    throw new ApiError(400, "invalid_invite_id", "Invite id is invalid.");
  }

  return decoded;
}

export function createInviteUrl(id: string): string {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpalm.app").replace(/\/$/, "");
  return `${siteUrl}/invite/${encodeURIComponent(id)}`;
}

export async function createInvite(creatorProfile: JsonObject) {
  const sql = getSql();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const id = randomBytes(18).toString("base64url");
    const creatorToken = randomBytes(32).toString("base64url");
    const creatorTokenHash = hashCreatorToken(creatorToken);

    const rows = await sql`
      insert into invite_sessions (id, creator_token_hash, creator_profile)
      values (${id}, ${creatorTokenHash}, ${JSON.stringify(creatorProfile)}::jsonb)
      on conflict (id) do nothing
      returning id, creator_profile, status, created_at, completed_at, expires_at
    `;

    const row = firstRow(rows);
    if (row) {
      return {
        ...toPublicInvite(row),
        inviteUrl: createInviteUrl(row.id),
        creatorToken
      };
    }
  }

  throw new ApiError(500, "invite_id_collision", "Could not create invite.");
}

export async function getPublicInvite(id: string): Promise<PublicInvite | null> {
  const rows = await getSql()`
    select
      id,
      creator_profile,
      case
        when expires_at <= now() then 'expired'
        else status
      end as status,
      created_at,
      completed_at,
      expires_at
    from invite_sessions
    where id = ${id}
    limit 1
  `;

  const row = firstRow(rows);
  if (row?.status === "expired") {
    throw new ApiError(410, "invite_expired", "Invite has expired.");
  }
  return row ? toPublicInvite(row) : null;
}

export async function completeInvite(
  id: string,
  recipientProfile: JsonObject,
  compatibilityResult: JsonObject
): Promise<CreatorInviteResult> {
  const rows = await getSql()`
    update invite_sessions
    set
      recipient_profile = ${JSON.stringify(recipientProfile)}::jsonb,
      compatibility_result = ${JSON.stringify(compatibilityResult)}::jsonb,
      status = 'completed',
      completed_at = now()
    where id = ${id}
      and status = 'pending'
      and expires_at > now()
    returning
      id,
      recipient_profile,
      compatibility_result,
      status,
      created_at,
      completed_at,
      expires_at
  `;

  const row = firstRow(rows);
  if (row) {
    return toCreatorResult(row);
  }

  const invite = await getPublicInvite(id);
  if (!invite) {
    throw new ApiError(404, "invite_not_found", "Invite was not found.");
  }

  if (invite.status === "expired") {
    throw new ApiError(410, "invite_expired", "Invite has expired.");
  }

  throw new ApiError(409, "invite_already_completed", "Invite has already been completed.");
}

export async function getCreatorResult(
  id: string,
  creatorToken: string
): Promise<CreatorInviteResult> {
  const rows = await getSql()`
    select
      id,
      creator_token_hash,
      recipient_profile,
      compatibility_result,
      case
        when expires_at <= now() then 'expired'
        else status
      end as status,
      created_at,
      completed_at,
      expires_at
    from invite_sessions
    where id = ${id}
    limit 1
  `;

  const row = firstRow(rows);
  if (!row) {
    throw new ApiError(404, "invite_not_found", "Invite was not found.");
  }

  if (!row.creator_token_hash || !creatorTokenMatches(creatorToken, row.creator_token_hash)) {
    throw new ApiError(401, "invalid_creator_token", "Creator token is invalid.");
  }

  if (row.status === "expired") {
    throw new ApiError(410, "invite_expired", "Invite has expired.");
  }

  return toCreatorResult(row);
}

export async function deleteExpiredInvites(): Promise<number> {
  const rows = await getSql()`
    with deleted as (
      delete from invite_sessions
      where expires_at <= now()
      returning 1
    )
    select count(*)::integer as deleted_count from deleted
  `;

  return (rows as { deleted_count: number }[])[0].deleted_count;
}

function getSql(): SqlClient {
  if (cachedSql) {
    return cachedSql;
  }

  const databaseUrl = process.env.DATABASE_URL
    ?? process.env.POSTGRES_URL
    ?? process.env.POSTGRES_PRISMA_URL;

  if (!databaseUrl) {
    throw new ApiError(
      500,
      "database_not_configured",
      "DATABASE_URL or POSTGRES_URL must be configured."
    );
  }

  cachedSql = neon(databaseUrl);
  return cachedSql;
}

function hashCreatorToken(token: string): string {
  const pepper = process.env.INVITE_TOKEN_PEPPER;
  if (!pepper) {
    throw new ApiError(500, "invite_secret_not_configured", "INVITE_TOKEN_PEPPER must be configured.");
  }

  return createHmac("sha256", pepper).update(token).digest("hex");
}

function creatorTokenMatches(token: string, expectedHash: string): boolean {
  const actual = Buffer.from(hashCreatorToken(token), "hex");
  const expected = Buffer.from(expectedHash, "hex");

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function firstRow(rows: unknown): InviteRow | undefined {
  return (rows as InviteRow[])[0];
}

function toPublicInvite(row: InviteRow): PublicInvite {
  return {
    id: row.id,
    status: row.status,
    creatorProfile: row.creator_profile,
    createdAt: toIsoString(row.created_at),
    completedAt: row.completed_at ? toIsoString(row.completed_at) : null,
    expiresAt: toIsoString(row.expires_at)
  };
}

function toCreatorResult(row: InviteRow): CreatorInviteResult {
  const result: CreatorInviteResult = {
    id: row.id,
    status: row.status,
    createdAt: toIsoString(row.created_at),
    completedAt: row.completed_at ? toIsoString(row.completed_at) : null,
    expiresAt: toIsoString(row.expires_at)
  };

  if (row.status === "completed") {
    result.recipientProfile = row.recipient_profile;
    result.compatibilityResult = row.compatibility_result;
  }

  return result;
}

function toIsoString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}
