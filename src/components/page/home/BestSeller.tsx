"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const dataProduct = {
  price: "5.500.000 VNĐ",
  title: "Loa xách tay",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
  image: "/product_1.png",
};

const BestSeller = () => {
  const { t } = useTranslation();
  return (
    <div className="z-[1] mx-auto mt-12 h-full max-w-7xl px-4 md:mt-16 lg:mt-20">
      {dataProduct && (
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="lg:h-[800px] relative h-[400px] w-full rounded-lg md:h-[600px]">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={dataProduct.image}
              alt={dataProduct.title}
              width={400}
              height={600}
            />
          </div>
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <div className="bg-gradient-to-l from-neutral-950 via-neutral-500 via-80% bg-clip-text text-5xl font-bold text-transparent dark:from-neutral-50 lg:text-7xl">
              {dataProduct.price}
            </div>
            <div className="bg-gradient-to-l from-slate-900 via-neutral-500 via-80% bg-clip-text text-4xl text-transparent dark:from-neutral-50 lg:text-6xl">
              {dataProduct.title}
            </div>
            <div className="py-4 text-base font-normal text-slate-600 dark:text-neutral-200 lg:text-xl">
              {dataProduct.description}...
              <Link
                href={"#"}
                className="!text-slate-950 underline hover:text-neutral-50 dark:!text-neutral-50"
              >
                read more
              </Link>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/10 px-8 py-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
                  {t("hero_buy_now")}
                </span>
              </button>
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 px-8 py-4 text-lg font-medium text-slate-950 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-black dark:text-neutral-50 hover:dark:bg-black/70">
                  {t("hero_add_to_cart")}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
