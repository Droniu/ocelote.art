import { Asset, AssetLink } from "contentful";

// Our simplified version of an image asset.
// We don't need all the data that Contentful gives us.
export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// A function to transform a Contentful image asset
// into our own ContentImage object.
export function parseContentfulContentImage(
  asset?: Asset<undefined, string> | { sys: AssetLink }
): ContentImage | null {
  if (!asset) {
    return null;
  }

  if (!("fields" in asset)) {
    return null;
  }

  return {
    src: asset.fields.file?.url || "",
    alt: asset.fields.description || "",
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}

export type ImagePreset = "cover" | "gridItem" | "lightbox" | "thumbnail";

interface ImagePresetConfig {
  width: number;
  quality: number;
}

const presetConfigs: Record<ImagePreset, ImagePresetConfig> = {
  cover: { width: 1200, quality: 85 },
  gridItem: { width: 800, quality: 85 },
  lightbox: { width: 2400, quality: 90 },
  thumbnail: { width: 400, quality: 80 },
};

export function getOptimizedImageUrl(src: string, preset: ImagePreset): string {
  const config = presetConfigs[preset];
  const baseUrl = src.startsWith("//") ? `https:${src}` : src;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}w=${config.width}&fm=webp&q=${config.quality}`;
}
