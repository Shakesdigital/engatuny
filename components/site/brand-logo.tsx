type BrandLogoProps = {
  logoPath: string;
  siteName: string;
  compact?: boolean;
  subtitle?: string;
};

export function BrandLogo({
  logoPath,
  siteName,
  compact = false,
  subtitle = "Lion-hearted Uganda journeys",
}: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoPath}
        alt={`${siteName} logo`}
        className={compact ? "h-12 w-12 rounded-full object-cover" : "h-16 w-16 rounded-full object-cover"}
      />
      <div>
        <p className={compact ? "font-heading text-2xl text-forest-900" : "font-heading text-3xl text-forest-900"}>
          {siteName}
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
