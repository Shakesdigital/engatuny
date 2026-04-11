import { createClient } from "@supabase/supabase-js";
import { blogPosts, siteSettings, testimonials, tours } from "@/lib/site-data";
import type {
  BlogPost,
  ContactSubmission,
  SiteSettings,
  Testimonial,
  Tour,
} from "@/types/content";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return siteSettings;
  }

  const { data } = await supabase.from("settings").select("key,value,group_name");

  if (!data?.length) {
    return siteSettings;
  }

  const mapped = Object.fromEntries(
    data.map((row) => [row.key as string, row.value as string]),
  );

  return {
    siteName: mapped.site_name ?? siteSettings.siteName,
    tagline: mapped.tagline ?? siteSettings.tagline,
    description: mapped.site_description ?? siteSettings.description,
    email: mapped.contact_email ?? siteSettings.email,
    phone: mapped.contact_phone ?? siteSettings.phone,
    whatsApp: mapped.contact_whatsapp ?? siteSettings.whatsApp,
    office: mapped.office_address ?? siteSettings.office,
  };
}

export async function getTours(): Promise<Tour[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return tours;
  }

  const { data } = await supabase
    .from("tours")
    .select("*")
    .eq("status", "published")
    .order("duration_days", { ascending: true });

  if (!data?.length) {
    return tours;
  }

  return data.map((tour) => ({
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
    image:
      tour.featured_image_url ??
      "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    imageAlt: `${tour.title} featured image`,
    enquirySubject: tour.title,
    itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
    highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return testimonials;
  }

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (!data?.length) {
    return testimonials;
  }

  return data.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    homeCountry: testimonial.home_country,
    trip: testimonial.trip,
    quote: testimonial.quote,
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return blogPosts;
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (!data?.length) {
    return blogPosts;
  }

  return data.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.published_at?.slice(0, 10) ?? "",
    readingTime: post.reading_time ?? "5 min read",
    image:
      post.featured_image_url ??
      "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    imageAlt: `${post.title} featured image`,
    content: Array.isArray(post.content) ? post.content : [],
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return blogPosts.find((post) => post.slug === slug) ?? null;
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return blogPosts.find((post) => post.slug === slug) ?? null;
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    publishedAt: data.published_at?.slice(0, 10) ?? "",
    readingTime: data.reading_time ?? "5 min read",
    image:
      data.featured_image_url ??
      "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    imageAlt: `${data.title} featured image`,
    content: Array.isArray(data.content) ? data.content : [],
  };
}

export async function getAdminSettings(): Promise<Record<string, string>> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      site_name: siteSettings.siteName,
      tagline: siteSettings.tagline,
      site_description: siteSettings.description,
      contact_email: siteSettings.email,
      contact_phone: siteSettings.phone,
      contact_whatsapp: siteSettings.whatsApp,
      office_address: siteSettings.office,
    };
  }

  const { data } = await supabase.from("settings").select("key,value");
  const mapped = Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));

  return mapped;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (data ?? []).map((submission) => ({
    id: submission.id,
    name: submission.name,
    email: submission.email,
    preferredTour: submission.preferred_tour,
    message: submission.message,
    status: submission.status,
    createdAt: submission.created_at,
  }));
}
