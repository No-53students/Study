"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Problem, DIFFICULTY_CONFIG, CATEGORIES, Solution, FRONTEND_RELEVANCE_CONFIG } from "../types";
import {
  TwoPointersAnimation,
  LinkedListAnimation,
  TreeAnimation,
  MatrixAnimation,
  type TwoPointersStep,
  type LinkedListStep,
  type TreeStep,
  type MatrixStep,
} from "../components/animations";

// 动态导入 Monaco Editor
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

interface Props {
  problem: Problem;
}

export default function ProblemClient({ problem }: Props) {
  // 统一解法列表：将 solution 和 solutions 合并
  const allSolutions = useMemo<Solution[]>(() => {
    const solutions: Solution[] = [];

    // 如果有 solutions 数组，优先使用
    if (problem.solutions && problem.solutions.length > 0) {
      solutions.push(...problem.solutions);
    } else if (problem.solution) {
      // 否则将单个 solution 转换为 Solution 对象
      solutions.push({
        name: "参考答案",
        code: problem.solution,
        explanation: problem.explanation,
        timeComplexity: problem.timeComplexity,
        spaceComplexity: problem.spaceComplexity,
      });
    }

    return solutions;
  }, [problem.solution, problem.solutions, problem.explanation, problem.timeComplexity, problem.spaceComplexity]);

  // 代码状态
  const [code, setCode] = useState(problem.initialCode);
  const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
  const [testResults, setTestResults] = useState<
    { id: string; passed: boolean; input: string; expected: string; actual: string; error?: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
  const [showSolutionDropdown, setShowSolutionDropdown] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  // Tab 状态
  const [leftTab, setLeftTab] = useState<"description" | "solution">("description");
  const [bottomTab, setBottomTab] = useState<"testcases" | "console">("testcases");

  // 拖拽调整大小
  const [leftWidth, setLeftWidth] = useState(45);
  const [bottomHeight, setBottomHeight] = useState(220);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDraggingVertical = useRef(false);
  const isDraggingHorizontal = useRef(false);

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
          addConsoleOutput("error", args.map(String).join(" "));
        },
        warn: (...args: unknown[]) => {
          addConsoleOutput("warn", args.map(String).join(" "));
        },
        info: (...args: unknown[]) => {
          addConsoleOutput("info", args.map(String).join(" "));
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

      if (problem.testCases.length > 0 && solutionFn) {
        const results = await Promise.all(
          problem.testCases.map(async (tc) => {
            try {
              // 深拷贝输入，防止被修改
              const inputCopy = JSON.parse(JSON.stringify(tc.input));
              let actual = solutionFn(...inputCopy);
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
  }, [code, problem.testCases, addConsoleOutput, clearConsole]);

  // 重置代码
  const resetCode = useCallback(() => {
    setCode(problem.initialCode);
    clearConsole();
    setShowSolution(false);
    setShowSolutionDropdown(false);
    setSelectedSolutionIndex(0);
    setCurrentHintIndex(0);
  }, [problem.initialCode, clearConsole]);

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

  // 拖拽处理
  const handleVerticalDragStart = useCallback(() => {
    isDraggingVertical.current = true;
  }, []);

  const handleHorizontalDragStart = useCallback(() => {
    isDraggingHorizontal.current = true;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingVertical.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
        setLeftWidth(Math.min(Math.max(newWidth, 25), 65));
      }
      if (isDraggingHorizontal.current) {
        const windowHeight = window.innerHeight;
        const newHeight = windowHeight - e.clientY - 56;
        setBottomHeight(Math.min(Math.max(newHeight, 120), 450));
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

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSolutionDropdown(false);
      }
    };

    if (showSolutionDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSolutionDropdown]);

  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;
  const categoryInfo = CATEGORIES.find((c) => c.id === problem.category);
  const currentSolution = allSolutions[selectedSolutionIndex];

  return (
    <div
      ref={containerRef}
      className="flex h-screen bg-zinc-950 text-white"
    >
      {/* 左侧面板 */}
      <div
        className="flex flex-col border-r border-zinc-800 overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {/* 左侧标签栏 */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900">
          <Link
            href="/problems"
            className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ← 题库
          </Link>
          <div className="flex-1 flex">
            <button
              onClick={() => setLeftTab("description")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                leftTab === "description"
                  ? "text-white border-b-2 border-green-500"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              题目描述
            </button>
            <button
              onClick={() => setLeftTab("solution")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                leftTab === "solution"
                  ? "text-white border-b-2 border-green-500"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              题解
            </button>
          </div>
        </div>

        {/* 左侧内容 */}
        <div className="flex-1 overflow-y-auto">
          {leftTab === "description" ? (
            <div className="p-5">
              {/* 标题区 */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {problem.leetcodeId && (
                    <span className="text-zinc-500 text-sm">#{problem.leetcodeId}</span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[problem.difficulty].color} ${DIFFICULTY_CONFIG[problem.difficulty].bg}`}
                  >
                    {DIFFICULTY_CONFIG[problem.difficulty].label}
                  </span>
                  {problem.frontendRelevance && FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance] && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].color} ${FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].bg}`}
                      title={problem.frontendNote || FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].description}
                    >
                      <span>{FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].icon}</span>
                      <span>{FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].label}</span>
                    </span>
                  )}
                  {allPassed && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium text-green-400 bg-green-500/10">
                      ✓ 已解决
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold">{problem.title}</h1>
                {problem.titleEn && (
                  <p className="text-sm text-zinc-500 mt-1">{problem.titleEn}</p>
                )}
                {problem.frontendNote && (
                  <p className="text-xs text-zinc-500 mt-1 italic">💡 {problem.frontendNote}</p>
                )}
              </div>

              {/* 分类标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categoryInfo && (
                  <span className="px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-400">
                    {categoryInfo.icon} {categoryInfo.name}
                  </span>
                )}
                {problem.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 题目描述 */}
              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-code:text-green-400 prose-code:before:content-none prose-code:after:content-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {problem.description}
                </ReactMarkdown>

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {problem.examples}
                </ReactMarkdown>

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {problem.constraints}
                </ReactMarkdown>
              </div>

              {/* 提示区域 */}
              {problem.hints && problem.hints.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  {!showHints ? (
                    <button
                      onClick={() => setShowHints(true)}
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      💡 显示提示 ({problem.hints.length})
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {problem.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-amber-900/20 border border-amber-700/50 p-3"
                        >
                          <div className="text-xs text-amber-400 mb-1">
                            提示 {i + 1}
                          </div>
                          <p className="text-sm text-amber-200">{hint}</p>
                        </div>
                      ))}
                      {currentHintIndex < problem.hints.length - 1 && (
                        <button
                          onClick={() => setCurrentHintIndex((i) => i + 1)}
                          className="text-xs text-amber-400 hover:text-amber-300"
                        >
                          显示更多提示 →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-4">解题思路</h2>

              {/* 解法选择按钮 */}
              {allSolutions.length > 1 && (
                <div className="mb-4">
                  <div className="text-xs text-zinc-500 mb-2">选择解法：</div>
                  <div className="flex flex-wrap gap-2">
                    {allSolutions.map((sol, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSolutionIndex(index)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedSolutionIndex === index
                            ? "bg-green-600 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                        }`}
                      >
                        {sol.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 复杂度 */}
              {currentSolution && (
                <div className="flex gap-4 mb-4 text-sm">
                  <div className="px-3 py-1.5 rounded bg-zinc-800">
                    <span className="text-zinc-400">时间复杂度: </span>
                    <span className="text-green-400 font-mono">
                      {currentSolution.timeComplexity || problem.timeComplexity}
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-zinc-800">
                    <span className="text-zinc-400">空间复杂度: </span>
                    <span className="text-blue-400 font-mono">
                      {currentSolution.spaceComplexity || problem.spaceComplexity}
                    </span>
                  </div>
                </div>
              )}

              {/* 动画演示 */}
              {currentSolution?.animation && (
                <div className="mb-6">
                  {currentSolution.animation.type === "two-pointers" && (
                    <TwoPointersAnimation
                      steps={currentSolution.animation.steps as TwoPointersStep[]}
                      title={currentSolution.animation.title || "双指针演示"}
                      leftLabel={(currentSolution.animation.config?.leftLabel as string) || "left"}
                      rightLabel={(currentSolution.animation.config?.rightLabel as string) || "right"}
                    />
                  )}
                  {currentSolution.animation.type === "linked-list" && (
                    <LinkedListAnimation
                      steps={currentSolution.animation.steps as LinkedListStep[]}
                      title={currentSolution.animation.title || "链表演示"}
                    />
                  )}
                  {currentSolution.animation.type === "tree" && (
                    <TreeAnimation
                      steps={currentSolution.animation.steps as TreeStep[]}
                      title={currentSolution.animation.title || "二叉树演示"}
                    />
                  )}
                  {currentSolution.animation.type === "matrix" && (
                    <MatrixAnimation
                      steps={currentSolution.animation.steps as MatrixStep[]}
                      title={currentSolution.animation.title || "矩阵演示"}
                    />
                  )}
                </div>
              )}

              {/* 详细解释 */}
              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-code:text-green-400 prose-headings:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentSolution?.explanation || problem.explanation}
                </ReactMarkdown>
              </div>

              {/* 相关题目 */}
              {problem.relatedProblems && problem.relatedProblems.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <h3 className="text-sm font-medium mb-2 text-zinc-400">相关题目</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.relatedProblems.map((id) => (
                      <Link
                        key={id}
                        href={`/problems/${id}`}
                        className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        {id}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 垂直分隔线 */}
      <div
        className="w-1 bg-zinc-800 hover:bg-green-500 cursor-col-resize transition-colors"
        onMouseDown={handleVerticalDragStart}
      />

      {/* 右侧面板 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 工具栏 */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
          <div className="flex items-center gap-2 py-2">
            <span className="text-xs text-zinc-500 uppercase">{problem.language || "javascript"}</span>
          </div>
          <div className="flex items-center gap-2">
            {allSolutions.length > 0 && (
              <div className="flex items-center gap-1">
                {/* 查看答案按钮 */}
                <button
                  onClick={() => {
                    setShowSolution(!showSolution);
                    if (showSolution) {
                      setShowSolutionDropdown(false);
                    }
                  }}
                  className={`px-2 py-1 text-xs rounded-l transition-colors ${
                    showSolution
                      ? "bg-amber-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {showSolution ? "隐藏答案" : "查看答案"}
                </button>
                {/* 解法选择下拉按钮（多解法时显示） */}
                {allSolutions.length > 1 && showSolution && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowSolutionDropdown(!showSolutionDropdown)}
                      className="px-2 py-1 text-xs bg-amber-600 text-white rounded-r border-l border-amber-500 hover:bg-amber-700 transition-colors"
                    >
                      {allSolutions[selectedSolutionIndex]?.name || "解法"} ▼
                    </button>
                    {showSolutionDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 py-1 z-10 min-w-[140px]">
                        {allSolutions.map((sol, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedSolutionIndex(index);
                              setShowSolutionDropdown(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-xs transition-colors ${
                              selectedSolutionIndex === index
                                ? "bg-green-600 text-white"
                                : "text-zinc-300 hover:bg-zinc-700"
                            }`}
                          >
                            {sol.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {allSolutions.length > 1 && !showSolution && (
                  <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-500 rounded-r">
                    {allSolutions.length}种解法
                  </span>
                )}
              </div>
            )}
            <button
              onClick={copyCode}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
              title="复制代码"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={resetCode}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
              title="重置代码"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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

        {/* 代码编辑器 */}
        <div className="flex-1 min-h-0 relative">
          <Editor
            height="100%"
            defaultLanguage={problem.language || "javascript"}
            value={showSolution && currentSolution ? currentSolution.code : code}
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
          {showSolution && currentSolution && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
              {allSolutions.length > 1 ? currentSolution.name : "参考答案"}
            </div>
          )}
        </div>

        {/* 水平分隔线 */}
        <div
          className="h-1 bg-zinc-800 hover:bg-green-500 cursor-row-resize transition-colors"
          onMouseDown={handleHorizontalDragStart}
        />

        {/* 底部控制台 */}
        <div
          className="flex flex-col bg-zinc-900"
          style={{ height: `${bottomHeight}px` }}
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-2">
            <div className="flex">
              <button
                onClick={() => setBottomTab("testcases")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  bottomTab === "testcases"
                    ? "text-white border-b-2 border-green-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                测试用例
                {testResults.length > 0 && (
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
                控制台
                {consoleOutput.length > 0 && (
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

          <div className="flex-1 overflow-y-auto p-3">
            {bottomTab === "testcases" ? (
              <div className="space-y-2">
                {problem.testCases.map((tc, index) => {
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
                        <p className="text-xs text-zinc-500 mb-2">{tc.description}</p>
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
                          <div className="mt-1 text-red-400">错误: {result.error}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
