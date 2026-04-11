import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRoute } from "@/lib/admin-api";

const tourSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  title: z.string().min(2),
  tagline: z.string().min(2),
  price: z.string().min(2),
  duration: z.string().min(2),
  durationDays: z.coerce.number().int().min(1),
  region: z.string().min(2),
  type: z.string().min(2),
  difficulty: z.string().min(2),
  maxTravellers: z.coerce.number().int().min(1),
  image: z.string().url(),
  highlights: z.array(z.string()).default([]),
  itinerary: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("published"),
});

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = tourSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid tour payload." }, { status: 400 });
  }

  const tour = parsed.data;

  const { error } = await admin.supabase.from("tours").upsert(
    {
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      tagline: tour.tagline,
      price: tour.price,
      duration: tour.duration,
      duration_days: tour.durationDays,
      region: tour.region,
      type: tour.type,
      difficulty: tour.difficulty,
      max_travellers: tour.maxTravellers,
      featured_image_url: tour.image,
      highlights: tour.highlights,
      itinerary: tour.itinerary,
      status: tour.status,
      published_at: new Date().toISOString(),
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

  const { error } = await admin.supabase.from("tours").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
