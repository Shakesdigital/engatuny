import type {
  CmsPage,
  GalleryPhoto,
  PageContentObject,
  PageContentValue,
} from "@/types/content";

export type HeroSlide = {
  imageUrl: string;
  imagePath?: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export function getPageText(page: CmsPage | null, key: string, fallback: string) {
  const value = page?.content?.[key];
  return typeof value === "string" ? value : fallback;
}

export function getPageList(page: CmsPage | null, key: string, fallback: string[]) {
  const value = page?.content?.[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? (value as string[])
    : fallback;
}

export function getPageObjectList<T extends PageContentObject>(
  page: CmsPage | null,
  key: string,
  fallback: T[],
): T[] {
  const value = page?.content?.[key];
  return Array.isArray(value) &&
    value.every((item) => item && typeof item === "object" && !Array.isArray(item))
    ? (value as T[])
    : fallback;
}

export function getPageGalleryPhotos(
  page: CmsPage | null,
  key: string,
  fallback: GalleryPhoto[],
) {
  const value = page?.content?.[key];

  if (!Array.isArray(value)) {
    return fallback;
  }

  const photos = value
    .filter((item) => item && typeof item === "object" && !Array.isArray(item))
    .map((item) => {
      const record = item as Record<string, unknown>;
      const heightValue =
        typeof record.height === "number"
          ? record.height
          : Number.parseInt(String(record.height ?? ""), 10);

      return {
        src: typeof record.src === "string" ? record.src : "",
        imagePath: typeof record.imagePath === "string" ? record.imagePath : "",
        alt: typeof record.alt === "string" ? record.alt : "",
        caption: typeof record.caption === "string" ? record.caption : "",
        height: Number.isFinite(heightValue) && heightValue > 0 ? heightValue : 420,
      };
    })
    .filter((photo) => photo.src);

  return photos.length ? photos : fallback;
}

export function getPageValue<T extends PageContentValue>(
  page: CmsPage | null,
  key: string,
  fallback: T,
) {
  const value = page?.content?.[key];
  return (value as T | undefined) ?? fallback;
}

export function getPageHeroSlides(page: CmsPage | null, fallback: HeroSlide[]) {
  const value = page?.content?.heroSlides;

  if (!Array.isArray(value)) {
    return fallback;
  }

  const slides = value
    .filter((item) => item && typeof item === "object" && !Array.isArray(item))
    .map((item) => {
      const record = item as Record<string, unknown>;
      return {
        imageUrl: typeof record.imageUrl === "string" ? record.imageUrl : "",
        imagePath: typeof record.imagePath === "string" ? record.imagePath : "",
        eyebrow: typeof record.eyebrow === "string" ? record.eyebrow : "",
        title: typeof record.title === "string" ? record.title : "",
        description: typeof record.description === "string" ? record.description : "",
        primaryCtaLabel:
          typeof record.primaryCtaLabel === "string" ? record.primaryCtaLabel : "",
        primaryCtaHref: typeof record.primaryCtaHref === "string" ? record.primaryCtaHref : "",
        secondaryCtaLabel:
          typeof record.secondaryCtaLabel === "string" ? record.secondaryCtaLabel : "",
        secondaryCtaHref:
          typeof record.secondaryCtaHref === "string" ? record.secondaryCtaHref : "",
      };
    })
    .filter((slide) => slide.imageUrl && slide.title);

  return slides.length ? slides : fallback;
}
