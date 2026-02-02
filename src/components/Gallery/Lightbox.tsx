"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ContentImage, getOptimizedImageUrl } from "@/contentful/contentImage";

interface LightboxProps {
  photos: ContentImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const currentPhoto = photos[currentIndex];

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
      setShowSwipeHint(false);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <m.div
      variants={prefersReducedMotion ? undefined : overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Zamknij"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Photo counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Previous button - desktop only */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors hidden md:block"
        aria-label="Poprzednie zdjęcie"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button - desktop only */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors hidden md:block"
        aria-label="Następne zdjęcie"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Main image */}
      <AnimatePresence mode="wait">
        <m.div
          key={currentIndex}
          variants={prefersReducedMotion ? undefined : imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={getOptimizedImageUrl(currentPhoto.src, "lightbox")}
            alt={currentPhoto.alt}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            priority
          />
        </m.div>
      </AnimatePresence>

      {/* Swipe hint - mobile only */}
      <AnimatePresence>
        {showSwipeHint && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm md:hidden"
          >
            Przesuń, aby zobaczyć więcej
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
