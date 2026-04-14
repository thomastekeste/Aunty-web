import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/logo.png", apple: "/logo.png" },
  title: "Aunty Curl Council — Your Aunties Have Been Waiting",
  description:
    "AI-powered personalized hair care from seven aunties who actually understand your texture. Take the free consultation and get your routine.",
  openGraph: {
    title: "Aunty Curl Council",
    description: "Your Aunties Have Been Waiting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
