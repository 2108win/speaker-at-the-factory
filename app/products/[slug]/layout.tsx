import { Suspense } from "react";
import Loading from "./loading";
import ListProduct from "@/components/pages/Home/ListProduct";
import { getListProduct, getOneProduct } from "@/utils/fetchProducts";
import { Metadata } from "next";

interface ProductProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const data = await getListProduct();
  return data.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: ProductProps): Promise<Metadata> {
  const productData = await getOneProduct(slug);
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
      images: [
        `/api/og?title=${productData.productName}&image=${productData.images[0]}`,
        productData.images[0],
      ],
    },
  };
}

export default function ProductLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
      {children}
      <Suspense fallback={<Loading />}>
        <ListProduct className="!px-0" />
      </Suspense>
    </section>
  );
}
