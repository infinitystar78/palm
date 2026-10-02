# Palm legal pages — review draft, 2 October 2026

These pages have no effective date and are not ready for publication or an App Store policy submission. Avantra Services Ltd is the confirmed operator. No deployment, production configuration change, email setup or purchase is authorised by this work.

## Scope and approach

Add `/terms` and `/privacy` in the existing Next.js website, reuse its dark/gold styling, and provide readable text, a contents navigation, visible keyboard focus, a skip link and a footer on home, invite and legal pages. Keep editorial questions separate from the proposed policy wording. Validate the production build, rendered pages, small screens and navigation, then obtain one independent code/data-accuracy review and open a draft PR.

The original website checkout stays on its existing branch. Its 12 pre-existing modified/untracked files were hashed before edits; the legal-page files are also copied into a clean temporary checkout based on `origin/main` for a separate commit/PR. The invite API, database schema, README, rate limiter and cron work are not included in this PR.

## Evidence and limits

Sources reviewed on 2 October 2026:

- Native app: `b61f5fc0a9ab471428a2884b29d1f318d266390b` in the Palm repository. No native files were changed.
- Website baseline: `918f0b0c7b3edf10ea0dd07aef5ba3f49d428e91`, plus the original checkout's uncommitted API/rate-limit/cleanup work, inspected separately.
- A fresh Vercel deployment listing identifies `dpl_CXuzZ8psFHho9oiGSLECLUyh5saS` as the latest READY production deployment, from web baseline `918f0b0`. That commit contains no rate limiter or cleanup route.
- Fresh unauthenticated GETs to `https://getpalm.app/terms` and `/privacy` follow a redirect to `www.getpalm.app` and return 404. No production invites were created, completed or deleted.

| Subject | Confirmed in source | What this does not establish |
| --- | --- | --- |
| Camera | `Palm/UI/Components/PalmImageCaptureView.swift` uses local camera/Vision processing. `Palm/Core/Models/CompatibilitySession.swift` encodes `PalmProfile` and `CompatibilityResult` into invite requests; `PalmProfile` contains archetype and traits. | Device backups, diagnostics and deliberately exported content are separate data flows. No packet capture or new device qualification was performed. |
| Local storage | Reading, insight, awareness, preferences, comparison sessions and creator tokens use UserDefaults in their respective stores. | Local storage is not guaranteed anonymous or excluded from device backups. |
| New scan | `Palm/ContentView.swift` calls `PalmReadingViewModel.reset()`. It clears the reading, saved insight records and completed comparison usage count. | It does not clear analytics, awareness history, preferences, saved invite sessions or server rows. It is not an erase-all action. |
| Analytics | `AnalyticsService.swift` stores up to 1,000 events, lifetime counts and activity state locally and logs event names with OSLog. Export methods accept an injected sink; no production sink or call site configures uploads. | The final launch decision is unresolved. Apple may separately process purchases and diagnostics under its own settings/policies. |
| Purchases | `SubscriptionService.swift` uses StoreKit for products, purchases, current entitlements and `AppStore.sync()` restoration. | App Store Connect EULA, availability and App Privacy settings have not been read or changed in this task. |
| Reminders | `DailyNotificationService.swift` schedules local notifications using device permission. | This is not evidence of a marketing email service or remote-push backend. |
| Invite records | `database/schema.sql` and `inviteStore.ts` store creator/recipient profiles, comparison results, token hash, identifier, status and timestamps. Public profile reads require the invite ID; creator result retrieval checks the separate bearer token. | A link is transferable access, not an invitation restricted to one named recipient. Derived data and hashed network identifiers are not guaranteed anonymous. |
| Providers | Vercel hosts the website/API; invite persistence uses Neon. Pending rate limiting hashes a request network identity and persists route, time window and count. | Production rate limiting, log contents/retention, provider regions, contracts and transfer safeguards are not verified by local code. |

Both native privacy manifests declare Other User Content for app functionality and no tracking. They do not replace a complete privacy policy or establish that server data is anonymous. Reconcile their linked-data answers with the chosen launch data flows and the App Store privacy questionnaire.

## Retention and access gaps — separate backend work

