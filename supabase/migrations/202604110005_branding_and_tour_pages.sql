alter table public.tours
add column if not exists hero_description text,
add column if not exists overview text,
add column if not exists image_alt text,
add column if not exists enquiry_subject text,
add column if not exists route_details text,
add column if not exists ideal_for jsonb not null default '[]'::jsonb,
add column if not exists inclusions jsonb not null default '[]'::jsonb,
add column if not exists accommodations jsonb not null default '[]'::jsonb,
add column if not exists landscape_story text,
add column if not exists culture_story text,
add column if not exists wildlife_story text;

insert into public.settings (group_name, key, value, is_public)
values
  ('branding', 'primary_color', '#5B3A1E', true),
  ('branding', 'secondary_color', '#C96A16', true),
  ('branding', 'accent_color', '#F2B51D', true),
  ('branding', 'surface_color', '#F6EFE6', true),
  ('branding', 'logo_path', '/engatuny-logo.png', true),
  ('general', 'brand_meaning', 'Engatuny means lion - a symbol of courage, guardianship, and calm authority. That spirit shapes how we guide every journey.', true),
  ('general', 'brand_story', 'We design travel with the calm confidence of a lion: attentive on the ground, strong in logistics, and deeply respectful of the landscapes and communities that welcome our guests.', true),
  ('general', 'founder_karamoja_commitment', 'Our founder holds Karamoja close to heart and uses Engatuny journeys to share its dignity, beauty, resilience, and living culture with travellers who want to engage with care.', true)
on conflict (key) do update
set value = excluded.value,
    group_name = excluded.group_name,
    is_public = excluded.is_public;

update public.settings
set value = 'Follow the lion''s path across Uganda.'
where key = 'tagline';

update public.settings
set value = 'Purposeful Uganda journeys shaped by local guides, warm hosting, and the proud spirit of the lion.'
where key = 'site_description';

update public.tours
set
  hero_description = 'A lively short escape built around the Nile, Jinja''s easygoing atmosphere, and hands-on adventure that still leaves room for comfort.',
  overview = 'This journey is ideal for travellers who want a fast but memorable Uganda introduction. It pairs the source of the Nile, white-water energy, and local coffee stories with a relaxed overnight rhythm.',
  image_alt = 'Traditional sailboat gliding across a broad river at soft golden light.',
  enquiry_subject = '3-Day Jinja Nile Adventure',
  route_details = 'Kampala -> Jinja -> Source of the Nile -> Kampala',
  ideal_for = '["Friends","Adventure seekers","Short Uganda add-ons"]'::jsonb,
  inclusions = '["Ground transport","Guide support","Selected activities","Accommodation with breakfast"]'::jsonb,
  accommodations = '["Boutique riverside lodge","Comfortable adventure camp","Mid-range guesthouse in Jinja"]'::jsonb,
  landscape_story = 'Jinja offers a softer, brighter side of Uganda: broad water, green banks, and warm evening light moving slowly across the Nile.',
  culture_story = 'Beyond the adrenaline, Jinja reveals local craft, coffee, and riverside communities that keep the route grounded.',
  wildlife_story = 'This is not a wildlife-first itinerary, but birdlife along the river and the living ecology of the Nile give the experience its natural pulse.'
where slug = '3-day-jinja-nile-adventure';

update public.tours
set
  hero_description = 'A classic Uganda safari combining wildlife, the Nile, and one of the country''s most powerful landscapes in a practical four-day route.',
  overview = 'Murchison works beautifully for travellers who want strong wildlife value without committing to a very long itinerary. The route blends game drives, a boat safari, and the raw force of the falls.',
  image_alt = 'Open safari vehicle at golden hour overlooking a vast African landscape.',
  enquiry_subject = '4-Day Murchison Falls Wildlife Escape',
  route_details = 'Kampala -> Murchison Falls National Park -> Budongo area -> Kampala',
  ideal_for = '["First-time safari travellers","Couples","Small private groups"]'::jsonb,
  inclusions = '["4x4 transport","Park entry","Guide-driver","Accommodation and meals as per route"]'::jsonb,
  accommodations = '["River-facing safari lodge","Mid-range bush camp","Comfortable park lodge"]'::jsonb,
  landscape_story = 'Murchison combines rolling savannah, riverbanks, palm-dotted plains, and the concentrated force of the Nile at the falls.',
  culture_story = 'The road north reveals trading centres, local farming belts, and the transition from central to northwestern Uganda.',
  wildlife_story = 'This is one of Uganda''s most rewarding all-round wildlife areas, especially for elephant, giraffe, buffalo, hippo, crocodile, and broad savannah sightings.'
where slug = '4-day-murchison-falls-wildlife-escape';

