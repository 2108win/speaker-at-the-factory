import type { Metadata } from "next";
import "./globals.css";
import { Exo as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";
export const dynamic = "force-static";
export const revalidate = false;
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Loa tại xưởng - Chất lượng đỉnh cao, giá cả hợp lý",
    template: "%s - Loa tại xưởng",
  },
  keywords: [
    "Loa tại xưởng",
    "LoaTaiXuong",
    "Loataixuong",
    "DSL pro",
    "Loa Tại Xưởng - Tâm huyết chạm đến từng âm bậc",
    "Tâm huyết chạm đến từng âm bậc",
  ],
  icons: {
    icon: {
      url: `${baseUrl}/favicon.ico`,
      type: "image/x-icon",
    },
  },
  description:
    "Sản xuất tại xưởng - Giá cả ổn định - Miễn phí vận chuyện nội thành - Bảo hành toàn quốc",
  openGraph: {
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Loa tại xưởng",
      },
    ],
    description:
      "Loa Tại Xưởng -Sản xuất tại xưởng - Giá cả ổn định - Miễn phí vận chuyện nội thành - Bảo hành toàn quốc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider localization={viVN}>
            <div className="relative flex h-full min-h-dvh w-full flex-col items-center justify-space-between bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
              <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
              <Header />
              {children}
              <Footer />
            </div>
          </ClerkProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
