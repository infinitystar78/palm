import { type NextRequest } from "next/server";
import {
  apiErrorResponse,
  assertDerivedJsonPayload,
  noStoreJson,
  readJsonObject,
  requireJsonObjectField
} from "@/lib/server/api";
import {
  completeInvite,
  normalizeInviteId
} from "@/lib/server/inviteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InviteRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, context: InviteRouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = normalizeInviteId(rawId);
    const payload = await readJsonObject(request);
    const recipientProfile = requireJsonObjectField(payload, "recipientProfile", "recipient_profile");
    const compatibilityResult = requireJsonObjectField(payload, "compatibilityResult", "compatibility_result");

    assertDerivedJsonPayload("recipientProfile", recipientProfile);
    assertDerivedJsonPayload("compatibilityResult", compatibilityResult);

    const result = await completeInvite(id, recipientProfile, compatibilityResult);
    return noStoreJson(result);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
