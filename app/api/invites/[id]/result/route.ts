import {
  apiErrorResponse,
  noStoreJson,
  readBearerToken
} from "@/lib/server/api";
import {
  getCreatorResult,
  normalizeInviteId
} from "@/lib/server/inviteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InviteRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: InviteRouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = normalizeInviteId(rawId);
    const creatorToken = readBearerToken(request);
    const result = await getCreatorResult(id, creatorToken);

    return noStoreJson(result);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
