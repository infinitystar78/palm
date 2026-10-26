import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Draft",
  description: "Draft privacy policy for Palm, operated by Avantra Services Ltd.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false }
};

const sections: LegalSection[] = [
  {
    id: "operator",
    title: "Who operates Palm",
    content: <>
      <p>
        <strong>Avantra Services Ltd</strong> operates Palm and is responsible for the
        personal data processed through its service. This policy covers the Palm iOS app,
        Palm App Clip, compatibility invite service and getpalm.app website.
      </p>
      <p>
        Avantra Services Ltd is registered in England and Wales, company number <strong>14871429</strong>.
        Its registered office is Suite 1-2 Brookfield Court, Selby Road, Leeds, LS25 1NB, United Kingdom.
        For privacy questions, email <a href="mailto:hello@avantraservices.co.uk">hello@avantraservices.co.uk</a>.
        This draft explains the current implementation; the review notes identify decisions
        that must be resolved before it becomes an effective policy.
      </p>
    </>
  },
  {
    id: "camera",
    title: "Camera and on-device readings",
    content: <>
      <p>
        With your camera permission, Palm processes camera input and hand features on your
        device to generate readings and derived archetype and trait profiles.
        The invite requests made by the app send those derived profiles and comparison results,
        <strong> not raw camera images or hand landmark coordinates</strong>.
      </p>
      <p>
        Archetypes and traits are entertainment and reflection content. They are not used
        by Palm to verify your identity or make medical assessments.
        Derived data shared in an invite can still relate to you; it is not guaranteed to be anonymous.
      </p>
    </>
  },
  {
    id: "local-data",
    title: "Information stored on your device",
    content: <>
      <p>
        Palm stores readings, stable profiles, saved insights, check-in history, preferences,
        comparison state and creator access tokens locally to provide those features and
        remember your progress. These local records are not routinely uploaded by the app
        as a reading history. Data you choose to send in an invite is described below.
      </p>
      <p>
        Device backups may include local app data, depending on your Apple and device settings.
        Creating a share image or video can also create a local export file.
        Copies you save or send elsewhere are controlled by you and the destination you choose.
      </p>
    </>
  },
  {
    id: "invite-data",
    title: "Compatibility invites and server data",
    content: <>
      <ul>
        <li><strong>When you create an invite:</strong> your derived archetype and trait profile is sent to the invite service so someone else can compare with it.</li>
        <li><strong>When you complete an invite:</strong> your derived profile and comparison result are sent so the creator can receive the comparison.</li>
        <li><strong>For the invite to work:</strong> the service stores an invite identifier, status, creation and completion timestamps, an expiry time and a hashed creator access token.</li>
      </ul>
      <p>
        Anyone with an invite link can retrieve the creator’s shared profile, including people
        who receive a forwarded link. Retrieving the recipient’s profile and completed result
        through the creator’s result endpoint requires the separate creator token.
        Sharing the link is therefore a disclosure of the creator’s profile, not a private invitation to one person.
      </p>
      <p>
        People can also keep profiles or results already received in their local app data or
        saved exports. Server deletion cannot remove copies held by recipients.
      </p>
    </>
  },
  {
    id: "usage",
    title: "Usage measurements",
    content: <>
      <p>
        The current app records usage events locally, such as scans, insight views,
        acknowledgements, shares, comparison views, paywall views and completed purchases.
        Records include event identifiers, dates, event properties and activity summaries.
        They support local measurement of app use; event names are also written to device diagnostic logs.
      </p>
      <p>
        Recent storage is limited to 1,000 events. Summary counts and activity state can remain
        after older events are removed. No production analytics upload service is currently
        configured. The launch analytics choice still needs confirmation; this section must
        be updated before any analytics export is enabled.
      </p>
    </>
  },
  {
    id: "apple",
    title: "Apple purchases and reminders",
    content: <>
      <p>
        Apple processes subscription purchases and payment information. Palm uses StoreKit
        purchase and entitlement information to check subscription status, restore purchases
        and unlock premium features. Palm does not receive your full payment card details.
        Apple’s processing is described in <a href="https://www.apple.com/legal/privacy/">Apple’s privacy policy</a>.
      </p>
      <p>
        Optional daily reminders are local device notifications. You can change notification
        permission in iOS Settings. The reviewed reminder feature does not register an
        address with Palm for marketing emails or use a Palm remote-push service.
      </p>
    </>
  },
  {
    id: "providers",
    title: "Providers and technical information",
    content: <>
      <p>
        <strong>Vercel</strong> hosts the website and invite API, and <strong>Neon</strong> provides
        the database for invite records. They process service data to host, deliver and store
        the features you request. Requests to the website or invite API expose technical
        information to the infrastructure, such as your IP address, request URL, time and browser or app request headers.
        Operational logs may contain request information and errors.
      </p>
      <p>
        Pending rate-limit work uses a hashed network identifier, route, time window and
        request count to limit abuse. Its production status has not been verified, and hashing
        does not make that information guaranteed anonymous or prevent hosting logs from containing IP addresses.
      </p>
      <p>
        The reviewed website does not include an advertising tracker or an analytics export
        integration. The applicable provider contracts, processing locations, international
        transfer safeguards, operational access and log and backup retention still need confirmation.
        Provider information is available from <a href="https://vercel.com/legal/privacy-policy">Vercel</a> and <a href="https://neon.com/privacy-policy">Neon</a>.
      </p>
    </>
  },
  {
    id: "retention",
    title: "Retention and deletion",
    content: <>
      <p>
        Local records remain until they are removed or replaced by the app or you remove
        its stored data. Starting a new scan clears the stored reading, saved insight records
        and completed comparison count, but it is <strong>not a full data reset</strong>:
        check-in history, preferences, usage summaries and saved invite sessions can remain.
      </p>
      <p>
        New invites have a 14-day expiry time for completing a comparison.
        <strong> This is not a guaranteed deletion date.</strong> In the current server code,
        expired creator profiles and completed results can still be retrieved while their
        records remain. A verified server deletion schedule has not been established.
      </p>
      <p>
        Deleting the app or starting a new scan does not delete server invite records,
        cancel an Apple subscription or remove copies shared with others. Offloading the
        app can retain local data, and device backups or previously exported files can retain copies.
        Invite records, service logs and backups each need a confirmed retention period or deletion criterion.
      </p>
    </>
  },
  {
    id: "choices",
    title: "Your choices and privacy requests",
    content: <>
      <ul>
        <li>Decline camera access or change it in iOS Settings. Camera-based scanning needs this permission.</li>
        <li>Change notification permission in iOS Settings to stop optional reminders.</li>
        <li>Choose whether to create or complete an invite and whether to export a reading or comparison. Stopping future sharing does not withdraw links or copies already sent.</li>
        <li>Use Apple’s device and backup controls to manage local app data and backups. Manage subscription cancellation separately in your Apple Account.</li>
      </ul>
      <p>
        Depending on your location and the applicable legal basis, you may have rights to
        access, correct, delete or obtain a copy of personal data, restrict its use, or object
        to certain processing. Where processing relies on consent, you may have the right to withdraw it.
        You may also have the right to complain to your data protection authority.
      </p>
      <p>
        For privacy questions or requests, email <a href="mailto:hello@avantraservices.co.uk">hello@avantraservices.co.uk</a>.
        A verified process for server-data requests still needs to be established.
        There is currently no in-app control to delete server invites.
        Any request process must verify authority over the relevant invite without exposing
        another person’s data. Do not post creator tokens or private request details publicly.
      </p>
    </>
  }
];

