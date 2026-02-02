"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ContentImage, getOptimizedImageUrl } from "@/contentful/contentImage";

interface PhotoCardProps {
  photo: ContentImage;
  index: number;
  onClick: () => void;
}

export function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.05,
      },
    },
  };

  return (
    <m.button
      variants={prefersReducedMotion ? undefined : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
      className="block w-full mb-4 overflow-hidden rounded-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
      aria-label={photo.alt || `Otwórz zdjęcie ${index + 1}`}
    >
      <div className="relative overflow-hidden">
        <Image
          src={getOptimizedImageUrl(photo.src, "gridItem")}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>
    </m.button>
  );
}
