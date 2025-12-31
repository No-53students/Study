"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

// 动态导入 Monaco Editor 避免 SSR 问题
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center bg-zinc-900/95">
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
    easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
  };

  const difficultyLabels = {
    easy: "简单",
    medium: "中等",
    hard: "困难",
  };

  const difficultyIcons = {
    easy: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    medium: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    hard: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
      </svg>
    ),
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-lg">
      {/* 题目区域 */}
      <div className="border-b border-zinc-200 dark:border-zinc-700/50 bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/80 p-5">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
          <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficultyIcons[difficulty]}
            {difficultyLabels[difficulty]}
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>

        {/* 提示区域 */}
        {hints.length > 0 && (
          <div className="mt-4">
            {!showHints ? (
              <button
                onClick={() => setShowHints(true)}
                className="flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <span>需要提示？</span>
              </button>
            ) : (
              <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 border border-amber-200/50 dark:border-amber-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    提示 {currentHintIndex + 1}/{hints.length}
                  </span>
                  {currentHintIndex < hints.length - 1 && (
                    <button
                      onClick={showNextHint}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                    >
                      显示更多提示 →
                    </button>
                  )}
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-300/90">
                  {hints[currentHintIndex]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 工具栏 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-zinc-100 dark:bg-zinc-900 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-zinc-200 dark:border-zinc-700/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-amber-500/10 dark:bg-amber-500/20">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">{language}</span>
          </div>
          {allPassed && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white shadow-sm shadow-emerald-500/30">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              已完成
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
          {solution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                showSolution
                  ? "bg-amber-500 text-white shadow-sm shadow-amber-500/30"
                  : "bg-zinc-200/80 dark:bg-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={showSolution ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"}/>
              </svg>
              <span className="hidden sm:inline">{showSolution ? "隐藏答案" : "查看答案"}</span>
              <span className="sm:hidden">{showSolution ? "隐藏" : "答案"}</span>
            </button>
          )}
          <button
            onClick={copyCode}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-700/80 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/>
            </svg>
            <span className="hidden sm:inline">复制</span>
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-700/80 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
            <span className="hidden sm:inline">重置</span>
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-700 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
          >
            {isRunning ? (
              <>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>运行中</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>运行</span>
              </>
            )}
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
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-medium text-white shadow-lg shadow-amber-500/30">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            参考答案
          </div>
        )}
      </div>

      {/* 输出区域 - 标签切换 */}
      <div className="border-t border-zinc-700/50 bg-zinc-900/95">
        <div className="flex border-b border-zinc-700/50">
          <button
            onClick={() => setActiveTab("testcases")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "testcases"
                ? "border-b-2 border-emerald-500 text-white bg-zinc-800/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            测试用例
            {testResults.length > 0 && (
              <span className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${
                passedCount === testResults.length
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}>
                {passedCount}/{testResults.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("console")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "console"
                ? "border-b-2 border-emerald-500 text-white bg-zinc-800/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
            </svg>
            控制台
            {consoleOutput.length > 0 && (
              <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-xs font-medium text-zinc-300">
                {consoleOutput.length}
              </span>
            )}
          </button>
          <button
            onClick={clearConsole}
            className="ml-auto flex items-center gap-1.5 px-4 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
            清空
          </button>
        </div>

        <div className="max-h-[250px] min-h-[120px] overflow-auto p-4">
          {activeTab === "testcases" ? (
            <div className="space-y-3">
              {testCases.map((tc, index) => {
                const result = testResults.find((r) => r.id === tc.id);
                return (
                  <div
                    key={tc.id}
                    className={`rounded-xl p-4 border transition-all ${
                      result
                        ? result.passed
                          ? "bg-emerald-500/10 border-emerald-500/20"
                          : "bg-red-500/10 border-red-500/20"
                        : "bg-zinc-800/50 border-zinc-700/50"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium text-white">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
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
                            index + 1
                          )}
                        </span>
                        {tc.name}
                      </span>
                      {result && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            result.passed
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {result.passed ? "通过" : "失败"}
                        </span>
                      )}
                    </div>
                    {tc.description && (
                      <p className="mb-3 text-xs text-zinc-400">{tc.description}</p>
                    )}
                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex gap-3">
                        <span className="text-zinc-500 w-10 shrink-0">输入</span>
                        <span className="text-zinc-300 bg-zinc-800/50 rounded px-2 py-0.5">{JSON.stringify(tc.input)}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-zinc-500 w-10 shrink-0">期望</span>
                        <span className="text-zinc-300 bg-zinc-800/50 rounded px-2 py-0.5">{JSON.stringify(tc.expected)}</span>
                      </div>
                      {result && (
                        <div className="flex gap-3">
                          <span className="text-zinc-500 w-10 shrink-0">输出</span>
                          <span className={`rounded px-2 py-0.5 ${
                            result.passed
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}>
                            {result.actual}
                          </span>
                          {result.error && (
                            <span className="text-red-400 ml-2">({result.error})</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1.5 font-mono text-sm">
              {consoleOutput.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                  <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
                  </svg>
                  <span>运行代码查看输出...</span>
                </div>
              ) : (
                consoleOutput.map((output, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 ${
                      output.type === "error"
                        ? "bg-red-500/10"
                        : output.type === "warn"
                          ? "bg-amber-500/10"
                          : output.type === "info"
                            ? "bg-blue-500/10"
                            : output.type === "result"
                              ? "bg-emerald-500/10"
                              : "bg-zinc-800/30"
                    }`}
                  >
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${
                      output.type === "error"
                        ? "bg-red-500/20 text-red-400"
                        : output.type === "warn"
                          ? "bg-amber-500/20 text-amber-400"
                          : output.type === "info"
                            ? "bg-blue-500/20 text-blue-400"
                            : output.type === "result"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-zinc-700 text-zinc-400"
                    }`}>
                      {output.type === "error"
                        ? "ERR"
                        : output.type === "warn"
                          ? "WARN"
                          : output.type === "info"
                            ? "INFO"
                            : output.type === "result"
                              ? "RESULT"
                              : "LOG"}
                    </span>
                    <span className={`whitespace-pre-wrap ${
                      output.type === "error"
                        ? "text-red-300"
                        : output.type === "warn"
                          ? "text-amber-300"
                          : output.type === "info"
                            ? "text-blue-300"
                            : output.type === "result"
                              ? "text-emerald-300 font-medium"
                              : "text-zinc-200"
                    }`}>
                      {output.content}
                    </span>
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
