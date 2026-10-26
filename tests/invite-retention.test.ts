import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const transport = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock("@neondatabase/serverless", () => ({ neon: () => transport.query }));

import { createInvite, completeInvite, deleteExpiredInvites, getCreatorResult, getPublicInvite } from "../lib/server/inviteStore";
import { GET as publicGet } from "../app/api/invites/[id]/route";
import { GET as resultGet } from "../app/api/invites/[id]/result/route";
import { GET as cleanupGet } from "../app/api/cron/expire-invites/route";

let db: PGlite;

beforeAll(async () => {
  // Execute the production SQL locally; no network or real database credentials.
  db = await PGlite.create();
  await db.exec(await readFile(new URL("../database/schema.sql", import.meta.url), "utf8"));
  transport.query.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const sql = strings.reduce((text, segment, index) => text + (index ? `$${index}` : "") + segment, "");
    return (await db.query(sql, values)).rows;
  });
  vi.stubEnv("DATABASE_URL", "postgresql://test.invalid/palm-retention-tests");
  vi.stubEnv("INVITE_TOKEN_PEPPER", "test-only-pepper-never-used-in-production");
});

beforeEach(async () => {
  // PostgreSQL now() stays fixed within a transaction, so the boundary tests are exact.
  await db.exec("BEGIN");
  vi.stubEnv("CRON_SECRET", "test-only-cron-secret-never-used-in-production");
});

afterEach(async () => {
  await db.exec("ROLLBACK");
});

afterAll(async () => {
  vi.unstubAllEnvs();
  await db?.close();
});

async function invite(status: "pending" | "completed", offsetSeconds: number) {
  const record = await createInvite({ archetype: "creator-test", traits: { curiosity: 0.7 } });
  if (status === "completed") {
    await completeInvite(record.id, { archetype: "recipient-test" }, { score: 72 });
  }
  await db.query("UPDATE invite_sessions SET expires_at = now() + $1 * interval '1 second' WHERE id = $2", [offsetSeconds, record.id]);
  return record;
}

describe.each(["pending", "completed"] as const)("%s invites", (status) => {
  it("remains available before expiry with private results requiring the creator token", async () => {
    const record = await invite(status, 1);
    expect((await getPublicInvite(record.id))?.status).toBe(status);
    expect((await getCreatorResult(record.id, record.creatorToken)).status).toBe(status);
    await expect(getCreatorResult(record.id, "wrong-token")).rejects.toMatchObject({ status: 401 });
  });

  it.each([0, -1])("does not disclose profiles or results at expiry offset %s seconds", async (offset) => {
    const record = await invite(status, offset);
    const context = { params: Promise.resolve({ id: record.id }) };
    const publicResponse = await publicGet(new Request("https://test.invalid"), context);
    expect(publicResponse.status).toBe(410);
    expect(publicResponse.headers.get("cache-control")).toBe("no-store");
    expect(await publicResponse.json()).toEqual({ error: { code: "invite_expired", message: "Invite has expired." } });

    const privateResponse = await resultGet(new Request("https://test.invalid", {
      headers: { Authorization: `Bearer ${record.creatorToken}` }
    }), context);
    expect(privateResponse.status).toBe(410);
    expect(await privateResponse.json()).toEqual({ error: { code: "invite_expired", message: "Invite has expired." } });
    await expect(getCreatorResult(record.id, "wrong-token")).rejects.toMatchObject({ status: 401 });
  });
});

it("sets a fourteen-day lifetime and does not restart it on completion", async () => {
  const record = await createInvite({ archetype: "creator-test" });
  const duration = await db.query<{ seconds: number }>("SELECT EXTRACT(epoch FROM (expires_at - created_at))::integer AS seconds FROM invite_sessions WHERE id = $1", [record.id]);
  expect(duration.rows[0].seconds).toBe(14 * 24 * 60 * 60);
  const completed = await completeInvite(record.id, { archetype: "recipient-test" }, { score: 72 });
  expect(completed.expiresAt).toBe(record.expiresAt);
});

