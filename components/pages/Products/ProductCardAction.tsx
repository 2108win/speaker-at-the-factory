"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Product } from "@/interfaces/product";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  product: Product;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
};

export const ProductCardAction = ({ product, size, className }: Props) => {
  const router = useRouter();
  const cart = useCart();
  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, () => {
      router.push("/cart");
    });
  };
  return (
    <div className={`flex flex-col sm:flex-row gap-4 mt-4 ${className}`}>
      <Button onClick={onAddToCart} size={size} className="w-full">
        Thêm vào giỏ hàng
        <ShoppingCart className="ml-4" size={20} />
      </Button>
      <Button
        onClick={() => router.push(`/products/${product.id}`)}
        className="w-full"
        size={size}
        variant={"outline"}
      >
        Mua ngay
      </Button>
    </div>
  );
};

export const ProductCardActionHome = ({ product, className }: Props) => {
  const router = useRouter();
  const cart = useCart();

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, () => {
      router.push("/cart");
    });
  };
  return (
    <div className={`mt-8 flex flex-col items-center gap-4 md:flex-row ${className}`}>
      <button
        onClick={() => router.push(`/products/${product.slug}`)}
        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
        <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/10 px-8 py-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
          Mua ngay
        </span>
      </button>
      <button
        onClick={onAddToCart}
        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
        <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-50 px-8 py-4 text-lg font-medium text-slate-950 hover:text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-black dark:text-neutral-50 hover:dark:bg-black/70">
          Thêm vào giỏ hàng
        </span>
      </button>
    </div>
  );
};
