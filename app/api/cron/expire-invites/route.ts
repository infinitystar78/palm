import { timingSafeEqual } from "node:crypto";
import { ApiError, apiErrorResponse, noStoreJson } from "@/lib/server/api";
import { deleteExpiredInvites } from "@/lib/server/inviteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const secret = process.env.CRON_SECRET;
    if (!secret?.trim()) {
      throw new ApiError(503, "cleanup_not_configured", "Invite cleanup is not configured.");
    }

    const expected = Buffer.from(`Bearer ${secret}`);
    const supplied = Buffer.from(request.headers.get("authorization") ?? "");
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
      throw new ApiError(401, "unauthorized_cron", "Cron authorization is invalid.");
    }

    const deletedInvites = await deleteExpiredInvites();
    return noStoreJson({ ok: true, deletedInvites });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
