import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Aunty Curl Council",
  description: "How Aunty Curl Council collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 16, 2026">
      <p>
        This Privacy Policy explains what information we collect, how we use it,
        and the choices you have. We keep this short and in plain language on
        purpose.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>We collect your email and hair information only to give you personalized recommendations.</li>
        <li>We don&rsquo;t sell your data. Ever.</li>
        <li>We use trusted third parties (Stripe, Supabase) to run the business — they only see what they need.</li>
        <li>You can delete your data any time by emailing us.</li>
      </ul>

      <h2>1. What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li><strong>Email address</strong> — when you join the waitlist, become a Founding Member, or contact us.</li>
        <li><strong>Hair information</strong> — curl pattern, density, concerns, and goals you share in the consultation.</li>
        <li><strong>Payment information</strong> — processed and stored by Stripe. We never see or store your full card number.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Basic usage data (pages viewed, clicks) via privacy-friendly analytics.</li>
        <li>Device and browser information for security and debugging.</li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To provide the Service — personalized hair care guidance and routines.</li>
        <li>To send important messages (launch notifications, receipts, service updates).</li>
        <li>To improve the product based on aggregate, anonymized patterns.</li>
        <li>To comply with legal obligations (tax, fraud prevention, court orders).</li>
      </ul>

      <h2>3. Who we share it with</h2>
      <p>We share data only with service providers that help us run the business:</p>
      <ul>
        <li><strong>Stripe</strong> — payment processing. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener">Stripe&rsquo;s Privacy Policy</a>.</li>
        <li><strong>Supabase</strong> — database hosting for your account and email list.</li>
        <li><strong>Vercel</strong> — website hosting and delivery.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell, rent, or trade your personal information
        to third parties for marketing purposes.
      </p>

      <h2>4. Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
        <li><strong>Correct</strong> — fix anything that&rsquo;s wrong.</li>
        <li><strong>Delete</strong> — ask us to remove your data. We&rsquo;ll do this unless we&rsquo;re legally required to keep it.</li>
        <li><strong>Opt out</strong> — unsubscribe from emails anytime using the link in each email.</li>
      </ul>
      <p>
        To exercise any of these, email{" "}
        <a href="mailto:hello@auntycurlcouncil.com">hello@auntycurlcouncil.com</a>.
        We&rsquo;ll respond within 30 days.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We keep your data only as long as needed to provide the Service or comply
        with legal obligations. If you delete your account, we erase your personal
        data within 30 days (though we may retain anonymized aggregate data and
        transaction records required by law).
      </p>

      <h2>6. Security</h2>
      <p>
        We use industry-standard encryption in transit (TLS) and at rest. We limit
        access to your data to team members who need it to do their job. No system
        is 100% secure, but we take this seriously.
      </p>

      <h2>7. Children</h2>
      <p>
        The Service is not directed at children under 13. We do not knowingly
        collect information from children. If you believe we have, email us and
        we&rsquo;ll delete it.
      </p>

      <h2>8. International users</h2>
      <p>
        Our servers are based in the United States. By using the Service, you
        consent to your data being processed in the US. If you&rsquo;re in the EU
        or UK, you have additional rights under GDPR that we&rsquo;ll honor on
        request.
      </p>

      <h2>9. Changes to this Policy</h2>
      <p>
        If we make significant changes, we&rsquo;ll notify you by email or on-site
        notice at least 14 days before they take effect.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions, concerns, or data requests? Email{" "}
        <a href="mailto:hello@auntycurlcouncil.com">hello@auntycurlcouncil.com</a>.
      </p>
    </LegalLayout>
  );
}
