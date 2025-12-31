"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const FULLSCREEN_KEY = "leetcode-fullscreen";
const BUTTON_POSITION_KEY = "leetcode-button-position";
const BUTTON_MINIMIZED_KEY = "leetcode-button-minimized";

interface Position {
  x: number;
  y: number;
}

export default function LeetCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: -1, y: -1 }); // -1 表示使用默认位置
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // 从 localStorage 恢复状态
  useEffect(() => {
    const saved = localStorage.getItem(FULLSCREEN_KEY);
    if (saved !== null) {
      setIsFullscreen(saved === "true");
    }

    const savedMinimized = localStorage.getItem(BUTTON_MINIMIZED_KEY);
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === "true");
    }

    const savedPosition = localStorage.getItem(BUTTON_POSITION_KEY);
    if (savedPosition) {
      try {
        const pos = JSON.parse(savedPosition);
        setPosition(pos);
      } catch {
        // ignore
      }
    }

    setIsLoaded(true);
  }, []);

  // 保存状态到 localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FULLSCREEN_KEY, String(isFullscreen));
    }
  }, [isFullscreen, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(BUTTON_MINIMIZED_KEY, String(isMinimized));
    }
  }, [isMinimized, isLoaded]);

  useEffect(() => {
    if (isLoaded && position.x !== -1) {
      localStorage.setItem(BUTTON_POSITION_KEY, JSON.stringify(position));
    }
  }, [position, isLoaded]);

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

  // 拖拽处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (buttonRef.current && e.touches.length === 1) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;

      // 限制在窗口范围内
      const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 40);
      const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 40);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, dragOffset]);

  // 计算按钮位置样式
  const getButtonStyle = (): React.CSSProperties => {
    if (position.x === -1) {
      // 默认位置：右下角
      return {
        right: "16px",
        bottom: "16px",
      };
    }
    return {
      left: `${position.x}px`,
      top: `${position.y}px`,
    };
  };

  // 等待加载完成，避免闪烁
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400">加载中...</div>
      </div>
    );
  }

  // 浮动按钮组件
  const FloatingButton = () => (
    <div
      ref={buttonRef}
      className={`fixed z-[102] select-none ${isDragging ? "cursor-grabbing" : ""}`}
      style={getButtonStyle()}
    >
      <div className="flex items-center gap-0.5 bg-zinc-800/95 backdrop-blur-sm rounded-lg border border-zinc-700 shadow-lg overflow-hidden">
        {/* 拖拽手柄 */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="px-1.5 py-2 cursor-grab active:cursor-grabbing hover:bg-zinc-700/50 transition-colors"
          title="拖拽移动"
        >
          <svg
            className="w-3 h-3 text-zinc-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </div>

        {/* 切换全屏/退出全屏按钮 */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={`flex items-center gap-1.5 px-2 py-1.5 text-xs transition-colors ${
            isFullscreen
              ? "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
              : "text-green-400 hover:text-green-300 hover:bg-green-600/20"
          }`}
          title={
            isFullscreen
              ? "退出专注模式 (Ctrl+Shift+F)"
              : "进入专注模式 (Ctrl+Shift+F)"
          }
        >
          {isFullscreen ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              {!isMinimized && <span>导航</span>}
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              {!isMinimized && <span>专注</span>}
            </>
          )}
        </button>

        {/* 最小化/展开按钮 */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="px-1.5 py-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 transition-colors"
          title={isMinimized ? "展开按钮" : "最小化按钮"}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMinimized ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 浮动控制按钮 */}
      <FloatingButton />

      {/* 根据模式决定布局 */}
      {isFullscreen ? (
        <div className="fixed inset-0 z-[100] bg-zinc-950">{children}</div>
      ) : (
        <div className="min-h-screen bg-zinc-950">
          {children}
        </div>
      )}
    </>
  );
}
