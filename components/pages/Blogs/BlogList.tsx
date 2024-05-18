"use client";
import React, { useEffect, useState } from "react";
import { Blog } from "@/interfaces/blog";
import BlogItem from "./BlogItem";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getListBlog } from "@/utils/fetchBlogs";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogFiltered, setBlogFiltered] = useState<Blog[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const data = await getListBlog();
      setBlogs(data);
      setBlogFiltered(data);
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

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
        {isLoading ? (
          <Skeleton className="w-full h-14 rounded-3xl bg-neutral-950/10"></Skeleton>
        ) : (
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            onChange={handleSearch}
            className="w-full text-lg h-14 px-4 border-none bg-neutral-950/5 dark:bg-neutral-50/5 rounded-3xl"
          />
        )}
      </div>
      <ul className="grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogFiltered.map((blog, index: number) => (
          <BlogItem
            className={(index > 4 && index % 5 == 0) || index == 0 ? "lg:col-span-2" : ""}
            key={blog.id}
            blog={blog}
          />
        ))}
      </ul>
      {blogs?.length == 0 && (
        <Button variant="secondary" size="lg" onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Đang tải" : "Tải thêm"}
        </Button>
      )}
    </div>
  );
};

export default BlogList;
