# Engatuny Tours & Travel

A modern, mobile-first Uganda travel website for Engatuny Tours & Travel, built with Next.js App Router and a Supabase-backed CMS foundation.

## Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Supabase-ready data layer and SQL migrations
- Zod validation for the contact endpoint

## What is included

- Sticky responsive navigation with mobile menu and logo branding
- Home, About Us, Tours, Blog, and Contact pages
- Filterable tours browser plus dedicated landing pages for every tour
- Contact enquiry form with optional Supabase persistence
- SEO metadata and sitemap
- Supabase schema for settings, pages, modules, tours, blog posts, testimonials, and contact submissions
- Supabase-authenticated admin area at `/admin`
- Branding controls for colors, logo path, brand story, and founder commitment
- Richer tour CMS fields for route details, inclusions, accommodation options, and landing-page content
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

Run the migrations in order:

- [202604110001_engatuny_cms.sql](/E:/Engatuny/supabase/migrations/202604110001_engatuny_cms.sql)
- [202604110002_admin_auth.sql](/E:/Engatuny/supabase/migrations/202604110002_admin_auth.sql)
- [202604110003_public_contact_insert.sql](/E:/Engatuny/supabase/migrations/202604110003_public_contact_insert.sql)
- [202604110004_fix_seed_copy.sql](/E:/Engatuny/supabase/migrations/202604110004_fix_seed_copy.sql)
- [202604110005_branding_and_tour_pages.sql](/E:/Engatuny/supabase/migrations/202604110005_branding_and_tour_pages.sql)

This migration creates:

- `settings`
- `pages`
- `modules`
- `page_modules`
- `profiles`
- `tours`
- `testimonials`
- `blog_posts`
- `contact_submissions`

It also adds:

- `updated_at` triggers
- public read RLS policies for published content
- admin write policies backed by `profiles.is_admin`
- automatic profile creation for new Supabase Auth users
- starter content for site settings, tours, testimonials, and blog posts

## Activate the CMS

1. Create a user in Supabase Auth using email/password.
   Recommended default admin account:
   Email: `admin@engatuny.com`
   Password: `root`
2. Promote that user to admin in SQL:

```sql
update public.profiles
set is_admin = true
where email = 'admin@engatuny.com';
```

3. Visit `/admin/login` and sign in with either:
   Username: `Admin`
   Password: `root`

The login form maps the username `Admin` to the Supabase email `admin@engatuny.com`.

The `/admin` area lets you manage:

- site settings
- brand colors and logo path
- founder and brand story copy
- tours and their landing pages
- blog posts
- testimonials
- contact enquiry statuses

## Deploy to Netlify

1. Push the project to GitHub.
2. Create a new Netlify site from the repository.
3. Set these build settings:

```txt
Build command: npm run build
Publish directory: .next
```

4. Add the same environment variables from `.env.local` in Netlify.
   For the CMS backend, image uploads require `SUPABASE_SERVICE_ROLE_KEY` in addition to the two public keys.
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

- The public website now reads from Supabase when environment variables are present and falls back to local seed data only when Supabase is not configured.
- The contact API route validates input and stores submissions in Supabase using the anon key or service role key when available.
- The current CMS layer is still intentionally lightweight, but the tour model now supports dedicated landing-page content and brand-managed settings.
