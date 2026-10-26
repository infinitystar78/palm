# Palm policy finalisation — 26 October 2026

Status: final publication candidate prepared; production verification pending. The live policies remain review drafts until this release. This file records decisions and operational evidence; it is not public policy text or a declaration of worldwide legal compliance.

## Confirmed by Melvin in this task

- Intended audience: adults aged **18 and over**, global launch.
- Support/privacy contact: **hello@avantraservices.co.uk**, monitored and handled by Melvin.
- Retention: delete server invite profiles and comparison results **14 days after invite creation, including completed invites**. Completion must not restart the period.
- Finalise the existing policies and release the result. Preserve the original website's uncommitted work.
- No EU establishment or appointed EU privacy representative. EU distribution readiness remains unresolved; no App Store territories have been changed.

The current app's analytics remain local-only. No analytics export, new mail service, custom app EULA or commercial provider purchase is included in this change.

## Bounded implementation and release plan

1. Work from merged web source `e98e2904e9e30d125eac19c62eca598b24f09fa1` in the isolated checkout. Keep preview deployment disabled on this preparation branch.
2. Enforce the existing invite expiry for pending and completed records. Public reads must return an expired error without profile data. Keep creator-token checks ahead of private-result disclosure.
3. Prepare an authenticated cleanup route for **invite_sessions only**. Missing or wrong cron secrets must fail closed. Do not import the unrelated pending rate-limit code or its table cleanup.
4. Test the actual SQL with an ephemeral PostgreSQL engine, including before/at/after expiry, both statuses, completion behaviour, authorization and cleanup boundaries. No production records are needed for these tests.
5. Verify the actual hosting plan, cron configuration and secret availability, Neon project/region/history/backup settings, and applicable provider processing/transfer arrangements. Any necessary production setting changes must be identified concretely before activation. No payment or new provider agreement is authorised here.
6. Align final copy with the verified deployment, including the cleanup interval and recoverable backup copies. Do not promise instantaneous deletion from every backup or recipient-held copy.
7. Obtain independent review, build and inspect both rendered pages, then release the verified policies and check the public routes. Set the effective date and remove draft markers only when their remaining factual dependencies are resolved.

## Current verified evidence

- Production deployment `dpl_D5zkUsfmc7xSxcdxYoAfutiJcbdJ` remains READY at the merged source above. Vercel reports region `iad1` (United States).
- The existing public read returns expired creator profiles. The private result read only derives expiry for pending rows. Completed results can remain accessible with a valid token.
- The existing schema defaults `expires_at` to 14 days after creation; completing an invite does not extend it. A timestamp is not deletion evidence.
- The pending local cleanup route is absent from production and fails open without `CRON_SECRET`. It remains untouched in the original checkout.
- After Melvin signed in, the provider dashboards supplied the settings unavailable through the initial connector calls. No secret value was revealed, copied or changed.
- Vercel `get_git_deployment_context` confirms **Pro**, despite the team's historic “hobby” name. The current published DPA applies to Pro, including SCCs and the UK addendum where required. No plan purchase or new agreement was submitted.
- Vercel's dashboard shows **CRON_SECRET** configured for Production and Preview (added 2 May), cron feature **Enabled**, currently no deployed jobs, and **no drains associated with this project**. The project offers enabling Observability Plus; the standard Pro runtime-log window documented by Vercel is one day. This is not a guarantee about every provider-held security/business record.
- The Vercel Storage integration for Palm points to Neon **neon-yellow-ocean**, project `solitary-hill-48190702`, organisation `org-purple-king-42819029`, main branch `br-empty-sunset-alq5skxp`. The dashboard confirms **AWS Frankfurt**, **Free**, **one branch**, **six-hour recovery history**, and **no snapshots or snapshot schedule**. This is the Vercel-managed project, not the unrelated personal Neon organisation.
- A read-only production query on 26 October confirmed `expires_at` defaults to `now() + interval '14 days'`. Aggregate counts: **2 records**, both **completed and expired**, **0 nonstandard lifetimes**. No profile values, invite IDs or token hashes were extracted. Querying resumed the archived database compute normally.
- Neon's 14 October 2026 product schedule incorporates Databricks MCSA section 1.1.4 and its DPA; the DPA's section 8 / Annex B supplies SCCs and UK adaptations for restricted transfers. Provider terms do not replace the operator's own transfer assessment or regional launch duties.

