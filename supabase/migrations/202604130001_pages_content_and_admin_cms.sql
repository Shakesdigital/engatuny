alter table public.pages
add column if not exists content jsonb not null default '{}'::jsonb;

insert into public.pages (
  slug,
  title,
  excerpt,
  status,
  meta_title,
  meta_description,
  content
)
values
  (
    'home',
    'Home',
    'Homepage story, brand promise, trust signals, and featured journeys.',
    'published',
    'Engatuny Tours & Travel',
    'Purposeful Uganda journeys shaped by local guides, lion-hearted hosting, and deep cultural respect.',
    '{
      "heroEyebrow": "Karamoja spirit. Uganda soul. Local guidance.",
      "heroTitle": "Travel Uganda with the calm strength of the lion.",
      "heroDescription": "Engatuny means lion, and that spirit guides how we host every journey across Uganda with courage, care, and grounded local knowledge.",
      "heroSubtitle": "Lion-hearted Uganda journeys",
      "primaryCtaLabel": "Explore Our Tours",
      "primaryCtaHref": "/tours",
      "secondaryCtaLabel": "Plan Your Journey",
      "secondaryCtaHref": "/contact",
      "trustMetrics": [
        "Lion-hearted hosting from arrival to farewell",
        "Small-group journeys shaped by local knowledge",
        "Wildlife, culture, and comfort held in balance"
      ],
      "whyChooseEyebrow": "Why Choose Engatuny?",
      "whyChooseTitle": "A brand built around the lion, and a way of guiding that feels grounded.",
      "whyChooseDescription": "We design travel with the calm confidence of a lion: attentive on the ground, strong in logistics, and deeply respectful of the landscapes and communities that welcome our guests.",
      "whyChooseCards": [
        {
          "icon": "L",
          "title": "Lion-led confidence on the ground",
          "description": "Engatuny stands for the lion, and that spirit shows up in the way we guide: calm under pressure, deeply attentive, and ready to protect the quality of your journey."
        },
        {
          "icon": "K",
          "title": "Karamoja held with respect",
          "description": "We do not treat culture as a side show. Especially in Karamoja, we design travel that gives proper space to story, heritage, community voices, and local pride."
        },
        {
          "icon": "U",
          "title": "Uganda felt, not just seen",
          "description": "From riverbanks and forests to highland coffee farms and remote savannahs, our routes are built to help travellers feel the rhythm of Uganda rather than rush through it."
        }
      ],
      "founderEyebrow": "Founder Focus",
      "founderTitle": "Karamoja is not a footnote in this company story.",
      "founderBody": "Our founder holds Karamoja close to heart and uses Engatuny journeys to share its dignity, beauty, resilience, and living culture with travellers who want to engage with care.",
      "toursEyebrow": "Featured Tours",
      "toursTitle": "Independent journeys with their own landing pages and story.",
      "toursDescription": "Each route now has its own destination page, so travellers can explore details, mood, and practical fit before making contact.",
      "guestStoriesEyebrow": "Guest Stories",
      "guestStoriesTitle": "Travellers remember the feeling as much as the places.",
      "guestStoriesDescription": "A few voices from the trail, campfire, riverbank, and savannah edge.",
      "galleryEyebrow": "Moments from the Pearl",
      "galleryTitle": "Golden plains, forest stillness, and the warmth between destinations.",
      "ctaTitle": "Ready to follow the lion''s path across Uganda?",
      "ctaDescription": "Tell us whether you want more wildlife, more culture, more adventure, or a thoughtful balance of all three. We will shape the route around you.",
      "ctaPrimaryLabel": "Plan Your Journey",
      "ctaPrimaryHref": "/contact",
      "ctaSecondaryLabel": "Browse Tours",
      "ctaSecondaryHref": "/tours"
    }'::jsonb
  ),
  (
    'about',
    'About',
    'Company story, founder commitment, values, services, and traveller reasons.',
    'published',
    'About Engatuny',
    'Meet Engatuny Tours & Travel, a Uganda-focused operator shaped by the spirit of the lion.',
    '{
      "heroEyebrow": "About Engatuny",
      "heroTitle": "A Uganda travel company shaped by the spirit of the lion.",
      "introParagraphs": [
        "Engatuny Tours & Travel creates Uganda journeys that feel confident, warm, and deeply rooted. The name Engatuny means lion, and that meaning matters to us. It speaks to courage, watchfulness, and a calm kind of leadership that protects the quality of the guest experience.",
        "We guide wildlife safaris, gorilla trekking routes, waterfall escapes, cultural journeys, and tailor-made travel across Uganda. Every itinerary is built with route logic, local knowledge, and the intention to help travellers feel the country rather than simply move through it.",
        "That is why our journeys feel both personal and well-held: the romance of travel is there, but it is supported by steady planning, honest pacing, and respect for the people and places that make Uganda unforgettable."
      ],
      "founderEyebrow": "Founder Commitment",
      "founderTitle": "Karamoja is carried with pride in the way Engatuny travels.",
      "founderParagraphs": [
        "Our founder holds Karamoja close to heart and uses Engatuny journeys to share its dignity, beauty, resilience, and living culture with travellers who want to engage with care.",
        "That commitment does not replace the wider Uganda story. It strengthens it. It ensures that when travellers head north, they encounter Karamoja as a living cultural landscape with beauty, dignity, and voices of its own."
      ],
      "valuesEyebrow": "Our Values",
      "valuesTitle": "A company culture shaped by courage, respect, and warm stewardship.",
      "values": ["Courage", "Respect", "Warmth", "Stewardship", "Authenticity"],
      "servicesEyebrow": "Our Services",
      "servicesTitle": "What we craft for travellers seeking the real Uganda.",
      "services": [
        {
          "icon": "L",
          "title": "Wildlife Safaris",
          "description": "Game drives, boat safaris, and high-impact park itineraries built around pacing, comfort, and strong guiding."
        },
        {
          "icon": "G",
          "title": "Gorilla Trekking",
          "description": "Permits, route logic, and thoughtful support for one of Uganda''s most powerful wildlife experiences."
        },
        {
          "icon": "A",
          "title": "Adventure and Hiking",
          "description": "Waterfalls, rafting, escarpment walks, and active days that still feel well-held from start to finish."
        },
        {
          "icon": "C",
          "title": "Cultural Journeys",
          "description": "Travel that treats community time with respect, context, and a genuine willingness to listen and learn."
        },
        {
          "icon": "T",
          "title": "Tailor-Made Routes",
          "description": "Private journeys shaped around your timing, energy, accommodation style, and the places you most want to feel deeply."
        }
      ],
      "reasonsEyebrow": "Why Travellers Choose Engatuny",
      "reasonsTitle": "The details that turn first-time guests into returning advocates.",
      "reasons": [
        "Travel design that balances wildlife, culture, and comfort without making the route feel overcrowded.",
        "Steady, human communication before and during the journey.",
        "A company identity that feels rooted in Uganda rather than imported onto it.",
        "A real commitment to showing Karamoja with dignity, beauty, and care."
      ],
      "ctaTitle": "Let us shape your Uganda story around what matters most to you.",
      "ctaDescription": "Tell us the pace you want, the places calling you, and the level of comfort you prefer. We will take it from there.",
      "ctaPrimaryLabel": "Start Planning",
      "ctaPrimaryHref": "/contact",
      "ctaSecondaryLabel": "See Our Tours",
      "ctaSecondaryHref": "/tours"
    }'::jsonb
  ),
  (
    'tours',
    'Tours Landing Page',
    'Tours page hero and browse-introduction content.',
    'published',
    'Tours',
    'Explore Uganda journeys with dedicated landing pages, detailed itineraries, and clear cultural and wildlife focus.',
    '{
      "heroEyebrow": "Our journeys",
      "heroTitle": "Tour pages built to show the route, mood, and meaning of each journey.",
      "heroDescription": "Browse by duration, region, or travel style, then open any tour for its full landing page and detailed story.",
      "browseEyebrow": "Browse and compare",
      "browseTitle": "Clear itineraries, strong visuals, and dedicated pages for every route.",
      "browseDescription": "Each tour is listed here and also has its own page so travellers can understand the experience before they enquire."
    }'::jsonb
  ),
  (
    'blog',
    'Blog Landing Page',
    'Journal page hero and collection introduction.',
    'published',
    'Blog',
    'Travel stories, planning advice, and warm field notes from across Uganda''s trails, forests, rivers, and hidden corners.',
    '{
      "heroEyebrow": "Journal",
      "heroTitle": "Stories, practical tips, and field notes from the trail.",
      "heroDescription": "A clean collection of useful inspiration for travellers dreaming about Uganda."
    }'::jsonb
  ),
  (
    'contact',
    'Contact',
    'Contact page hero copy and information-card labels.',
    'published',
    'Contact',
    'Reach Engatuny Tours & Travel to enquire about your ideal Uganda adventure, request a tailored itinerary, or chat on WhatsApp.',
    '{
      "heroEyebrow": "Contact Us",
      "heroTitle": "Tell us the kind of Uganda journey you want to feel.",
      "heroDescription": "We will shape the route around your pace, interests, and comfort level. Keep it simple. Start with a message.",
      "officeLabel": "Office",
      "directLabel": "Direct",
      "whatsAppLabel": "Chat on WhatsApp",
      "mapEmbedUrl": "https://www.google.com/maps?q=Kampala%20Uganda&z=12&output=embed"
    }'::jsonb
  )
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  status = excluded.status,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  content = excluded.content;
