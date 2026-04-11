import { AdminDashboardClient } from "@/components/admin/dashboard-client";
import { requireAdmin } from "@/lib/auth";
import { blogPosts, siteSettings, testimonials, tours } from "@/lib/site-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="section">
        <div className="layout max-w-3xl">
          <div className="card p-8">
            <h1 className="font-heading text-4xl text-forest-900">Supabase is not configured</h1>
            <p className="mt-4 text-base leading-8 text-charcoal-600">
              Add the required environment variables, run the Supabase migrations,
              and then sign in as an admin to manage the CMS.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { supabase, user } = await requireAdmin();

  const [settingsResponse, toursResponse, blogResponse, testimonialsResponse, contactResponse] =
    await Promise.all([
      supabase.from("settings").select("key,value"),
      supabase.from("tours").select("*").order("created_at", { ascending: true }),
      supabase.from("blog_posts").select("*").order("published_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    ]);

  const settings = Object.fromEntries(
    (settingsResponse.data ?? []).map((row) => [row.key, row.value]),
  );

  const liveTours =
    toursResponse.data?.map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      tagline: tour.tagline ?? "",
      price: tour.price,
      duration: tour.duration,
      durationDays: tour.duration_days,
      region: tour.region,
      type: tour.type,
      difficulty: tour.difficulty,
      maxTravellers: tour.max_travellers,
      image: tour.featured_image_url ?? "",
      imageAlt: "",
      enquirySubject: tour.title,
      itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
      highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
    })) ?? tours;

  const liveBlogPosts =
    blogResponse.data?.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.published_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      readingTime: post.reading_time ?? "5 min read",
      image: post.featured_image_url ?? "",
      imageAlt: "",
      content: Array.isArray(post.content) ? post.content : [],
    })) ?? blogPosts;

  const liveTestimonials =
    testimonialsResponse.data?.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      homeCountry: testimonial.home_country,
      trip: testimonial.trip,
      quote: testimonial.quote,
    })) ?? testimonials;

  const submissions =
    contactResponse.data?.map((submission) => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      preferredTour: submission.preferred_tour,
      message: submission.message,
      status: submission.status,
      createdAt: submission.created_at,
    })) ?? [];

  return (
    <section className="section">
      <div className="layout">
        <AdminDashboardClient
          settings={{
            site_name: settings.site_name ?? siteSettings.siteName,
            tagline: settings.tagline ?? siteSettings.tagline,
            site_description: settings.site_description ?? siteSettings.description,
            contact_email: settings.contact_email ?? siteSettings.email,
            contact_phone: settings.contact_phone ?? siteSettings.phone,
            contact_whatsapp: settings.contact_whatsapp ?? siteSettings.whatsApp,
            office_address: settings.office_address ?? siteSettings.office,
          }}
          tours={liveTours}
          blogPosts={liveBlogPosts}
          testimonials={liveTestimonials}
          contactSubmissions={submissions}
          adminEmail={user.email ?? "admin"}
        />
      </div>
    </section>
  );
}
