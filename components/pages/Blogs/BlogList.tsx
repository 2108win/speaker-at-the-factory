"use client";
import React, { useState } from "react";
import { Blog } from "@/interfaces/blog";
import BlogItem from "./BlogItem";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const [blogFiltered, setBlogFiltered] = useState<Blog[]>(blogs);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    // delay 1s
    setIsLoadingSearch(true);
    setTimeout(() => {
      setBlogFiltered(filteredBlogs);
      setIsLoadingSearch(false);
    }, 500);
  };

  return (
    <div className="mt-layout-screen w-full flex flex-col gap-10 items-center">
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          onChange={handleSearch}
          className="w-full text-lg h-14 px-4 border-none bg-slate-950/5 dark:bg-neutral-50/5 rounded-3xl"
        />
      </div>
      <ul className="grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingSearch
          ? Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className={cn("space-y-2", idx == 4 ? "col-span-2" : "col-span-1")}>
                  <Skeleton className="h-40 rounded-lg w-full"></Skeleton>
                  <Skeleton className="h-6 w-3/4"></Skeleton>
                  <Skeleton className="h-6"></Skeleton>
                </div>
              ))
          : blogFiltered.map((blog, index) => (
              <BlogItem
                className={(index > 4 && index % 5 == 0) || index == 0 ? "lg:col-span-2" : ""}
                key={blog.id}
                blog={blog}
              />
            ))}
      </ul>
    </div>
  );
};

export default BlogList;
