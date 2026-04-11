import { BrandLogo } from "@/components/site/brand-logo";
import { MobileMenu } from "@/components/site/mobile-menu";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/tours", label: "Tours" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  siteName,
  logoPath,
}: {
  siteName: string;
  logoPath: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-900/10 bg-[color:var(--surface-color-50)]/92 backdrop-blur-xl">
      <div className="layout flex h-24 items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-3">
          <BrandLogo logoPath={logoPath} siteName={siteName} compact />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-charcoal-700 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-brand-900"
            >
              {item.label}
            </a>
          ))}
          <a href="/contact" className="btn-ghost">
            Plan Your Journey
          </a>
        </nav>

        <MobileMenu items={navigation} />
      </div>
    </header>
  );
}
