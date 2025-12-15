"use client";

import { useOptimistic, useState, useTransition } from "react";

// ============================================
// 示例 1: 点赞按钮
// ============================================

export function LikeButtonExample() {
  const [likes, setLikes] = useState(42);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, change: number) => currentLikes + change
  );
  const [isPending, startTransition] = useTransition();

  async function handleLike() {
    startTransition(async () => {
      addOptimisticLike(1);

      // 模拟网络请求
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 模拟成功
      setLikes((l) => l + 1);
    });
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 点赞按钮</h3>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleLike}
          disabled={isPending}
          className="flex items-center gap-2 rounded-full bg-pink-100 px-6 py-3 text-pink-600 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 dark:bg-pink-900/30 dark:text-pink-300"
        >
          <span className="text-2xl">❤️</span>
          <span className="text-xl font-bold">{optimisticLikes}</span>
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-zinc-500">
        <p>真实值: {likes}</p>
        <p>乐观值: {optimisticLikes}</p>
        <p>状态: {isPending ? "⏳ 提交中..." : "✅ 已同步"}</p>
      </div>

      <div className="mt-4 rounded-md bg-pink-50 p-3 text-sm text-pink-800 dark:bg-pink-900/20 dark:text-pink-200">
        <strong>说明：</strong> 点击后立即 +1 显示，1.5 秒后服务器确认更新。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 待办事项列表
// ============================================

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  sending?: boolean;
}

export function TodoListExample() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "学习 useOptimistic", completed: true },
    { id: "2", text: "完成项目文档", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], newTodo: Todo) => [...state, newTodo]
  );

  async function handleAddTodo() {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: `temp-${Date.now()}`,
      text: inputValue,
      completed: false,
      sending: true,
    };

    setInputValue("");

    startTransition(async () => {
      addOptimisticTodo(newTodo);

      // 模拟网络请求
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟成功添加
      setTodos((prev) => [
        ...prev,
        { ...newTodo, id: String(Date.now()), sending: false },
      ]);
    });
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 待办事项</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="添加新任务..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={handleAddTodo}
          disabled={isPending || !inputValue.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          添加
        </button>
      </div>

      <ul className="space-y-2">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center gap-3 rounded-md p-3 transition-opacity ${
              todo.sending
                ? "bg-blue-50 dark:bg-blue-900/20"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
            style={{ opacity: todo.sending ? 0.6 : 1 }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => !todo.sending && toggleTodo(todo.id)}
              disabled={todo.sending}
              className="h-4 w-4 rounded"
            />
            <span
              className={`flex-1 ${
                todo.completed ? "text-zinc-400 line-through" : ""
              }`}
            >
              {todo.text}
            </span>
            {todo.sending && (
              <span className="text-xs text-blue-600 dark:text-blue-400">
                ⏳ 添加中...
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p>
          <strong>实际任务数:</strong> {todos.length}
        </p>
        <p>
          <strong>显示任务数:</strong> {optimisticTodos.length}
        </p>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 消息发送
// ============================================

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  sending?: boolean;
}

export function ChatExample() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "你好！", sender: "other" },
    { id: "2", text: "你好，有什么可以帮你？", sender: "me" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: Message) => [...state, newMessage]
  );

  async function handleSend() {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      text: inputValue,
      sender: "me",
      sending: true,
    };

    setInputValue("");

    startTransition(async () => {
      addOptimisticMessage(newMessage);

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 模拟成功
      setMessages((prev) => [
        ...prev,
        { ...newMessage, id: String(Date.now()), sending: false },
      ]);
    });
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 即时消息</h3>

      <div className="mb-4 h-64 overflow-y-auto rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <div className="space-y-3">
          {optimisticMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-zinc-700"
                }`}
                style={{ opacity: msg.sending ? 0.6 : 1 }}
              >
                <p className="text-sm">{msg.text}</p>
                {msg.sending && (
                  <p className="mt-1 text-xs opacity-70">发送中...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="输入消息..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={handleSend}
          disabled={isPending || !inputValue.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          发送
        </button>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 失败回滚演示
// ============================================

export function RollbackExample() {
  const [count, setCount] = useState(10);
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (current, change: number) => current + change
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [shouldFail, setShouldFail] = useState(false);

  async function handleIncrement() {
    setError(null);

    startTransition(async () => {
      addOptimisticCount(1);

      // 模拟网络请求
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (shouldFail) {
        // 模拟失败 - 乐观值会自动回滚
        setError("操作失败！数值已回滚。");
      } else {
        // 模拟成功
        setCount((c) => c + 1);
      }
    });
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 失败回滚</h3>

      <div className="mb-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold">{optimisticCount}</p>
          <p className="mt-2 text-sm text-zinc-500">
            {isPending ? "⏳ 更新中..." : `真实值: ${count}`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
          ❌ {error}
        </div>
      )}

      <div className="mb-4 flex items-center justify-center gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">模拟请求失败</span>
        </label>
      </div>

      <button
        onClick={handleIncrement}
        disabled={isPending}
        className="w-full rounded-md bg-green-600 px-4 py-3 text-white hover:bg-green-700 disabled:opacity-50"
      >
        +1
      </button>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
        <strong>测试方法：</strong>
        <ol className="mt-2 list-inside list-decimal">
          <li>不勾选&ldquo;模拟请求失败&rdquo;，点击按钮看正常流程</li>
          <li>勾选&ldquo;模拟请求失败&rdquo;，点击按钮看回滚效果</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseOptimisticExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useOptimistic Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useOptimistic 用于实现乐观更新，在异步操作完成前立即显示预期结果。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const [optimisticState, addOptimistic] = useOptimistic(
  state,  // 真实状态
  (currentState, optimisticValue) => {
    // 返回乐观状态
    return newState;
  }
);

// 使用
addOptimistic(value);  // 立即显示乐观值
await serverAction();  // 执行实际操作`}
          </pre>
        </div>
      </div>

      <LikeButtonExample />
      <TodoListExample />
      <ChatExample />
      <RollbackExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          使用指南
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">
              ✅ 适合乐观更新
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>点赞/收藏</li>
              <li>评论/留言</li>
              <li>待办事项</li>
              <li>即时消息</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">
              ❌ 不适合乐观更新
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>支付操作</li>
              <li>删除重要数据</li>
              <li>需要严格验证</li>
              <li>不可逆操作</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
