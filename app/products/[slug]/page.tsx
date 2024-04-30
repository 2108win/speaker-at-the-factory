import React, { Suspense } from "react";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import ListProduct from "@/components/pages/Home/ListProduct";
import { Metadata } from "next";
import Currency from "@/components/ui/currency";
import { ShoppingCart } from "lucide-react";
import ProductCardAction from "@/components/pages/Products/ProductCardAction";
import ProductImage from "@/components/pages/Products/ProductImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
const type = process.env.NEXT_PUBLIC_SERVER_URL ? "server" : "local";

interface ProductProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const response = await fetch(`${serverUrl}/Product/getList`);
  const data: Product[] = await response.json();
  return data.map((product: Product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: ProductProps): Promise<Metadata> {
  const response = await fetch(`${serverUrl}/Product/getOneSlug/${slug}?type=${type}`);
  // const response = await fetch(`https://fakestoreapi.com/products/${slug}`);
  const productData: Product = await response.json();
  if (!productData) {
    return {
      title: "Bài viết không tồn tại",
      description: "Bài viết không tồn tại",
    };
  }
  return {
    title: productData.productName,
    description: productData.description,
    openGraph: {
      title: productData.productName,
      description: productData.description,
    },
  };
}

const ProductDetailPage = async ({ params: { slug } }: ProductProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/Product/getOneSlug/${slug}?type=${type}`
    // `https://fakestoreapi.com/products/${slug}`
  );
  const product: Product = await response.json();
  // const foundProduct = data.find((product: Product) => product.id === slug);

  const content = (
    <div className="">
      <div className="grid lg:grid-cols-5 gap-8">
        <ProductImage product={product} className="lg:col-span-3" />
        <div className="flex flex-col gap-4 lg:col-span-2">
          <h2 className="text-3xl font-bold">{product.productName}</h2>
          <p className="text-slate-500">{product.description}</p>
          <Currency className="text-2xl font-bold text-slate-700" value={product.price || 0} />
          <ProductCardAction className="mt-8" size="lg" product={product} />
        </div>
      </div>
      {/* Assuming 'adapter' is the intended property for displaying update date */}
    </div>
  );
  const breadcrumb = (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{product.productName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
  const tabData = [
    {
      value: "information",
      title: "Thông tin chung",
      content: [
        {
          value: product.description,
          title: "Mô tả",
        },
        {
          value: product.brand,
          title: "Nhãn hàng",
        },
        {
          value: product.model,
          title: "Model",
        },
        {
          value: product.colorImg,
          title: "Màu sắc",
        },
        {
          value: product.material,
          title: "Chất liệu",
        },
        {
          value: product.weight,
          title: "Cân nặng",
        },
        {
          value: product.length,
          title: "Chiều dài",
        },
        {
          value: product.width,
          title: "Chiều rộng",
        },
        {
          value: product.height,
          title: "Chiều cao",
        },
      ],
    },
    {
      value: "specifications",
      title: "Thuộc tính",
      content: [
        {
          value: product.power,
          title: "Nguồn vào",
        },
        {
          value: product.adapter,
          title: "Điều kiển",
        },
        {
          value: product.timeIsBattery,
          title: "Thời lường pin",
        },
        {
          value: product.timeIsUse,
          title: "Thời gian sử dụng",
        },
        {
          value: product.timeIsUse,
          title: "Thực tế sử dụng",
        },
        {
          value: product.manySpeaker,
          title: "Số lượng loa",
        },
        {
          value: product.manyBass,
          title: "Số lượng bass",
        },
        {
          value: product.treble,
          title: "Số lượng treble",
        },
        {
          value: product.connectWireless,
          title: "Kết nối không dây",
        },
        {
          value: product.connectMicroWireless,
          title: "Kết nối micro",
        },
        {
          value: product.connectOther,
          title: "Kết nối khác",
        },
        {
          value: product.portWiredMicro,
          title: "Cổng sử dụng micro",
        },
        {
          value: product.frequency,
          title: "Tồn kho",
        },
      ],
    },
    {
      value: "reviews",
      title: "Đánh giá",
      // content: ["rating", "reviews"],
    },
  ];
  const tabs = (
    <Tabs defaultValue="information" className="w-full transition-all duration-300">
      <TabsList className="flex-wrap justify-start box-decoration-clone">
        {tabData.map((tab, index) => (
          <TabsTrigger className="text-xl" key={tab.value + index} value={tab.value}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent className="mt-6 text-lg" key={tab.value} value={tab.value}>
          <div className="flex flex-col gap-4">
            {tab.content?.map((content, index) => (
              <p className="text-slate-600" key={content?.value + content?.title}>
                <span className="font-bold">{content?.title} : </span>
                {content?.value}
              </p>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
        {breadcrumb}
        {content}
        <h3 className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-3xl w-full font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-4xl">
          Thông tin sản phẩm
        </h3>
        {tabs}
        <ListProduct />
      </div>
    </Suspense>
  );
};

export default ProductDetailPage;
