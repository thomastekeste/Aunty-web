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
    "Seven culturally-rooted AI aunties. Centuries of natural hair wisdom. One council — just for your curls. Take the quiz and meet your council.",
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
