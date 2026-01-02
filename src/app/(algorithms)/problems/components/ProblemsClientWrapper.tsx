"use client";

import { ReactNode } from "react";
import { KeyboardShortcuts, ShortcutHint } from "./KeyboardShortcuts";

interface ProblemsClientWrapperProps {
  children: ReactNode;
}

/**
 * 客户端包装器，提供键盘快捷键等交互功能
 * 移动端导航现在由全局的 SmartBottomNav 和 FloatingBackButton 处理
 */
export function ProblemsClientWrapper({ children }: ProblemsClientWrapperProps) {
  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4">
      {children}
      <KeyboardShortcuts />
      <ShortcutHint />
    </div>
  );
}
