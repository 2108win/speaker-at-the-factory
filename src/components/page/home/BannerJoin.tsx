"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const BannerJoin = () => {
  const { t } = useTranslation();
  return (
    <div className="relative z-[1] mt-12 h-full w-full md:mt-16 lg:mt-20 lg:aspect-[3/1]">
      <Image
        className="absolute z-[-1] h-full w-full object-cover object-bottom"
        src={"/bg_bannerJoin.jpg"}
        alt="bg_bannerJoin"
        fill
        sizes="100vw"
      />
      <div className="absolute inset-0 z-[2] bg-black/30 dark:bg-black/90"></div>
      <div className="mx-auto flex h-full w-full max-w-7xl items-center p-4 py-10 lg:p-8">
        <div className="z-10 flex w-[80%] flex-col gap-4 text-left">
          <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-4xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-6xl">
            {t("home_join.title")}
          </div>
          <button className="relative inline-flex h-12 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-slate-950/70">
              {t("general_join")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerJoin;
