import { Entry } from "contentful";
import contentfulClient from "./client";
import { ContentImage, parseContentfulContentImage } from "./contentImage";
import { TypeGallerySkeleton } from "./types";

type GalleryEntry = Entry<TypeGallerySkeleton, undefined, string>;

export interface Gallery {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  photos: ContentImage[];
  coverVertical: ContentImage | null;
  coverHorizontal: ContentImage | null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseCfGalleries(
  gallery?: GalleryEntry | null
): Gallery | null {
  if (!gallery) {
    return null;
  }

  const photos = (gallery.fields.photos ?? [])
    .map((photo) => parseContentfulContentImage(photo))
    .filter((photo): photo is ContentImage => photo !== null);

  return {
    id: gallery.sys.id,
    slug: slugify(gallery.fields.title),
    title: gallery.fields.title,
    description: gallery.fields.description || null,
    photos,
    coverVertical: parseContentfulContentImage(gallery.fields.coverVertical),
    coverHorizontal: parseContentfulContentImage(
      gallery.fields.coverHorizontal
    ),
  };
}

export async function fetchGalleries(): Promise<Gallery[]> {
  try {
    const cf = contentfulClient({ preview: false });
    const galleriesResult = await cf.getEntries<TypeGallerySkeleton>({
      content_type: "gallery",
      order: ["fields.title"],
    });
    return galleriesResult.items
      .map((gallery) => parseCfGalleries(gallery))
      .filter((gallery): gallery is Gallery => gallery !== null);
  } catch (error) {
    console.error("Failed to fetch galleries from Contentful:", error);
    return [];
  }
}

export async function fetchGalleryBySlug(
  slug: string
): Promise<Gallery | null> {
  const galleries = await fetchGalleries();
  return galleries.find((gallery) => gallery.slug === slug) ?? null;
}
