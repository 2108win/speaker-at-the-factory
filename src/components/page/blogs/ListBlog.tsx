import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
  const data = await fetch(
    `${process.env.SERVER_URL}/Blog/getList?page=1&pageSize=10`,
  ).then((res) => res.json());
  return data;
}

const ListBlog = async () => {
  // fetch data blog from api
  const data = await fetch(
    `${process.env.SERVER_URL}/Blog/getList?page=1&pageSize=10`,
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return (
    <div className="mt-layout-screen">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((blog: any, index: number) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={blog.id}
            className={cn(
              "flex flex-col gap-4 overflow-hidden",
              index == 3 || index == 8 ? "md:col-span-2" : "md:col-span-1",
            )}
          >
            {/* <Image
              className="h-56 w-full object-cover object-center"
              src={blog.image}
              alt={blog.title}
            /> */}
            <Skeleton className="h-56 w-full rounded-md"></Skeleton>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                {blog.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-neutral-200">
                {blog.content ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListBlog;
