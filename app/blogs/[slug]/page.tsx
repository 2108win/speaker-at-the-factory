import React, { Suspense } from "react";
import { Blog } from "@/interfaces/blog";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Loading from "./loading";
import formatDate from "@/components/ui/date-format";

interface BlogProps {
  params: {
    slug: string;
  };
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
const type = process.env.NEXT_PUBLIC_SERVER_URL ? "server" : "local";

export async function generateStaticParams() {
  const response = await fetch(`${serverUrl}/Blog/getList?type=${type}`);
  const data: Blog[] = await response.json();
  return data.map((blog: Blog) => ({
    slug: blog.slug,
  }));
}
export async function generateMetadata({ params: { slug } }: BlogProps): Promise<Metadata> {
  const response = await fetch(`${serverUrl}/Blog/getOneSlug/${slug}?type=${type}`);
  const blogData = await response.json();
  // const response = await fetch(`${serverUrl}/Blog/getList?type=${type}`);
  // const data: Blog[] = await response.json();
  // const blogData = data.find((blog: Blog) => blog.slug === slug);
  if (!blogData) {
    return {
      title: "Bài viết không tồn tại",
      description: "Bài viết không tồn tại",
    };
  }
  return {
    title: blogData.title,
    description: blogData.description,
    openGraph: {
      title: blogData.title,
      description: blogData.description,
    },
  };
}

const BlogDetailPage = async ({ params: { slug } }: BlogProps) => {
  const response = await fetch(`${serverUrl}/Blog/getOneSlug/${slug}?type=${type}`);
  const blogData = await response.json();
  // const response = await fetch(`${serverUrl}/Blog/getList?type=${type}`);
  // const data: Blog[] = await response.json();
  // const blog = data.find((blog: Blog) => blog.slug === slug);
  // const blogData = await fetch(`${serverUrl}/Blog/getOne/${blog?.id}?type=${type}`).then((res) =>
  //   res.json()
  // );
  if (!blogData) {
    return <div>Blog not found</div>;
  }

  const content = (
    <span
      className="mx-auto block max-w-7xl [&>*]:leading-7 [&>p>img]:mx-auto [&>p>img]:my-4 [&>p>img]:aspect-video [&>p>img]:max-w-4xl [&>p>img]:rounded-md [&>p>img]:border-2 [&>p>img]:border-gray-300 [&>p>img]:object-cover [&>p>img]:drop-shadow-lg [&>p]:text-lg [&>p]:font-normal [&>p]:text-slate-900 dark:[&>p]:text-neutral-100"
      dangerouslySetInnerHTML={{ __html: blogData?.content }}
    />
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="z-[5] h-full w-full">
        <div className="space-y-2 p-4 md:p-8">
          <p className="text-center">Ngày cập nhật: {formatDate(blogData.createdAt)}</p>
          <div className="space-y-6 pt-6 max-w-screen-lg mx-auto">
            <h1 className="text-center text-3xl font-black">{blogData.title}</h1>
            <p className="text-center">Tác giả: {blogData.normalizedName || "Unknown"}</p>
            <Image
              src={blogData.imageUrl}
              alt={blogData.title}
              width={1200}
              height={600}
              priority
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