## Retention operation and release verification

- Access stops at the stored expiry for pending and completed records. Creator authentication is checked before revealing expiry. Completion does not extend the fourteen days.
- `vercel.json` schedules `/api/cron/expire-invites` **hourly at minute 0 UTC** on the verified Pro plan. Normal deletion is at the next successful hourly run, not the exact expiry second. Vercel can miss/delay runs and does not retry an individual failure. The next run reconciles all overdue records; repeating a run is safe.
- Before claiming production completion, verify the deployed source, the registered cron path, an actual **200** cron invocation, and an aggregate expired-row count of zero. A READY deployment alone is not execution evidence. Vercel does not follow redirects, so verify the actual cron request host and response rather than assuming the bare-domain redirect is harmless.
- Melvin's operating procedure: inspect the cleanup route's recent invocations each working day and after releases/restores; investigate a missing run or non-200 result, correct its cause, then use the authenticated dashboard run action and recheck counts. The current one-day log window requires timely inspection. Automated external alerting is not configured by this change.
- A rollback to the old release restores its cron definitions and expired-read defect. Do not treat it as a retention-safe steady state. Prefer fixing forward; if emergency rollback is necessary, block invite access until the fix is restored and repeat cleanup before reopening.

## Proposed purpose and lawful-basis assessment

This assessment supports final copy; the operator should retain it with the release record.

| Processing | Proposed basis and scope |
| --- | --- |
| Providing an invite or comparison the user requests | Contract necessity, limited to the derived profile, result and operational invite fields needed to deliver that feature. Optional sharing does not mean all processing relies on consent. |
| Subscription entitlement and purchase support | Contract necessity for access to purchased features; Apple handles its own payment processing. |
| Service delivery, fault diagnosis and abuse prevention | Ordinary legitimate interests in running and protecting Palm. The purpose is service reliability/security, not advertising, identity verification or profiling for consequential decisions. |
| Support correspondence | Contract where needed to resolve a service request; legitimate interests in answering general enquiries and maintaining a proportionate record. |
| Privacy-rights requests and legally required records | Legal obligation where applicable. Keep only the evidence needed to identify, handle and document the request. |

For security/support legitimate interests: technical request information and minimal correspondence help investigate failures and misuse; indiscriminate profile logging or retaining complete payloads indefinitely is not necessary. Users can reasonably expect operational processing, but invite links and derived profiles can be personal and revealing. Restrict operator access, avoid logging tokens/payloads, establish retention, and offer a clear right to object. Review this assessment if providers, purposes, audience or collected fields change. It does not justify nonessential analytics export.

Local-only analytics require a separate device-storage/consent or applicable-exception assessment before the app ships; lack of upload does not by itself settle that question. Keep the policy accurate about the current implementation and track any native choice/disablement work in SKU-7.

## Privacy-request procedure

Owner: Melvin, via the confirmed address above.