it.each([0, -1])("cannot complete an invite at expiry offset %s seconds", async (offset) => {
  const record = await invite("pending", offset);
  await expect(completeInvite(record.id, { archetype: "recipient-test" }, { score: 72 })).rejects.toMatchObject({ status: 410, code: "invite_expired" });
  const stored = await db.query<{ status: string; recipient_profile: unknown }>("SELECT status, recipient_profile FROM invite_sessions WHERE id = $1", [record.id]);
  expect(stored.rows[0]).toEqual({ status: "pending", recipient_profile: null });
});

it("requires a creator token even when the invite is expired", async () => {
  const record = await invite("completed", -1);
  const response = await resultGet(new Request("https://test.invalid"), { params: Promise.resolve({ id: record.id }) });
  expect(response.status).toBe(401);
  expect((await response.json()).error.code).toBe("missing_creator_token");
});

it("deletes expired pending and completed rows but preserves rows before expiry", async () => {
  const active = [];
  for (const status of ["pending", "completed"] as const) {
    active.push(await invite(status, 1));
    await invite(status, 0);
    await invite(status, -1);
  }
  expect(await deleteExpiredInvites()).toBe(4);
  const remaining = await db.query<{ id: string }>("SELECT id FROM invite_sessions");
  expect(remaining.rows.map(row => row.id).sort()).toEqual(active.map(row => row.id).sort());
  expect(await deleteExpiredInvites()).toBe(0);
});

it.each([undefined, "", "   "])("refuses cleanup when the secret is missing or blank (%s)", async (secret) => {
  const record = await invite("completed", -1);
  vi.stubEnv("CRON_SECRET", secret);
  vi.stubEnv("VERCEL", "1");
  const response = await cleanupGet(new Request("https://test.invalid", {
    headers: { "User-Agent": "vercel-cron/1.0" }
  }));
  expect(response.status).toBe(503);
  expect((await response.json()).error.code).toBe("cleanup_not_configured");
  expect((await db.query("SELECT id FROM invite_sessions WHERE id = $1", [record.id])).rows).toHaveLength(1);
});

it.each(["", "Bearer wrong", "Bearer test-only-cron-secret-never-used-in-productioN"])("refuses cleanup for invalid authorization (%s)", async (authorization) => {
  const record = await invite("completed", -1);
  const response = await cleanupGet(new Request("https://test.invalid", {
    headers: { Authorization: authorization, "User-Agent": "vercel-cron/1.0" }
  }));
  expect(response.status).toBe(401);
  expect((await db.query("SELECT id FROM invite_sessions WHERE id = $1", [record.id])).rows).toHaveLength(1);
});

it("allows authenticated cleanup and returns counts without profiles or identifiers", async () => {
  await invite("pending", -1);
  await invite("completed", -1);
  const response = await cleanupGet(new Request("https://test.invalid", {
    headers: { Authorization: "Bearer test-only-cron-secret-never-used-in-production" }
  }));
  expect(response.status).toBe(200);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(await response.json()).toEqual({ ok: true, deletedInvites: 2 });
  expect((await db.query("SELECT id FROM invite_sessions")).rows).toHaveLength(0);
});

it("rehearses a verified single-invite erasure without affecting another invite", async () => {
  const erased = await invite("completed", 60);
  const preserved = await invite("completed", 60);
  const sql = await readFile(new URL("../database/erase-invite.sql", import.meta.url), "utf8");
  expect((await db.query(sql, [erased.id])).rows).toEqual([{ deleted_count: 1 }]);
  expect(await getPublicInvite(erased.id)).toBeNull();
  await expect(getCreatorResult(erased.id, erased.creatorToken)).rejects.toMatchObject({ status: 404 });
  expect((await getCreatorResult(preserved.id, preserved.creatorToken)).status).toBe("completed");
  expect((await db.query(sql, [erased.id])).rows).toEqual([{ deleted_count: 0 }]);
});
