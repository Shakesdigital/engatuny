update public.pages
set content = content || '{
  "heroSlides": [
    {
      "imageUrl": "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Karamoja spirit. Uganda soul. Local guidance.",
      "title": "Travel Uganda with the calm strength of the lion.",
      "description": "Engatuny means lion, and that spirit guides how we host every journey across Uganda with courage, care, and grounded local knowledge.",
      "primaryCtaLabel": "Explore Our Tours",
      "primaryCtaHref": "/tours",
      "secondaryCtaLabel": "Plan Your Journey",
      "secondaryCtaHref": "/contact"
    },
    {
      "imageUrl": "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Wild horizons. Strong guiding. Clear logistics.",
      "title": "Journeys that balance wildlife, culture, and comfort.",
      "description": "From Kidepo to Bwindi, we shape each route with local rhythm, practical care, and a deep respect for place.",
      "primaryCtaLabel": "Browse Signature Tours",
      "primaryCtaHref": "/tours",
      "secondaryCtaLabel": "Talk to Engatuny",
      "secondaryCtaHref": "/contact"
    }
  ]
}'::jsonb
where slug = 'home';

update public.pages
set content = content || '{
  "heroSlides": [
    {
      "imageUrl": "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "About Engatuny",
      "title": "A Uganda travel company shaped by the spirit of the lion.",
      "description": "Our brand is rooted in courage, care, and the kind of grounded stewardship that helps travellers feel confidently held."
    },
    {
      "imageUrl": "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Rooted in Uganda",
      "title": "Travel built around people, place, and respect.",
      "description": "We guide wildlife, cultural, and tailor-made journeys with thoughtful pacing and a strong sense of responsibility to the places we share."
    }
  ]
}'::jsonb
where slug = 'about';

update public.pages
set content = content || '{
  "heroSlides": [
    {
      "imageUrl": "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Our journeys",
      "title": "Tour pages built to show the route, mood, and meaning of each journey.",
      "description": "Browse by duration, region, or travel style, then open any tour for its full landing page and detailed story."
    },
    {
      "imageUrl": "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Signature Uganda routes",
      "title": "Independent tour pages with clear detail and stronger storytelling.",
      "description": "Each itinerary is listed clearly, then expanded into its own landing page so travellers can understand what fits them best."
    }
  ]
}'::jsonb
where slug = 'tours';

update public.pages
set content = content || '{
  "heroSlides": [
    {
      "imageUrl": "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Journal",
      "title": "Stories, practical tips, and field notes from the trail.",
      "description": "A clean collection of useful inspiration for travellers dreaming about Uganda."
    },
    {
      "imageUrl": "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "From the road and the wild",
      "title": "Ideas, planning notes, and stories gathered in the field.",
      "description": "Read through gorilla trekking advice, Kidepo notes, waterfall escapes, and the quieter moments that shape memorable journeys."
    }
  ]
}'::jsonb
where slug = 'blog';

update public.pages
set content = content || '{
  "heroSlides": [
    {
      "imageUrl": "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Contact Us",
      "title": "Tell us the kind of Uganda journey you want to feel.",
      "description": "We will shape the route around your pace, interests, and comfort level. Keep it simple. Start with a message."
    },
    {
      "imageUrl": "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "imagePath": "",
      "eyebrow": "Start with a conversation",
      "title": "Share your dates, style, and what is calling you most.",
      "description": "Whether you want a custom safari, a culture-led route, or a short add-on, we can shape the right journey from there."
    }
  ]
}'::jsonb
where slug = 'contact';
