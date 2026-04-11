import { CTASection } from "@/components/sections/cta-section";
import { PhotoGrid } from "@/components/sections/photo-grid";
import { BrandLogo } from "@/components/site/brand-logo";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { TourCard } from "@/components/ui/tour-card";
import { galleryMoments, trustMetrics, whyChooseEngatuny } from "@/lib/site-data";
import { getSiteSettings, getTestimonials, getTours } from "@/lib/cms";

export default async function HomePage() {
  const [tours, testimonials, settings] = await Promise.all([
    getTours(),
    getTestimonials(),
    getSiteSettings(),
  ]);
  const featuredTours = tours.slice(0, 4);

  return (
    <>
      <section className="relative isolate flex min-h-[94vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(34, 24, 19, 0.2) 0%, rgba(34, 24, 19, 0.88) 100%), url('https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        />
        <div className="layout relative py-20 md:py-28">
          <div className="max-w-4xl text-white">
            <div className="mb-6 inline-flex rounded-[2rem] bg-white/10 p-3 backdrop-blur-md">
              <BrandLogo
                logoPath={settings.logoPath}
                siteName={settings.siteName}
                subtitle="Lion-hearted Uganda journeys"
              />
            </div>
            <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
              Karamoja spirit. Uganda soul. Local guidance.
            </p>
            <h1 className="font-heading text-5xl leading-tight md:text-7xl">
              Travel Uganda with the calm strength of the lion.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/88 md:text-xl">
              {settings.brandMeaning} We build journeys around wildlife, cultural depth,
              and the kind of warm logistics that let travellers relax into the experience.
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

      <section className="border-y border-brand-900/8 bg-white/85">
        <div className="layout grid gap-4 py-5 text-sm font-semibold text-charcoal-700 md:grid-cols-3 md:items-center md:text-center">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-3 md:justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="layout">
          <SectionHeading
            eyebrow="Why Choose Engatuny?"
            title="A brand built around the lion, and a way of guiding that feels grounded."
            description={settings.brandStory}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {whyChooseEngatuny.map((item) => (
              <article
                key={item.title}
                className="card p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-lg font-bold text-sand-50">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="font-heading text-2xl text-brand-900">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-charcoal-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white/70">
        <div className="layout grid gap-8 rounded-[2rem] bg-brand-900 px-8 py-10 text-sand-50 shadow-[0_30px_90px_rgba(91,58,30,0.22)] md:grid-cols-[0.9fr_1.1fr] md:px-12">
          <div>
            <p className="eyebrow text-brand-300">Founder Focus</p>
            <h2 className="mt-4 font-heading text-4xl leading-tight">
              Karamoja is not a footnote in this company story.
            </h2>
          </div>
          <p className="text-base leading-8 text-sand-50/82">
            {settings.founderKaramojaCommitment}
          </p>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured Tours"
              title="Independent journeys with their own landing pages and story."
              description="Each route now has its own destination page, so travellers can explore details, mood, and practical fit before making contact."
            />
            <a className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-900" href="/tours">
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
              description="A few voices from the trail, campfire, riverbank, and savannah edge."
            />
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <PhotoGrid
        eyebrow="Moments from the Pearl"
        title="Golden plains, forest stillness, and the warmth between destinations."
        photos={galleryMoments}
      />

      <CTASection
        title="Ready to follow the lion's path across Uganda?"
        description="Tell us whether you want more wildlife, more culture, more adventure, or a thoughtful balance of all three. We will shape the route around you."
        primaryAction={{ href: "/contact", label: "Plan Your Journey" }}
        secondaryAction={{ href: "/tours", label: "Browse Tours" }}
      />
    </>
  );
}
