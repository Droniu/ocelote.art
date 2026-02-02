import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchGalleries, fetchGalleryBySlug } from "@/contentful/galleries";
import { GalleryView } from "./gallery-view";

export const revalidate = 3600;

interface GalleryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const galleries = await fetchGalleries();
  return galleries.map((gallery) => ({
    slug: gallery.slug,
  }));
}

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await fetchGalleryBySlug(slug);

  if (!gallery) {
    return {
      title: "Galeria nie znaleziona",
    };
  }

  return {
    title: gallery.title,
    description: gallery.description || `Galeria zdjęć: ${gallery.title}`,
    openGraph: {
      title: gallery.title,
      description: gallery.description || `Galeria zdjęć: ${gallery.title}`,
      images: gallery.coverHorizontal
        ? [`https:${gallery.coverHorizontal.src}?w=1200&fm=webp`]
        : undefined,
    },
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = await fetchGalleryBySlug(slug);

  if (!gallery) {
    notFound();
  }

  return (
    <Suspense>
      <GalleryView gallery={gallery} />
    </Suspense>
  );
}
