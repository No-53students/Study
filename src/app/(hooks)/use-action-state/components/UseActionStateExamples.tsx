"use client";

/**
 * useActionState Hook 使用示例
 *
 * 这个组件演示了 useActionState 的几种典型使用场景:
 * 1. 表单提交 - 模拟登录
 * 2. 计数器 - 简单状态更新
 * 3. 数据获取 - 模拟 API 调用
 */

import { useActionState } from "@/hooks/useActionState";

// ============================================
// 工具函数: 模拟网络延迟
// ============================================

/**
 * 模拟异步请求延迟
 * @param ms 延迟毫秒数
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================
// 示例 1: 表单提交 (登录表单)
// ============================================

/**
 * 登录表单状态类型
 */
interface LoginState {
  message: string;
  success: boolean;
  user?: {
    email: string;
    name: string;
  };
}

/**
 * 登录 action 函数
 *
 * 这是 useActionState 的核心 - action 函数
 * 它接收前一个状态和 payload (通常是 FormData)
 * 返回新的状态
 */
async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // 模拟网络延迟 (1.5秒)
  await delay(1500);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 模拟验证逻辑
  if (!email || !password) {
    return {
      message: "请填写邮箱和密码",
      success: false,
    };
  }

  if (password.length < 6) {
    return {
      message: "密码长度至少6位",
      success: false,
    };
  }

  // 模拟登录成功
  if (email === "test@example.com" && password === "123456") {
    return {
      message: "登录成功！",
      success: true,
      user: {
        email,
        name: "测试用户",
      },
    };
  }

  // 模拟登录失败
  return {
    message: "邮箱或密码错误 (提示: test@example.com / 123456)",
    success: false,
  };
}

/**
 * 登录表单组件
 */
