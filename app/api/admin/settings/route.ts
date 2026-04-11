import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRoute } from "@/lib/admin-api";

const settingsSchema = z.object({
  site_name: z.string().min(2),
  tagline: z.string().min(2),
  site_description: z.string().min(10),
  contact_email: z.string().email(),
  contact_phone: z.string().min(6),
  contact_whatsapp: z.string().min(6),
  office_address: z.string().min(6),
  primary_color: z.string().min(4),
  secondary_color: z.string().min(4),
  accent_color: z.string().min(4),
  surface_color: z.string().min(4),
  logo_path: z.string().min(2),
  brand_meaning: z.string().min(10),
  brand_story: z.string().min(10),
  founder_karamoja_commitment: z.string().min(10),
});

const groupMap: Record<string, string> = {
  site_name: "general",
  tagline: "general",
  site_description: "general",
  contact_email: "contact",
  contact_phone: "contact",
  contact_whatsapp: "contact",
  office_address: "contact",
  primary_color: "branding",
  secondary_color: "branding",
  accent_color: "branding",
  surface_color: "branding",
  logo_path: "branding",
  brand_meaning: "general",
  brand_story: "general",
  founder_karamoja_commitment: "general",
};

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }

  const rows = Object.entries(parsed.data).map(([key, value]) => ({
    key,
    value,
    group_name: groupMap[key] ?? "general",
    is_public: true,
  }));

  const { error } = await admin.supabase.from("settings").upsert(rows, {
    onConflict: "key",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
