"use client";
import { Gallery } from "@/contentful/galleries";
import {
  LazyMotion,
  domAnimation,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef, useMemo } from "react";
import React from "react";
import Link from "next/link";
import { MotionImage } from "@/components/motionImage";

export interface HomeProps {
  galleries: Gallery[];
}

export const Home = ({ galleries }: HomeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const yPos = useTransform(scrollYProgress, [0, 1], ["50% 100%", "50% 0%"]);

  const animationProps = useMemo(
    () =>
      prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, scale: 0.8 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          },
    [prefersReducedMotion]
  );

  return (
    <LazyMotion features={domAnimation}>
      <main
        ref={ref}
        className="overflow-y-scroll grid grid-cols-1 xl:grid-cols-2 xl:gap-16 xl:px-64 xl:mb-8"
      >
        <h1 className="sr-only">Portfolio fotograficzne ocelote.art</h1>
        {galleries.map((gallery, ix) => {
          return (
            <Link
              key={gallery.id}
              href={`/gallery/${gallery.slug}`}
              className="relative w-full h-auto aspect-square block"
            >
              <MotionImage
                fill
                priority={ix === 0}
                sizes="(min-width: 1280px) calc(50vw - 288px), 100vw"
                src={`https:${gallery.coverVertical?.src ?? ""}`}
                alt={gallery.title}
                style={{
                  objectFit: "cover",
                  objectPosition: yPos as MotionValue<string>,
                }}
                {...(ix > 1 ? animationProps : {})}
              />
              <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-accent opacity-0 hover:opacity-60 duration-500">
                <h2 className="font-bold text-2xl md:text-4xl opacity-100 text-opacity-100 text-white text-center">
                  {gallery?.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </main>
    </LazyMotion>
  );
};