export function LoginFormExample() {
  // 使用 useActionState 管理表单状态
  const [state, formAction, isPending] = useActionState(loginAction, {
    message: "",
    success: false,
  });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 登录表单</h3>

      {/* 表单使用 action 属性绑定 formAction */}
      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">邮箱</label>
          <input
            type="email"
            name="email"
            defaultValue="test@example.com"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">密码</label>
          <input
            type="password"
            name="password"
            defaultValue="123456"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "登录中..." : "登录"}
        </button>
      </form>

      {/* 状态消息显示 */}
      {state.message && (
        <div
          className={`mt-4 rounded-md p-3 text-sm ${
            state.success
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* 登录成功后显示用户信息 */}
      {state.user && (
        <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
          <p>
            <strong>用户:</strong> {state.user.name}
          </p>
          <p>
            <strong>邮箱:</strong> {state.user.email}
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// 示例 2: 计数器 (简单状态更新)
// ============================================

/**
 * 计数器状态类型
 */
interface CounterState {
  count: number;
  lastAction: string;
}

/**
 * 计数器 action
 * 演示如何处理不同类型的操作
 */
async function counterAction(
  prevState: CounterState,
  action: "increment" | "decrement" | "reset"
): Promise<CounterState> {
  // 模拟异步操作 (500ms)
  await delay(500);

  switch (action) {
    case "increment":
      return {
        count: prevState.count + 1,
        lastAction: "增加",
      };
    case "decrement":
      return {
        count: prevState.count - 1,
        lastAction: "减少",
      };
    case "reset":
      return {
        count: 0,
        lastAction: "重置",
      };
    default:
      return prevState;
  }
}

/**
 * 计数器组件
 */
export function CounterExample() {
  const [state, dispatch, isPending] = useActionState(counterAction, {
    count: 0,
    lastAction: "无",
  });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 异步计数器</h3>

      <div className="mb-4 text-center">
        <span className="text-4xl font-bold">{state.count}</span>
        <p className="mt-1 text-sm text-zinc-500">
          上次操作: {state.lastAction}
        </p>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => dispatch("decrement")}
          disabled={isPending}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          -1
        </button>
        <button
          onClick={() => dispatch("reset")}
          disabled={isPending}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          重置
        </button>
        <button
          onClick={() => dispatch("increment")}
          disabled={isPending}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          +1
        </button>
      </div>

      {isPending && (
        <p className="mt-3 text-center text-sm text-zinc-500">处理中...</p>
      )}
    </div>
  );
}

// ============================================
// 示例 3: 数据获取 (模拟 API)
// ============================================

/**
 * 用户数据类型
 */
interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * 数据获取状态类型
 */
interface FetchState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
}

/**
 * 模拟用户数据
 */
const mockUsers: User[] = [
  { id: 1, name: "张三", email: "zhangsan@example.com" },
  { id: 2, name: "李四", email: "lisi@example.com" },
  { id: 3, name: "王五", email: "wangwu@example.com" },
  { id: 4, name: "赵六", email: "zhaoliu@example.com" },
  { id: 5, name: "钱七", email: "qianqi@example.com" },
];

/**
 * 数据获取 action
 */
async function fetchUsersAction(
  prevState: FetchState,
  action: { type: "fetch" | "refresh"; page?: number }
): Promise<FetchState> {
  // 模拟网络延迟 (1秒)
  await delay(1000);

  // 模拟随机失败 (10% 概率)
  if (Math.random() < 0.1) {
    return {
      ...prevState,
      loading: false,
      error: "网络请求失败，请重试",
    };
  }

  const page = action.page ?? prevState.page;
  const startIndex = (page - 1) * 2;
  const users = mockUsers.slice(startIndex, startIndex + 2);

  return {
    users,
    loading: false,
    error: null,
    page,
  };
}

/**
 * 数据获取组件
 */
export function FetchDataExample() {
  const [state, dispatch, isPending] = useActionState(fetchUsersAction, {
    users: [],
    loading: false,
    error: null,
    page: 1,
  });

  const totalPages = Math.ceil(mockUsers.length / 2);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 数据获取</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => dispatch({ type: "fetch", page: state.page })}
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "加载中..." : "获取数据"}
        </button>
        <button
          onClick={() => dispatch({ type: "refresh", page: 1 })}
          disabled={isPending}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700"
        >
          刷新
        </button>
      </div>

      {/* 错误显示 */}
      {state.error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
          {state.error}
        </div>
      )}

      {/* 用户列表 */}
      {state.users.length > 0 && (
        <div className="mb-4 space-y-2">
          {state.users.map((user) => (
            <div
              key={user.id}
              className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-zinc-500">{user.email}</p>
            </div>
          ))}
        </div>
      )}

      {/* 分页 */}
      {state.users.length > 0 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() =>
              dispatch({ type: "fetch", page: Math.max(1, state.page - 1) })
            }
            disabled={isPending || state.page <= 1}
            className="rounded-md bg-zinc-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-zinc-700"
          >
            上一页
          </button>
          <span className="text-sm text-zinc-500">
            第 {state.page} / {totalPages} 页
          </span>
          <button
            onClick={() =>
              dispatch({
                type: "fetch",
                page: Math.min(totalPages, state.page + 1),
              })
            }
            disabled={isPending || state.page >= totalPages}
            className="rounded-md bg-zinc-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-zinc-700"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

/**
 * 综合示例组件
 * 展示所有 useActionState 使用场景
 */
export default function UseActionStateExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useActionState Hook 示例</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useActionState 是 React 19 引入的新 Hook，用于管理基于 action
          的状态更新。 它特别适合处理表单提交、异步操作等场景。
        </p>
      </div>

      <LoginFormExample />
      <CounterExample />
      <FetchDataExample />

      <div className="rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
        <h4 className="font-semibold">使用说明:</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>登录表单: 使用 test@example.com / 123456 登录</li>
          <li>计数器: 点击按钮观察异步状态变化</li>
          <li>数据获取: 有 10% 概率模拟请求失败</li>
        </ul>
      </div>
    </div>
  );
}
