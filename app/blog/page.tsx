import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/hero-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getPageBySlug } from "@/lib/cms";
import { getPageHeroSlides } from "@/lib/page-utils";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel stories, planning advice, and warm field notes from across Uganda's trails, forests, rivers, and hidden corners.",
};

export default async function BlogPage() {
  const [posts, page] = await Promise.all([getBlogPosts(), getPageBySlug("blog")]);
  const heroSlides = getPageHeroSlides(page, [
    {
      imageUrl:
        "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      eyebrow: "Journal",
      title: "Stories, practical tips, and field notes from the trail.",
      description:
        "A clean collection of useful inspiration for travellers dreaming about Uganda.",
    },
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} minHeightClassName="min-h-[62vh]" />

      <section className="section bg-sand-50">
        <div className="layout">
          <SectionHeading
            eyebrow="Latest Stories"
            title="Fresh field notes, planning ideas, and Uganda travel inspiration."
            description="Browse the latest articles and open any story for the full read."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="card overflow-hidden">
                <img
                  src={`${post.image}?auto=compress&cs=tinysrgb&w=1200`}
                  alt={post.imageAlt}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-7">
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-500">
                    <span>{post.publishedAt}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl text-forest-900">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-charcoal-600">
                    {post.excerpt}
                  </p>
                  <a href={`/blog/${post.slug}`} className="btn-ghost mt-6">
                    Read Article
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
