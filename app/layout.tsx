import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/site/shell";
import { getSiteSettings } from "@/lib/cms";
import { siteSettings as fallbackSiteSettings } from "@/lib/site-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

function normaliseSiteUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return new URL(fallbackSiteSettings.siteUrl);
  }
}

function parseKeywords(value: string) {
  return value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const metadataBase = normaliseSiteUrl(settings.siteUrl);
  const defaultTitle =
    settings.defaultMetaTitle || `${settings.siteName} | ${settings.tagline}`;
  const description = settings.metaDescription || settings.description;
  const openGraphImage =
    settings.openGraphImageUrl || fallbackSiteSettings.openGraphImageUrl;

  return {
    metadataBase,
    title: {
      default: defaultTitle,
      template: `%s | ${settings.siteName}`,
    },
    description,
    keywords: parseKeywords(settings.metaKeywords),
    icons: {
      icon: settings.logoPath,
      shortcut: settings.logoPath,
      apple: settings.logoPath,
    },
    openGraph: {
      title: settings.siteName,
      description,
      url: settings.siteUrl,
      siteName: settings.siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: openGraphImage,
          width: 1600,
          height: 900,
          alt: `${settings.siteName} social sharing image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteName,
      description,
      creator: settings.twitterHandle,
      images: [openGraphImage],
    },
  };
}

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
