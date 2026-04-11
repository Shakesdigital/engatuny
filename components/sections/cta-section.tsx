type CTASectionProps = {
  title: string;
  description: string;
  primaryAction: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
};

export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="section">
      <div className="layout">
        <div className="overflow-hidden rounded-[2rem] bg-brand-900 px-8 py-12 text-sand-50 shadow-[0_30px_90px_rgba(91,58,30,0.22)] md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="eyebrow text-gold-400">Start planning</p>
              <h2 className="mt-4 font-heading text-4xl leading-tight md:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-sand-50/78">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <a href={primaryAction.href} className="btn-primary w-full md:w-auto">
                {primaryAction.label}
              </a>
              {secondaryAction ? (
                <a href={secondaryAction.href} className="btn-secondary w-full md:w-auto">
                  {secondaryAction.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
