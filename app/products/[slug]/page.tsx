import React, { Suspense } from "react";
import { Product } from "@/interfaces/product";
import Loading from "./loading";
import ListProduct from "@/components/pages/Home/ListProduct";
import { Metadata } from "next";
import Currency from "@/components/ui/currency";
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
import { ProductCardAction } from "@/components/pages/Products/ProductCardAction";
import { getOneProduct } from "@/utils/fetchProducts";
const ProductDetailPage = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const product = await getOneProduct(slug);

  const content = (
    <div className="w-full">
      <div className="grid lg:grid-cols-5 gap-8">
        <ProductImage product={product} className="lg:col-span-3" />
        <div className="flex flex-col gap-4 lg:col-span-2">
          <h2 className="text-3xl font-bold">{product.productName}</h2>
          <p className="">{product.description}</p>
          <Currency
            className="text-2xl font-bold text-neutral-700 dark:text-neutral-300"
            value={product.price || 0}
          />
          <Suspense fallback={<Loading />}>
            <ProductCardAction isMain={true} className="mt-5" size="lg" product={product} />
          </Suspense>
        </div>
      </div>
      {/* Assuming 'adapter' is the intended property for displaying update date */}
    </div>
  );
  const breadcrumb = (
    <Breadcrumb className="w-full mt-5">
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
          <Suspense fallback={<Loading />}>
            <BreadcrumbPage>{product.productName}</BreadcrumbPage>
          </Suspense>
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
              <p
                className="text-neutral-600 dark:text-neutral-400"
                key={content?.value + content?.title}
              >
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
    <>
      {breadcrumb}
      {content}
      <h3 className="bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-3xl w-full font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-4xl">
        Thông tin sản phẩm
      </h3>
      {tabs}
    </>
  );
};

export default ProductDetailPage;
