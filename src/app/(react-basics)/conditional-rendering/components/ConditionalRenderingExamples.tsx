"use client";

import { useState } from "react";

// ============================================
// 示例 1: if/else 条件渲染
// ============================================

type Status = "idle" | "loading" | "success" | "error";

function StatusDisplay({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        加载中...
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <span>✓</span> 加载成功!
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <span>✕</span> 加载失败
      </div>
    );
  }

  return (
    <div className="text-zinc-500">
      点击按钮开始加载
    </div>
  );
}

export function IfElseExample() {
  const [status, setStatus] = useState<Status>("idle");

  const simulate = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? "success" : "error");
    }, 1500);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: if/else 条件渲染</h3>

      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <StatusDisplay status={status} />
      </div>

      <div className="flex gap-2">
        <button
          onClick={simulate}
          disabled={status === "loading"}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          模拟请求
        </button>
        <button
          onClick={() => setStatus("idle")}
          className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          重置
        </button>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function StatusDisplay({ status }) {
  if (status === "loading") return <Loading />;
  if (status === "success") return <Success />;
  if (status === "error") return <Error />;
  return <Idle />;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 三元运算符
// ============================================

function UserStatus({ isOnline }: { isOnline: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${
          isOnline ? "bg-green-500" : "bg-zinc-400"
        }`}
      />
      <span className={isOnline ? "text-green-600" : "text-zinc-500"}>
        {isOnline ? "在线" : "离线"}
      </span>
    </div>
  );
}

export function TernaryExample() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 三元运算符</h3>

      <div className="mb-4 flex items-center gap-4">
        <UserStatus isOnline={isOnline} />
        <button
          onClick={() => setIsOnline(!isOnline)}
          className="rounded-md bg-zinc-600 px-3 py-1 text-sm text-white hover:bg-zinc-700"
        >
          切换状态
        </button>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function UserStatus({ isOnline }) {
  return (
    <span className={isOnline ? "online" : "offline"}>
      {isOnline ? "在线" : "离线"}
    </span>
  );
}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>适用场景：</strong> 二选一的情况，如显示 A 或 B。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: && 逻辑与
// ============================================

function NotificationBadge({ count }: { count: number }) {
  return (
    <div className="relative inline-block">
      <button className="rounded-md bg-zinc-200 p-3 dark:bg-zinc-700">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
}

export function LogicalAndExample() {
  const [count, setCount] = useState(5);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: && 逻辑与</h3>

      <div className="mb-4 flex items-center gap-4">
        <NotificationBadge count={count} />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="rounded bg-zinc-600 px-3 py-1 text-white hover:bg-zinc-700"
          >
            -
          </button>
          <span className="w-8 text-center">{count}</span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="rounded bg-zinc-600 px-3 py-1 text-white hover:bg-zinc-700"
          >
            +
          </button>
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// ✅ 正确：使用 count > 0
{count > 0 && <Badge>{count}</Badge>}

// ❌ 错误：count 为 0 时会渲染 "0"
{count && <Badge>{count}</Badge>}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 使用 && 时，确保左侧是布尔值。数字 0 会被渲染为 "0"。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: || 和 ?? 默认值
// ============================================

function UserCard({
  name,
  bio,
  avatar,
}: {
  name?: string;
  bio?: string | null;
  avatar?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl text-white">
        {avatar || "👤"}
      </div>
      <div>
        <p className="font-medium">{name || "匿名用户"}</p>
        <p className="text-sm text-zinc-500">{bio ?? "这个人很懒，什么都没写"}</p>
      </div>
    </div>
  );
}

export function DefaultValueExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: || 和 ?? 默认值</h3>

      <div className="mb-4 space-y-3">
        <UserCard name="张三" bio="前端开发工程师" avatar="🧑‍💻" />
        <UserCard name="李四" bio={null} />
        <UserCard name="" bio="" />
        <UserCard />
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// || 会将空字符串视为假值
{name || "匿名用户"}  // "" → "匿名用户"

// ?? 只处理 null 和 undefined
{bio ?? "未设置"}  // "" → ""
                   // null → "未设置"`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>区别：</strong> || 会将 0、""、false 等假值都替换；?? 只替换 null 和 undefined。
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 提前返回
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({
  user,
  loading,
  error,
}: {
  user?: User | null;
  loading?: boolean;
  error?: string;
}) {
  // 提前返回处理边界情况
  if (loading) {
    return (
      <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-300 dark:bg-zinc-600" />
        <div className="mt-2 h-3 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-100 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-200">
        错误: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-md bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
        用户不存在
      </div>
    );
  }

  // 主要渲染逻辑
  return (
    <div className="rounded-md bg-green-100 p-4 dark:bg-green-900/30">
      <p className="font-medium text-green-800 dark:text-green-200">{user.name}</p>
      <p className="text-sm text-green-600 dark:text-green-400">{user.email}</p>
    </div>
  );
}

export function EarlyReturnExample() {
  const [state, setState] = useState<"loading" | "error" | "empty" | "success">("success");

  const states = {
    loading: { loading: true },
    error: { error: "网络请求失败" },
    empty: { user: null },
    success: { user: { id: 1, name: "张三", email: "zhangsan@example.com" } },
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 提前返回</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["loading", "error", "empty", "success"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`rounded-md px-3 py-1 text-sm ${
              state === s
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <UserProfile {...states[state]} />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function UserProfile({ user, loading, error }) {
  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!user) return <NotFound />;

  // 主要逻辑，代码更清晰
  return <Profile user={user} />;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 条件样式与属性
// ============================================

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
}

function StyledButton({ variant = "primary", size = "md", disabled, children }: ButtonProps) {
  const baseClasses = "rounded-md font-medium transition-colors";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function ConditionalStyleExample() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 条件样式</h3>

      <div className="mb-4 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <StyledButton variant="primary" disabled={disabled}>Primary</StyledButton>
          <StyledButton variant="secondary" disabled={disabled}>Secondary</StyledButton>
          <StyledButton variant="danger" disabled={disabled}>Danger</StyledButton>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <StyledButton size="sm">Small</StyledButton>
          <StyledButton size="md">Medium</StyledButton>
          <StyledButton size="lg">Large</StyledButton>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          <span className="text-sm">禁用状态</span>
        </label>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 根据 props 动态组合 className
const variantClasses = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-zinc-200 text-zinc-800",
  danger: "bg-red-600 text-white",
};

<button className={\`\${baseClasses} \${variantClasses[variant]}\`}>
  {children}
</button>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ConditionalRenderingExamples() {
  return (
    <div className="space-y-6">
      <IfElseExample />
      <TernaryExample />
      <LogicalAndExample />
      <DefaultValueExample />
      <EarlyReturnExample />
      <ConditionalStyleExample />
    </div>
  );
}
