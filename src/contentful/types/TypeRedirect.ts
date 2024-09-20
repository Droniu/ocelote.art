import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeRedirectFields {
    path: EntryFieldTypes.Symbol;
    url: EntryFieldTypes.Symbol;
}

export type TypeRedirectSkeleton = EntrySkeletonType<TypeRedirectFields, "redirect">;
export type TypeRedirect<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRedirectSkeleton, Modifiers, Locales>;
