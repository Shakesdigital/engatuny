import {
  galleryMoments,
  trustMetrics,
  whyChooseEngatuny,
} from "@/lib/site-data";
import { CTASection } from "@/components/sections/cta-section";
import { PhotoGrid } from "@/components/sections/photo-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { TourCard } from "@/components/ui/tour-card";
import { getTestimonials, getTours } from "@/lib/cms";

export default async function HomePage() {
  const [tours, testimonials] = await Promise.all([getTours(), getTestimonials()]);
  const featuredTours = tours.slice(0, 4);

  return (
    <>
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7, 24, 20, 0.18) 0%, rgba(7, 24, 20, 0.82) 100%), url('https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        />
        <div className="layout relative py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
              Premium yet approachable Uganda journeys
            </p>
            <h1 className="font-heading text-5xl leading-tight md:text-7xl">
              Feel the Heartbeat of Uganda
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 md:text-xl">
              Small-group adventures. Local guides. Unforgettable stories.
              Welcome to Engatuny Tours &amp; Travel, the Pearl of Africa your
              way.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a className="btn-primary" href="/tours">
                Explore Our Tours
              </a>
              <a className="btn-secondary" href="/contact">
                Plan Your Journey
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-forest-900/8 bg-white">
        <div className="layout grid gap-4 py-5 text-sm font-semibold text-charcoal-700 md:grid-cols-3 md:items-center md:text-center">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-3 md:justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="layout">
          <SectionHeading
            eyebrow="Why Choose Engatuny?"
            title="Born in these landscapes. Built around genuine connection."
            description="Engatuny means the one who leads you deep into the wild. Every journey is shaped by local knowledge, steady logistics, and the kind of warmth that turns a trip into a story."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {whyChooseEngatuny.map((item) => (
              <article
                key={item.title}
                className="card p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-2xl text-sand-50">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="font-heading text-2xl text-forest-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-charcoal-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured Tours"
              title="Curated adventures across Uganda"
              description="A few of the journeys travellers return for again and again."
            />
            <a className="text-sm font-semibold uppercase tracking-[0.2em] text-forest-900" href="/tours">
              View all tours
            </a>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="layout grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Guest Stories"
              title="Travellers remember the feeling as much as the places."
              description="A few voices from the trail, campfire, riverbank, and forest edge."
            />
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <PhotoGrid
        eyebrow="Moments from the Pearl"
        title="Golden light, shared stories, and landscapes that stay with you."
        photos={galleryMoments}
      />

      <CTASection
        title="Ready to travel deeper into the wild?"
        description="Tell us how you want Uganda to feel: more adventure, more wildlife, more culture, or a little of everything. We will shape the route around you."
        primaryAction={{ href: "/contact", label: "Plan Your Journey" }}
        secondaryAction={{ href: "/tours", label: "Browse Tours" }}
      />
    </>
  );
}
