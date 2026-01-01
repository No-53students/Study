import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarNav, SmartBottomNav } from "@/components/navigation";
import { getAppRoutes, ROUTE_GROUPS } from "@/lib/routes";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "算法学习平台",
  description: "React 开发教程与 LeetCode 算法题库学习工具",
  keywords: ["React", "算法", "LeetCode", "前端", "教程", "Hooks"],
  authors: [{ name: "开发者" }],
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
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  other: {
    "msapplication-TileColor": "#09090b",
    "msapplication-TileImage": "/icons/icon-144.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // 允许用户缩放，符合 WCAG 可访问性要求
  userScalable: true,
  viewportFit: "cover", // 关键：让内容延伸到安全区域
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
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
        <ServiceWorkerRegistration />
        <SidebarNav groups={sidebarGroups} />
        <SmartBottomNav />
        <main className="main-content main-content-with-nav h-[100dvh] overflow-y-auto overscroll-contain bg-zinc-50 pt-[var(--safe-area-top)] pb-[var(--safe-area-bottom)] dark:bg-zinc-950">
          {children}
        </main>
      </body>
    </html>
  );
}
