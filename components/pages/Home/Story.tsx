import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const dataStory = [
  {
    title: "Chuyện làm loa",
    description:
      "Tận dụng lợi thế từ việc tự sản xuất, Loa Tại Xưởng không chỉ là dừng lại ở việc cung cấp các thiết bị âm thanh chất lượng cao với giá cả ổn định, và mạng lưới bảo hành rộng khắp cả nước. Đây còn là nơi lắng nghe,chia sẻ những câu chuyện và đam mê về âm thanh của người trẻ đang lập nghiệp.",
    image: "/story_1.jpg",
  },
  {
    title: "Chuyện của xưởng",
    description:
      "Tận dụng lợi thế từ việc tự sản xuất, Loa Tại Xưởng không chỉ là dừng lại ở việc cung cấp các thiết bị âm thanh chất lượng cao với giá cả ổn định, và mạng lưới bảo hành rộng khắp cả nước. Đây còn là nơi lắng nghe,chia sẻ những câu chuyện và đam mê về âm thanh của người trẻ đang lập nghiệp.",
    image: "/story_2.jpg",
  },
];

const Story = () => {
  return (
    <div className="mt-layout-screen relative z-[1] mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {dataStory.map((story, index) => (
          <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-neutral-900/10 backdrop-blur-[2px]"></div>
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={story.image}
              alt={story.title}
              width={400}
              height={600}
            />
            <div className="absolute left-0 top-0 z-10 flex flex-col gap-6 p-4 md:p-10">
              <h3 className="text-3xl font-semibold text-neutral-50 lg:text-5xl">{story.title}</h3>
              <span className="line-clamp-5 text-base text-neutral-50 lg:text-lg">
                {story.description}
              </span>
              <Link
                href="/blogs"
                className={cn(
                  buttonVariants(),
                  "relative inline-flex h-12 w-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50"
                )}
              >
                <span className="absolute inset-[-1000%] animate-[spin_5s_ease_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#555555_50%,#ffffff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#555555_50%,#000000_100%)]" />
                <span className="z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)] bg-[length:200%_100%] px-8 py-4 text-lg font-medium text-white backdrop-blur-lg dark:bg-neutral-50/20">
                  Xem thêm
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
