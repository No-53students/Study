"use client";

import { useSyncExternalStore, useCallback, useState } from "react";

// ============================================
// 创建一个简单的外部存储
// ============================================

interface Store<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: () => void) => () => void;
}

function createStore<T extends object>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (partial) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// ============================================
// 示例 1: 基本外部存储订阅
// ============================================

const counterStore = createStore({ count: 0 });

export function BasicStoreExample() {
  const state = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getState,
    counterStore.getState
  );

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本外部存储</h3>

      <div className="mb-4 text-center">
        <span className="text-6xl font-bold">{state.count}</span>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => counterStore.setState({ count: state.count - 1 })}
          className="rounded-md bg-zinc-600 px-6 py-2 text-white hover:bg-zinc-700"
        >
          -1
        </button>
        <button
          onClick={() => counterStore.setState({ count: state.count + 1 })}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          +1
        </button>
        <button
          onClick={() => counterStore.setState({ count: 0 })}
          className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700"
        >
          重置
        </button>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">原理：</p>
        <pre className="mt-2 overflow-x-auto text-xs text-zinc-600 dark:text-zinc-400">
{`const state = useSyncExternalStore(
  store.subscribe,    // 订阅变化
  store.getState,     // 获取当前状态
  store.getState      // SSR 快照
);`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 订阅网络状态
// ============================================

function useOnlineStatus() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  }, []);

  const getSnapshot = () => {
    return navigator.onLine;
  };

  const getServerSnapshot = () => true;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function OnlineStatusExample() {
  const isOnline = useOnlineStatus();

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 网络状态订阅</h3>

      <div
        className={`mb-4 rounded-md p-6 text-center ${
          isOnline
            ? "bg-green-100 dark:bg-green-900/30"
            : "bg-red-100 dark:bg-red-900/30"
        }`}
      >
        <span className="text-4xl">{isOnline ? "🟢" : "🔴"}</span>
        <p
          className={`mt-2 text-lg font-medium ${
            isOnline
              ? "text-green-800 dark:text-green-200"
              : "text-red-800 dark:text-red-200"
          }`}
        >
          {isOnline ? "在线" : "离线"}
        </p>
      </div>

      <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>测试方法：</strong> 打开浏览器开发者工具，在 Network 面板中切换
        &ldquo;Offline&rdquo; 模式查看效果。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 订阅窗口尺寸
// ============================================

function useWindowSize() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);

  const getSnapshot = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const getServerSnapshot = () => ({
    width: 0,
    height: 0,
  });

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function WindowSizeExample() {
  const { width, height } = useWindowSize();

  const getDeviceType = () => {
    if (width < 640) return { label: "手机", icon: "📱" };
    if (width < 1024) return { label: "平板", icon: "📱" };
    return { label: "桌面", icon: "🖥️" };
  };

  const device = getDeviceType();

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 窗口尺寸订阅</h3>

      <div className="mb-4 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-md bg-blue-100 p-4 dark:bg-blue-900/30">
          <p className="text-sm text-blue-600 dark:text-blue-300">宽度</p>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {width}px
          </p>
        </div>
        <div className="rounded-md bg-purple-100 p-4 dark:bg-purple-900/30">
          <p className="text-sm text-purple-600 dark:text-purple-300">高度</p>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {height}px
          </p>
        </div>
        <div className="rounded-md bg-green-100 p-4 dark:bg-green-900/30">
          <p className="text-sm text-green-600 dark:text-green-300">设备</p>
          <p className="text-2xl font-bold">
            {device.icon} {device.label}
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-zinc-500">
        调整浏览器窗口大小查看实时变化
      </p>
    </div>
  );
}

