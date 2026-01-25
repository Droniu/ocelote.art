import { fetchGalleries } from "@/contentful/galleries";
import { Home } from "./home-page";

export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const galleries = await fetchGalleries();
  return <Home galleries={galleries} />;
}
