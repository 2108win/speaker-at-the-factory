import type { Metadata } from "next";
import "./globals.css";
import { Exo as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Loa tại xưởng - Chất lượng đỉnh cao, giá cả hợp lý",
    template: "%s - Loa tại xưởng",
  },
  description:
    "Sản xuất tại xưởng - Giá cả ổn định - Miễn phí vận chuyện nội thành - Bảo hành toàn quốc",
  openGraph: {
    images: [
      {
        url: `${process.env.CLIENT_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Loa tại xưởng",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="relative flex w-full flex-col items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
