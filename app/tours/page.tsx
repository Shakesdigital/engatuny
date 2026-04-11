import type { Metadata } from "next";
import { ToursBrowser } from "@/components/ui/tours-browser";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTours } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore small-group Uganda journeys from Jinja to Bwindi, with exact day-by-day itineraries, pricing, and easy enquiry options.",
};

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-900 py-24 text-sand-50 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
          />
        </div>
        <div className="layout relative">
          <p className="eyebrow text-gold-400">Our journeys</p>
          <h1 className="mt-4 font-heading text-5xl leading-tight md:max-w-4xl md:text-6xl">
            Curated Adventures Across Uganda.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-sand-50/78">
            Browse by duration, region, or travel style. Every route is simple
            to understand and easy to enquire about.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout">
          <SectionHeading
            eyebrow="Browse and compare"
            title="Beautifully clear itineraries, warm guidance, no guesswork."
            description="Choose a ready-made adventure or use these as a starting point for a more tailored Uganda journey."
          />
          <div className="mt-10">
            <ToursBrowser tours={tours} />
          </div>
        </div>
      </section>
    </>
  );
}
