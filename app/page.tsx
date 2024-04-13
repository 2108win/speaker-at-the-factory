import BannerJoin from "@/components/pages/Home/BannerJoin";
import BestSeller from "@/components/pages/Home/BestSeller";
import Hero from "@/components/pages/Home/Hero";
import ListProduct from "@/components/pages/Home/ListProduct";
import Story from "@/components/pages/Home/Story";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 z-[1] hidden h-lvh w-full md:block lg:top-[104px] lg:h-[calc(100lvh-104px)]">
        <Image className="h-full w-full object-cover" src="/hero_banner.jpg" alt="hero_bg" fill />
      </div>
      <Hero />
      <Story />
      <BestSeller />
      <ListProduct />
      <BannerJoin />
    </>
  );
}
