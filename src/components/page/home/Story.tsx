"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const Story = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto min-h-svh max-w-7xl px-4">
      <div className="grid h-[800px] grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-full w-full rounded-lg">
          <Image
            className="h-full w-full rounded-lg object-cover"
            src="/story_1.jpg"
            alt="story_image"
            width={400}
            height={800}
          />
          <div className="absolute left-0 top-0 flex flex-col gap-6 p-4 md:p-10">
            <h3 className="text-5xl font-semibold text-neutral-50">
              Chuyện làm loa
            </h3>
            <span className="text-lg text-neutral-50">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              corrupti soluta minima aliquam, animi earum rem vitae repellat
              obcaecati quaerat ipsam unde laudantium adipisci dolores.
              Praesentium possimus expedita facilis ut.
            </span>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-black/30 px-8 py-4 backdrop-blur-lg dark:bg-neutral-50/20"
            >
              <span className="text-lg">{t("hero_explore")}</span>
            </HoverBorderGradient>
          </div>
        </div>
        <div className="relative h-full w-full rounded-lg">
          <Image
            className="h-full w-full rounded-lg object-cover"
            src="/story_1.jpg"
            alt="story_image"
            width={400}
            height={800}
          />
          <div className="absolute left-0 top-0 flex flex-col gap-6 p-4 md:p-10">
            <h3 className="text-5xl font-semibold text-neutral-50">
              Chuyện làm loa
            </h3>
            <span className="text-lg text-neutral-50">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              corrupti soluta minima aliquam, animi earum rem vitae repellat
              obcaecati quaerat ipsam unde laudantium adipisci dolores.
              Praesentium possimus expedita facilis ut.
            </span>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-black/30 px-8 py-4 backdrop-blur-lg dark:bg-neutral-50/20"
            >
              <span className="text-lg">{t("hero_explore")}</span>
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
