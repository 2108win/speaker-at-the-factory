"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
      <h2 className="text-xl font-bold">Ôi không ổn!</h2>
      <p className="my-2">
        Đã xảy ra sự cố với trang này. Đây có thể là sự cố tạm thời, vui lòng thử lại hành động của
        bạn.
      </p>
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <Button size={"lg"} onClick={() => reset()}>
          Thử lại
        </Button>
        <Button size={"lg"}>Quay lại trang chủ</Button>
      </div>
    </div>
  );
}
