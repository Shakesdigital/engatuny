create extension if not exists pgcrypto;

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  key text not null unique,
  value text not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  status text not null default 'active' check (status in ('active', 'inactive')),
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_modules (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  region text not null default 'default',
  order_column integer not null default 0
);

create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text,
  price text not null,
  duration text not null,
  duration_days integer not null,
  region text not null,
  type text not null,
  difficulty text not null,
  max_travellers integer not null default 8,
  featured_image_url text,
  itinerary jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  meta_title text,
  meta_description text,
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  home_country text not null,
  trip text not null,
  quote text not null,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  featured_image_url text,
  reading_time text,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  meta_title text,
  meta_description text,
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  preferred_tour text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger settings_updated_at
before update on public.settings
for each row execute function public.update_updated_at_column();

create trigger pages_updated_at
before update on public.pages
for each row execute function public.update_updated_at_column();

create trigger modules_updated_at
before update on public.modules
for each row execute function public.update_updated_at_column();

create trigger tours_updated_at
before update on public.tours
for each row execute function public.update_updated_at_column();

create trigger testimonials_updated_at
before update on public.testimonials
for each row execute function public.update_updated_at_column();

create trigger blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.update_updated_at_column();

create trigger contact_submissions_updated_at
before update on public.contact_submissions
for each row execute function public.update_updated_at_column();

alter table public.settings enable row level security;
alter table public.pages enable row level security;
alter table public.modules enable row level security;
alter table public.page_modules enable row level security;
alter table public.tours enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contact_submissions enable row level security;

create policy "public can read public settings"
on public.settings
for select
using (is_public = true);

create policy "public can read published pages"
on public.pages
for select
using (status = 'published');

create policy "public can read active modules"
on public.modules
for select
using (status = 'active');

create policy "public can read page modules"
on public.page_modules
for select
using (true);

create policy "public can read published tours"
on public.tours
for select
using (status = 'published');

create policy "public can read published testimonials"
on public.testimonials
for select
using (status = 'published');

create policy "public can read published blog posts"
on public.blog_posts
for select
using (status = 'published');

insert into public.settings (group_name, key, value, is_public)
values
  ('general', 'site_name', 'Engatuny Tours & Travel', true),
  ('general', 'tagline', 'Feel the heartbeat of the Pearl of Africa.', true),
  ('general', 'site_description', 'Warm, authentic Uganda adventures led by local guides who know these landscapes by heart.', true),
  ('contact', 'contact_email', 'hello@engatuny.com', true),
  ('contact', 'contact_phone', '+256772123456', true),
  ('contact', 'contact_whatsapp', '+256772123456', true),
  ('contact', 'office_address', 'Plot 14, Kololo Hill Drive, Kampala, Uganda', true)
on conflict (key) do nothing;

insert into public.tours (
  slug, title, tagline, price, duration, duration_days, region, type, difficulty,
  max_travellers, featured_image_url, itinerary, highlights
)
values
  (
    '3-day-jinja-nile-adventure',
    '3-Day Jinja Nile Adventure',
    'White water, bungee, and the source of the Nile',
    'From $420 per person',
    '3 Days',
    3,
    'Eastern Uganda',
    'Adventure',
    'Active',
    8,
    'https://images.pexels.com/photos/19820463/pexels-photo-19820463.jpeg',
    '["Day 1: Arrive in Kampala and transfer to Jinja. Settle in and enjoy a relaxing sunset cruise on the mighty Nile.","Day 2: Full day of adventure — white-water rafting on the Nile plus optional bungee jumping or quad biking.","Day 3: Visit the Source of the Nile, tour a local coffee plantation, then return to Kampala in the afternoon."]'::jsonb,
    '["Sunset Nile cruise","Rafting","Source of the Nile","Coffee experience"]'::jsonb
  ),
  (
    '4-day-murchison-falls-wildlife-escape',
    '4-Day Murchison Falls Wildlife Escape',
    'Where the Nile explodes through the earth',
    'From $890 per person',
    '4 Days',
    4,
    'Northwestern Uganda',
    'Safari',
    'Moderate',
    8,
    'https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg',
    '["Day 1: Drive from Kampala to Murchison Falls National Park with scenic stops.","Day 2: Morning game drive and afternoon boat safari to the base of the powerful Murchison Falls.","Day 3: Chimpanzee trek in Budongo Forest followed by an optional sunrise hot-air balloon ride.","Day 4: Final morning game drive, then return to Kampala."]'::jsonb,
    '["Murchison Falls","Game drives","Boat safari","Budongo chimpanzees"]'::jsonb
  ),
  (
    '3-day-sipi-falls-coffee-hiking-retreat',
    '3-Day Sipi Falls Coffee & Hiking Retreat',
    'Waterfalls, mountains & the best coffee in Uganda',
    'From $380 per person',
    '3 Days',
    3,
    'Eastern Highlands',
    'Hiking',
    'Moderate',
    8,
    'https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg',
    '["Day 1: Transfer from Kampala to Sipi. Hike to the three beautiful waterfalls in the afternoon.","Day 2: Full-day coffee plantation experience with community lunch and learning how Ugandan coffee is grown.","Day 3: Sunrise hike with stunning views, optional abseiling, then return to Kampala."]'::jsonb,
    '["Three waterfalls","Coffee farm","Community lunch","Sunrise hike"]'::jsonb
  ),
  (
    '7-day-kidepo-valley-remote-safari',
    '7-Day Kidepo Valley Remote Safari',
    'Uganda’s most dramatic and untouched wilderness',
    'From $2,150 per person',
    '7 Days',
    7,
    'Karamoja',
    'Safari',
    'Active',
    8,
    'https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg',
    '["Day 1-2: Fly to Kidepo Valley and enjoy game drives in this remote paradise.","Day 3: Hike Mount Morungole with local Karamojong warriors for cultural immersion.","Day 4-5: Full-day game drives spotting unique wildlife and cultural village visits.","Day 6-7: Return via Ziwa Rhino Sanctuary with a final game drive before heading back to Kampala."]'::jsonb,
    '["Remote wildlife","Karamojong cultural immersion","Mount Morungole","Ziwa Rhino Sanctuary"]'::jsonb
  ),
  (
    '4-day-bwindi-gorilla-trekking-classic',
    '4-Day Bwindi Gorilla Trekking Classic',
    'Come eye-to-eye with the gentle giants',
    'From $1,450 per person',
    '4 Days',
    4,
    'Southwestern Uganda',
    'Wildlife',
    'Active',
    8,
    'https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg',
    '["Day 1: Transfer or fly to Buhoma area near Bwindi Impenetrable Forest.","Day 2: Full-day gorilla trekking experience (permits included) — the highlight of any Uganda trip.","Day 3: Relaxed morning with optional community walk or Batwa cultural experience.","Day 4: Return journey to Kampala or Entebbe with great memories."]'::jsonb,
    '["Permits included","Gorilla encounter","Batwa experience","Scenic return journey"]'::jsonb
  )