// ============================================
// 示例 4: 订阅媒体查询
// ============================================

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = () => window.matchMedia(query).matches;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function MediaQueryExample() {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  const queries = [
    { label: "深色模式", query: "prefers-color-scheme: dark", value: isDarkMode },
    { label: "减少动画", query: "prefers-reduced-motion", value: isReducedMotion },
    { label: "大屏幕", query: "min-width: 1024px", value: isLargeScreen },
    { label: "竖屏", query: "orientation: portrait", value: isPortrait },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 媒体查询订阅</h3>

      <div className="space-y-2">
        {queries.map((q) => (
          <div
            key={q.label}
            className={`flex items-center justify-between rounded-md p-3 ${
              q.value
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          >
            <div>
              <p className="font-medium">{q.label}</p>
              <p className="text-xs text-zinc-500">{q.query}</p>
            </div>
            <span className="text-2xl">{q.value ? "✅" : "❌"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 多组件共享状态
// ============================================

const todoStore = createStore({
  todos: [] as { id: number; text: string; done: boolean }[],
  nextId: 1,
});

function TodoList() {
  const state = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getState,
    todoStore.getState
  );

  const toggleTodo = (id: number) => {
    todoStore.setState({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    });
  };

  const deleteTodo = (id: number) => {
    todoStore.setState({
      todos: state.todos.filter((t) => t.id !== id),
    });
  };

  return (
    <div className="space-y-2">
      {state.todos.length === 0 ? (
        <p className="py-4 text-center text-zinc-500">暂无待办事项</p>
      ) : (
        state.todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 rounded"
              />
              <span className={todo.done ? "line-through text-zinc-400" : ""}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600 hover:text-red-700"
            >
              删除
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function TodoStats() {
  const state = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getState,
    todoStore.getState
  );

  const total = state.todos.length;
  const done = state.todos.filter((t) => t.done).length;
  const pending = total - done;

  return (
    <div className="grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded bg-blue-100 p-2 dark:bg-blue-900/30">
        <p className="text-blue-600 dark:text-blue-300">总计</p>
        <p className="text-xl font-bold">{total}</p>
      </div>
      <div className="rounded bg-green-100 p-2 dark:bg-green-900/30">
        <p className="text-green-600 dark:text-green-300">完成</p>
        <p className="text-xl font-bold">{done}</p>
      </div>
      <div className="rounded bg-amber-100 p-2 dark:bg-amber-900/30">
        <p className="text-amber-600 dark:text-amber-300">待办</p>
        <p className="text-xl font-bold">{pending}</p>
      </div>
    </div>
  );
}

export function SharedStateExample() {
  const [text, setText] = useState("");
  const state = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getState,
    todoStore.getState
  );

  const addTodo = () => {
    if (!text.trim()) return;
    todoStore.setState({
      todos: [...state.todos, { id: state.nextId, text, done: false }],
      nextId: state.nextId + 1,
    });
    setText("");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 多组件共享状态</h3>

      <div className="mb-4">
        <TodoStats />
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="添加待办事项..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={addTodo}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          添加
        </button>
      </div>

      <TodoList />

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>说明：</strong> TodoList 和 TodoStats 是独立组件，
        都通过 useSyncExternalStore 订阅同一个外部存储，实现状态共享。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseSyncExternalStoreExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useSyncExternalStore Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useSyncExternalStore 用于安全地订阅外部数据源，确保并发渲染的一致性。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const state = useSyncExternalStore(
  subscribe,         // (callback) => unsubscribe
  getSnapshot,       // () => currentState
  getServerSnapshot  // () => serverState (SSR)
);`}
          </pre>
        </div>
      </div>

      <BasicStoreExample />
      <OnlineStatusExample />
      <WindowSizeExample />
      <MediaQueryExample />
      <SharedStateExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          适用场景
        </h4>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li>订阅浏览器 API（网络状态、窗口尺寸、媒体查询等）</li>
          <li>创建状态管理库（如 Zustand、Jotai 内部使用）</li>
          <li>订阅第三方数据源</li>
          <li>需要并发安全的外部状态订阅</li>
        </ul>
        <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">
          <strong>注意：</strong> 这是底层 API，普通应用开发者通常使用封装好的库。
        </p>
      </div>
    </div>
  );
}