export default function PrivacyPage() {
  return <LegalPage
    page="privacy"
    title="Privacy Policy"
    introduction="What stays on your device, what an invite shares, and the choices you have."
    sections={sections}
    reviewNotes={<ul>
      <li>The company details and existing Avantra privacy contact have been checked against Companies House and Avantra’s published policy. A separate Palm mailbox has not been created. Finalise the request-handling procedure.</li>
      <li>Choose and document lawful bases for invites, security and support; identify any legitimate interests and provide a clear, separate right-to-object notice where applicable. Camera permission and choosing to share are not a substitute for this assessment.</li>
      <li>Set and test invite access expiry and deletion, including completed invites; define log, rate-limit, backup and support-request retention, deletion verification and restore handling.</li>
      <li>Confirm Vercel and Neon processing regions, contracts, subprocessors, access controls and any international transfer safeguards. Do not infer deployed rate limiting or cleanup from local code.</li>
      <li>Confirm launch countries, user age and children’s privacy requirements, applicable rights, complaint authority and whether representatives or a data protection officer are needed.</li>
      <li>Confirm the launch analytics choice and reconcile this policy with both privacy manifests and App Store privacy answers. Add the actual request procedure and effective date after review; remove editorial notes and search-engine exclusions only for an authorised publication.</li>
    </ul>}
  />;
}
