"use client";
// import { useEffect, useState } from "react";

import useCart from "@/hooks/useCart";

import CartItem from "@/components/pages/cart/CartItem";
import Summary from "@/components/pages/cart/Summary";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="relative z-[5] mx-auto h-full w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center mt-14">
          <div className="w-12 h-12 border-4 border-slate-900 dark:border-slate-50 rounded-full animate-spin"></div>
        </div>
      ) : cart.items.length <= 0 ? (
        <div className="flex flex-col gap-4 w-full items-center h-full mt-14">
          <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-slate-800 md:text-5xl lg:text-6xl !leading-normal">
            Không có sản phẩm nào trong giỏ hàng!
          </div>
          <div className="text-4xl font-bold text-slate-500 dark:text-neutral-300">😢</div>
          {/* back to Product */}
          <div className="flex text-3xl font-bold gap-2 text-slate-500 dark:text-neutral-300">
            <Link
              href={"/products"}
              className={buttonVariants({
                size: "lg",
                className: "text-inherit",
              })}
            >
              👉 Đi đến trang sản phẩm
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h1 className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-3xl font-bold !leading-relaxed text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-5xl lg:text-6xl">
            Giỏ hàng
          </h1>
          <div className="relative mt-6 grid lg:grid-cols-8 gap-10 w-full">
            <div className="lg:col-span-5">
              <ul className="space-y-6">
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <Summary />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
