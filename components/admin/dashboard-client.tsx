"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { BlogPost, ContactSubmission, Testimonial, Tour } from "@/types/content";

type AdminDashboardClientProps = {
  settings: Record<string, string>;
  tours: Tour[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  contactSubmissions: ContactSubmission[];
  adminEmail: string;
  logoPath: string;
};

type AdminTab = "landing-pages" | "tours" | "blog" | "submissions" | "settings";

const landingPageCards = [
  {
    title: "Home Page",
    href: "/",
    description: "Homepage story, brand promise, and featured social proof.",
    managedIn: "Landing Pages",
  },
  {
    title: "About Us",
    href: "/about",
    description: "Company story, Engatuny meaning, and founder commitment copy.",
    managedIn: "Landing Pages",
  },
  {
    title: "Tours Landing Page",
    href: "/tours",
    description: "Tour collection page driven by the records managed in the Tours tab.",
    managedIn: "Tours",
  },
  {
    title: "Contact Page",
    href: "/contact",
    description: "Contact prompts, office information, and form entry points.",
    managedIn: "Settings",
  },
];

const landingPageFields = [
  "site_name",
  "tagline",
  "site_description",
  "brand_meaning",
  "brand_story",
  "founder_karamoja_commitment",
] as const;

export function AdminDashboardClient({
  settings,
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
  const [settingsState, setSettingsState] = useState({
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
  const [tourState, setTourState] = useState<Tour[]>(tours);
  const [blogState, setBlogState] = useState<BlogPost[]>(blogPosts);
  const [testimonialState, setTestimonialState] = useState<Testimonial[]>(testimonials);

  const navItems = [
    {
      id: "landing-pages" as const,
      label: "Landing Pages",
      description: "Home, About, and homepage social proof.",
      count: landingPageCards.length,
    },
    {
      id: "tours" as const,
      label: "Tours",
      description: "Tour pages and itinerary records.",
      count: tourState.length,
    },
    {
      id: "blog" as const,
      label: "Blog",
      description: "Journal articles and updates.",
      count: blogState.length,
    },
    {
      id: "submissions" as const,
      label: "Form Submissions",
      description: "Website enquiries and lead follow-up.",
      count: contactSubmissions.length,
    },
    {
      id: "settings" as const,
      label: "Settings",
      description: "Brand colors, contact details, and logo path.",
      count: Object.keys(settingsState).length,
    },
  ];

  async function request(path: string, init: RequestInit, key: string) {
    try {
      setSaving(key);
      setMessage(null);

      const response = await fetch(path, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init.headers ?? {}),
        },
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "Request failed");
      }

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

  return (
    <div className="space-y-8">
      <section className="card overflow-hidden p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <img src={logoPath} alt="Engatuny logo" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="eyebrow">Website Control Panel</p>
              <h1 className="mt-2 font-heading text-4xl text-brand-900">Engatuny Admin</h1>
              <p className="mt-2 text-sm leading-7 text-charcoal-600">
                Signed in as {adminEmail}. Use the tabs below to manage each part of the website.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatBadge label="Landing Pages" value={String(landingPageCards.length)} />
            <StatBadge label="Tours" value={String(tourState.length)} />
            <StatBadge label="Blog Posts" value={String(blogState.length)} />
            <StatBadge label="Leads" value={String(contactSubmissions.length)} />
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
              <WorkspaceHeader
                title="Landing Pages"
                description="Manage the key story content that shapes the Home and About pages, and keep homepage testimonials easy to update."
              />

              <section className="grid gap-4 md:grid-cols-2">
                {landingPageCards.map((page) => (
                  <article key={page.title} className="card p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-2xl text-brand-900">{page.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-charcoal-600">
                          {page.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900">
                        {page.managedIn}
                      </span>
                    </div>
                    <a href={page.href} target="_blank" rel="noreferrer" className="btn-ghost mt-5">
                      View Page
                    </a>
                  </article>
                ))}
              </section>

              <section className="card p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="font-heading text-3xl text-brand-900">Core Landing Page Copy</h2>
                    <p className="mt-2 text-sm leading-7 text-charcoal-600">
                      These fields control the main brand and story language visitors see first.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() =>
                      request(
                        "/api/admin/settings",
                        {
                          method: "POST",
                          body: JSON.stringify(settingsState),
                        },
                        "landing-pages",
                      )
                    }
                  >
                    {saving === "landing-pages" ? "Saving..." : "Save Landing Page Content"}
                  </button>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {landingPageFields.map((key) => (
                    <SettingField
                      key={key}
                      fieldKey={key}
                      value={settingsState[key]}
                      onChange={(value) =>
                        setSettingsState((current) => ({ ...current, [key]: value }))
                      }
                    />
                  ))}
                </div>
              </section>

              <CrudSection
                title="Homepage Testimonials"
                description="These quotes appear as social proof on the public-facing site."
                items={testimonialState}
                onAdd={() =>
                  setTestimonialState((current) => [
                    ...current,
                    { name: "", homeCountry: "", trip: "", quote: "" },
                  ])
                }
                renderItem={(testimonial, index) => (
                  <article key={testimonial.id ?? `testimonial-${index}`} className="rounded-[1.5rem] border border-brand-900/10 p-6">
                    <CrudGrid>
                      <Field label="Name" value={testimonial.name} onChange={(value) => updateItem(setTestimonialState, index, { name: value })} />
                      <Field label="Home Country" value={testimonial.homeCountry} onChange={(value) => updateItem(setTestimonialState, index, { homeCountry: value })} />
                      <Field label="Trip" value={testimonial.trip} onChange={(value) => updateItem(setTestimonialState, index, { trip: value })} className="md:col-span-2" />
                      <TextAreaField label="Quote" value={testimonial.quote} onChange={(value) => updateItem(setTestimonialState, index, { quote: value })} className="md:col-span-2" />
                    </CrudGrid>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() =>
                          request(
                            "/api/admin/testimonials",
                            {
                              method: "POST",
                              body: JSON.stringify({ ...testimonial, status: "published" }),
                            },
                            `testimonial-${index}`,
                          )
                        }
                      >
                        {saving === `testimonial-${index}` ? "Saving..." : "Save Testimonial"}
                      </button>
                      {testimonial.id ? (
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() =>
                            request(`/api/admin/testimonials?id=${testimonial.id}`, { method: "DELETE" }, `testimonial-delete-${index}`)
                          }
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </article>
                )}
              />
            </>
          ) : null}

          {activeTab === "settings" ? (
            <>
              <WorkspaceHeader
                title="Settings"
                description="Global website configuration for branding, contact details, and reusable site-wide values."
              />

              <section className="card p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="font-heading text-3xl text-brand-900">Website Settings</h2>
                    <p className="mt-2 text-sm leading-7 text-charcoal-600">
                      Change these values with care. They affect the full site experience.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() =>
                      request(
                        "/api/admin/settings",
                        {
                          method: "POST",
                          body: JSON.stringify(settingsState),
                        },
                        "settings",
                      )
                    }
                  >
                    {saving === "settings" ? "Saving..." : "Save Settings"}
                  </button>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {Object.entries(settingsState).map(([key, value]) => (
                    <SettingField
                      key={key}
                      fieldKey={key}
                      value={value}
                      onChange={(nextValue) =>
                        setSettingsState((current) => ({ ...current, [key]: nextValue }))
                      }
                    />
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {activeTab === "tours" ? (
            <>
              <WorkspaceHeader
                title="Tours"
                description="Manage the Tours landing page through the tour collection below, then open each itinerary as a dedicated landing page record."
              />

              <CrudSection
        title="Tours"
        description="Manage independent tour landing pages, route copy, and itinerary detail."
        items={tourState}
        onAdd={() =>
          setTourState((current) => [
            ...current,
            {
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
            },
          ])
        }
        renderItem={(tour, index) => (
          <article key={tour.id ?? `tour-${index}`} className="rounded-[1.5rem] border border-brand-900/10 p-6">
            <CrudGrid>
              <Field label="Title" value={tour.title} onChange={(value) => updateItem(setTourState, index, { title: value })} />
              <Field label="Slug" value={tour.slug} onChange={(value) => updateItem(setTourState, index, { slug: value })} />
              <Field label="Tagline" value={tour.tagline} onChange={(value) => updateItem(setTourState, index, { tagline: value })} className="md:col-span-2" />
              <TextAreaField label="Hero Description" value={tour.heroDescription} onChange={(value) => updateItem(setTourState, index, { heroDescription: value })} className="md:col-span-2" />
              <TextAreaField label="Overview" value={tour.overview} onChange={(value) => updateItem(setTourState, index, { overview: value })} className="md:col-span-2" />
              <Field label="Price" value={tour.price} onChange={(value) => updateItem(setTourState, index, { price: value })} />
              <Field label="Duration" value={tour.duration} onChange={(value) => updateItem(setTourState, index, { duration: value })} />
              <Field label="Duration Days" type="number" value={String(tour.durationDays)} onChange={(value) => updateItem(setTourState, index, { durationDays: Number(value) })} />
              <Field label="Max Travellers" type="number" value={String(tour.maxTravellers)} onChange={(value) => updateItem(setTourState, index, { maxTravellers: Number(value) })} />
              <Field label="Region" value={tour.region} onChange={(value) => updateItem(setTourState, index, { region: value })} />
              <Field label="Type" value={tour.type} onChange={(value) => updateItem(setTourState, index, { type: value })} />
              <Field label="Difficulty" value={tour.difficulty} onChange={(value) => updateItem(setTourState, index, { difficulty: value as Tour["difficulty"] })} />
              <Field label="Image URL" value={tour.image} onChange={(value) => updateItem(setTourState, index, { image: value })} className="md:col-span-2" />
              <Field label="Image Alt" value={tour.imageAlt} onChange={(value) => updateItem(setTourState, index, { imageAlt: value })} className="md:col-span-2" />
              <Field label="Enquiry Subject" value={tour.enquirySubject} onChange={(value) => updateItem(setTourState, index, { enquirySubject: value })} className="md:col-span-2" />
              <TextAreaField label="Route Details" value={tour.routeDetails} onChange={(value) => updateItem(setTourState, index, { routeDetails: value })} className="md:col-span-2" />
              <Field
                label="Highlights"
                value={tour.highlights.join(", ")}
                onChange={(value) => updateItem(setTourState, index, { highlights: splitCommaList(value) })}
                className="md:col-span-2"
              />
              <Field
                label="Ideal For"
                value={tour.idealFor.join(", ")}
                onChange={(value) => updateItem(setTourState, index, { idealFor: splitCommaList(value) })}
                className="md:col-span-2"
              />
              <Field
                label="Inclusions"
                value={tour.inclusions.join(", ")}
                onChange={(value) => updateItem(setTourState, index, { inclusions: splitCommaList(value) })}
                className="md:col-span-2"
              />
              <Field
                label="Accommodation Options"
                value={tour.accommodations.join(", ")}
                onChange={(value) => updateItem(setTourState, index, { accommodations: splitCommaList(value) })}
                className="md:col-span-2"
              />
              <TextAreaField
                label="Itinerary"
                value={tour.itinerary.join("\n")}
                onChange={(value) => updateItem(setTourState, index, { itinerary: splitLineList(value) })}
                className="md:col-span-2"
              />
              <TextAreaField label="Landscape Story" value={tour.landscapeStory} onChange={(value) => updateItem(setTourState, index, { landscapeStory: value })} className="md:col-span-2" />
              <TextAreaField label="Culture Story" value={tour.cultureStory} onChange={(value) => updateItem(setTourState, index, { cultureStory: value })} className="md:col-span-2" />
              <TextAreaField label="Wildlife Story" value={tour.wildlifeStory} onChange={(value) => updateItem(setTourState, index, { wildlifeStory: value })} className="md:col-span-2" />
            </CrudGrid>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  request(
                    "/api/admin/tours",
                    {
                      method: "POST",
                      body: JSON.stringify({ ...tour, status: "published" }),
                    },
                    `tour-${index}`,
                  )
                }
              >
                {saving === `tour-${index}` ? "Saving..." : "Save Tour"}
              </button>
              {tour.id ? (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => request(`/api/admin/tours?id=${tour.id}`, { method: "DELETE" }, `tour-delete-${index}`)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </article>
        )}
      />
            </>
          ) : null}

          {activeTab === "blog" ? (
            <>
              <WorkspaceHeader
                title="Blog"
                description="Manage all journal content in one place with a simpler article editing flow."
              />

              <CrudSection
        title="Blog Posts"
        description="Manage journal content, publishing dates, and story copy."
        items={blogState}
        onAdd={() =>
          setBlogState((current) => [
            ...current,
            {
              slug: "",
              title: "",
              excerpt: "",
              publishedAt: new Date().toISOString().slice(0, 10),
              readingTime: "5 min read",
              image: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
              imageAlt: "",
              content: [],
            },
          ])
        }
        renderItem={(post, index) => (
          <article key={post.id ?? `post-${index}`} className="rounded-[1.5rem] border border-brand-900/10 p-6">
            <CrudGrid>
              <Field label="Title" value={post.title} onChange={(value) => updateItem(setBlogState, index, { title: value })} />
              <Field label="Slug" value={post.slug} onChange={(value) => updateItem(setBlogState, index, { slug: value })} />
              <TextAreaField label="Excerpt" value={post.excerpt} onChange={(value) => updateItem(setBlogState, index, { excerpt: value })} className="md:col-span-2" />
              <Field label="Published At" value={post.publishedAt} onChange={(value) => updateItem(setBlogState, index, { publishedAt: value })} />
              <Field label="Reading Time" value={post.readingTime} onChange={(value) => updateItem(setBlogState, index, { readingTime: value })} />
              <Field label="Image URL" value={post.image} onChange={(value) => updateItem(setBlogState, index, { image: value })} className="md:col-span-2" />
              <TextAreaField
                label="Content Paragraphs"
                value={post.content.join("\n")}
                onChange={(value) => updateItem(setBlogState, index, { content: splitLineList(value) })}
                className="md:col-span-2"
              />
            </CrudGrid>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  request(
                    "/api/admin/blog-posts",
                    {
                      method: "POST",
                      body: JSON.stringify({ ...post, status: "published" }),
                    },
                    `post-${index}`,
                  )
                }
              >
                {saving === `post-${index}` ? "Saving..." : "Save Post"}
              </button>
              {post.id ? (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() =>
                    request(`/api/admin/blog-posts?id=${post.id}`, { method: "DELETE" }, `post-delete-${index}`)
                  }
                >
                  Delete
                </button>
              ) : null}
            </div>
          </article>
        )}
      />
            </>
          ) : null}

          {activeTab === "submissions" ? (
            <>
              <WorkspaceHeader
                title="Form Submissions"
                description="Review website enquiries and keep their follow-up status clear for the team."
              />

              <section className="card p-8">
        <h2 className="font-heading text-3xl text-brand-900">Contact Enquiries</h2>
        <div className="mt-6 space-y-4">
          {contactSubmissions.length ? (
            contactSubmissions.map((submission) => (
              <article key={submission.id} className="rounded-[1.5rem] border border-brand-900/10 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-charcoal-900">{submission.name}</p>
                    <p className="text-sm text-charcoal-600">
                      {submission.email}
                      {submission.preferredTour ? ` • ${submission.preferredTour}` : ""}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-charcoal-700">
                      {submission.message}
                    </p>
                  </div>
                  <select
                    className="rounded-full border border-brand-900/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal-700"
                    value={submission.status}
                    onChange={(event) =>
                      request(
                        "/api/admin/contact-submissions",
                        {
                          method: "PATCH",
                          body: JSON.stringify({ id: submission.id, status: event.target.value }),
                        },
                        `submission-${submission.id}`,
                      )
                    }
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="closed">closed</option>
                  </select>
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm leading-7 text-charcoal-600">
              No enquiries yet. Once the public form is connected to Supabase, new leads will appear here.
            </p>
          )}
        </div>
      </section>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CrudSection<T>({
  title,
  description,
  items,
  onAdd,
  renderItem,
}: {
  title: string;
  description: string;
  items: T[];
  onAdd: () => void;
  renderItem: (item: T, index: number) => ReactNode;
}) {
  return (
    <section className="card p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-3xl text-brand-900">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-charcoal-600">{description}</p>
        </div>
        <button type="button" className="btn-ghost" onClick={onAdd}>
          Add New
        </button>
      </div>
      <div className="mt-6 space-y-5">{items.map((item, index) => renderItem(item, index))}</div>
    </section>
  );
}

function WorkspaceHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="card p-8">
      <p className="eyebrow">{title}</p>
      <h2 className="mt-3 font-heading text-4xl text-brand-900">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-charcoal-600">{description}</p>
    </section>
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

function Field({
  label,
  value,
  onChange,
  className,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: string;
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
        className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none focus:border-brand-900"
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
  const isLongField =
    fieldKey.includes("description") ||
    fieldKey.includes("story") ||
    fieldKey.includes("commitment") ||
    fieldKey === "office_address" ||
    fieldKey === "brand_meaning";

  if (isLongField) {
    return (
      <TextAreaField
        label={fieldKey.replaceAll("_", " ")}
        value={value}
        onChange={onChange}
        className="md:col-span-2"
        rows={4}
      />
    );
  }

  return (
    <Field
      label={fieldKey.replaceAll("_", " ")}
      value={value}
      onChange={onChange}
    />
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  className,
  rows = 6,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  rows?: number;
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
        className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none focus:border-brand-900"
      />
    </label>
  );
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

function splitCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLineList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
