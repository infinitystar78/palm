import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Palm, operated by Avantra Services Ltd.",
  alternates: { canonical: "/terms" }
};

const sections: LegalSection[] = [
  {
    id: "about-palm",
    title: "About Palm",
    content: <>
      <p>
        Palm is an iOS palm-reading and compatibility app operated by <strong>Avantra Services Ltd</strong>.
        These terms describe using Palm, its compatibility invites and the getpalm.app website.
      </p>
      <p>
        You must be <strong>18 or older</strong> to use Palm. Availability and subscription
        options can vary by country or region. Nothing in these terms takes away consumer
        rights that apply to you under local law.
      </p>
      <p>
        Readings, daily insights and comparisons are for entertainment and personal reflection.
        They are not scientific personality tests, predictions or medical, psychological,
        financial or other professional advice. Use your own judgement when making decisions
        about your health, relationships or finances.
      </p>
    </>
  },
  {
    id: "app-licence",
    title: "App licence",
    content: <>
      <p>
        Apps downloaded from the App Store are licensed, rather than sold.
        Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> applies
        to the app licence unless the operator provides a custom agreement for your country or region.
        These pages explain Palm’s service and data practices alongside the applicable licence.
      </p>
    </>
  },
  {
    id: "subscriptions",
    title: "Subscriptions and renewal",
    content: <>
      <p>
        Palm offers monthly and yearly premium subscriptions through Apple’s in-app purchase system.
        Before you confirm a purchase, the purchase screen shows the price, billing period
        and features included. The price shown by Apple for your country or region applies.
      </p>
      <p>
        Your Apple Account is charged when you confirm a purchase. Subscriptions renew
        automatically for the selected billing period unless you cancel before renewal.
        Check your subscription settings for the next renewal date and charge.
      </p>
    </>
  },
  {
    id: "manage-purchases",
    title: "Cancellation, restoration and refunds",
    content: <>
      <p>
        On iPhone, open <strong>Settings → your name → Subscriptions → Palm</strong> to
        manage or cancel your subscription. Follow <a href="https://support.apple.com/en-gb/118428">Apple’s cancellation instructions</a> for
        other devices or if you cannot find it. Deleting Palm does not cancel a subscription.
        Apple shows when your access will end after cancellation.
      </p>
      <p>
        Use <strong>Restore purchase</strong> in Palm’s Actions menu or the restore
        option on the purchase screen to check purchases made with your Apple Account.
        Restoration does not create a new subscription or renew an expired one.
        Apple provides <a href="https://support.apple.com/en-gb/108096">help with restoring purchases</a>.
      </p>
      <p>
        Requests for a refund of an Apple purchase go through <a href="https://support.apple.com/en-gb/118223">Apple’s refund process</a>.
        Eligibility depends on Apple’s rules and applicable law; a refund is not guaranteed by these terms.
        Nothing in these terms limits mandatory consumer rights.
      </p>
    </>
  },
  {
    id: "invites-sharing",
    title: "Invites and sharing",
    content: <>
      <p>
        Creating a compatibility invite sends your derived archetype and trait profile to
        Palm’s invite service. <strong>Anyone holding the invite link can retrieve that shared profile</strong>,
        including someone the link is forwarded to. The link is not restricted to a named person.
        Share it only when you are comfortable with that access.
      </p>
      <p>
        Completing an invite sends your derived profile and comparison result to the service.
        The creator can retrieve them using a separate creator token. Invite access ends
        14 days after creation, including for completed comparisons. Expiry does not remove
        copies people have already saved or received.
        Read the <Link href="/privacy#retention">retention section of the Privacy Policy</Link> before sharing.
      </p>
      <p>
        If you export a reading or comparison through the share sheet, the person or service
        you choose receives that content and may retain or forward it.
        Only scan or share another person’s information with their permission.
        Do not misuse invite links, attempt to access private results without authorisation,
        or interfere with the service.
      </p>
    </>
  },
  {
    id: "privacy-contact",
    title: "Privacy and contact",
    content: <>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains processing on your device,
        data sent for invites, service providers, retention and your choices.
      </p>
      <p>
        Contact Avantra Services Ltd at <a href="mailto:hello@avantraservices.co.uk">hello@avantraservices.co.uk</a> for
        support or privacy questions. The company is registered in England and Wales,
        company number <strong>14871429</strong>. Its registered office is Suite 1-2
        Brookfield Court, Selby Road, Leeds, LS25 1NB, United Kingdom.
      </p>
    </>
  }
];

export default function TermsPage() {
  return <LegalPage
    page="terms"
    title="Terms of Use"
    introduction="How Palm works, what a subscription means, and what to consider before sharing."
    sections={sections}
  />;
}
