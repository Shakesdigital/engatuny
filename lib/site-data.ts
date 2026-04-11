import type { BlogPost, GalleryPhoto, SiteSettings, Testimonial, Tour } from "@/types/content";

export const siteSettings: SiteSettings = {
  siteName: "Engatuny Tours & Travel",
  tagline: "Feel the heartbeat of the Pearl of Africa.",
  description:
    "Warm, authentic Uganda adventures led by local guides who know these landscapes by heart.",
  email: "hello@engatuny.com",
  phone: "+256772123456",
  whatsApp: "+256772123456",
  office: "Plot 14, Kololo Hill Drive, Kampala, Uganda",
};

export const contactDetails = {
  email: siteSettings.email,
  phone: siteSettings.phone,
  phoneDisplay: "+256 772 123 456",
  office: siteSettings.office,
  whatsAppUrl:
    "https://wa.me/256772123456?text=Hello%20Engatuny%20Tours%20%26%20Travel%2C%20I%20would%20love%20help%20planning%20my%20Uganda%20journey.",
};

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com", icon: "IG" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "FB" },
  { label: "X", href: "https://x.com", icon: "X" },
];

export const trustMetrics = [
  { label: "Featured in Uganda Tourism Board partner circles" },
  { label: "4.9/5 from 487 happy travellers" },
  { label: "Small groups, local guides, and tailored support" },
];

export const whyChooseEngatuny = [
  {
    icon: "🌿",
    title: "Local guides with lived knowledge",
    description:
      "Our guides grew up among these forests, lakes, and villages, so your journey feels informed, grounded, and wonderfully personal from day one.",
  },
  {
    icon: "🤝",
    title: "Small groups for real connection",
    description:
      "We keep each departure intimate, never more than eight travellers, so every game drive, trail, and shared meal feels relaxed and human.",
  },
  {
    icon: "🧭",
    title: "Authentic journeys crafted with heart",
    description:
      "From wildlife moments to cultural visits and coffee farms, every route is designed to feel meaningful, comfortable, and unmistakably Ugandan.",
  },
];

export const tours: Tour[] = [
  {
    id: "jinja-nile-adventure",
    slug: "3-day-jinja-nile-adventure",
    title: "3-Day Jinja Nile Adventure",
    tagline: "White water, bungee, and the source of the Nile",
    price: "From $420 per person",
    duration: "3 Days",
    durationDays: 3,
    region: "Eastern Uganda",
    type: "Adventure",
    difficulty: "Active",
    maxTravellers: 8,
    image:
      "https://images.pexels.com/photos/19820463/pexels-photo-19820463.jpeg",
    imageAlt:
      "Traditional sailboat gliding across a broad river at soft golden light, evoking the spirit of the Nile.",
    enquirySubject: "3-Day Jinja Nile Adventure",
    itinerary: [
      "Day 1: Arrive in Kampala and transfer to Jinja. Settle in and enjoy a relaxing sunset cruise on the mighty Nile.",
      "Day 2: Full day of adventure — white-water rafting on the Nile plus optional bungee jumping or quad biking.",
      "Day 3: Visit the Source of the Nile, tour a local coffee plantation, then return to Kampala in the afternoon.",
    ],
    highlights: ["Sunset Nile cruise", "Rafting", "Source of the Nile", "Coffee experience"],
  },
  {
    id: "murchison-falls-wildlife-escape",
    slug: "4-day-murchison-falls-wildlife-escape",
    title: "4-Day Murchison Falls Wildlife Escape",
    tagline: "Where the Nile explodes through the earth",
    price: "From $890 per person",
    duration: "4 Days",
    durationDays: 4,
    region: "Northwestern Uganda",
    type: "Safari",
    difficulty: "Moderate",
    maxTravellers: 8,
    image:
      "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    imageAlt:
      "Open safari vehicle at golden hour overlooking a vast African landscape, matching the spirit of wildlife escapes.",
    enquirySubject: "4-Day Murchison Falls Wildlife Escape",
    itinerary: [
      "Day 1: Drive from Kampala to Murchison Falls National Park with scenic stops.",
      "Day 2: Morning game drive and afternoon boat safari to the base of the powerful Murchison Falls.",
      "Day 3: Chimpanzee trek in Budongo Forest followed by an optional sunrise hot-air balloon ride.",
      "Day 4: Final morning game drive, then return to Kampala.",
    ],
    highlights: ["Murchison Falls", "Game drives", "Boat safari", "Budongo chimpanzees"],
  },
  {
    id: "sipi-falls-coffee-hiking-retreat",
    slug: "3-day-sipi-falls-coffee-hiking-retreat",
    title: "3-Day Sipi Falls Coffee & Hiking Retreat",
    tagline: "Waterfalls, mountains & the best coffee in Uganda",
    price: "From $380 per person",
    duration: "3 Days",
    durationDays: 3,
    region: "Eastern Highlands",
    type: "Hiking",
    difficulty: "Moderate",
    maxTravellers: 8,
    image:
      "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    imageAlt:
      "Tall waterfall framed by lush tropical greenery, reflecting the drama of Sipi Falls.",
    enquirySubject: "3-Day Sipi Falls Coffee & Hiking Retreat",
    itinerary: [
      "Day 1: Transfer from Kampala to Sipi. Hike to the three beautiful waterfalls in the afternoon.",
      "Day 2: Full-day coffee plantation experience with community lunch and learning how Ugandan coffee is grown.",
      "Day 3: Sunrise hike with stunning views, optional abseiling, then return to Kampala.",
    ],
    highlights: ["Three waterfalls", "Coffee farm", "Community lunch", "Sunrise hike"],
  },
  {
    id: "kidepo-remote-safari",
    slug: "7-day-kidepo-valley-remote-safari",
    title: "7-Day Kidepo Valley Remote Safari",
    tagline: "Uganda’s most dramatic and untouched wilderness",
    price: "From $2,150 per person",
    duration: "7 Days",
    durationDays: 7,
    region: "Karamoja",
    type: "Safari",
    difficulty: "Active",
    maxTravellers: 8,
    image:
      "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg",
    imageAlt:
      "Safari vehicle parked beneath acacia trees in a dry wilderness landscape, echoing the remoteness of Kidepo.",
    enquirySubject: "7-Day Kidepo Valley Remote Safari",
    itinerary: [
      "Day 1-2: Fly to Kidepo Valley and enjoy game drives in this remote paradise.",
      "Day 3: Hike Mount Morungole with local Karamojong warriors for cultural immersion.",
      "Day 4-5: Full-day game drives spotting unique wildlife and cultural village visits.",
      "Day 6-7: Return via Ziwa Rhino Sanctuary with a final game drive before heading back to Kampala.",
    ],
    highlights: ["Remote wildlife", "Karamojong cultural immersion", "Mount Morungole", "Ziwa Rhino Sanctuary"],
  },
  {
    id: "bwindi-gorilla-trekking-classic",
    slug: "4-day-bwindi-gorilla-trekking-classic",
    title: "4-Day Bwindi Gorilla Trekking Classic",
    tagline: "Come eye-to-eye with the gentle giants",
    price: "From $1,450 per person",
    duration: "4 Days",
    durationDays: 4,
    region: "Southwestern Uganda",
    type: "Wildlife",
    difficulty: "Active",
    maxTravellers: 8,
    image:
      "https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg",
    imageAlt:
      "Mountain gorilla resting in lush forest habitat, capturing the emotional highlight of a Bwindi trek.",
    enquirySubject: "4-Day Bwindi Gorilla Trekking Classic",
    itinerary: [
      "Day 1: Transfer or fly to Buhoma area near Bwindi Impenetrable Forest.",
      "Day 2: Full-day gorilla trekking experience (permits included) — the highlight of any Uganda trip.",
      "Day 3: Relaxed morning with optional community walk or Batwa cultural experience.",
      "Day 4: Return journey to Kampala or Entebbe with great memories.",
    ],
    highlights: ["Permits included", "Gorilla encounter", "Batwa experience", "Scenic return journey"],
  },
];

