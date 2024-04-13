"use client";
import React, { useState, useEffect } from "react";
import { Blog } from "@/interfaces/blog";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      if (!id) return;
      // const response = await fetch(`${process.env.SERVER_URL}/Blogs/${id}`);
      const response = await fetch(`https://1c6d5c6c04154692833486023b73778f.api.mockbin.io/`);
      const data = await response.json();
      const foundBlog = data.find((blog: Blog) => blog.id == id);
      setBlog(foundBlog);
      setIsLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Bài viết không tồn tại</div>;
  }

  return (
    <div className="z-[5] h-full w-full">
      <div className="space-y-2 p-4 md:p-8">
        {isLoading ? (
          <Skeleton className="text-center h-6"></Skeleton>
        ) : (
          <p className="text-center">Ngày cập nhật: {blog.updated_at}</p>
        )}
        <div className="space-y-6 pt-6 max-w-screen-lg mx-auto">
          {isLoading ? (
            <Skeleton className="h-12 w-4/5 mx-auto"></Skeleton>
          ) : (
            <h1 className="text-center text-3xl font-black">{blog.title}</h1>
          )}
          {isLoading ? (
            <Skeleton className="aspect-[5/2] w-full mx-auto"></Skeleton>
          ) : (
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={600}
              className="rounded-lg max-w-full aspect-video md:aspect-[5/2] object-cover shadow-lg border"
            />
          )}
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-1/3"></Skeleton>
              <Skeleton className="h-6 w-1/2"></Skeleton>
              <Skeleton className="h-6 w-full"></Skeleton>
              <Skeleton className="h-6 w-full"></Skeleton>
              <Skeleton className="h-6 w-1/2"></Skeleton>
            </>
          ) : (
            <span
              className="mx-auto block max-w-7xl [&>*]:leading-7 [&>p>img]:mx-auto [&>p>img]:my-4 [&>p>img]:aspect-video [&>p>img]:max-w-4xl [&>p>img]:rounded-md [&>p>img]:border-2 [&>p>img]:border-gray-300 [&>p>img]:object-cover [&>p>img]:drop-shadow-lg [&>p]:text-lg [&>p]:font-normal [&>p]:text-slate-900 dark:[&>p]:text-neutral-100"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
