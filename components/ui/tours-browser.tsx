"use client";

import { useMemo, useState } from "react";
import type { Tour } from "@/types/content";

const durationFilters = ["All", "3 Days", "4 Days", "7 Days"];
const regionFilters = [
  "All",
  "Eastern Uganda",
  "Eastern Highlands",
  "Northwestern Uganda",
  "Karamoja",
  "Southwestern Uganda",
];
const typeFilters = ["All", "Adventure", "Safari", "Hiking", "Wildlife"];

type ToursBrowserProps = {
  tours: Tour[];
};

export function ToursBrowser({ tours }: ToursBrowserProps) {
  const [duration, setDuration] = useState("All");
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");

  const visibleTours = useMemo(
    () =>
      tours.filter((tour) => {
        const matchesDuration = duration === "All" || tour.duration === duration;
        const matchesRegion = region === "All" || tour.region === region;
        const matchesType = type === "All" || tour.type === type;

        return matchesDuration && matchesRegion && matchesType;
      }),
    [duration, region, tours, type],
  );

  return (
    <div className="space-y-10">
      <div className="card p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <FilterGroup
            label="Duration"
            items={durationFilters}
            activeItem={duration}
            onChange={setDuration}
          />
          <FilterGroup
            label="Region"
            items={regionFilters}
            activeItem={region}
            onChange={setRegion}
          />
          <FilterGroup
            label="Type"
            items={typeFilters}
            activeItem={type}
            onChange={setType}
          />
        </div>
      </div>

      <div className="grid gap-8">
        {visibleTours.map((tour) => (
          <article
            key={tour.slug}
            className="card overflow-hidden border-brand-900/10"
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[320px]">
                <img
                  src={`${tour.image}?auto=compress&cs=tinysrgb&w=1400`}
                  alt={tour.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                  {tour.region} • {tour.type}
                </p>
                <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-heading text-3xl text-brand-900 md:text-4xl">
                      {tour.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-charcoal-600">
                      {tour.tagline}
                    </p>
                  </div>
                  <div className="rounded-[1.4rem] bg-sand-50 px-4 py-3 text-sm font-semibold text-charcoal-700">
                    {tour.price}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-charcoal-600">
                  <span className="rounded-full bg-sand-50 px-4 py-2">{tour.duration}</span>
                  <span className="rounded-full bg-sand-50 px-4 py-2">
                    Max {tour.maxTravellers} travellers
                  </span>
                  <span className="rounded-full bg-sand-50 px-4 py-2">
                    {tour.difficulty}
                  </span>
                </div>

                <p className="mt-6 text-base leading-8 text-charcoal-700">
                  {tour.heroDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {tour.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-brand-900/10 px-4 py-2 text-sm text-charcoal-600"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href={`/tours/${tour.slug}`} className="btn-primary">
                    View Tour Page
                  </a>
                  <a href={`/contact?tour=${tour.slug}`} className="btn-ghost">
                    Book This Tour
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  items,
  activeItem,
  onChange,
}: {
  label: string;
  items: string[];
  activeItem: string;
  onChange: (_value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              activeItem === item
                ? "bg-brand-900 text-sand-50"
                : "bg-sand-50 text-charcoal-700 hover:bg-sand-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
