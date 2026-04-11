import type { Tour } from "@/types/content";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative h-72 overflow-hidden">
        <img
          src={`${tour.image}?auto=compress&cs=tinysrgb&w=1200`}
          alt={tour.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/82 to-transparent p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            {tour.region}
          </p>
          <h3 className="mt-2 font-heading text-3xl">{tour.title}</h3>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <p className="text-base leading-7 text-charcoal-600">{tour.tagline}</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-charcoal-600">
          <span className="rounded-full bg-sand-50 px-4 py-2">{tour.price}</span>
          <span className="rounded-full bg-sand-50 px-4 py-2">{tour.duration}</span>
          <span className="rounded-full bg-sand-50 px-4 py-2">{tour.difficulty}</span>
        </div>
        <p className="text-sm leading-7 text-charcoal-600">{tour.heroDescription}</p>
        <div className="flex flex-wrap gap-3">
          <a href={`/tours/${tour.slug}`} className="btn-primary">
            Open Tour Page
          </a>
          <a href={`/contact?tour=${tour.slug}`} className="btn-ghost">
            Enquire Now
          </a>
        </div>
      </div>
    </article>
  );
}
