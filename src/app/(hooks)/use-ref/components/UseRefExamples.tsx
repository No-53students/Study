"use client";

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";

// ============================================
// 示例 1: DOM 元素引用
// ============================================

export function DomRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const selectText = () => {
    inputRef.current?.select();
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: DOM 元素引用</h3>

      <div className="space-y-4">
        {/* 输入框示例 */}
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-sm font-medium">输入框操作</p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              defaultValue="选中或聚焦这段文字"
              className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-700"
            />
            <button
              onClick={focusInput}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            >
              聚焦
            </button>
            <button
              onClick={selectText}
              className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
            >
              选中
            </button>
          </div>
        </div>

        {/* 视频示例 */}
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-sm font-medium">视频控制</p>
          <video
            ref={videoRef}
            className="mb-2 w-full rounded-md bg-black"
            style={{ height: "150px" }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            您的浏览器不支持视频标签
          </video>
          <div className="flex gap-2">
            <button
              onClick={() => videoRef.current?.play()}
              className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              播放
            </button>
            <button
              onClick={() => videoRef.current?.pause()}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              暂停
            </button>
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                }
              }}
              className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
            >
              重置
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> useRef 可以获取 DOM 元素的引用，直接调用其原生方法。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 存储可变值（不触发渲染）
// ============================================

export function MutableValueExample() {
  const [renderCount, setRenderCount] = useState(0);
  const clickCountRef = useRef(0);
  const [clickCountState, setClickCountState] = useState(0);

  // 使用 ref 存储点击次数（不会触发重新渲染）
  const handleRefClick = () => {
    clickCountRef.current += 1;
    console.log(`Ref 点击次数: ${clickCountRef.current}`);
  };

  // 使用 state 存储点击次数（会触发重新渲染）
  const handleStateClick = () => {
    setClickCountState((c) => c + 1);
  };

  // 强制重新渲染
  const forceRender = () => {
    setRenderCount((c) => c + 1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: useRef vs useState</h3>

      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          组件渲染次数: <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{renderCount + 1}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* useRef 版本 */}
        <div className="rounded-md border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
          <p className="mb-2 text-sm font-medium text-amber-800 dark:text-amber-200">
            useRef (不触发渲染)
          </p>
          <p className="mb-4 text-center text-3xl font-bold">
            {clickCountRef.current}
          </p>
          <button
            onClick={handleRefClick}
            className="w-full rounded-md bg-amber-600 px-4 py-2 text-sm text-white hover:bg-amber-700"
          >
            点击 +1
          </button>
          <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
            数字不会变化，打开控制台查看
          </p>
        </div>

        {/* useState 版本 */}
        <div className="rounded-md border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
          <p className="mb-2 text-sm font-medium text-green-800 dark:text-green-200">
            useState (触发渲染)
          </p>
          <p className="mb-4 text-center text-3xl font-bold">{clickCountState}</p>
          <button
            onClick={handleStateClick}
            className="w-full rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            点击 +1
          </button>
          <p className="mt-2 text-xs text-green-700 dark:text-green-300">
            每次点击都会重新渲染
          </p>
        </div>
      </div>

      <button
        onClick={forceRender}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        强制重新渲染（查看 ref 的真实值）
      </button>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">关键区别：</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>useRef 修改值不会触发重新渲染</li>
          <li>useState 修改值会触发重新渲染</li>
          <li>useRef 的值在渲染之间保持不变</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 定时器管理
// ============================================

export function TimerExample() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current) return; // 防止重复启动
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 100); // 每 100ms 更新一次
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (centiseconds: number) => {
    const mins = Math.floor(centiseconds / 600);
    const secs = Math.floor((centiseconds % 600) / 10);
    const cs = centiseconds % 10;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${cs}`;
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 秒表（定时器管理）</h3>

      <div className="mb-6 text-center">
        <span className="font-mono text-5xl font-bold">{formatTime(time)}</span>
      </div>

      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={start}
            className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            开始
          </button>
        ) : (
          <button
            onClick={stop}
            className="rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            停止
          </button>
        )}
        <button
          onClick={reset}
          className="rounded-md bg-zinc-600 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          重置
        </button>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>为什么用 useRef 存储 intervalId？</strong>
        <ul className="mt-2 list-inside list-disc">
          <li>定时器 ID 不需要显示在 UI 上</li>
          <li>修改它不需要触发重新渲染</li>
          <li>需要在多次渲染间保持同一个引用以便清除</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 保存上一次的值
// ============================================

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function PreviousValueExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");
  const prevCount = usePrevious(count);
  const prevName = usePrevious(name);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 保存上一次的值</h3>

      <div className="space-y-4">
        {/* 数字示例 */}
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">当前值</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">上一次值</p>
              <p className="text-2xl font-bold text-zinc-400">
                {prevCount ?? "-"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="flex-1 rounded-md bg-zinc-600 px-3 py-2 text-sm text-white hover:bg-zinc-700"
            >
              -1
            </button>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="flex-1 rounded-md bg-zinc-600 px-3 py-2 text-sm text-white hover:bg-zinc-700"
            >
              +1
            </button>
            <button
              onClick={() => setCount((c) => c + 10)}
              className="flex-1 rounded-md bg-zinc-600 px-3 py-2 text-sm text-white hover:bg-zinc-700"
            >
              +10
            </button>
          </div>
        </div>

        {/* 文本示例 */}
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          <div className="mb-3">
            <p className="text-sm text-zinc-500">
              当前: <span className="font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
            </p>
            <p className="text-sm text-zinc-500">
              上一次: <span className="font-bold text-zinc-400">{prevName ?? "-"}</span>
            </p>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-700"
          />
        </div>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm dark:bg-blue-900/30">
        <p className="font-medium text-blue-800 dark:text-blue-200">
          usePrevious 自定义 Hook：
        </p>
        <pre className="mt-2 overflow-x-auto text-xs text-blue-700 dark:text-blue-300">
{`function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 避免闭包陷阱
// ============================================

export function ClosureTrapExample() {
  const [message, setMessage] = useState("Hello");
  const messageRef = useRef(message);

  // 保持 ref 与 state 同步
  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  // ❌ 闭包陷阱：使用 state
  const sendWithState = () => {
    setTimeout(() => {
      alert(`State 消息: ${message}`);
    }, 3000);
  };

  // ✅ 使用 ref 获取最新值
  const sendWithRef = () => {
    setTimeout(() => {
      alert(`Ref 消息: ${messageRef.current}`);
    }, 3000);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 避免闭包陷阱</h3>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">输入消息</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={sendWithState}
          className="rounded-md bg-red-600 px-4 py-3 text-sm text-white hover:bg-red-700"
        >
          <div className="font-medium">3秒后发送 (State)</div>
          <div className="text-xs opacity-75">可能是旧值</div>
        </button>
        <button
          onClick={sendWithRef}
          className="rounded-md bg-green-600 px-4 py-3 text-sm text-white hover:bg-green-700"
        >
          <div className="font-medium">3秒后发送 (Ref)</div>
          <div className="text-xs opacity-75">始终是最新值</div>
        </button>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>测试方法：</strong>
        <ol className="mt-2 list-inside list-decimal">
          <li>点击任意一个按钮</li>
          <li>在 3 秒内修改输入框内容</li>
          <li>观察弹出的消息是旧值还是新值</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: forwardRef 与 useImperativeHandle
// ============================================

interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string }>(
  function CustomInput({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      getValue: () => {
        return inputRef.current?.value ?? "";
      },
    }));

    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md border-2 border-purple-300 bg-purple-50 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none dark:border-purple-700 dark:bg-purple-900/20"
      />
    );
  }
);

