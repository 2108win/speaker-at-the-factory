"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

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

type Social = {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
};
const dataSocial: Social[] = [
  {
    title: "Facebook",
    href: "/#",
    icon: "facebook",
  },
  {
    title: "Instagram",
    href: "/#",
    icon: "instagram",
  },
  {
    title: "Youtube",
    href: "/#",
    icon: "youtube",
  },
];

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="relative z-[1] w-full bg-black/60 bg-dot-black/[0.2] dark:bg-white/60 dark:bg-dot-white/[0.2] ">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          <div className="text-2xl font-bold text-white dark:text-black md:col-span-2 md:row-span-2 lg:text-3xl">
            <Logo />
            <p className="mt-6 text-balance text-base font-normal">
              {isClient && t("general_footer.description")}
            </p>
            <div className="mt-6 flex w-fit items-center gap-2 rounded-3xl bg-neutral-50/30 p-[2px] text-black dark:bg-slate-950/30 dark:text-white">
              <Input
                placeholder={t("general_placeholder.email")}
                className="max-w-sm rounded-3xl border-none bg-transparent font-medium outline-none placeholder:text-neutral-200"
              />
              <Button className="relative inline-flex overflow-hidden rounded-3xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1c003d_0%,#2630e8_50%,#fcf9ff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#050959_50%,#240050_100%)]" />
                <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-50 px-10 py-3 text-center font-medium text-black dark:bg-black dark:text-white lg:text-lg">
                  {t("general_footer.send")}
                </span>
              </Button>
            </div>
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
      <Separator />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <span className="text-sm text-neutral-200 dark:text-slate-800">
            {t("general_footer.copy-by")}{" "}
            <Link
              href="https://www.instagram.com/win_lax/"
              className="font-semibold text-white hover:underline dark:text-black"
            >
              @win_lax
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.instagram.com/win_lax/"
              className="font-semibold text-white hover:underline dark:text-black"
            >
              @loataixuong2024
            </Link>
            . <br />
            {t("general_footer.all-right-reserved")}
          </span>
          <div className="flex items-center gap-2">
            {dataSocial.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-neutral-200 p-1 dark:border-slate-800">
                  <Icon
                    name={item.icon}
                    strokeWidth={1}
                    className="h-8 w-8 text-neutral-200 dark:text-slate-800"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
