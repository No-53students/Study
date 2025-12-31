"use client";
"use no memo";

import { useState, memo, useCallback, useMemo } from "react";

// ============================================
// 示例 1: memo 基本用法
// ============================================

let renderCountWithoutMemo = 0;
let renderCountWithMemo = 0;

function ChildWithoutMemo({ name }: { name: string }) {
  renderCountWithoutMemo++;
  return (
    <div className="rounded-md bg-red-100 p-3 dark:bg-red-900/30">
      <p className="text-sm font-medium text-red-800 dark:text-red-200">
        无 memo
      </p>
      <p className="text-xs text-red-600 dark:text-red-400">
        渲染次数: {renderCountWithoutMemo}
      </p>
      <p className="text-sm">name: {name}</p>
    </div>
  );
}

const ChildWithMemo = memo(function ChildWithMemo({ name }: { name: string }) {
  renderCountWithMemo++;
  return (
    <div className="rounded-md bg-green-100 p-3 dark:bg-green-900/30">
      <p className="text-sm font-medium text-green-800 dark:text-green-200">
        有 memo
      </p>
      <p className="text-xs text-green-600 dark:text-green-400">
        渲染次数: {renderCountWithMemo}
      </p>
      <p className="text-sm">name: {name}</p>
    </div>
  );
});

