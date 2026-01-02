"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ============================================
// 主题 Context
// ============================================

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// 示例 1: 基本主题切换
// ============================================

function ThemedBox() {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-md p-4 transition-all duration-300 ${
        theme === "light"
          ? "bg-white text-zinc-900 border border-zinc-200"
          : "bg-zinc-800 text-white border border-zinc-600"
      }`}
    >
      <p className="flex items-center gap-2">
        当前主题：
        <span className={`inline-block transition-transform duration-300 ${theme === "light" ? "" : "rotate-180"}`}>
          {theme === "light" ? "☀️" : "🌙"}
        </span>
        {theme === "light" ? "浅色" : "深色"}
      </p>
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
        theme === "light"
          ? "bg-zinc-900 text-white"
          : "bg-white text-zinc-900"
      }`}
    >
      切换到{theme === "light" ? "深色" : "浅色"}模式
    </button>
  );
}

export function ThemeExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 主题切换</h3>

      <ThemeProvider>
        <div className="space-y-4">
          <ThemedBox />
          <ThemeToggleButton />
        </div>
      </ThemeProvider>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">结构：</p>
        <pre className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
{`<ThemeProvider>
  <ThemedBox />      {/* 消费 theme */}
  <ThemeToggleButton /> {/* 消费 theme + toggleTheme */}
</ThemeProvider>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 用户 Context
// ============================================

interface User {
  name: string;
  email: string;
  role: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// ============================================
// 示例 2: 用户认证
// ============================================

function UserInfo() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="rounded-md bg-zinc-100 p-4 text-center text-zinc-500 dark:bg-zinc-800 transition-all duration-300">
        未登录
      </div>
    );
  }

  return (
    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20 transition-all duration-300 animate-in fade-in">
      <p className="font-medium text-green-800 dark:text-green-200">
        已登录
      </p>
      <p className="mt-1 text-sm text-green-700 dark:text-green-300">
        {user.name} ({user.email})
      </p>
      <p className="text-xs text-green-600 dark:text-green-400">
        角色：{user.role === "admin" ? "管理员" : "普通用户"}
      </p>
    </div>
  );
}

function LoginButtons() {
  const { user, login, logout } = useUser();

  if (user) {
    return (
      <button
        onClick={logout}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        退出登录
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() =>
          login({ name: "张三", email: "zhangsan@example.com", role: "user" })
        }
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        用户登录
      </button>
      <button
        onClick={() =>
          login({ name: "管理员", email: "admin@example.com", role: "admin" })
        }
        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        管理员登录
      </button>
    </div>
  );
}

export function UserExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 用户认证</h3>

      <UserProvider>
        <div className="space-y-4">
          <UserInfo />
          <LoginButtons />
        </div>
      </UserProvider>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> UserInfo 和 LoginButtons
        都通过 useUser() 访问同一个用户状态
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 多层嵌套 Context
// ============================================

const LanguageContext = createContext("zh");

function NestedComponent() {
  const { theme } = useTheme();
  const { user } = useUser();
  const language = useContext(LanguageContext);

  return (
    <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
      <p className="text-sm">
        <strong>主题：</strong> {theme}
      </p>
      <p className="text-sm">
        <strong>用户：</strong> {user?.name || "未登录"}
      </p>
      <p className="text-sm">
        <strong>语言：</strong> {language === "zh" ? "中文" : "English"}
      </p>
    </div>
  );
}

export function MultipleContextExample() {
  const [language, setLanguage] = useState("zh");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 多层嵌套</h3>

      <ThemeProvider>
        <UserProvider>
          <LanguageContext.Provider value={language}>
            <div className="space-y-4">
              <NestedComponent />

              <div className="flex gap-2">
                <ThemeToggleButton />
                <button
                  onClick={() => setLanguage((l) => (l === "zh" ? "en" : "zh"))}
                  className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
                >
                  切换语言
                </button>
              </div>
            </div>
          </LanguageContext.Provider>
        </UserProvider>
      </ThemeProvider>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">嵌套结构：</p>
        <pre className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
{`<ThemeProvider>
  <UserProvider>
    <LanguageContext.Provider>
      <NestedComponent />
    </LanguageContext.Provider>
  </UserProvider>
</ThemeProvider>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: Props Drilling 对比
// ============================================

// 不使用 Context 的版本
function Level1({ theme }: { theme: string }) {
  return (
    <div className="border-l-2 border-zinc-300 pl-4 dark:border-zinc-600">
      <p className="text-xs text-zinc-500">Level 1 (接收 theme prop)</p>
      <Level2 theme={theme} />
    </div>
  );
}

function Level2({ theme }: { theme: string }) {
  return (
    <div className="border-l-2 border-zinc-300 pl-4 dark:border-zinc-600">
      <p className="text-xs text-zinc-500">Level 2 (传递 theme prop)</p>
      <Level3 theme={theme} />
    </div>
  );
}

function Level3({ theme }: { theme: string }) {
  return (
    <div className="border-l-2 border-zinc-300 pl-4 dark:border-zinc-600">
      <p className="text-xs text-zinc-500">Level 3 (使用 theme)</p>
      <span className="font-medium">Theme: {theme}</span>
    </div>
  );
}

// 使用 Context 的版本
function Level1WithContext() {
  return (
    <div className="border-l-2 border-green-300 pl-4 dark:border-green-600">
      <p className="text-xs text-green-500">Level 1 (无需 props)</p>
      <Level2WithContext />
    </div>
  );
}

function Level2WithContext() {
  return (
    <div className="border-l-2 border-green-300 pl-4 dark:border-green-600">
      <p className="text-xs text-green-500">Level 2 (无需 props)</p>
      <Level3WithContext />
    </div>
  );
}

function Level3WithContext() {
  const { theme } = useTheme();
  return (
    <div className="border-l-2 border-green-300 pl-4 dark:border-green-600">
      <p className="text-xs text-green-500">Level 3 (useContext)</p>
      <span className="font-medium">Theme: {theme}</span>
    </div>
  );
}

export function PropsDrillingComparisonExample() {
  const [theme] = useState("dark");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: Props Drilling 对比</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-red-600">
            ❌ Props Drilling
          </p>
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <Level1 theme={theme} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-green-600">
            ✅ useContext
          </p>
          <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
            <ThemeProvider>
              <Level1WithContext />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseContextExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useContext Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useContext 用于跨组件共享数据，避免 props 层层传递。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本用法</p>
          <pre className="text-green-400">
{`// 1. 创建 Context
const ThemeContext = createContext('light');

// 2. 提供 Context
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// 3. 消费 Context
const theme = useContext(ThemeContext);`}
          </pre>
        </div>
      </div>

      <ThemeExample />
      <UserExample />
      <MultipleContextExample />
      <PropsDrillingComparisonExample />
    </div>
  );
}
