"use client";

import { Home } from "@/components/Home/Home";
import { HomeMobile } from "@/components/Home/HomeMobile";
import { Gallery } from "@/contentful/galleries";
import { useWindowSize } from "usehooks-ts";

// This is a Client Component (same as components in the `pages` directory)
// It receives data as props, has access to state and effects, and is
// prerendered on the server during the initial page load.

interface HomePageProps {
  items: Gallery[];
}

export default function HomePage({ items }: HomePageProps) {
  const { width } = useWindowSize();

  if (!items) {
    return null;
  }
  return (
    <HomeMobile galleries={items} />
    // <>
    //   {width < 1024 ? (
    //     <HomeMobile galleries={items} />
    //   ) : (
    //     <Home galleries={items} />
    //   )}
    // </>
  );
}
