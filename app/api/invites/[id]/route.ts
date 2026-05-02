import {
  apiErrorResponse,
  noStoreJson
} from "@/lib/server/api";
import {
  getPublicInvite,
  normalizeInviteId
} from "@/lib/server/inviteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InviteRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: InviteRouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = normalizeInviteId(rawId);
    const invite = await getPublicInvite(id);

    if (!invite) {
      return noStoreJson(
        {
          error: {
            code: "invite_not_found",
            message: "Invite was not found."
          }
        },
        { status: 404 }
      );
    }

    return noStoreJson(invite);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
