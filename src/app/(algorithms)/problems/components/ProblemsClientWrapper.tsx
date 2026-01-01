"use client";

import { ReactNode } from "react";
import { KeyboardShortcuts, ShortcutHint } from "./KeyboardShortcuts";

interface ProblemsClientWrapperProps {
  children: ReactNode;
}

/**
 * 客户端包装器，提供键盘快捷键等交互功能
 */
export function ProblemsClientWrapper({ children }: ProblemsClientWrapperProps) {
  return (
    <>
      {children}
      <KeyboardShortcuts />
      <ShortcutHint />
    </>
  );
}
