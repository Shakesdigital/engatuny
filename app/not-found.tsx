export default function NotFound() {
  return (
    <section className="section bg-sand-50">
      <div className="layout max-w-3xl text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 font-heading text-5xl text-forest-900">
          The trail you followed does not lead anywhere.
        </h1>
        <p className="mt-6 text-lg leading-8 text-charcoal-600">
          Let&apos;s get you back to the journeys that do. Browse tours, read a
          story from the trail, or start planning your Uganda adventure.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="/tours" className="btn-primary">
            Explore Tours
          </a>
          <a href="/contact" className="btn-ghost">
            Contact Engatuny
          </a>
        </div>
      </div>
    </section>
  );
}
