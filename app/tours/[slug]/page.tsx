import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTourBySlug, getTours } from "@/lib/cms";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {};
  }

  return {
    title: tour.title,
    description: tour.heroDescription || tour.overview,
    openGraph: {
      title: tour.title,
      description: tour.heroDescription || tour.overview,
      images: [
        {
          url: `${tour.image}?auto=compress&cs=tinysrgb&w=1600`,
          alt: tour.imageAlt,
        },
      ],
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <>
      <section className="relative isolate overflow-hidden text-sand-50">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(34, 24, 19, 0.1) 0%, rgba(34, 24, 19, 0.5) 100%), url('${tour.image}?auto=compress&cs=tinysrgb&w=1600')`,
          }}
        />
        <div className="layout relative py-24 md:py-32">
          <p className="eyebrow text-brand-300">{tour.region}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-tight md:text-6xl">
            {tour.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sand-50/84">
            {tour.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full bg-white/12 px-4 py-2">{tour.price}</span>
            <span className="rounded-full bg-white/12 px-4 py-2">{tour.duration}</span>
            <span className="rounded-full bg-white/12 px-4 py-2">{tour.difficulty}</span>
            <span className="rounded-full bg-white/12 px-4 py-2">Max {tour.maxTravellers} travellers</span>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Tour Overview"
              title={tour.tagline}
              description={tour.overview}
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoPanel title="Route" items={[tour.routeDetails]} />
              <InfoPanel title="Ideal For" items={tour.idealFor} />
              <InfoPanel title="Highlights" items={tour.highlights} />
              <InfoPanel title="Inclusions" items={tour.inclusions} />
            </div>
          </div>
          <div className="card overflow-hidden">
            <img
              src={`${tour.image}?auto=compress&cs=tinysrgb&w=1400`}
              alt={tour.imageAlt}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout">
          <SectionHeading
            eyebrow="Day by day"
            title="A practical itinerary with room to enjoy the journey."
          />
          <div className="mt-10 grid gap-5">
            {tour.itinerary.map((day, index) => (
              <article key={day} className="card p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Day {index + 1}
                </p>
                <p className="mt-3 text-base leading-8 text-charcoal-700">{day}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout grid gap-6 lg:grid-cols-3">
          <StoryCard title="Landscapes" body={tour.landscapeStory} />
          <StoryCard title="Culture" body={tour.cultureStory} />
          <StoryCard title="Wildlife" body={tour.wildlifeStory} />
        </div>
      </section>

      <CTASection
        title={`Ready to plan the ${tour.title}?`}
        description="Send us your preferred dates, comfort level, and whether you want to add extra wildlife, culture, or slower downtime."
        primaryAction={{ href: `/contact?tour=${tour.slug}`, label: "Enquire About This Tour" }}
        secondaryAction={{ href: "/tours", label: "Back to All Tours" }}
      />
    </>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="text-base leading-8 text-charcoal-700">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function StoryCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="card p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
        {title}
      </p>
      <p className="mt-4 text-base leading-8 text-charcoal-700">{body}</p>
    </article>
  );
}
