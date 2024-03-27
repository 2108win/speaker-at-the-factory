import type { Metadata } from "next";
import "../globals.css";
import { Exo as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

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
    images: "/og_image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
