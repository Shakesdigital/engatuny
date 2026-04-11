import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRoute } from "@/lib/admin-api";

const statusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "closed"]),
});

export async function PATCH(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const body = await request.json();
  const parsed = statusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status payload." }, { status: 400 });
  }

  const { error } = await admin.supabase
    .from("contact_submissions")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
