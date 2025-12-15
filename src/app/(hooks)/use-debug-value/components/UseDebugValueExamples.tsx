"use client";

import { useState, useEffect, useDebugValue, useSyncExternalStore } from "react";

// ============================================
// 自定义 Hook 1: useOnlineStatus
// ============================================

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // 在 DevTools 中显示友好的状态
  useDebugValue(isOnline ? "🟢 在线" : "🔴 离线");

  return isOnline;
}

// ============================================
// 自定义 Hook 2: useLocalStorage
// ============================================

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 忽略错误
    }
  }, [key, value]);

  // 使用格式化函数延迟计算
  useDebugValue({ key, value }, (debug) => `${debug.key}: ${JSON.stringify(debug.value)}`);

  return [value, setValue] as const;
}

// ============================================
// 自定义 Hook 3: useWindowSize
// ============================================

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 显示尺寸信息
  useDebugValue(`${size.width} × ${size.height}`);

  return size;
}

// ============================================
// 自定义 Hook 4: useFetch
// ============================================

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !!url,
    error: null,
  });

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  // 使用格式化函数显示状态摘要
  useDebugValue(state, (s) => {
    if (s.loading) return "⏳ 加载中...";
    if (s.error) return `❌ 错误: ${s.error}`;
    if (s.data) return "✅ 成功";
    return "⚪ 空闲";
  });

  return state;
}

// ============================================
// 自定义 Hook 5: useMediaQuery
// ============================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  useDebugValue(`${query}: ${matches ? "✅" : "❌"}`);

  return matches;
}

// ============================================
// 示例组件
// ============================================

export function OnlineStatusExample() {
  const isOnline = useOnlineStatus();

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: useOnlineStatus</h3>

      <div
        className={`mb-4 rounded-md p-4 text-center ${
          isOnline
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
        }`}
      >
        <span className="text-4xl">{isOnline ? "🟢" : "🔴"}</span>
        <p className="mt-2 font-medium">{isOnline ? "在线" : "离线"}</p>
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">useDebugValue 用法：</p>
        <pre className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
          {`useDebugValue(isOnline ? "🟢 在线" : "🔴 离线");`}
        </pre>
        <p className="mt-2 text-zinc-500">
          打开 React DevTools，查看 hooks 面板可以看到状态
        </p>
      </div>
    </div>
  );
}

export function LocalStorageExample() {
  const [name, setName] = useLocalStorage("debug-example-name", "");
  const [count, setCount] = useLocalStorage("debug-example-count", 0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: useLocalStorage</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">名称</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入名称（会保存到 localStorage）"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">计数</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="rounded-md bg-zinc-200 px-4 py-2 hover:bg-zinc-300 dark:bg-zinc-700"
            >
              -
            </button>
            <span className="w-12 text-center text-xl font-bold">{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="rounded-md bg-zinc-200 px-4 py-2 hover:bg-zinc-300 dark:bg-zinc-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">useDebugValue 用法：</p>
        <pre className="mt-2 overflow-x-auto text-xs text-zinc-600 dark:text-zinc-400">
{`useDebugValue(
  { key, value },
  (debug) => \`\${debug.key}: \${JSON.stringify(debug.value)}\`
);`}
        </pre>
      </div>
    </div>
  );
}

export function WindowSizeExample() {
  const size = useWindowSize();

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: useWindowSize</h3>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-md bg-blue-100 p-4 text-center dark:bg-blue-900/30">
          <p className="text-sm text-blue-600 dark:text-blue-300">宽度</p>
          <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
            {size.width}
          </p>
        </div>
        <div className="rounded-md bg-purple-100 p-4 text-center dark:bg-purple-900/30">
          <p className="text-sm text-purple-600 dark:text-purple-300">高度</p>
          <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
            {size.height}
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-zinc-500">调整浏览器窗口大小查看变化</p>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">useDebugValue 用法：</p>
        <pre className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
          {`useDebugValue(\`\${size.width} × \${size.height}\`);`}
        </pre>
      </div>
    </div>
  );
}

export function FetchExample() {
  const [url, setUrl] = useState<string | null>(null);
  const { data, loading, error } = useFetch<{ title: string; body: string }>(url);

  const fetchPost = (id: number) => {
    setUrl(`https://jsonplaceholder.typicode.com/posts/${id}`);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: useFetch</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => fetchPost(id)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            获取文章 {id}
          </button>
        ))}
        <button
          onClick={() => setUrl(null)}
          className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          清空
        </button>
      </div>

      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        {loading && (
          <p className="text-center text-zinc-500">⏳ 加载中...</p>
        )}
        {error && (
          <p className="text-center text-red-600">❌ 错误: {error}</p>
        )}
        {data && (
          <div>
            <h4 className="font-bold">{data.title}</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {data.body}
            </p>
          </div>
        )}
        {!loading && !error && !data && (
          <p className="text-center text-zinc-500">点击按钮获取数据</p>
        )}
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">useDebugValue 用法：</p>
        <pre className="mt-2 overflow-x-auto text-xs text-zinc-600 dark:text-zinc-400">
{`useDebugValue(state, (s) => {
  if (s.loading) return "⏳ 加载中...";
  if (s.error) return \`❌ 错误: \${s.error}\`;
  if (s.data) return "✅ 成功";
  return "⚪ 空闲";
});`}
        </pre>
      </div>
    </div>
  );
}

export function MediaQueryExample() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const queries = [
    { label: "手机", query: "(max-width: 768px)", matches: isMobile },
    { label: "平板", query: "(min-width: 769px) and (max-width: 1024px)", matches: isTablet },
    { label: "桌面", query: "(min-width: 1025px)", matches: isDesktop },
    { label: "深色模式", query: "(prefers-color-scheme: dark)", matches: prefersDark },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: useMediaQuery</h3>

      <div className="mb-4 space-y-2">
        {queries.map((q) => (
          <div
            key={q.query}
            className={`flex items-center justify-between rounded-md p-3 ${
              q.matches
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          >
            <div>
              <p className="font-medium">{q.label}</p>
              <p className="text-xs text-zinc-500">{q.query}</p>
            </div>
            <span className="text-2xl">{q.matches ? "✅" : "❌"}</span>
          </div>
        ))}
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">useDebugValue 用法：</p>
        <pre className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
          {`useDebugValue(\`\${query}: \${matches ? "✅" : "❌"}\`);`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseDebugValueExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useDebugValue Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useDebugValue 用于在 React DevTools 中为自定义 Hook 添加标签，提升调试体验。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`// 简单用法
useDebugValue(value);

// 延迟格式化（推荐）
useDebugValue(value, (v) => formatValue(v));`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
          <p className="font-medium">💡 如何查看效果？</p>
          <ol className="mt-2 list-inside list-decimal">
            <li>安装 React DevTools 浏览器扩展</li>
            <li>打开开发者工具，切换到 Components 标签</li>
            <li>选择使用了这些 Hook 的组件</li>
            <li>在右侧 hooks 面板中查看 useDebugValue 的输出</li>
          </ol>
        </div>
      </div>

      <OnlineStatusExample />
      <LocalStorageExample />
      <WindowSizeExample />
      <FetchExample />
      <MediaQueryExample />

      {/* 总结 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          使用建议
        </h4>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li>只在自定义 Hook 中使用，不要在组件中使用</li>
          <li>对于复杂值，使用格式化函数延迟计算</li>
          <li>主要用于开发共享的 Hook 库</li>
          <li>不要过度使用，简单状态不需要 useDebugValue</li>
        </ul>
      </div>
    </div>
  );
}
