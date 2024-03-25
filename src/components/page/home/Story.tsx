"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const dataStory = [
  {
    title: "Chuyện làm loa",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
    image: "/story_1.jpg",
  },
  {
    title: "Chuyện công ty",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
    image: "/story_2.jpg",
  },
];

const Story = () => {
  const { t } = useTranslation();
  return (
    <div className="relative z-[1] mx-auto max-w-7xl px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {dataStory.map((story, index) => (
          <div
            key={index}
            className="relative h-[400px] w-full overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-slate-900/10 after:backdrop-blur-[2px] after:content-[''] md:h-[600px]"
          >
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={story.image}
              alt={story.title}
              width={400}
              height={600}
            />
            <div className="absolute left-0 top-0 z-10 flex flex-col gap-6 p-4 md:p-10">
              <h3 className="text-3xl font-semibold text-neutral-50 lg:text-5xl">
                {story.title}
              </h3>
              <span className="text-base text-neutral-50 lg:text-lg">
                {story.description}
              </span>
              <button className="relative inline-flex h-12 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_5s_ease_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/30 px-8 py-4 text-lg font-medium text-white backdrop-blur-lg dark:bg-neutral-50/20">
                  {t("hero_explore")}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
