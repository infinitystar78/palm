import { NextResponse } from "next/server";

export type JsonObject = Record<string, unknown>;

const maxJsonBytes = 64 * 1024;
const forbiddenRawCaptureKeys = new Set([
  "cameraFrame",
  "cameraFrames",
  "capture",
  "captures",
  "frame",
  "frames",
  "handLandmarks",
  "image",
  "images",
  "landmarks",
  "photo",
  "photos",
  "pixelBuffer",
  "rawFrame",
  "rawFrames",
  "rawImage",
  "rawImages",
  "thumbnail",
  "thumbnails",
  "videoFrame",
  "videoFrames"
].map(normalizeKey));

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function readJsonObject(request: Request): Promise<JsonObject> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxJsonBytes) {
    throw new ApiError(413, "payload_too_large", "Request body is too large.");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    throw new ApiError(400, "invalid_json", "Request body must be valid JSON.");
  }

  if (!isJsonObject(payload)) {
    throw new ApiError(400, "invalid_payload", "Request body must be a JSON object.");
  }

  return payload;
}

export function requireJsonObjectField(
  payload: JsonObject,
  ...fieldNames: string[]
): JsonObject {
  for (const fieldName of fieldNames) {
    const value = payload[fieldName];
    if (isJsonObject(value)) {
      return value;
    }
  }

  throw new ApiError(
    400,
    "missing_payload_field",
    `Expected one of these JSON object fields: ${fieldNames.join(", ")}.`
  );
}

export function assertDerivedJsonPayload(label: string, value: unknown): asserts value is JsonObject {
  if (!isJsonObject(value)) {
    throw new ApiError(400, "invalid_payload", `${label} must be a JSON object.`);
  }

  const encoded = JSON.stringify(value);
  if (!encoded || Buffer.byteLength(encoded, "utf8") > maxJsonBytes) {
    throw new ApiError(413, "payload_too_large", `${label} is too large.`);
  }

  assertNoRawCaptureData(label, value, 0);
}

export function readBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();

  if (!token) {
    throw new ApiError(401, "missing_creator_token", "Creator token is required.");
  }

  return token;
}

export function noStoreJson(body: unknown, init?: ResponseInit): NextResponse {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");

  return NextResponse.json(body, {
    ...init,
    headers
  });
}

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return noStoreJson(
      {
        error: {
          code: error.code,
          message: error.message
        }
      },
      { status: error.status }
    );
  }

  console.error(error);
  return noStoreJson(
    {
      error: {
        code: "internal_error",
        message: "Something went wrong."
      }
    },
    { status: 500 }
  );
}

function assertNoRawCaptureData(path: string, value: unknown, depth: number) {
  if (depth > 16) {
    throw new ApiError(400, "payload_too_deep", `${path} is too deeply nested.`);
  }

  if (typeof value === "string") {
    if (/^data:image\//i.test(value)) {
      throw new ApiError(400, "raw_capture_data_not_allowed", `${path} contains image data.`);
    }

    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoRawCaptureData(`${path}[${index}]`, item, depth + 1));
    return;
  }

  if (!isJsonObject(value)) {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    if (forbiddenRawCaptureKeys.has(normalizeKey(key))) {
      throw new ApiError(
        400,
        "raw_capture_data_not_allowed",
        `${path}.${key} looks like raw camera, image, or landmark data.`
      );
    }

    assertNoRawCaptureData(`${path}.${key}`, child, depth + 1);
  }
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, "");
}
