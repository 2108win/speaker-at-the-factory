"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../LanguageChanger";
import { Menu } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { usePathname } from "next/navigation";

type Props = {};

const navItems = [
  {
    title: "general_home",
    href: "/",
  },
  {
    title: "general_products",
    href: "/products",
    items: [
      {
        title: "Loa tự làm",
        href: "/#",
        description: "Loa tự làm tại xưởng với chất lượng âm thanh tốt nhất",
      },
      {
        title: "Loa nhập khẩu",
        href: "/#",
        description: "Loa tự làm tại xưởng với chất lượng âm thanh tốt nhất",
      },
      {
        title: "Loa tự làm",
        href: "/#",
        description: "Loa tự làm tại xưởng với chất lượng âm thanh tốt nhất",
      },
      {
        title: "Loa nhập khẩu",
        href: "/#",
        description: "Loa tự làm tại xưởng với chất lượng âm thanh tốt nhất",
      },
      {
        title: "Loa tự làm",
        href: "/#",
        description: "Loa tự làm tại xưởng với chất lượng âm thanh tốt nhất",
      },
    ],
  },
  {
    title: "general_contact",
    href: "/contact",
  },
];

const Header = (props: Props) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const href = pathname.replace(/\/(en|vi)/, "/");

  return (
    <header className="sticky top-0 z-[50] mx-auto w-full max-w-7xl p-4">
      <div className="flex items-center justify-between rounded-lg bg-slate-100/20 p-4 backdrop-blur-md dark:bg-slate-950/30">
        <Logo />
        <div className="hidden w-fit gap-2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item, index) => (
                <NavigationMenuItem key={`navItemsMain_${index}`}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger
                        className={buttonVariants({
                          variant: item.href === href ? "outline" : "link",
                          className:
                            "bg-transparent text-lg hover:!bg-transparent hover:!text-accent-foreground dark:text-neutral-50",
                        })}
                      >
                        {t(item.title)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.items.map(
                            (
                              subItem: {
                                title: string;
                                href: string;
                                description: string;
                              },
                              index,
                            ) => (
                              <ListItem
                                key={`subItems_${index}`}
                                title={subItem.title}
                                href={subItem.href}
                              >
                                {subItem.description}
                              </ListItem>
                            ),
                          )}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={buttonVariants({
                          variant: item.href === href ? "outline" : "link",
                          className: "!text-lg dark:text-neutral-50",
                        })}
                      >
                        {t(item.title)}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageChanger />
          <Button>{t("general_login")}</Button>
        </div>
        <Sheet>
          <SheetTrigger
            className={buttonVariants({
              variant: "ghost",
              className: "lg:hidden",
            })}
          >
            <Menu className="h-6 w-6 cursor-pointer dark:text-neutral-50 lg:hidden" />
          </SheetTrigger>
          <SheetContent className="h-dvh">
            <SheetHeader>
              <Logo />
            </SheetHeader>

            <div className="!mt-4 h-[calc(100dvh-200px)] space-y-2">
              <div className="flex flex-col gap-2">
                <LanguageChanger />
                <Button className="w-full">{t("general_login")}</Button>
              </div>
              <ScrollArea className="h-full">
                <div className="-mr-2 h-full pr-3">
                  {navItems.map((item, index) => (
                    <div
                      key={`navItems__${index}`}
                      className="flex flex-col items-start gap-2"
                    >
                      <Link
                        className={buttonVariants({
                          variant: item.href === href ? "outline" : "link",
                          className: "w-fit !text-lg dark:text-neutral-50",
                        })}
                        href={item.href}
                      >
                        {t(item.title)}
                      </Link>
                      {item.items && (
                        <div className="flex flex-col gap-3 pl-4">
                          {item.items.map((subItem, index) => (
                            <div
                              key={`navItems__${index}`}
                              className="border-l-2 pl-1 text-left"
                            >
                              <Link
                                href={subItem.href}
                                passHref
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <span className="block text-lg font-medium leading-none">
                                  {subItem.title}
                                </span>
                                <span className="line-clamp-2 text-base leading-snug text-muted-foreground">
                                  {subItem.description}
                                </span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
        {/* <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6 cursor-pointer dark:text-neutral-50 lg:hidden" />
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet> */}
      </div>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-lg font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-base leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
