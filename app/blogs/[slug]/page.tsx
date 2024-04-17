import React, { Suspense } from "react";
import { Blog } from "@/interfaces/blog";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Loading from "./loading";

interface BlogProps {
  params: {
    slug: string;
  };
}
export async function generateStaticParams() {
  const response = await fetch("https://1c6d5c6c04154692833486023b73778f.api.mockbin.io/");
  const data: Blog[] = await response.json();
  return data
    .map((blog: Blog) => ({
      slug: blog.id,
    }))
    .slice(0, 10);
}
export async function generateMetadata({ params: { slug } }: BlogProps): Promise<Metadata> {
  const response = await fetch("https://1c6d5c6c04154692833486023b73778f.api.mockbin.io/");
  const data: Blog[] = await response.json();
  const blogData = data.find((blog: Blog) => blog.id === slug);
  if (!blogData) {
    return {
      title: "Bài viết không tồn tại",
      description: "Bài viết không tồn tại",
    };
  }
  return {
    title: blogData.title,
    description: blogData.content,
  };
}

const BlogDetailPage = async ({ params: { slug } }: BlogProps) => {
  const response = await fetch("https://1c6d5c6c04154692833486023b73778f.api.mockbin.io/");
  const data: Blog[] = await response.json();
  const blogData = data.find((blog: Blog) => blog.id === slug);

  if (!blogData) {
    return <div>Bài viết không tồn tại</div>;
  }

  const content = (
    <span
      className="mx-auto block max-w-7xl [&>*]:leading-7 [&>p>img]:mx-auto [&>p>img]:my-4 [&>p>img]:aspect-video [&>p>img]:max-w-4xl [&>p>img]:rounded-md [&>p>img]:border-2 [&>p>img]:border-gray-300 [&>p>img]:object-cover [&>p>img]:drop-shadow-lg [&>p]:text-lg [&>p]:font-normal [&>p]:text-slate-900 dark:[&>p]:text-neutral-100"
      dangerouslySetInnerHTML={{ __html: blogData.content }}
    />
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="z-[5] h-full w-full">
        <div className="space-y-2 p-4 md:p-8">
          <p className="text-center">Ngày cập nhật: {blogData.updated_at}</p>
          <div className="space-y-6 pt-6 max-w-screen-lg mx-auto">
            <h1 className="text-center text-3xl font-black">{blogData.title}</h1>
            <Image
              src={blogData.image}
              alt={blogData.title}
              width={1200}
              height={600}
              className="rounded-lg max-w-full aspect-video md:aspect-[5/2] object-cover shadow-lg border"
            />
            {content}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default BlogDetailPage;
