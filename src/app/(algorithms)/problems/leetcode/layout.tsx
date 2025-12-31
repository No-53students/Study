"use client";

import { useState, useEffect } from "react";

const FULLSCREEN_KEY = "leetcode-fullscreen";

export default function LeetCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 恢复状态
  useEffect(() => {
    const saved = localStorage.getItem(FULLSCREEN_KEY);
    if (saved !== null) {
      setIsFullscreen(saved === "true");
    }
    setIsLoaded(true);
  }, []);

  // 保存状态到 localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FULLSCREEN_KEY, String(isFullscreen));
    }
  }, [isFullscreen, isLoaded]);

  // 快捷键切换全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + F: 切换全屏模式
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "f") {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 等待加载完成，避免闪烁
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400">加载中...</div>
      </div>
    );
  }

  return (
    <>
      {/* 根据模式决定布局 */}
      {isFullscreen ? (
        <div className="fixed inset-0 z-[100] bg-zinc-950">
          {/* 全屏模式下的退出按钮 - 固定在左上角 */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed left-3 top-3 z-[102] flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 transition-all shadow-lg"
            title="显示全局导航 (Ctrl+Shift+F)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span>导航</span>
          </button>
          {children}
        </div>
      ) : (
        <div className="min-h-screen bg-zinc-950">
          {/* 非全屏模式下的进入专注模式按钮 */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="fixed right-4 top-4 z-[102] flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all shadow-lg"
            title="进入专注模式 (Ctrl+Shift+F)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>专注模式</span>
          </button>
          {children}
        </div>
      )}
    </>
  );
}
