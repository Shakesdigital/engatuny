import type { CmsPage, PageContentObject } from "@/types/content";

function card(icon: string, title: string, description: string): PageContentObject {
  return { icon, title, description };
}

function service(icon: string, title: string, description: string): PageContentObject {
  return { icon, title, description };
}

function slide(
  imageUrl: string,
  eyebrow: string,
  title: string,
  description: string,
  primaryCtaLabel = "",
  primaryCtaHref = "",
  secondaryCtaLabel = "",
  secondaryCtaHref = "",
): PageContentObject {
  return {
    imageUrl,
    imagePath: "",
    eyebrow,
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
  };
}

export const defaultPages: CmsPage[] = [
  {
    slug: "home",
    title: "Home",
    excerpt: "Homepage story, brand promise, trust signals, and featured journeys.",
    status: "published",
    metaTitle: "Engatuny Tours & Travel",
    metaDescription:
      "Purposeful Uganda journeys shaped by local guides, lion-hearted hosting, and deep cultural respect.",
    content: {
      heroSlides: [
        slide(
          "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Karamoja spirit. Uganda soul. Local guidance.",
          "Travel Uganda with the calm strength of the lion.",
          "Engatuny means lion, and that spirit guides how we host every journey across Uganda with courage, care, and grounded local knowledge.",
          "Explore Our Tours",
          "/tours",
          "Plan Your Journey",
          "/contact",
        ),
        slide(
          "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Wild horizons. Strong guiding. Clear logistics.",
          "Journeys that balance wildlife, culture, and comfort.",
          "From Kidepo to Bwindi, we shape each route with local rhythm, practical care, and a deep respect for place.",
          "Browse Signature Tours",
          "/tours",
          "Talk to Engatuny",
          "/contact",
        ),
      ],
      heroImageUrl:
        "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
      heroImagePath: "",
      heroEyebrow: "Karamoja spirit. Uganda soul. Local guidance.",
      heroTitle: "Travel Uganda with the calm strength of the lion.",
      heroDescription:
        "Engatuny means lion, and that spirit guides how we host every journey across Uganda with courage, care, and grounded local knowledge.",
      heroSubtitle: "Lion-hearted Uganda journeys",
      primaryCtaLabel: "Explore Our Tours",
      primaryCtaHref: "/tours",
      secondaryCtaLabel: "Plan Your Journey",
      secondaryCtaHref: "/contact",
      trustMetrics: [
        "Lion-hearted hosting from arrival to farewell",
        "Small-group journeys shaped by local knowledge",
        "Wildlife, culture, and comfort held in balance",
      ],
      whyChooseEyebrow: "Why Choose Engatuny?",
      whyChooseTitle: "A brand built around the lion, and a way of guiding that feels grounded.",
      whyChooseDescription:
        "We design travel with the calm confidence of a lion: attentive on the ground, strong in logistics, and deeply respectful of the landscapes and communities that welcome our guests.",
      whyChooseCards: [
        card(
          "L",
          "Lion-led confidence on the ground",
          "Engatuny stands for the lion, and that spirit shows up in the way we guide: calm under pressure, deeply attentive, and ready to protect the quality of your journey.",
        ),
        card(
          "K",
          "Karamoja held with respect",
          "We do not treat culture as a side show. Especially in Karamoja, we design travel that gives proper space to story, heritage, community voices, and local pride.",
        ),
        card(
          "U",
          "Uganda felt, not just seen",
          "From riverbanks and forests to highland coffee farms and remote savannahs, our routes are built to help travellers feel the rhythm of Uganda rather than rush through it.",
        ),
      ],
      founderEyebrow: "Founder Focus",
      founderTitle: "Karamoja is not a footnote in this company story.",
      founderBody:
        "Our founder holds Karamoja close to heart and uses Engatuny journeys to share its dignity, beauty, resilience, and living culture with travellers who want to engage with care.",
      toursEyebrow: "Featured Tours",
      toursTitle: "Independent journeys with their own landing pages and story.",
      toursDescription:
        "Each route now has its own destination page, so travellers can explore details, mood, and practical fit before making contact.",
      guestStoriesEyebrow: "Guest Stories",
      guestStoriesTitle: "Travellers remember the feeling as much as the places.",
      guestStoriesDescription:
        "A few voices from the trail, campfire, riverbank, and savannah edge.",
      galleryEyebrow: "Moments from the Pearl",
      galleryTitle:
        "Golden plains, forest stillness, and the warmth between destinations.",
      ctaTitle: "Ready to follow the lion's path across Uganda?",
      ctaDescription:
        "Tell us whether you want more wildlife, more culture, more adventure, or a thoughtful balance of all three. We will shape the route around you.",
      ctaPrimaryLabel: "Plan Your Journey",
      ctaPrimaryHref: "/contact",
      ctaSecondaryLabel: "Browse Tours",
      ctaSecondaryHref: "/tours",
    },
  },
  {
    slug: "about",
    title: "About",
    excerpt: "Company story, founder commitment, values, services, and traveller reasons.",
    status: "published",
    metaTitle: "About Engatuny",
    metaDescription:
      "Meet Engatuny Tours & Travel, a Uganda-focused operator shaped by the spirit of the lion.",
    content: {
      heroSlides: [
        slide(
          "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "About Engatuny",
          "A Uganda travel company shaped by the spirit of the lion.",
          "Our brand is rooted in courage, care, and the kind of grounded stewardship that helps travellers feel confidently held.",
        ),
        slide(
          "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Rooted in Uganda",
          "Travel built around people, place, and respect.",
          "We guide wildlife, cultural, and tailor-made journeys with thoughtful pacing and a strong sense of responsibility to the places we share.",
        ),
      ],
      heroImageUrl:
        "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      heroImagePath: "",
      featuredImageUrl:
        "https://images.pexels.com/photos/19820463/pexels-photo-19820463.jpeg?auto=compress&cs=tinysrgb&w=1400",
      featuredImagePath: "",
      heroEyebrow: "About Engatuny",
      heroTitle: "A Uganda travel company shaped by the spirit of the lion.",
      introParagraphs: [
        "Engatuny Tours & Travel creates Uganda journeys that feel confident, warm, and deeply rooted. The name Engatuny means lion, and that meaning matters to us. It speaks to courage, watchfulness, and a calm kind of leadership that protects the quality of the guest experience.",
        "We guide wildlife safaris, gorilla trekking routes, waterfall escapes, cultural journeys, and tailor-made travel across Uganda. Every itinerary is built with route logic, local knowledge, and the intention to help travellers feel the country rather than simply move through it.",
        "That is why our journeys feel both personal and well-held: the romance of travel is there, but it is supported by steady planning, honest pacing, and respect for the people and places that make Uganda unforgettable.",
      ],
      founderEyebrow: "Founder Commitment",
      founderTitle: "Karamoja is carried with pride in the way Engatuny travels.",
      founderParagraphs: [
        "Our founder holds Karamoja close to heart and uses Engatuny journeys to share its dignity, beauty, resilience, and living culture with travellers who want to engage with care.",
        "That commitment does not replace the wider Uganda story. It strengthens it. It ensures that when travellers head north, they encounter Karamoja as a living cultural landscape with beauty, dignity, and voices of its own.",
      ],
      valuesEyebrow: "Our Values",
      valuesTitle: "A company culture shaped by courage, respect, and warm stewardship.",
      values: ["Courage", "Respect", "Warmth", "Stewardship", "Authenticity"],
      servicesEyebrow: "Our Services",
      servicesTitle: "What we craft for travellers seeking the real Uganda.",
      services: [
        service(
          "L",
          "Wildlife Safaris",
          "Game drives, boat safaris, and high-impact park itineraries built around pacing, comfort, and strong guiding.",
        ),
        service(
          "G",
          "Gorilla Trekking",
          "Permits, route logic, and thoughtful support for one of Uganda's most powerful wildlife experiences.",
        ),
        service(
          "A",
          "Adventure and Hiking",
          "Waterfalls, rafting, escarpment walks, and active days that still feel well-held from start to finish.",
        ),
        service(
          "C",
          "Cultural Journeys",
          "Travel that treats community time with respect, context, and a genuine willingness to listen and learn.",
        ),
        service(
          "T",
          "Tailor-Made Routes",
          "Private journeys shaped around your timing, energy, accommodation style, and the places you most want to feel deeply.",
        ),
      ],
      reasonsEyebrow: "Why Travellers Choose Engatuny",
      reasonsTitle: "The details that turn first-time guests into returning advocates.",
      reasons: [
        "Travel design that balances wildlife, culture, and comfort without making the route feel overcrowded.",
        "Steady, human communication before and during the journey.",
        "A company identity that feels rooted in Uganda rather than imported onto it.",
        "A real commitment to showing Karamoja with dignity, beauty, and care.",
      ],
      ctaTitle: "Let us shape your Uganda story around what matters most to you.",
      ctaDescription:
        "Tell us the pace you want, the places calling you, and the level of comfort you prefer. We will take it from there.",
      ctaPrimaryLabel: "Start Planning",
      ctaPrimaryHref: "/contact",
      ctaSecondaryLabel: "See Our Tours",
      ctaSecondaryHref: "/tours",
    },
  },
  {
    slug: "tours",
    title: "Tours Landing Page",
    excerpt: "Tours page hero and browse-introduction content.",
    status: "published",
    metaTitle: "Tours",
    metaDescription:
      "Explore Uganda journeys with dedicated landing pages, detailed itineraries, and clear cultural and wildlife focus.",
    content: {
      heroSlides: [
        slide(
          "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Our journeys",
          "Tour pages built to show the route, mood, and meaning of each journey.",
          "Browse by duration, region, or travel style, then open any tour for its full landing page and detailed story.",
        ),
        slide(
          "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Signature Uganda routes",
          "Independent tour pages with clear detail and stronger storytelling.",
          "Each itinerary is listed clearly, then expanded into its own landing page so travellers can understand what fits them best.",
        ),
      ],
      heroImageUrl:
        "https://images.pexels.com/photos/34845589/pexels-photo-34845589.jpeg?auto=compress&cs=tinysrgb&w=1600",
      heroImagePath: "",
      heroEyebrow: "Our journeys",
      heroTitle: "Tour pages built to show the route, mood, and meaning of each journey.",
      heroDescription:
        "Browse by duration, region, or travel style, then open any tour for its full landing page and detailed story.",
      browseEyebrow: "Browse and compare",
      browseTitle: "Clear itineraries, strong visuals, and dedicated pages for every route.",
      browseDescription:
        "Each tour is listed here and also has its own page so travellers can understand the experience before they enquire.",
    },
  },
  {
    slug: "blog",
    title: "Blog Landing Page",
    excerpt: "Journal page hero and collection introduction.",
    status: "published",
    metaTitle: "Blog",
    metaDescription:
      "Travel stories, planning advice, and warm field notes from across Uganda's trails, forests, rivers, and hidden corners.",
    content: {
      heroSlides: [
        slide(
          "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Journal",
          "Stories, practical tips, and field notes from the trail.",
          "A clean collection of useful inspiration for travellers dreaming about Uganda.",
        ),
        slide(
          "https://images.pexels.com/photos/17443313/pexels-photo-17443313.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "From the road and the wild",
          "Ideas, planning notes, and stories gathered in the field.",
          "Read through gorilla trekking advice, Kidepo notes, waterfall escapes, and the quieter moments that shape memorable journeys.",
        ),
      ],
      heroEyebrow: "Journal",
      heroTitle: "Stories, practical tips, and field notes from the trail.",
      heroDescription:
        "A clean collection of useful inspiration for travellers dreaming about Uganda.",
    },
  },
  {
    slug: "contact",
    title: "Contact",
    excerpt: "Contact page hero copy and information-card labels.",
    status: "published",
    metaTitle: "Contact",
    metaDescription:
      "Reach Engatuny Tours & Travel to enquire about your ideal Uganda adventure, request a tailored itinerary, or chat on WhatsApp.",
    content: {
      heroSlides: [
        slide(
          "https://images.pexels.com/photos/15017212/pexels-photo-15017212.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Contact Us",
          "Tell us the kind of Uganda journey you want to feel.",
          "We will shape the route around your pace, interests, and comfort level. Keep it simple. Start with a message.",
        ),
        slide(
          "https://images.pexels.com/photos/18856023/pexels-photo-18856023.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "Start with a conversation",
          "Share your dates, style, and what is calling you most.",
          "Whether you want a custom safari, a culture-led route, or a short add-on, we can shape the right journey from there.",
        ),
      ],
      heroEyebrow: "Contact Us",
      heroTitle: "Tell us the kind of Uganda journey you want to feel.",
      heroDescription:
        "We will shape the route around your pace, interests, and comfort level. Keep it simple. Start with a message.",
      officeLabel: "Office",
      directLabel: "Direct",
      whatsAppLabel: "Chat on WhatsApp",
      mapEmbedUrl: "https://www.google.com/maps?q=Kampala%20Uganda&z=12&output=embed",
    },
  },
];

export const defaultPagesBySlug = Object.fromEntries(
  defaultPages.map((page) => [page.slug, page]),
) as Record<string, CmsPage>;
