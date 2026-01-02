"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
}

/**
 * 全局键盘快捷键组件
 */
export function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts: Shortcut[] = [
    { key: "?", description: "显示快捷键帮助", action: () => setShowHelp(true) },
    { key: "h", description: "返回题库首页", action: () => router.push("/problems") },
    { key: "r", description: "学习路线", action: () => router.push("/problems/roadmap") },
    { key: "t", description: "解题模板", action: () => router.push("/concepts/templates") },
    { key: "c", description: "前端案例", action: () => router.push("/problems/cases") },
    { key: "g", description: "知识图谱", action: () => router.push("/problems/knowledge-graph") },
    { key: "l", description: "LeetCode练习", action: () => router.push("/problems/leetcode") },
    { key: "Escape", description: "关闭弹窗", action: () => setShowHelp(false) },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 忽略在输入框、文本区域中的按键
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // 忽略带修饰键的按键（除了 Shift）
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      const key = e.key;
      const shortcut = shortcuts.find(s => s.key === key || s.key.toLowerCase() === key.toLowerCase());

      if (shortcut) {
        e.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);

  if (!showHelp) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setShowHelp(false)}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>⌨️</span>
            键盘快捷键
          </h2>
          <button
            onClick={() => setShowHelp(false)}
            className="p-1 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="关闭"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts
            .filter(s => s.key !== "Escape")
            .map(shortcut => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{shortcut.description}</span>
                <kbd className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  {shortcut.key === "Escape" ? "Esc" : shortcut.key.toUpperCase()}
                </kbd>
              </div>
            ))}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 text-center">
            按 <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 mx-1">Esc</kbd> 关闭
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 快捷键提示按钮（显示在页面角落）
 */
export function ShortcutHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 3秒后自动隐藏提示
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-400 shadow-lg backdrop-blur-sm">
        <span>按</span>
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-mono">?</kbd>
        <span>查看快捷键</span>
      </div>
    </div>
  );
}
