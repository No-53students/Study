"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SwipeNavigationOptions {
  threshold?: number; // 触发切换的最小滑动距离
  enabled?: boolean; // 是否启用
}

/**
 * 左右滑动切换页面 Hook
 * 在详情页支持左右滑动切换上/下一个内容
 */
export function useSwipeNavigation(
  prevPath?: string,
  nextPath?: string,
  options: SwipeNavigationOptions = {}
) {
  const { threshold = 80, enabled = true } = options;
  const router = useRouter();
  const startX = useRef(0);
  const startY = useRef(0);
  const isNavigating = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isNavigating.current = false;
  }, [enabled]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || isNavigating.current) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;
    const deltaY = e.changedTouches[0].clientY - startY.current;

    // 确保是水平滑动（水平位移大于垂直位移）
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && prevPath) {
        // 向右滑动，去上一个
        isNavigating.current = true;
        router.push(prevPath);
      } else if (deltaX < 0 && nextPath) {
        // 向左滑动，去下一个
        isNavigating.current = true;
        router.push(nextPath);
      }
    }
  }, [enabled, threshold, prevPath, nextPath, router]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchEnd]);
}