export const homeFeaturedTours = tours.slice(0, 4);

export const testimonials: Testimonial[] = [
  {
    name: "Anna & Michael",
    homeCountry: "Germany",
    trip: "Bwindi Gorilla Trekking Classic",
    quote:
      "We felt cared for from the first airport pickup to the last coffee stop. The gorilla trek was extraordinary, but the warmth of the team is what we still talk about.",
  },
  {
    name: "Caroline O.",
    homeCountry: "United Kingdom",
    trip: "Murchison Falls Wildlife Escape",
    quote:
      "Everything felt calm, polished, and personal. Our guide knew the wildlife, the stories, and the small details that made Uganda feel deeply alive.",
  },
  {
    name: "David M.",
    homeCountry: "Canada",
    trip: "Jinja Nile Adventure",
    quote:
      "Adventure without chaos. We had thrilling days on the river, excellent logistics, and just the right balance of excitement and comfort.",
  },
  {
    name: "Lina & Priya",
    homeCountry: "India",
    trip: "Sipi Falls Coffee & Hiking Retreat",
    quote:
      "Sipi was breathtaking, but the community coffee experience gave the whole trip heart. It felt warm, local, and beautifully paced.",
  },
  {
    name: "Ethan P.",
    homeCountry: "Australia",
    trip: "Kidepo Valley Remote Safari",
    quote:
      "Kidepo felt wild in the best possible way. Engatuny made a very remote trip feel easy, safe, and unforgettable.",
  },
];

export const galleryMoments: GalleryPhoto[] = [
  {
    src: "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    alt: "Safari vehicle overlooking a broad savannah at golden hour.",
    caption: "Wild horizons and slow golden evenings.",
    height: 420,
  },
  {
    src: "https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg",
    alt: "Mountain gorilla surrounded by fresh green forest.",
    caption: "Quiet moments in the forest where everything slows down.",
    height: 540,
  },
  {
    src: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    alt: "Waterfall cascading through dense tropical greenery.",
    caption: "Water, mist, and the cool air of Uganda's highlands.",
    height: 540,
  },
  {
    src: "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg",
    alt: "Woman in a village scene in warm light, reflecting authentic community connection.",
    caption: "The human warmth that gives every journey its soul.",
    height: 420,
  },
];

