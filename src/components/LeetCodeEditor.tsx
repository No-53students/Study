"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// 动态导入 Monaco Editor 避免 SSR 问题
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-zinc-900/95">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-2 border-zinc-700"></div>
          <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
        </div>
        <span className="text-sm text-zinc-400">加载编辑器中...</span>
      </div>
    </div>
  ),
});

// 控制台输出类型
type ConsoleType = "log" | "error" | "warn" | "info" | "result";

interface ConsoleOutput {
  type: ConsoleType;
  content: string;
  timestamp: number;
}

interface TestCase {
  id: string;
  name: string;
  input: unknown[];
  expected: unknown;
  description?: string;
}

interface LeetCodeEditorProps {
  /** 算法题目标题 */
  title: string;
  /** 题目描述（支持 Markdown） */
  description: string;
  /** 初始代码模板 */
  initialCode: string;
  /** 参考答案（可选） */
  solution?: string;
  /** 测试用例 */
  testCases: TestCase[];
  /** 提示信息（可选） */
  hints?: string[];
  /** 难度等级 */
  difficulty?: "easy" | "medium" | "hard";
  /** 编程语言 */
  language?: "javascript" | "typescript";
  /** 额外的说明文档（Markdown） */
  documentation?: string;
}

export function LeetCodeEditor({
  title,
  description,
  initialCode,
  solution,
  testCases,
  hints = [],
  difficulty = "easy",
  language = "javascript",
  documentation,
}: LeetCodeEditorProps) {
  // 状态
  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
  const [testResults, setTestResults] = useState<
    { id: string; passed: boolean; input: string; expected: string; actual: string; error?: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  // Tab 状态
  const [rightTab, setRightTab] = useState<"code" | "docs">("code");
  const [bottomTab, setBottomTab] = useState<"testcases" | "console">("testcases");

  // 布局状态 - 使用百分比，与题解页面保持一致
  const [leftPanelWidth, setLeftPanelWidth] = useState(40); // 百分比
  const [bottomHeight, setBottomHeight] = useState(200); // 像素
  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingVertical = useRef(false);
  const isDraggingHorizontal = useRef(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // 添加控制台输出
  const addConsoleOutput = useCallback((type: ConsoleType, content: string) => {
    setConsoleOutput((prev) => [...prev, { type, content, timestamp: Date.now() }]);
  }, []);

  // 清空控制台
  const clearConsole = useCallback(() => {
    setConsoleOutput([]);
    setTestResults([]);
  }, []);

  // 运行代码
  const runCode = useCallback(async () => {
    setIsRunning(true);
    clearConsole();
    setBottomTab("console");

    await new Promise((resolve) => setTimeout(resolve, 10));

    try {
      const customConsole = {
        log: (...args: unknown[]) => {
          const content = args
            .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
            .join(" ");
          addConsoleOutput("log", content);
        },
        error: (...args: unknown[]) => {
          const content = args.map((arg) => String(arg)).join(" ");
          addConsoleOutput("error", content);
        },
        warn: (...args: unknown[]) => {
          const content = args.map((arg) => String(arg)).join(" ");
          addConsoleOutput("warn", content);
        },
        info: (...args: unknown[]) => {
          const content = args.map((arg) => String(arg)).join(" ");
          addConsoleOutput("info", content);
        },
        table: (data: unknown) => {
          addConsoleOutput("log", JSON.stringify(data, null, 2));
        },
      };

      const wrappedCode = `
        return (async () => {
          ${code}
          return typeof solution !== "undefined" ? solution : null;
        })();
      `;

      const fn = new Function(
        "console",
        "setTimeout",
        "setInterval",
        "clearTimeout",
        "clearInterval",
        "Promise",
        wrappedCode
      );

      const solutionFn = await fn(
        customConsole,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval,
        Promise
      );

      if (testCases.length > 0 && solutionFn) {
        const results = await Promise.all(
          testCases.map(async (tc) => {
            try {
              let actual = solutionFn(...tc.input);
              if (actual instanceof Promise) {
                actual = await actual;
              }
              const actualStr = JSON.stringify(actual);
              const expectedStr = JSON.stringify(tc.expected);
              const passed = actualStr === expectedStr;

              return {
                id: tc.id,
                passed,
                input: JSON.stringify(tc.input),
                expected: expectedStr,
                actual: actualStr,
              };
            } catch (e) {
              return {
                id: tc.id,
                passed: false,
                input: JSON.stringify(tc.input),
                expected: JSON.stringify(tc.expected),
                actual: "执行错误",
                error: e instanceof Error ? e.message : String(e),
              };
            }
          })
        );
        setTestResults(results);

        const passedCount = results.filter((r) => r.passed).length;
        if (passedCount === results.length) {
          addConsoleOutput("result", `🎉 所有测试用例通过！(${passedCount}/${results.length})`);
        } else {
          addConsoleOutput("result", `测试结果: ${passedCount}/${results.length} 通过`);
        }
        setBottomTab("testcases");
      }
    } catch (e) {
      addConsoleOutput("error", `执行错误: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, testCases, addConsoleOutput, clearConsole]);

  // 重置代码
  const resetCode = useCallback(() => {
    setCode(initialCode);
    clearConsole();
    setShowSolution(false);
    setCurrentHintIndex(0);
  }, [initialCode, clearConsole]);

  // 显示下一个提示
  const showNextHint = useCallback(() => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1);
    }
    setShowHints(true);
  }, [currentHintIndex, hints.length]);

  // 复制代码
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }, [code]);

  // 拖拽处理 - 与题解页面完全一致的实现
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDraggingVertical.current && containerRef.current) {
        setIsDragging(true);
        const rect = containerRef.current.getBoundingClientRect();
        // 计算相对于容器的百分比
        const newWidth = ((clientX - rect.left) / rect.width) * 100;
        setLeftPanelWidth(Math.min(Math.max(newWidth, 20), 80));
      }
      if (isDraggingHorizontal.current && containerRef.current) {
        setIsDragging(true);
        const rect = containerRef.current.getBoundingClientRect();
        const newHeight = rect.bottom - clientY;
        const maxHeight = rect.height * 0.5;
        setBottomHeight(Math.min(Math.max(newHeight, 120), maxHeight));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      isDraggingVertical.current = false;
      isDraggingHorizontal.current = false;
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
  }, []);

  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;

  const difficultyConfig = {
    easy: { label: "简单", color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/30", glow: "shadow-emerald-500/10" },
    medium: { label: "中等", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/30", glow: "shadow-amber-500/10" },
    hard: { label: "困难", color: "text-rose-400", bg: "bg-rose-500/15", border: "border-rose-500/30", glow: "shadow-rose-500/10" },
  };

  return (
    <div
      ref={containerRef}
      className={`flex h-[var(--main-content-height)] lg:h-[100dvh] bg-zinc-900 text-white ${isDragging ? 'select-none' : ''}`}
    >
      {/* 左侧面板 - 题目描述 */}
      <div
        className="flex flex-col border-r border-zinc-700/80 overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950"
        style={{ width: `${leftPanelWidth}%` }}
      >
        {/* 左侧标签栏 */}
        <div className="flex items-center border-b border-zinc-700/80 bg-zinc-800/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-white border-b-2 border-emerald-500">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            题目描述
          </div>
        </div>

        {/* 题目内容 */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-5 pb-[calc(1.25rem+var(--safe-area-bottom))]">
            {/* 标题和难度 */}
            <div className="mb-5">
              <h1 className="text-xl font-bold mb-3 text-white">{title}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${difficultyConfig[difficulty].color} ${difficultyConfig[difficulty].bg} ${difficultyConfig[difficulty].border} border shadow-sm ${difficultyConfig[difficulty].glow}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"/>
                  {difficultyConfig[difficulty].label}
                </span>
                {allPassed && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 shadow-sm shadow-emerald-500/10">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    已解决
                  </span>
                )}
              </div>
            </div>

            {/* 题目描述 - 支持 Markdown */}
            <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-pre:overflow-x-auto prose-pre:max-w-full prose-code:break-all">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            </div>

            {/* 提示区域 */}
            {hints.length > 0 && (
              <div className="mt-6 pt-5 border-t border-zinc-700/50">
                {!showHints ? (
                  <button
                    onClick={() => setShowHints(true)}
                    className="group flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 group-hover:bg-amber-500/25 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    显示提示 ({hints.length})
                  </button>
                ) : (
                  <div className="rounded-xl bg-gradient-to-br from-amber-900/20 to-amber-900/10 border border-amber-700/40 p-4 shadow-lg shadow-amber-500/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-2 text-sm font-semibold text-amber-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        提示 {currentHintIndex + 1}/{hints.length}
                      </span>
                      {currentHintIndex < hints.length - 1 && (
                        <button
                          onClick={showNextHint}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          下一个
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-amber-100/90 leading-relaxed">{hints[currentHintIndex]}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 垂直拖拽条 */}
      <div
        className={`w-1.5 bg-zinc-800 hover:bg-emerald-500/80 active:bg-emerald-500 cursor-col-resize transition-all touch-none flex items-center justify-center relative ${isDragging ? 'bg-emerald-500' : ''}`}
        onMouseDown={() => { isDraggingVertical.current = true; }}
        onTouchStart={(e) => { e.preventDefault(); isDraggingVertical.current = true; }}
      >
        <div className={`absolute inset-y-0 w-4 -translate-x-1/2 left-1/2`}/>
        <div className={`w-0.5 h-12 rounded-full transition-colors ${isDragging ? 'bg-white/60' : 'bg-zinc-600'}`} />
      </div>

      {/* 右侧面板 - 代码编辑器 + 控制台 */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-900">
        {/* 右侧标签栏 */}
        <div className="flex items-center justify-between border-b border-zinc-700/80 bg-zinc-800/80 backdrop-blur-sm">
          <div className="flex">
            <button
              onClick={() => setRightTab("code")}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                rightTab === "code"
                  ? "text-white border-b-2 border-emerald-500"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700/30"
              }`}
            >
              <div className={`flex h-5 w-5 items-center justify-center rounded ${rightTab === "code" ? "text-emerald-400" : ""}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              代码
            </button>
            {documentation && (
              <button
                onClick={() => setRightTab("docs")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                  rightTab === "docs"
                    ? "text-white border-b-2 border-emerald-500"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-700/30"
                }`}
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded ${rightTab === "docs" ? "text-emerald-400" : ""}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                说明文档
              </button>
            )}
          </div>

          {/* 工具栏 */}
          <div className="flex items-center gap-1.5 px-2">
            <span className="px-2 py-0.5 rounded text-xs text-zinc-500 bg-zinc-800 border border-zinc-700 capitalize font-mono">{language}</span>
            {solution && (
              <button
                onClick={() => setShowSolution(!showSolution)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  showSolution
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                    : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600 border border-zinc-600"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                {showSolution ? "隐藏答案" : "查看答案"}
              </button>
            )}
            <button
              onClick={copyCode}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-700/80 transition-colors"
              title="复制代码"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={resetCode}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-700/80 transition-colors"
              title="重置代码"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 transition-all active:scale-95"
            >
              {isRunning ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  运行中
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  运行
                </>
              )}
            </button>
          </div>
        </div>

        {/* 代码编辑器 / 说明文档 */}
        <div className="flex-1 min-h-0 relative">
          {rightTab === "code" ? (
            <>
              <Editor
                height="100%"
                defaultLanguage={language}
                value={showSolution && solution ? solution : code}
                onChange={(value) => {
                  if (!showSolution) {
                    setCode(value || "");
                  }
                }}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                  padding: { top: 16, bottom: 16 },
                  readOnly: showSolution,
                }}
              />
              {showSolution && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
                  参考答案
                </div>
              )}
            </>
          ) : (
            <div className="h-full overflow-y-auto p-4 prose prose-invert prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {documentation || ""}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* 水平拖拽条 */}
        <div
          className={`h-1.5 bg-zinc-800 hover:bg-emerald-500/80 active:bg-emerald-500 cursor-row-resize transition-all touch-none flex items-center justify-center relative ${isDragging ? 'bg-emerald-500' : ''}`}
          onMouseDown={() => { isDraggingHorizontal.current = true; }}
          onTouchStart={(e) => { e.preventDefault(); isDraggingHorizontal.current = true; }}
        >
          <div className={`absolute inset-x-0 h-4 -translate-y-1/2 top-1/2`}/>
          <div className={`w-12 h-0.5 rounded-full transition-colors ${isDragging ? 'bg-white/60' : 'bg-zinc-600'}`} />
        </div>

        {/* 底部控制台区域 */}
        <div
          className="flex flex-col bg-zinc-950"
          style={{ height: `${bottomHeight}px` }}
        >
          {/* 控制台标签栏 */}
          <div className="flex items-center justify-between border-b border-zinc-700/80 bg-zinc-800/80 px-2">
            <div className="flex">
              <button
                onClick={() => setBottomTab("testcases")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all ${
                  bottomTab === "testcases"
                    ? "text-white border-b-2 border-emerald-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg className={`w-4 h-4 ${bottomTab === "testcases" ? "text-emerald-400" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
                测试用例 {testResults.length > 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded text-xs font-semibold ${allPassed ? "text-emerald-400 bg-emerald-500/15" : "text-zinc-400 bg-zinc-700/50"}`}>
                    {passedCount}/{testResults.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setBottomTab("console")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all ${
                  bottomTab === "console"
                    ? "text-white border-b-2 border-emerald-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg className={`w-4 h-4 ${bottomTab === "console" ? "text-emerald-400" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                控制台 {consoleOutput.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-xs font-semibold text-zinc-400 bg-zinc-700/50">
                    {consoleOutput.length}
                  </span>
                )}
              </button>
            </div>
            <button
              onClick={clearConsole}
              className="flex items-center gap-1 px-2 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              清空
            </button>
          </div>

          {/* 控制台内容 */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-3">
            {bottomTab === "testcases" ? (
              <div className="space-y-2">
                {testCases.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                    <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <span className="text-sm">暂无测试用例</span>
                  </div>
                ) : (
                  testCases.map((tc, index) => {
                    const result = testResults.find((r) => r.id === tc.id);
                    return (
                      <div
                        key={tc.id}
                        className={`rounded-xl p-3.5 transition-all ${
                          result
                            ? result.passed
                              ? "bg-gradient-to-r from-emerald-900/25 to-emerald-900/10 border border-emerald-600/40 shadow-sm shadow-emerald-500/5"
                              : "bg-gradient-to-r from-red-900/25 to-red-900/10 border border-red-600/40 shadow-sm shadow-red-500/5"
                            : "bg-zinc-800/80 border border-zinc-700/60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="flex items-center gap-2 font-medium text-sm">
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${
                              result
                                ? result.passed
                                  ? "bg-emerald-500 text-white"
                                  : "bg-red-500 text-white"
                                : "bg-zinc-700 text-zinc-400"
                            }`}>
                              {result ? (
                                result.passed ? (
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                  </svg>
                                ) : (
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                  </svg>
                                )
                              ) : (
                                <span className="text-xs">{index + 1}</span>
                              )}
                            </span>
                            <span className={result ? (result.passed ? "text-emerald-300" : "text-red-300") : "text-zinc-200"}>
                              {tc.name}
                            </span>
                          </span>
                          {result && (
                            <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                              result.passed
                                ? "text-emerald-400 bg-emerald-500/20"
                                : "text-red-400 bg-red-500/20"
                            }`}>
                              {result.passed ? "Accepted" : "Wrong Answer"}
                            </span>
                          )}
                        </div>
                        {tc.description && (
                          <p className="text-xs text-zinc-400 mb-2.5 pl-7">{tc.description}</p>
                        )}
                        <div className="space-y-1.5 font-mono text-xs pl-7">
                          <div className="flex gap-2">
                            <span className="text-zinc-500 w-10 flex-shrink-0">输入</span>
                            <span className="text-zinc-300 bg-zinc-900/50 px-2 py-0.5 rounded">{JSON.stringify(tc.input)}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-zinc-500 w-10 flex-shrink-0">预期</span>
                            <span className="text-zinc-300 bg-zinc-900/50 px-2 py-0.5 rounded">{JSON.stringify(tc.expected)}</span>
                          </div>
                          {result && (
                            <div className="flex gap-2">
                              <span className="text-zinc-500 w-10 flex-shrink-0">输出</span>
                              <span className={`px-2 py-0.5 rounded ${
                                result.passed
                                  ? "text-emerald-400 bg-emerald-900/30"
                                  : "text-red-400 bg-red-900/30"
                              }`}>
                                {result.actual}
                              </span>
                            </div>
                          )}
                          {result?.error && (
                            <div className="mt-2 flex items-start gap-2 text-red-400 bg-red-900/20 rounded-lg p-2">
                              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                              </svg>
                              <span>{result.error}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="font-mono text-sm space-y-1.5">
                {consoleOutput.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                    <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-sm">运行代码查看输出...</span>
                  </div>
                ) : (
                  consoleOutput.map((output, index) => {
                    const typeConfig = {
                      error: { icon: "ERR", color: "text-red-400", bg: "bg-red-500/20", iconBg: "bg-red-500" },
                      warn: { icon: "WARN", color: "text-amber-400", bg: "bg-amber-500/20", iconBg: "bg-amber-500" },
                      info: { icon: "INFO", color: "text-blue-400", bg: "bg-blue-500/20", iconBg: "bg-blue-500" },
                      result: { icon: "OK", color: "text-emerald-400", bg: "bg-emerald-500/20", iconBg: "bg-emerald-500" },
                      log: { icon: "LOG", color: "text-zinc-200", bg: "bg-zinc-700/50", iconBg: "bg-zinc-600" },
                    };
                    const config = typeConfig[output.type];
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-2.5 p-2 rounded-lg ${config.bg}`}
                      >
                        <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-xs font-bold text-white ${config.iconBg}`}>
                          {config.icon}
                        </span>
                        <span className={`whitespace-pre-wrap break-all ${config.color}`}>{output.content}</span>
                      </div>
                    );
                  })
                )}
                <div ref={consoleEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
