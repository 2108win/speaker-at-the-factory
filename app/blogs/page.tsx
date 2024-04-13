"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BlogList from "@/components/pages/Blogs/BlogList";
import { Blog } from "@/interfaces/blog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const api_url = process.env.SERVER_URL;

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const response = await fetch(
        // `${api_url}/Blogs/getList?page=${currentPage}&pageSize=${pageSize}`
        `https://1c6d5c6c04154692833486023b73778f.api.mockbin.io/`
      );
      const data = await response.json();
      setBlogs(data);
      setIsLoading(false);
    };
    // setBlogs((prev) => [...prev, ...blogData]);
    fetchBlogs();
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    // const response = await fetch(`${api_url}/Blogs/getList?page=${nextPage}&pageSize=${pageSize}`);
    // const data = await response.json();
    // setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
    setCurrentPage(nextPage);
  };

  return (
    <div className="relative z-[5] mx-auto h-full min-h-[calc(100svh-104px)] w-full max-w-7xl items-center gap-6 px-4 lg:px-8 flex flex-col mb-14 md:mb-16 lg:mb-20">
      <div className="bg-gradient-to-r from-slate-500 to-slate-950 bg-clip-text text-center text-5xl font-bold !leading-normal text-transparent dark:from-neutral-700 dark:to-neutral-100 md:from-neutral-700 md:to-neutral-100 md:text-7xl">
        Loa Tại Xưởng <br /> Blogs
      </div>
      {isLoading ? (
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className={cn("space-y-2", idx == 4 ? "col-span-2" : "col-span-1")}>
                <Skeleton className="h-40 rounded-lg w-full"></Skeleton>
                <Skeleton className="h-6 w-3/4"></Skeleton>
                <Skeleton className="h-6"></Skeleton>
              </div>
            ))}
        </div>
      ) : (
        <BlogList blogs={blogs} />
      )}
      {blogs?.length == 0 && (
        <Button variant="secondary" size="lg" onClick={handleLoadMore}>
          Tải thêm
        </Button>
      )}
    </div>
  );
}
