"use client";

import { useState } from "react";

// ============================================
// 示例 1: if/else 条件渲染
// ============================================

type Status = "idle" | "loading" | "success" | "error";

function StatusDisplay({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
        <div className="relative">
          <div className="h-5 w-5 rounded-full border-2 border-blue-200 dark:border-blue-800" />
          <div className="absolute inset-0 h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <span className="font-medium">加载中...</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <span className="font-medium">加载成功!</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <span className="font-medium">加载失败</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
      </div>
      <span>点击按钮开始加载</span>
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

      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800 transition-all duration-300">
        <StatusDisplay status={status} />
      </div>

      <div className="flex gap-2">
        <button
          onClick={simulate}
          disabled={status === "loading"}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
        >
          模拟请求
        </button>
        <button
          onClick={() => setStatus("idle")}
          className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          重置
        </button>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
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
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          isOnline ? "bg-green-500 scale-110" : "bg-zinc-400 scale-100"
        }`}
      />
      <span className={`transition-colors duration-300 ${isOnline ? "text-green-600" : "text-zinc-500"}`}>
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
          className="rounded-md bg-zinc-600 px-3 py-1 text-sm text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          切换状态
        </button>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
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
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white animate-in zoom-in duration-200">
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
            className="rounded bg-zinc-600 px-3 py-1 text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{count}</span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="rounded bg-zinc-600 px-3 py-1 text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
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

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
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
      <div className="rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/80 p-4 border border-zinc-200/50 dark:border-zinc-700/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            <div className="h-3 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" style={{ animationDelay: '0.1s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/20 dark:to-red-900/10 p-4 border border-red-200/50 dark:border-red-800/30">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <span className="text-red-700 dark:text-red-300 font-medium">错误: {error}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl bg-gradient-to-r from-amber-50 to-amber-50/50 dark:from-amber-900/20 dark:to-amber-900/10 p-4 border border-amber-200/50 dark:border-amber-800/30">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span className="text-amber-700 dark:text-amber-300 font-medium">用户不存在</span>
        </div>
      </div>
    );
  }

  // 主要渲染逻辑
  return (
    <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-50/50 dark:from-emerald-900/20 dark:to-emerald-900/10 p-4 border border-emerald-200/50 dark:border-emerald-800/30">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-semibold">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-emerald-800 dark:text-emerald-200">{user.name}</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">{user.email}</p>
        </div>
      </div>
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
            className={`rounded-md px-3 py-1 text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
              state === s
                ? "bg-blue-600 text-white shadow-md"
                : "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <UserProfile {...states[state]} />

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
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
  const baseClasses = "rounded-md font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100";

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

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
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
