export type Difficulty = "Easy" | "Moderate" | "Active";

export type Tour = {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  heroDescription: string;
  overview: string;
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
  routeDetails: string;
  itinerary: string[];
  highlights: string[];
  idealFor: string[];
  inclusions: string[];
  accommodations: string[];
  landscapeStory: string;
  cultureStory: string;
  wildlifeStory: string;
};

export type Testimonial = {
  id?: string;
  name: string;
  homeCountry: string;
  quote: string;
  trip: string;
};

export type BlogPost = {
  id?: string;
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
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  logoPath: string;
  brandMeaning: string;
  brandStory: string;
  founderKaramojaCommitment: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  preferredTour: string | null;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

export type PageContentObject = Record<string, string>;

export type PageContentValue =
  | string
  | string[]
  | number
  | boolean
  | null
  | PageContentObject
  | PageContentObject[];

export type PageContent = Record<string, PageContentValue>;

export type CmsPage = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  status: "draft" | "published" | "archived";
  metaTitle: string;
  metaDescription: string;
  content: PageContent;
};
