/* eslint-disable @next/next/no-img-element*/
/* eslint-disable jsx-a11y/alt-text */
// ts-nocheck

import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "My default title";

    // ?image=<image>
    const hasImage = searchParams.has("image");
    const image = hasImage
      ? searchParams.get("image")?.slice(0, 100)
      : "https://loataixuong.com/og-image.jpg";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          >
            <img
              alt={title || "My default title"}
              src={image || ""}
              tw="w-full h-full object-cover object-center"
            />
          </div>
          <div
            // style={{
            //   fontSize: 100,
            //   letterSpacing: "-0.025em",
            //   color: "white",
            //   fontWeight: "900",
            //   textTransform: "uppercase",
            //   fontFamily: '"Thyssen J"',
            // }}
            tw="text-center text-[100px] font-extrabold !leading-normal text-white uppercase bg-black/50 rounded-lg p-2"
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
