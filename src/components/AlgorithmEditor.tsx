"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

// 动态导入 Monaco Editor 避免 SSR 问题
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center bg-zinc-900">
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

interface AlgorithmEditorProps {
  /** 算法题目标题 */
  title: string;
  /** 题目描述 */
  description: string;
  /** 初始代码模板 */
  initialCode: string;
  /** 参考答案（可选，用于提示） */
  solution?: string;
  /** 测试用例 */
  testCases: TestCase[];
  /** 提示信息（可选） */
  hints?: string[];
  /** 难度等级 */
  difficulty?: "easy" | "medium" | "hard";
  /** 编辑器高度 */
  height?: string;
  /** 编程语言 */
  language?: "javascript" | "typescript";
}

export function AlgorithmEditor({
  title,
  description,
  initialCode,
  solution,
  testCases,
  hints = [],
  difficulty = "easy",
  height = "300px",
  language = "javascript",
}: AlgorithmEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
  const [testResults, setTestResults] = useState<
    { id: string; passed: boolean; input: string; expected: string; actual: string; error?: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"console" | "testcases">("testcases");
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

    await new Promise((resolve) => setTimeout(resolve, 10));

    try {
      // 创建自定义 console
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

      // 包装代码以获取 solution 函数
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

      // 运行测试用例
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

        // 输出测试结果摘要
        const passedCount = results.filter((r) => r.passed).length;
        if (passedCount === results.length) {
          addConsoleOutput("result", `🎉 所有测试用例通过！(${passedCount}/${results.length})`);
        } else {
          addConsoleOutput("result", `测试结果: ${passedCount}/${results.length} 通过`);
        }
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

  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;

  const difficultyColors = {
    easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const difficultyLabels = {
    easy: "简单",
    medium: "中等",
    hard: "困难",
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      {/* 题目区域 */}
      <div className="border-b border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mb-2 flex items-center gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficultyLabels[difficulty]}
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>

        {/* 提示区域 */}
        {hints.length > 0 && (
          <div className="mt-3">
            {!showHints ? (
              <button
                onClick={() => setShowHints(true)}
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                💡 需要提示？
              </button>
            ) : (
              <div className="rounded-md bg-amber-50 p-3 dark:bg-amber-900/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    提示 {currentHintIndex + 1}/{hints.length}
                  </span>
                  {currentHintIndex < hints.length - 1 && (
                    <button
                      onClick={showNextHint}
                      className="text-xs text-amber-600 hover:underline dark:text-amber-400"
                    >
                      显示更多提示
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                  {hints[currentHintIndex]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 工具栏 */}
      <div className="flex items-center justify-between bg-zinc-100 px-4 py-2 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium capitalize">{language}</span>
          {allPassed && (
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
              ✓ 已完成
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {solution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="rounded bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            >
              {showSolution ? "隐藏答案" : "查看答案"}
            </button>
          )}
          <button
            onClick={copyCode}
            className="rounded bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            复制
          </button>
          <button
            onClick={resetCode}
            className="rounded bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            重置
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="rounded bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {isRunning ? "运行中..." : "▶ 运行"}
          </button>
        </div>
      </div>

      {/* 代码编辑器 */}
      <div className="relative">
        <Editor
          height={height}
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
          <div className="absolute right-2 top-2 rounded bg-amber-500 px-2 py-1 text-xs font-medium text-white">
            参考答案
          </div>
        )}
      </div>

      {/* 输出区域 - 标签切换 */}
      <div className="border-t border-zinc-700 bg-zinc-900">
        <div className="flex border-b border-zinc-700">
          <button
            onClick={() => setActiveTab("testcases")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "testcases"
                ? "border-b-2 border-green-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            测试用例 {testResults.length > 0 && `(${passedCount}/${testResults.length})`}
          </button>
          <button
            onClick={() => setActiveTab("console")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "console"
                ? "border-b-2 border-green-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            控制台 {consoleOutput.length > 0 && `(${consoleOutput.length})`}
          </button>
          <button
            onClick={clearConsole}
            className="ml-auto px-4 py-2 text-sm text-zinc-400 hover:text-white"
          >
            清空
          </button>
        </div>

        <div className="max-h-[250px] min-h-[120px] overflow-auto p-4">
          {activeTab === "testcases" ? (
            <div className="space-y-2">
              {testCases.map((tc, index) => {
                const result = testResults.find((r) => r.id === tc.id);
                return (
                  <div
                    key={tc.id}
                    className={`rounded p-3 ${
                      result
                        ? result.passed
                          ? "bg-green-900/30"
                          : "bg-red-900/30"
                        : "bg-zinc-800"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-white">
                        {result ? (result.passed ? "✓" : "✗") : "○"} 测试 {index + 1}: {tc.name}
                      </span>
                      {result && (
                        <span
                          className={`text-xs ${result.passed ? "text-green-400" : "text-red-400"}`}
                        >
                          {result.passed ? "通过" : "失败"}
                        </span>
                      )}
                    </div>
                    {tc.description && (
                      <p className="mb-2 text-xs text-zinc-400">{tc.description}</p>
                    )}
                    <div className="space-y-1 font-mono text-xs">
                      <div className="text-zinc-400">
                        输入: <span className="text-zinc-200">{JSON.stringify(tc.input)}</span>
                      </div>
                      <div className="text-zinc-400">
                        期望: <span className="text-zinc-200">{JSON.stringify(tc.expected)}</span>
                      </div>
                      {result && (
                        <div className={result.passed ? "text-green-400" : "text-red-400"}>
                          输出: <span>{result.actual}</span>
                          {result.error && (
                            <div className="mt-1 text-red-400">错误: {result.error}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1 font-mono text-sm">
              {consoleOutput.length === 0 ? (
                <div className="text-zinc-500">运行代码查看输出...</div>
              ) : (
                consoleOutput.map((output, index) => (
                  <div
                    key={index}
                    className={`${
                      output.type === "error"
                        ? "text-red-400"
                        : output.type === "warn"
                          ? "text-amber-400"
                          : output.type === "info"
                            ? "text-blue-400"
                            : output.type === "result"
                              ? "text-green-400 font-medium"
                              : "text-zinc-200"
                    }`}
                  >
                    <span className="mr-2 text-zinc-500">
                      {output.type === "error"
                        ? "[错误]"
                        : output.type === "warn"
                          ? "[警告]"
                          : output.type === "info"
                            ? "[信息]"
                            : output.type === "result"
                              ? "[结果]"
                              : ">"}
                    </span>
                    <span className="whitespace-pre-wrap">{output.content}</span>
                  </div>
                ))
              )}
              <div ref={consoleEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
