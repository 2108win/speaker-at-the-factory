"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Hero = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className="relative z-[1] mx-auto -mt-12 grid min-h-[calc(100dvh-104px)] max-w-7xl grid-cols-1 items-center gap-6 px-8 md:-mt-16 lg:-mt-20 lg:grid-cols-2">
      <div className="z-10 flex flex-col gap-4 text-center lg:text-left">
        <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-5xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:from-neutral-700 md:to-neutral-100 md:text-7xl">
          {t("hero_title")} giá như ở nhà
        </div>
        <div className="py-4 text-base font-medium dark:text-neutral-200 md:text-xl md:text-neutral-200">
          {t("hero_subtitle")}
        </div>
        <div className="mx-auto mt-8 lg:mx-0">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-slate-950/70">
              {t("hero_explore")}
            </span>
          </button>
        </div>
      </div>
      <div className="z-10 flex h-full items-center justify-center">
        <div className="relative h-full max-h-[400px]">
          <Image
            className="h-full w-full object-cover"
            src="/hero_product.png"
            alt="hero_image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
