"use client";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import NavbarActions from "../NavBarAction";

type Props = {};

const navItems = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Sản phẩm",
    href: "/products",
    items: [
      {
        title: "Loa dã ngoại - Xám",
        href: "/products/loa-da-ngoai-xam-t-288",
        description:
          "📟LOA XÁCH TAY Màu xám - GIÁ TẠI XƯỞNG - ĐÂU DÙNG CŨNG HAY📟",
      },
      {
        title: "Loa dã ngoại - Đỏ",
        href: "/products/loa-da-ngoai-do-t-288",
        description:
          "📟LOA XÁCH TAY Màu đỏ - GIÁ TẠI XƯỞNG - ĐÂU DÙNG CŨNG HAY📟",
      },
      {
        title: "Loa dã ngoại - Xanh lá",
        href: "/products/loa-da-ngoai-xanh-la-t-288",
        description:
          "📟LOA XÁCH TAY Màu xanh lá - GIÁ TẠI XƯỞNG - ĐÂU DÙNG CŨNG HAY📟",
      },
    ],
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Liên hệ",
    href: "/contact",
  },
];

const Header = (props: Props) => {
  const currentPathname = usePathname();

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl p-1 md:p-4">
      <div className="flex items-center justify-between rounded-lg bg-neutral-50/50 p-2 md:p-4 backdrop-blur-md dark:bg-slate-950/30">
        <Logo />
        <div className="hidden w-fit gap-2 lg:flex mx-auto">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(({ title, href, items }, index) => (
                <NavigationMenuItem key={`navItems_${index}`}>
                  {items ? (
                    <>
                      <Link href={href} legacyBehavior passHref>
                        <NavigationMenuTrigger
                          className={buttonVariants({
                            variant: currentPathname === href ? "outline" : "link",
                            className:
                              currentPathname === href
                                ? "text-lg !bg-background hover:!bg-accent hover:!text-accent-foreground"
                                : "text-lg !bg-transparent",
                          })}
                        >
                          {title}
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {items.map((subItem, index) => (
                            <ListItem
                              key={`subItems_${index}`}
                              title={subItem.title}
                              href={subItem.href}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={buttonVariants({
                          variant: currentPathname === href ? "outline" : "link",
                          className: "!text-lg dark:text-neutral-50 text-black",
                        })}
                      >
                        {title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* right side */}
        {/* <div className="hidden items-center gap-2 lg:flex">
          <Button>Đăng nhập</Button>
        </div> */}
        <div className="flex ml-auto gap-2">
          <NavbarActions />
          <Sheet>
            <SheetTrigger
              className={buttonVariants({
                variant: "ghost",
                className: "lg:hidden",
              })}
            >
              <Menu className="h-6 w-6 cursor-pointer dark:text-neutral-50 lg:hidden" />
            </SheetTrigger>
            <SheetContent className="h-dvh bg-white dark:bg-black">
              <SheetHeader>
                <Logo hasText />
              </SheetHeader>
              <div className="!mt-4 h-[calc(100dvh-200px)] space-y-2">
                {/* <div className="flex flex-col gap-2">
                  <Button className="w-full">Đăng nhập</Button>
                </div> */}
                <ScrollArea className="h-full">
                  <div className="-mr-2 h-full pr-3">
                    {navItems.map(({ title, href, items }, index) => (
                      <div key={`navItems__${index}`} className="flex flex-col items-start gap-2">
                        <Link
                          className={buttonVariants({
                            variant: currentPathname === href ? "outline" : "link",
                            className: "w-fit !text-lg dark:text-neutral-50",
                          })}
                          href={href}
                        >
                          {title}
                        </Link>
                        {items && (
                          <div className="flex flex-col gap-3 pl-4">
                            {items.map((subItem, index) => (
                              <div key={`navItems__${index}`} className="border-l-2 pl-1 text-left">
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
        </div>
      </div>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-lg font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-base leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
