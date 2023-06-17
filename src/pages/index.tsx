import React from "react";
import { Home as HomeComponent } from "@/components/Home/Home";
import { Navbar } from "@/components/Navbar/Navbar";
import { client } from "@/lib/api";
import { useWindowSize } from "usehooks-ts";
import { HomeMobile } from "@/components/Home/HomeMobile";

export default function Home({ items }: any) {
  
  const { width } = useWindowSize();
  console.log(width)

  if (!items) {
    return;
  }
  return (
    <>
      <Navbar />
      {width < 1024 ? <HomeMobile galleries={items} /> : <HomeComponent galleries={items} />}
    </>
  );
}

export async function getStaticProps() {
  const galleries = await client.getEntries({
    content_type: "gallery",
  });
  return {
    props: galleries,
  };
}
