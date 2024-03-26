import Header from "@/components/layout/Header";
import Hero from "@/components/page/home/Hero";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Story from "@/components/page/home/Story";
import Image from "next/image";
import BestSeller from "@/components/page/home/BestSeller";
import ListProduct from "@/components/page/home/ListProduct";

const i18nNamespaces = ["home"];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex  w-full flex-col items-center justify-center bg-white dark:bg-black">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <Header />
        <div className="absolute top-0 z-[1] hidden h-dvh w-full md:block lg:top-[104px] lg:h-[calc(100dvh-104px)]">
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
        <ListProduct />a
      </div>
    </TranslationsProvider>
  );
}
