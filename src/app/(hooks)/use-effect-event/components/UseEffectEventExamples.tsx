"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// 注意：useEffectEvent 在 React 19.2 中引入，可能需要从 experimental 导入
// import { experimental_useEffectEvent as useEffectEvent } from 'react';

// 由于 useEffectEvent 可能尚未在当前 React 版本中稳定，
// 我们用自定义实现来演示其概念

function useEffectEvent<T extends (...args: never[]) => unknown>(fn: T): T {
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback(((...args) => ref.current(...args)) as T, []);
}

// ============================================
// 示例 1: 基本概念 - 避免不必要的 Effect 重执行
// ============================================

export function BasicConceptExample() {
  const [roomId, setRoomId] = useState("general");
  const [showNotification, setShowNotification] = useState(true);
  const [connectionLog, setConnectionLog] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  // 使用 useEffectEvent 处理消息通知
  // 这样 showNotification 变化不会导致重新连接
  const onReceiveMessage = useEffectEvent((message: string) => {
    setMessages((prev) => [...prev, message]);
    if (showNotification) {
      // 显示通知
      console.log(`通知: ${message}`);
    }
  });

  useEffect(() => {
    const log = `连接到房间: ${roomId}`;
    setConnectionLog((prev) => [...prev, log]);

    // 模拟 WebSocket 连接
    const interval = setInterval(() => {
      const msg = `[${roomId}] 消息 ${Date.now() % 1000}`;
      onReceiveMessage(msg);
    }, 3000);

    return () => {
      clearInterval(interval);
      setConnectionLog((prev) => [...prev, `断开房间: ${roomId}`]);
    };
  }, [roomId]); // 注意：不包含 showNotification 或 onReceiveMessage

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本概念</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">选择房间</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          >
            <option value="general">通用房间</option>
            <option value="tech">技术讨论</option>
            <option value="random">随便聊聊</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showNotification}
              onChange={(e) => setShowNotification(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span className="text-sm">显示消息通知</span>
          </label>
        </div>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">连接日志：</p>
          <div className="h-32 overflow-y-auto rounded-md bg-zinc-100 p-2 text-xs dark:bg-zinc-800">
            {connectionLog.map((log, i) => (
              <p key={i} className={log.includes("断开") ? "text-red-600" : "text-green-600"}>
                {log}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">收到的消息：</p>
          <div className="h-32 overflow-y-auto rounded-md bg-zinc-100 p-2 text-xs dark:bg-zinc-800">
            {messages.slice(-10).map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>观察：</strong> 切换&ldquo;显示消息通知&rdquo;不会导致重新连接（连接日志不变），
        但通知行为会立即改变。这就是 useEffectEvent 的作用！
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 对比 - 有无 useEffectEvent 的区别
// ============================================

export function ComparisonExample() {
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState({ with: 0, without: 0 });

  // 不使用 useEffectEvent 的回调
  const callbackWithout = useCallback(() => {
    console.log("Without useEffectEvent, count:", count);
  }, [count]);

  // 使用 useEffectEvent 的回调
  const callbackWith = useEffectEvent(() => {
    console.log("With useEffectEvent, count:", count);
  });

  // 不使用 useEffectEvent - 每次 count 变化都会重新执行
  useEffect(() => {
    setEffectRuns((prev) => ({ ...prev, without: prev.without + 1 }));
    const timer = setInterval(callbackWithout, 5000);
    return () => clearInterval(timer);
  }, [callbackWithout]);

  // 使用 useEffectEvent - 只执行一次
  useEffect(() => {
    setEffectRuns((prev) => ({ ...prev, with: prev.with + 1 }));
    const timer = setInterval(callbackWith, 5000);
    return () => clearInterval(timer);
  }, []); // 不依赖 callbackWith

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 有无 useEffectEvent 对比</h3>

      <div className="mb-4 text-center">
        <p className="text-sm text-zinc-500">当前计数</p>
        <p className="text-4xl font-bold">{count}</p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          +1
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className="font-medium text-red-800 dark:text-red-200">
            ❌ 不用 useEffectEvent
          </p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {effectRuns.without}
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">次 Effect 执行</p>
          <p className="mt-2 text-xs text-red-500">
            每次 count 变化都重新设置定时器
          </p>
        </div>
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="font-medium text-green-800 dark:text-green-200">
            ✅ 使用 useEffectEvent
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {effectRuns.with}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">次 Effect 执行</p>
          <p className="mt-2 text-xs text-green-500">
            只设置一次，但回调能访问最新 count
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 分析日志场景
// ============================================

export function AnalyticsExample() {
  const [page, setPage] = useState("/home");
  const [userId, setUserId] = useState("user123");
  const [analyticsLogs, setAnalyticsLogs] = useState<string[]>([]);
  const [effectRuns, setEffectRuns] = useState(0);

  // 日志记录不应该导致 Effect 重新执行
  const logPageView = useEffectEvent(() => {
    const log = `📊 用户 ${userId} 访问了 ${page}`;
    setAnalyticsLogs((prev) => [...prev, log]);
  });

  useEffect(() => {
    setEffectRuns((r) => r + 1);
    // 页面变化时记录访问
    logPageView();
  }, [page]); // 只依赖 page，不依赖 userId

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 分析日志</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">当前页面</label>
          <select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          >
            <option value="/home">首页</option>
            <option value="/products">产品页</option>
            <option value="/about">关于页</option>
            <option value="/contact">联系页</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">用户 ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div className="mb-4 rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
        <p className="text-sm">
          Effect 执行次数: <strong>{effectRuns}</strong>
          <span className="ml-2 text-zinc-500">(只有切换页面才增加)</span>
        </p>
      </div>

      <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
        <p className="mb-2 text-sm font-medium">分析日志：</p>
        <div className="max-h-32 overflow-y-auto text-xs">
          {analyticsLogs.map((log, i) => (
            <p key={i}>{log}</p>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>关键点：</strong> 修改用户 ID 不会触发 Effect 重新执行，
        但日志中会显示最新的用户 ID。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 定时器场景
// ============================================

export function TimerExample() {
  const [duration, setDuration] = useState(10);
  const [remaining, setRemaining] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");
  const [customMessage, setCustomMessage] = useState("计时完成！");
  const [effectRuns, setEffectRuns] = useState(0);

  // 完成回调使用 useEffectEvent
  const onComplete = useEffectEvent(() => {
    setCompletionMessage(`${customMessage} (持续了 ${duration} 秒)`);
    setIsRunning(false);
  });

  useEffect(() => {
    if (!isRunning) return;

    setEffectRuns((r) => r + 1);
    setRemaining(duration);

    const timer = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          onComplete();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, duration]); // 不包含 customMessage 或 onComplete

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 定时器</h3>

      <div className="mb-4 text-center">
        <p className="text-6xl font-bold">{remaining}</p>
        <p className="text-sm text-zinc-500">秒</p>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">时长 (秒)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={isRunning}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">完成消息</label>
          <input
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="计时完成时显示的消息"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
        >
          开始
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setRemaining(duration);
          }}
          className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          重置
        </button>
      </div>

      {completionMessage && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-center text-green-800 dark:bg-green-900/30 dark:text-green-200">
          {completionMessage}
        </div>
      )}

      <p className="text-sm text-zinc-500">
        Effect 执行次数: {effectRuns}
        <span className="ml-2">
          (修改&ldquo;完成消息&rdquo;不会重置定时器)
        </span>
      </p>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseEffectEventExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useEffectEvent Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useEffectEvent 用于从 Effect 中提取非响应式逻辑，避免不必要的 Effect 重执行。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const onSomething = useEffectEvent((param) => {
  // 总是能访问最新的 props/state
  // 不会成为 Effect 的依赖
  console.log(someState, param);
});

useEffect(() => {
  connection.on('message', onSomething);
}, [roomId]); // 不包含 onSomething`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
          <strong>⚠️ 注意：</strong> useEffectEvent 在 React 19.2 中引入，
          可能需要从 experimental 导入。本示例使用自定义实现演示概念。
        </div>
      </div>

      <BasicConceptExample />
      <ComparisonExample />
      <AnalyticsExample />
      <TimerExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          使用指南
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">
              ✅ 适合使用
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>Effect 中的事件回调</li>
              <li>分析/日志记录</li>
              <li>定时器完成回调</li>
              <li>WebSocket 消息处理</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">
              ❌ 不适合使用
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>用户交互事件处理</li>
              <li>只是消除 ESLint 警告</li>
              <li>作为 props 传递给子组件</li>
              <li>在渲染中调用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
