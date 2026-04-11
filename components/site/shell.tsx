"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export function Shell({
  children,
  siteName,
}: {
  children: React.ReactNode;
  siteName: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header siteName={siteName} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
