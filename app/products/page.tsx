"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Product } from "@/interfaces/product";
import ProductList from "@/components/pages/Products/ProductList";
import BannerJoin from "@/components/BannerJoin";

const api_url = process.env.SERVER_URL;

export default function Products() {
  const [product, setProduct] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(
        // `${api_url}/Product/getList?page=${currentPage}&pageSize=${pageSize}`
        `https://3781d0d8f2c44f49963604fb003202b5.api.mockbin.io/`
      );
      const data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    // setProduct((prev) => [...prev, ...productData]);
    fetchProduct();
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    // const response = await fetch(`${api_url}/Product/getList?page=${nextPage}&pageSize=${pageSize}`);
    // const data = await response.json();
    // setProduct((prevProduct) => [...prevProduct, ...data.product]);
    setCurrentPage(nextPage);
  };

  return (
    <>
      <div className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
        <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-center text-5xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:from-neutral-700 md:to-neutral-100 md:text-7xl">
          Loa Tại Xưởng <br /> Product
        </div>
        {isLoading ? (
          <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="space-y-4">
                  <Skeleton className="h-56 rounded-lg w-full"></Skeleton>
                  <Skeleton className="h-6 w-3/4"></Skeleton>
                  <Skeleton className="h-8 w-full"></Skeleton>
                  <Skeleton className="h-6 w-1/2"></Skeleton>
                </div>
              ))}
          </div>
        ) : (
          <ProductList products={product} />
        )}
        {product?.length == 0 && (
          <Button variant="secondary" size="lg" onClick={handleLoadMore}>
            Tải thêm
          </Button>
        )}
      </div>
      <BannerJoin />
    </>
  );
}
