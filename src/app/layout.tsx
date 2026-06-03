import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider, CartToast } from "@/lib/cart";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auntycurlcouncil.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/logo.png", apple: "/logo.png" },
  title: "Aunty Council — Accessories for Textured Hair & Melanin-Rich Skin",
  description:
    "Curated accessories for textured hair and melanin-rich skin — bonnets, tools, and skincare devices from brands that understand your texture.",
  openGraph: {
    title: "Aunty Council — Accessories for Textured Hair & Melanin-Rich Skin",
    description:
      "Curated accessories for textured hair and melanin-rich skin — bonnets, tools, and skincare devices from brands that understand your texture.",
    type: "website",
    url: siteUrl,
    siteName: "Aunty Council",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aunty Council — Accessories for Textured Hair & Melanin-Rich Skin",
    description:
      "Curated accessories for textured hair and melanin-rich skin — bonnets, tools, and skincare devices from brands that understand your texture.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aunty Council",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Curated accessories for textured hair and melanin-rich skin — bonnets, tools, and skincare devices.",
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
        <CartProvider>
          {children}
          <CartToast />
        </CartProvider>
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
