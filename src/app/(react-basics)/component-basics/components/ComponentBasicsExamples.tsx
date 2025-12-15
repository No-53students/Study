"use client";

import { useState } from "react";

// ============================================
// 示例 1: 最简单的组件
// ============================================

function SimpleGreeting() {
  return <h3 className="text-lg font-medium">Hello, React!</h3>;
}

export function BasicComponentExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 最简单的组件</h3>

      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <SimpleGreeting />
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function SimpleGreeting() {
  return <h3>Hello, React!</h3>;
}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 组件就是一个返回 JSX 的函数，命名必须大写开头。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 带 Props 的组件
// ============================================

interface WelcomeProps {
  name: string;
  role?: string;
}

function Welcome({ name, role = "访客" }: WelcomeProps) {
  return (
    <div className="rounded-md bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
      <p className="text-lg font-medium">欢迎, {name}!</p>
      <p className="text-sm opacity-80">身份: {role}</p>
    </div>
  );
}

export function PropsComponentExample() {
  const [name, setName] = useState("张三");
  const [role, setRole] = useState("管理员");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 带 Props 的组件</h3>

      <div className="mb-4 space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入名字"
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          >
            <option value="管理员">管理员</option>
            <option value="编辑">编辑</option>
            <option value="访客">访客</option>
          </select>
        </div>

        <Welcome name={name} role={role} />
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`interface WelcomeProps {
  name: string;
  role?: string;  // 可选，默认 "访客"
}

function Welcome({ name, role = "访客" }: WelcomeProps) {
  return (
    <div>
      <p>欢迎, {name}!</p>
      <p>身份: {role}</p>
    </div>
  );
}

// 使用
<Welcome name="张三" role="管理员" />`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 组件组合
// ============================================

function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-lg font-bold text-white">
        {name.charAt(0)}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
}

