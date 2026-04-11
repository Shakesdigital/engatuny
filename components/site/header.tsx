import { MobileMenu } from "@/components/site/mobile-menu";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/tours", label: "Tours" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header({ siteName }: { siteName: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-forest-900/10 bg-sand-50/92 backdrop-blur-xl">
      <div className="layout flex h-20 items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-900 text-lg font-bold text-sand-50">
            E
          </div>
          <div>
            <p className="font-heading text-2xl text-forest-900">{siteName}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-500">
              Proudly Ugandan
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-charcoal-700 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-forest-900"
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
