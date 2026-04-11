import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutValues, services, travellerReasons } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Engatuny Tours & Travel, a premium yet approachable Uganda-focused operator creating deeply authentic adventures with local guides.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-900 py-24 text-sand-50 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
          />
        </div>
        <div className="layout relative">
          <p className="eyebrow text-gold-400">About Engatuny</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-tight md:text-6xl">
            Discover Uganda with Engatuny — Your Trusted Guide to the Pearl of Africa.
          </h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose-copy space-y-6 text-lg">
            <p>
              Engatuny Tours &amp; Travel is your gateway to unforgettable
              adventures across Uganda. We specialize in small-group, deeply
              authentic experiences that connect you with Uganda&apos;s wild
              landscapes, rich culture, and warm people.
            </p>
            <p>
              Our services include expertly guided wildlife safaris, gorilla
              trekking, waterfall hikes, cultural immersions, adventure
              activities, and carefully tailored journeys to Uganda&apos;s most
              iconic and hidden destinations. Every trip is thoughtfully
              designed for comfort, safety, and genuine immersion.
            </p>
            <p>
              What truly drives us is our goal: to inspire every traveller to
              experience the real heartbeat of Uganda — not just as a tourist,
              but as a welcomed guest in the Pearl of Africa. We create
              journeys that awaken a sense of wonder, foster meaningful
              connections with the land and its people, and leave you with
              stories you&apos;ll carry forever. When you travel with Engatuny,
              you don&apos;t just see Uganda — you feel it, live it, and become part
              of its living story. This authentic connection is what inspires
              thousands to choose us year after year.
            </p>
          </div>
          <div className="card overflow-hidden">
            <img
              src="https://images.pexels.com/photos/19820463/pexels-photo-19820463.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Sailboat moving through the Nile under soft light."
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="layout">
          <SectionHeading
            eyebrow="Our Values"
            title="A company culture shaped by the places we guide through."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {aboutValues.map((value) => (
              <div key={value} className="card p-6 text-center">
                <p className="font-heading text-3xl text-forest-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="layout">
          <SectionHeading
            eyebrow="Our Services"
            title="What we craft for travellers seeking the real Uganda."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service) => (
              <article key={service.title} className="card p-6">
                <div className="mb-4 text-3xl">{service.icon}</div>
                <h2 className="font-heading text-2xl text-forest-900">{service.title}</h2>
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
            eyebrow="Why Travellers Choose Engatuny"
            title="The details that turn first-time guests into returning advocates."
          />
          <div className="grid gap-4">
            {travellerReasons.map((reason) => (
              <div key={reason} className="card p-6">
                <p className="text-base leading-8 text-charcoal-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let us shape your Uganda story around what matters most to you."
        description="Tell us the pace you want, the places calling you, and the level of comfort you prefer. We will take it from there."
        primaryAction={{ href: "/contact", label: "Start Planning" }}
        secondaryAction={{ href: "/tours", label: "See Our Tours" }}
      />
    </>
  );
}
