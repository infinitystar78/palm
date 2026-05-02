# Palm Web

Small Vercel-ready site for `getpalm.app`.

This repo is safe to keep public: it contains only the website fallback UI,
static metadata, and Apple association placeholders. It does not include iOS app
source code, raw scan logic, private keys, or secrets.

## Routes

- `/` basic Palm landing page
- `/invite/[id]` invite fallback page
- `POST /api/invites` create an invite session
- `GET /api/invites/[id]` fetch public invite context for the recipient
- `POST /api/invites/[id]/complete` complete an invite with derived recipient/result JSON
- `GET /api/invites/[id]/result` fetch the completed result with the creator token
- `/.well-known/apple-app-site-association` Apple association file
- `/apple-app-site-association` root copy of the Apple association file

## Vercel setup

1. Import this repository into Vercel.
2. Use the repository root as the Vercel project root.
3. Add the domain `getpalm.app`.
4. Add the DNS records Vercel gives you in Hostinger.
5. Create a Neon Postgres database from Vercel Storage.
6. Run `database/schema.sql` in the Neon SQL editor.
7. Set the environment variables below.

Required environment variables:

- `NEXT_PUBLIC_SITE_URL=https://getpalm.app`
- `DATABASE_URL` or `POSTGRES_URL` from Neon
- `INVITE_TOKEN_PEPPER` as a long random server-only secret

Optional environment variables:

- `NEXT_PUBLIC_APP_STORE_URL` once the App Store page exists
- `NEXT_PUBLIC_APP_STORE_ID` once Apple assigns the App Store ID
- `NEXT_PUBLIC_APP_CLIP_BUNDLE_ID` once the App Clip target exists

## Invite API

Create invite:

```http
POST /api/invites
Content-Type: application/json

{
  "creatorProfile": {}
}
```

The response includes `id`, `inviteUrl`, and `creatorToken`. The native app
should store the creator token locally and use it to poll the private result
endpoint.

Complete invite:

```http
POST /api/invites/{id}/complete
Content-Type: application/json

{
  "recipientProfile": {},
  "compatibilityResult": {}
}
```

Fetch creator result:

```http
GET /api/invites/{id}/result
Authorization: Bearer {creatorToken}
```

Only derived palm profile/result JSON should be sent to these routes. Raw
camera frames, images, photos, and landmark payloads are rejected.

## Apple association file

Universal Links currently target:

```txt
X999Z3X86B.com.avantra.Palm
```

The association file also advertises the App Clip identifier:

```txt
X999Z3X86B.com.avantra.Palm.Clip
```
