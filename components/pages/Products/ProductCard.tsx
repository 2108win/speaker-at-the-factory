"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";

const ProductCard = ({ product, className }: { product: Product; className?: string }) => {
  const router = useRouter();
  const cart = useCart();
  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, () => {
      router.push("/cart");
    });
  };

  return (
    <div className={cn("flex flex-col space-y-2 overflow-hidden", className)}>
      <div className="relative aspect-square w-full rounded-lg bg-black/50 backdrop-blur-xl dark:bg-neutral-50/20">
        <Image
          onClick={() => router.push(`/products/${product.id}`)}
          className="z-[1] rounded-lg object-cover cursor-pointer"
          src={product.images}
          alt={product.productName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute left-4 top-4 z-10">
          <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
              {product.brand}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-lg font-normal text-slate-600 dark:text-neutral-200">
        {product.brand}
      </div>
      <div className="mt-4 bg-gradient-to-l from-neutral-950 to-slate-700 bg-clip-text text-2xl font-bold text-transparent dark:from-neutral-50 dark:to-slate-400">
        {product.price}
      </div>
      <div
        onClick={() => router.push(`/products/${product.id}`)}
        className="bg-gradient-to-l from-slate-900 to-slate-700 bg-clip-text text-2xl text-transparent dark:from-neutral-50 dark:to-slate-400 cursor-pointer"
      >
        {product.productName}
      </div>
      <Button onClick={onAddToCart}>
        Thêm vào giỏ hàng
        <ShoppingCart className="ml-4" size={20} />
      </Button>
    </div>
  );
};

export default ProductCard;
