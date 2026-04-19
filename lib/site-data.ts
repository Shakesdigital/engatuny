import type { BlogPost, GalleryPhoto, SiteSettings, Testimonial, Tour } from "@/types/content";

export type SocialLink = {
  label: string;
  href: string;
  kind: "facebook" | "instagram" | "x" | "youtube" | "tiktok";
};

export const siteSettings: SiteSettings = {
  siteName: "Engatuny Tours & Travel",
  tagline: "Follow the lion's path across Uganda.",
  description:
    "Purposeful Uganda journeys shaped by local guides, warm hosting, and the proud spirit of the lion.",
  siteUrl: "https://engatuny-tours.netlify.app",
  email: "hello@engatuny.com",
  phone: "+256772123456",
  whatsApp: "+256772123456",
  office: "Plot 14, Kololo Hill Drive, Kampala, Uganda",
  primaryColor: "#5B3A1E",
  secondaryColor: "#C96A16",
  accentColor: "#F2B51D",
  surfaceColor: "#F6EFE6",
  logoPath: "/engatuny-logo.png",
  brandMeaning:
    "Engatuny means lion - a symbol of courage, guardianship, and calm authority. That spirit shapes how we guide every journey.",
  brandStory:
    "We design travel with the calm confidence of a lion: attentive on the ground, strong in logistics, and deeply respectful of the landscapes and communities that welcome our guests.",
  founderKaramojaCommitment:
    "Our founder holds Karamoja close to heart and uses Engatuny journeys to share its dignity, beauty, resilience, and living culture with travellers who want to engage with care.",
  defaultMetaTitle: "Engatuny Tours & Travel | Follow the lion's path across Uganda",
  metaDescription:
    "Purposeful Uganda journeys shaped by local guides, warm hosting, and the proud spirit of the lion.",
  metaKeywords:
    "Uganda tours, Uganda safaris, Kidepo safari, Karamoja cultural tours, gorilla trekking Uganda, Engatuny Tours & Travel",
  openGraphImageUrl:
    "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
  twitterHandle: "@engatunytravel",
  facebookUrl: "https://www.facebook.com",
  instagramUrl: "https://www.instagram.com",
  xUrl: "https://x.com",
  youtubeUrl: "https://www.youtube.com",
  tiktokUrl: "https://www.tiktok.com",
};

export const contactDetails = {
  email: siteSettings.email,
  phone: siteSettings.phone,
  phoneDisplay: "+256 772 123 456",
  office: siteSettings.office,
  whatsAppUrl: getWhatsAppUrl(siteSettings.whatsApp),
};