function Badge({ type }: { type: "online" | "offline" | "busy" }) {
  const colors = {
    online: "bg-green-500",
    offline: "bg-zinc-400",
    busy: "bg-red-500",
  };
  const labels = {
    online: "在线",
    offline: "离线",
    busy: "忙碌",
  };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs text-white ${colors[type]}`}>
      {labels[type]}
    </span>
  );
}

function UserCard({
  name,
  email,
  status,
}: {
  name: string;
  email: string;
  status: "online" | "offline" | "busy";
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
      <div className="flex items-center gap-4">
        <Avatar src="" name={name} />
        <div>
          <p className="text-sm text-zinc-500">{email}</p>
        </div>
      </div>
      <Badge type={status} />
    </div>
  );
}

export function CompositionExample() {
  const users = [
    { name: "张三", email: "zhangsan@example.com", status: "online" as const },
    { name: "李四", email: "lisi@example.com", status: "busy" as const },
    { name: "王五", email: "wangwu@example.com", status: "offline" as const },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 组件组合</h3>

      <div className="mb-4 space-y-3">
        {users.map((user) => (
          <UserCard key={user.email} {...user} />
        ))}
      </div>

      <div className="rounded-md bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
        <p className="font-medium">组件结构：</p>
        <pre className="mt-2 text-zinc-600 dark:text-zinc-400">
{`UserCard
├── Avatar (头像)
│   └── 名字首字母 + 姓名
├── 邮箱信息
└── Badge (状态标签)`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>组合优势：</strong> 每个小组件可以独立复用、测试和维护。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 条件返回
// ============================================

function LoginStatus({ isLoggedIn, username }: { isLoggedIn: boolean; username?: string }) {
  if (!isLoggedIn) {
    return (
      <div className="rounded-md bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
        <p>请登录以继续</p>
        <button className="mt-2 rounded bg-yellow-600 px-4 py-1 text-sm text-white hover:bg-yellow-700">
          登录
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-green-100 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-200">
      <p>欢迎回来, {username}!</p>
      <button className="mt-2 rounded bg-green-600 px-4 py-1 text-sm text-white hover:bg-green-700">
        退出
      </button>
    </div>
  );
}

export function ConditionalReturnExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 条件返回</h3>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isLoggedIn}
            onChange={(e) => setIsLoggedIn(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">模拟登录状态</span>
        </label>
      </div>

      <LoginStatus isLoggedIn={isLoggedIn} username="张三" />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function LoginStatus({ isLoggedIn, username }) {
  if (!isLoggedIn) {
    return <div>请登录</div>;
  }
  return <div>欢迎, {username}!</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 纯组件 vs 非纯组件
// ============================================

// 纯组件：相同输入，相同输出
function PureGreeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>;
}

// 不纯的演示（带副作用）
let renderCount = 0;

function ImpureCounter() {
  renderCount++; // 副作用：修改外部变量
  return <p>渲染次数: {renderCount}</p>;
}

export function PureComponentExample() {
  const [, forceRender] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 纯组件概念</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="mb-2 font-medium text-green-800 dark:text-green-200">
            纯组件 ✅
          </p>
          <div className="rounded bg-white p-2 dark:bg-zinc-800">
            <PureGreeting name="React" />
          </div>
          <p className="mt-2 text-xs text-green-600 dark:text-green-400">
            相同的 name，永远返回相同的结果
          </p>
        </div>

        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className="mb-2 font-medium text-red-800 dark:text-red-200">
            非纯组件 ❌
          </p>
          <div className="rounded bg-white p-2 dark:bg-zinc-800">
            <ImpureCounter />
          </div>
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            每次渲染结果都不同（修改了外部变量）
          </p>
        </div>
      </div>

      <button
        onClick={() => forceRender((n) => n + 1)}
        className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        强制重新渲染
      </button>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 组件应该是纯函数，不要在渲染过程中修改外部变量或产生副作用。
        副作用应该放在 useEffect 中。
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 函数组件 vs 类组件对比
// ============================================

// 函数组件
function FunctionCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
      <p className="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
        函数组件
      </p>
      <p className="text-2xl font-bold text-blue-600">{count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
      >
        +1
      </button>
    </div>
  );
}

// 类组件演示代码（仅展示）
const classComponentCode = `// 类组件（旧写法）
class ClassCounter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}`;

export function ComponentTypesExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 函数组件 vs 类组件</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FunctionCounter />
          <div className="mt-3 rounded-md bg-zinc-900 p-3 text-xs">
            <pre className="text-green-400">
{`function FunctionCounter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        +1
      </button>
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <div>
          <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
            <p className="mb-2 text-sm font-medium">类组件（了解即可）</p>
            <p className="text-sm text-zinc-500">代码量更多，需要处理 this 绑定</p>
          </div>
          <div className="mt-3 rounded-md bg-zinc-900 p-3 text-xs">
            <pre className="text-yellow-400">{classComponentCode}</pre>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-600">
              <th className="py-2 text-left">特性</th>
              <th className="py-2 text-left">函数组件</th>
              <th className="py-2 text-left">类组件</th>
            </tr>
          </thead>
          <tbody className="text-zinc-600 dark:text-zinc-400">
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="py-2">代码量</td>
              <td className="text-green-600">少</td>
              <td className="text-red-600">多</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="py-2">Hooks 支持</td>
              <td className="text-green-600">✅</td>
              <td className="text-red-600">❌</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="py-2">this 问题</td>
              <td className="text-green-600">无</td>
              <td className="text-red-600">有</td>
            </tr>
            <tr>
              <td className="py-2">推荐程度</td>
              <td className="text-green-600">主流</td>
              <td className="text-yellow-600">维护模式</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ComponentBasicsExamples() {
  return (
    <div className="space-y-6">
      <BasicComponentExample />
      <PropsComponentExample />
      <CompositionExample />
      <ConditionalReturnExample />
      <PureComponentExample />
      <ComponentTypesExample />
    </div>
  );
}
