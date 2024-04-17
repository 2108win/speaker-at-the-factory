"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/interfaces/product";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      if (!slug) return;

      try {
        const response = await fetch(`https://3781d0d8f2c44f49963604fb003202b5.api.mockbin.io/`);
        const data = await response.json();
        const foundProduct = data.find((product: Product) => product.id === slug);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>; // Corrected message to "Sản phẩm"
  }

  const content = (
    <div className="space-y-6 pt-6 max-w-screen-lg mx-auto">
      <h1 className="text-center text-3xl font-black">{product.productName}</h1>
      <Image
        src={product.images}
        alt={product.productName}
        width={1200}
        height={600}
        className="rounded-lg max-w-full aspect-video md:aspect-[5/2] object-cover shadow-lg border"
      />
      {/* Assuming 'adapter' is the intended property for displaying update date */}
      <p className="text-center">Ngày cập nhật: {product.adapter}</p>
    </div>
  );

  return (
    <div className="z-[5] h-full w-full">
      <div className="space-y-2 p-4 md:p-8">
        {isLoading ? <Skeleton className="text-center h-6"></Skeleton> : content}
      </div>
    </div>
  );
};

export default ProductDetailPage;
