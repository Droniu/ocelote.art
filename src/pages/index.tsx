import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { fetchAPI } from "@/lib/api";


export default function Home({ galleries }: any) {
  
  console.log(galleries)
  
  return <div className="p-4">
    <h1>ocelote.art</h1>
    <div className="flex h-full">
    </div>
    </div>;
}

export async function getStaticProps() {
  const res = await fetchAPI("/galleries");

  return {
    props: { galleries: res },
  }
}