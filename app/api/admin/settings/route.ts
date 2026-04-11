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
});

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }

  const payload = parsed.data;
  const rows = Object.entries(payload).map(([key, value]) => ({
    key,
    value,
    group_name: key.startsWith("contact_") || key === "office_address" ? "contact" : "general",
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
