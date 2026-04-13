"use client";

import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type {
  BlogPost,
  CmsPage,
  ContactSubmission,
  PageContentValue,
  Testimonial,
  Tour,
} from "@/types/content";

type AdminDashboardClientProps = {
  settings: Record<string, string>;
  pages: CmsPage[];
  tours: Tour[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  contactSubmissions: ContactSubmission[];
  adminEmail: string;
  logoPath: string;
};

type AdminTab = "landing-pages" | "tours" | "blog" | "submissions" | "settings";
type PageFieldType = "text" | "textarea" | "list" | "cards";
type PageField = { key: string; label: string; type: PageFieldType; rows?: number; className?: string };
type MediaDescriptor = { label: string; urlKey: string; pathKey: string; folder: string };

const pageEditorConfig: Record<string, { summary: string; fields: PageField[] }> = {
  home: {
    summary: "Hero, trust bar, homepage story sections, featured tours, gallery, and CTA.",
    fields: [
      { key: "heroEyebrow", label: "Hero Eyebrow", type: "text" },
      { key: "heroTitle", label: "Hero Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "heroDescription", label: "Hero Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "heroSubtitle", label: "Hero Logo Subtitle", type: "text" },
      { key: "primaryCtaLabel", label: "Primary CTA Label", type: "text" },
      { key: "primaryCtaHref", label: "Primary CTA Link", type: "text" },
      { key: "secondaryCtaLabel", label: "Secondary CTA Label", type: "text" },
      { key: "secondaryCtaHref", label: "Secondary CTA Link", type: "text" },
      { key: "trustMetrics", label: "Trust Metrics", type: "list", className: "md:col-span-2" },
      { key: "whyChooseEyebrow", label: "Why Choose Eyebrow", type: "text" },
      { key: "whyChooseTitle", label: "Why Choose Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "whyChooseDescription", label: "Why Choose Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "whyChooseCards", label: "Why Choose Cards", type: "cards", className: "md:col-span-2" },
      { key: "founderEyebrow", label: "Founder Eyebrow", type: "text" },
      { key: "founderTitle", label: "Founder Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "founderBody", label: "Founder Body", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "toursEyebrow", label: "Featured Tours Eyebrow", type: "text" },
      { key: "toursTitle", label: "Featured Tours Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "toursDescription", label: "Featured Tours Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "guestStoriesEyebrow", label: "Guest Stories Eyebrow", type: "text" },
      { key: "guestStoriesTitle", label: "Guest Stories Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "guestStoriesDescription", label: "Guest Stories Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "galleryEyebrow", label: "Gallery Eyebrow", type: "text" },
      { key: "galleryTitle", label: "Gallery Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "ctaTitle", label: "Bottom CTA Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "ctaDescription", label: "Bottom CTA Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "ctaPrimaryLabel", label: "Bottom CTA Primary Label", type: "text" },
      { key: "ctaPrimaryHref", label: "Bottom CTA Primary Link", type: "text" },
      { key: "ctaSecondaryLabel", label: "Bottom CTA Secondary Label", type: "text" },
      { key: "ctaSecondaryHref", label: "Bottom CTA Secondary Link", type: "text" },
    ],
  },
  about: {
    summary: "About hero, story paragraphs, founder section, values, services, traveller reasons, and CTA.",
    fields: [
      { key: "heroEyebrow", label: "Hero Eyebrow", type: "text" },
      { key: "heroTitle", label: "Hero Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "introParagraphs", label: "Intro Paragraphs", type: "list", className: "md:col-span-2" },
      { key: "founderEyebrow", label: "Founder Eyebrow", type: "text" },
      { key: "founderTitle", label: "Founder Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "founderParagraphs", label: "Founder Paragraphs", type: "list", className: "md:col-span-2" },
      { key: "valuesEyebrow", label: "Values Eyebrow", type: "text" },
      { key: "valuesTitle", label: "Values Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "values", label: "Values", type: "list", className: "md:col-span-2" },
      { key: "servicesEyebrow", label: "Services Eyebrow", type: "text" },
      { key: "servicesTitle", label: "Services Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "services", label: "Services", type: "cards", className: "md:col-span-2" },
      { key: "reasonsEyebrow", label: "Reasons Eyebrow", type: "text" },
      { key: "reasonsTitle", label: "Reasons Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "reasons", label: "Traveller Reasons", type: "list", className: "md:col-span-2" },
      { key: "ctaTitle", label: "Bottom CTA Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "ctaDescription", label: "Bottom CTA Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "ctaPrimaryLabel", label: "Bottom CTA Primary Label", type: "text" },
      { key: "ctaPrimaryHref", label: "Bottom CTA Primary Link", type: "text" },
      { key: "ctaSecondaryLabel", label: "Bottom CTA Secondary Label", type: "text" },
      { key: "ctaSecondaryHref", label: "Bottom CTA Secondary Link", type: "text" },
    ],
  },
  tours: {
    summary: "Tours landing page hero and collection-introduction copy.",
    fields: [
      { key: "heroEyebrow", label: "Hero Eyebrow", type: "text" },
      { key: "heroTitle", label: "Hero Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "heroDescription", label: "Hero Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "browseEyebrow", label: "Browse Eyebrow", type: "text" },
      { key: "browseTitle", label: "Browse Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "browseDescription", label: "Browse Description", type: "textarea", rows: 4, className: "md:col-span-2" },
    ],
  },
  blog: {
    summary: "Blog landing page hero and collection intro.",
    fields: [
      { key: "heroEyebrow", label: "Hero Eyebrow", type: "text" },
      { key: "heroTitle", label: "Hero Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "heroDescription", label: "Hero Description", type: "textarea", rows: 4, className: "md:col-span-2" },
    ],
  },
  contact: {
    summary: "Contact page hero copy, info-card labels, and map link.",
    fields: [
      { key: "heroEyebrow", label: "Hero Eyebrow", type: "text" },
      { key: "heroTitle", label: "Hero Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      { key: "heroDescription", label: "Hero Description", type: "textarea", rows: 4, className: "md:col-span-2" },
      { key: "officeLabel", label: "Office Label", type: "text" },
      { key: "directLabel", label: "Direct Label", type: "text" },
      { key: "whatsAppLabel", label: "WhatsApp Button Label", type: "text" },
      { key: "mapEmbedUrl", label: "Map Embed URL", type: "text", className: "md:col-span-2" },
    ],
  },
};

const landingPageSlugs = ["home", "about", "contact"];
const settingsGroups = [
  { title: "General", keys: ["site_name", "tagline", "site_description", "brand_meaning", "brand_story", "founder_karamoja_commitment"] },
  { title: "Contact", keys: ["contact_email", "contact_phone", "contact_whatsapp", "office_address"] },
  { title: "Branding", keys: ["logo_path", "primary_color", "secondary_color", "accent_color", "surface_color"] },
];

const pageMediaConfig: Record<string, MediaDescriptor[]> = {
  home: [{ label: "Hero Background Image", urlKey: "heroImageUrl", pathKey: "heroImagePath", folder: "pages" }],
  about: [
    { label: "Hero Background Image", urlKey: "heroImageUrl", pathKey: "heroImagePath", folder: "pages" },
    { label: "Featured About Image", urlKey: "featuredImageUrl", pathKey: "featuredImagePath", folder: "pages" },
  ],
  tours: [{ label: "Hero Background Image", urlKey: "heroImageUrl", pathKey: "heroImagePath", folder: "pages" }],
};

export function AdminDashboardClient({ settings, pages, tours, blogPosts, testimonials, contactSubmissions, adminEmail, logoPath }: AdminDashboardClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("landing-pages");
  const [settingsState, setSettingsState] = useState<Record<string, string>>({
    site_name: settings.site_name ?? "",
    tagline: settings.tagline ?? "",
    site_description: settings.site_description ?? "",
    contact_email: settings.contact_email ?? "",
    contact_phone: settings.contact_phone ?? "",
    contact_whatsapp: settings.contact_whatsapp ?? "",
    office_address: settings.office_address ?? "",
    primary_color: settings.primary_color ?? "",
    secondary_color: settings.secondary_color ?? "",
    accent_color: settings.accent_color ?? "",
    surface_color: settings.surface_color ?? "",
    logo_path: settings.logo_path ?? "",
    brand_meaning: settings.brand_meaning ?? "",
    brand_story: settings.brand_story ?? "",
    founder_karamoja_commitment: settings.founder_karamoja_commitment ?? "",
  });
  const [pagesState, setPagesState] = useState<CmsPage[]>(pages);
  const [tourState, setTourState] = useState<Tour[]>(tours);
  const [blogState, setBlogState] = useState<BlogPost[]>(blogPosts);
  const [testimonialState, setTestimonialState] = useState<Testimonial[]>(testimonials);

  const navItems = [
    { id: "landing-pages" as const, label: "Landing Pages", description: "Home, About, and Contact page content.", count: pagesState.filter((page) => landingPageSlugs.includes(page.slug)).length },
    { id: "tours" as const, label: "Tours", description: "Tours landing page plus every tour record.", count: tourState.length + 1 },
    { id: "blog" as const, label: "Blog", description: "Blog landing page and article management.", count: blogState.length + 1 },
    { id: "submissions" as const, label: "Form Submissions", description: "Website enquiries and lead follow-up.", count: contactSubmissions.length },
    { id: "settings" as const, label: "Settings", description: "Branding, contact information, and defaults.", count: settingsGroups.length },
  ];

  async function request(path: string, init: RequestInit, key: string) {
    try {
      setSaving(key);
      setMessage(null);
      const response = await fetch(path, { ...init, headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error ?? "Request failed");
      setMessage("Saved successfully.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSaving(null);
    }
  }

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const landingPages = pagesState.filter((page) => landingPageSlugs.includes(page.slug));
  const toursPage = pagesState.find((page) => page.slug === "tours");
  const blogPage = pagesState.find((page) => page.slug === "blog");

  return (
    <div className="space-y-8">
      <section className="card overflow-hidden p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <img src={logoPath} alt="Engatuny logo" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="eyebrow">Website Control Panel</p>
              <h1 className="mt-2 font-heading text-4xl text-brand-900">Engatuny Admin</h1>
              <p className="mt-2 text-sm leading-7 text-charcoal-600">Signed in as {adminEmail}. Each workspace mirrors a public-facing area of the website.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatBadge label="Pages" value={String(pagesState.length)} />
            <StatBadge label="Tours" value={String(tourState.length)} />
            <StatBadge label="Blog Posts" value={String(blogState.length)} />
            <StatBadge label="Leads" value={String(contactSubmissions.length)} />
            <button type="button" onClick={handleLogout} className="btn-ghost">Sign Out</button>
          </div>
        </div>
        {message ? <p className="mt-5 text-sm font-semibold text-brand-900">{message}</p> : null}
      </section>

      <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-28 xl:self-start">
          <nav className="card overflow-hidden p-3">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button key={item.id} type="button" onClick={() => setActiveTab(item.id)} className={`w-full rounded-[1.4rem] px-4 py-4 text-left transition-colors ${activeTab === item.id ? "bg-brand-900 text-sand-50" : "bg-transparent text-charcoal-700 hover:bg-sand-50"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{item.label}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${activeTab === item.id ? "bg-white/14 text-sand-50" : "bg-brand-900/6 text-brand-900"}`}>{item.count}</span>
                  </div>
                  <p className={`mt-2 text-sm leading-6 ${activeTab === item.id ? "text-sand-50/78" : "text-charcoal-500"}`}>{item.description}</p>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        <div className="space-y-8">
          {activeTab === "landing-pages" ? <PagesWorkspace title="Landing Pages" description="Open the page you want to edit, save it, then review the result on the public site." pages={landingPages} setPagesState={setPagesState} saving={saving} request={request} /> : null}
          {activeTab === "tours" ? <ToursWorkspace toursPage={toursPage} setPagesState={setPagesState} tourState={tourState} setTourState={setTourState} saving={saving} request={request} /> : null}
          {activeTab === "blog" ? <BlogWorkspace blogPage={blogPage} setPagesState={setPagesState} blogState={blogState} setBlogState={setBlogState} saving={saving} request={request} /> : null}
          {activeTab === "submissions" ? <SubmissionsWorkspace contactSubmissions={contactSubmissions} request={request} /> : null}
          {activeTab === "settings" ? <SettingsWorkspace settingsState={settingsState} setSettingsState={setSettingsState} saving={saving} request={request} /> : null}
          {activeTab === "landing-pages" ? <TestimonialsWorkspace testimonialState={testimonialState} setTestimonialState={setTestimonialState} saving={saving} request={request} /> : null}
        </div>
      </div>
    </div>
  );
}

function PagesWorkspace({ title, description, pages, setPagesState, saving, request }: { title: string; description: string; pages: CmsPage[]; setPagesState: Dispatch<SetStateAction<CmsPage[]>>; saving: string | null; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  return (
    <>
      <WorkspaceHeader title={title} description={description} />
      <section className="space-y-4">
        {pages.map((page) => (
          <PageEditorCard key={page.slug} page={page} setPagesState={setPagesState} saving={saving} request={request} />
        ))}
      </section>
    </>
  );
}

function ToursWorkspace({ toursPage, setPagesState, tourState, setTourState, saving, request }: { toursPage?: CmsPage; setPagesState: Dispatch<SetStateAction<CmsPage[]>>; tourState: Tour[]; setTourState: Dispatch<SetStateAction<Tour[]>>; saving: string | null; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  return (
    <>
      <WorkspaceHeader title="Tours" description="The tours landing page and each independent tour landing page live together here." />
      {toursPage ? <PageEditorCard page={toursPage} setPagesState={setPagesState} saving={saving} request={request} /> : null}
      <section className="card p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl text-brand-900">Tour Landing Pages</h2>
            <p className="mt-2 text-sm leading-7 text-charcoal-600">Open a tour to edit its landing page content, itinerary, and storytelling blocks.</p>
          </div>
          <button type="button" className="btn-ghost" onClick={() => setTourState((current) => [...current, { slug: "", title: "", tagline: "", heroDescription: "", overview: "", price: "", duration: "3 Days", durationDays: 3, region: "", type: "", difficulty: "Moderate", maxTravellers: 8, image: "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg", imageAlt: "", enquirySubject: "", routeDetails: "", highlights: [], itinerary: [], idealFor: [], inclusions: [], accommodations: [], landscapeStory: "", cultureStory: "", wildlifeStory: "" }])}>Add Tour</button>
        </div>
        <div className="mt-6 space-y-4">
          {tourState.map((tour, index) => (
            <AccordionCard key={tour.id ?? `tour-${index}`} title={tour.title || `Tour ${index + 1}`} subtitle={tour.tagline || "Independent tour landing page"} badge={tour.duration || "Draft"}>
              <CrudGrid>
                <Field label="Title" value={tour.title} onChange={(value) => updateItem(setTourState, index, { title: value })} />
                <Field label="Slug" value={tour.slug} onChange={(value) => updateItem(setTourState, index, { slug: value })} />
                <Field label="Tagline" value={tour.tagline} onChange={(value) => updateItem(setTourState, index, { tagline: value })} className="md:col-span-2" />
                <TextAreaField label="Hero Description" value={tour.heroDescription} onChange={(value) => updateItem(setTourState, index, { heroDescription: value })} rows={4} className="md:col-span-2" />
                <TextAreaField label="Overview" value={tour.overview} onChange={(value) => updateItem(setTourState, index, { overview: value })} rows={5} className="md:col-span-2" />
                <Field label="Price" value={tour.price} onChange={(value) => updateItem(setTourState, index, { price: value })} />
                <Field label="Duration" value={tour.duration} onChange={(value) => updateItem(setTourState, index, { duration: value })} />
                <Field label="Duration Days" type="number" value={String(tour.durationDays)} onChange={(value) => updateItem(setTourState, index, { durationDays: Number(value) })} />
                <Field label="Max Travellers" type="number" value={String(tour.maxTravellers)} onChange={(value) => updateItem(setTourState, index, { maxTravellers: Number(value) })} />
                <Field label="Region" value={tour.region} onChange={(value) => updateItem(setTourState, index, { region: value })} />
                <Field label="Type" value={tour.type} onChange={(value) => updateItem(setTourState, index, { type: value })} />
                <Field label="Difficulty" value={tour.difficulty} onChange={(value) => updateItem(setTourState, index, { difficulty: value as Tour["difficulty"] })} />
                <MediaField
                  label="Tour Featured Image"
                  currentUrl={tour.image}
                  currentPath={tour.imagePath}
                  folder="tours"
                  slug={tour.slug || `tour-${index + 1}`}
                  field="featured-image"
                  onUploaded={(url, path) => updateItem(setTourState, index, { image: url, imagePath: path })}
                  onCleared={() => updateItem(setTourState, index, { image: "", imagePath: undefined })}
                  className="md:col-span-2"
                />
                <Field label="Image URL" value={tour.image} onChange={(value) => updateItem(setTourState, index, { image: value })} className="md:col-span-2" />
                <Field label="Image Alt" value={tour.imageAlt} onChange={(value) => updateItem(setTourState, index, { imageAlt: value })} className="md:col-span-2" />
                <Field label="Enquiry Subject" value={tour.enquirySubject} onChange={(value) => updateItem(setTourState, index, { enquirySubject: value })} className="md:col-span-2" />
                <TextAreaField label="Route Details" value={tour.routeDetails} onChange={(value) => updateItem(setTourState, index, { routeDetails: value })} rows={4} className="md:col-span-2" />
                <TextAreaField label="Itinerary" value={tour.itinerary.join("\n")} onChange={(value) => updateItem(setTourState, index, { itinerary: splitLineList(value) })} rows={6} className="md:col-span-2" />
                <TextAreaField label="Highlights" value={tour.highlights.join("\n")} onChange={(value) => updateItem(setTourState, index, { highlights: splitLineList(value) })} rows={5} className="md:col-span-2" />
                <TextAreaField label="Ideal For" value={tour.idealFor.join("\n")} onChange={(value) => updateItem(setTourState, index, { idealFor: splitLineList(value) })} rows={5} className="md:col-span-2" />
                <TextAreaField label="Inclusions" value={tour.inclusions.join("\n")} onChange={(value) => updateItem(setTourState, index, { inclusions: splitLineList(value) })} rows={5} className="md:col-span-2" />
                <TextAreaField label="Accommodation Options" value={tour.accommodations.join("\n")} onChange={(value) => updateItem(setTourState, index, { accommodations: splitLineList(value) })} rows={5} className="md:col-span-2" />
                <TextAreaField label="Landscape Story" value={tour.landscapeStory} onChange={(value) => updateItem(setTourState, index, { landscapeStory: value })} rows={4} className="md:col-span-2" />
                <TextAreaField label="Culture Story" value={tour.cultureStory} onChange={(value) => updateItem(setTourState, index, { cultureStory: value })} rows={4} className="md:col-span-2" />
                <TextAreaField label="Wildlife Story" value={tour.wildlifeStory} onChange={(value) => updateItem(setTourState, index, { wildlifeStory: value })} rows={4} className="md:col-span-2" />
              </CrudGrid>
              <ActionRow>
                <button type="button" className="btn-primary" onClick={() => request("/api/admin/tours", { method: "POST", body: JSON.stringify({ ...tour, status: "published" }) }, `tour-${index}`)}>{saving === `tour-${index}` ? "Saving..." : "Save Tour"}</button>
                {tour.id ? <button type="button" className="btn-ghost" onClick={() => request(`/api/admin/tours?id=${tour.id}`, { method: "DELETE" }, `tour-delete-${index}`)}>Delete</button> : null}
              </ActionRow>
            </AccordionCard>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogWorkspace({ blogPage, setPagesState, blogState, setBlogState, saving, request }: { blogPage?: CmsPage; setPagesState: Dispatch<SetStateAction<CmsPage[]>>; blogState: BlogPost[]; setBlogState: Dispatch<SetStateAction<BlogPost[]>>; saving: string | null; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  return (
    <>
      <WorkspaceHeader title="Blog" description="The blog landing page and every article record are managed here." />
      {blogPage ? <PageEditorCard page={blogPage} setPagesState={setPagesState} saving={saving} request={request} /> : null}
      <section className="card p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl text-brand-900">Blog Posts</h2>
            <p className="mt-2 text-sm leading-7 text-charcoal-600">Each article can be opened, edited, and saved independently.</p>
          </div>
          <button type="button" className="btn-ghost" onClick={() => setBlogState((current) => [...current, { slug: "", title: "", excerpt: "", publishedAt: new Date().toISOString().slice(0, 10), readingTime: "5 min read", image: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg", imageAlt: "", content: [] }])}>Add Post</button>
        </div>
        <div className="mt-6 space-y-4">
          {blogState.map((post, index) => (
            <AccordionCard key={post.id ?? `post-${index}`} title={post.title || `Post ${index + 1}`} subtitle={post.excerpt || "Blog article"} badge={post.publishedAt || "Draft"}>
              <CrudGrid>
                <Field label="Title" value={post.title} onChange={(value) => updateItem(setBlogState, index, { title: value })} />
                <Field label="Slug" value={post.slug} onChange={(value) => updateItem(setBlogState, index, { slug: value })} />
                <TextAreaField label="Excerpt" value={post.excerpt} onChange={(value) => updateItem(setBlogState, index, { excerpt: value })} rows={4} className="md:col-span-2" />
                <Field label="Published At" value={post.publishedAt} onChange={(value) => updateItem(setBlogState, index, { publishedAt: value })} />
                <Field label="Reading Time" value={post.readingTime} onChange={(value) => updateItem(setBlogState, index, { readingTime: value })} />
                <MediaField
                  label="Blog Featured Image"
                  currentUrl={post.image}
                  currentPath={post.imagePath}
                  folder="blog"
                  slug={post.slug || `post-${index + 1}`}
                  field="featured-image"
                  onUploaded={(url, path) => updateItem(setBlogState, index, { image: url, imagePath: path })}
                  onCleared={() => updateItem(setBlogState, index, { image: "", imagePath: undefined })}
                  className="md:col-span-2"
                />
                <Field label="Image URL" value={post.image} onChange={(value) => updateItem(setBlogState, index, { image: value })} className="md:col-span-2" />
                <TextAreaField label="Content Paragraphs" value={post.content.join("\n")} onChange={(value) => updateItem(setBlogState, index, { content: splitLineList(value) })} rows={7} className="md:col-span-2" />
              </CrudGrid>
              <ActionRow>
                <button type="button" className="btn-primary" onClick={() => request("/api/admin/blog-posts", { method: "POST", body: JSON.stringify({ ...post, status: "published" }) }, `post-${index}`)}>{saving === `post-${index}` ? "Saving..." : "Save Post"}</button>
                {post.id ? <button type="button" className="btn-ghost" onClick={() => request(`/api/admin/blog-posts?id=${post.id}`, { method: "DELETE" }, `post-delete-${index}`)}>Delete</button> : null}
              </ActionRow>
            </AccordionCard>
          ))}
        </div>
      </section>
    </>
  );
}

function SubmissionsWorkspace({ contactSubmissions, request }: { contactSubmissions: ContactSubmission[]; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  return (
    <>
      <WorkspaceHeader title="Form Submissions" description="Review website enquiries and update their status without digging through clutter." />
      <section className="card p-8">
        <h2 className="font-heading text-3xl text-brand-900">Contact Enquiries</h2>
        <div className="mt-6 space-y-4">
          {contactSubmissions.length ? contactSubmissions.map((submission) => (
            <article key={submission.id} className="rounded-[1.5rem] border border-brand-900/10 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-charcoal-900">{submission.name}</p>
                  <p className="text-sm text-charcoal-600">{submission.email}{submission.preferredTour ? ` • ${submission.preferredTour}` : ""}</p>
                  <p className="mt-3 text-sm leading-7 text-charcoal-700">{submission.message}</p>
                </div>
                <select className="rounded-full border border-brand-900/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal-700" value={submission.status} onChange={(event) => request("/api/admin/contact-submissions", { method: "PATCH", body: JSON.stringify({ id: submission.id, status: event.target.value }) }, `submission-${submission.id}`)}>
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="closed">closed</option>
                </select>
              </div>
            </article>
          )) : <p className="text-sm leading-7 text-charcoal-600">No enquiries yet. Once the public form is connected to Supabase, new leads will appear here.</p>}
        </div>
      </section>
    </>
  );
}

function SettingsWorkspace({ settingsState, setSettingsState, saving, request }: { settingsState: Record<string, string>; setSettingsState: Dispatch<SetStateAction<Record<string, string>>>; saving: string | null; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  return (
    <>
      <WorkspaceHeader title="Settings" description="Global website configuration is grouped below so the backend stays clean and easy to navigate." />
      <section className="card p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl text-brand-900">Website Settings</h2>
            <p className="mt-2 text-sm leading-7 text-charcoal-600">These settings are reused across the whole site and feed the branding system.</p>
          </div>
          <button type="button" className="btn-primary" onClick={() => request("/api/admin/settings", { method: "POST", body: JSON.stringify(settingsState) }, "settings")}>{saving === "settings" ? "Saving..." : "Save Settings"}</button>
        </div>
        <div className="mt-6 space-y-4">
          {settingsGroups.map((group) => (
            <AccordionCard key={group.title} title={group.title} subtitle={`${group.keys.length} fields in this group.`} badge={group.title}>
              <CrudGrid>
                {group.keys.map((key) => <SettingField key={key} fieldKey={key} value={settingsState[key]} onChange={(value) => setSettingsState((current) => ({ ...current, [key]: value }))} />)}
              </CrudGrid>
            </AccordionCard>
          ))}
        </div>
      </section>
    </>
  );
}

function TestimonialsWorkspace({ testimonialState, setTestimonialState, saving, request }: { testimonialState: Testimonial[]; setTestimonialState: Dispatch<SetStateAction<Testimonial[]>>; saving: string | null; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  return (
    <section className="card p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-3xl text-brand-900">Homepage Testimonials</h2>
          <p className="mt-2 text-sm leading-7 text-charcoal-600">These quotes appear as homepage social proof and are managed separately from the static page editors.</p>
        </div>
        <button type="button" className="btn-ghost" onClick={() => setTestimonialState((current) => [...current, { name: "", homeCountry: "", trip: "", quote: "" }])}>Add Testimonial</button>
      </div>
      <div className="mt-6 space-y-4">
        {testimonialState.map((testimonial, index) => (
          <AccordionCard key={testimonial.id ?? `testimonial-${index}`} title={testimonial.name || `Testimonial ${index + 1}`} subtitle={testimonial.trip || "Homepage social proof"} badge={testimonial.homeCountry || "Draft"}>
            <CrudGrid>
              <Field label="Name" value={testimonial.name} onChange={(value) => updateItem(setTestimonialState, index, { name: value })} />
              <Field label="Home Country" value={testimonial.homeCountry} onChange={(value) => updateItem(setTestimonialState, index, { homeCountry: value })} />
              <Field label="Trip" value={testimonial.trip} onChange={(value) => updateItem(setTestimonialState, index, { trip: value })} className="md:col-span-2" />
              <TextAreaField label="Quote" value={testimonial.quote} onChange={(value) => updateItem(setTestimonialState, index, { quote: value })} rows={5} className="md:col-span-2" />
            </CrudGrid>
            <ActionRow>
              <button type="button" className="btn-primary" onClick={() => request("/api/admin/testimonials", { method: "POST", body: JSON.stringify({ ...testimonial, status: "published" }) }, `testimonial-${index}`)}>{saving === `testimonial-${index}` ? "Saving..." : "Save Testimonial"}</button>
              {testimonial.id ? <button type="button" className="btn-ghost" onClick={() => request(`/api/admin/testimonials?id=${testimonial.id}`, { method: "DELETE" }, `testimonial-delete-${index}`)}>Delete</button> : null}
            </ActionRow>
          </AccordionCard>
        ))}
      </div>
    </section>
  );
}

function PageEditorCard({ page, setPagesState, saving, request }: { page: CmsPage; setPagesState: Dispatch<SetStateAction<CmsPage[]>>; saving: string | null; request: (path: string, init: RequestInit, key: string) => Promise<void> }) {
  const config = pageEditorConfig[page.slug];
  if (!config) return null;
  const saveKey = `page-${page.slug}`;
  const mediaFields = pageMediaConfig[page.slug] ?? [];
  return (
    <AccordionCard title={page.title} subtitle={config.summary} badge={page.status}>
      <CrudGrid>
        <Field label="Page Title" value={page.title} onChange={(value) => updatePage(setPagesState, page.slug, { title: value })} />
        <Field label="Page Slug" value={page.slug} onChange={(value) => updatePage(setPagesState, page.slug, { slug: value })} />
        <TextAreaField label="Page Summary" value={page.excerpt} onChange={(value) => updatePage(setPagesState, page.slug, { excerpt: value })} rows={3} className="md:col-span-2" />
        <Field label="Status" value={page.status} onChange={(value) => updatePage(setPagesState, page.slug, { status: value as CmsPage["status"] })} />
        <Field label="Meta Title" value={page.metaTitle} onChange={(value) => updatePage(setPagesState, page.slug, { metaTitle: value })} />
        <TextAreaField label="Meta Description" value={page.metaDescription} onChange={(value) => updatePage(setPagesState, page.slug, { metaDescription: value })} rows={3} className="md:col-span-2" />
        {mediaFields.map((media) => (
          <MediaField
            key={`${page.slug}-${media.urlKey}`}
            label={media.label}
            currentUrl={typeof page.content[media.urlKey] === "string" ? (page.content[media.urlKey] as string) : ""}
            currentPath={typeof page.content[media.pathKey] === "string" ? (page.content[media.pathKey] as string) : undefined}
            folder={media.folder}
            slug={page.slug}
            field={media.urlKey}
            onUploaded={(url, path) => updatePageMedia(setPagesState, page.slug, media.urlKey, media.pathKey, url, path)}
            onCleared={() => updatePageMedia(setPagesState, page.slug, media.urlKey, media.pathKey, "", "")}
            className="md:col-span-2"
          />
        ))}
        {config.fields.map((field) => <PageFieldEditor key={`${page.slug}-${field.key}`} page={page} field={field} setPagesState={setPagesState} />)}
      </CrudGrid>
      <ActionRow>
        <button type="button" className="btn-primary" onClick={() => request("/api/admin/pages", { method: "POST", body: JSON.stringify(page) }, saveKey)}>{saving === saveKey ? "Saving..." : "Save Page"}</button>
        <a href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank" rel="noreferrer" className="btn-ghost">View Page</a>
      </ActionRow>
    </AccordionCard>
  );
}

function PageFieldEditor({ page, field, setPagesState }: { page: CmsPage; field: PageField; setPagesState: Dispatch<SetStateAction<CmsPage[]>> }) {
  const value = page.content[field.key];
  if (field.type === "textarea") return <TextAreaField label={field.label} value={typeof value === "string" ? value : ""} onChange={(nextValue) => updatePageContent(setPagesState, page.slug, field.key, nextValue)} rows={field.rows ?? 4} className={field.className} />;
  if (field.type === "list") return <TextAreaField label={`${field.label} (one item per line)`} value={Array.isArray(value) ? value.join("\n") : ""} onChange={(nextValue) => updatePageContent(setPagesState, page.slug, field.key, splitLineList(nextValue))} rows={6} className={field.className} />;
  if (field.type === "cards") return <TextAreaField label={`${field.label} (one item per line: Icon | Title | Description)`} value={cardsToText(value)} onChange={(nextValue) => updatePageContent(setPagesState, page.slug, field.key, textToCards(nextValue))} rows={7} className={field.className} />;
  return <Field label={field.label} value={typeof value === "string" ? value : ""} onChange={(nextValue) => updatePageContent(setPagesState, page.slug, field.key, nextValue)} className={field.className} />;
}

function MediaField({ label, currentUrl, currentPath, folder, slug, field, onUploaded, onCleared, className }: { label: string; currentUrl: string; currentPath?: string; folder: string; slug: string; field: string; onUploaded: (url: string, path: string) => void; onCleared: () => void; className?: string }) {
  const [busy, setBusy] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    try {
      setBusy(true);

      if (currentPath) {
        await fetch("/api/admin/media", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: currentPath }),
        });
      }

      const formData = new FormData();
      formData.append("file", selected);
      formData.append("folder", folder);
      formData.append("slug", slug);
      formData.append("field", field);

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Upload failed");

      onUploaded(payload.url, payload.path);
      event.target.value = "";
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove() {
    if (!currentPath) {
      onCleared();
      return;
    }

    try {
      setBusy(true);
      const response = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: currentPath }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error ?? "Delete failed");
      onCleared();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
        {label}
      </span>
      {currentUrl ? (
        <img src={currentUrl} alt={label} className="h-48 w-full rounded-[1rem] border border-brand-900/10 object-cover" />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-[1rem] border border-dashed border-brand-900/20 bg-sand-50 text-sm text-charcoal-500">
          No image uploaded yet.
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <label className="btn-ghost cursor-pointer">
          {busy ? "Working..." : currentUrl ? "Replace Image" : "Upload Image"}
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={busy} />
        </label>
        {currentUrl ? <button type="button" className="btn-ghost" onClick={handleRemove} disabled={busy}>Remove Image</button> : null}
      </div>
    </div>
  );
}

function WorkspaceHeader({ title, description }: { title: string; description: string }) {
  return <section className="card p-8"><p className="eyebrow">{title}</p><h2 className="mt-3 font-heading text-4xl text-brand-900">{title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-charcoal-600">{description}</p></section>;
}

function AccordionCard({ title, subtitle, badge, children }: { title: string; subtitle: string; badge?: string; children: ReactNode }) {
  return <details className="card overflow-hidden p-6" open><summary className="flex cursor-pointer list-none items-start justify-between gap-4"><div><h3 className="font-heading text-2xl text-brand-900">{title}</h3><p className="mt-2 text-sm leading-7 text-charcoal-600">{subtitle}</p></div>{badge ? <span className="rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900">{badge}</span> : null}</summary><div className="mt-6">{children}</div></details>;
}

function StatBadge({ label, value }: { label: string; value: string }) { return <div className="rounded-full bg-sand-50 px-4 py-2 text-sm font-semibold text-brand-900">{label}: {value}</div>; }
function CrudGrid({ children }: { children: ReactNode }) { return <div className="grid gap-4 md:grid-cols-2">{children}</div>; }
function ActionRow({ children }: { children: ReactNode }) { return <div className="mt-5 flex flex-wrap gap-3">{children}</div>; }

function Field({ label, value, onChange, className, type = "text" }: { label: string; value: string; onChange: (value: string) => void; className?: string; type?: string }) {
  return <label className={`block space-y-2 ${className ?? ""}`}><span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none focus:border-brand-900" /></label>;
}

function TextAreaField({ label, value, onChange, className, rows = 6 }: { label: string; value: string; onChange: (value: string) => void; className?: string; rows?: number }) {
  return <label className={`block space-y-2 ${className ?? ""}`}><span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">{label}</span><textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none focus:border-brand-900" /></label>;
}

function SettingField({ fieldKey, value, onChange }: { fieldKey: string; value: string; onChange: (value: string) => void }) {
  const longField = fieldKey.includes("description") || fieldKey.includes("story") || fieldKey.includes("commitment") || fieldKey === "office_address" || fieldKey === "brand_meaning";
  return longField ? <TextAreaField label={fieldKey.replaceAll("_", " ")} value={value} onChange={onChange} className="md:col-span-2" rows={4} /> : <Field label={fieldKey.replaceAll("_", " ")} value={value} onChange={onChange} />;
}

function updateItem<T>(setter: Dispatch<SetStateAction<T[]>>, index: number, patch: Partial<T>) { setter((current) => current.map((item, itemIndex) => itemIndex === index ? ({ ...item, ...patch } as T) : item)); }
function updatePage(setter: Dispatch<SetStateAction<CmsPage[]>>, slug: string, patch: Partial<CmsPage>) { setter((current) => current.map((page) => page.slug === slug ? { ...page, ...patch } : page)); }
function updatePageContent(setter: Dispatch<SetStateAction<CmsPage[]>>, slug: string, key: string, value: PageContentValue) { setter((current) => current.map((page) => page.slug === slug ? { ...page, content: { ...page.content, [key]: value } } : page)); }
function updatePageMedia(setter: Dispatch<SetStateAction<CmsPage[]>>, slug: string, urlKey: string, pathKey: string, url: string, path: string) { setter((current) => current.map((page) => page.slug === slug ? { ...page, content: { ...page.content, [urlKey]: url, [pathKey]: path } } : page)); }
function splitLineList(value: string) { return value.split("\n").map((item) => item.trim()).filter(Boolean); }
function cardsToText(value: unknown) { return Array.isArray(value) ? value.map((item) => item && typeof item === "object" ? `${String((item as Record<string, unknown>).icon ?? "")} | ${String((item as Record<string, unknown>).title ?? "")} | ${String((item as Record<string, unknown>).description ?? "")}` : "").filter(Boolean).join("\n") : ""; }
function textToCards(value: string) { return splitLineList(value).map((line) => { const [icon = "", title = "", ...rest] = line.split("|").map((part) => part.trim()); return { icon, title, description: rest.join(" | ").trim() }; }); }
