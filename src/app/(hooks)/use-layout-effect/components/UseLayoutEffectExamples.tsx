"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

// ============================================
// 示例 1: useEffect vs useLayoutEffect 对比
// ============================================

export function ComparisonExample() {
  const [showBox, setShowBox] = useState(false);
  const [effectPosition, setEffectPosition] = useState({ left: 0 });
  const [layoutEffectPosition, setLayoutEffectPosition] = useState({ left: 0 });
  const effectBoxRef = useRef<HTMLDivElement>(null);
  const layoutEffectBoxRef = useRef<HTMLDivElement>(null);

  // useEffect: 绘制后执行，可能看到闪烁
  useEffect(() => {
    if (showBox && effectBoxRef.current) {
      // 模拟计算位置
      const newLeft = 200;
      setEffectPosition({ left: newLeft });
    } else {
      setEffectPosition({ left: 0 });
    }
  }, [showBox]);

  // useLayoutEffect: 绘制前执行，无闪烁
  useLayoutEffect(() => {
    if (showBox && layoutEffectBoxRef.current) {
      // 模拟计算位置
      const newLeft = 200;
      setLayoutEffectPosition({ left: newLeft });
    } else {
      setLayoutEffectPosition({ left: 0 });
    }
  }, [showBox]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: useEffect vs useLayoutEffect</h3>

      <button
        onClick={() => setShowBox(!showBox)}
        className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        {showBox ? "隐藏" : "显示"} 方块
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* useEffect 版本 */}
        <div className="relative h-32 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className="mb-2 text-sm font-medium text-red-800 dark:text-red-200">
            useEffect（可能闪烁）
          </p>
          {showBox && (
            <div
              ref={effectBoxRef}
              className="absolute h-12 w-12 rounded-md bg-red-500 transition-none"
              style={{ left: effectPosition.left, top: 60 }}
            />
          )}
        </div>

        {/* useLayoutEffect 版本 */}
        <div className="relative h-32 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="mb-2 text-sm font-medium text-green-800 dark:text-green-200">
            useLayoutEffect（无闪烁）
          </p>
          {showBox && (
            <div
              ref={layoutEffectBoxRef}
              className="absolute h-12 w-12 rounded-md bg-green-500 transition-none"
              style={{ left: layoutEffectPosition.left, top: 60 }}
            />
          )}
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>说明：</strong> 快速多次点击按钮，观察两个方块的行为差异。
        useEffect 版本可能会先显示在初始位置再跳转，而 useLayoutEffect 版本直接显示在正确位置。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: DOM 测量
// ============================================

export function MeasureExample() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [content, setContent] = useState("少量内容");

  useLayoutEffect(() => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [content]);

  const contents = [
    "少量内容",
    "这是一段更长的内容，用来测试元素尺寸变化时的测量效果。",
    "这是一段非常非常长的内容。当内容变化时，useLayoutEffect 会在浏览器绘制之前同步测量元素的新尺寸，确保我们获取到的是最新的、准确的尺寸信息。这对于需要根据元素尺寸进行布局调整的场景非常重要。",
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: DOM 测量</h3>

      <div className="mb-4 flex gap-2">
        {contents.map((c, i) => (
          <button
            key={i}
            onClick={() => setContent(c)}
            className={`rounded-md px-3 py-1 text-sm ${
              content === c
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            内容 {i + 1}
          </button>
        ))}
      </div>

      <div
        ref={boxRef}
        className="mb-4 rounded-md bg-blue-100 p-4 dark:bg-blue-900/30"
      >
        {content}
      </div>

      <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="text-sm">
          测量到的尺寸：
          <span className="ml-2 font-mono font-bold">
            {dimensions.width.toFixed(0)} x {dimensions.height.toFixed(0)} px
          </span>
        </p>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>关键点：</strong> useLayoutEffect 在浏览器绘制前同步执行，
        所以当内容变化时，我们能立即获取到新的尺寸，而不是旧的尺寸。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: Tooltip 定位
// ============================================

export function TooltipExample() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // 计算 tooltip 位置（居中显示在按钮上方）
      let x = buttonRect.left + (buttonRect.width - tooltipRect.width) / 2;
      const y = buttonRect.top - tooltipRect.height - 8;

      // 边界检测
      if (x < 8) x = 8;
      if (x + tooltipRect.width > window.innerWidth - 8) {
        x = window.innerWidth - tooltipRect.width - 8;
      }

      setTooltipPosition({ x, y });
    }
  }, [showTooltip]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: Tooltip 定位</h3>

      <div className="flex h-40 items-center justify-center">
        <button
          ref={buttonRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="rounded-md bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
        >
          悬停显示 Tooltip
        </button>
      </div>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-50 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white shadow-lg"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          这是一个使用 useLayoutEffect 定位的 Tooltip
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">为什么用 useLayoutEffect？</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>需要测量 button 和 tooltip 的位置</li>
          <li>在绘制前计算正确位置，避免 tooltip 先出现在错误位置再跳转</li>
          <li>确保用户看到的是正确定位的 tooltip</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 自动调整高度的文本框
// ============================================

export function AutoResizeTextareaExample() {
  const [value, setValue] = useState("输入一些文字，文本框会自动调整高度...");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 先重置高度以获取正确的 scrollHeight
    textarea.style.height = "auto";
    // 设置为内容高度
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 自动调整高度的文本框</h3>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-none overflow-hidden rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
        placeholder="输入文字..."
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setValue("短文本")}
          className="rounded-md bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700"
        >
          短文本
        </button>
        <button
          onClick={() =>
            setValue(
              "这是一段较长的文本。\n\n它有多行。\n\n文本框会自动调整高度来适应内容。\n\n这是通过 useLayoutEffect 在每次内容变化时测量并设置高度实现的。"
            )
          }
          className="rounded-md bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700"
        >
          长文本
        </button>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>实现原理：</strong>
        <ol className="mt-2 list-inside list-decimal">
          <li>内容变化时触发 useLayoutEffect</li>
          <li>先将高度设为 auto 重置</li>
          <li>读取 scrollHeight 获取内容实际高度</li>
          <li>将高度设置为 scrollHeight</li>
          <li>由于是 useLayoutEffect，用户看不到闪烁</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 执行顺序演示
// ============================================

export function ExecutionOrderExample() {
  const [logs, setLogs] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(0);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toISOString().slice(11, 23)}: ${message}`]);
  };

  useLayoutEffect(() => {
    addLog("useLayoutEffect 执行 (绘制前)");
    return () => {
      // 这里不记录清理，避免循环
    };
  }, [trigger]);

  useEffect(() => {
    addLog("useEffect 执行 (绘制后)");
    return () => {
      // 这里不记录清理，避免循环
    };
  }, [trigger]);

  // 渲染时记录
  if (trigger > 0 && logs.length === 0) {
    // 只在首次触发时添加
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 执行顺序</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => {
            setLogs([]);
            setTrigger((t) => t + 1);
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          触发渲染
        </button>
        <button
          onClick={() => setLogs([])}
          className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          清空日志
        </button>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-zinc-400">点击&ldquo;触发渲染&rdquo;查看执行顺序...</p>
        ) : (
          logs.map((log, i) => (
            <p
              key={i}
              className={
                log.includes("useLayoutEffect")
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
        <p className="font-medium">执行顺序：</p>
        <ol className="mt-2 list-inside list-decimal text-zinc-600 dark:text-zinc-400">
          <li>组件渲染</li>
          <li>DOM 更新</li>
          <li className="text-green-600 dark:text-green-400">useLayoutEffect 同步执行</li>
          <li>浏览器绘制</li>
          <li className="text-blue-600 dark:text-blue-400">useEffect 异步执行</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseLayoutEffectExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useLayoutEffect Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useLayoutEffect 在浏览器绘制之前同步执行，用于需要同步读取或修改 DOM 布局的场景。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 与 useEffect 签名相同</p>
          <pre className="text-green-400">
{`useLayoutEffect(() => {
  // 在绘制前同步执行
  const rect = ref.current.getBoundingClientRect();
  setPosition({ x: rect.left, y: rect.top });

  return () => {
    // 清理函数
  };
}, [dependencies]);`}
          </pre>
        </div>
      </div>

      <ComparisonExample />
      <MeasureExample />
      <TooltipExample />
      <AutoResizeTextareaExample />
      <ExecutionOrderExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-amber-50 p-6 dark:bg-amber-900/20">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200">
          使用指南
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">✅ 使用 useLayoutEffect</p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>测量 DOM 元素尺寸/位置</li>
              <li>Tooltip/Dropdown 定位</li>
              <li>防止视觉闪烁</li>
              <li>动画初始状态设置</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">❌ 使用 useEffect</p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>数据获取</li>
              <li>事件订阅</li>
              <li>日志记录</li>
              <li>大多数副作用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
