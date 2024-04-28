import React from "react";
import { useRouter } from "next/navigation";
import { Blog } from "@/interfaces/blog";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BlogItem = ({ blog, className }: { blog: Blog; className?: string }) => {
  const router = useRouter();

  const handleViewBlog = () => {
    router.push(`/blogs/${blog.slug}`);
  };

  return (
    <li onClick={handleViewBlog} className={cn("cursor-pointer", className)}>
      <div className="flex w-full flex-col gap-4 overflow-hidden items-center">
        <Image
          src={blog.imageUrl || "/og-image.jpg"}
          alt={blog.title}
          width={1200}
          height={600}
          className="rounded-lg max-w-full h-80 object-cover shadow-lg hover:shadow-2xl"
        />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 text-center line-clamp-2 text-balance">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-200 line-clamp-2">
          {blog.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>
      </div>
    </li>
  );
};

export default BlogItem;