export const services = [
  {
    title: "Wildlife Safaris",
    icon: "🦒",
    description:
      "Game drives, boat safaris, and big-sky landscapes shaped around the rhythms of Uganda's parks.",
  },
  {
    title: "Gorilla Trekking",
    icon: "🦍",
    description:
      "Permits, logistics, and sensitive guiding for one of Africa's most moving wildlife experiences.",
  },
  {
    title: "Adventure & Hiking",
    icon: "🥾",
    description:
      "Waterfalls, mountain trails, rafting, and active escapes with comfort built into the route.",
  },
  {
    title: "Cultural Experiences",
    icon: "🌍",
    description:
      "Visits that feel respectful, personal, and rooted in local life rather than performance.",
  },
  {
    title: "Tailor-Made Journeys",
    icon: "✨",
    description:
      "Personalized Uganda trips designed around your pace, budget, travel style, and must-see moments.",
  },
];

export const aboutValues = [
  "Authenticity",
  "Expertise",
  "Connection",
  "Safety",
  "Joy",
];

export const travellerReasons = [
  "Thoughtful trip design that balances comfort, adventure, and genuine immersion.",
  "Steady, friendly communication before and during the journey.",
  "Local insight that turns famous highlights into deeper, more memorable experiences.",
  "Warm hospitality that makes first-time visitors feel immediately at ease.",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-for-your-first-gorilla-trek",
    title: "How to Prepare for Your First Gorilla Trek (What No One Tells You)",
    excerpt:
      "The small, practical details that make your gorilla trekking day calmer, lighter, and far more enjoyable.",
    publishedAt: "2026-02-14",
    readingTime: "6 min read",
    image: "https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg",
    imageAlt: "Mountain gorilla in dense forest habitat.",
    content: [
      "Your boots matter more than your camera. Bwindi trails can shift from dry leaf litter to slick red earth in one morning, so ankle support and grip are worth every gram in your bag.",
      "Layers help. The forest often begins cool, turns humid quickly, then cools again when rain passes through. A breathable long-sleeve layer and a light waterproof jacket usually strike the right balance.",
      "The emotional pace can surprise first-time trekkers. You might walk for an hour or most of the day, then suddenly find yourself in complete stillness beside a gorilla family. Leave space for that moment. It lands deeply.",
    ],
  },
  {
    slug: "the-7-hidden-waterfalls-you-must-chase-in-uganda",
    title: "The 7 Hidden Waterfalls You Must Chase in Uganda",
    excerpt:
      "Beyond the famous cascades, Uganda hides cool pockets of mist, forest trails, and waterfall views worth the detour.",
    publishedAt: "2026-01-28",
    readingTime: "5 min read",
    image: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    imageAlt: "Waterfall in a tropical forest with deep green foliage.",
    content: [
      "Sipi is the name travellers know, but Uganda's waterfall story is wider and quieter than most people expect. Some drops are dramatic and open; others hide behind coffee farms, bamboo, and village paths.",
      "The magic is not only the water itself. It is the walk in, the sudden temperature drop, the sound carried on the wind, and the way local guides read the land as if it is a familiar conversation.",
      "If your journey allows room for slower discovery, these waterfall days often become the trips travellers describe as unexpectedly unforgettable.",
    ],
  },
  {
    slug: "why-kidepo-valley-is-ugandas-best-kept-secret-in-2026",
    title: "Why Kidepo Valley is Uganda’s Best-Kept Secret in 2026",
    excerpt:
      "For travellers who want space, drama, and a stronger feeling of wilderness, Kidepo still feels rare.",
    publishedAt: "2026-03-06",
    readingTime: "7 min read",
    image: "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg",
    imageAlt: "Safari vehicle in a dry wilderness landscape.",
    content: [
      "Kidepo feels far away in the best sense. The approach itself changes your mindset, and once you arrive, the wide valleys and low visitor numbers create a remarkable sense of stillness.",
      "This is where route logic matters. Kidepo rewards travellers who either fly in or accept that the remoteness is part of the journey. It is not a rushed add-on. It is a destination that deserves its own mood.",
      "If you want big landscapes, a feeling of raw Uganda, and more space around each wildlife sighting, Kidepo remains one of East Africa's most special safari regions.",
    ],
  },
  {
    slug: "discovering-authentic-uganda-stories-from-the-trail",
    title: "Discovering Authentic Uganda: Stories from the Trail",
    excerpt:
      "The moments that stay with travellers often happen between the headline activities.",
    publishedAt: "2026-03-22",
    readingTime: "4 min read",
    image: "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg",
    imageAlt: "Village scene in warm evening light.",
    content: [
      "A roadside pineapple stop. A guide translating a joke between languages. Coffee drying in the afternoon sun. A conversation at camp that lasts longer than planned because nobody wants to leave the fire.",
      "These smaller moments build the emotional shape of travel in Uganda. They are not filler. They are often the heartbeat of the journey itself.",
      "That is why we design routes with breathing room. Authentic travel needs space for surprise, kindness, and the little stories travellers carry home for years.",
    ],
  },
];
