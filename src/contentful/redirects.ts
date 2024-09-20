import contentfulClient from "./client";
import { TypeRedirectSkeleton } from "./types";

interface Redirect {
  path: string;
  url: string;
}

export async function fetchRedirects(): Promise<Redirect[]> {
  const cf = contentfulClient({ preview: false });
  const redirectsResult = await cf.getEntries<TypeRedirectSkeleton>({
    content_type: "redirect",
    order: ["fields.path"],
  });
  return redirectsResult.items.map((item) => ({
    path: item.fields.path,
    url: item.fields.url,
  }));
}
