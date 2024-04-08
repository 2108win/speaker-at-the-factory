import ListBlog from "@/components/page/blogs/ListBlog";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Blogs - Loa tại xưởng",
    template: "%s - Loa tại xưởng",
  },
  description: "Blogs - Loa tại xưởng",
  openGraph: {
    images: [
      {
        url: `${process.env.CLIENT_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Loa tại xưởng",
      },
    ],
  },
};

export default function Blogs() {
  return (
    <div className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] max-w-7xl items-center gap-16 px-4 lg:grid-cols-2 lg:px-8">
      <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-center text-5xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:from-neutral-700 md:to-neutral-100 md:text-7xl">
        Loa Tại Xưởng <br /> Blogs
      </div>
      <ListBlog />
    </div>
  );
}
