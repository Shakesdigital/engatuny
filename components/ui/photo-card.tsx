import type { GalleryPhoto } from "@/types/content";

export function PhotoCard({
  photo,
  priority = false,
}: {
  photo: GalleryPhoto;
  priority?: boolean;
}) {
  return (
    <figure className="group overflow-hidden rounded-[1.6rem] bg-sand-100">
      <img
        src={`${photo.src}?auto=compress&cs=tinysrgb&w=900`}
        alt={photo.alt}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ height: `${photo.height}px` }}
        loading={priority ? "eager" : "lazy"}
      />
      <figcaption className="bg-white px-5 py-4 text-sm text-charcoal-600">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
