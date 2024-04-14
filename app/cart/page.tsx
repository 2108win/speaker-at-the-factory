"use client";
// import { useEffect, useState } from "react";

import useCart from "@/hooks/useCart";

import CartItem from "@/components/pages/cart/CartItem";
import Summary from "@/components/pages/cart/Summary";

const CartPage = () => {
  const cart = useCart();

  return (
    <div className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
      <h1 className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-3xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-4xl">
        Giỏ hàng
      </h1>
      <div className="mt-12 grid md:grid-cols-8 gap-10">
        <div className="md:col-span-5">
          {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
          <ul className="space-y-6">
            {cart.items.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
          </ul>
        </div>
        <Summary />
      </div>
    </div>
  );
};

export default CartPage;
