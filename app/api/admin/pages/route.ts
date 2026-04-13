import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRoute } from "@/lib/admin-api";

const pageSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  title: z.string().min(2),
  excerpt: z.string().min(4),
  status: z.enum(["draft", "published", "archived"]).default("published"),
  metaTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  content: z.record(z.unknown()),
});

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = pageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid page payload." }, { status: 400 });
  }

  const page = parsed.data;
  const { error } = await admin.supabase.from("pages").upsert(
    {
      id: page.id,
      slug: page.slug,
      title: page.title,
      excerpt: page.excerpt,
      status: page.status,
      meta_title: page.metaTitle,
      meta_description: page.metaDescription,
      content: page.content,
    },
    { onConflict: "slug" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
