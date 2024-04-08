import Loading from "@/components/page/blogs/loading";
import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

type Props = {
  id: string;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const data = await fetch(
    `${process.env.NODE_ENV}/Blog/getList?page=1&pageSize=10`,
  );
  const dataJson: Props[] = await data.json();
  return dataJson.map(({ id }) => id);
}

export default async function BlogById({ params }: { params: { id: string } }) {
  const blogData = await fetch(
    `${process.env.SERVER_URL}/Blog/getBlog/` + params.id,
  ).then((res) => res.json());

  return (
    <div className="z-[5] h-full min-h-[calc(100dvh-104px)] w-full">
      <Suspense fallback={<Loading />}>
        <div className="space-y-4 p-4 md:p-8">
          <div className="space-y-6 pt-6">
            <h1 className="text-center text-3xl font-black">
              {blogData.title}
            </h1>
            <span
              className="mx-auto block max-w-7xl [&>*]:leading-7 [&>p>img]:mx-auto [&>p>img]:my-4 [&>p>img]:aspect-video [&>p>img]:max-w-4xl [&>p>img]:rounded-md [&>p>img]:border-2 [&>p>img]:border-gray-300 [&>p>img]:object-cover [&>p>img]:drop-shadow-lg [&>p]:text-lg [&>p]:font-normal [&>p]:text-slate-900 dark:[&>p]:text-neutral-100"
              dangerouslySetInnerHTML={{ __html: blogData.content }}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
