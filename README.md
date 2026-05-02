# Palm Web

Small Vercel-ready site for `getpalm.app`.

This repo is safe to keep public: it contains only the website fallback UI,
static metadata, and Apple association placeholders. It does not include iOS app
source code, raw scan logic, private keys, or secrets.

## Routes

- `/` basic Palm landing page
- `/invite/[id]` invite fallback page
- `/.well-known/apple-app-site-association` Apple association file
- `/apple-app-site-association` root copy of the Apple association file

## Vercel setup

1. Import this repository into Vercel.
2. Set the project root directory to `web`.
3. Add the domain `getpalm.app`.
4. Add the DNS records Vercel gives you in Hostinger.
5. Set `NEXT_PUBLIC_SITE_URL=https://getpalm.app`.

Optional environment variables:

- `NEXT_PUBLIC_APP_STORE_URL` once the App Store page exists
- `NEXT_PUBLIC_APP_STORE_ID` once Apple assigns the App Store ID
- `NEXT_PUBLIC_APP_CLIP_BUNDLE_ID` once the App Clip target exists

## Apple association file

Universal Links currently target:

```txt
X999Z3X86B.com.avantra.Palm
```

The association file also advertises the App Clip identifier:

```txt
X999Z3X86B.com.avantra.Palm.Clip
```
