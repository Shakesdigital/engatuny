import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/contact-form";
import { HeroSlider } from "@/components/sections/hero-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { getWhatsAppUrl } from "@/lib/site-data";
import { getPageBySlug, getSiteSettings, getTours } from "@/lib/cms";
import { getPageHeroSlides, getPageText } from "@/lib/page-utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Engatuny Tours & Travel to enquire about your ideal Uganda adventure, request a tailored itinerary, or chat on WhatsApp.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}) {
  const [params, tours, settings, page] = await Promise.all([
    searchParams,
    getTours(),
    getSiteSettings(),
    getPageBySlug("contact"),
  ]);
  const heroSlides = getPageHeroSlides(page, [
    {
      imageUrl:
        "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
      eyebrow: "Contact Us",
      title: "Tell us the kind of Uganda journey you want to feel.",
      description:
        "We will shape the route around your pace, interests, and comfort level. Keep it simple. Start with a message.",
    },
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} minHeightClassName="min-h-[62vh]" />

      <section className="section bg-sand-50">
        <div className="layout grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Plan With Engatuny"
              title="Share your travel idea and we will shape the route with you."
              description="Use the form or contact details below to begin the conversation."
            />
            <div className="mt-8 space-y-5 rounded-[1.75rem] bg-brand-900 p-7 text-sand-50">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-brand-300">
                  {getPageText(page, "officeLabel", "Office")}
                </p>
                <p className="mt-2 text-base leading-7 text-sand-50/80">
                  {settings.office}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-brand-300">
                  {getPageText(page, "directLabel", "Direct")}
                </p>
                <a href={`tel:${settings.phone}`} className="mt-2 block text-base text-sand-50/80">
                  {settings.phone}
                </a>
                <a href={`mailto:${settings.email}`} className="mt-1 block text-base text-sand-50/80">
                  {settings.email}
                </a>
              </div>
              <a href={getWhatsAppUrl(settings.whatsApp)} target="_blank" rel="noreferrer" className="btn-primary">
                {getPageText(page, "whatsAppLabel", "Chat on WhatsApp")}
              </a>
            </div>
          </div>
          <ContactForm preferredTour={params.tour} tours={tours} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout">
          <div className="overflow-hidden rounded-[2rem] border border-brand-900/10 shadow-[0_24px_50px_rgba(91,58,30,0.08)]">
            <iframe
              title="Engatuny Tours & Travel Kampala office map"
              src={getPageText(
                page,
                "mapEmbedUrl",
                "https://www.google.com/maps?q=Kampala%20Uganda&z=12&output=embed",
              )}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
