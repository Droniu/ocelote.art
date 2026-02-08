"use client";

import { ContentImage } from "@/contentful/contentImage";
import { PhotoCard } from "./PhotoCard";

interface GalleryGridProps {
  photos: ContentImage[];
  onPhotoClick: (index: number) => void;
}

export function GalleryGrid({ photos, onPhotoClick }: GalleryGridProps) {
  return (
    <div className="px-4 pb-8 md:px-8 lg:px-16">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {photos.map((photo, index) => (
          <PhotoCard
            key={`${photo.src}-${index}`}
            photo={photo}
            index={index}
            onClick={() => onPhotoClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
