import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteSettings } from "@/lib/cms";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://engatuny-tours.netlify.app"),
  title: {
    default: "Engatuny Tours & Travel | Feel the Heartbeat of Uganda",
    template: "%s | Engatuny Tours & Travel",
  },
  description:
    "Warm, authentic Uganda adventures with small groups, local guides, and beautifully crafted journeys through wildlife, culture, waterfalls, and gorilla country.",
  keywords: [
    "Uganda tours",
    "Uganda safaris",
    "gorilla trekking Uganda",
    "Murchison Falls tours",
    "Jinja adventure tours",
    "Engatuny Tours & Travel",
  ],
  openGraph: {
    title: "Engatuny Tours & Travel",
    description:
      "Authentic Uganda journeys led by passionate local guides who know these landscapes by heart.",
    url: "https://engatuny-tours.netlify.app",
    siteName: "Engatuny Tours & Travel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg?auto=compress&cs=tinysrgb&w=1600",
        width: 1600,
        height: 900,
        alt: "A lush tropical waterfall at sunrise, evoking the wild beauty of Uganda.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engatuny Tours & Travel",
    description:
      "Authentic Uganda adventures with local guides, small groups, and unforgettable stories.",
    images: [
      "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-sand-50 text-charcoal-900 antialiased">
        <Header siteName={settings.siteName} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