The pages deliberately do not promise automatic deletion or a private named-recipient invitation.

1. `expires_at` defaults to creation plus 14 days. `completeInvite()` only updates pending rows whose expiry is still in the future; expiry blocks a new comparison completion.
2. `getPublicInvite()` changes *pending* status to expired in its SELECT, but still returns `creator_profile`. The GET route returns that object with HTTP 200. The native client checks status, but that UI check does not restrict direct API access.
3. `getCreatorResult()` only marks pending records expired. Completed records pass the expiry check and still return the recipient profile and comparison result when a valid creator token is supplied.
4. The uncommitted cleanup function deletes invite rows with an elapsed expiry irrespective of status, and rate-limit buckets older than two days. The local cron schedule is daily at 03:15 UTC. Neither file exists in the production source commit; a schedule in local configuration is not evidence of successful production deletion. Even a working daily cron would not delete exactly at the 14-day timestamp.
5. The uncommitted cron route checks the bearer token only when `CRON_SECRET` is set. With no secret it accepts a matching `vercel-cron/1.0` user-agent on Vercel, or any caller outside Vercel. This must fail closed before deployment. Missing/wrong-secret rejection and successful authorised cleanup need meaningful backend tests.
6. No server-delete route, link-revocation control, request-handling process or backup/log erasure schedule was found. Verify deletion authority without exposing the other participant's profile. Resolve what happens to restored backups and recipient-held copies.

These are source findings from both the production baseline and working tree, not tests of aged production records, configured secrets, log settings or a running cleanup job. Backend fixes are intentionally outside this PR.

## Apple licence and subscriptions

Apple's standard EULA is a suitable proposed app licence for the described App Store app: Apple applies it by default when no custom EULA is provided. Confirm the current License Agreement setting for all launch territories before saying unconditionally that Palm uses it. These explanatory Terms are not being submitted as a replacement custom EULA.

The draft links the official EULA, explains monthly/yearly auto-renewing purchases, cancellation in Apple Account subscription settings, restoration using the same Apple Account, and Apple's refund process. It contains no fixed price, promised refund, invented trial offer, governing-law selection, arbitration clause, liability cap or service guarantee.

## Decisions required before publication

| Decision | Required input or verification |
| --- | --- |
| Operator identification | Registered address, company number and country of registration for Avantra Services Ltd. |
| Contact and requests | A working, monitored support/privacy address, receiving destination/provider, responsible handler, identity-verification process and handling of access/correction/deletion/objection requests. `support@getpalm.app` is proposed and is not configured. No mailto link claims that it works. |
| Territory and age | Launch markets, intended minimum user age, likely child users, local consumer/privacy requirements, complaint authority and any required representative or data protection officer. An App Store age rating alone is not the privacy/consent decision. Assess the UK Children's Code if applicable. |
| Lawful bases | Select and document bases per purpose: providing requested invites, security/abuse prevention and handling future support/privacy requests. Identify any legitimate interests and provide a separate objection notice where needed. Camera/notification permission and voluntarily sharing a link do not by themselves settle GDPR lawful bases. |
| Retention | Fix access expiry for public profiles and completed results; verify authorised cleanup and its failure handling; define invite, rate-limit, log, backup and future correspondence periods or criteria. Do not equate expiry with deletion. |
| Provider processing | Verify Vercel/Neon regions, contracts, subprocessors, access controls, logs, backups and international transfer safeguards; link/access the relevant safeguards as needed. Provider corporate privacy notices alone do not prove Palm's processor terms. Neon’s public policy currently redirects to the Databricks privacy notice. |
| Analytics | Confirm whether launch stays local-only. Before enabling exports, specify events/identifiers/purposes, receiving provider, lawful basis, choices and retention, and update the policy and App Privacy answers. |
| Licensing and release | Confirm Apple's standard EULA/custom settings; reconcile native manifests and App Privacy answers; review wording and working contact; set the effective date. Remove draft notices, editorial notes and `noindex,nofollow`, then include approved routes in the sitemap only as part of an authorised publication. |

## Deployment boundary

