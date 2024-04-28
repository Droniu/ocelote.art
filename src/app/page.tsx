// Import your Client Component
import { fetchGalleries } from "@/contentful/galleries";
import { Home } from "./home-page";

export default async function Page() {
  const galleries = await fetchGalleries();
  return <Home galleries={galleries} />;
}
