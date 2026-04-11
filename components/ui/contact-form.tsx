"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Tour } from "@/types/content";

type ContactFormProps = {
  preferredTour?: string;
  tours: Tour[];
};

export function ContactForm({ preferredTour, tours }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const defaultTour = useMemo(() => {
    if (!preferredTour) {
      return "";
    }

    return tours.find((tour) => tour.slug === preferredTour)?.title ?? "";
  }, [preferredTour, tours]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          preferredTour: formData.get("preferredTour"),
          message: formData.get("message"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to submit form");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-charcoal-700">Name</span>
          <input
            required
            name="name"
            className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none transition-colors focus:border-brand-900"
            placeholder="Your full name"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-charcoal-700">Email</span>
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none transition-colors focus:border-brand-900"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-semibold text-charcoal-700">Preferred Tour</span>
        <select
          name="preferredTour"
          defaultValue={defaultTour}
          className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none transition-colors focus:border-brand-900"
        >
          <option value="">Select a journey</option>
          {tours.map((tour) => (
            <option key={tour.slug} value={tour.title}>
              {tour.title}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-semibold text-charcoal-700">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none transition-colors focus:border-brand-900"
          placeholder="Tell us your dream dates, travel style, and whether you want more wildlife, culture, or a balanced route."
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary">
          {status === "submitting" ? "Sending..." : "Send Enquiry"}
        </button>
        {status === "success" ? (
          <p className="text-sm font-semibold text-brand-900">
            Your message is on its way. We will reply shortly.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm font-semibold text-red-700">
            Something went wrong. Please try again or reach out on WhatsApp.
          </p>
        ) : null}
      </div>
    </form>
  );
}
