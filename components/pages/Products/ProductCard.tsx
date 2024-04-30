// "use client"
import React from "react";
// import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Currency from "@/components/ui/currency";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ProductCardAction } from "./ProductCardAction";

interface Props {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: Props) => {
  // const router = useRouter();

  return (
    <div className={cn("flex flex-col h-full overflow-hidden group", className)}>
      <Link
        className="relative overflow-hidden w-full rounded-xl shadow-md flex-auto h-auto"
        href={`/products/${product.slug}`}
      >
        {product.images ? (
          <Image
            src={product.images[0]}
            alt={product.productName}
            height={300}
            width={400}
            priority
            className="object-cover object-center w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-300 border"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
        <div className="absolute left-2 top-2 z-10">
          <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
            <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/50 px-4 text-lg font-medium text-neutral-50 backdrop-blur-lg hover:bg-slate-900/70 dark:bg-neutral-50/10 hover:dark:bg-black/70">
              {product.manyBass}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 text-lg font-normal text-slate-600 dark:text-neutral-200 line-clamp-1">
        {product.description}
      </div>
      <Link
        href={`/products/${product.slug}`}
        // onClick={() => router.push(`/products/${product.slug}`)}
        className="bg-gradient-to-l mt-2 from-slate-900 to-slate-700 bg-clip-text text-2xl text-transparent dark:from-neutral-50 h-16 line-clamp-2 dark:to-slate-400 cursor-pointer"
      >
        {product.productName}
      </Link>
      <div className="mt-2 w-fit">
        {/* {product.price} */}
        <Currency
          className="bg-gradient-to-l from-neutral-950 to-slate-600 bg-clip-text text-3xl text-transparent dark:from-neutral-50 dark:to-slate-400"
          value={product.price}
        />
      </div>
      <ProductCardAction product={product} />
    </div>
  );
};

export default ProductCard;
