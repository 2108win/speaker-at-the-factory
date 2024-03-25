"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Hero = (props: Props) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
      }}
      className="relative grid h-[calc(100dvh-264px)] max-w-7xl grid-cols-1 items-center gap-6 px-4 lg:grid-cols-2"
    >
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-5xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-7xl">
          {t("hero_title")} giá như ở nhà
        </div>
        <div className="py-4 text-base font-medium dark:text-neutral-200 md:text-xl">
          {t("hero_subtitle")}
        </div>
        <div className="mx-auto mt-8 lg:mx-0">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2 bg-black/30 px-8 py-4 backdrop-blur-lg dark:bg-neutral-50/20"
          >
            <Rocket className="h-6 w-6" />
            <span className="text-lg">{t("hero_explore")}</span>
          </HoverBorderGradient>
        </div>
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="relative h-full max-h-[600px]">
          <Image
            className="h-full w-full object-cover"
            src="/hero_product.png"
            alt="hero_image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
