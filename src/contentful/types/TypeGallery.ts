import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeGalleryFields {
    title: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    coverVertical?: EntryFieldTypes.AssetLink;
    coverHorizontal?: EntryFieldTypes.AssetLink;
}

export type TypeGallerySkeleton = EntrySkeletonType<TypeGalleryFields, "gallery">;
export type TypeGallery<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeGallerySkeleton, Modifiers, Locales>;
