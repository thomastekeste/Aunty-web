import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy — Aunty Curl Council",
  description: "Our refund policy for Founding Members.",
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="April 16, 2026">
      <p>
        We want you to feel safe backing us early. This page explains exactly
        when and how you can get your money back.
      </p>

      <h2>The short version</h2>
      <ul>
        <li><strong>If we don&rsquo;t launch:</strong> full refund. No questions.</li>
        <li><strong>If you cancel before launch:</strong> full refund.</li>
        <li><strong>After launch:</strong> pro-rated refund within 14 days if the product isn&rsquo;t what we promised.</li>
      </ul>

      <h2>1. If we don&rsquo;t launch</h2>
      <p>
        Aunty Curl Council plans to launch in the coming weeks. If we are unable
        to launch the app for any reason &mdash; technical, business, or
        otherwise &mdash; every Founding Member will receive a{" "}
        <strong>100% refund</strong> of the amount paid, processed back to the
        original payment method within 10 business days of our announcement.
      </p>
      <p>
        You don&rsquo;t need to request this. We&rsquo;ll initiate it automatically.
      </p>

      <h2>2. If you change your mind before launch</h2>
      <p>
        You can request a full refund at any time before the app launches. Just
        email{" "}
        <a href="mailto:hello@auntycurlcouncil.com">hello@auntycurlcouncil.com</a>{" "}
        from the address you used to purchase. We&rsquo;ll process the refund
        within 5 business days.
      </p>

      <h2>3. After launch</h2>
      <p>
        Once the app launches and you have access:
      </p>
      <ul>
        <li>
          <strong>Within 14 days of launch</strong> &mdash; if the product
          meaningfully differs from what was promised (e.g., aunties are missing,
          consultations don&rsquo;t work), you can request a pro-rated refund for
          unused time.
        </li>
        <li>
          <strong>After 14 days</strong> &mdash; Founding Member purchases are
          non-refundable, but you keep all the founding benefits (locked price,
          badge, etc.) for the period you paid for.
        </li>
      </ul>

      <h2>4. How to request a refund</h2>
      <ol>
        <li>
          Email{" "}
          <a href="mailto:hello@auntycurlcouncil.com">hello@auntycurlcouncil.com</a>{" "}
          from the email address used for purchase.
        </li>
        <li>
          Include: the email on file, approximate purchase date, and reason
          (optional but helpful).
        </li>
        <li>
          We&rsquo;ll reply within 2 business days with confirmation and a
          timeline.
        </li>
      </ol>

      <h2>5. How long refunds take</h2>
      <p>
        Once approved, refunds are processed through Stripe back to your original
        payment method. Stripe typically delivers funds within 5&ndash;10 business
        days, though your bank may take longer to reflect the credit.
      </p>

      <h2>6. Exceptions</h2>
      <p>
        We reserve the right to refuse refunds in cases of fraud, chargebacks
        filed without contacting us first, or abuse of this policy (e.g., repeat
        purchase-and-refund patterns).
      </p>

      <h2>7. Questions</h2>
      <p>
        If anything about this policy is unclear, email us at{" "}
        <a href="mailto:hello@auntycurlcouncil.com">hello@auntycurlcouncil.com</a>{" "}
        before purchasing. We&rsquo;d rather answer your question than process a
        refund later.
      </p>
    </LegalLayout>
  );
}
