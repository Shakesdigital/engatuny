import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRoute } from "@/lib/admin-api";

const blogSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  title: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.array(z.string()).default([]),
  image: z.string().url(),
  imagePath: z.string().optional(),
  readingTime: z.string().min(2),
  publishedAt: z.string().min(4),
  status: z.enum(["draft", "published", "archived"]).default("published"),
});

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = blogSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid blog payload." }, { status: 400 });
  }

  const post = parsed.data;
  const { error } = await admin.supabase.from("blog_posts").upsert(
    {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featured_image_url: post.image,
      featured_image_path: post.imagePath,
      reading_time: post.readingTime,
      published_at: new Date(post.publishedAt).toISOString(),
      status: post.status,
    },
    { onConflict: "slug" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const { error } = await admin.supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
