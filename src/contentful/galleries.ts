import { Entry } from "contentful";
import { parse } from "path";
import contentfulClient from "./client";
import { ContentImage, parseContentfulContentImage } from "./contentImage";
import { TypeGallerySkeleton } from "./types";

type GalleryEntry = Entry<TypeGallerySkeleton, undefined, string>;

export interface Gallery {
  title: string;
  description: string | null;
  coverVertical: ContentImage | null;
  coverHorizontal: ContentImage | null;
}

export function parseCfGalleries(
  gallery?: GalleryEntry | null
): Gallery | null {
  if (!gallery) {
    return null;
  }
  return {
    title: gallery.fields.title,
    description: gallery.fields.description || null,
    coverVertical: parseContentfulContentImage(gallery.fields.coverVertical),
    coverHorizontal: parseContentfulContentImage(
      gallery.fields.coverHorizontal
    ),
  };
}

export async function fetchGalleries(): Promise<Gallery[]> {
  const cf = contentfulClient({ preview: false });
  const galleriesResult = await cf.getEntries<TypeGallerySkeleton>({
    content_type: "gallery",
    order: ["fields.title"],
  });
  return galleriesResult.items.map(
    (gallery) => parseCfGalleries(gallery) as Gallery
  );
}
