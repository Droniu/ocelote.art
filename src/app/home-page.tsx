"use client";
import { Gallery } from "@/contentful/galleries";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { MotionImage } from "@/components/motionImage";
export interface HomeProps {
  galleries: Gallery[];
}

export const Home = ({ galleries }: HomeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const yPos = useTransform(scrollYProgress, [0, 1], ["50% 100%", "50% 0%"]);

  return (
    <div
      ref={ref}
      className="overflow-y-scroll grid grid-cols-1 xl:grid-cols-2 xl:gap-16 xl:px-64 xl:mb-8"
    >
      {galleries.map((gallery) => {
        return (
          <div
            key={gallery.title}
            className="relative w-full h-auto aspect-square"
          >
            <MotionImage
              fill
              src={`https:${gallery.coverVertical?.src ?? ""}`}
              alt={gallery.title}
              style={{
                objectFit: "cover",
                objectPosition: yPos as any, // Some type mismatch but animation works
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-accent opacity-0 hover:opacity-60 duration-500">
              <h2 className="font-bold text-4xl opacity-100 text-opacity-100 text-white">
                {gallery?.title}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
