import type { Metadata } from "next";
import { ToursBrowser } from "@/components/ui/tours-browser";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPageBySlug, getTours } from "@/lib/cms";
import { getPageText } from "@/lib/page-utils";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore Uganda journeys with dedicated landing pages, detailed itineraries, and clear cultural and wildlife focus.",
};

export default async function ToursPage() {
  const [tours, page] = await Promise.all([getTours(), getPageBySlug("tours")]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-900 py-24 text-sand-50 md:py-32">
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
          <p className="eyebrow text-brand-300">
            {getPageText(page, "heroEyebrow", "Our journeys")}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-tight md:max-w-4xl md:text-6xl">
            {getPageText(
              page,
              "heroTitle",
              "Tour pages built to show the route, mood, and meaning of each journey.",
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-sand-50/78">
            {getPageText(
              page,
              "heroDescription",
              "Browse by duration, region, or travel style, then open any tour for its full landing page and detailed story.",
            )}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout">
          <SectionHeading
            eyebrow={getPageText(page, "browseEyebrow", "Browse and compare")}
            title={getPageText(
              page,
              "browseTitle",
              "Clear itineraries, strong visuals, and dedicated pages for every route.",
            )}
            description={getPageText(
              page,
              "browseDescription",
              "Each tour is listed here and also has its own page so travellers can understand the experience before they enquire.",
            )}
          />
          <div className="mt-10">
            <ToursBrowser tours={tours} />
          </div>
        </div>
      </section>
    </>
  );
}
