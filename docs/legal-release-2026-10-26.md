# Palm legal-page draft publication — 26 October 2026

The user requested that the existing pages go live. This release makes `/terms` and `/privacy` reachable as **review drafts**, retaining the visible draft notice, `noindex,nofollow`, no effective date and unresolved editorial notes. It does not turn incomplete copy into final policies or establish App Store submission readiness.

## Release plan and boundary

1. Use PR #1's clean branch, not the original dirty checkout. Add only verified operator/contact facts and update the review date.
2. Build and check both routes, mobile/desktop rendering, navigation, draft labels and the contact links locally. Obtain one independent release review.
3. Update and merge the reviewed PR into `main`, then verify the Vercel production deployment serves the intended commit. If automatic deployment is unavailable, use the existing Vercel project and exact merged commit.
4. Check both required public URLs, rendered content and home/invite/Apple-association smoke checks. Record the deployment and retain the previous production deployment as the rollback target.

Existing invite API, rate limiting, schema, cleanup, README and cron changes are excluded. The original website's 20 modified/untracked files were baselined before this work. No email service, DNS change, database migration or native app change is included. `vercel.json` continues to block automatic deployment of the draft branch only; `main` retains normal Git deployment behavior.

## Verified facts

- Companies House identifies Avantra Services Ltd as company **14871429**, registered office **Suite 1-2 Brookfield Court, Selby Road, Leeds, LS25 1NB, United Kingdom**. Avantra's own site confirms registration in England and Wales and the same address/number.
- Avantra already publishes **hello@avantraservices.co.uk** as its privacy contact. The domain has a Microsoft 365 MX record. These checks confirm the published contact and mail routing, not a delivery test; no email was sent.
- `getpalm.app` has no published MX record in this check. No `support@getpalm.app` mailbox is assumed or created.
- Native source remains at `b61f5fc0a9ab471428a2884b29d1f318d266390b`; no production analytics export sink/call site is configured. This release changes neither analytics nor subscriptions.
- Before this release, both legal URLs still returned 404 after the existing redirect to `www.getpalm.app`. The latest production deployment was `dpl_CXuzZ8psFHho9oiGSLECLUyh5saS`, from web commit `918f0b0c7b3edf10ea0dd07aef5ba3f49d428e91`. This is the rollback reference.
- The deployment target is the existing `palm` Next.js project `prj_WK658pr3addoukEVTQeGlpFId9D6`, team `team_IjDA4Ma9kz3UuAgvayyVXdIT`, linked to `infinitystar78/palm`. No domain or production settings are changed by this scope.

## Remaining decisions

The existing privacy draft still identifies unresolved lawful bases/rights, launch markets and age, provider/transfer practices, log/backup retention, verified invite deletion and request handling, final launch analytics and App Store EULA/privacy settings. No automatic deletion or guaranteed anonymity is asserted. Existing expired-profile access remains unchanged in production. The pending cleanup code and its authentication issue are excluded from this release and remain separate uncommitted backend work.

## Evidence

`npm run build` passed with TypeScript checks and static generation of both legal routes. Playwright using the existing Chromium installation passed both routes at 1440×1000, 390×844 and 320×740. Checks covered HTTP 200, titles/content, company/contact links, draft status, canonical/robots metadata, no horizontal overflow, contents/back-to-top links, keyboard skip/focus and home/invite/footer navigation. There were zero console/page errors or warnings and no external/API requests. Screenshots and results are saved outside the repository at `/tmp/palm-legal-live-qa-2026-10-26`. Browser plugin is unavailable; no website/browser dependency was added.

One independent read-only release review found no P1/P2 defect for publishing as review drafts. Its P3 note distinguishing existing production expiry behavior from the excluded cleanup code was corrected above. All 20 pre-existing modified/untracked files and the original website branch/index remain unchanged. API, schema and README source matches `origin/main`; no cleanup route is present in the release checkout.

Production results are verified after merge. A successful public response confirms availability of the draft, not resolution of the remaining policy questions.

## Current official/public references

- [Companies House](https://find-and-update.company-information.service.gov.uk/company/14871429)
- [Avantra's published privacy contact and company details](https://www.avantraservices.co.uk/privacy)
- [Apple's default EULA guidance](https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement/)
- [ICO privacy-information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/)
