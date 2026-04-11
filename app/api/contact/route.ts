import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  preferredTour: z.string().optional(),
  message: z.string().min(20),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      preferred_tour: parsed.data.preferredTour ?? null,
      message: parsed.data.message,
      status: "new",
    });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Enquiry received.",
  });
}
