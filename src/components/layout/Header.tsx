"use client";

import Link from "next/link";
import React from "react";
import Logo from "@/components/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../LanguageChanger";
import { Menu } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

const navItems = [
  {
    title: "nav_home",
    href: "/home",
  },
  {
    title: "nav_products",
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
    title: "nav_contact",
    href: "/contact",
  },
];

const Header = (props: Props) => {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-[50] mx-auto w-full max-w-7xl p-4">
      <div className="flex items-center justify-between rounded-lg bg-slate-100/20 p-4 backdrop-blur-md dark:bg-slate-950/30">
        <Logo />
        <div className="hidden w-fit gap-2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <NavigationMenuTrigger
                      className={buttonVariants({
                        variant: "link",
                        className:
                          "bg-transparent text-lg hover:!bg-transparent hover:!text-accent-foreground dark:text-neutral-50",
                      })}
                    >
                      {t(item.title)}
                    </NavigationMenuTrigger>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={buttonVariants({
                          variant: "link",
                          className: "!text-lg dark:text-neutral-50",
                        })}
                      >
                        {t(item.title)}
                      </NavigationMenuLink>
                    </Link>
                  )}
                  {item.items && (
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.items.map(
                          (subItem: {
                            title: string;
                            href: string;
                            description: string;
                          }) => (
                            <ListItem
                              key={subItem.title}
                              title={subItem.title}
                              href={subItem.href}
                            >
                              {subItem.description}
                            </ListItem>
                          ),
                        )}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageChanger />
          <Button>Login</Button>
        </div>
        <Sheet>
          <SheetTrigger
            className={buttonVariants({
              variant: "ghost",
              className: "lg:hidden",
            })}
          >
            <Menu className="h-8 w-8 dark:text-neutral-50" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="h-[95%]">
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription className="!mt-4 h-full">
                <ScrollArea className="h-full">
                  <div className="-m-5 flex h-full flex-col items-start gap-2 p-7">
                    <LanguageChanger />
                    <Button className="w-full">Login</Button>
                    {navItems.map((item) => (
                      <>
                        <Link
                          key={item.title}
                          className={buttonVariants({
                            variant: "link",
                            className: "w-fit !text-lg dark:text-neutral-50",
                          })}
                          href={item.href}
                        >
                          {t(item.title)}
                        </Link>
                        {item.items && (
                          <ul className="flex flex-col gap-3 pl-4">
                            {item.items.map((subItem) => (
                              <li
                                key={subItem.title}
                                className="border-l-2 pl-1"
                              >
                                <Link
                                  href={subItem.href}
                                  passHref
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-lg font-medium leading-none">
                                    {subItem.title}
                                  </div>
                                  <p className="line-clamp-2 text-base leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
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
