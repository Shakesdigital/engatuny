"use client";

import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type {
  BlogPost,
  CmsPage,
  ContactSubmission,
  GalleryPhoto,
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

type RequestFn = (path: string, init: RequestInit, key: string) => Promise<boolean>;
type AdminTab = "landing-pages" | "tours" | "blog" | "submissions" | "settings";
type TourSelection = { kind: "page" } | { kind: "tour"; index: number };
type BlogSelection = { kind: "page" } | { kind: "post"; index: number };
type PageFieldType = "text" | "textarea" | "list" | "cards" | "slides" | "gallery";
type PageField = {
  key: string;
  label: string;
  type: PageFieldType;
  rows?: number;
  className?: string;
};
type MediaDescriptor = {
  label: string;
  urlKey: string;
  pathKey: string;
  folder: string;
};

const pageEditorConfig: Record<string, { summary: string; fields: PageField[] }> = {
  home: {
    summary: "Hero, trust bar, homepage story sections, featured tours, gallery, and CTA.",
    fields: [
      { key: "heroSubtitle", label: "Hero Logo Subtitle", type: "text" },
      { key: "heroSlides", label: "Hero Slides", type: "slides", className: "md:col-span-2" },
      { key: "trustMetrics", label: "Trust Metrics", type: "list", className: "md:col-span-2" },
      { key: "whyChooseEyebrow", label: "Why Choose Eyebrow", type: "text" },
      {
        key: "whyChooseTitle",
        label: "Why Choose Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "whyChooseDescription",
        label: "Why Choose Description",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
      {
        key: "whyChooseCards",
        label: "Why Choose Cards",
        type: "cards",
        className: "md:col-span-2",
      },
      { key: "founderEyebrow", label: "Founder Eyebrow", type: "text" },
      {
        key: "founderTitle",
        label: "Founder Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "founderBody",
        label: "Founder Body",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
      { key: "toursEyebrow", label: "Featured Tours Eyebrow", type: "text" },
      {
        key: "toursTitle",
        label: "Featured Tours Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "toursDescription",
        label: "Featured Tours Description",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
      { key: "guestStoriesEyebrow", label: "Guest Stories Eyebrow", type: "text" },
      {
        key: "guestStoriesTitle",
        label: "Guest Stories Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "guestStoriesDescription",
        label: "Guest Stories Description",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
      { key: "galleryEyebrow", label: "Gallery Eyebrow", type: "text" },
      {
        key: "galleryTitle",
        label: "Gallery Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      { key: "galleryPhotos", label: "Gallery Photos", type: "gallery", className: "md:col-span-2" },
      { key: "ctaTitle", label: "Bottom CTA Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      {
        key: "ctaDescription",
        label: "Bottom CTA Description",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
      { key: "ctaPrimaryLabel", label: "Bottom CTA Primary Label", type: "text" },
      { key: "ctaPrimaryHref", label: "Bottom CTA Primary Link", type: "text" },
      { key: "ctaSecondaryLabel", label: "Bottom CTA Secondary Label", type: "text" },
      { key: "ctaSecondaryHref", label: "Bottom CTA Secondary Link", type: "text" },
    ],
  },
  about: {
    summary:
      "About hero, story paragraphs, founder section, values, services, traveller reasons, and CTA.",
    fields: [
      { key: "heroSlides", label: "Hero Slides", type: "slides", className: "md:col-span-2" },
      {
        key: "introParagraphs",
        label: "Intro Paragraphs",
        type: "list",
        className: "md:col-span-2",
      },
      { key: "founderEyebrow", label: "Founder Eyebrow", type: "text" },
      {
        key: "founderTitle",
        label: "Founder Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "founderParagraphs",
        label: "Founder Paragraphs",
        type: "list",
        className: "md:col-span-2",
      },
      { key: "valuesEyebrow", label: "Values Eyebrow", type: "text" },
      {
        key: "valuesTitle",
        label: "Values Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      { key: "values", label: "Values", type: "list", className: "md:col-span-2" },
      { key: "servicesEyebrow", label: "Services Eyebrow", type: "text" },
      {
        key: "servicesTitle",
        label: "Services Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      { key: "services", label: "Services", type: "cards", className: "md:col-span-2" },
      { key: "reasonsEyebrow", label: "Reasons Eyebrow", type: "text" },
      {
        key: "reasonsTitle",
        label: "Reasons Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "reasons",
        label: "Traveller Reasons",
        type: "list",
        className: "md:col-span-2",
      },
      { key: "ctaTitle", label: "Bottom CTA Title", type: "textarea", rows: 3, className: "md:col-span-2" },
      {
        key: "ctaDescription",
        label: "Bottom CTA Description",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
      { key: "ctaPrimaryLabel", label: "Bottom CTA Primary Label", type: "text" },
      { key: "ctaPrimaryHref", label: "Bottom CTA Primary Link", type: "text" },
      { key: "ctaSecondaryLabel", label: "Bottom CTA Secondary Label", type: "text" },
      { key: "ctaSecondaryHref", label: "Bottom CTA Secondary Link", type: "text" },
    ],
  },
  tours: {
    summary: "Tours landing page hero and collection-introduction copy.",
    fields: [
      { key: "heroSlides", label: "Hero Slides", type: "slides", className: "md:col-span-2" },
      { key: "browseEyebrow", label: "Browse Eyebrow", type: "text" },
      {
        key: "browseTitle",
        label: "Browse Title",
        type: "textarea",
        rows: 3,
        className: "md:col-span-2",
      },
      {
        key: "browseDescription",
        label: "Browse Description",
        type: "textarea",
        rows: 4,
        className: "md:col-span-2",
      },
    ],
  },
  blog: {
    summary: "Blog landing page hero and collection intro.",
    fields: [
      { key: "heroSlides", label: "Hero Slides", type: "slides", className: "md:col-span-2" },
    ],
  },
  contact: {
    summary: "Contact page hero copy, info-card labels, and map link.",
    fields: [
      { key: "heroSlides", label: "Hero Slides", type: "slides", className: "md:col-span-2" },
      { key: "officeLabel", label: "Office Label", type: "text" },
      { key: "directLabel", label: "Direct Label", type: "text" },
      { key: "whatsAppLabel", label: "WhatsApp Button Label", type: "text" },
      {
        key: "mapEmbedUrl",
        label: "Map Embed URL",
        type: "text",
        className: "md:col-span-2",
      },
    ],
  },
};

const landingPageSlugs = ["home", "tours", "about", "blog", "contact"];
const settingsGroups = [
  {
    title: "General",
    keys: [
      "site_name",
      "tagline",
      "site_description",
      "brand_meaning",
      "brand_story",
      "founder_karamoja_commitment",
    ],
  },
  {
    title: "Contact",
    keys: ["contact_email", "contact_phone", "contact_whatsapp", "office_address"],
  },
  {
    title: "Branding",
    keys: ["logo_path", "primary_color", "secondary_color", "accent_color", "surface_color"],
  },
];

const pageMediaConfig: Record<string, MediaDescriptor[]> = {
  about: [
    {
      label: "Featured About Image",
      urlKey: "featuredImageUrl",
      pathKey: "featuredImagePath",
      folder: "pages",
    },
  ],
};

export function AdminDashboardClient({
  settings,
  pages,
  tours,
  blogPosts,
  testimonials,
  contactSubmissions,
  adminEmail,
  logoPath,
}: AdminDashboardClientProps) {
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
  const [submissionState, setSubmissionState] = useState<ContactSubmission[]>(contactSubmissions);

  const navItems = [
    {
      id: "landing-pages" as const,
      label: "Landing Pages",
      description: "Select a page, then edit only that page's fields.",
      count: pagesState.filter((page) => landingPageSlugs.includes(page.slug)).length,
    },
    {
      id: "tours" as const,
      label: "Tours",
      description: "Browse the tours list first, then open one record to edit it.",
      count: tourState.length + 1,
    },
    {
      id: "blog" as const,
      label: "Blog",
      description: "Pick the blog page or a single post before editing.",
      count: blogState.length + 1,
    },
    {
      id: "submissions" as const,
      label: "Contact Forms",
      description: "Review one enquiry at a time with a cleaner follow-up workflow.",
      count: submissionState.length,
    },
    {
      id: "settings" as const,
      label: "Settings",
      description: "Grouped brand, contact, and website defaults.",
      count: settingsGroups.length,
    },
  ];

  async function request(path: string, init: RequestInit, key: string) {
    try {
      setSaving(key);
      setMessage(null);

      const response = await fetch(path, {
        ...init,
        headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
      });
      const payload = await readResponsePayload(response);

      if (!response.ok) {
        throw new Error(getPayloadError(payload, "Request failed"));
      }

      setMessage("Saved successfully.");
      router.refresh();
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      return false;
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
            <img
              src={logoPath}
              alt="Engatuny logo"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p className="eyebrow">Website Control Panel</p>
              <h1 className="mt-2 font-heading text-4xl text-brand-900">Engatuny Admin</h1>
              <p className="mt-2 text-sm leading-7 text-charcoal-600">
                Signed in as {adminEmail}. Each workspace now opens with a clean list so editors
                can choose one record before changing any fields.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatBadge label="Pages" value={String(pagesState.length)} />
            <StatBadge label="Tours" value={String(tourState.length)} />
            <StatBadge label="Blog Posts" value={String(blogState.length)} />
            <StatBadge label="Leads" value={String(submissionState.length)} />
            <button type="button" onClick={handleLogout} className="btn-ghost">
              Sign Out
            </button>
          </div>
        </div>
        {message ? <p className="mt-5 text-sm font-semibold text-brand-900">{message}</p> : null}
      </section>

      <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-28 xl:self-start">
          <nav className="card overflow-hidden p-3">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full rounded-[1.4rem] px-4 py-4 text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-brand-900 text-sand-50"
                      : "bg-transparent text-charcoal-700 hover:bg-sand-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{item.label}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        activeTab === item.id
                          ? "bg-white/14 text-sand-50"
                          : "bg-brand-900/6 text-brand-900"
                      }`}
                    >
                      {item.count}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      activeTab === item.id ? "text-sand-50/78" : "text-charcoal-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        <div className="space-y-8">
          {activeTab === "landing-pages" ? (
            <>
              <PagesWorkspace
                title="Landing Pages"
                description="Choose a landing page from the list, then edit only that page's content."
                pages={landingPages}
                setPagesState={setPagesState}
                saving={saving}
                request={request}
              />
              <TestimonialsWorkspace
                testimonialState={testimonialState}
                setTestimonialState={setTestimonialState}
                saving={saving}
                request={request}
              />
            </>
          ) : null}

          {activeTab === "tours" ? (
            <ToursWorkspace
              toursPage={toursPage}
              setPagesState={setPagesState}
              tourState={tourState}
              setTourState={setTourState}
              saving={saving}
              request={request}
            />
          ) : null}

          {activeTab === "blog" ? (
            <BlogWorkspace
              blogPage={blogPage}
              setPagesState={setPagesState}
              blogState={blogState}
              setBlogState={setBlogState}
              saving={saving}
              request={request}
            />
          ) : null}

          {activeTab === "submissions" ? (
            <SubmissionsWorkspace
              contactSubmissions={submissionState}
              setContactSubmissions={setSubmissionState}
              saving={saving}
              request={request}
            />
          ) : null}

          {activeTab === "settings" ? (
            <SettingsWorkspace
              settingsState={settingsState}
              setSettingsState={setSettingsState}
              saving={saving}
              request={request}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PagesWorkspace({
  title,
  description,
  pages,
  setPagesState,
  saving,
  request,
}: {
  title: string;
  description: string;
  pages: CmsPage[];
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
  saving: string | null;
  request: RequestFn;
}) {
  const [selectedSlug, setSelectedSlug] = useState(pages[0]?.slug ?? "");
  const selectedPage = pages.find((page) => page.slug === selectedSlug) ?? pages[0];

  return (
    <>
      <WorkspaceHeader
        title={title}
        description={description}
        helper="Landing page editors now open only after a user picks the page they want to work on."
      />
      <WorkspaceSplit
        sidebar={
          <ResourceListCard
            eyebrow="Pages List"
            title="Landing Pages"
            description="Home, Tours, About, Blog, and Contact are separated into individual editors."
          >
            {pages.map((page) => (
              <SelectableResourceButton
                key={page.slug}
                active={selectedPage?.slug === page.slug}
                title={page.title}
                meta={page.slug === "home" ? "/" : `/${page.slug}`}
                description={page.excerpt}
                badge={page.status}
                onClick={() => setSelectedSlug(page.slug)}
              />
            ))}
          </ResourceListCard>
        }
        editor={
          selectedPage ? (
            <PageEditorCard
              page={selectedPage}
              setPagesState={setPagesState}
              saving={saving}
              request={request}
            />
          ) : (
            <EmptyEditorState
              title="No landing pages available"
              description="Add landing pages to Supabase first, then select one here to edit it."
            />
          )
        }
      />
    </>
  );
}

function ToursWorkspace({
  toursPage,
  setPagesState,
  tourState,
  setTourState,
  saving,
  request,
}: {
  toursPage?: CmsPage;
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
  tourState: Tour[];
  setTourState: Dispatch<SetStateAction<Tour[]>>;
  saving: string | null;
  request: RequestFn;
}) {
  const [selection, setSelection] = useState<TourSelection>(
    toursPage ? { kind: "page" } : { kind: "tour", index: 0 },
  );

  const selectedTour = selection.kind === "tour" ? tourState[selection.index] : undefined;

  function handleAddTour() {
    const newIndex = tourState.length;
    setTourState((current) => [...current, makeEmptyTour()]);
    setSelection({ kind: "tour", index: newIndex });
  }

  async function handleDeleteTour(index: number, id?: string) {
    if (!id) {
      setTourState((current) => current.filter((_, itemIndex) => itemIndex !== index));
      setSelection(toursPage ? { kind: "page" } : { kind: "tour", index: Math.max(0, index - 1) });
      return;
    }

    const ok = await request(`/api/admin/tours?id=${id}`, { method: "DELETE" }, `tour-delete-${index}`);
    if (!ok) return;

    setTourState((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSelection(toursPage ? { kind: "page" } : { kind: "tour", index: Math.max(0, index - 1) });
  }

  return (
    <>
      <WorkspaceHeader
        title="Tours"
        description="Editors see the tours list first, then open either the tours overview page or one specific tour record."
        helper="This keeps itinerary fields, storytelling blocks, and media scoped to a single tour at a time."
      />
      <WorkspaceSplit
        sidebar={
          <ResourceListCard
            eyebrow="Tours List"
            title="Tours Library"
            description="Select the overview page or a single tour record to edit."
            actions={
              <button type="button" className="btn-ghost" onClick={handleAddTour}>
                Add Tour
              </button>
            }
          >
            {toursPage ? (
              <ResourceSectionLabel title="Collection Page" />
            ) : null}
            {toursPage ? (
              <SelectableResourceButton
                active={selection.kind === "page"}
                title={toursPage.title}
                meta="/tours"
                description={toursPage.excerpt}
                badge={toursPage.status}
                onClick={() => setSelection({ kind: "page" })}
              />
            ) : null}

            <ResourceSectionLabel title="Tour Records" />
            {tourState.map((tour, index) => (
              <SelectableResourceButton
                key={tour.id ?? `tour-${index}`}
                active={selection.kind === "tour" && selection.index === index}
                title={tour.title || `Tour ${index + 1}`}
                meta={tour.slug ? `/tours/${tour.slug}` : "Draft route"}
                description={tour.tagline || "Independent tour landing page"}
                badge={tour.duration || "Draft"}
                onClick={() => setSelection({ kind: "tour", index })}
              />
            ))}
          </ResourceListCard>
        }
        editor={
          selection.kind === "page" && toursPage ? (
            <PageEditorCard
              page={toursPage}
              setPagesState={setPagesState}
              saving={saving}
              request={request}
            />
          ) : selection.kind === "tour" && selectedTour ? (
            <TourEditorPanel
              tour={selectedTour}
              index={selection.index}
              setTourState={setTourState}
              saving={saving}
              request={request}
              onDelete={() => handleDeleteTour(selection.index, selectedTour.id)}
            />
          ) : (
            <EmptyEditorState
              title="No tour selected"
              description="Choose a tour from the list to open its editor."
            />
          )
        }
      />
    </>
  );
}

function BlogWorkspace({
  blogPage,
  setPagesState,
  blogState,
  setBlogState,
  saving,
  request,
}: {
  blogPage?: CmsPage;
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
  blogState: BlogPost[];
  setBlogState: Dispatch<SetStateAction<BlogPost[]>>;
  saving: string | null;
  request: RequestFn;
}) {
  const [selection, setSelection] = useState<BlogSelection>(
    blogPage ? { kind: "page" } : { kind: "post", index: 0 },
  );

  const selectedPost = selection.kind === "post" ? blogState[selection.index] : undefined;

  function handleAddPost() {
    const newIndex = blogState.length;
    setBlogState((current) => [...current, makeEmptyBlogPost()]);
    setSelection({ kind: "post", index: newIndex });
  }

  async function handleDeletePost(index: number, id?: string) {
    if (!id) {
      setBlogState((current) => current.filter((_, itemIndex) => itemIndex !== index));
      setSelection(blogPage ? { kind: "page" } : { kind: "post", index: Math.max(0, index - 1) });
      return;
    }

    const ok = await request(
      `/api/admin/blog-posts?id=${id}`,
      { method: "DELETE" },
      `post-delete-${index}`,
    );
    if (!ok) return;

    setBlogState((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSelection(blogPage ? { kind: "page" } : { kind: "post", index: Math.max(0, index - 1) });
  }

  return (
    <>
      <WorkspaceHeader
        title="Blog"
        description="Editors start from a blog content list, then open one article or the blog overview page."
        helper="This makes article management feel like a proper CMS instead of one long form."
      />
      <WorkspaceSplit
        sidebar={
          <ResourceListCard
            eyebrow="Blog List"
            title="Blog Content"
            description="Pick the overview page or a single article to work on."
            actions={
              <button type="button" className="btn-ghost" onClick={handleAddPost}>
                Add Post
              </button>
            }
          >
            {blogPage ? <ResourceSectionLabel title="Collection Page" /> : null}
            {blogPage ? (
              <SelectableResourceButton
                active={selection.kind === "page"}
                title={blogPage.title}
                meta="/blog"
                description={blogPage.excerpt}
                badge={blogPage.status}
                onClick={() => setSelection({ kind: "page" })}
              />
            ) : null}

            <ResourceSectionLabel title="Articles" />
            {blogState.map((post, index) => (
              <SelectableResourceButton
                key={post.id ?? `post-${index}`}
                active={selection.kind === "post" && selection.index === index}
                title={post.title || `Post ${index + 1}`}
                meta={post.slug ? `/blog/${post.slug}` : "Draft article"}
                description={post.excerpt || "Blog article draft"}
                badge={post.publishedAt || "Draft"}
                onClick={() => setSelection({ kind: "post", index })}
              />
            ))}
          </ResourceListCard>
        }
        editor={
          selection.kind === "page" && blogPage ? (
            <PageEditorCard
              page={blogPage}
              setPagesState={setPagesState}
              saving={saving}
              request={request}
            />
          ) : selection.kind === "post" && selectedPost ? (
            <BlogPostEditorPanel
              post={selectedPost}
              index={selection.index}
              setBlogState={setBlogState}
              saving={saving}
              request={request}
              onDelete={() => handleDeletePost(selection.index, selectedPost.id)}
            />
          ) : (
            <EmptyEditorState
              title="No blog content selected"
              description="Choose a blog record from the list to open its editor."
            />
          )
        }
      />
    </>
  );
}

function SubmissionsWorkspace({
  contactSubmissions,
  setContactSubmissions,
  saving,
  request,
}: {
  contactSubmissions: ContactSubmission[];
  setContactSubmissions: Dispatch<SetStateAction<ContactSubmission[]>>;
  saving: string | null;
  request: RequestFn;
}) {
  const [selectedId, setSelectedId] = useState(contactSubmissions[0]?.id ?? "");
  const selectedSubmission =
    contactSubmissions.find((submission) => submission.id === selectedId) ?? contactSubmissions[0];

  return (
    <>
      <WorkspaceHeader
        title="Contact Forms"
        description="The submissions area is now organised as a lead list with a focused detail view."
        helper="Users can open one enquiry at a time, review the message, then update only that record's status."
      />
      <WorkspaceSplit
        sidebar={
          <ResourceListCard
            eyebrow="Enquiries"
            title="Contact Form Leads"
            description="Open any lead to review the full message and update its follow-up status."
          >
            {contactSubmissions.length ? (
              contactSubmissions.map((submission) => (
                <SelectableResourceButton
                  key={submission.id}
                  active={selectedSubmission?.id === submission.id}
                  title={submission.name}
                  meta={submission.email}
                  description={truncateText(submission.message, 110)}
                  badge={submission.status}
                  onClick={() => setSelectedId(submission.id)}
                />
              ))
            ) : (
              <p className="text-sm leading-7 text-charcoal-600">
                No enquiries yet. Once the public contact form is used, leads will appear here.
              </p>
            )}
          </ResourceListCard>
        }
        editor={
          selectedSubmission ? (
            <SubmissionEditorPanel
              submission={selectedSubmission}
              saving={saving}
              request={request}
              onStatusChange={(status) =>
                setContactSubmissions((current) =>
                  current.map((submission) =>
                    submission.id === selectedSubmission.id ? { ...submission, status } : submission,
                  ),
                )
              }
            />
          ) : (
            <EmptyEditorState
              title="No submissions yet"
              description="When leads come in, select one from the list to review it here."
            />
          )
        }
      />
    </>
  );
}

function SettingsWorkspace({
  settingsState,
  setSettingsState,
  saving,
  request,
}: {
  settingsState: Record<string, string>;
  setSettingsState: Dispatch<SetStateAction<Record<string, string>>>;
  saving: string | null;
  request: RequestFn;
}) {
  return (
    <>
      <WorkspaceHeader
        title="Settings"
        description="Global website settings stay grouped so the backend remains clean and easy to scan."
      />
      <section className="card p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl text-brand-900">Website Settings</h2>
            <p className="mt-2 text-sm leading-7 text-charcoal-600">
              These settings feed branding, contact details, and site-wide defaults.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void request("/api/admin/settings", { method: "POST", body: JSON.stringify(settingsState) }, "settings")
            }
          >
            {saving === "settings" ? "Saving..." : "Save Settings"}
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {settingsGroups.map((group, index) => (
            <AccordionCard
              key={group.title}
              title={group.title}
              subtitle={`${group.keys.length} fields in this group.`}
              badge={group.title}
              defaultOpen={index === 0}
            >
              <CrudGrid>
                {group.keys.map((key) => (
                  <SettingField
                    key={key}
                    fieldKey={key}
                    value={settingsState[key]}
                    onChange={(value) =>
                      setSettingsState((current) => ({ ...current, [key]: value }))
                    }
                  />
                ))}
              </CrudGrid>
            </AccordionCard>
          ))}
        </div>
      </section>
    </>
  );
}

function TestimonialsWorkspace({
  testimonialState,
  setTestimonialState,
  saving,
  request,
}: {
  testimonialState: Testimonial[];
  setTestimonialState: Dispatch<SetStateAction<Testimonial[]>>;
  saving: string | null;
  request: RequestFn;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTestimonial = testimonialState[selectedIndex];

  function handleAddTestimonial() {
    const nextIndex = testimonialState.length;
    setTestimonialState((current) => [...current, makeEmptyTestimonial()]);
    setSelectedIndex(nextIndex);
  }

  async function handleDeleteTestimonial(index: number, id?: string) {
    if (!id) {
      setTestimonialState((current) => current.filter((_, itemIndex) => itemIndex !== index));
      setSelectedIndex(Math.max(0, index - 1));
      return;
    }

    const ok = await request(
      `/api/admin/testimonials?id=${id}`,
      { method: "DELETE" },
      `testimonial-delete-${index}`,
    );
    if (!ok) return;

    setTestimonialState((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSelectedIndex(Math.max(0, index - 1));
  }

  return (
    <section className="space-y-6">
      <div className="card p-8">
        <p className="eyebrow">Homepage Social Proof</p>
        <h2 className="mt-3 font-heading text-4xl text-brand-900">Testimonials</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-charcoal-600">
          Testimonials are also separated into a list-and-editor flow so homepage social proof does
          not clutter the landing page workspace.
        </p>
      </div>

      <WorkspaceSplit
        sidebar={
          <ResourceListCard
            eyebrow="Testimonials"
            title="Homepage Quotes"
            description="Select one testimonial to edit its quote, traveller name, and trip reference."
            actions={
              <button type="button" className="btn-ghost" onClick={handleAddTestimonial}>
                Add Testimonial
              </button>
            }
          >
            {testimonialState.map((testimonial, index) => (
              <SelectableResourceButton
                key={testimonial.id ?? `testimonial-${index}`}
                active={selectedIndex === index}
                title={testimonial.name || `Testimonial ${index + 1}`}
                meta={testimonial.homeCountry || "Draft"}
                description={testimonial.trip || "Homepage social proof"}
                badge={testimonial.homeCountry || "Draft"}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </ResourceListCard>
        }
        editor={
          selectedTestimonial ? (
            <TestimonialEditorPanel
              testimonial={selectedTestimonial}
              index={selectedIndex}
              setTestimonialState={setTestimonialState}
              saving={saving}
              request={request}
              onDelete={() =>
                handleDeleteTestimonial(selectedIndex, selectedTestimonial.id)
              }
            />
          ) : (
            <EmptyEditorState
              title="No testimonials available"
              description="Add a testimonial to start managing homepage quotes."
            />
          )
        }
      />
    </section>
  );
}

function PageEditorCard({
  page,
  setPagesState,
  saving,
  request,
}: {
  page: CmsPage;
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
  saving: string | null;
  request: RequestFn;
}) {
  const config = pageEditorConfig[page.slug];
  if (!config) return null;

  const saveKey = `page-${page.slug}`;
  const mediaFields = pageMediaConfig[page.slug] ?? [];

  return (
    <EditorCard
      eyebrow="Editor"
      title={page.title}
      description={config.summary}
      badge={page.status}
      footer={
        <ActionRow>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void request("/api/admin/pages", { method: "POST", body: JSON.stringify(page) }, saveKey)
            }
          >
            {saving === saveKey ? "Saving..." : "Save Page"}
          </button>
          <a
            href={page.slug === "home" ? "/" : `/${page.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            View Page
          </a>
        </ActionRow>
      }
    >
      <CrudGrid>
        <Field
          label="Page Title"
          value={page.title}
          onChange={(value) => updatePage(setPagesState, page.slug, { title: value })}
        />
        <Field label="Page Slug" value={page.slug} onChange={() => undefined} readOnly />
        <TextAreaField
          label="Page Summary"
          value={page.excerpt}
          onChange={(value) => updatePage(setPagesState, page.slug, { excerpt: value })}
          rows={3}
          className="md:col-span-2"
        />
        <Field
          label="Status"
          value={page.status}
          onChange={(value) => updatePage(setPagesState, page.slug, { status: value as CmsPage["status"] })}
        />
        <Field
          label="Meta Title"
          value={page.metaTitle}
          onChange={(value) => updatePage(setPagesState, page.slug, { metaTitle: value })}
        />
        <TextAreaField
          label="Meta Description"
          value={page.metaDescription}
          onChange={(value) => updatePage(setPagesState, page.slug, { metaDescription: value })}
          rows={3}
          className="md:col-span-2"
        />
        {mediaFields.map((media) => (
          <MediaField
            key={`${page.slug}-${media.urlKey}`}
            label={media.label}
            currentUrl={typeof page.content[media.urlKey] === "string" ? (page.content[media.urlKey] as string) : ""}
            currentPath={typeof page.content[media.pathKey] === "string" ? (page.content[media.pathKey] as string) : undefined}
            folder={media.folder}
            slug={page.slug}
            field={media.urlKey}
            onUploaded={(url, path) =>
              updatePageMedia(setPagesState, page.slug, media.urlKey, media.pathKey, url, path)
            }
            onCleared={() =>
              updatePageMedia(setPagesState, page.slug, media.urlKey, media.pathKey, "", "")
            }
            className="md:col-span-2"
          />
        ))}
        {config.fields.map((field) => (
          <PageFieldEditor
            key={`${page.slug}-${field.key}`}
            page={page}
            field={field}
            setPagesState={setPagesState}
          />
        ))}
      </CrudGrid>
    </EditorCard>
  );
}

function TourEditorPanel({
  tour,
  index,
  setTourState,
  saving,
  request,
  onDelete,
}: {
  tour: Tour;
  index: number;
  setTourState: Dispatch<SetStateAction<Tour[]>>;
  saving: string | null;
  request: RequestFn;
  onDelete: () => Promise<void> | void;
}) {
  const saveKey = `tour-${index}`;

  return (
    <EditorCard
      eyebrow="Editor"
      title={tour.title || `Tour ${index + 1}`}
      description={tour.tagline || "Independent tour landing page"}
      badge={tour.duration || "Draft"}
      footer={
        <ActionRow>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void request(
                "/api/admin/tours",
                { method: "POST", body: JSON.stringify({ ...tour, status: "published" }) },
                saveKey,
              )
            }
          >
            {saving === saveKey ? "Saving..." : "Save Tour"}
          </button>
          {tour.slug ? (
            <a href={`/tours/${tour.slug}`} target="_blank" rel="noreferrer" className="btn-ghost">
              View Tour
            </a>
          ) : null}
          <button type="button" className="btn-ghost" onClick={() => void onDelete()}>
            Delete
          </button>
        </ActionRow>
      }
    >
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
    </EditorCard>
  );
}

function BlogPostEditorPanel({
  post,
  index,
  setBlogState,
  saving,
  request,
  onDelete,
}: {
  post: BlogPost;
  index: number;
  setBlogState: Dispatch<SetStateAction<BlogPost[]>>;
  saving: string | null;
  request: RequestFn;
  onDelete: () => Promise<void> | void;
}) {
  const saveKey = `post-${index}`;

  return (
    <EditorCard
      eyebrow="Editor"
      title={post.title || `Post ${index + 1}`}
      description={post.excerpt || "Blog article draft"}
      badge={post.publishedAt || "Draft"}
      footer={
        <ActionRow>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void request(
                "/api/admin/blog-posts",
                { method: "POST", body: JSON.stringify({ ...post, status: "published" }) },
                saveKey,
              )
            }
          >
            {saving === saveKey ? "Saving..." : "Save Post"}
          </button>
          {post.slug ? (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="btn-ghost">
              View Post
            </a>
          ) : null}
          <button type="button" className="btn-ghost" onClick={() => void onDelete()}>
            Delete
          </button>
        </ActionRow>
      }
    >
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
        <TextAreaField label="Content Paragraphs" value={post.content.join("\n")} onChange={(value) => updateItem(setBlogState, index, { content: splitLineList(value) })} rows={8} className="md:col-span-2" />
      </CrudGrid>
    </EditorCard>
  );
}

function SubmissionEditorPanel({
  submission,
  saving,
  request,
  onStatusChange,
}: {
  submission: ContactSubmission;
  saving: string | null;
  request: RequestFn;
  onStatusChange: (status: ContactSubmission["status"]) => void;
}) {
  const saveKey = `submission-${submission.id}`;

  return (
    <EditorCard
      eyebrow="Lead Detail"
      title={submission.name}
      description={submission.preferredTour ? `Preferred tour: ${submission.preferredTour}` : "General website enquiry"}
      badge={submission.status}
      footer={
        <ActionRow>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void request(
                "/api/admin/contact-submissions",
                {
                  method: "PATCH",
                  body: JSON.stringify({ id: submission.id, status: submission.status }),
                },
                saveKey,
              )
            }
          >
            {saving === saveKey ? "Saving..." : "Save Status"}
          </button>
          <a href={`mailto:${submission.email}`} className="btn-ghost">
            Email Lead
          </a>
        </ActionRow>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InfoBlock label="Email" value={submission.email} />
        <InfoBlock label="Submitted" value={formatDateTime(submission.createdAt)} />
        <InfoBlock label="Preferred Tour" value={submission.preferredTour ?? "Not specified"} />
        <label className="block space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
            Lead Status
          </span>
          <select
            className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 text-charcoal-800 outline-none focus:border-brand-900"
            value={submission.status}
            onChange={(event) => onStatusChange(event.target.value as ContactSubmission["status"])}
          >
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="closed">closed</option>
          </select>
        </label>
        <div className="md:col-span-2">
          <TextAreaField
            label="Message"
            value={submission.message}
            onChange={() => undefined}
            rows={10}
            readOnly
          />
        </div>
      </div>
    </EditorCard>
  );
}

function TestimonialEditorPanel({
  testimonial,
  index,
  setTestimonialState,
  saving,
  request,
  onDelete,
}: {
  testimonial: Testimonial;
  index: number;
  setTestimonialState: Dispatch<SetStateAction<Testimonial[]>>;
  saving: string | null;
  request: RequestFn;
  onDelete: () => Promise<void> | void;
}) {
  const saveKey = `testimonial-${index}`;

  return (
    <EditorCard
      eyebrow="Editor"
      title={testimonial.name || `Testimonial ${index + 1}`}
      description={testimonial.trip || "Homepage social proof"}
      badge={testimonial.homeCountry || "Draft"}
      footer={
        <ActionRow>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void request(
                "/api/admin/testimonials",
                { method: "POST", body: JSON.stringify({ ...testimonial, status: "published" }) },
                saveKey,
              )
            }
          >
            {saving === saveKey ? "Saving..." : "Save Testimonial"}
          </button>
          <button type="button" className="btn-ghost" onClick={() => void onDelete()}>
            Delete
          </button>
        </ActionRow>
      }
    >
      <CrudGrid>
        <Field label="Name" value={testimonial.name} onChange={(value) => updateItem(setTestimonialState, index, { name: value })} />
        <Field label="Home Country" value={testimonial.homeCountry} onChange={(value) => updateItem(setTestimonialState, index, { homeCountry: value })} />
        <Field label="Trip" value={testimonial.trip} onChange={(value) => updateItem(setTestimonialState, index, { trip: value })} className="md:col-span-2" />
        <TextAreaField label="Quote" value={testimonial.quote} onChange={(value) => updateItem(setTestimonialState, index, { quote: value })} rows={6} className="md:col-span-2" />
      </CrudGrid>
    </EditorCard>
  );
}

function PageFieldEditor({
  page,
  field,
  setPagesState,
}: {
  page: CmsPage;
  field: PageField;
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
}) {
  const value = page.content[field.key];

  if (field.type === "textarea") {
    return (
      <TextAreaField
        label={field.label}
        value={typeof value === "string" ? value : ""}
        onChange={(nextValue) => updatePageContent(setPagesState, page.slug, field.key, nextValue)}
        rows={field.rows ?? 4}
        className={field.className}
      />
    );
  }

  if (field.type === "list") {
    return (
      <TextAreaField
        label={`${field.label} (one item per line)`}
        value={Array.isArray(value) ? value.join("\n") : ""}
        onChange={(nextValue) =>
          updatePageContent(setPagesState, page.slug, field.key, splitLineList(nextValue))
        }
        rows={6}
        className={field.className}
      />
    );
  }

  if (field.type === "cards") {
    return (
      <TextAreaField
        label={`${field.label} (one item per line: Icon | Title | Description)`}
        value={cardsToText(value)}
        onChange={(nextValue) =>
          updatePageContent(setPagesState, page.slug, field.key, textToCards(nextValue))
        }
        rows={7}
        className={field.className}
      />
    );
  }

  if (field.type === "slides") {
    return <HeroSlidesField page={page} field={field} setPagesState={setPagesState} />;
  }

  if (field.type === "gallery") {
    return <GalleryPhotosField page={page} field={field} setPagesState={setPagesState} />;
  }

  return (
    <Field
      label={field.label}
      value={typeof value === "string" ? value : ""}
      onChange={(nextValue) => updatePageContent(setPagesState, page.slug, field.key, nextValue)}
      className={field.className}
    />
  );
}

function HeroSlidesField({
  page,
  field,
  setPagesState,
}: {
  page: CmsPage;
  field: PageField;
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
}) {
  const slides = getHeroSlidesFromValue(page.content[field.key]);

  return (
    <div className={`space-y-4 ${field.className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
          {field.label}
        </span>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => updatePageContent(setPagesState, page.slug, field.key, [...slides, makeSlide()])}
        >
          Add Slide
        </button>
      </div>

      {slides.map((slide, index) => (
        <div
          key={`${page.slug}-slide-${index}`}
          className="rounded-[1.25rem] border border-brand-900/10 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <MediaField
              label={`Slide ${index + 1} Image`}
              currentUrl={slide.imageUrl}
              currentPath={slide.imagePath}
              folder="pages"
              slug={page.slug}
              field={`hero-slide-${index + 1}`}
              onUploaded={(url, path) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  imageUrl: url,
                  imagePath: path,
                })
              }
              onCleared={() =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  imageUrl: "",
                  imagePath: "",
                })
              }
              className="md:col-span-2"
            />
            <Field
              label="Eyebrow"
              value={slide.eyebrow}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, { eyebrow: value })
              }
            />
            <Field
              label="Primary CTA Label"
              value={slide.primaryCtaLabel}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  primaryCtaLabel: value,
                })
              }
            />
            <TextAreaField
              label="Title"
              value={slide.title}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, { title: value })
              }
              rows={3}
              className="md:col-span-2"
            />
            <TextAreaField
              label="Description"
              value={slide.description}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  description: value,
                })
              }
              rows={4}
              className="md:col-span-2"
            />
            <Field
              label="Primary CTA Link"
              value={slide.primaryCtaHref}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  primaryCtaHref: value,
                })
              }
            />
            <Field
              label="Secondary CTA Label"
              value={slide.secondaryCtaLabel}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  secondaryCtaLabel: value,
                })
              }
            />
            <Field
              label="Secondary CTA Link"
              value={slide.secondaryCtaHref}
              onChange={(value) =>
                updateHeroSlide(setPagesState, page.slug, field.key, index, {
                  secondaryCtaHref: value,
                })
              }
              className="md:col-span-2"
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => removeHeroSlide(setPagesState, page.slug, field.key, index)}
            >
              Delete Slide
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryPhotosField({
  page,
  field,
  setPagesState,
}: {
  page: CmsPage;
  field: PageField;
  setPagesState: Dispatch<SetStateAction<CmsPage[]>>;
}) {
  const photos = getGalleryPhotosFromValue(page.content[field.key]);

  return (
    <div className={`space-y-4 ${field.className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
          {field.label}
        </span>
        <button
          type="button"
          className="btn-ghost"
          onClick={() =>
            updatePageContent(setPagesState, page.slug, field.key, [...photos, makeGalleryPhoto()])
          }
        >
          Add Photo
        </button>
      </div>

      {photos.map((photo, index) => (
        <div
          key={`${page.slug}-gallery-photo-${index}`}
          className="rounded-[1.25rem] border border-brand-900/10 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <MediaField
              label={`Photo ${index + 1} Image`}
              currentUrl={photo.src}
              currentPath={photo.imagePath}
              folder="pages"
              slug={page.slug}
              field={`gallery-photo-${index + 1}`}
              onUploaded={(url, path) =>
                updateGalleryPhoto(setPagesState, page.slug, field.key, index, {
                  src: url,
                  imagePath: path,
                })
              }
              onCleared={() =>
                updateGalleryPhoto(setPagesState, page.slug, field.key, index, {
                  src: "",
                  imagePath: "",
                })
              }
              className="md:col-span-2"
            />
            <Field
              label="Alt Text"
              value={photo.alt}
              onChange={(value) =>
                updateGalleryPhoto(setPagesState, page.slug, field.key, index, { alt: value })
              }
            />
            <Field
              label="Card Height"
              type="number"
              value={String(photo.height)}
              onChange={(value) =>
                updateGalleryPhoto(setPagesState, page.slug, field.key, index, {
                  height: Number.parseInt(value, 10) || 420,
                })
              }
            />
            <TextAreaField
              label="Caption"
              value={photo.caption}
              onChange={(value) =>
                updateGalleryPhoto(setPagesState, page.slug, field.key, index, {
                  caption: value,
                })
              }
              rows={3}
              className="md:col-span-2"
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => removeGalleryPhoto(setPagesState, page.slug, field.key, index)}
            >
              Delete Photo
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MediaField({
  label,
  currentUrl,
  currentPath,
  folder,
  slug,
  field,
  onUploaded,
  onCleared,
  className,
}: {
  label: string;
  currentUrl: string;
  currentPath?: string;
  folder: string;
  slug: string;
  field: string;
  onUploaded: (url: string, path: string) => void;
  onCleared: () => void;
  className?: string;
}) {
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

      const payload = await readResponsePayload(response);
      if (!response.ok) throw new Error(getPayloadError(payload, "Upload failed"));

      const url = getPayloadString(payload, "url");
      const path = getPayloadString(payload, "path");

      if (!url || !path) {
        throw new Error("Upload completed without a usable media URL.");
      }

      onUploaded(url, path);
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
      const payload = await readResponsePayload(response);
      if (!response.ok) throw new Error(getPayloadError(payload, "Delete failed"));
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
        <img
          src={currentUrl}
          alt={label}
          className="h-48 w-full rounded-[1rem] border border-brand-900/10 object-cover"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-[1rem] border border-dashed border-brand-900/20 bg-sand-50 text-sm text-charcoal-500">
          No image uploaded yet.
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <label className="btn-ghost cursor-pointer">
          {busy ? "Working..." : currentUrl ? "Replace Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={busy}
          />
        </label>
        {currentUrl ? (
          <button type="button" className="btn-ghost" onClick={handleRemove} disabled={busy}>
            Remove Image
          </button>
        ) : null}
      </div>
    </div>
  );
}

function WorkspaceHeader({
  title,
  description,
  helper,
}: {
  title: string;
  description: string;
  helper?: string;
}) {
  return (
    <section className="card p-8">
      <p className="eyebrow">{title}</p>
      <h2 className="mt-3 font-heading text-4xl text-brand-900">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-charcoal-600">{description}</p>
      {helper ? <p className="mt-3 text-sm font-semibold text-brand-900">{helper}</p> : null}
    </section>
  );
}

function WorkspaceSplit({
  sidebar,
  editor,
}: {
  sidebar: ReactNode;
  editor: ReactNode;
}) {
  return <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">{sidebar}{editor}</div>;
}

function ResourceListCard({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="mt-3 font-heading text-3xl text-brand-900">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-charcoal-600">{description}</p>
        </div>
        {actions}
      </div>
      <div className="mt-6 space-y-3">{children}</div>
    </section>
  );
}

function EditorCard({
  eyebrow,
  title,
  description,
  badge,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="card p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="mt-3 font-heading text-3xl text-brand-900">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-charcoal-600">{description}</p>
        </div>
        {badge ? <StatusBadge value={badge} /> : null}
      </div>
      <div className="mt-6">{children}</div>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </section>
  );
}

function EmptyEditorState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="card flex min-h-[280px] items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <h3 className="font-heading text-3xl text-brand-900">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-charcoal-600">{description}</p>
      </div>
    </section>
  );
}

function SelectableResourceButton({
  active,
  title,
  meta,
  description,
  badge,
  onClick,
}: {
  active: boolean;
  title: string;
  meta: string;
  description: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[1.25rem] border px-4 py-4 text-left transition-colors ${
        active
          ? "border-brand-900 bg-brand-900 text-sand-50"
          : "border-brand-900/10 bg-white text-charcoal-800 hover:bg-sand-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{title}</p>
          <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${active ? "text-sand-50/72" : "text-charcoal-500"}`}>
            {meta}
          </p>
        </div>
        {badge ? (
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
              active ? "bg-white/12 text-sand-50" : "bg-brand-900/6 text-brand-900"
            }`}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <p className={`mt-3 text-sm leading-6 ${active ? "text-sand-50/84" : "text-charcoal-600"}`}>
        {description}
      </p>
    </button>
  );
}

function ResourceSectionLabel({ title }: { title: string }) {
  return (
    <p className="pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-500">
      {title}
    </p>
  );
}

function StatusBadge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900">
      {value}
    </span>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-brand-900/10 bg-sand-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-charcoal-500">{label}</p>
      <p className="mt-2 text-sm leading-7 text-charcoal-800">{value}</p>
    </div>
  );
}

function AccordionCard({
  title,
  subtitle,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="card overflow-hidden p-6" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl text-brand-900">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-charcoal-600">{subtitle}</p>
        </div>
        {badge ? <StatusBadge value={badge} /> : null}
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full bg-sand-50 px-4 py-2 text-sm font-semibold text-brand-900">
      {label}: {value}
    </div>
  );
}

function CrudGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function ActionRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  className,
  type = "text",
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <label className={`block space-y-2 ${className ?? ""}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        readOnly={readOnly}
        className={`w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none ${
          readOnly ? "text-charcoal-500" : "focus:border-brand-900"
        }`}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  className,
  rows = 6,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  rows?: number;
  readOnly?: boolean;
}) {
  return (
    <label className={`block space-y-2 ${className ?? ""}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        readOnly={readOnly}
        className={`w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none ${
          readOnly ? "text-charcoal-500" : "focus:border-brand-900"
        }`}
      />
    </label>
  );
}

function SettingField({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const longField =
    fieldKey.includes("description") ||
    fieldKey.includes("story") ||
    fieldKey.includes("commitment") ||
    fieldKey === "office_address" ||
    fieldKey === "brand_meaning";

  return longField ? (
    <TextAreaField
      label={fieldKey.replaceAll("_", " ")}
      value={value}
      onChange={onChange}
      className="md:col-span-2"
      rows={4}
    />
  ) : (
    <Field label={fieldKey.replaceAll("_", " ")} value={value} onChange={onChange} />
  );
}

function makeEmptyTour(): Tour {
  return {
    slug: "",
    title: "",
    tagline: "",
    heroDescription: "",
    overview: "",
    price: "",
    duration: "3 Days",
    durationDays: 3,
    region: "",
    type: "",
    difficulty: "Moderate",
    maxTravellers: 8,
    image: "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    imageAlt: "",
    enquirySubject: "",
    routeDetails: "",
    highlights: [],
    itinerary: [],
    idealFor: [],
    inclusions: [],
    accommodations: [],
    landscapeStory: "",
    cultureStory: "",
    wildlifeStory: "",
  };
}

function makeEmptyBlogPost(): BlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    readingTime: "5 min read",
    image: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    imageAlt: "",
    content: [],
  };
}

function makeEmptyTestimonial(): Testimonial {
  return {
    name: "",
    homeCountry: "",
    trip: "",
    quote: "",
  };
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}...`;
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function updateItem<T>(
  setter: Dispatch<SetStateAction<T[]>>,
  index: number,
  patch: Partial<T>,
) {
  setter((current) =>
    current.map((item, itemIndex) =>
      itemIndex === index ? ({ ...item, ...patch } as T) : item,
    ),
  );
}

function updatePage(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  patch: Partial<CmsPage>,
) {
  setter((current) =>
    current.map((page) => (page.slug === slug ? { ...page, ...patch } : page)),
  );
}

function updatePageContent(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  key: string,
  value: PageContentValue,
) {
  setter((current) =>
    current.map((page) =>
      page.slug === slug ? { ...page, content: { ...page.content, [key]: value } } : page,
    ),
  );
}

function updatePageMedia(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  urlKey: string,
  pathKey: string,
  url: string,
  path: string,
) {
  setter((current) =>
    current.map((page) =>
      page.slug === slug
        ? { ...page, content: { ...page.content, [urlKey]: url, [pathKey]: path } }
        : page,
    ),
  );
}

function updateHeroSlide(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  fieldKey: string,
  index: number,
  patch: Record<string, string>,
) {
  setter((current) =>
    current.map((page) => {
      if (page.slug !== slug) return page;
      const slides = getHeroSlidesFromValue(page.content[fieldKey]);

      return {
        ...page,
        content: {
          ...page.content,
          [fieldKey]: slides.map((slide, slideIndex) =>
            slideIndex === index ? { ...slide, ...patch } : slide,
          ),
        },
      };
    }),
  );
}

function updateGalleryPhoto(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  fieldKey: string,
  index: number,
  patch: Partial<GalleryPhoto>,
) {
  setter((current) =>
    current.map((page) => {
      if (page.slug !== slug) return page;
      const photos = getGalleryPhotosFromValue(page.content[fieldKey]);

      return {
        ...page,
        content: {
          ...page.content,
          [fieldKey]: photos.map((photo, photoIndex) =>
            photoIndex === index ? { ...photo, ...patch } : photo,
          ),
        },
      };
    }),
  );
}

function removeHeroSlide(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  fieldKey: string,
  index: number,
) {
  setter((current) =>
    current.map((page) => {
      if (page.slug !== slug) return page;
      const slides = getHeroSlidesFromValue(page.content[fieldKey]);

      return {
        ...page,
        content: {
          ...page.content,
          [fieldKey]: slides.filter((_, slideIndex) => slideIndex !== index),
        },
      };
    }),
  );
}

function removeGalleryPhoto(
  setter: Dispatch<SetStateAction<CmsPage[]>>,
  slug: string,
  fieldKey: string,
  index: number,
) {
  setter((current) =>
    current.map((page) => {
      if (page.slug !== slug) return page;
      const photos = getGalleryPhotosFromValue(page.content[fieldKey]);

      return {
        ...page,
        content: {
          ...page.content,
          [fieldKey]: photos.filter((_, photoIndex) => photoIndex !== index),
        },
      };
    }),
  );
}

function splitLineList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cardsToText(value: unknown) {
  return Array.isArray(value)
    ? value
        .map((item) =>
          item && typeof item === "object"
            ? `${String((item as Record<string, unknown>).icon ?? "")} | ${String((item as Record<string, unknown>).title ?? "")} | ${String((item as Record<string, unknown>).description ?? "")}`
            : "",
        )
        .filter(Boolean)
        .join("\n")
    : "";
}

function textToCards(value: string) {
  return splitLineList(value).map((line) => {
    const [icon = "", title = "", ...rest] = line.split("|").map((part) => part.trim());
    return { icon, title, description: rest.join(" | ").trim() };
  });
}

function getHeroSlidesFromValue(value: unknown) {
  return Array.isArray(value)
    ? value
        .filter((item) => item && typeof item === "object" && !Array.isArray(item))
        .map((item) => {
          const slide = item as Record<string, unknown>;

          return {
            imageUrl: typeof slide.imageUrl === "string" ? slide.imageUrl : "",
            imagePath: typeof slide.imagePath === "string" ? slide.imagePath : "",
            eyebrow: typeof slide.eyebrow === "string" ? slide.eyebrow : "",
            title: typeof slide.title === "string" ? slide.title : "",
            description: typeof slide.description === "string" ? slide.description : "",
            primaryCtaLabel:
              typeof slide.primaryCtaLabel === "string" ? slide.primaryCtaLabel : "",
            primaryCtaHref:
              typeof slide.primaryCtaHref === "string" ? slide.primaryCtaHref : "",
            secondaryCtaLabel:
              typeof slide.secondaryCtaLabel === "string" ? slide.secondaryCtaLabel : "",
            secondaryCtaHref:
              typeof slide.secondaryCtaHref === "string" ? slide.secondaryCtaHref : "",
          };
        })
    : [];
}

function getGalleryPhotosFromValue(value: unknown): GalleryPhoto[] {
  return Array.isArray(value)
    ? value
        .filter((item) => item && typeof item === "object" && !Array.isArray(item))
        .map((item) => {
          const photo = item as Record<string, unknown>;
          const heightValue =
            typeof photo.height === "number"
              ? photo.height
              : Number.parseInt(String(photo.height ?? ""), 10);

          return {
            src: typeof photo.src === "string" ? photo.src : "",
            imagePath: typeof photo.imagePath === "string" ? photo.imagePath : "",
            alt: typeof photo.alt === "string" ? photo.alt : "",
            caption: typeof photo.caption === "string" ? photo.caption : "",
            height: Number.isFinite(heightValue) && heightValue > 0 ? heightValue : 420,
          };
        })
    : [];
}

function makeSlide() {
  return {
    imageUrl: "",
    imagePath: "",
    eyebrow: "",
    title: "",
    description: "",
    primaryCtaLabel: "",
    primaryCtaHref: "",
    secondaryCtaLabel: "",
    secondaryCtaHref: "",
  };
}

function makeGalleryPhoto(): GalleryPhoto {
  return {
    src: "",
    imagePath: "",
    alt: "",
    caption: "",
    height: 420,
  };
}

async function readResponsePayload(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();

  if (!raw.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return { error: raw };
  }
}

function getPayloadError(payload: Record<string, unknown>, fallback: string) {
  return typeof payload.error === "string" && payload.error.trim() ? payload.error : fallback;
}

function getPayloadString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" && value.trim() ? value : "";
}
