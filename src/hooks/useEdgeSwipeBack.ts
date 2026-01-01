"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface EdgeSwipeBackOptions {
  edgeWidth?: number; // 边缘区域宽度
  threshold?: number; // 触发返回的最小滑动距离
  enabled?: boolean; // 是否启用
}

/**
 * 边缘滑动返回 Hook
 * 从屏幕左边缘滑动触发返回
 */
export function useEdgeSwipeBack(options: EdgeSwipeBackOptions = {}) {
  const { edgeWidth = 20, threshold = 100, enabled = true } = options;
  const router = useRouter();
  const startX = useRef(0);
  const startY = useRef(0);
  const isEdge = useRef(false);
  const isNavigating = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    const x = e.touches[0].clientX;
    isEdge.current = x < edgeWidth;
    startX.current = x;
    startY.current = e.touches[0].clientY;
    isNavigating.current = false;
  }, [enabled, edgeWidth]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || !isEdge.current || isNavigating.current) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;
    const deltaY = e.changedTouches[0].clientY - startY.current;

    // 确保是水平滑动且从边缘开始
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > threshold) {
      isNavigating.current = true;
      router.back();
    }
  }, [enabled, threshold, router]);

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
