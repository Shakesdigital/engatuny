import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/hero-slider";
import { ToursBrowser } from "@/components/ui/tours-browser";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPageBySlug, getTours } from "@/lib/cms";
import { getPageHeroSlides, getPageText } from "@/lib/page-utils";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore Uganda journeys with dedicated landing pages, detailed itineraries, and clear cultural and wildlife focus.",
};

export default async function ToursPage() {
  const [tours, page] = await Promise.all([getTours(), getPageBySlug("tours")]);
  const heroSlides = getPageHeroSlides(page, [
    {
      imageUrl:
        "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600",
      eyebrow: "Our journeys",
      title: "Tour pages built to show the route, mood, and meaning of each journey.",
      description:
        "Browse by duration, region, or travel style, then open any tour for its full landing page and detailed story.",
    },
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} minHeightClassName="min-h-[70vh]" />

      <section className="section bg-white">
        <div className="layout">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
            <div className="card overflow-hidden">
              <img
                src={getPageText(
                  page,
                  "featuredImageUrl",
                  "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1400",
                )}
                alt={getPageText(
                  page,
                  "featuredImageAlt",
                  "Safari vehicle framed by acacia woodland on a Uganda journey.",
                )}
                className="h-full min-h-[360px] w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-10">
            <ToursBrowser tours={tours} />
          </div>
        </div>
      </section>
    </>
  );
}
