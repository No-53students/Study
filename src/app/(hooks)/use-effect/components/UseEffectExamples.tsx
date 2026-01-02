"use client";

import { useState, useEffect } from "react";

// ============================================
// 示例 1: 基本用法 - 文档标题
// ============================================

export function DocumentTitleExample() {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    document.title = `点击了 ${count} 次`;

    // 清理函数：组件卸载时恢复标题
    return () => {
      document.title = "React Hooks 学习";
    };
  }, [count]);

  const handleClick = () => {
    setAnimating(true);
    setCount((c) => c + 1);
    setTimeout(() => setAnimating(false), 200);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 修改文档标题</h3>

      <div className="mb-4 text-center">
        <span className={`text-4xl font-bold inline-block transition-all duration-200 ${animating ? 'scale-125 text-blue-500' : 'scale-100'}`}>{count}</span>
      </div>

      <button
        onClick={handleClick}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        点击增加
      </button>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="text-zinc-600 dark:text-zinc-400">
          查看浏览器标签页标题的变化
        </p>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 定时器
// ============================================

export function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // 清理函数：清除定时器
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 定时器</h3>

      <div className="mb-4 text-center">
        <span className={`text-4xl font-bold inline-block transition-all duration-300 ${isRunning ? 'text-green-500 animate-pulse' : ''}`}>{seconds}</span>
        <span className="ml-2 text-zinc-500">秒</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            isRunning
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isRunning ? "暂停" : "开始"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          重置
        </button>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>关键点：</strong> 清理函数 <code>clearInterval()</code>{" "}
        防止内存泄漏
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 窗口大小监听
// ============================================

export function WindowSizeExample() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // 清理函数：移除事件监听
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 空数组：只在挂载时添加监听

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 窗口大小监听</h3>

      <div className="mb-4 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="text-sm text-zinc-500">宽度</p>
          <p className="text-2xl font-bold">{windowSize.width}px</p>
        </div>
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="text-sm text-zinc-500">高度</p>
          <p className="text-2xl font-bold">{windowSize.height}px</p>
        </div>
      </div>

      <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 尝试调整浏览器窗口大小，数值会实时更新
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 模拟数据获取
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

const mockUsers: User[] = [
  { id: 1, name: "张三", email: "zhangsan@example.com" },
  { id: 2, name: "李四", email: "lisi@example.com" },
  { id: 3, name: "王五", email: "wangwu@example.com" },
];

// 模拟 API 请求
const fetchUser = (id: number): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers.find((u) => u.id === id) || null);
    }, 1000);
  });
};

export function DataFetchingExample() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // 用于取消过期请求

    setLoading(true);

    fetchUser(userId).then((data) => {
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    });

    // 清理函数：标记请求已取消
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 数据获取</h3>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">选择用户</label>
        <div className="flex gap-2">
          {[1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                userId === id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              用户 {id}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-md bg-zinc-100 p-4 dark:bg-zinc-800 transition-all duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-zinc-500">加载中...</span>
          </div>
        ) : user ? (
          <div className="animate-in fade-in duration-300">
            <p>
              <strong>姓名：</strong>
              {user.name}
            </p>
            <p>
              <strong>邮箱：</strong>
              {user.email}
            </p>
          </div>
        ) : (
          <p className="text-center text-zinc-500">用户不存在</p>
        )}
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>关键点：</strong> 使用 <code>cancelled</code> 标志避免设置过期数据
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 依赖项对比
// ============================================

export function DependenciesExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 依赖项对比</h3>

      <div className="mb-4 flex items-center justify-between">
        <span>
          Count: <strong>{count}</strong>
        </span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          +1
        </button>
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">依赖项规则：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>
            <code>无第二个参数</code> - 每次渲染后执行
          </li>
          <li>
            <code>[]</code> - 仅挂载时执行一次
          </li>
          <li>
            <code>[count]</code> - count 变化时执行
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseEffectExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useEffect Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useEffect 用于处理副作用，如数据获取、订阅、DOM 操作等。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`useEffect(() => {
  // 副作用逻辑

  return () => {
    // 清理函数（可选）
  };
}, [dependencies]); // 依赖项数组`}
          </pre>
        </div>
      </div>

      <DocumentTitleExample />
      <TimerExample />
      <WindowSizeExample />
      <DataFetchingExample />
      <DependenciesExample />
    </div>
  );
}
