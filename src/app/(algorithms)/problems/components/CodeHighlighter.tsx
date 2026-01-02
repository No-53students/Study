"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeHighlighterProps {
  code: string;
  language?: "typescript" | "javascript";
  showLineNumbers?: boolean;
  highlightLines?: number[];
  executingLine?: number;
  title?: string;
  showCopyButton?: boolean;
  maxHeight?: string;
  className?: string;
}

// 自定义主题，基于 oneDark 但调整背景色
const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
  },
};

export function CodeHighlighter({
  code,
  language = "typescript",
  showLineNumbers = true,
  highlightLines = [],
  executingLine,
  title,
  showCopyButton = true,
  maxHeight = "400px",
  className = "",
}: CodeHighlighterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm ${className}`}
    >
      {/* 头部工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          {/* 装饰点 */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="ml-2 text-sm text-zinc-400">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 uppercase">{language}</span>
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className="px-2 py-1 rounded text-xs bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  已复制
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  复制
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 代码区域 */}
      <div className="overflow-auto" style={{ maxHeight }}>
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#4a5568",
            userSelect: "none",
          }}
          lineProps={(lineNumber) => {
            const isHighlighted = highlightLines.includes(lineNumber);
            const isExecuting = executingLine === lineNumber;

            let style: React.CSSProperties = {
              display: "block",
              padding: "0 1rem",
              margin: "0 -1rem",
            };

            if (isExecuting) {
              style.backgroundColor = "rgba(234, 179, 8, 0.2)";
              style.borderLeft = "3px solid #eab308";
            } else if (isHighlighted) {
              style.backgroundColor = "rgba(59, 130, 246, 0.1)";
              style.borderLeft = "3px solid #3b82f6";
            }

            return { style };
          }}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

/**
 * 带动画的代码高亮组件，用于步骤演示
 */
interface AnimatedCodeHighlighterProps extends CodeHighlighterProps {
  animationKey?: string | number;
}

export function AnimatedCodeHighlighter({
  animationKey,
  ...props
}: AnimatedCodeHighlighterProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <CodeHighlighter {...props} />
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * 内联代码片段高亮
 */
interface InlineCodeProps {
  code: string;
  language?: "typescript" | "javascript";
}

export function InlineCode({ code, language = "typescript" }: InlineCodeProps) {
  return (
    <span className="inline-block">
      <SyntaxHighlighter
        language={language}
        style={customTheme}
        customStyle={{
          margin: 0,
          padding: "0.125rem 0.375rem",
          borderRadius: "0.375rem",
          display: "inline",
          fontSize: "0.875rem",
          background: "rgba(39, 39, 42, 0.8)",
        }}
        PreTag="span"
        CodeTag="span"
      >
        {code}
      </SyntaxHighlighter>
    </span>
  );
}
