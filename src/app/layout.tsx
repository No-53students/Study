import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getAppRoutes, ROUTE_GROUPS } from "@/lib/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React 开发教程",
  description: "Next.js 16 + React 19 + React Compiler 示例教程",
  // 微信/Safari 全屏模式
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "算法学习",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // 关键：让内容延伸到安全区域
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 获取各分组的路由
  const sidebarGroups = ROUTE_GROUPS.map((group) => ({
    name: group.name,
    title: group.title,
    icon: group.icon,
    path: group.path,
    routes: getAppRoutes(group.name).map((route) => ({
      path: route.path,
      name: route.name,
      displayName: route.displayName,
    })),
  }));

  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar groups={sidebarGroups} />
        <main className="min-h-screen bg-zinc-50 pt-14 lg:ml-64 lg:pt-0 dark:bg-zinc-950">
          {children}
        </main>
      </body>
    </html>
  );
}
