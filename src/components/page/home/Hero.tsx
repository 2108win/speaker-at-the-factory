"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Hero = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="text-center text-3xl font-bold uppercase dark:text-white md:text-7xl">
          {t("hero_title")}
        </div>
        <div className="py-4 text-base font-extralight uppercase dark:text-neutral-200 md:text-3xl">
          {t("hero_subtitle")}
        </div>
        <button className="w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
          {t("hero_explore")}
        </button>
      </motion.div>
    </AuroraBackground>
  );
};

export default Hero;
