"use client";
import React, { useState } from "react";
import { Product } from "@/interfaces/product";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
const ProductList = ({ products }: { products: Product[] }) => {
  const [productFiltered, setProductFiltered] = useState<Product[]>(products);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    // delay 1s
    setIsLoadingSearch(true);
    setTimeout(() => {
      setProductFiltered(filteredProducts);
      setIsLoadingSearch(false);
    }, 500);
  };

  return (
    <div className="mt-layout-screen w-full flex flex-col gap-10 items-center">
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          onChange={handleSearch}
          className="w-full text-lg h-14 px-4 border-none bg-slate-950/5 dark:bg-neutral-50/5 rounded-3xl"
        />
      </div>
      <ul className="grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingSearch
          ? Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="space-y-4">
                  <Skeleton className="h-56 rounded-lg w-full"></Skeleton>
                  <Skeleton className="h-6 w-3/4"></Skeleton>
                  <Skeleton className="h-8 w-full"></Skeleton>
                  <Skeleton className="h-6 w-1/2"></Skeleton>
                </div>
              ))
          : productFiltered.map((product, index) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ProductList;
