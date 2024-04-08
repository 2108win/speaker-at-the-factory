import Hero from "@/components/page/home/Hero";
import Story from "@/components/page/home/Story";
import Image from "next/image";
import BestSeller from "@/components/page/home/BestSeller";
import ListProduct from "@/components/page/home/ListProduct";
import BannerJoin from "@/components/page/home/BannerJoin";

export default async function Home() {
  return (
    <>
      <div className="absolute top-0 z-[1] hidden h-lvh w-full md:block lg:top-[104px] lg:h-[calc(100lvh-104px)]">
        <Image
          className="h-full w-full object-cover"
          src="/hero_banner.jpg"
          alt="hero_bg"
          fill
        />
      </div>
      <Hero />
      <Story />
      <BestSeller />
      <ListProduct />
      <BannerJoin />
    </>
  );
}
