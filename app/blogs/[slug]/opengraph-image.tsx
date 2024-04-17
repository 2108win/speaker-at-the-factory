import { Blog } from "@/interfaces/blog";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Blog Loa Tại Xưởng";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const res = await fetch("https://1c6d5c6c04154692833486023b73778f.api.mockbin.io/");
  const data: Blog[] = await res.json();
  const blogData = data.find((blog: Blog) => blog.id === params.slug);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: `url(${blogData?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {blogData?.title}
      </div>
    ),
    {
      ...size,
    }
  );
}
