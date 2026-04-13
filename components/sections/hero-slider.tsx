"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { HeroSlide } from "@/lib/page-utils";

type HeroSliderProps = {
  slides: HeroSlide[];
  brandingNode?: ReactNode;
  minHeightClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
};

export function HeroSlider({
  slides,
  brandingNode,
  minHeightClassName = "min-h-[76vh]",
  overlayClassName = "bg-brand-900/55",
  contentClassName = "max-w-4xl text-white",
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className={`relative isolate flex items-end overflow-hidden text-sand-50 ${minHeightClassName}`}>
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={`${slide.title}-${index}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(34, 24, 19, 0.18) 0%, rgba(34, 24, 19, 0.9) 100%), url('${slide.imageUrl}')`,
            }}
          />
        ))}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      <div className="layout relative py-20 md:py-28">
        <div className={contentClassName}>
          {brandingNode ? <div className="mb-6">{brandingNode}</div> : null}
          <HeroSliderContent slide={slides[activeIndex]} />
          {slides.length > 1 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.title}-dot-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-10 bg-white" : "w-2.5 bg-white/45"
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HeroSliderContent({ slide }: { slide: HeroSlide }) {
  return (
    <>
      {slide.eyebrow ? (
        <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
          {slide.eyebrow}
        </p>
      ) : null}
      <h1 className="font-heading text-5xl leading-tight md:text-6xl lg:text-7xl">
        {slide.title}
      </h1>
      {slide.description ? (
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">
          {slide.description}
        </p>
      ) : null}
      {slide.primaryCtaLabel || slide.secondaryCtaLabel ? (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {slide.primaryCtaLabel && slide.primaryCtaHref ? (
            <a className="btn-primary" href={slide.primaryCtaHref}>
              {slide.primaryCtaLabel}
            </a>
          ) : null}
          {slide.secondaryCtaLabel && slide.secondaryCtaHref ? (
            <a className="btn-secondary" href={slide.secondaryCtaHref}>
              {slide.secondaryCtaLabel}
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
