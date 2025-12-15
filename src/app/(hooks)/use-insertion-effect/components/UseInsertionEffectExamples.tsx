"use client";

import {
  useInsertionEffect,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
} from "react";

// ============================================
// 示例 1: 执行顺序演示
// ============================================

export function ExecutionOrderExample() {
  const [logs, setLogs] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(0);
  const logsRef = useRef<string[]>([]);

  // 重置日志
  const resetAndTrigger = () => {
    logsRef.current = [];
    setLogs([]);
    setTrigger((t) => t + 1);
  };

  useInsertionEffect(() => {
    const log = `1. useInsertionEffect (DOM 变更前)`;
    logsRef.current = [...logsRef.current, log];
  }, [trigger]);

  useLayoutEffect(() => {
    const log = `2. useLayoutEffect (DOM 变更后，绘制前)`;
    logsRef.current = [...logsRef.current, log];
  }, [trigger]);

  useEffect(() => {
    const log = `3. useEffect (绘制后)`;
    logsRef.current = [...logsRef.current, log];
    setLogs([...logsRef.current]);
  }, [trigger]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 执行顺序</h3>

      <button
        onClick={resetAndTrigger}
        className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        触发渲染
      </button>

      <div className="rounded-md bg-zinc-900 p-4 font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-zinc-500">点击按钮查看执行顺序...</p>
        ) : (
          logs.map((log, i) => (
            <p
              key={i}
              className={
                log.includes("useInsertionEffect")
                  ? "text-purple-400"
                  : log.includes("useLayoutEffect")
                  ? "text-green-400"
                  : "text-blue-400"
              }
            >
              {log}
            </p>
          ))
        )}
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">执行流程：</p>
        <ol className="mt-2 list-inside list-decimal text-zinc-600 dark:text-zinc-400">
          <li className="text-purple-600 dark:text-purple-400">
            useInsertionEffect - DOM 变更之前
          </li>
          <li>DOM 更新到页面</li>
          <li className="text-green-600 dark:text-green-400">
            useLayoutEffect - DOM 变更之后，浏览器绘制之前
          </li>
          <li>浏览器绘制屏幕</li>
          <li className="text-blue-600 dark:text-blue-400">
            useEffect - 绘制完成之后
          </li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 动态样式注入
// ============================================

function useStyles(id: string, css: string) {
  useInsertionEffect(() => {
    // 检查是否已存在
    const existing = document.getElementById(id);
    if (existing) {
      existing.textContent = css;
      return;
    }

    // 创建新的 style 标签
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(id);
      if (el) {
        document.head.removeChild(el);
      }
    };
  }, [id, css]);
}

export function DynamicStyleExample() {
  const [color, setColor] = useState("#3b82f6");
  const [size, setSize] = useState(16);

  const css = `
    .dynamic-styled-box {
      background-color: ${color};
      padding: ${size}px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      text-align: center;
      transition: all 0.3s ease;
    }
  `;

  useStyles("dynamic-style-demo", css);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 动态样式注入</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">背景颜色</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            内边距: {size}px
          </label>
          <input
            type="range"
            min="8"
            max="40"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="dynamic-styled-box">
        这个盒子的样式通过 useInsertionEffect 注入
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 样式在 DOM 变更之前注入，确保元素渲染时样式已存在，
        避免无样式闪烁（FOUC）。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 简化的 CSS-in-JS 实现
// ============================================

let classCounter = 0;
const styleCache = new Map<string, string>();

function css(strings: TemplateStringsArray, ...values: (string | number)[]) {
  // 组合模板字符串
  let result = "";
  strings.forEach((str, i) => {
    result += str + (values[i] ?? "");
  });
  return result;
}

function useStyled(cssString: string) {
  const [className] = useState(() => {
    // 检查缓存
    if (styleCache.has(cssString)) {
      return styleCache.get(cssString)!;
    }
    const name = `styled-${classCounter++}`;
    styleCache.set(cssString, name);
    return name;
  });

  useInsertionEffect(() => {
    const fullCSS = `.${className} { ${cssString} }`;

    // 检查是否已注入
    if (document.getElementById(className)) return;

    const style = document.createElement("style");
    style.id = className;
    style.textContent = fullCSS;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(className);
      if (el) document.head.removeChild(el);
    };
  }, [className, cssString]);

  return className;
}

