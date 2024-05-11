import { generateStaticParams } from "@/app/products/[slug]/page";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductCardActionHome } from "../Products/ProductCardAction";
import Currency from "@/components/ui/currency";

// const dataProduct = {
//   price: "5.500.000 VNĐ",
//   title: "Loa xách tay",
//   description:
//     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe corrupti soluta minima aliquam, animi earum rem vitae repellat obcaecati quaerat ipsam unde laudantium adipisci dolores. Praesentium possimus expedita facilis ut.",
//   image: "/product_1.png",
// };
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const BestSeller = async () => {
  const res = await fetch(`${serverUrl}/Product/getOneSlug/loa-da-ngoai-xam-t-288?type=server`);
  const dataProduct: Product = await res.json();
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
            <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-slate-800 md:text-5xl lg:text-6xl">
              {/* {dataProduct.price} */}
              <Currency value={dataProduct.price} />
            </div>
            <div className="bg-gradient-to-l from-slate-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-4xl text-transparent dark:from-neutral-50 dark:to-slate-800 lg:text-6xl">
              {dataProduct.productName}
            </div>
            <div className="py-4 text-base font-normal text-slate-600 dark:text-neutral-200 lg:text-xl">
              {dataProduct.description}...
              <Link
                href={`/products/${dataProduct.slug}`}
                className="!text-slate-950 underline hover:text-neutral-50 dark:!text-neutral-50"
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
