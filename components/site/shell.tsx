"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import type { SiteSettings } from "@/types/content";

export function Shell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header siteName={settings.siteName} logoPath={settings.logoPath} />
      <main>{children}</main>
      <Footer
        siteName={settings.siteName}
        logoPath={settings.logoPath}
        brandMeaning={settings.brandMeaning}
        email={settings.email}
        phone={settings.phone}
        office={settings.office}
      />
    </>
  );
}
