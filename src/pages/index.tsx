import React from "react";
import { Home as HomeComponent } from "@/components/Home/Home";
import { Navbar } from "@/components/Navbar/Navbar";
import { client } from "@/lib/api";

export default function Home({ items }: any) {
  if (!items) {
    return;
  }
  return (
    <>
      <Navbar />
      <HomeComponent galleries={items} />
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