update public.tours
set
  hero_description = 'A highland journey for travellers who want scenic hiking, slower pacing, and one of Uganda''s most rewarding coffee landscapes.',
  overview = 'Sipi offers a gentler kind of immersion. This route balances waterfall walks, local coffee heritage, and long escarpment views over the eastern plains.',
  image_alt = 'Tall waterfall framed by lush tropical greenery.',
  enquiry_subject = '3-Day Sipi Falls Coffee and Hiking Retreat',
  route_details = 'Kampala -> Sipi Falls -> Mt Elgon foothills -> Kampala',
  ideal_for = '["Honeymoon add-ons","Slow travellers","Nature lovers"]'::jsonb,
  inclusions = '["Transport","Guide support","Coffee experience","Accommodation with meals as planned"]'::jsonb,
  accommodations = '["View-rich eco lodge","Comfortable hillside cottage","Mid-range retreat with valley views"]'::jsonb,
  landscape_story = 'Sipi is all vertical drama: cliffs, mist, cultivated slopes, and a horizon that opens wide across eastern Uganda.',
  culture_story = 'Coffee here is not just a tasting. It is family work, local pride, and a powerful way to understand the mountain communities.',
  wildlife_story = 'This route is more about landscape and birdlife than classic safari sightings, making it ideal for a quieter kind of nature immersion.'
where slug = '3-day-sipi-falls-coffee-hiking-retreat';

update public.tours
set
  slug = '7-day-kidepo-lion-heart-safari',
  title = '7-Day Kidepo Lion Heart Safari',
  tagline = 'A Karamoja journey of sweeping landscapes, proud culture, and wild space.',
  price = 'From $2,450 per person',
  hero_description = 'Our signature Karamoja itinerary designed to honour Kidepo''s dramatic beauty, the richness of Karamojong culture, and the feeling of true remoteness.',
  overview = 'This is Engatuny''s most brand-aligned safari: lion-hearted in spirit and deeply rooted in Karamoja. It gives proper time to Kidepo National Park, community connection, and the scale of the northeastern frontier.',
  image_alt = 'Safari vehicle parked beneath acacia trees in a dry wilderness landscape.',
  enquiry_subject = '7-Day Kidepo Lion Heart Safari',
  route_details = 'Entebbe or Kampala -> Gulu or direct overland route -> Kidepo Valley National Park -> Karamoja cultural visits -> return',
  itinerary = '["Day 1: Depart Kampala or Entebbe and begin the journey north with an overnight break that makes the route comfortable.","Day 2: Travel into Karamoja, arrive in Kidepo, and settle in with sunset views across the Narus Valley.","Day 3: Early game drive for lions, buffalo, elephant, ostrich, and broad savannah photography, followed by a quiet lodge afternoon.","Day 4: Explore another sector of the park for changing scenery, stronger mountain views, and slower wildlife tracking.","Day 5: Spend meaningful time with a Karamojong community, learning about homestead life, ornament, storytelling, food traditions, and the dignity of local identity.","Day 6: Combine a final bush experience with space for rest, sundowners, and reflection on the journey through Karamoja.","Day 7: Begin the return route or connect onward depending on the transport plan chosen."]'::jsonb,
  highlights = '["Kidepo landscapes","Karamojong cultural immersion","Lion country","Remote safari atmosphere"]'::jsonb,
  ideal_for = '["Second-time Uganda visitors","Photographers","Travellers drawn to culture and remote landscapes"]'::jsonb,
  inclusions = '["4x4 transport or tailored routing","Guide-driver","Park fees","Cultural visit coordination","Accommodation and meals as scheduled"]'::jsonb,
  accommodations = '["Apoka-style luxury safari lodge","Comfortable mid-range bush lodge","Practical frontier camp with strong access"]'::jsonb,
  landscape_story = 'Kidepo is one of the most visually powerful parks in East Africa: long valleys, mountain walls, open grassland, dry riverbeds, and a sense of space that changes the pace of the traveller.',
  culture_story = 'Karamoja is central to this journey, not decorative. The route is designed to introduce the strength, heritage, and hospitality of Karamojong life with respect and context.',
  wildlife_story = 'Kidepo rewards patience with classic predator country, large herds, dry-country species, and some of Uganda''s most cinematic game-drive moments.'
where slug = '7-day-kidepo-valley-remote-safari';

update public.tours
set
  hero_description = 'A carefully paced gorilla trekking itinerary built for travellers who want the emotional highlight of Bwindi without unnecessary complexity.',
  overview = 'This route focuses on the mountain gorilla experience while still leaving room for scenery, community connection, and recovery after the trek.',
  image_alt = 'Mountain gorilla resting in lush forest habitat.',
  enquiry_subject = '4-Day Bwindi Gorilla Trekking Classic',
  route_details = 'Entebbe or Kampala -> Bwindi Impenetrable Forest -> optional community experience -> return',
  ideal_for = '["Bucket-list travellers","Wildlife lovers","Private couples or families"]'::jsonb,
  inclusions = '["Accommodation","Transport","Guide support","Trek logistics"]'::jsonb,
  accommodations = '["Forest-edge lodge","Comfortable mid-range camp","Premium gorilla safari lodge"]'::jsonb,
  landscape_story = 'Bwindi feels dense, alive, and close. The atmosphere is shaped by steep green hills, layered forest, and mist that turns ordinary moments cinematic.',
  culture_story = 'Southwestern Uganda offers warm hospitality and meaningful optional experiences with surrounding communities when travellers want to connect beyond the trek itself.',
  wildlife_story = 'The gorilla encounter is the core draw, but the forest carries birdlife, primates, and a deep sense of ecological richness from start to finish.'
where slug = '4-day-bwindi-gorilla-trekking-classic';
