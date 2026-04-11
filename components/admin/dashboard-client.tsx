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
};

export function AdminDashboardClient({
  settings,
  tours,
  blogPosts,
  testimonials,
  contactSubmissions,
  adminEmail,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [settingsState, setSettingsState] = useState({
    site_name: settings.site_name ?? "",
    tagline: settings.tagline ?? "",
    site_description: settings.site_description ?? "",
    contact_email: settings.contact_email ?? "",
    contact_phone: settings.contact_phone ?? "",
    contact_whatsapp: settings.contact_whatsapp ?? "",
    office_address: settings.office_address ?? "",
  });
  const [tourState, setTourState] = useState<Tour[]>(tours);
  const [blogState, setBlogState] = useState<BlogPost[]>(blogPosts);
  const [testimonialState, setTestimonialState] = useState<Testimonial[]>(testimonials);

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
    <div className="space-y-10">
      <section className="card p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1 className="mt-3 font-heading text-4xl text-forest-900">
              Engatuny CMS
            </h1>
            <p className="mt-3 text-sm leading-7 text-charcoal-600">
              Signed in as {adminEmail}. Manage the public website content directly from Supabase.
            </p>
          </div>
          <button type="button" onClick={handleLogout} className="btn-ghost">
            Sign Out
          </button>
        </div>
        {message ? <p className="mt-5 text-sm font-semibold text-forest-800">{message}</p> : null}
      </section>

      <section className="card p-8">
        <h2 className="font-heading text-3xl text-forest-900">Site Settings</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {Object.entries(settingsState).map(([key, value]) => (
            <label key={key} className={`block space-y-2 ${key === "site_description" || key === "office_address" ? "md:col-span-2" : ""}`}>
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
                {key.replaceAll("_", " ")}
              </span>
              {key === "site_description" || key === "office_address" ? (
                <textarea
                  rows={4}
                  value={value}
                  onChange={(event) =>
                    setSettingsState((current) => ({ ...current, [key]: event.target.value }))
                  }
                  className="w-full rounded-[1rem] border border-forest-900/10 bg-white px-4 py-3 outline-none focus:border-forest-900"
                />
              ) : (
                <input
                  value={value}
                  onChange={(event) =>
                    setSettingsState((current) => ({ ...current, [key]: event.target.value }))
                  }
                  className="w-full rounded-[1rem] border border-forest-900/10 bg-white px-4 py-3 outline-none focus:border-forest-900"
                />
              )}
            </label>
          ))}
        </div>
        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() =>
            request("/api/admin/settings", {
              method: "POST",
              body: JSON.stringify(settingsState),
            }, "settings")
          }
        >
          {saving === "settings" ? "Saving..." : "Save Settings"}
        </button>
      </section>

      <CrudSection
        title="Tours"
        description="Edit pricing, itinerary text, media URLs, and publish state."
        items={tourState}
        onAdd={() =>
          setTourState((current) => [
            ...current,
            {
              slug: "",
              title: "",
              tagline: "",
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
              highlights: [],
              itinerary: [],
            },
          ])
        }
        renderItem={(tour, index) => (
          <article key={tour.id ?? `tour-${index}`} className="rounded-[1.5rem] border border-forest-900/10 p-6">
            <CrudGrid>
              <Field label="Title" value={tour.title} onChange={(value) => updateItem(setTourState, index, { title: value })} />
              <Field label="Slug" value={tour.slug} onChange={(value) => updateItem(setTourState, index, { slug: value })} />
              <Field label="Tagline" value={tour.tagline} onChange={(value) => updateItem(setTourState, index, { tagline: value })} className="md:col-span-2" />
              <Field label="Price" value={tour.price} onChange={(value) => updateItem(setTourState, index, { price: value })} />
              <Field label="Duration" value={tour.duration} onChange={(value) => updateItem(setTourState, index, { duration: value })} />
              <Field label="Duration Days" type="number" value={String(tour.durationDays)} onChange={(value) => updateItem(setTourState, index, { durationDays: Number(value) })} />
              <Field label="Max Travellers" type="number" value={String(tour.maxTravellers)} onChange={(value) => updateItem(setTourState, index, { maxTravellers: Number(value) })} />
              <Field label="Region" value={tour.region} onChange={(value) => updateItem(setTourState, index, { region: value })} />
              <Field label="Type" value={tour.type} onChange={(value) => updateItem(setTourState, index, { type: value })} />
              <Field label="Difficulty" value={tour.difficulty} onChange={(value) => updateItem(setTourState, index, { difficulty: value as Tour["difficulty"] })} />
              <Field label="Image URL" value={tour.image} onChange={(value) => updateItem(setTourState, index, { image: value })} className="md:col-span-2" />
              <Field
                label="Highlights"
                value={tour.highlights.join(", ")}
                onChange={(value) => updateItem(setTourState, index, { highlights: splitCommaList(value) })}
                className="md:col-span-2"
              />
              <TextAreaField
                label="Itinerary"
                value={tour.itinerary.join("\n")}
                onChange={(value) => updateItem(setTourState, index, { itinerary: splitLineList(value) })}
                className="md:col-span-2"
              />
            </CrudGrid>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  request("/api/admin/tours", {
                    method: "POST",
                    body: JSON.stringify({ ...tour, status: "published" }),
                  }, `tour-${index}`)
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
          <article key={post.id ?? `post-${index}`} className="rounded-[1.5rem] border border-forest-900/10 p-6">
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
                  request("/api/admin/blog-posts", {
                    method: "POST",
                    body: JSON.stringify({ ...post, status: "published" }),
                  }, `post-${index}`)
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

      <CrudSection
        title="Testimonials"
        description="Update guest quotes that appear on the public site."
        items={testimonialState}
        onAdd={() =>
          setTestimonialState((current) => [
            ...current,
            { name: "", homeCountry: "", trip: "", quote: "" },
          ])
        }
        renderItem={(testimonial, index) => (
          <article key={testimonial.id ?? `testimonial-${index}`} className="rounded-[1.5rem] border border-forest-900/10 p-6">
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
                  request("/api/admin/testimonials", {
                    method: "POST",
                    body: JSON.stringify({ ...testimonial, status: "published" }),
                  }, `testimonial-${index}`)
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

      <section className="card p-8">
        <h2 className="font-heading text-3xl text-forest-900">Contact Enquiries</h2>
        <div className="mt-6 space-y-4">
          {contactSubmissions.length ? (
            contactSubmissions.map((submission) => (
              <article key={submission.id} className="rounded-[1.5rem] border border-forest-900/10 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-charcoal-900">
                      {submission.name}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {submission.email} {submission.preferredTour ? `• ${submission.preferredTour}` : ""}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-charcoal-700">
                      {submission.message}
                    </p>
                  </div>
                  <select
                    className="rounded-full border border-forest-900/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal-700"
                    value={submission.status}
                    onChange={(event) =>
                      request("/api/admin/contact-submissions", {
                        method: "PATCH",
                        body: JSON.stringify({ id: submission.id, status: event.target.value }),
                      }, `submission-${submission.id}`)
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
          <h2 className="font-heading text-3xl text-forest-900">{title}</h2>
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
        className="w-full rounded-[1rem] border border-forest-900/10 bg-white px-4 py-3 outline-none focus:border-forest-900"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block space-y-2 ${className ?? ""}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-500">
        {label}
      </span>
      <textarea
        rows={6}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[1rem] border border-forest-900/10 bg-white px-4 py-3 outline-none focus:border-forest-900"
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