export function ForwardRefExample() {
  const customInputRef = useRef<CustomInputHandle>(null);
  const [lastValue, setLastValue] = useState("");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">
        示例 6: forwardRef + useImperativeHandle
      </h3>

      <div className="mb-4">
        <CustomInput ref={customInputRef} placeholder="自定义输入框组件" />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => customInputRef.current?.focus()}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          聚焦
        </button>
        <button
          onClick={() => customInputRef.current?.clear()}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          清空
        </button>
        <button
          onClick={() => {
            const value = customInputRef.current?.getValue() ?? "";
            setLastValue(value);
          }}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          获取值
        </button>
      </div>

      {lastValue && (
        <div className="mt-4 rounded-md bg-purple-100 p-3 text-sm text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
          获取到的值: <strong>{lastValue}</strong>
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">关键点：</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>forwardRef 允许父组件传递 ref 给子组件</li>
          <li>useImperativeHandle 自定义暴露给父组件的方法</li>
          <li>可以隐藏实现细节，只暴露需要的接口</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseRefExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useRef Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useRef 用于创建可变引用，主要用于访问 DOM 元素和存储不触发渲染的值。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`// DOM 引用
const inputRef = useRef<HTMLInputElement>(null);

// 存储可变值
const countRef = useRef(0);

// 访问
inputRef.current?.focus();
countRef.current += 1;`}
          </pre>
        </div>
      </div>

      <DomRefExample />
      <MutableValueExample />
      <TimerExample />
      <PreviousValueExample />
      <ClosureTrapExample />
      <ForwardRefExample />
    </div>
  );
}