1. Record receipt, requested action, relevant jurisdiction and the legal response deadline. Acknowledge the request and explain any proportionate information needed to locate records. Do not impose an invented short service guarantee.
2. Ask for the invite identifier if known, not a raw palm image, full card data or creator token by email. The public link alone does not authenticate a creator or a recipient. Verify authority through an appropriate secure method before disclosing or changing another person's data; document the method used. Do not collect a government ID by default.
3. Separate local-only records, server invite records, service logs, correspondence and copies held by Apple or recipients. Explain which records the operator can access. Do not claim to erase device backups or other people's exports remotely.
4. Use restricted operator access to retrieve or remove only the verified person's relevant server data. The parameterised `database/erase-invite.sql` deletes one identified invite and returns a count. Run it in a transaction through an authorised database client with the verified ID bound as `$1`; check that at most one row is affected before commit. Never run a blanket deletion for an individual request. If a request affects both participants, assess the impact and protect the other person's information. Access has been verified through the provider's SQL editor; the exact erasure SQL is rehearsed against synthetic local records, including isolation, a repeated request and subsequent 404 responses. No real person's data was used for this rehearsal.
5. Record applicable exceptions or a justified inability to identify records, explain the response and complaint options, and comply with the applicable deadline. UK access requests normally require a response within one calendar month; use the current ICO rules for permitted extensions/pauses rather than a blanket 30-day promise.
6. Keep correspondence while resolving the request and only as long as needed to evidence the response, deal with an active dispute or meet a specific legal duty. Periodically review and delete unnecessary attachments and identity evidence. Confirm the mailbox's actual retention/backup configuration before promising a fixed period.
7. A database restore must not reopen expired invites. Reapply expired-record cleanup and any recorded erasures before returning restored data to service. Any erasure record must itself be minimal, access-restricted and retained only for the relevant restore window.

## Global launch checks that copy cannot settle

- The 18+ rule is an eligibility term, not an implemented age gate. Assess likely child access and align App Store age settings with the actual product.
- Melvin confirms **no EU establishment or representative**. EDPB guidance describes an EU representative requirement for a non-EU organisation offering services to people in the EU, with a narrow occasional-processing exception. Treat EU distribution as an unresolved launch gate: appoint a representative and add their contact details, or obtain a documented assessment of an applicable exception / revise launch territories. Do not assume an ongoing global app qualifies. Publishing an accurate policy does not resolve this gate.
- Preserve mandatory local consumer/privacy rights and the ability to complain to the user's local regulator. Do not claim the policy alone establishes compliance in every launch country.
- App Store Connect EULA selection, privacy answers and other launch metadata remain separate store-readiness work. Apple's standard EULA applies when no custom EULA has been supplied; these explanatory Terms are not a custom EULA submission.

## Candidate validation

- Independent code review found no P1/P2 defects in expiry, creator authorization, deletion SQL or fail-closed cleanup. The subsequent final-copy review also found no P1/P2 issues against the verified provider settings.
- The original ten-case regression run reproduced four expiry failures before the fix. The expanded suite covers boundary reads, unchanged completion lifetime, no payload leakage, missing/wrong cron credentials, safe repeated cleanup and a single-invite erasure rehearsal using real PostgreSQL SQL in PGlite.
- Next upgraded from 16.2.4 to patched 16.4.3 after the audit flagged the old version. The installed tree has zero known npm audit vulnerabilities. Removed deprecated TypeScript `baseUrl`; the existing relative path mapping is unchanged.
- Tests support Node 22.12+, 24+ and 26+; production uses Node 24 and local checks use Node 26.4.0.
- Final local checks: **19 tests passed**, production build and TypeScript passed, npm audit **0 vulnerabilities**, and `git diff --check` passed. Both pages were reviewed at 1440, 390 and 320 pixels: one h1, correct active navigation/contact/date, valid contents anchors, no draft markers and no horizontal overflow. Keyboard skip navigation focused the main content; the retention contents link focused its heading. No browser warnings/errors were recorded. Production execution evidence will be recorded in the PR/release update.
- Hash verification confirmed all **20 pre-existing modified/untracked files** in the original website checkout were unchanged. All edits are confined to the isolated delivery checkout.

## Official references checked for this preparation

- [Apple default licence guidance](https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement) and [standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).
- [ICO privacy information](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/), [storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/), [legitimate interests](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/legitimate-interests/) and [access-request timing](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/right-of-access/what-should-we-consider-when-responding-to-a-request/).
- [Vercel DPA](https://vercel.com/legal/dpa), [runtime logs](https://vercel.com/docs/logs/runtime) and [Neon product terms](https://neon.com/platform-terms). Published defaults are not account-setting verification.
- [EDPB territorial-scope guidance, final version](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en.pdf).
