"use client";
import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const dataFooter = [
  {
    head: "Về chúng tôi",
    items: [
      {
        title: "Liên hệ",
        href: "/contact",
      },
      {
        title: "Blogs",
        href: "/blogs",
      },
    ],
  },
  {
    head: "Hỗ trợ",
    items: [
      {
        title: "Vận chuyển",
        href: "/shipping",
      },
      {
        title: "Hoàn trả",
        href: "/return",
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
  return (
    <div className="relative z-[1] w-full bg-black/60 bg-dot-black/[0.2] dark:bg-white/60 dark:bg-dot-white/[0.2]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          <div className="text-2xl font-bold text-white dark:text-black md:col-span-3 md:row-span-2 lg:text-3xl">
            <Logo />
            <p className="mt-6 text-balance text-base font-normal">
              Đồng điệu với những tâm hồn trên con đường trưởng thành, Loa Tại Xưởng luôn lắng nghe
              những âm thanh từ những người bạn kể về sản phẩm, và cả những câu chuyện trong đời mỗi
              con người. Đó là điều Loa Tại Xưởng luôn nỗ lực hướng đến.
            </p>
            <div className="mt-6 flex w-fit items-center gap-2 rounded-3xl bg-neutral-50/30 p-[2px] text-black dark:bg-slate-950/30 dark:text-white">
              <Input
                placeholder="Email của bạn"
                className="max-w-sm rounded-3xl border-none bg-transparent font-medium outline-none placeholder:text-neutral-200"
              />
              <Button className="relative inline-flex overflow-hidden rounded-3xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1c003d_0%,#2630e8_50%,#fcf9ff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#050959_50%,#240050_100%)]" />
                <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-50 px-10 py-3 text-center font-medium text-black dark:bg-black dark:text-white lg:text-lg">
                  Gửi
                </span>
              </Button>
            </div>
          </div>
          {dataFooter.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-neutral-50 dark:text-neutral-900">
                {item.head}
              </h3>
              <ul className="mt-6 space-y-2">
                {item.items.map((item, index) => (
                  <li key={"items" + index}>
                    <Link
                      href={item.href}
                      className="text-neutral-50 underline-offset-2  transition-colors duration-200 ease-in-out hover:text-neutral-100 hover:underline dark:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      {item.title}
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
            Bản quyền bởi{" "}
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
            Bảo lưu mọi quyền.
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
