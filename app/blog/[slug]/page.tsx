import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/cms";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="section bg-white">
      <div className="layout max-w-4xl">
        <div className="mb-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-500">
          <span>{post.publishedAt}</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-heading text-5xl leading-tight text-forest-900 md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-charcoal-600">{post.excerpt}</p>
        <img
          src={`${post.image}?auto=compress&cs=tinysrgb&w=1600`}
          alt={post.imageAlt}
          className="mt-10 h-[420px] w-full rounded-[2rem] object-cover"
        />
        <div className="prose-copy mt-10 space-y-6 text-lg">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