function StyledCard({ variant }: { variant: "primary" | "secondary" | "danger" }) {
  const colors = {
    primary: { bg: "#3b82f6", hover: "#2563eb" },
    secondary: { bg: "#6b7280", hover: "#4b5563" },
    danger: { bg: "#ef4444", hover: "#dc2626" },
  };

  const { bg, hover } = colors[variant];

  const className = useStyled(css`
    background-color: ${bg};
    color: white;
    padding: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${hover};
    }
  `);

  // 注意：简化版不支持伪类，这里只是演示概念
  return (
    <div className={className}>
      <p className="font-medium">{variant.toUpperCase()} Card</p>
      <p className="mt-1 text-sm opacity-80">使用 useInsertionEffect 注入样式</p>
    </div>
  );
}

export function CSSinJSExample() {
  const [variant, setVariant] = useState<"primary" | "secondary" | "danger">(
    "primary"
  );

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: CSS-in-JS 简化实现</h3>

      <div className="mb-4 flex gap-2">
        {(["primary", "secondary", "danger"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-md px-3 py-1 text-sm ${
              variant === v
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <StyledCard variant={variant} />

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">简化的 CSS-in-JS 流程：</p>
        <ol className="mt-2 list-inside list-decimal text-zinc-600 dark:text-zinc-400">
          <li>生成唯一的 className</li>
          <li>使用 useInsertionEffect 注入 style 标签</li>
          <li>将 className 应用到元素</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 主题切换
// ============================================

function useThemeVars(theme: "light" | "dark") {
  useInsertionEffect(() => {
    const css =
      theme === "dark"
        ? `
        .theme-demo {
          --bg-color: #1f2937;
          --text-color: #f3f4f6;
          --border-color: #374151;
          --accent-color: #60a5fa;
        }
      `
        : `
        .theme-demo {
          --bg-color: #ffffff;
          --text-color: #1f2937;
          --border-color: #e5e7eb;
          --accent-color: #3b82f6;
        }
      `;

    const styleId = "theme-vars-demo";
    let style = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.textContent = css;

    return () => {
      const el = document.getElementById(styleId);
      if (el) document.head.removeChild(el);
    };
  }, [theme]);
}

export function ThemeSwitchExample() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useThemeVars(theme);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 主题切换</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className={`rounded-md px-4 py-2 text-sm ${
            theme === "light"
              ? "bg-amber-500 text-white"
              : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        >
          ☀️ 浅色
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`rounded-md px-4 py-2 text-sm ${
            theme === "dark"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        >
          🌙 深色
        </button>
      </div>

      <div
        className="theme-demo rounded-md border p-4"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)",
        }}
      >
        <h4 className="mb-2 font-medium">主题演示区域</h4>
        <p className="text-sm" style={{ color: "var(--text-color)" }}>
          这个区域的颜色通过 CSS 变量控制，变量在 useInsertionEffect 中注入。
        </p>
        <button
          className="mt-3 rounded px-3 py-1 text-sm text-white"
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          强调按钮
        </button>
      </div>

      <div className="mt-4 rounded-md bg-purple-50 p-3 text-sm text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
        <strong>优势：</strong> 主题变量在 DOM 更新前注入，切换时没有闪烁。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseInsertionEffectExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useInsertionEffect Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useInsertionEffect 用于在 DOM 变更之前注入样式，主要面向 CSS-in-JS 库作者。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`useInsertionEffect(() => {
  // 在 DOM 变更之前执行
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  return () => {
    document.head.removeChild(style);
  };
}, [css]);`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
          <p className="font-medium">⚠️ 重要限制：</p>
          <ul className="mt-2 list-inside list-disc">
            <li>不能访问 refs（此时 DOM 还未更新）</li>
            <li>不能调度状态更新</li>
            <li>仅用于样式注入</li>
          </ul>
        </div>
      </div>

      <ExecutionOrderExample />
      <DynamicStyleExample />
      <CSSinJSExample />
      <ThemeSwitchExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-amber-50 p-6 dark:bg-amber-900/20">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200">
          使用建议
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">
              ✅ 适用场景
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>CSS-in-JS 库开发</li>
              <li>动态样式注入</li>
              <li>主题系统实现</li>
              <li>样式库内部实现</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">
              ❌ 不适用场景
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>普通应用开发</li>
              <li>DOM 操作</li>
              <li>数据获取</li>
              <li>状态更新</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-amber-700 dark:text-amber-300">
          <strong>提示：</strong> 大多数开发者不需要直接使用此 Hook，
          而是使用基于它构建的库（如 styled-components、Emotion）。
        </p>
      </div>
    </div>
  );
}
