import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRoute } from "@/lib/admin-api";

const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  homeCountry: z.string().min(2),
  trip: z.string().min(2),
  quote: z.string().min(10),
  status: z.enum(["draft", "published", "archived"]).default("published"),
});

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid testimonial payload." }, { status: 400 });
  }

  const testimonial = parsed.data;
  const { error } = await admin.supabase.from("testimonials").upsert(
    {
      id: testimonial.id,
      name: testimonial.name,
      home_country: testimonial.homeCountry,
      trip: testimonial.trip,
      quote: testimonial.quote,
      status: testimonial.status,
    },
    { onConflict: "id" },
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

  const { error } = await admin.supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
