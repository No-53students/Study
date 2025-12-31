"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Problem, DIFFICULTY_CONFIG, CATEGORIES, Category, FrontendRelevance, FRONTEND_RELEVANCE_CONFIG, Solution } from "../types";
import { allProblems, getProblemsByCategory, getProblemById } from "../data";
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

// 移动端视图类型
type MobileView = "list" | "description" | "solution" | "code";

// localStorage keys
const LAYOUT_KEY = 'leetcode-layout';
const CODE_KEY = 'leetcode-code-';
const COMPLETED_KEY = 'leetcode-completed';

// 检测是否为移动端的 hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// 读取 localStorage 的辅助函数
function getStoredLayout() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(LAYOUT_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function getStoredCode(problemId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(CODE_KEY + problemId);
  } catch {
    return null;
  }
}

function getCompletedProblems(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const saved = localStorage.getItem(COMPLETED_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

export default function LeetCodePage() {
  // URL 参数支持
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlProblemId = searchParams.get('id');

  // 移动端检测
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<MobileView>("list");

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
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);

  // 统一解法列表
  const allSolutions = useMemo<Solution[]>(() => {
    if (!selectedProblem) return [];
    const solutions: Solution[] = [];
    if (selectedProblem.solutions && selectedProblem.solutions.length > 0) {
      solutions.push(...selectedProblem.solutions);
    } else if (selectedProblem.solution) {
      solutions.push({
        name: "参考答案",
        code: selectedProblem.solution,
        explanation: selectedProblem.explanation,
        timeComplexity: selectedProblem.timeComplexity,
        spaceComplexity: selectedProblem.spaceComplexity,
      });
    }
    return solutions;
  }, [selectedProblem]);

  const currentSolution = allSolutions[selectedSolutionIndex];

  // 布局状态（从 localStorage 恢复）
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const [bottomHeight, setBottomHeight] = useState(220);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLayoutLoaded, setIsLayoutLoaded] = useState(false);

  // 进度追踪
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());

  // 拖拽状态
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingSidebar = useRef(false);
  const isDraggingVertical = useRef(false);
  const isDraggingHorizontal = useRef(false);

  // 初始化：从 localStorage 恢复布局和进度
  useEffect(() => {
    const layout = getStoredLayout();
    if (layout) {
      if (layout.sidebarWidth) setSidebarWidth(layout.sidebarWidth);
      if (layout.leftPanelWidth) setLeftPanelWidth(layout.leftPanelWidth);
      if (layout.bottomHeight) setBottomHeight(layout.bottomHeight);
      if (layout.sidebarCollapsed !== undefined) setSidebarCollapsed(layout.sidebarCollapsed);
    }
    setCompletedProblems(getCompletedProblems());
    setIsLayoutLoaded(true);
  }, []);

  // 处理 URL 参数：如果有 ?id=xxx，自动选中对应题目
  useEffect(() => {
    if (urlProblemId && !selectedProblem) {
      const problem = getProblemById(urlProblemId);
      if (problem) {
        // 设置分类筛选
        setSelectedCategory(problem.category);
        // 选中题目
        const savedCode = getStoredCode(problem.id);
        setCode(savedCode || problem.initialCode);
        setSelectedProblem(problem);
        setTestResults([]);
        setConsoleOutput([]);
        setShowSolution(false);
        setSelectedSolutionIndex(0);
        // 移动端自动切换到描述视图
        if (isMobile) {
          setMobileView("description");
        }
      }
    }
  }, [urlProblemId, selectedProblem, isMobile]);

  // 保存布局到 localStorage（防抖）
  useEffect(() => {
    if (!isLayoutLoaded) return;
    const timer = setTimeout(() => {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify({
        sidebarWidth, leftPanelWidth, bottomHeight, sidebarCollapsed
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [sidebarWidth, leftPanelWidth, bottomHeight, sidebarCollapsed, isLayoutLoaded]);

  // 自动保存代码（防抖）
  useEffect(() => {
    if (!selectedProblem || !code) return;
    const timer = setTimeout(() => {
      localStorage.setItem(CODE_KEY + selectedProblem.id, code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, selectedProblem]);

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

  // 选择题目（从 localStorage 恢复代码）
  const selectProblem = useCallback((problem: Problem, fromMobileList = false) => {
    setSelectedProblem(problem);
    // 尝试恢复保存的代码
    const savedCode = getStoredCode(problem.id);
    setCode(savedCode || problem.initialCode);
    setConsoleOutput([]);
    setTestResults([]);
    setShowSolution(false);
    setShowHints(false);
    setCurrentHintIndex(0);
    setSelectedSolutionIndex(0);
    setLeftTab("description");
    // 移动端从列表选择题目后跳转到描述页
    if (fromMobileList) {
      setMobileView("description");
    }
    // 更新 URL（不会触发页面刷新）
    router.replace(`/problems/leetcode?id=${problem.id}`, { scroll: false });
  }, [router]);

  // 初始化选中第一道题
  useEffect(() => {
    if (filteredProblems.length > 0 && !selectedProblem) {
      selectProblem(filteredProblems[0]);
    }
  }, [filteredProblems, selectedProblem, selectProblem]);

  // 获取当前题目在列表中的索引
  const currentProblemIndex = useMemo(() => {
    if (!selectedProblem) return -1;
    return filteredProblems.findIndex(p => p.id === selectedProblem.id);
  }, [selectedProblem, filteredProblems]);

  // 上一题/下一题
  const goToPrevProblem = useCallback(() => {
    if (currentProblemIndex > 0) {
      selectProblem(filteredProblems[currentProblemIndex - 1]);
    }
  }, [currentProblemIndex, filteredProblems, selectProblem]);

  const goToNextProblem = useCallback(() => {
    if (currentProblemIndex < filteredProblems.length - 1) {
      selectProblem(filteredProblems[currentProblemIndex + 1]);
    }
  }, [currentProblemIndex, filteredProblems, selectProblem]);

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

  // 拖拽处理 - 使用 ref 存储最新的状态值，避免依赖变化导致事件监听器重复注册
  const sidebarWidthRef = useRef(sidebarWidth);
  const sidebarCollapsedRef = useRef(sidebarCollapsed);

  useEffect(() => {
    sidebarWidthRef.current = sidebarWidth;
  }, [sidebarWidth]);

  useEffect(() => {
    sidebarCollapsedRef.current = sidebarCollapsed;
  }, [sidebarCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSidebar.current) {
        setIsDragging(true);
        const newWidth = e.clientX;
        setSidebarWidth(Math.min(Math.max(newWidth, 200), 400));
      }
      if (isDraggingVertical.current && containerRef.current) {
        setIsDragging(true);
        const rect = containerRef.current.getBoundingClientRect();
        const currentSidebarWidth = sidebarWidthRef.current;
        const currentSidebarCollapsed = sidebarCollapsedRef.current;
        const effectiveWidth = currentSidebarCollapsed ? rect.width : rect.width - currentSidebarWidth;
        const offset = currentSidebarCollapsed ? rect.left : rect.left + currentSidebarWidth;
        const newWidth = ((e.clientX - offset) / effectiveWidth) * 100;
        // 限制最小和最大宽度
        setLeftPanelWidth(Math.min(Math.max(newWidth, 20), 80));
      }
      if (isDraggingHorizontal.current) {
        setIsDragging(true);
        const windowHeight = window.innerHeight;
        const newHeight = windowHeight - e.clientY;
        // 限制底部面板最大高度为屏幕的 50%
        const maxHeight = windowHeight * 0.5;
        setBottomHeight(Math.min(Math.max(newHeight, 120), maxHeight));
      }
    };

    const handleMouseUp = () => {
      isDraggingSidebar.current = false;
      isDraggingVertical.current = false;
      isDraggingHorizontal.current = false;
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []); // 空依赖，只在组件挂载时注册一次

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter: 运行代码
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      // Ctrl/Cmd + \: 切换侧边栏
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
      }
      // Ctrl/Cmd + S: 阻止浏览器保存（代码已自动保存）
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
      }
      // Escape: 退出查看答案模式
      if (e.key === 'Escape' && showSolution) {
        setShowSolution(false);
      }
      // Ctrl/Cmd + [ : 上一题
      if ((e.metaKey || e.ctrlKey) && e.key === '[') {
        e.preventDefault();
        goToPrevProblem();
      }
      // Ctrl/Cmd + ] : 下一题
      if ((e.metaKey || e.ctrlKey) && e.key === ']') {
        e.preventDefault();
        goToNextProblem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode, showSolution, goToPrevProblem, goToNextProblem]);

  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;

  // 保存完成的题目
  useEffect(() => {
    if (allPassed && selectedProblem) {
      setCompletedProblems(prev => {
        const newSet = new Set([...prev, selectedProblem.id]);
        localStorage.setItem(COMPLETED_KEY, JSON.stringify([...newSet]));
        return newSet;
      });
    }
  }, [allPassed, selectedProblem]);

  const categoryInfo = selectedProblem ? CATEGORIES.find((c) => c.id === selectedProblem.category) : null;

  // 有题目的分类
  const categoriesWithProblems = CATEGORIES.filter(c => categoryStats[c.id] > 0);

  // ==================== 移动端布局 ====================
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-zinc-950 text-white">
        {/* 移动端头部 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <Link href="/problems" className="text-zinc-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-base font-semibold truncate max-w-[200px]">
              {mobileView === "list" ? "算法题库" : selectedProblem?.title || "题目"}
            </h1>
          </div>
          {/* 上下题切换 + 进度 */}
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevProblem}
              disabled={currentProblemIndex <= 0}
              className="p-2 text-zinc-500 disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs text-zinc-400 min-w-[40px] text-center">
              {currentProblemIndex + 1}/{filteredProblems.length}
            </span>
            <button
              onClick={goToNextProblem}
              disabled={currentProblemIndex >= filteredProblems.length - 1}
              className="p-2 text-zinc-500 disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </header>

        {/* 顶部 Tab 导航 */}
        <nav className="flex border-b border-zinc-800 bg-zinc-900 shrink-0">
          <button
            onClick={() => setMobileView("list")}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              mobileView === "list"
                ? "text-green-400 border-green-500"
                : "text-zinc-500 border-transparent"
            }`}
          >
            题目
          </button>
          <button
            onClick={() => setMobileView("description")}
            disabled={!selectedProblem}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              mobileView === "description"
                ? "text-green-400 border-green-500"
                : "text-zinc-500 border-transparent"
            } disabled:opacity-30`}
          >
            描述
          </button>
          <button
            onClick={() => setMobileView("solution")}
            disabled={!selectedProblem}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              mobileView === "solution"
                ? "text-green-400 border-green-500"
                : "text-zinc-500 border-transparent"
            } disabled:opacity-30`}
          >
            题解
          </button>
          <button
            onClick={() => setMobileView("code")}
            disabled={!selectedProblem}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              mobileView === "code"
                ? "text-green-400 border-green-500"
                : "text-zinc-500 border-transparent"
            } disabled:opacity-30`}
          >
            代码
          </button>
        </nav>

        {/* 移动端内容区域 - 添加底部安全距离 */}
        <div className="flex-1 overflow-hidden pb-safe">
          {/* 题目列表视图 */}
          {mobileView === "list" && (
            <div className="h-full flex flex-col">
              {/* 搜索和筛选 */}
              <div className="p-3 space-y-2 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
                <input
                  type="text"
                  placeholder="搜索题目..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-green-500"
                />
                {/* 难度筛选 */}
                <div className="flex gap-1">
                  {(["all", "easy", "medium", "hard"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`flex-1 px-2 py-1.5 text-xs rounded-lg transition-colors ${
                        difficultyFilter === d
                          ? d === "all"
                            ? "bg-zinc-700 text-white"
                            : `${DIFFICULTY_CONFIG[d].bg} ${DIFFICULTY_CONFIG[d].color}`
                          : "text-zinc-400 bg-zinc-800"
                      }`}
                    >
                      {d === "all" ? "全部" : DIFFICULTY_CONFIG[d].label}
                    </button>
                  ))}
                </div>
                {/* 分类选择 */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "all")}
                  className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="all">📋 所有分类 ({categoryStats.all})</option>
                  {categoriesWithProblems.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name} ({categoryStats[category.id]})
                    </option>
                  ))}
                </select>
              </div>
              {/* 题目列表 */}
              <div className="flex-1 overflow-y-auto">
                {filteredProblems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => selectProblem(problem, true)}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-b border-zinc-800/50 transition-colors ${
                      selectedProblem?.id === problem.id
                        ? "bg-green-900/30"
                        : "active:bg-zinc-800"
                    }`}
                  >
                    {/* 完成状态 */}
                    <span className={`text-sm ${completedProblems.has(problem.id) ? "text-green-400" : "text-zinc-600"}`}>
                      {completedProblems.has(problem.id) ? "✓" : "○"}
                    </span>
                    {/* 难度 */}
                    <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_CONFIG[problem.difficulty].bg.replace('/10', '')}`} />
                    {/* 题号 */}
                    <span className="text-zinc-500 text-xs w-8">{problem.leetcodeId || "-"}</span>
                    {/* 标题 */}
                    <span className="flex-1 text-left text-sm truncate">{problem.title}</span>
                    {/* 箭头 */}
                    <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 题目描述视图 */}
          {mobileView === "description" && selectedProblem && (
            <div className="h-full overflow-y-auto p-4">
              {/* 题目信息 */}
              <div className="mb-4">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {selectedProblem.leetcodeId && (
                    <span className="text-zinc-500 text-sm">#{selectedProblem.leetcodeId}</span>
                  )}
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[selectedProblem.difficulty].color} ${DIFFICULTY_CONFIG[selectedProblem.difficulty].bg}`}>
                    {DIFFICULTY_CONFIG[selectedProblem.difficulty].label}
                  </span>
                </div>
                <h2 className="text-lg font-bold">{selectedProblem.title}</h2>
                {selectedProblem.titleEn && (
                  <p className="text-sm text-zinc-500 mt-1">{selectedProblem.titleEn}</p>
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
                  <span key={tag} className="px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 题目内容 */}
              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:text-xs prose-code:text-green-400 prose-code:before:content-none prose-code:after:content-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedProblem.description}</ReactMarkdown>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedProblem.examples}</ReactMarkdown>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedProblem.constraints}</ReactMarkdown>
              </div>

              {/* 提示 */}
              {selectedProblem.hints && selectedProblem.hints.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  {!showHints ? (
                    <button
                      onClick={() => setShowHints(true)}
                      className="text-sm text-blue-400"
                    >
                      💡 显示提示 ({selectedProblem.hints.length})
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {selectedProblem.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
                        <div key={i} className="rounded-lg bg-amber-900/20 border border-amber-700/50 p-3">
                          <div className="text-xs text-amber-400 mb-1">提示 {i + 1}</div>
                          <p className="text-sm text-amber-200">{hint}</p>
                        </div>
                      ))}
                      {currentHintIndex < selectedProblem.hints.length - 1 && (
                        <button
                          onClick={() => setCurrentHintIndex(i => i + 1)}
                          className="text-xs text-amber-400"
                        >
                          显示更多提示 →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 题解视图 */}
          {mobileView === "solution" && selectedProblem && (
            <div className="h-full overflow-y-auto p-4">
              <h2 className="text-lg font-semibold mb-4">解题思路</h2>

              {/* 解法选择 */}
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
                            : "bg-zinc-800 text-zinc-400"
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
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-3 py-1.5 rounded bg-zinc-800 text-sm">
                    <span className="text-zinc-400">时间: </span>
                    <span className="text-green-400 font-mono">{currentSolution.timeComplexity || selectedProblem.timeComplexity}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-zinc-800 text-sm">
                    <span className="text-zinc-400">空间: </span>
                    <span className="text-blue-400 font-mono">{currentSolution.spaceComplexity || selectedProblem.spaceComplexity}</span>
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

              {/* 解释 */}
              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:text-xs prose-code:text-green-400">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentSolution?.explanation || selectedProblem.explanation}
                </ReactMarkdown>
              </div>

              {/* 参考代码 */}
              {currentSolution?.code && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">参考代码</h3>
                  <pre className="bg-zinc-800 rounded-lg p-4 overflow-x-auto text-xs">
                    <code className="text-green-400">{currentSolution.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* 代码视图 */}
          {mobileView === "code" && selectedProblem && (
            <div className="h-full flex flex-col">
              {/* 代码编辑器 */}
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>

              {/* 运行按钮和结果 */}
              <div className="border-t border-zinc-800 bg-zinc-900">
                {/* 操作栏 */}
                <div className="flex items-center gap-2 p-2 border-b border-zinc-800">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        运行中...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        运行代码
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetCode}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm transition-colors"
                  >
                    重置
                  </button>
                  <button
                    onClick={() => {
                      if (currentSolution?.code) {
                        setCode(currentSolution.code);
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm transition-colors"
                    title="填入参考答案"
                  >
                    答案
                  </button>
                </div>

                {/* 测试结果 */}
                <div className="max-h-48 overflow-y-auto p-2">
                  {testResults.length > 0 ? (
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={result.id}
                          className={`p-2 rounded text-xs ${
                            result.passed ? "bg-green-900/30 border border-green-800" : "bg-red-900/30 border border-red-800"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={result.passed ? "text-green-400" : "text-red-400"}>
                              {result.passed ? "✓" : "✗"} 用例 {index + 1}
                            </span>
                          </div>
                          {!result.passed && (
                            <div className="text-zinc-400 space-y-1">
                              <div>输入: <code className="text-zinc-300">{result.input}</code></div>
                              <div>期望: <code className="text-green-400">{result.expected}</code></div>
                              <div>实际: <code className="text-red-400">{result.actual}</code></div>
                              {result.error && <div className="text-red-400">错误: {result.error}</div>}
                            </div>
                          )}
                        </div>
                      ))}
                      {/* 通过率统计 */}
                      <div className="text-center py-2 text-sm">
                        {testResults.filter(r => r.passed).length === testResults.length ? (
                          <span className="text-green-400">🎉 全部通过！</span>
                        ) : (
                          <span className="text-zinc-400">
                            通过 {testResults.filter(r => r.passed).length}/{testResults.length} 个用例
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-zinc-500 py-4 text-sm">
                      点击运行代码查看测试结果
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==================== 桌面端布局 ====================
  return (
    <div ref={containerRef} className={`flex h-screen bg-zinc-950 text-white ${isDragging ? 'select-none' : ''}`}>
      {/* 侧边栏折叠时的悬浮按钮 */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="fixed left-4 top-4 z-50 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-2 text-sm transition-colors shadow-lg"
          title="显示侧边栏 (Ctrl+\)"
        >
          <span>📋</span>
          <span className="text-zinc-300">题目列表</span>
        </button>
      )}

      {/* 左侧边栏 - 题目列表 */}
      {!sidebarCollapsed && (
        <div
          className="flex flex-col border-r border-zinc-800 bg-zinc-900 relative"
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* 侧边栏头部 */}
          <div className="flex items-center justify-between p-3 border-b border-zinc-800">
            <Link href="/problems" className="text-sm text-zinc-400 hover:text-white transition-colors">
              ← 返回
            </Link>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">算法题库</h2>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                title="隐藏侧边栏 (Ctrl+\)"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 进度显示 */}
          <div className="px-3 py-2 border-b border-zinc-800 bg-zinc-800/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">已完成</span>
              <span className="text-green-400 font-medium">
                {completedProblems.size} / {allProblems.length}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(completedProblems.size / allProblems.length) * 100}%` }}
              />
            </div>
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

          {/* 分类下拉选择器 */}
          <div className="p-2 border-b border-zinc-800">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | "all")}
              className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-green-500 cursor-pointer"
            >
              <option value="all">📋 所有分类 ({categoryStats.all})</option>
              {categoriesWithProblems.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name} ({categoryStats[category.id]})
                </option>
              ))}
            </select>
          </div>

          {/* 题目列表 */}
          <div className="flex-1 overflow-y-auto">
            <div className="text-xs text-zinc-500 px-3 py-2 sticky top-0 bg-zinc-900 border-b border-zinc-800">
              {filteredProblems.length} 道题目
            </div>
            {filteredProblems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => selectProblem(problem)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm border-b border-zinc-800/50 transition-colors ${
                  selectedProblem?.id === problem.id
                    ? "bg-green-900/30 text-green-400"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {/* 完成状态 */}
                <span className={`w-4 h-4 flex items-center justify-center text-xs flex-shrink-0 ${
                  completedProblems.has(problem.id) ? "text-green-400" : "text-zinc-600"
                }`}>
                  {completedProblems.has(problem.id) ? "✓" : "○"}
                </span>
                {/* 难度指示器 */}
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DIFFICULTY_CONFIG[problem.difficulty].bg.replace('/10', '')}`} />
                {/* 题号 */}
                <span className="text-zinc-500 text-xs w-8 flex-shrink-0">
                  {problem.leetcodeId || "-"}
                </span>
                {/* 标题 */}
                <span className="truncate text-left flex-1">{problem.title}</span>
                {/* 前端相关度 */}
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
      )}

      {/* 侧边栏拖拽条 */}
      {!sidebarCollapsed && (
        <div
          className={`w-1 bg-zinc-800 hover:bg-green-500 cursor-col-resize transition-colors ${isDragging ? 'bg-green-500' : ''}`}
          onMouseDown={() => { isDraggingSidebar.current = true; }}
        />
      )}

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
                          {currentSolution.timeComplexity || selectedProblem.timeComplexity}
                        </span>
                      </div>
                      <div className="px-3 py-1.5 rounded bg-zinc-800">
                        <span className="text-zinc-400">空间复杂度: </span>
                        <span className="text-blue-400 font-mono">
                          {currentSolution.spaceComplexity || selectedProblem.spaceComplexity}
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
                  <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-code:text-green-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentSolution?.explanation || selectedProblem.explanation}
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
            className={`w-1 bg-zinc-800 hover:bg-green-500 cursor-col-resize transition-colors ${isDragging ? 'bg-green-500' : ''}`}
            onMouseDown={() => { isDraggingVertical.current = true; }}
          />

          {/* 右侧面板 - 代码编辑器 */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* 工具栏 */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
              <div className="flex items-center gap-2 py-2">
                {/* 上下切题按钮 */}
                <div className="flex items-center gap-1 mr-2">
                  <button
                    onClick={goToPrevProblem}
                    disabled={currentProblemIndex <= 0}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="上一题 (Ctrl+[)"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-xs text-zinc-500 min-w-[60px] text-center">
                    {currentProblemIndex + 1} / {filteredProblems.length}
                  </span>
                  <button
                    onClick={goToNextProblem}
                    disabled={currentProblemIndex >= filteredProblems.length - 1}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="下一题 (Ctrl+])"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="h-4 w-px bg-zinc-700" />
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
              className={`h-1 bg-zinc-800 hover:bg-green-500 cursor-row-resize transition-colors ${isDragging ? 'bg-green-500' : ''}`}
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
