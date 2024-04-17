import React from "react";
import { Product } from "@/interfaces/product";
import ProductList from "@/components/pages/Products/ProductList";
import BannerJoin from "@/components/BannerJoin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm",
};

export default function Products() {
  return (
    <>
      <div className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
        <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-center text-5xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:from-neutral-700 md:to-neutral-100 md:text-7xl">
          Loa Tại Xưởng <br /> Product
        </div>

        <ProductList />
      </div>
      <BannerJoin />
    </>
  );
}
