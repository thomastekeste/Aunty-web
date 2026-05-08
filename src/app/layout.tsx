import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auntycurlcouncil.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/logo.png", apple: "/logo.png" },
  title: "Aunty Council — Hair & Skin, Aunty Curated",
  description:
    "A curated marketplace of hair and skin products — each one recommended by an aunty who knows your texture. Take the free consultation and shop your picks.",
  openGraph: {
    title: "Aunty Council — Hair & Skin, Aunty Curated",
    description:
      "A curated marketplace of hair and skin products recommended by seven aunties who actually know your texture.",
    type: "website",
    url: siteUrl,
    siteName: "Aunty Council",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Aunty Council",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Aunty Council — Hair & Skin, Aunty Curated",
    description:
      "A curated marketplace of hair and skin products recommended by seven aunties who actually know your texture.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aunty Council",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "A curated marketplace of hair and skin products — each one recommended by an aunty who knows your texture.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@auntycurlcouncil.com",
    contactType: "customer support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
