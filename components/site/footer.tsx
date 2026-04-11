import { contactDetails, socialLinks } from "@/lib/site-data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/tours", label: "Tours" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-forest-900 text-sand-50">
      <div className="layout grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <p className="font-heading text-3xl">Engatuny Tours &amp; Travel</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-sand-50/78">
            Engatuny means the one who leads you deep into the wild. We craft
            warm, grounded Uganda adventures that feel personal from your first
            message to your final sunset on the trail.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-sand-50/78">
            <p>{contactDetails.office}</p>
            <a href={`tel:${contactDetails.phone}`} className="block hover:text-sand-50">
              {contactDetails.phoneDisplay}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="block hover:text-sand-50">
              {contactDetails.email}
            </a>
            <a href={contactDetails.whatsAppUrl} target="_blank" rel="noreferrer" className="block hover:text-sand-50">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-50/12 text-sand-50/85 transition-colors duration-200 hover:border-gold-400 hover:text-gold-400"
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
          © 2026 Engatuny Tours &amp; Travel — Proudly Ugandan.
        </div>
      </div>
    </footer>
  );
}
