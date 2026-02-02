"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Gallery } from "@/contentful/galleries";
import { GalleryHeader } from "@/components/Gallery/GalleryHeader";
import { GalleryGrid } from "@/components/Gallery/GalleryGrid";
import { Lightbox } from "@/components/Gallery/Lightbox";

interface GalleryViewProps {
  gallery: Gallery;
}

export function GalleryView({ gallery }: GalleryViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const photoParam = searchParams.get("photo");
  const initialIndex = photoParam ? parseInt(photoParam, 10) - 1 : null;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(
    initialIndex !== null && initialIndex >= 0 && initialIndex < gallery.photos.length
      ? initialIndex
      : null
  );

  const openLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index);
      router.replace(`?photo=${index + 1}`, { scroll: false });
    },
    [router]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    router.replace("?", { scroll: false });
  }, [router]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + 1) % gallery.photos.length;
    setLightboxIndex(nextIndex);
    router.replace(`?photo=${nextIndex + 1}`, { scroll: false });
  }, [lightboxIndex, gallery.photos.length, router]);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    const prevIndex = (lightboxIndex - 1 + gallery.photos.length) % gallery.photos.length;
    setLightboxIndex(prevIndex);
    router.replace(`?photo=${prevIndex + 1}`, { scroll: false });
  }, [lightboxIndex, gallery.photos.length, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goToNext, goToPrev]);

  return (
    <LazyMotion features={domAnimation}>
      <main className="h-dvh overflow-y-auto bg-black text-white touch-auto">
        <GalleryHeader
          title={gallery.title}
          photoCount={gallery.photos.length}
          description={gallery.description}
        />
        <GalleryGrid photos={gallery.photos} onPhotoClick={openLightbox} />
        {lightboxIndex !== null && (
          <Lightbox
            photos={gallery.photos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={goToNext}
            onPrev={goToPrev}
          />
        )}
      </main>
    </LazyMotion>
  );
}
