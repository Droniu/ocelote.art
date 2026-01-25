import { fetchRedirects } from "@/contentful/redirects";
import { notFound, redirect } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

export default async function DynamicRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const redirects = await fetchRedirects();

  const foundRedirect = redirects.find((r) => r.path.replace("/", "") === slug);

  if (foundRedirect) {
    redirect(foundRedirect.url);
  } else {
    return notFound();
  }
}
