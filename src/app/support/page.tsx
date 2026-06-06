import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Support — Aunty Council",
  description:
    "Get help with your Aunty Council account, subscriptions, purchases, and more.",
};

export default function SupportPage() {
  return (
    <LegalLayout title="Support" lastUpdated="June 6, 2026">
      <p>
        Need help? We&rsquo;ve got you. Below are answers to the most common
        questions. If you don&rsquo;t see what you need, email us and a real
        person will get back to you within 24 hours.
      </p>

      <h2>Contact us</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@auntycurl.com">
          <strong>support@auntycurl.com</strong>
        </a>
      </p>
      <p>
        We respond within 24 hours, Monday through Friday. If you reach out on a
        weekend, expect a reply the following Monday.
      </p>

      <h2>How to cancel your subscription</h2>
      <p>
        Aunty Council subscriptions are managed through the App Store. To cancel:
      </p>
      <ol>
        <li>
          Open <strong>Settings</strong> on your iPhone.
        </li>
        <li>
          Tap your name at the top to open <strong>Apple&nbsp;ID</strong>.
        </li>
        <li>
          Tap <strong>Subscriptions</strong>.
        </li>
        <li>
          Find <strong>Aunty Council</strong> and tap it.
        </li>
        <li>
          Tap <strong>Cancel Subscription</strong> and confirm.
        </li>
      </ol>
      <p>
        Your access continues until the end of the current billing period. No
        partial refunds are issued for unused time.
      </p>

      <h2>How to restore purchases</h2>
      <p>
        If you reinstalled the app or switched devices and your subscription
        isn&rsquo;t showing:
      </p>
      <ol>
        <li>
          Open the <strong>Aunty Council</strong> app.
        </li>
        <li>
          Go to <strong>Settings</strong> (gear icon, bottom right).
        </li>
        <li>
          Tap <strong>Restore Purchases</strong>.
        </li>
      </ol>
      <p>
        The app will check your Apple&nbsp;ID for active subscriptions and
        unlock your access automatically. Make sure you&rsquo;re signed in with
        the same Apple&nbsp;ID you used to subscribe.
      </p>

      <h2>How to delete your account</h2>
      <p>
        You can permanently delete your account and all associated data from
        inside the app:
      </p>
      <ol>
        <li>
          Open the <strong>Aunty Council</strong> app.
        </li>
        <li>
          Go to <strong>Settings</strong> (gear icon, bottom right).
        </li>
        <li>
          Tap <strong>Delete Account</strong>.
        </li>
        <li>
          Confirm when prompted.
        </li>
      </ol>
      <p>
        This permanently removes your profile, hair data, chat history, and
        progress photos. This action cannot be undone. If you have an active
        subscription, remember to cancel it separately through the App Store
        (see above) — deleting your account does not automatically cancel
        billing.
      </p>

      <h2>Other questions</h2>
      <p>
        For anything else — billing issues, product questions, partnership
        inquiries — email{" "}
        <a href="mailto:support@auntycurl.com">support@auntycurl.com</a> and
        we&rsquo;ll take care of it.
      </p>
    </LegalLayout>
  );
}
