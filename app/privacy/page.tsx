import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Palm, operated by Avantra Services Ltd.",
  alternates: { canonical: "/privacy" }
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
        configured. This policy describes that version of Palm. Analytics export would be
        a change to these data practices and would need updated privacy information.
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
    id: "purposes",
    title: "Why we use information",
    content: <>
      <p>
        For information processed through our service, we rely on the following legal
        bases where UK or European data protection law applies:
      </p>
      <ul>
        <li><strong>Providing the service you request:</strong> we use the information necessary to create and complete invites, return comparisons, recognise subscription access and resolve related support requests to perform our contract with you.</li>
        <li><strong>Keeping the service working and secure:</strong> we use necessary technical request information to diagnose failures and prevent misuse. This serves our legitimate interests in operating and protecting Palm.</li>
        <li><strong>Answering general enquiries:</strong> we use your contact details and message to respond and keep a proportionate record of the conversation, in our legitimate interests in supporting people who contact us.</li>
        <li><strong>Meeting legal duties:</strong> we process information needed to handle applicable privacy-rights requests or comply with a specific legal requirement.</li>
      </ul>
      <p>
        You do not have to create or complete an invite. If you choose not to send the
        required derived profile, the online comparison feature cannot work. Camera and
        notification permissions are device controls; they do not authorise unrelated uses
        of information. Palm does not use readings to make decisions with legal or similarly
        significant effects on you.
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
        The invite API processes requests in the United States, and the invite database
        is in Frankfurt, Germany. These providers and their subprocessors may also process
        information in other countries for service delivery, security and support.
      </p>
      <p>
        For transfers that require contractual safeguards under UK or European law, the
        providers’ data-processing terms include the European Commission’s Standard
        Contractual Clauses and the applicable UK transfer addendum. You can read
        {" "}<a href="https://vercel.com/legal/dpa">Vercel’s data-processing terms</a> and
        {" "}<a href="https://neon.com/platform-terms">Neon’s terms and incorporated data-processing agreement</a>,
        or contact us for information about the safeguards relevant to your data.
      </p>
      <p>
        The website does not include an advertising tracker or an app-usage analytics export
        integration. Providers also process some technical and account information for their
        own service-security and business purposes, as explained in the privacy information
        from <a href="https://vercel.com/legal/privacy-policy">Vercel</a> and
        {" "}<a href="https://neon.com/privacy-policy">Neon</a>.
      </p>
    </>
  },
  {
    id: "contact-data",
    title: "Support and privacy correspondence",
    content: <>
      <p>
        If you contact us, we receive your email address, the content of your message and
        any details or attachments you choose to send. We use this information to respond,
        investigate the issue and handle privacy requests. Our email provider processes
        correspondence to deliver and store it for us.
      </p>
      <p>
        Please send only what is needed to explain your request. Do not email payment card
        details, raw palm images or creator access tokens. If more information is needed
        to locate a record or verify your authority, we will explain what is needed and why.
      </p>
      <p>
        We keep correspondence while resolving your enquiry or request, and afterwards only
        where needed to document our response, deal with an active dispute or meet a specific
        legal duty. We review retained correspondence and remove information that is no longer
        needed, including unnecessary attachments and verification material.
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
        <strong>Server invite access ends 14 days after the invite was created.</strong>
        {" "}This applies to pending and completed invites; completing an invite does not
        restart the period. The server then refuses access to the shared profiles and results.
        An hourly cleanup task deletes expired invite records, including both participants’
        shared profiles and any comparison result. Deletion normally happens on the next
        hourly run, rather than at the exact expiry second. A failed or delayed run can
        delay deletion; the access cutoff still applies while the record remains.
      </p>
      <p>
        Deleted database records may remain recoverable within the database’s six-hour
        recovery-history window. Recovery copies are not available through invite links.
        If we restore data, expired invites remain blocked and applicable erasures must
        be reapplied before restored data returns to service. No additional database
        snapshots are configured for this service.
      </p>
      <p>
        Hosting runtime logs used for troubleshooting are available to us within Vercel’s
        current one-day standard retention window. We have no separate log-export destination
        configured. This window does not describe every record the providers may keep for
        their own security, billing or legal purposes; their privacy notices explain those uses.
        Correspondence follows the retention criteria in the support section above.
      </p>
      <p>
        Deleting the app or starting a new scan does not delete server invite records,
        cancel an Apple subscription or remove copies shared with others. Offloading the
        app can retain local data, and device backups or previously exported files can retain copies.
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
        Describe what you would like us to do and include the invite identifier if you know it.
        There is currently no in-app control to delete server invites. We may need proportionate
        information to locate your records and verify your authority before disclosing or
        changing data. We cannot access records that remain only on your device, and possession
        of a public invite link alone does not establish authority over another person’s information.
        Do not post creator tokens or private request details publicly.
      </p>
      <p>
        You can complain to the UK <a href="https://ico.org.uk/make-a-complaint/">Information
        Commissioner’s Office (ICO)</a>, or to your local privacy regulator where applicable.
        Contacting us first can help us resolve a concern, but does not limit your right to complain.
      </p>
    </>
  },
  {
    id: "object",
    title: "Your right to object",
    content: <>
      <p>
        <strong>You can object to processing based on our legitimate interests</strong>
        {" "}where that right applies, including by explaining circumstances particular to you.
        Email <a href="mailto:hello@avantraservices.co.uk">hello@avantraservices.co.uk</a> to exercise it.
        We will assess the objection and stop the relevant processing unless applicable law
        permits us to continue, for example because of compelling grounds or a legal claim.
      </p>
    </>
  },
  {
    id: "adults",
    title: "Adults aged 18 and over",
    content: <>
      <p>
        Palm is intended for adults aged 18 and over. If you believe someone under 18 has
        sent personal data to Palm, contact <a href="mailto:hello@avantraservices.co.uk">hello@avantraservices.co.uk</a>
        {" "}so we can assess the request and the steps needed. This age requirement does not
        mean the app verifies each user’s age.
      </p>
    </>
  },
  {
    id: "policy-changes",
    title: "Changes to this policy",
    content: <p>
      We update this page when Palm’s data practices change and show the effective date
      above. Where a change requires notice or a choice under applicable law, we will
      provide it before applying that change to your information.
    </p>
  }
];

export default function PrivacyPage() {
  return <LegalPage
    page="privacy"
    title="Privacy Policy"
    introduction="What stays on your device, what an invite shares, and the choices you have."
    sections={sections}
  />;
}
