"use client";

import React, { useState, useCallback, useEffect, Component } from "react";

// ============================================
// 自定义 Error Boundary 类组件
// ============================================

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <h4 className="font-semibold text-red-800 dark:text-red-200">
            ⚠️ 发生错误
          </h4>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {this.state.error?.message}
          </p>
          <button
            onClick={this.reset}
            className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================
// 示例 1: 基本 Error Boundary 用法
// ============================================

function BuggyCounter() {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error("计数器达到 3 时崩溃！这是一个模拟的渲染错误。");
  }

  return (
    <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <p className="mb-2 text-lg font-semibold">计数: {count}</p>
      <p className="mb-3 text-sm text-zinc-500">
        当计数达到 3 时会触发错误
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        +1
      </button>
    </div>
  );
}

export function BasicErrorBoundaryExample() {
  const [key, setKey] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本用法</h3>

      <div className="mb-4">
        <ErrorBoundary
          key={key}
          onReset={() => setKey((k) => k + 1)}
          onError={(error) => {
            console.log("错误已记录:", error.message);
          }}
        >
          <BuggyCounter />
        </ErrorBoundary>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 隔离多个错误边界
// ============================================

function BuggyWidget({ name, triggerAt }: { name: string; triggerAt: number }) {
  const [count, setCount] = useState(0);

  if (count === triggerAt) {
    throw new Error(`${name} 在 ${triggerAt} 时崩溃了！`);
  }

  return (
    <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <p className="mb-2 font-semibold">{name}</p>
      <p className="mb-2 text-2xl">{count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        +1 (崩溃于 {triggerAt})
      </button>
    </div>
  );
}

export function IsolatedBoundariesExample() {
  const [keys, setKeys] = useState({ a: 0, b: 0, c: 0 });

  const resetWidget = (widget: "a" | "b" | "c") => {
    setKeys((prev) => ({ ...prev, [widget]: prev[widget] + 1 }));
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 隔离错误边界</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <ErrorBoundary
          key={keys.a}
          onReset={() => resetWidget("a")}
          fallback={
            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
              <p className="text-red-600 dark:text-red-400">Widget A 崩溃</p>
              <button
                onClick={() => resetWidget("a")}
                className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white"
              >
                恢复
              </button>
            </div>
          }
        >
          <BuggyWidget name="Widget A" triggerAt={2} />
        </ErrorBoundary>

        <ErrorBoundary
          key={keys.b}
          onReset={() => resetWidget("b")}
          fallback={
            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
              <p className="text-red-600 dark:text-red-400">Widget B 崩溃</p>
              <button
                onClick={() => resetWidget("b")}
                className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white"
              >
                恢复
              </button>
            </div>
          }
        >
          <BuggyWidget name="Widget B" triggerAt={3} />
        </ErrorBoundary>

        <ErrorBoundary
          key={keys.c}
          onReset={() => resetWidget("c")}
          fallback={
            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
              <p className="text-red-600 dark:text-red-400">Widget C 崩溃</p>
              <button
                onClick={() => resetWidget("c")}
                className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white"
              >
                恢复
              </button>
            </div>
          }
        >
          <BuggyWidget name="Widget C" triggerAt={4} />
        </ErrorBoundary>
      </div>

      <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>优势：</strong> 每个 Widget 有独立的错误边界，
        一个崩溃不会影响其他组件。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 事件处理器中的错误（需要 try-catch）
// ============================================

export function EventHandlerErrorExample() {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleRiskyClick = () => {
    try {
      // 模拟可能失败的操作
      const random = Math.random();
      if (random < 0.5) {
        throw new Error("操作失败！随机数小于 0.5");
      }
      setResult(`成功！随机数: ${random.toFixed(2)}`);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      setResult(null);
    }
  };

  const handleAsyncError = async () => {
    try {
      // 模拟异步操作
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error("异步操作失败！")), 500)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      setResult(null);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">
        示例 3: 事件处理器中的错误
      </h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={handleRiskyClick}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          执行风险操作
        </button>
        <button
          onClick={handleAsyncError}
          className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          异步操作
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-800 dark:bg-red-900/30 dark:text-red-200">
          ❌ 错误: {error}
        </div>
      )}

      {result && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-green-800 dark:bg-green-900/30 dark:text-green-200">
          ✅ {result}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// Error Boundary 无法捕获事件处理器中的错误
// 需要使用 try-catch

const handleClick = () => {
  try {
    doSomethingRisky();
  } catch (error) {
    setError(error.message);
  }
};`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> Error Boundary 只能捕获渲染时的错误，
        事件处理器和异步代码中的错误需要用 try-catch 手动处理。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 使用自定义 Hook 处理异步错误
// ============================================

function useAsyncError() {
  const [, setError] = useState();

  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

function AsyncErrorComponent() {
  const throwError = useAsyncError();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 模拟 API 调用
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error("API 请求失败！")), 1000)
      );
    } catch (error) {
      // 通过状态更新让 Error Boundary 捕获错误
      throwError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <p className="mb-3">点击按钮模拟异步错误</p>
      <button
        onClick={fetchData}
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "加载中..." : "获取数据"}
      </button>
    </div>
  );
}

export function AsyncErrorExample() {
  const [key, setKey] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">
        示例 4: 让 Error Boundary 捕获异步错误
      </h3>

      <div className="mb-4">
        <ErrorBoundary key={key} onReset={() => setKey((k) => k + 1)}>
          <AsyncErrorComponent />
        </ErrorBoundary>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 自定义 Hook：让异步错误能被 Error Boundary 捕获
function useAsyncError() {
  const [, setError] = useState();

  return useCallback((error: Error) => {
    setError(() => {
      throw error; // 在渲染时抛出错误
    });
  }, []);
}

// 使用
const throwError = useAsyncError();
fetchData().catch(throwError);`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 降级 UI 策略
// ============================================

function FancyChart() {
  const [shouldError, setShouldError] = useState(false);

  useEffect(() => {
    // 模拟随机错误
    const timer = setTimeout(() => {
      if (Math.random() < 0.3) {
        setShouldError(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (shouldError) {
    throw new Error("图表渲染失败");
  }

  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
      <h4 className="text-lg font-semibold">📊 交互式图表</h4>
      <div className="mt-3 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 70].map((h, i) => (
          <div
            key={i}
            className="w-8 rounded-t bg-white/40 transition-all hover:bg-white/60"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function StaticFallbackChart() {
  return (
    <div className="rounded-lg bg-zinc-200 p-6 dark:bg-zinc-700">
      <h4 className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
        📊 静态图表（降级版本）
      </h4>
      <div className="mt-3 flex items-end gap-1">
        {[40, 50, 45, 60, 55, 50].map((h, i) => (
          <div
            key={i}
            className="w-8 rounded-t bg-zinc-400/50"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-zinc-500">
        交互式图表加载失败，显示静态版本
      </p>
    </div>
  );
}

export function GracefulDegradationExample() {
  const [key, setKey] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 优雅降级策略</h3>

      <div className="mb-4">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          重新加载图表（30% 概率失败）
        </button>
      </div>

      <ErrorBoundary key={key} fallback={<StaticFallbackChart />}>
        <FancyChart />
      </ErrorBoundary>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>降级策略：</strong> 当交互式组件失败时，显示功能受限但仍可用的静态版本，
        而不是错误信息，提供更好的用户体验。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ErrorBoundaryExamples() {
  return (
    <div className="space-y-6">
      <BasicErrorBoundaryExample />
      <IsolatedBoundariesExample />
      <EventHandlerErrorExample />
      <AsyncErrorExample />
      <GracefulDegradationExample />
    </div>
  );
}
