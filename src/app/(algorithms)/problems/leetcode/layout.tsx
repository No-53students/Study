"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

const FULLSCREEN_KEY = "leetcode-fullscreen";
const BUTTON_POSITION_KEY = "leetcode-button-position";
const BUTTON_MINIMIZED_KEY = "leetcode-button-minimized";
const AUTO_FULLSCREEN_TRIGGERED_KEY = "leetcode-auto-fullscreen-triggered";

interface Position {
  x: number;
  y: number;
}

// 检查是否支持浏览器全屏 API
function isFullscreenSupported(): boolean {
  return !!(
    document.fullscreenEnabled ||
    (document as { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled
  );
}

// 检查当前是否处于浏览器全屏状态
function isBrowserFullscreen(): boolean {
  return !!(
    document.fullscreenElement ||
    (document as { webkitFullscreenElement?: Element }).webkitFullscreenElement
  );
}

// 进入浏览器全屏
async function enterBrowserFullscreen(): Promise<boolean> {
  try {
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
      return true;
    } else if (elem.webkitRequestFullscreen) {
      await elem.webkitRequestFullscreen();
      return true;
    }
  } catch {
    // 用户拒绝或不支持
  }
  return false;
}

// 退出浏览器全屏
async function exitBrowserFullscreen(): Promise<boolean> {
  try {
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
    };
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
      return true;
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

export default function LeetCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isBrowserFs, setIsBrowserFs] = useState(false); // 浏览器全屏状态
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: -1, y: -1 }); // -1 表示使用默认位置
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [supportsFullscreen, setSupportsFullscreen] = useState(false);
  const [hasTriggeredAutoFullscreen, setHasTriggeredAutoFullscreen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef(pathname);

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

    // 检查全屏支持
    setSupportsFullscreen(isFullscreenSupported());
    setIsBrowserFs(isBrowserFullscreen());

    // 检查是否已经触发过自动全屏
    const autoTriggered = sessionStorage.getItem(AUTO_FULLSCREEN_TRIGGERED_KEY);
    setHasTriggeredAutoFullscreen(autoTriggered === "true");

    setIsLoaded(true);
  }, []);

  // 用户首次操作时自动进入浏览器全屏
  useEffect(() => {
    if (!isLoaded || !supportsFullscreen || hasTriggeredAutoFullscreen || isBrowserFs) {
      return;
    }

    const triggerFullscreen = async () => {
      // 标记已触发，避免重复
      setHasTriggeredAutoFullscreen(true);
      sessionStorage.setItem(AUTO_FULLSCREEN_TRIGGERED_KEY, "true");
      await enterBrowserFullscreen();
    };

    // 监听用户的首次交互
    const handleInteraction = () => {
      triggerFullscreen();
      // 移除所有监听器
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("scroll", handleInteraction, true);
      document.removeEventListener("wheel", handleInteraction);
      document.removeEventListener("touchmove", handleInteraction);
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { capture: true, once: true });
    document.addEventListener("wheel", handleInteraction, { once: true });
    document.addEventListener("touchmove", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("scroll", handleInteraction, true);
      document.removeEventListener("wheel", handleInteraction);
      document.removeEventListener("touchmove", handleInteraction);
    };
  }, [isLoaded, supportsFullscreen, hasTriggeredAutoFullscreen, isBrowserFs]);

  // 监听浏览器全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFs(isBrowserFullscreen());
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 路由变化时保持全屏状态（从 localStorage 读取）并尝试进入浏览器全屏
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      // 路由变化时，从 localStorage 重新读取全屏状态
      const saved = localStorage.getItem(FULLSCREEN_KEY);
      if (saved !== null) {
        setIsFullscreen(saved === "true");
      }
      // 路由切换时，如果不在全屏状态，尝试进入全屏（需要用户手势触发，这里记录意图）
      if (supportsFullscreen && !isBrowserFullscreen()) {
        // 标记需要在下次用户交互时进入全屏
        setHasTriggeredAutoFullscreen(false);
        sessionStorage.removeItem(AUTO_FULLSCREEN_TRIGGERED_KEY);
      }
    }
  }, [pathname, supportsFullscreen]);

  // 全屏模式时隐藏移动端导航栏
  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add("leetcode-fullscreen");
    } else {
      document.body.classList.remove("leetcode-fullscreen");
    }
    return () => {
      document.body.classList.remove("leetcode-fullscreen");
    };
  }, [isFullscreen]);

  // 切换浏览器全屏
  const toggleBrowserFullscreen = useCallback(async () => {
    if (isBrowserFs) {
      await exitBrowserFullscreen();
    } else {
      await enterBrowserFullscreen();
    }
  }, [isBrowserFs]);

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
      <div className="flex items-center bg-zinc-800/90 backdrop-blur-sm rounded border border-zinc-700/50 shadow-md overflow-hidden">
        {/* 拖拽手柄 */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="px-1 py-1 cursor-grab active:cursor-grabbing hover:bg-zinc-700/50 transition-colors"
          title="拖拽移动"
        >
          <svg
            className="w-2.5 h-2.5 text-zinc-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="5" cy="5" r="2.5" />
            <circle cx="12" cy="5" r="2.5" />
            <circle cx="5" cy="12" r="2.5" />
            <circle cx="12" cy="12" r="2.5" />
            <circle cx="5" cy="19" r="2.5" />
            <circle cx="12" cy="19" r="2.5" />
          </svg>
        </div>

        {/* 切换专注模式按钮 */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={`flex items-center gap-1 px-1.5 py-1 text-[10px] transition-colors ${
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
                className="w-3 h-3"
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
                className="w-3 h-3"
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

        {/* 浏览器全屏按钮 */}
        {supportsFullscreen && (
          <button
            onClick={toggleBrowserFullscreen}
            className={`flex items-center gap-1 px-1.5 py-1 text-[10px] transition-colors ${
              isBrowserFs
                ? "text-amber-400 hover:text-amber-300 hover:bg-amber-600/20"
                : "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
            }`}
            title={isBrowserFs ? "退出浏览器全屏" : "浏览器全屏（隐藏地址栏）"}
          >
            {isBrowserFs ? (
              <>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                  />
                </svg>
                {!isMinimized && <span>退出</span>}
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
                {!isMinimized && <span>全屏</span>}
              </>
            )}
          </button>
        )}

        {/* 最小化/展开按钮 */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="px-1 py-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 transition-colors"
          title={isMinimized ? "展开按钮" : "最小化按钮"}
        >
          <svg
            className="w-2.5 h-2.5"
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
