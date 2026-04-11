import { createClient } from "@supabase/supabase-js";
import { blogPosts, siteSettings, testimonials, tours } from "@/lib/site-data";
import type { SiteSettings, Tour, Testimonial, BlogPost } from "@/types/content";

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
  return tours;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
