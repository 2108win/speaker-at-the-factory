"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Product } from "@/interfaces/product";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "./loading";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      if (!slug) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${slug}`);
        const foundProduct = await response.json();
        // const foundProduct = data.find((product: Product) => product.id === slug);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const content = (
    <div className="space-y-6 pt-6 max-w-screen-lg mx-auto">
      <h1 className="text-center text-3xl font-black">{product?.title}</h1>
      <Image
        src={product?.image || "/og-image.jpg"}
        alt={product?.title || "Product Loa Tại Xưởng"}
        width={1200}
        height={600}
        className="rounded-lg max-w-full aspect-video md:aspect-[5/2] object-cover shadow-lg border"
      />
      {/* Assuming 'adapter' is the intended property for displaying update date */}
      <p className="text-center">Ngày cập nhật: {product?.adapter || ""}</p>
    </div>
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="z-[5] h-full w-full">
        <div className="space-y-2 p-4 md:p-8">
          {isLoading ? (
            <Skeleton className="text-center h-6"></Skeleton>
          ) : product ? (
            content
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-50 dark:to-slate-800 md:text-5xl lg:text-6xl !leading-normal">
                Sản phẩm không tồn tại
              </div>
              <div className="flex flex-col items-center text-4xl font-bold gap-2 text-slate-500 dark:text-neutral-300">
                <div className="">😢</div>
                {/* back to Product */}
                <Link
                  href={"/products"}
                  className={buttonVariants({
                    size: "lg",
                    className: "!text-xl !font-bold",
                  })}
                >
                  Quay lại sản phẩm
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default ProductDetailPage;
