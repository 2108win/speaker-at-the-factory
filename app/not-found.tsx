"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center gap-6 flex-col mb-10 px-4">
      <div className="bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-9xl font-black text-transparent dark:from-neutral-50 dark:to-neutral-800!leading-normal">
        404
      </div>
      <p className="text-4xl md:text-5xl lg:text-6xl !leading-normal font-bold text-neutral-500 dark:text-neutral-300 text-center text-balance">
        Trang bạn tìm kiếm không tồn tại.
      </p>
      <div className="flex items-center gap-5">
        <Button onClick={handleGoBack} size={"icon"}>
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Trang chủ
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
