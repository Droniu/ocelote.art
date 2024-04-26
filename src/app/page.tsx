// Import your Client Component
import { fetchGalleries } from "@/contentful/galleries";
import HomePage from "./home-page";

export default async function Page() {
  const galleries = await fetchGalleries();
  return <HomePage items={galleries} />;
}
