"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// 动态导入 Monaco Editor 避免 SSR 问题
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-zinc-900">
      <div className="text-zinc-400">加载编辑器中...</div>
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

  // 拖拽调整大小
  const [leftWidth, setLeftWidth] = useState(40); // 百分比
  const [bottomHeight, setBottomHeight] = useState(200); // 像素
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

  // 拖拽调整左侧宽度
  const handleVerticalDragStart = useCallback(() => {
    isDraggingVertical.current = true;
  }, []);

  // 拖拽调整底部高度
  const handleHorizontalDragStart = useCallback(() => {
    isDraggingHorizontal.current = true;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingVertical.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
        setLeftWidth(Math.min(Math.max(newWidth, 20), 60));
      }
      if (isDraggingHorizontal.current) {
        const windowHeight = window.innerHeight;
        const newHeight = windowHeight - e.clientY - 56; // 56px 为顶部高度
        setBottomHeight(Math.min(Math.max(newHeight, 100), 400));
      }
    };

    const handleMouseUp = () => {
      isDraggingVertical.current = false;
      isDraggingHorizontal.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;

  const difficultyConfig = {
    easy: { label: "简单", color: "text-green-500", bg: "bg-green-500/10" },
    medium: { label: "中等", color: "text-amber-500", bg: "bg-amber-500/10" },
    hard: { label: "困难", color: "text-red-500", bg: "bg-red-500/10" },
  };

  return (
    <div
      ref={containerRef}
      className="flex h-[calc(100vh-3.5rem)] bg-zinc-900 text-white"
    >
      {/* 左侧：题目描述 */}
      <div
        className="flex flex-col border-r border-zinc-700 overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {/* 左侧标签栏 */}
        <div className="flex items-center border-b border-zinc-700 bg-zinc-800">
          <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border-b-2 border-green-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            题目描述
          </div>
        </div>

        {/* 题目内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* 标题和难度 */}
          <div className="mb-4">
            <h1 className="text-xl font-bold mb-2">{title}</h1>
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${difficultyConfig[difficulty].color} ${difficultyConfig[difficulty].bg}`}>
              {difficultyConfig[difficulty].label}
            </span>
            {allPassed && (
              <span className="ml-2 inline-block px-2 py-0.5 rounded text-xs font-medium text-green-500 bg-green-500/10">
                ✓ 已解决
              </span>
            )}
          </div>

          {/* 题目描述 - 支持 Markdown */}
          <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>

          {/* 提示区域 */}
          {hints.length > 0 && (
            <div className="mt-6 pt-4 border-t border-zinc-700">
              {!showHints ? (
                <button
                  onClick={() => setShowHints(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  💡 显示提示
                </button>
              ) : (
                <div className="rounded-lg bg-amber-900/20 border border-amber-700/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-400">
                      提示 {currentHintIndex + 1}/{hints.length}
                    </span>
                    {currentHintIndex < hints.length - 1 && (
                      <button
                        onClick={showNextHint}
                        className="text-xs text-amber-400 hover:text-amber-300"
                      >
                        下一个提示 →
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-amber-200">{hints[currentHintIndex]}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 垂直拖拽条 */}
      <div
        className="w-1 bg-zinc-700 hover:bg-blue-500 cursor-col-resize transition-colors"
        onMouseDown={handleVerticalDragStart}
      />

      {/* 右侧：代码编辑器 + 控制台 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 右侧标签栏 */}
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800">
          <div className="flex">
            <button
              onClick={() => setRightTab("code")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                rightTab === "code"
                  ? "text-white border-b-2 border-green-500"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              代码
            </button>
            {documentation && (
              <button
                onClick={() => setRightTab("docs")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  rightTab === "docs"
                    ? "text-white border-b-2 border-green-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                说明文档
              </button>
            )}
          </div>

          {/* 工具栏 */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs text-zinc-500 capitalize">{language}</span>
            {solution && (
              <button
                onClick={() => setShowSolution(!showSolution)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  showSolution
                    ? "bg-amber-600 text-white"
                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {showSolution ? "隐藏答案" : "查看答案"}
              </button>
            )}
            <button
              onClick={copyCode}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-700"
              title="复制代码"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={resetCode}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-700"
              title="重置代码"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="h-1 bg-zinc-700 hover:bg-blue-500 cursor-row-resize transition-colors"
          onMouseDown={handleHorizontalDragStart}
        />

        {/* 底部控制台区域 */}
        <div
          className="flex flex-col bg-zinc-900 border-t border-zinc-700"
          style={{ height: `${bottomHeight}px` }}
        >
          {/* 控制台标签栏 */}
          <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-2">
            <div className="flex">
              <button
                onClick={() => setBottomTab("testcases")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  bottomTab === "testcases"
                    ? "text-white border-b-2 border-green-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                测试用例 {testResults.length > 0 && (
                  <span className={`ml-1 ${allPassed ? "text-green-400" : "text-zinc-400"}`}>
                    ({passedCount}/{testResults.length})
                  </span>
                )}
              </button>
              <button
                onClick={() => setBottomTab("console")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  bottomTab === "console"
                    ? "text-white border-b-2 border-green-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                控制台 {consoleOutput.length > 0 && (
                  <span className="ml-1 text-zinc-400">({consoleOutput.length})</span>
                )}
              </button>
            </div>
            <button
              onClick={clearConsole}
              className="px-2 py-1 text-xs text-zinc-400 hover:text-white"
            >
              清空
            </button>
          </div>

          {/* 控制台内容 */}
          <div className="flex-1 overflow-y-auto p-3">
            {bottomTab === "testcases" ? (
              <div className="space-y-2">
                {testCases.length === 0 ? (
                  <div className="text-zinc-500 text-sm">暂无测试用例</div>
                ) : (
                  testCases.map((tc, index) => {
                    const result = testResults.find((r) => r.id === tc.id);
                    return (
                      <div
                        key={tc.id}
                        className={`rounded-lg p-3 ${
                          result
                            ? result.passed
                              ? "bg-green-900/20 border border-green-700/50"
                              : "bg-red-900/20 border border-red-700/50"
                            : "bg-zinc-800 border border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {result ? (
                              result.passed ? (
                                <span className="text-green-400">✓</span>
                              ) : (
                                <span className="text-red-400">✗</span>
                              )
                            ) : (
                              <span className="text-zinc-500">○</span>
                            )}{" "}
                            Case {index + 1}: {tc.name}
                          </span>
                          {result && (
                            <span className={`text-xs ${result.passed ? "text-green-400" : "text-red-400"}`}>
                              {result.passed ? "Accepted" : "Wrong Answer"}
                            </span>
                          )}
                        </div>
                        {tc.description && (
                          <p className="text-xs text-zinc-400 mb-2">{tc.description}</p>
                        )}
                        <div className="space-y-1 font-mono text-xs">
                          <div className="flex">
                            <span className="text-zinc-500 w-12 flex-shrink-0">输入:</span>
                            <span className="text-zinc-300">{JSON.stringify(tc.input)}</span>
                          </div>
                          <div className="flex">
                            <span className="text-zinc-500 w-12 flex-shrink-0">预期:</span>
                            <span className="text-zinc-300">{JSON.stringify(tc.expected)}</span>
                          </div>
                          {result && (
                            <div className="flex">
                              <span className="text-zinc-500 w-12 flex-shrink-0">输出:</span>
                              <span className={result.passed ? "text-green-400" : "text-red-400"}>
                                {result.actual}
                              </span>
                            </div>
                          )}
                          {result?.error && (
                            <div className="mt-1 text-red-400 text-xs">
                              错误: {result.error}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="font-mono text-sm space-y-1">
                {consoleOutput.length === 0 ? (
                  <div className="text-zinc-500">运行代码查看输出...</div>
                ) : (
                  consoleOutput.map((output, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 ${
                        output.type === "error"
                          ? "text-red-400"
                          : output.type === "warn"
                            ? "text-amber-400"
                            : output.type === "info"
                              ? "text-blue-400"
                              : output.type === "result"
                                ? "text-green-400"
                                : "text-zinc-200"
                      }`}
                    >
                      <span className="text-zinc-600 select-none">
                        {output.type === "error" ? "✕" : output.type === "warn" ? "⚠" : output.type === "result" ? "→" : ">"}
                      </span>
                      <span className="whitespace-pre-wrap break-all">{output.content}</span>
                    </div>
                  ))
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
