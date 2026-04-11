"use client";

import { useState } from "react";

type MobileMenuProps = {
  items: Array<{ href: string; label: string }>;
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/12 bg-white text-forest-900 shadow-sm"
      >
        <div className="space-y-1.5">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </div>
      </button>
      {open ? (
        <div className="absolute left-3 right-3 top-[5.5rem] rounded-[1.75rem] border border-forest-900/12 bg-white p-5 shadow-2xl">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-charcoal-700 transition-colors duration-200 hover:bg-sand-50 hover:text-forest-900"
              >
                {item.label}
              </a>
            ))}
            <a href="/contact" className="btn-primary mt-3" onClick={() => setOpen(false)}>
              Plan Your Journey
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