on conflict (slug) do nothing;

insert into public.testimonials (name, home_country, trip, quote)
values
  ('Anna & Michael', 'Germany', 'Bwindi Gorilla Trekking Classic', 'We felt cared for from the first airport pickup to the last coffee stop. The gorilla trek was extraordinary, but the warmth of the team is what we still talk about.'),
  ('Caroline O.', 'United Kingdom', 'Murchison Falls Wildlife Escape', 'Everything felt calm, polished, and personal. Our guide knew the wildlife, the stories, and the small details that made Uganda feel deeply alive.'),
  ('David M.', 'Canada', 'Jinja Nile Adventure', 'Adventure without chaos. We had thrilling days on the river, excellent logistics, and just the right balance of excitement and comfort.'),
  ('Lina & Priya', 'India', 'Sipi Falls Coffee & Hiking Retreat', 'Sipi was breathtaking, but the community coffee experience gave the whole trip heart. It felt warm, local, and beautifully paced.'),
  ('Ethan P.', 'Australia', 'Kidepo Valley Remote Safari', 'Kidepo felt wild in the best possible way. Engatuny made a very remote trip feel easy, safe, and unforgettable.')
on conflict do nothing;

insert into public.blog_posts (slug, title, excerpt, content, featured_image_url, reading_time)
values
  (
    'how-to-prepare-for-your-first-gorilla-trek',
    'How to Prepare for Your First Gorilla Trek (What No One Tells You)',
    'The small, practical details that make your gorilla trekking day calmer, lighter, and far more enjoyable.',
    '["Your boots matter more than your camera. Bwindi trails can shift from dry leaf litter to slick red earth in one morning, so ankle support and grip are worth every gram in your bag.","Layers help. The forest often begins cool, turns humid quickly, then cools again when rain passes through. A breathable long-sleeve layer and a light waterproof jacket usually strike the right balance.","The emotional pace can surprise first-time trekkers. You might walk for an hour or most of the day, then suddenly find yourself in complete stillness beside a gorilla family. Leave space for that moment. It lands deeply."]'::jsonb,
    'https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg',
    '6 min read'
  ),
  (
    'the-7-hidden-waterfalls-you-must-chase-in-uganda',
    'The 7 Hidden Waterfalls You Must Chase in Uganda',
    'Beyond the famous cascades, Uganda hides cool pockets of mist, forest trails, and waterfall views worth the detour.',
    '["Sipi is the name travellers know, but Uganda''s waterfall story is wider and quieter than most people expect. Some drops are dramatic and open; others hide behind coffee farms, bamboo, and village paths.","The magic is not only the water itself. It is the walk in, the sudden temperature drop, the sound carried on the wind, and the way local guides read the land as if it is a familiar conversation.","If your journey allows room for slower discovery, these waterfall days often become the trips travellers describe as unexpectedly unforgettable."]'::jsonb,
    'https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg',
    '5 min read'
  ),
  (
    'why-kidepo-valley-is-ugandas-best-kept-secret-in-2026',
    'Why Kidepo Valley is Uganda’s Best-Kept Secret in 2026',
    'For travellers who want space, drama, and a stronger feeling of wilderness, Kidepo still feels rare.',
    '["Kidepo feels far away in the best sense. The approach itself changes your mindset, and once you arrive, the wide valleys and low visitor numbers create a remarkable sense of stillness.","This is where route logic matters. Kidepo rewards travellers who either fly in or accept that the remoteness is part of the journey. It is not a rushed add-on. It is a destination that deserves its own mood.","If you want big landscapes, a feeling of raw Uganda, and more space around each wildlife sighting, Kidepo remains one of East Africa''s most special safari regions."]'::jsonb,
    'https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg',
    '7 min read'
  ),
  (
    'discovering-authentic-uganda-stories-from-the-trail',
    'Discovering Authentic Uganda: Stories from the Trail',
    'The moments that stay with travellers often happen between the headline activities.',
    '["A roadside pineapple stop. A guide translating a joke between languages. Coffee drying in the afternoon sun. A conversation at camp that lasts longer than planned because nobody wants to leave the fire.","These smaller moments build the emotional shape of travel in Uganda. They are not filler. They are often the heartbeat of the journey itself.","That is why we design routes with breathing room. Authentic travel needs space for surprise, kindness, and the little stories travellers carry home for years."]'::jsonb,
    'https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg',
    '4 min read'
  )
on conflict (slug) do nothing;
