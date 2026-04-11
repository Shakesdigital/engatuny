export type Difficulty = "Easy" | "Moderate" | "Active";

export type Tour = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: string;
  duration: string;
  durationDays: number;
  region: string;
  type: string;
  difficulty: Difficulty;
  maxTravellers: number;
  image: string;
  imageAlt: string;
  enquirySubject: string;
  itinerary: string[];
  highlights: string[];
};

export type Testimonial = {
  name: string;
  homeCountry: string;
  quote: string;
  trip: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  content: string[];
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  height: number;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsApp: string;
  office: string;
};