export function getWhatsAppUrl(phone: string) {
  const normalized = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${normalized}?text=Hello%20Engatuny%20Tours%20%26%20Travel%2C%20I%20would%20love%20help%20planning%20my%20Uganda%20journey.`;
}

export function getSocialLinks(settings: SiteSettings): SocialLink[] {
  const links: SocialLink[] = [
    { label: "Facebook", href: settings.facebookUrl, kind: "facebook" },
    { label: "Instagram", href: settings.instagramUrl, kind: "instagram" },
    { label: "X", href: settings.xUrl, kind: "x" },
    { label: "YouTube", href: settings.youtubeUrl, kind: "youtube" },
    { label: "TikTok", href: settings.tiktokUrl, kind: "tiktok" },
  ];

  return links.filter((link) => link.href.trim().length > 0);
}

export const trustMetrics = [
  { label: "Lion-hearted hosting from arrival to farewell" },
  { label: "Small-group journeys shaped by local knowledge" },
  { label: "Wildlife, culture, and comfort held in balance" },
];

export const whyChooseEngatuny = [
  {
    icon: "L",
    title: "Lion-led confidence on the ground",
    description:
      "Engatuny stands for the lion, and that spirit shows up in the way we guide: calm under pressure, deeply attentive, and ready to protect the quality of your journey.",
  },
  {
    icon: "K",
    title: "Karamoja held with respect",
    description:
      "We do not treat culture as a side show. Especially in Karamoja, we design travel that gives proper space to story, heritage, community voices, and local pride.",
  },
  {
    icon: "U",
    title: "Uganda felt, not just seen",
    description:
      "From riverbanks and forests to highland coffee farms and remote savannahs, our routes are built to help travellers feel the rhythm of Uganda rather than rush through it.",
  },
];

export const tours: Tour[] = [
  {
    id: "jinja-nile-adventure",
    slug: "3-day-jinja-nile-adventure",
    title: "3-Day Jinja Nile Adventure",
    tagline: "Rapids, river light, and the playful energy of eastern Uganda.",
    heroDescription:
      "A lively short escape built around the Nile, Jinja's easygoing atmosphere, and hands-on adventure that still leaves room for comfort.",
    overview:
      "This journey is ideal for travellers who want a fast but memorable Uganda introduction. It pairs the source of the Nile, white-water energy, and local coffee stories with a relaxed overnight rhythm.",
    price: "From $420 per person",
    duration: "3 Days",
    durationDays: 3,
    region: "Eastern Uganda",
    type: "Adventure",
    difficulty: "Active",
    maxTravellers: 8,
    image: "https://images.pexels.com/photos/19820463/pexels-photo-19820463.jpeg",
    imageAlt: "Traditional sailboat gliding across a broad river at soft golden light.",
    enquirySubject: "3-Day Jinja Nile Adventure",
    routeDetails: "Kampala -> Jinja -> Source of the Nile -> Kampala",
    itinerary: [
      "Day 1: Leave Kampala for Jinja, settle in, and ease into the trip with a sunset Nile cruise and dinner overlooking the river.",
      "Day 2: Spend the day on the water with guided rafting, then choose an optional bungee jump, quad biking session, or a slow riverside evening.",
      "Day 3: Visit the Source of the Nile, add a coffee experience, and return to Kampala with time for souvenir stops.",
    ],
    highlights: ["Sunset Nile cruise", "White-water rafting", "Source of the Nile", "Coffee stop"],
    idealFor: ["Friends", "Adventure seekers", "Short Uganda add-ons"],
    inclusions: ["Ground transport", "Guide support", "Selected activities", "Accommodation with breakfast"],
    landscapeStory:
      "Jinja offers a softer, brighter side of Uganda: broad water, green banks, and warm evening light moving slowly across the Nile.",
    cultureStory:
      "Beyond the adrenaline, Jinja reveals local craft, coffee, and riverside communities that keep the route grounded.",
    wildlifeStory:
      "This is not a wildlife-first itinerary, but birdlife along the river and the living ecology of the Nile give the experience its natural pulse.",
  },
  {
    id: "murchison-falls-wildlife-escape",
    slug: "4-day-murchison-falls-wildlife-escape",
    title: "4-Day Murchison Falls Wildlife Escape",
    tagline: "Big skies, river drama, and game viewing with strong pace.",
    heroDescription:
      "A classic Uganda safari combining wildlife, the Nile, and one of the country's most powerful landscapes in a practical four-day route.",
    overview:
      "Murchison works beautifully for travellers who want strong wildlife value without committing to a very long itinerary. The route blends game drives, a boat safari, and the raw force of the falls.",
    price: "From $890 per person",
    duration: "4 Days",
    durationDays: 4,
    region: "Northwestern Uganda",
    type: "Safari",
    difficulty: "Moderate",
    maxTravellers: 8,
    image: "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    imageAlt: "Open safari vehicle at golden hour overlooking a vast African landscape.",
    enquirySubject: "4-Day Murchison Falls Wildlife Escape",
    routeDetails: "Kampala -> Murchison Falls National Park -> Budongo area -> Kampala",
    itinerary: [
      "Day 1: Drive north from Kampala with scenic stops and enter Murchison Falls National Park in time for a quiet evening.",
      "Day 2: Start with a game drive for giraffe, buffalo, elephant, and antelope, then take an afternoon boat safari toward the base of the falls.",
      "Day 3: Explore Budongo Forest for chimpanzees or choose a slower bush morning before another wildlife circuit.",
      "Day 4: Catch the final golden light on a short morning drive and return to Kampala.",
    ],
    highlights: ["Murchison Falls", "Game drives", "Nile boat safari", "Budongo chimpanzees"],
    idealFor: ["First-time safari travellers", "Couples", "Small private groups"],
    inclusions: ["4x4 transport", "Park entry", "Guide-driver", "Accommodation and meals as per route"],
    landscapeStory:
      "Murchison combines rolling savannah, riverbanks, palm-dotted plains, and the concentrated force of the Nile at the falls.",
    cultureStory:
      "The road north reveals trading centres, local farming belts, and the transition from central to northwestern Uganda.",
    wildlifeStory:
      "This is one of Uganda's most rewarding all-round wildlife areas, especially for elephant, giraffe, buffalo, hippo, crocodile, and broad savannah sightings.",
  },
  {
    id: "sipi-falls-coffee-hiking-retreat",
    slug: "3-day-sipi-falls-coffee-hiking-retreat",
    title: "3-Day Sipi Falls Coffee and Hiking Retreat",
    tagline: "Cool air, mountain paths, and coffee with a human story.",
    heroDescription:
      "A highland journey for travellers who want scenic hiking, slower pacing, and one of Uganda's most rewarding coffee landscapes.",
    overview:
      "Sipi offers a gentler kind of immersion. This route balances waterfall walks, local coffee heritage, and long escarpment views over the eastern plains.",
    price: "From $380 per person",
    duration: "3 Days",
    durationDays: 3,
    region: "Eastern Highlands",
    type: "Hiking",
    difficulty: "Moderate",
    maxTravellers: 8,
    image: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    imageAlt: "Tall waterfall framed by lush tropical greenery.",
    enquirySubject: "3-Day Sipi Falls Coffee and Hiking Retreat",
    routeDetails: "Kampala -> Sipi Falls -> Mt Elgon foothills -> Kampala",
    itinerary: [
      "Day 1: Travel to Sipi, settle into the highlands, and begin with a guided walk to the waterfalls.",
      "Day 2: Spend the day learning coffee from crop to cup with a local host family, then relax with escarpment views in the late afternoon.",
      "Day 3: Take a sunrise walk, add optional abseiling or a village stroll, and return to Kampala.",
    ],
    highlights: ["Waterfall hikes", "Arabica coffee experience", "Escarpment views", "Cool mountain climate"],
    idealFor: ["Honeymoon add-ons", "Slow travellers", "Nature lovers"],
    inclusions: ["Transport", "Guide support", "Coffee experience", "Accommodation with meals as planned"],
    landscapeStory:
      "Sipi is all vertical drama: cliffs, mist, cultivated slopes, and a horizon that opens wide across eastern Uganda.",
    cultureStory:
      "Coffee here is not just a tasting. It is family work, local pride, and a powerful way to understand the mountain communities.",
    wildlifeStory:
      "This route is more about landscape and birdlife than classic safari sightings, making it ideal for a quieter kind of nature immersion.",
  },
  {
    id: "kidepo-remote-safari",
    slug: "7-day-kidepo-lion-heart-safari",
    title: "7-Day Kidepo Lion Heart Safari",
    tagline: "A Karamoja journey of sweeping landscapes, proud culture, and wild space.",
    heroDescription:
      "Our signature Karamoja itinerary designed to honour Kidepo's dramatic beauty, the richness of Karamojong culture, and the feeling of true remoteness.",
    overview:
      "This is Engatuny's most brand-aligned safari: lion-hearted in spirit and deeply rooted in Karamoja. It gives proper time to Kidepo National Park, community connection, and the scale of the northeastern frontier.",
    price: "From $2,450 per person",
    duration: "7 Days",
    durationDays: 7,
    region: "Karamoja",
    type: "Safari",
    difficulty: "Active",
    maxTravellers: 8,
    image: "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg",
    imageAlt: "Safari vehicle parked beneath acacia trees in a dry wilderness landscape.",
    enquirySubject: "7-Day Kidepo Lion Heart Safari",
    routeDetails: "Entebbe or Kampala -> Gulu or direct overland route -> Kidepo Valley National Park -> Karamoja cultural visits -> return",
    itinerary: [
      "Day 1: Depart Kampala or Entebbe and begin the journey north with an overnight break that makes the route comfortable.",
      "Day 2: Travel into Karamoja, arrive in Kidepo, and settle in with sunset views across the Narus Valley.",
      "Day 3: Early game drive for lions, buffalo, elephant, ostrich, and broad savannah photography, followed by a quiet lodge afternoon.",
      "Day 4: Explore another sector of the park for changing scenery, stronger mountain views, and slower wildlife tracking.",
      "Day 5: Spend meaningful time with a Karamojong community, learning about homestead life, ornament, storytelling, food traditions, and the dignity of local identity.",
      "Day 6: Combine a final bush experience with space for rest, sundowners, and reflection on the journey through Karamoja.",
      "Day 7: Begin the return route or connect onward depending on the transport plan chosen.",
    ],
    highlights: ["Kidepo landscapes", "Karamojong cultural immersion", "Lion country", "Remote safari atmosphere"],
    idealFor: ["Second-time Uganda visitors", "Photographers", "Travellers drawn to culture and remote landscapes"],
    inclusions: ["4x4 transport or tailored routing", "Guide-driver", "Park fees", "Cultural visit coordination", "Accommodation and meals as scheduled"],
    landscapeStory:
      "Kidepo is one of the most visually powerful parks in East Africa: long valleys, mountain walls, open grassland, dry riverbeds, and a sense of space that changes the pace of the traveller.",
    cultureStory:
      "Karamoja is central to this journey, not decorative. The route is designed to introduce the strength, heritage, and hospitality of Karamojong life with respect and context.",
    wildlifeStory:
      "Kidepo rewards patience with classic predator country, large herds, dry-country species, and some of Uganda's most cinematic game-drive moments.",
  },
  {
    id: "bwindi-gorilla-trekking-classic",
    slug: "4-day-bwindi-gorilla-trekking-classic",
    title: "4-Day Bwindi Gorilla Trekking Classic",
    tagline: "A focused route to Uganda's most moving wildlife encounter.",
    heroDescription:
      "A carefully paced gorilla trekking itinerary built for travellers who want the emotional highlight of Bwindi without unnecessary complexity.",
    overview:
      "This route focuses on the mountain gorilla experience while still leaving room for scenery, community connection, and recovery after the trek.",
    price: "From $1,450 per person",
    duration: "4 Days",
    durationDays: 4,
    region: "Southwestern Uganda",
    type: "Wildlife",
    difficulty: "Active",
    maxTravellers: 8,
    image: "https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg",
    imageAlt: "Mountain gorilla resting in lush forest habitat.",
    enquirySubject: "4-Day Bwindi Gorilla Trekking Classic",
    routeDetails: "Entebbe or Kampala -> Bwindi Impenetrable Forest -> optional community experience -> return",
    itinerary: [
      "Day 1: Transfer by road or flight into the Bwindi region and settle near your trekking sector.",
      "Day 2: Gorilla trekking day with briefing, forest hike, and precious time with a habituated family.",
      "Day 3: Recover with a lighter cultural or community activity, or simply enjoy the forest atmosphere.",
      "Day 4: Return to Kampala or Entebbe with a stop for crafts and local produce where timing allows.",
    ],
    highlights: ["Gorilla permit support", "Bwindi forest", "Community add-on", "Scenic southwest route"],
    idealFor: ["Bucket-list travellers", "Wildlife lovers", "Private couples or families"],
    inclusions: ["Accommodation", "Transport", "Guide support", "Trek logistics"],
    landscapeStory:
      "Bwindi feels dense, alive, and close. The atmosphere is shaped by steep green hills, layered forest, and mist that turns ordinary moments cinematic.",
    cultureStory:
      "Southwestern Uganda offers warm hospitality and meaningful optional experiences with surrounding communities when travellers want to connect beyond the trek itself.",
    wildlifeStory:
      "The gorilla encounter is the core draw, but the forest carries birdlife, primates, and a deep sense of ecological richness from start to finish.",
  },
];

export const homeFeaturedTours = [
  tours[3],
  tours[4],
  tours[1],
  tours[2],
];

export const testimonials: Testimonial[] = [
  {
    name: "Anna and Michael",
    homeCountry: "Germany",
    trip: "Bwindi Gorilla Trekking Classic",
    quote:
      "We felt cared for from the first airport pickup to the last coffee stop. The gorilla trek was extraordinary, but the warmth of the team is what stayed with us.",
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
    name: "Lina and Priya",
    homeCountry: "India",
    trip: "Sipi Falls Coffee and Hiking Retreat",
    quote:
      "Sipi was breathtaking, but the coffee experience gave the whole trip heart. It felt local, warm, and beautifully paced.",
  },
  {
    name: "Ethan P.",
    homeCountry: "Australia",
    trip: "Kidepo Lion Heart Safari",
    quote:
      "Kidepo felt vast and honest. The cultural time in Karamoja was handled with care, and the whole route felt powerful without ever becoming rushed.",
  },
];

export const galleryMoments: GalleryPhoto[] = [
  {
    src: "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg",
    alt: "Safari vehicle overlooking a broad savannah at golden hour.",
    caption: "Wide northern horizons that make you breathe more slowly.",
    height: 420,
  },
  {
    src: "https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg",
    alt: "Mountain gorilla surrounded by fresh green forest.",
    caption: "Forest encounters that stay with travellers for years.",
    height: 540,
  },
  {
    src: "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg",
    alt: "Waterfall cascading through dense tropical greenery.",
    caption: "Cool highland air, mist, and long green views.",
    height: 540,
  },
  {
    src: "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg",
    alt: "Woman in a village scene in warm light, reflecting authentic community connection.",
    caption: "Human warmth that gives every journey its true memory.",
    height: 420,
  },
];

export const services = [
  {
    title: "Wildlife Safaris",
    icon: "L",
    description:
      "Game drives, boat safaris, and high-impact park itineraries built around pacing, comfort, and strong guiding.",
  },
  {
    title: "Gorilla Trekking",
    icon: "G",
    description:
      "Permits, route logic, and thoughtful support for one of Uganda's most powerful wildlife experiences.",
  },
  {
    title: "Adventure and Hiking",
    icon: "A",
    description:
      "Waterfalls, rafting, escarpment walks, and active days that still feel well-held from start to finish.",
  },
  {
    title: "Cultural Journeys",
    icon: "C",
    description:
      "Travel that treats community time with respect, context, and a genuine willingness to listen and learn.",
  },
  {
    title: "Tailor-Made Routes",
    icon: "T",
    description:
      "Private journeys shaped around your timing, energy, accommodation style, and the places you most want to feel deeply.",
  },
];

export const aboutValues = ["Courage", "Respect", "Warmth", "Stewardship", "Authenticity"];

export const travellerReasons = [
  "Travel design that balances wildlife, culture, and comfort without making the route feel overcrowded.",
  "Steady, human communication before and during the journey.",
  "A company identity that feels rooted in Uganda rather than imported onto it.",
  "A real commitment to showing Karamoja with dignity, beauty, and care.",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-for-your-first-gorilla-trek",
    title: "How to Prepare for Your First Gorilla Trek",
    excerpt:
      "The practical details that make your gorilla trekking day calmer, lighter, and more enjoyable.",
    publishedAt: "2026-02-14",
    readingTime: "6 min read",
    image: "https://images.pexels.com/photos/36804628/pexels-photo-36804628.jpeg",
    imageAlt: "Mountain gorilla in dense forest habitat.",
    content: [
      "Your boots matter more than your camera. Bwindi trails can shift quickly underfoot, so ankle support and grip are worth every gram in your bag.",
      "Layers help. The forest can begin cool, turn humid, then cool again after rain, so breathable clothing and a light waterproof layer usually work best.",
      "The emotional pace can surprise first-time trekkers. You may walk for hours and then suddenly be standing in complete stillness beside a gorilla family. Leave room for that moment.",
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
      "Sipi is the name many travellers know, but Uganda's waterfall story is wider and quieter than most people expect.",
      "The magic is not only the water itself. It is the walk in, the sudden temperature drop, and the way local guides read the land with ease.",
      "If your journey allows slower discovery, these waterfall days often become the stories travellers keep talking about long after they return home.",
    ],
  },
  {
    slug: "why-kidepo-valley-is-ugandas-best-kept-secret-in-2026",
    title: "Why Kidepo Valley is Uganda's Best-Kept Secret in 2026",
    excerpt:
      "For travellers who want scale, silence, and a stronger feeling of wilderness, Kidepo still feels rare.",
    publishedAt: "2026-03-06",
    readingTime: "7 min read",
    image: "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg",
    imageAlt: "Safari vehicle in a dry wilderness landscape.",
    content: [
      "Kidepo feels far away in the best sense. The approach itself changes your mindset, and once you arrive, the valleys and mountain walls create a powerful sense of stillness.",
      "This is where route logic matters. Kidepo rewards travellers who either fly in or consciously accept that the remoteness is part of the journey.",
      "If you want big landscapes, cultural depth, and more space around each wildlife sighting, Kidepo remains one of East Africa's most special safari regions.",
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
      "A roadside pineapple stop. A guide translating a joke between languages. Coffee drying in the afternoon sun. These smaller moments create the emotional shape of travel.",
      "They are not filler. They are often the heartbeat of the journey itself, especially in a country as warm and layered as Uganda.",
      "That is why we design routes with breathing room. Authentic travel needs space for surprise, kindness, and the little stories travellers carry home for years.",
    ],
  },
];
