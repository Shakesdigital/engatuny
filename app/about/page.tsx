import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { HeroSlider } from "@/components/sections/hero-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutValues, services, travellerReasons } from "@/lib/site-data";
import { getPageBySlug, getSiteSettings } from "@/lib/cms";
import { getPageHeroSlides, getPageList, getPageObjectList, getPageText } from "@/lib/page-utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Engatuny Tours & Travel, a Uganda-focused operator whose lion-inspired brand stands for courage, care, and deeply rooted travel.",
};

export default async function AboutPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageBySlug("about")]);
  const introParagraphs = getPageList(page, "introParagraphs", [
    "Engatuny Tours & Travel creates Uganda journeys that feel confident, warm, and deeply rooted. The name Engatuny means lion, and that meaning matters to us. It speaks to courage, watchfulness, and a calm kind of leadership that protects the quality of the guest experience.",
    "We guide wildlife safaris, gorilla trekking routes, waterfall escapes, cultural journeys, and tailor-made travel across Uganda. Every itinerary is built with route logic, local knowledge, and the intention to help travellers feel the country rather than simply move through it.",
    `${settings.brandStory} That is why our journeys feel both personal and well-held: the romance of travel is there, but it is supported by steady planning, honest pacing, and respect for the people and places that make Uganda unforgettable.`,
  ]);
  const founderParagraphs = getPageList(page, "founderParagraphs", [
    settings.founderKaramojaCommitment,
    "That commitment does not replace the wider Uganda story. It strengthens it. It ensures that when travellers head north, they encounter Karamoja as a living cultural landscape with beauty, dignity, and voices of its own.",
  ]);
  const values = getPageList(page, "values", aboutValues);
  const serviceCards = getPageObjectList(
    page,
    "services",
    services.map((item) => ({
      icon: item.icon,
      title: item.title,
      description: item.description,
    })),
  );
  const reasons = getPageList(page, "reasons", travellerReasons);
  const heroSlides = getPageHeroSlides(page, [
    {
      imageUrl:
        "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      eyebrow: "About Engatuny",
      title: "A Uganda travel company shaped by the spirit of the lion.",
      description:
        "Our brand is rooted in courage, care, and the kind of grounded stewardship that helps travellers feel confidently held.",
    },
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} minHeightClassName="min-h-[70vh]" />

      <section className="section bg-white">
        <div className="layout grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose-copy space-y-6 text-lg">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="card overflow-hidden">
            <img
              src={getPageText(
                page,
                "featuredImageUrl",
                "https://images.pexels.com/photos/19820463/pexels-photo-19820463.jpeg?auto=compress&cs=tinysrgb&w=1400",
              )}
              alt="Sailboat moving through the Nile under soft light."
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout grid gap-8 rounded-[2rem] bg-white p-8 shadow-[0_24px_60px_rgba(91,58,30,0.08)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <SectionHeading
              eyebrow={getPageText(page, "founderEyebrow", "Founder Commitment")}
              title={getPageText(
                page,
                "founderTitle",
                "Karamoja is carried with pride in the way Engatuny travels.",
              )}
            />
          </div>
          <div className="space-y-5 text-base leading-8 text-charcoal-700">
            {founderParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout">
          <SectionHeading
            eyebrow={getPageText(page, "valuesEyebrow", "Our Values")}
            title={getPageText(
              page,
              "valuesTitle",
              "A company culture shaped by courage, respect, and warm stewardship.",
            )}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <div key={value} className="card p-6 text-center">
                <p className="font-heading text-3xl text-brand-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout">
          <SectionHeading
            eyebrow={getPageText(page, "servicesEyebrow", "Our Services")}
            title={getPageText(
              page,
              "servicesTitle",
              "What we craft for travellers seeking the real Uganda.",
            )}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {serviceCards.map((service) => (
              <article key={service.title} className="card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-lg font-bold text-sand-50">
                  {service.icon}
                </div>
                <h2 className="font-heading text-2xl text-brand-900">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-charcoal-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={getPageText(page, "reasonsEyebrow", "Why Travellers Choose Engatuny")}
            title={getPageText(
              page,
              "reasonsTitle",
              "The details that turn first-time guests into returning advocates.",
            )}
          />
          <div className="grid gap-4">
            {reasons.map((reason) => (
              <div key={reason} className="card p-6">
                <p className="text-base leading-8 text-charcoal-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={getPageText(
          page,
          "ctaTitle",
          "Let us shape your Uganda story around what matters most to you.",
        )}
        description={getPageText(
          page,
          "ctaDescription",
          "Tell us the pace you want, the places calling you, and the level of comfort you prefer. We will take it from there.",
        )}
        primaryAction={{
          href: getPageText(page, "ctaPrimaryHref", "/contact"),
          label: getPageText(page, "ctaPrimaryLabel", "Start Planning"),
        }}
        secondaryAction={{
          href: getPageText(page, "ctaSecondaryHref", "/tours"),
          label: getPageText(page, "ctaSecondaryLabel", "See Our Tours"),
        }}
      />
    </>
  );
}
