import { type NextRequest } from "next/server";
import {
  apiErrorResponse,
  assertDerivedJsonPayload,
  noStoreJson,
  readJsonObject,
  requireJsonObjectField
} from "@/lib/server/api";
import { createInvite } from "@/lib/server/inviteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const payload = await readJsonObject(request);
    const creatorProfile = requireJsonObjectField(payload, "creatorProfile", "creator_profile");
    assertDerivedJsonPayload("creatorProfile", creatorProfile);

    const invite = await createInvite(creatorProfile);

    return noStoreJson(
      {
        id: invite.id,
        inviteUrl: invite.inviteUrl,
        creatorToken: invite.creatorToken,
        status: invite.status,
        createdAt: invite.createdAt,
        expiresAt: invite.expiresAt
      },
      { status: 201 }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
