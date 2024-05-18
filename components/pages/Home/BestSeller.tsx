import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductCardActionHome } from "../Products/ProductCardAction";
import Currency from "@/components/ui/currency";
import { getOneProduct } from "@/utils/fetchProducts";

const BestSeller = async () => {
  const dataProduct = await getOneProduct("loa-da-ngoai-xam-t-288");
  return (
    <div className="mt-layout-screen z-[1] mx-auto h-full max-w-7xl px-4 lg:px-8">
      {dataProduct && (
        <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-lg lg:max-w-none">
            <Image
              className="h-auto m-auto w-full rounded-lg object-cover hover:scale-105 transition-all duration-300"
              src={dataProduct.images[0]}
              alt={dataProduct.productName}
              width={400}
              height={600}
            />
          </div>
          <div className="flex flex-col items-center space-y-2 text-center lg:items-start lg:text-left">
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-800 md:text-5xl lg:text-6xl">
              {/* {dataProduct.price} */}
              <Currency value={dataProduct.price} />
            </div>
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-4xl text-transparent dark:from-neutral-50 dark:to-neutral-800 lg:text-6xl">
              {dataProduct.productName}
            </div>
            <div className="py-4 text-base font-normal text-neutral-600 dark:text-neutral-200 lg:text-xl">
              {dataProduct.description}...
              <Link
                href={`/products/${dataProduct.slug}`}
                className="!text-neutral-950 underline hover:text-neutral-50 dark:!text-neutral-50"
              >
                Xem thêm
              </Link>
            </div>
            <ProductCardActionHome product={dataProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