export function BasicMemoExample() {
  const [count, setCount] = useState(0);
  const [name] = useState("张三");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: memo 基本用法</h3>

      <div className="mb-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          增加计数: {count}
        </button>
        <p className="mt-2 text-sm text-zinc-500">
          点击按钮，观察两个子组件的渲染次数
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ChildWithoutMemo name={name} />
        <ChildWithMemo name={name} />
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 无 memo：每次父组件更新都重渲染
function Child({ name }) { ... }

// 有 memo：props 不变时跳过渲染
const MemoChild = memo(function Child({ name }) { ... });`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 对象 props 的陷阱
// ============================================

let objectChildRenderCount = 0;

const ObjectChild = memo(function ObjectChild({ style }: { style: { color: string } }) {
  objectChildRenderCount++;
  return (
    <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800" style={style}>
      <p className="text-sm">渲染次数: {objectChildRenderCount}</p>
    </div>
  );
});

export function ObjectPropsExample() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("blue");

  // ❌ 每次渲染都创建新对象
  const inlineStyle = { color };

  // ✅ 使用 useMemo 缓存对象
  const memoizedStyle = useMemo(() => ({ color }), [color]);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 对象 props 陷阱</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          计数: {count}
        </button>
        <button
          onClick={() => setColor(color === "blue" ? "red" : "blue")}
          className="rounded-md bg-zinc-600 px-4 py-2 text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          切换颜色
        </button>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-red-600">
            ❌ 内联对象（每次都重渲染）
          </p>
          <ObjectChild style={inlineStyle} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-green-600">
            ✅ useMemo 缓存（只在颜色变时渲染）
          </p>
          <ObjectChild style={memoizedStyle} />
        </div>
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 内联对象 {`{ color }`} 每次渲染都是新引用，
        导致 memo 失效。使用 useMemo 可以保持引用稳定。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 函数 props 的陷阱
// ============================================

let functionChildRenderCount1 = 0;
let functionChildRenderCount2 = 0;

const FunctionChild1 = memo(function FunctionChild1({
  onClick,
}: {
  onClick: () => void;
}) {
  functionChildRenderCount1++;
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-red-100 px-4 py-2 text-red-800 dark:bg-red-900/30 dark:text-red-200"
    >
      渲染: {functionChildRenderCount1}
    </button>
  );
});

const FunctionChild2 = memo(function FunctionChild2({
  onClick,
}: {
  onClick: () => void;
}) {
  functionChildRenderCount2++;
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-green-100 px-4 py-2 text-green-800 dark:bg-green-900/30 dark:text-green-200"
    >
      渲染: {functionChildRenderCount2}
    </button>
  );
});

export function FunctionPropsExample() {
  const [count, setCount] = useState(0);

  // ❌ 内联函数，每次渲染都是新引用
  const inlineHandler = () => console.log("clicked");

  // ✅ 使用 useCallback 缓存函数
  const memoizedHandler = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 函数 props 陷阱</h3>

      <div className="mb-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          计数: {count}
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-red-600">❌ 内联函数</p>
          <FunctionChild1 onClick={inlineHandler} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-green-600">
            ✅ useCallback
          </p>
          <FunctionChild2 onClick={memoizedHandler} />
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// ❌ 内联函数每次都是新引用
<Child onClick={() => doSomething()} />

// ✅ useCallback 保持引用稳定
const handler = useCallback(() => {
  doSomething();
}, []);
<Child onClick={handler} />`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 自定义比较函数
// ============================================

interface User {
  id: number;
  name: string;
  lastUpdated: Date;
}

let customCompareCount = 0;

const UserCard = memo(
  function UserCard({ user }: { user: User }) {
    customCompareCount++;
    return (
      <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-zinc-500">ID: {user.id}</p>
        <p className="text-xs text-zinc-400">
          更新: {user.lastUpdated.toLocaleTimeString()}
        </p>
        <p className="mt-2 text-xs text-blue-500">渲染次数: {customCompareCount}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 只比较 id 和 name，忽略 lastUpdated
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name
    );
  }
);

export function CustomCompareExample() {
  const [user, setUser] = useState<User>({
    id: 1,
    name: "张三",
    lastUpdated: new Date(),
  });

  const updateTimestamp = () => {
    setUser((u) => ({ ...u, lastUpdated: new Date() }));
  };

  const updateName = () => {
    setUser((u) => ({
      ...u,
      name: u.name === "张三" ? "李四" : "张三",
      lastUpdated: new Date(),
    }));
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 自定义比较函数</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={updateTimestamp}
          className="rounded-md bg-zinc-600 px-4 py-2 text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          只更新时间戳
        </button>
        <button
          onClick={updateName}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          更新名字
        </button>
      </div>

      <UserCard user={user} />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const UserCard = memo(
  function UserCard({ user }) { ... },
  (prevProps, nextProps) => {
    // 只比较 id 和 name，忽略 lastUpdated
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name
    );
  }
);`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 自定义比较函数让你决定何时重渲染。
        "只更新时间戳"不会触发重渲染，"更新名字"才会。
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 列表项优化
// ============================================

interface ListItem {
  id: number;
  name: string;
  completed: boolean;
}

let listItemRenderCount = 0;

const ListItemComponent = memo(function ListItemComponent({
  item,
  onToggle,
}: {
  item: ListItem;
  onToggle: (id: number) => void;
}) {
  listItemRenderCount++;
  return (
    <li className="flex items-center justify-between rounded-md bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
      <span className={item.completed ? "line-through text-zinc-400" : ""}>
        {item.name}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">#{listItemRenderCount}</span>
        <button
          onClick={() => onToggle(item.id)}
          className={`rounded px-2 py-1 text-xs text-white transition-all duration-200 hover:scale-105 active:scale-95 ${
            item.completed ? "bg-zinc-500 hover:bg-zinc-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {item.completed ? "撤销" : "完成"}
        </button>
      </div>
    </li>
  );
});

export function ListOptimizationExample() {
  const [items, setItems] = useState<ListItem[]>([
    { id: 1, name: "学习 React", completed: false },
    { id: 2, name: "学习 TypeScript", completed: false },
    { id: 3, name: "构建项目", completed: false },
  ]);

  // 使用 useCallback 避免每次渲染创建新函数
  const handleToggle = useCallback((id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 列表项优化</h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <ListItemComponent key={item.id} item={item} onToggle={handleToggle} />
        ))}
      </ul>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>优化效果：</strong> 切换一个项目时，只有该项目重新渲染，
        其他项目保持不变（观察 # 编号）。这得益于 memo + useCallback。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ReactMemoExamples() {
  return (
    <div className="space-y-6">
      <BasicMemoExample />
      <ObjectPropsExample />
      <FunctionPropsExample />
      <CustomCompareExample />
      <ListOptimizationExample />
    </div>
  );
}
