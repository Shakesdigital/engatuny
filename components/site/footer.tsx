import { BrandLogo } from "@/components/site/brand-logo";
import { getWhatsAppUrl } from "@/lib/site-data";
import type { SocialLink } from "@/lib/site-data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/tours", label: "Tours" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer({
  siteName,
  logoPath,
  brandMeaning,
  email,
  phone,
  office,
  socialLinks,
}: {
  siteName: string;
  logoPath: string;
  brandMeaning: string;
  email: string;
  phone: string;
  office: string;
  socialLinks: SocialLink[];
}) {
  return (
    <footer className="bg-brand-900 text-sand-50">
      <div className="layout grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <BrandLogo
            logoPath={logoPath}
            siteName={siteName}
            subtitle="Lion-hearted Uganda journeys"
          />
          <p className="mt-4 max-w-md text-sm leading-7 text-sand-50/78">
            {brandMeaning}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
            Quick Links
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-sand-50/78">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-sand-50">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-sand-50/78">
            <p>{office}</p>
            <a href={`tel:${phone}`} className="block hover:text-sand-50">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="block hover:text-sand-50">
              {email}
            </a>
            <a
              href={getWhatsAppUrl(phone)}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-sand-50"
            >
              WhatsApp us
            </a>
          </div>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-50/12 text-sand-50/85 transition-colors duration-200 hover:border-brand-300 hover:text-brand-300"
                aria-label={link.label}
              >
                <SocialIcon kind={link.kind} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-sand-50/10">
        <div className="layout py-5 text-center text-sm text-sand-50/70">
          (C) 2026 Engatuny Tours and Travel - All Rights Reserved - Designed and Powered By{" "}
          <a
            href="https://shakesdigital.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-sand-50 transition-colors duration-200 hover:text-brand-300"
          >
            Shakes Digital
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  kind,
}: {
  kind: SocialLink["kind"];
}) {
  const className = "h-5 w-5 fill-current";

  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.66c0-.93.26-1.56 1.6-1.56h1.72V3.24c-.3-.04-1.31-.12-2.48-.12-2.46 0-4.14 1.5-4.14 4.25v2.37H7.96v3.2h2.83V21h2.71Z" />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.34 3.34 0 0 0 12 8.66Z" />
      </svg>
    );
  }

  if (kind === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M18.9 3H21l-4.59 5.24L21.8 21h-4.22l-3.3-7.55L7.68 21H5.57l4.9-5.6L2.2 3h4.32l2.99 6.84L18.9 3Zm-.74 16.7h1.17L5.87 4.22H4.61L18.16 19.7Z" />
      </svg>
    );
  }

  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.11C17.62 4.5 12 4.5 12 4.5s-5.62 0-7.48.58a2.98 2.98 0 0 0-2.1 2.11A31.9 31.9 0 0 0 1.9 12a31.9 31.9 0 0 0 .52 4.81 2.98 2.98 0 0 0 2.1 2.11c1.86.58 7.48.58 7.48.58s5.62 0 7.48-.58a2.98 2.98 0 0 0 2.1-2.11A31.9 31.9 0 0 0 22.1 12a31.9 31.9 0 0 0-.52-4.81ZM10.2 15.1V8.9l5.4 3.1-5.4 3.1Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 0-3.39-1.4 4.86 4.86 0 0 0-4.13 2.3 4.84 4.84 0 0 0-.61 2.39v6.73a3.15 3.15 0 1 1-3.15-3.15c.24 0 .47.03.69.08v-3.4a6.49 6.49 0 0 0-.69-.04 6.5 6.5 0 1 0 6.49 6.5V10.4a8.23 8.23 0 0 0 4.8 1.54V8.59a4.86 4.86 0 0 1-1.01-.09Z" />
    </svg>
  );
}
