import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/site/shell";
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
    default: "Engatuny Tours & Travel | Follow the lion's path across Uganda",
    template: "%s | Engatuny Tours & Travel",
  },
  description:
    "Purposeful Uganda journeys shaped by local guides, warm hosting, and the proud spirit of the lion.",
  keywords: [
    "Uganda tours",
    "Uganda safaris",
    "Kidepo safari",
    "Karamoja cultural tours",
    "gorilla trekking Uganda",
    "Engatuny Tours & Travel",
  ],
  icons: {
    icon: "/engatuny-logo.png",
    shortcut: "/engatuny-logo.png",
    apple: "/engatuny-logo.png",
  },
  openGraph: {
    title: "Engatuny Tours & Travel",
    description:
      "Lion-hearted Uganda journeys blending wildlife, culture, and grounded local hosting.",
    url: "https://engatuny-tours.netlify.app",
    siteName: "Engatuny Tours & Travel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
        width: 1600,
        height: 900,
        alt: "Remote safari vehicle in a dry northern Uganda landscape.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engatuny Tours & Travel",
    description:
      "Lion-hearted Uganda journeys blending wildlife, culture, and grounded local hosting.",
    images: [
      "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
      <body
        className="bg-sand-50 text-charcoal-900 antialiased"
        style={
          {
            "--brand-color-900": settings.primaryColor,
            "--brand-color-700": settings.secondaryColor,
            "--brand-color-500": settings.accentColor,
            "--surface-color-50": settings.surfaceColor,
          } as CSSProperties
        }
      >
        <Shell settings={settings}>{children}</Shell>
      </body>
    </html>
  );
}
