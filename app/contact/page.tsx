import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactDetails } from "@/lib/site-data";

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
  const params = await searchParams;

  return (
    <>
      <section className="section bg-sand-50">
        <div className="layout grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Contact Us"
              title="Tell us the kind of Uganda journey you want to feel."
              description="We will shape the route around your pace, interests, and comfort level. Keep it simple. Start with a message."
            />
            <div className="mt-8 space-y-5 rounded-[1.75rem] bg-forest-900 p-7 text-sand-50">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-gold-400">Office</p>
                <p className="mt-2 text-base leading-7 text-sand-50/80">
                  {contactDetails.office}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-gold-400">Direct</p>
                <a href={`tel:${contactDetails.phone}`} className="mt-2 block text-base text-sand-50/80">
                  {contactDetails.phoneDisplay}
                </a>
                <a href={`mailto:${contactDetails.email}`} className="mt-1 block text-base text-sand-50/80">
                  {contactDetails.email}
                </a>
              </div>
              <a href={contactDetails.whatsAppUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <ContactForm preferredTour={params.tour} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout">
          <div className="overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-[0_24px_50px_rgba(16,35,30,0.08)]">
            <iframe
              title="Engatuny Tours & Travel Kampala office map"
              src="https://www.google.com/maps?q=Kampala%20Uganda&z=12&output=embed"
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
