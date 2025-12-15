"use client";

import { useState, useRef } from "react";

// ============================================
// 示例 1: 基本点击事件
// ============================================

export function BasicClickExample() {
  const [count, setCount] = useState(0);
  const [lastAction, setLastAction] = useState("");

  const handleClick = () => {
    setCount((c) => c + 1);
    setLastAction("单击");
  };

  const handleDoubleClick = () => {
    setCount((c) => c + 10);
    setLastAction("双击 (+10)");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本点击事件</h3>

      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          点击计数: {count}
        </button>
        {lastAction && (
          <span className="text-sm text-zinc-500">最后操作: {lastAction}</span>
        )}
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const handleClick = () => {
  setCount(c => c + 1);
};

<button onClick={handleClick}>
  点击计数: {count}
</button>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 传递参数
// ============================================

interface Item {
  id: number;
  name: string;
}

export function EventParamsExample() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "React" },
    { id: 2, name: "Vue" },
    { id: 3, name: "Angular" },
  ]);
  const [log, setLog] = useState<string[]>([]);

  const handleDelete = (id: number, name: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
    setLog((log) => [`删除了: ${name} (id: ${id})`, ...log].slice(0, 5));
  };

  const handleEdit = (item: Item) => {
    setLog((log) => [`编辑: ${item.name}`, ...log].slice(0, 5));
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 传递参数</h3>

      <div className="mb-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md bg-zinc-100 px-4 py-2 dark:bg-zinc-800"
          >
            <span>{item.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
              >
                编辑
              </button>
              <button
                onClick={() => handleDelete(item.id, item.name)}
                className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                删除
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-4 text-center text-zinc-500">列表为空</p>
        )}
      </div>

      {log.length > 0 && (
        <div className="mb-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
          <p className="mb-1 font-medium">操作日志:</p>
          {log.map((entry, i) => (
            <p key={i} className="text-zinc-500">
              {entry}
            </p>
          ))}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const handleDelete = (id: number, name: string) => {
  setItems(items => items.filter(item => item.id !== id));
};

// 方式 1: 箭头函数传参
<button onClick={() => handleDelete(item.id, item.name)}>
  删除
</button>

// 方式 2: 传递整个对象
<button onClick={() => handleEdit(item)}>编辑</button>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 事件对象
// ============================================

export function EventObjectExample() {
  const [eventInfo, setEventInfo] = useState<{
    type: string;
    target: string;
    position?: { x: number; y: number };
    key?: string;
  } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setEventInfo({
      type: e.type,
      target: (e.target as HTMLElement).tagName,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setEventInfo({
      type: e.type,
      target: (e.target as HTMLElement).tagName,
      key: e.key,
    });
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 事件对象</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div
          onMouseMove={handleMouseMove}
          className="flex h-32 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white"
        >
          在此区域移动鼠标
        </div>
        <div>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="在此输入并按键"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
      </div>

      {eventInfo && (
        <div className="mb-4 rounded-md bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
          <p>
            <strong>事件类型:</strong> {eventInfo.type}
          </p>
          <p>
            <strong>目标元素:</strong> {eventInfo.target}
          </p>
          {eventInfo.position && (
            <p>
              <strong>鼠标位置:</strong> ({eventInfo.position.x},{" "}
              {eventInfo.position.y})
            </p>
          )}
          {eventInfo.key && (
            <p>
              <strong>按键:</strong> {eventInfo.key}
            </p>
          )}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const handleMouseMove = (e: React.MouseEvent) => {
  console.log(e.type);      // 'mousemove'
  console.log(e.target);    // 事件目标
  console.log(e.clientX);   // 鼠标 X 坐标
};

const handleKeyDown = (e: React.KeyboardEvent) => {
  console.log(e.key);       // 按下的键
  console.log(e.code);      // 键码
};`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 阻止默认行为和冒泡
// ============================================

export function PreventDefaultExample() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((l) => [msg, ...l].slice(0, 5));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    addLog("链接点击被阻止，页面没有跳转");
  };

  const handleOuterClick = () => {
    addLog("外层 div 被点击（冒泡）");
  };

  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addLog("内层按钮被点击，阻止了冒泡");
  };

  const handleInnerClickNoBubble = () => {
    addLog("内层按钮被点击，没有阻止冒泡");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 阻止默认行为和冒泡</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">阻止默认行为:</p>
          <a
            href="https://google.com"
            onClick={handleLinkClick}
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            点击这个链接（不会跳转）
          </a>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">事件冒泡:</p>
          <div
            onClick={handleOuterClick}
            className="rounded-md bg-zinc-200 p-4 dark:bg-zinc-700"
          >
            <p className="mb-2 text-xs text-zinc-500">外层 div（会收到冒泡事件）</p>
            <div className="flex gap-2">
              <button
                onClick={handleInnerClick}
                className="rounded bg-green-600 px-3 py-1 text-sm text-white"
              >
                阻止冒泡
              </button>
              <button
                onClick={handleInnerClickNoBubble}
                className="rounded bg-orange-600 px-3 py-1 text-sm text-white"
              >
                不阻止冒泡
              </button>
            </div>
          </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="mb-4 rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
          <p className="mb-1 text-sm font-medium">事件日志:</p>
          {logs.map((log, i) => (
            <p key={i} className="text-sm text-zinc-500">
              {log}
            </p>
          ))}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 阻止默认行为
const handleClick = (e) => {
  e.preventDefault();
};

// 阻止事件冒泡
const handleClick = (e) => {
  e.stopPropagation();
};`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 键盘事件
// ============================================

export function KeyboardEventExample() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [keyInfo, setKeyInfo] = useState({ key: "", code: "", modifiers: "" });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 记录按键信息
    const modifiers = [
      e.ctrlKey && "Ctrl",
      e.shiftKey && "Shift",
      e.altKey && "Alt",
      e.metaKey && "Meta",
    ]
      .filter(Boolean)
      .join(" + ");

    setKeyInfo({
      key: e.key,
      code: e.code,
      modifiers: modifiers || "无",
    });

    // Enter 提交
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      setSubmitted((s) => [input, ...s].slice(0, 5));
      setInput("");
    }

    // Escape 清空
    if (e.key === "Escape") {
      setInput("");
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 键盘事件</h3>

      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入内容，Enter 提交，Esc 清空"
          className="w-full rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-600 dark:bg-zinc-800"
        />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
          <p className="text-sm font-medium">按键信息:</p>
          <p className="text-sm text-zinc-500">
            Key: <span className="font-mono text-blue-600">{keyInfo.key || "-"}</span>
          </p>
          <p className="text-sm text-zinc-500">
            Code: <span className="font-mono text-green-600">{keyInfo.code || "-"}</span>
          </p>
          <p className="text-sm text-zinc-500">
            修饰键: <span className="font-mono">{keyInfo.modifiers || "-"}</span>
          </p>
        </div>

        <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
          <p className="text-sm font-medium">已提交:</p>
          {submitted.length === 0 ? (
            <p className="text-sm text-zinc-500">暂无</p>
          ) : (
            submitted.map((s, i) => (
              <p key={i} className="text-sm text-zinc-500">
                {s}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    // 提交
  }
  if (e.key === 'Escape') {
    // 取消
  }
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();  // 阻止浏览器保存
    // 自定义保存
  }
};`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 表单事件
// ============================================

export function FormEventExample() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 表单事件</h3>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            用户名 {focused === "username" && <span className="text-blue-500">(聚焦中)</span>}
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => setFocused("username")}
            onBlur={() => setFocused(null)}
            className={`w-full rounded-md border px-3 py-2 ${
              focused === "username"
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-zinc-300 dark:border-zinc-600"
            } dark:bg-zinc-800`}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            邮箱 {focused === "email" && <span className="text-blue-500">(聚焦中)</span>}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            className={`w-full rounded-md border px-3 py-2 ${
              focused === "email"
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-zinc-300 dark:border-zinc-600"
            } dark:bg-zinc-800`}
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          提交
        </button>
      </form>

      {submitted && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          ✅ 表单已提交！数据: {JSON.stringify(formData)}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // 阻止页面刷新
  // 处理提交
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

<form onSubmit={handleSubmit}>
  <input
    name="username"
    onChange={handleChange}
    onFocus={() => setFocused('username')}
    onBlur={() => setFocused(null)}
  />
</form>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function EventHandlingExamples() {
  return (
    <div className="space-y-6">
      <BasicClickExample />
      <EventParamsExample />
      <EventObjectExample />
      <PreventDefaultExample />
      <KeyboardEventExample />
      <FormEventExample />
    </div>
  );
}
