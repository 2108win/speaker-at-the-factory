"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const dataFooter = [
  {
    head: "general_about_us",
    items: [
      {
        title: "general_contact",
        href: "/contact",
      },
      {
        title: "general_career",
        href: "/career",
      },
      {
        title: "general_blog",
        href: "/blog",
      },
    ],
  },
  {
    head: "general_support",
    items: [
      {
        title: "general_faq",
        href: "/faq",
      },
      {
        title: "general_shipping",
        href: "/shipping",
      },
      {
        title: "general_return",
        href: "/return",
      },
    ],
  },
  {
    head: "general_social",
    items: [
      {
        title: "Facebook",
        href: "/#",
      },
      {
        title: "Instagram",
        href: "/#",
      },
      {
        title: "Youtube",
        href: "/#",
      },
    ],
  },
];

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="relative z-[1] w-full bg-black/80 bg-dot-black/[0.2] dark:bg-white/80 dark:bg-dot-white/[0.2] ">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          <div className="text-2xl font-bold text-neutral-50 dark:text-neutral-900 md:col-span-2 md:row-span-2 lg:text-3xl">
            <Logo />
            <p className="mt-6 text-balance text-base font-normal">
              {isClient && t("general_footer.description")}
            </p>
          </div>
          {dataFooter.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-neutral-50 dark:text-neutral-900">
                {isClient && t(item.head)}
              </h3>
              <ul className="mt-6 space-y-2">
                {item.items.map((item, index) => (
                  <li key={"items" + index}>
                    <Link
                      href={item.href}
                      className="text-neutral-50 underline-offset-2  transition-colors duration-200 ease-in-out hover:text-neutral-100 hover:underline dark:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      {isClient && t(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
