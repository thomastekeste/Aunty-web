import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

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
      "A curated marketplace of hair and skin products — each one matched to your texture through a free AI consultation.",
    type: "website",
    url: siteUrl,
    siteName: "Aunty Council",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aunty Council — Hair & Skin, Aunty Curated",
    description:
      "A curated marketplace of hair and skin products — each one matched to your texture through a free AI consultation.",
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
        <CartProvider>{children}</CartProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
