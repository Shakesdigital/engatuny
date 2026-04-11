"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/types/content";

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const active = testimonials[activeIndex];

  return (
    <div className="card min-h-[340px] p-8 md:p-10">
      <div className="flex gap-1 text-gold-500" aria-label="5 star review">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <p className="mt-6 font-heading text-3xl leading-tight text-forest-900">
        “{active.quote}”
      </p>
      <div className="mt-8">
        <p className="text-lg font-semibold text-charcoal-900">{active.name}</p>
        <p className="text-sm uppercase tracking-[0.18em] text-charcoal-500">
          {active.homeCountry} • {active.trip}
        </p>
      </div>
      <div className="mt-8 flex gap-3">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Show testimonial ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-3 rounded-full transition-all duration-200 ${
              index === activeIndex ? "w-10 bg-gold-500" : "w-3 bg-forest-900/14"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
