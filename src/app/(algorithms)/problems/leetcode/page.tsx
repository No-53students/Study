"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Problem, DIFFICULTY_CONFIG, CATEGORIES, Category, FrontendRelevance, FRONTEND_RELEVANCE_CONFIG } from "../types";
import { allProblems, getProblemsByCategory } from "../data";

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

export default function LeetCodePage() {
  // 选中的分类和题目
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [relevanceFilter, setRelevanceFilter] = useState<"all" | FrontendRelevance>("all");

  // 代码状态
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
  const [testResults, setTestResults] = useState<
    { id: string; passed: boolean; input: string; expected: string; actual: string; error?: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  // Tab 状态
  const [leftTab, setLeftTab] = useState<"description" | "solution">("description");
  const [bottomTab, setBottomTab] = useState<"testcases" | "console">("testcases");

  // 布局状态
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const [bottomHeight, setBottomHeight] = useState(220);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingSidebar = useRef(false);
  const isDraggingVertical = useRef(false);
  const isDraggingHorizontal = useRef(false);

  // 过滤题目
  const filteredProblems = useMemo(() => {
    let problems = selectedCategory === "all"
      ? allProblems
      : getProblemsByCategory(selectedCategory);

    if (difficultyFilter !== "all") {
      problems = problems.filter(p => p.difficulty === difficultyFilter);
    }

    if (relevanceFilter !== "all") {
      problems = problems.filter(p => p.frontendRelevance === relevanceFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      problems = problems.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.titleEn?.toLowerCase().includes(query) ||
        p.leetcodeId?.toString().includes(query)
      );
    }

    return problems;
  }, [selectedCategory, difficultyFilter, relevanceFilter, searchQuery]);

  // 分类统计
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = { all: allProblems.length };
    allProblems.forEach((p) => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  }, []);

  // 选择题目
  const selectProblem = useCallback((problem: Problem) => {
    setSelectedProblem(problem);
    setCode(problem.initialCode);
    setConsoleOutput([]);
    setTestResults([]);
    setShowSolution(false);
    setShowHints(false);
    setCurrentHintIndex(0);
    setLeftTab("description");
  }, []);

  // 初始化选中第一道题
  useEffect(() => {
    if (filteredProblems.length > 0 && !selectedProblem) {
      selectProblem(filteredProblems[0]);
    }
  }, [filteredProblems, selectedProblem, selectProblem]);

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
    if (!selectedProblem) return;

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

      if (selectedProblem.testCases.length > 0 && solutionFn) {
        const results = await Promise.all(
          selectedProblem.testCases.map(async (tc) => {
            try {
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
  }, [code, selectedProblem, addConsoleOutput, clearConsole]);

  // 重置代码
  const resetCode = useCallback(() => {
    if (!selectedProblem) return;
    setCode(selectedProblem.initialCode);
    clearConsole();
    setShowSolution(false);
    setCurrentHintIndex(0);
  }, [selectedProblem, clearConsole]);

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
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSidebar.current) {
        const newWidth = e.clientX;
        setSidebarWidth(Math.min(Math.max(newWidth, 200), 400));
      }
      if (isDraggingVertical.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - rect.left - sidebarWidth) / (rect.width - sidebarWidth)) * 100;
        setLeftPanelWidth(Math.min(Math.max(newWidth, 25), 60));
      }
      if (isDraggingHorizontal.current) {
        const windowHeight = window.innerHeight;
        const newHeight = windowHeight - e.clientY;
        setBottomHeight(Math.min(Math.max(newHeight, 120), 400));
      }
    };

    const handleMouseUp = () => {
      isDraggingSidebar.current = false;
      isDraggingVertical.current = false;
      isDraggingHorizontal.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [sidebarWidth]);

  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;
  const categoryInfo = selectedProblem ? CATEGORIES.find((c) => c.id === selectedProblem.category) : null;

  // 有题目的分类
  const categoriesWithProblems = CATEGORIES.filter(c => categoryStats[c.id] > 0);

  return (
    <div ref={containerRef} className="flex h-screen bg-zinc-950 text-white">
      {/* 左侧边栏 - 题目列表 */}
      <div
        className="flex flex-col border-r border-zinc-800 bg-zinc-900"
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* 侧边栏头部 */}
        <div className="flex items-center justify-between p-3 border-b border-zinc-800">
          <Link href="/problems" className="text-sm text-zinc-400 hover:text-white transition-colors">
            ← 返回
          </Link>
          <h2 className="text-sm font-semibold">算法题库</h2>
        </div>

        {/* 搜索框 */}
        <div className="p-2 border-b border-zinc-800">
          <input
            type="text"
            placeholder="搜索题目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-green-500"
          />
        </div>

        {/* 难度筛选 */}
        <div className="flex gap-1 p-2 border-b border-zinc-800">
          {(["all", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                difficultyFilter === d
                  ? d === "all"
                    ? "bg-zinc-700 text-white"
                    : `${DIFFICULTY_CONFIG[d].bg} ${DIFFICULTY_CONFIG[d].color}`
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {d === "all" ? "全部" : DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </div>

        {/* 前端相关度筛选 */}
        <div className="flex gap-1 p-2 border-b border-zinc-800">
          {(["all", "high", "medium", "low"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRelevanceFilter(r)}
              className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                relevanceFilter === r
                  ? r === "all"
                    ? "bg-zinc-700 text-white"
                    : `${FRONTEND_RELEVANCE_CONFIG[r].bg} ${FRONTEND_RELEVANCE_CONFIG[r].color}`
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
              title={r !== "all" ? FRONTEND_RELEVANCE_CONFIG[r].description : "显示所有题目"}
            >
              {r === "all" ? "前端" : `${FRONTEND_RELEVANCE_CONFIG[r].icon} ${FRONTEND_RELEVANCE_CONFIG[r].label}`}
            </button>
          ))}
        </div>

        {/* 分类列表 */}
        <div className="flex-1 overflow-y-auto">
          {/* 所有题目 */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-green-900/30 text-green-400 border-l-2 border-green-500"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <span>📋 所有题目</span>
            <span className="text-xs">{categoryStats.all}</span>
          </button>

          {/* 分类 */}
          {categoriesWithProblems.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-green-900/30 text-green-400 border-l-2 border-green-500"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span>{category.icon} {category.name}</span>
              <span className="text-xs">{categoryStats[category.id]}</span>
            </button>
          ))}

          {/* 分隔线 */}
          <div className="border-t border-zinc-800 my-2" />

          {/* 题目列表 */}
          <div className="px-2 pb-2">
            <div className="text-xs text-zinc-500 px-2 mb-1">
              {filteredProblems.length} 道题目
            </div>
            {filteredProblems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => selectProblem(problem)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
                  selectedProblem?.id === problem.id
                    ? "bg-green-900/30 text-green-400"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DIFFICULTY_CONFIG[problem.difficulty].bg.replace('/10', '')}`} />
                <span className="text-zinc-500 text-xs w-8 flex-shrink-0">
                  {problem.leetcodeId || "-"}
                </span>
                <span className="truncate text-left flex-1">{problem.title}</span>
                {problem.frontendRelevance && (
                  <span
                    className="text-xs flex-shrink-0"
                    title={FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].description}
                  >
                    {FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance].icon}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 侧边栏拖拽条 */}
      <div
        className="w-1 bg-zinc-800 hover:bg-green-500 cursor-col-resize transition-colors"
        onMouseDown={() => { isDraggingSidebar.current = true; }}
      />

      {/* 主内容区域 */}
      {selectedProblem ? (
        <div className="flex-1 flex">
          {/* 左侧面板 - 题目描述 */}
          <div
            className="flex flex-col border-r border-zinc-800 overflow-hidden"
            style={{ width: `${leftPanelWidth}%` }}
          >
            {/* 左侧标签栏 */}
            <div className="flex items-center border-b border-zinc-800 bg-zinc-900">
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

            {/* 左侧内容 */}
            <div className="flex-1 overflow-y-auto">
              {leftTab === "description" ? (
                <div className="p-4">
                  {/* 标题区 */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {selectedProblem.leetcodeId && (
                        <span className="text-zinc-500 text-sm">#{selectedProblem.leetcodeId}</span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[selectedProblem.difficulty].color} ${DIFFICULTY_CONFIG[selectedProblem.difficulty].bg}`}
                      >
                        {DIFFICULTY_CONFIG[selectedProblem.difficulty].label}
                      </span>
                      {selectedProblem.frontendRelevance && (
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${FRONTEND_RELEVANCE_CONFIG[selectedProblem.frontendRelevance].color} ${FRONTEND_RELEVANCE_CONFIG[selectedProblem.frontendRelevance].bg}`}
                          title={selectedProblem.frontendNote || FRONTEND_RELEVANCE_CONFIG[selectedProblem.frontendRelevance].description}
                        >
                          {FRONTEND_RELEVANCE_CONFIG[selectedProblem.frontendRelevance].icon} {FRONTEND_RELEVANCE_CONFIG[selectedProblem.frontendRelevance].label}
                        </span>
                      )}
                      {allPassed && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium text-green-400 bg-green-500/10">
                          ✓ 已解决
                        </span>
                      )}
                    </div>
                    <h1 className="text-xl font-bold">{selectedProblem.title}</h1>
                    {selectedProblem.titleEn && (
                      <p className="text-sm text-zinc-500 mt-1">{selectedProblem.titleEn}</p>
                    )}
                    {selectedProblem.frontendNote && (
                      <p className="text-xs text-zinc-500 mt-1 italic">{selectedProblem.frontendNote}</p>
                    )}
                  </div>

                  {/* 分类标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categoryInfo && (
                      <span className="px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-400">
                        {categoryInfo.icon} {categoryInfo.name}
                      </span>
                    )}
                    {selectedProblem.tags?.map((tag) => (
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
                      {selectedProblem.description}
                    </ReactMarkdown>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedProblem.examples}
                    </ReactMarkdown>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedProblem.constraints}
                    </ReactMarkdown>
                  </div>

                  {/* 提示区域 */}
                  {selectedProblem.hints && selectedProblem.hints.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      {!showHints ? (
                        <button
                          onClick={() => setShowHints(true)}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          💡 显示提示 ({selectedProblem.hints.length})
                        </button>
                      ) : (
                        <div className="space-y-2">
                          {selectedProblem.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
                            <div
                              key={i}
                              className="rounded-lg bg-amber-900/20 border border-amber-700/50 p-3"
                            >
                              <div className="text-xs text-amber-400 mb-1">提示 {i + 1}</div>
                              <p className="text-sm text-amber-200">{hint}</p>
                            </div>
                          ))}
                          {currentHintIndex < selectedProblem.hints.length - 1 && (
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
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">解题思路</h2>

                  {/* 复杂度 */}
                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="px-3 py-1.5 rounded bg-zinc-800">
                      <span className="text-zinc-400">时间复杂度: </span>
                      <span className="text-green-400 font-mono">{selectedProblem.timeComplexity}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded bg-zinc-800">
                      <span className="text-zinc-400">空间复杂度: </span>
                      <span className="text-blue-400 font-mono">{selectedProblem.spaceComplexity}</span>
                    </div>
                  </div>

                  {/* 详细解释 */}
                  <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-code:text-green-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedProblem.explanation}
                    </ReactMarkdown>
                  </div>

                  {/* 相关题目 */}
                  {selectedProblem.relatedProblems && selectedProblem.relatedProblems.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      <h3 className="text-sm font-medium mb-2 text-zinc-400">相关题目</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProblem.relatedProblems.map((id) => (
                          <button
                            key={id}
                            onClick={() => {
                              const problem = allProblems.find(p => p.id === id);
                              if (problem) selectProblem(problem);
                            }}
                            className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                          >
                            {id}
                          </button>
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
            onMouseDown={() => { isDraggingVertical.current = true; }}
          />

          {/* 右侧面板 - 代码编辑器 */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* 工具栏 */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
              <div className="flex items-center gap-2 py-2">
                <span className="text-xs text-zinc-500 uppercase">{selectedProblem.language || "javascript"}</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedProblem.solution && (
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      showSolution
                        ? "bg-amber-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {showSolution ? "隐藏答案" : "查看答案"}
                  </button>
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
                defaultLanguage={selectedProblem.language || "javascript"}
                value={showSolution && selectedProblem.solution ? selectedProblem.solution : code}
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
            </div>

            {/* 水平分隔线 */}
            <div
              className="h-1 bg-zinc-800 hover:bg-green-500 cursor-row-resize transition-colors"
              onMouseDown={() => { isDraggingHorizontal.current = true; }}
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
                    {selectedProblem.testCases.map((tc, index) => {
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
      ) : (
        <div className="flex-1 flex items-center justify-center text-zinc-500">
          <div className="text-center">
            <p className="text-lg mb-2">暂无题目</p>
            <p className="text-sm">请先添加题目数据</p>
          </div>
        </div>
      )}
    </div>
  );
}
