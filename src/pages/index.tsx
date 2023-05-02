import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { GalleryListResponse } from "@/lib/schema";
import { getStrapiURL } from "@/lib/api";
// import { fetchAPI } from "@/lib/api";
import { Home as HomeComponent } from "@/components/Home/Home";

export default function Home({ data, meta }: GalleryListResponse) {
  if (!data) {
    return;
  }
  return <HomeComponent galleries={data} />
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:1337/api/galleries?populate=*");
  const galleries = await res.json();
  console.log(galleries)
  return {
    props: galleries,
  }
}