Vercel normally deploys Git branch pushes/PRs. The clean review branch includes a **PR-only** `vercel.json` with `git.deploymentEnabled["codex/palm-legal-pages-draft"] = false` to prevent automatic deployment of this branch. No dashboard/production settings were changed. The original checkout's untracked `vercel.json` (containing the pending cron) remains byte-for-byte unchanged and is not copied into the PR.

When integrating later backend work, reconcile the separate configuration files deliberately; do not add or deploy the pending cron via this legal-pages PR. A manual deployment or merge remains unauthorised. Draft pages carry `noindex,nofollow` and are intentionally absent from the sitemap; these are draft markers, not access controls.

## Validation

Both `npm run build` production builds passed, including TypeScript and static generation of `/terms` and `/privacy`: the original working tree and the clean PR checkout. Legal-page sources match between the copies; all 12 pre-existing modified/untracked files still match the baseline hashes. `git diff --check` passed.

Rendered checks used `http://127.0.0.1:3187` (original website) and `http://127.0.0.1:3188` (clean PR copy), with production `next start` servers. Browser plugin/skill is not available in this session, so regular Playwright used an existing installation outside the repository; no browser dependencies or package changes were added to the website.

| Check | Result |
| --- | --- |
| Route and page identity | Both routes return 200, correct URL/title, a single expected h1 and substantial policy content. |
| Blank page / framework overlay | No blank page, framework error overlay or server-error text. |
| Responsive rendering | Chromium: 1440×1000, 390×844 and 320×740. WebKit: 390×844 in the clean copy. No horizontal overflow; desktop/mobile screenshots reviewed, including the retention section. |
| Console health | Zero page errors, console errors or warnings in both runs. |
| Navigation | Home footer → Terms → Privacy → home; invite footer → Privacy; contents → section; back to top. Correct targets and visible section positions verified. |
| Keyboard access | Actual focused skip-link element and destination verified, with a visible 2px outline. WebKit uses Option-Tab for link navigation under its default Safari keyboard preference. Footer focus checked too. |
| Draft metadata | `noindex,nofollow`, canonical URLs, no effective date, separate editorial notes, no unconfigured mailto link, and draft routes absent from sitemap. |
| Network boundary | Zero external/API requests during rendered checks. No production records or settings touched. |
| Independent review | One read-only reviewer checked code, styling, disclosures against native/server source and the branch deployment guard. No actionable defects; ready for draft review with publication blockers retained. |

Reproduction: `npm run build`; `npm run start -- --hostname 127.0.0.1 --port 3187`; then run the temporary `/tmp/palm-legal-qa.mjs` with the existing Playwright installation. The clean WebKit run sets `PALM_LEGAL_ORIGIN=http://127.0.0.1:3188`, `PALM_LEGAL_BROWSER=WebKit` and `PALM_LEGAL_QUICK=1`. Results/screenshots are in `/tmp/palm-legal-qa` and `/tmp/palm-legal-qa-clean-webkit`; build logs are `/tmp/palm-legal-working-build.log` and `/tmp/palm-legal-clean-build.log`.

Limits: no real-device/VoiceOver qualification, App Store Connect setting verification, aged production invite test or live cleanup/deletion proof. Backend and operational gaps above remain open.

## Official sources checked on 2 October 2026

- [Apple standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/) and [App Store Connect licence guidance](https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement): default app licence when no custom one is provided.
- [Apple subscriptions](https://developer.apple.com/app-store/subscriptions/), [cancellation](https://support.apple.com/en-gb/118428), [restoration](https://support.apple.com/en-gb/108096) and [refunds](https://support.apple.com/en-gb/118223): subscription wording and user controls.
- [Apple App Review Guidelines, privacy](https://developer.apple.com/app-store/review/guidelines/#privacy): accurate collection/use, recipients, retention/deletion and user choices, and working policy links.
- [ICO privacy-information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/) and [Children's Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/): operator/contact, purposes/bases, recipients/transfers, retention, rights and territory/age decisions. Applicability has not been assumed.
- [Apple privacy](https://www.apple.com/legal/privacy/), [Vercel privacy](https://vercel.com/legal/privacy-policy) and [Neon privacy](https://neon.com/privacy-policy): provider links, not verification of the operator's contracts or settings.
- [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled): branch-specific automatic deployment exclusion.
