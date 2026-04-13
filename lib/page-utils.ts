import type { CmsPage, PageContentObject, PageContentValue } from "@/types/content";

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

export function getPageObjectList(
  page: CmsPage | null,
  key: string,
  fallback: PageContentObject[],
) {
  const value = page?.content?.[key];
  return Array.isArray(value) &&
    value.every((item) => item && typeof item === "object" && !Array.isArray(item))
    ? (value as PageContentObject[])
    : fallback;
}

export function getPageValue<T extends PageContentValue>(
  page: CmsPage | null,
  key: string,
  fallback: T,
) {
  const value = page?.content?.[key];
  return (value as T | undefined) ?? fallback;
}
