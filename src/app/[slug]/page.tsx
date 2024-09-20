import { fetchRedirects } from "@/contentful/redirects";
import { notFound, redirect } from "next/navigation";

export default async function DynamicRedirect({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const redirects = await fetchRedirects();

  const foundRedirect = redirects.find((r) => r.path.replace("/", "") === slug);

  if (foundRedirect) {
    redirect(foundRedirect.url);
  } else {
    return notFound();
  }
}
