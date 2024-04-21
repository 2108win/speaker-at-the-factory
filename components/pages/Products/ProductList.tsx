"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [productFiltered, setProductFiltered] = useState<Product[]>(product);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  console.log(process.env);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(
        // `${api_url}/Product/getList?page=${currentPage}&pageSize=${pageSize}`
        // `https://3781d0d8f2c44f49963604fb003202b5.api.mockbin.io/`
        `https://fakestoreapi.com/products`
      );
      const data = await response.json();
      console.log("🚀 ~ fetchProduct ~ data:", data);
      setProduct(data);
      setProductFiltered(data);
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredProducts = product.filter((product) =>
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
        {isLoading ? (
          <Skeleton className="bg-slate-950/10 h-14 rounded-3xl w-full"></Skeleton>
        ) : (
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            onChange={handleSearch}
            className="w-full text-lg h-14 px-4 border-none bg-slate-950/5 dark:bg-neutral-50/5 rounded-3xl"
          />
        )}
      </div>
      <ul className="grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingSearch || isLoading
          ? Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="space-y-4">
                  <Skeleton className="bg-slate-950/10 h-56 rounded-lg w-full"></Skeleton>
                  <Skeleton className="bg-slate-950/10 h-6 w-3/4"></Skeleton>
                  <Skeleton className="bg-slate-950/10 h-8 w-full"></Skeleton>
                  <Skeleton className="bg-slate-950/10 h-6 w-1/2"></Skeleton>
                </div>
              ))
          : productFiltered.map((product, index) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
      </ul>
      {product?.length == 0 && (
        <Button variant="secondary" size="lg" onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Đang tải" : "Tải thêm"}
        </Button>
      )}
    </div>
  );
};

export default ProductList;
