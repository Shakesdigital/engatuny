# Engatuny Tours & Travel

A modern, mobile-first Uganda travel website for Engatuny Tours & Travel, built with Next.js App Router and a lean Supabase-ready CMS foundation.

## Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Supabase-ready data layer and SQL migrations
- Zod validation for the contact endpoint

## What is included

- Sticky responsive navigation with mobile menu
- Home, About Us, Tours, Blog, and Contact pages
- Filterable tours browser with the exact itineraries provided
- Contact enquiry form with optional Supabase persistence
- SEO metadata and sitemap
- Supabase schema for settings, pages, modules, tours, blog posts, testimonials, and contact submissions
- Seed content for Engatuny tours, testimonials, and blog articles

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Environment variables

Create a `.env.local` file if you want live Supabase reads or contact form persistence:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The website will still run without these values because it falls back to local seed data.

## Supabase setup

Run the migration in [supabase/migrations/202604110001_engatuny_cms.sql](/E:/Engatuny/supabase/migrations/202604110001_engatuny_cms.sql).

This migration creates:

- `settings`
- `pages`
- `modules`
- `page_modules`
- `tours`
- `testimonials`
- `blog_posts`
- `contact_submissions`

It also adds:

- `updated_at` triggers
- public read RLS policies for published content
- starter content for site settings, tours, testimonials, and blog posts

## Deploy to Netlify

1. Push the project to GitHub.
2. Create a new Netlify site from the repository.
3. Set these build settings:

```txt
Build command: npm run build
Publish directory: .next
```

4. Add the same environment variables from `.env.local` in Netlify.
5. If you use the Netlify Next.js runtime, Netlify will detect the Next.js app automatically.

## Stock photo sources

The site uses free Pexels-hosted images. Review the current license before production reuse:

- Pexels license: https://www.pexels.com/license/
- Gorilla forest habitat: https://www.pexels.com/photo/gorilla-in-lush-forest-habitat-36804628/
- Uganda-style village portrait: https://www.pexels.com/photo/african-woman-in-a-village-18856023/
- Safari landscape: https://www.pexels.com/photo/safari-adventure-in-african-landscape-34845589/
- Safari jeep in savannah: https://www.pexels.com/photo/safari-jeep-in-savannah-15017212/
- Tropical waterfall: https://www.pexels.com/photo/view-of-a-waterfall-in-a-tropical-forest-17443313/
- Nile sailboat: https://www.pexels.com/photo/a-sailboat-on-the-nile-river-19820463/

## Notes

- The contact API route validates input and inserts into Supabase only when the required environment variables are available.
- The current CMS layer is intentionally lean and public-site focused. It is structured so a role-aware admin dashboard can be added on top without reshaping the schema.
