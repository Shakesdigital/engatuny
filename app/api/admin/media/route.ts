import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { requireAdminRoute } from "@/lib/admin-api";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const bucket = "media";

function getFileExtension(fileName: string) {
  const segments = fileName.split(".");
  return segments.length > 1 ? segments.pop() : "jpg";
}

export async function POST(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const field = String(formData.get("field") ?? "");

  if (!(file instanceof File) || !folder || !slug || !field) {
    return NextResponse.json({ error: "Missing upload payload." }, { status: 400 });
  }

  const extension = getFileExtension(file.name);
  const path = `${folder}/${slug}/${field}-${Date.now()}-${randomUUID()}.${extension}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const supabaseAdmin = createSupabaseAdminClient();

  const { error } = await supabaseAdmin.storage.from(bucket).upload(path, fileBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);

  return NextResponse.json({
    ok: true,
    path,
    url: data.publicUrl,
  });
}

export async function DELETE(request: Request) {
  const admin = await requireAdminRoute();
  if ("error" in admin) return admin.error;

  const { path } = await request.json();

  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "Missing media path." }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
