import { BrandLogo } from "@/components/site/brand-logo";
import { getWhatsAppUrl, socialLinks } from "@/lib/site-data";

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
}: {
  siteName: string;
  logoPath: string;
  brandMeaning: string;
  email: string;
  phone: string;
  office: string;
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
            <a href={getWhatsAppUrl(phone)} target="_blank" rel="noreferrer" className="block hover:text-sand-50">
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
                <span aria-hidden="true">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-sand-50/10">
        <div className="layout py-5 text-sm text-sand-50/70">
          © 2026 Engatuny Tours &amp; Travel - Lion-hearted journeys across Uganda.
        </div>
      </div>
    </footer>
  );
}
