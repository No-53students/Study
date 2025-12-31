import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarNav, BottomNav } from "@/components/navigation";
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
  manifest: "/manifest.json",
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
    <html lang="zh-CN" className="h-full">
      <head>
        {/* PWA 全屏模式增强 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100dvh] overflow-hidden`}
      >
        <SidebarNav groups={sidebarGroups} />
        <BottomNav />
        <main className="main-content main-content-with-nav h-[100dvh] overflow-y-auto overscroll-contain bg-zinc-50 pt-[var(--safe-area-top)] pb-[var(--safe-area-bottom)] lg:pt-0 lg:pb-0 dark:bg-zinc-950">
          {children}
        </main>
      </body>
    </html>
  );
}
