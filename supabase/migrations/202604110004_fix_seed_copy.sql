update public.tours
set
  tagline = 'White water, bungee, and the source of the Nile',
  itinerary = '["Day 1: Arrive in Kampala and transfer to Jinja. Settle in and enjoy a relaxing sunset cruise on the mighty Nile.","Day 2: Full day of adventure — white-water rafting on the Nile plus optional bungee jumping or quad biking.","Day 3: Visit the Source of the Nile, tour a local coffee plantation, then return to Kampala in the afternoon."]'::jsonb
where slug = '3-day-jinja-nile-adventure';

update public.tours
set tagline = 'Uganda''s most dramatic and untouched wilderness'
where slug = '7-day-kidepo-valley-remote-safari';

update public.tours
set
  itinerary = '["Day 1: Transfer or fly to Buhoma area near Bwindi Impenetrable Forest.","Day 2: Full-day gorilla trekking experience (permits included) — the highlight of any Uganda trip.","Day 3: Relaxed morning with optional community walk or Batwa cultural experience.","Day 4: Return journey to Kampala or Entebbe with great memories."]'::jsonb
where slug = '4-day-bwindi-gorilla-trekking-classic';

update public.blog_posts
set title = 'Why Kidepo Valley is Uganda''s Best-Kept Secret in 2026'
where slug = 'why-kidepo-valley-is-ugandas-best-kept-secret-in-2026';
