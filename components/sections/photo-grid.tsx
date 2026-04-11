import { PhotoCard } from "@/components/ui/photo-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { GalleryPhoto } from "@/types/content";

type PhotoGridProps = {
  eyebrow: string;
  title: string;
  photos: GalleryPhoto[];
};

export function PhotoGrid({ eyebrow, title, photos }: PhotoGridProps) {
  return (
    <section className="section bg-white">
      <div className="layout">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <PhotoCard key={photo.src} photo={photo} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
