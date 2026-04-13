import { createClient } from "@supabase/supabase-js";
import { defaultPages, defaultPagesBySlug } from "@/lib/page-content";
import { blogPosts, siteSettings, testimonials, tours } from "@/lib/site-data";
import type {
  BlogPost,
  CmsPage,
  ContactSubmission,
  PageContent,
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

function mapTourRow(row: Record<string, unknown>): Tour {
  return {
    id: row.id as string | undefined,
    slug: (row.slug as string) ?? "",
    title: (row.title as string) ?? "",
    tagline: (row.tagline as string) ?? "",
    heroDescription: (row.hero_description as string) ?? (row.tagline as string) ?? "",
    overview: (row.overview as string) ?? "",
    price: (row.price as string) ?? "",
    duration: (row.duration as string) ?? "",
    durationDays: Number(row.duration_days ?? 0),
    region: (row.region as string) ?? "",
    type: (row.type as string) ?? "",
    difficulty: ((row.difficulty as string) ?? "Moderate") as Tour["difficulty"],
    maxTravellers: Number(row.max_travellers ?? 8),
    image:
      (row.featured_image_url as string) ??
      "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    imageAlt: (row.image_alt as string) ?? `${row.title as string} featured image`,
    enquirySubject: (row.enquiry_subject as string) ?? (row.title as string) ?? "",
    routeDetails: (row.route_details as string) ?? "",
    itinerary: Array.isArray(row.itinerary) ? (row.itinerary as string[]) : [],
    highlights: Array.isArray(row.highlights) ? (row.highlights as string[]) : [],
    idealFor: Array.isArray(row.ideal_for) ? (row.ideal_for as string[]) : [],
    inclusions: Array.isArray(row.inclusions) ? (row.inclusions as string[]) : [],
    accommodations: Array.isArray(row.accommodations) ? (row.accommodations as string[]) : [],
    landscapeStory: (row.landscape_story as string) ?? "",
    cultureStory: (row.culture_story as string) ?? "",
    wildlifeStory: (row.wildlife_story as string) ?? "",
  };
}

function mapPageRow(row: Record<string, unknown>): CmsPage {
  const fallback = defaultPagesBySlug[(row.slug as string) ?? ""] ?? defaultPagesBySlug.home;

  return {
    id: row.id as string | undefined,
    slug: (row.slug as string) ?? fallback.slug,
    title: (row.title as string) ?? fallback.title,
    excerpt: (row.excerpt as string) ?? fallback.excerpt,
    status: ((row.status as string) ?? fallback.status) as CmsPage["status"],
    metaTitle: (row.meta_title as string) ?? fallback.metaTitle,
    metaDescription: (row.meta_description as string) ?? fallback.metaDescription,
    content:
      row.content && typeof row.content === "object"
        ? (row.content as PageContent)
        : fallback.content,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return siteSettings;
  }

  const { data } = await supabase.from("settings").select("key,value");

  if (!data?.length) {
    return siteSettings;
  }

  const mapped = Object.fromEntries(data.map((row) => [row.key as string, row.value as string]));

  return {
    siteName: mapped.site_name ?? siteSettings.siteName,
    tagline: mapped.tagline ?? siteSettings.tagline,
    description: mapped.site_description ?? siteSettings.description,
    email: mapped.contact_email ?? siteSettings.email,
    phone: mapped.contact_phone ?? siteSettings.phone,
    whatsApp: mapped.contact_whatsapp ?? siteSettings.whatsApp,
    office: mapped.office_address ?? siteSettings.office,
    primaryColor: mapped.primary_color ?? siteSettings.primaryColor,
    secondaryColor: mapped.secondary_color ?? siteSettings.secondaryColor,
    accentColor: mapped.accent_color ?? siteSettings.accentColor,
    surfaceColor: mapped.surface_color ?? siteSettings.surfaceColor,
    logoPath: mapped.logo_path ?? siteSettings.logoPath,
    brandMeaning: mapped.brand_meaning ?? siteSettings.brandMeaning,
    brandStory: mapped.brand_story ?? siteSettings.brandStory,
    founderKaramojaCommitment:
      mapped.founder_karamoja_commitment ?? siteSettings.founderKaramojaCommitment,
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

  return data.map((tourRow) => mapTourRow(tourRow));
}

export async function getPages(): Promise<CmsPage[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return defaultPages;
  }

  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("status", "published")
    .order("slug", { ascending: true });

  if (!data?.length) {
    return defaultPages;
  }

  const bySlug = new Map(defaultPages.map((page) => [page.slug, page]));
  data.forEach((row) => {
    const mapped = mapPageRow(row);
    bySlug.set(mapped.slug, mapped);
  });

  return Array.from(bySlug.values());
}

export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return defaultPagesBySlug[slug] ?? null;
  }

  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return defaultPagesBySlug[slug] ?? null;
  }

  return mapPageRow(data);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return tours.find((tour) => tour.slug === slug) ?? null;
  }

  const { data } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return tours.find((tour) => tour.slug === slug) ?? null;
  }

  return mapTourRow(data);
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

  return data.map((testimonialRow) => ({
    id: testimonialRow.id,
    name: testimonialRow.name,
    homeCountry: testimonialRow.home_country,
    trip: testimonialRow.trip,
    quote: testimonialRow.quote,
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
      primary_color: siteSettings.primaryColor,
      secondary_color: siteSettings.secondaryColor,
      accent_color: siteSettings.accentColor,
      surface_color: siteSettings.surfaceColor,
      logo_path: siteSettings.logoPath,
      brand_meaning: siteSettings.brandMeaning,
      brand_story: siteSettings.brandStory,
      founder_karamoja_commitment: siteSettings.founderKaramojaCommitment,
    };
  }

  const { data } = await supabase.from("settings").select("key,value");
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
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
