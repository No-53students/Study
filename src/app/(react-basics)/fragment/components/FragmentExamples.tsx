"use client";

import { Fragment, useState } from "react";

// ============================================
// 示例 1: 基本的 Fragment 用法
// ============================================

function WithoutFragment() {
  return (
    <div className="rounded border border-red-300 bg-red-50 p-2 dark:border-red-800 dark:bg-red-900/20">
      <span className="text-red-600 dark:text-red-400">使用 div 包装</span>
      <span className="ml-2">额外的 DOM 节点</span>
    </div>
  );
}

function WithFragment() {
  return (
    <>
      <span className="text-green-600 dark:text-green-400">使用 Fragment</span>
      <span className="ml-2">无额外 DOM 节点</span>
    </>
  );
}

export function BasicFragmentExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本用法</h3>

      <div className="mb-4 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-red-600">
            ❌ 使用 div 包装（产生额外节点）
          </p>
          <div className="rounded bg-zinc-100 p-3 dark:bg-zinc-800">
            <WithoutFragment />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-green-600">
            ✅ 使用 Fragment（无额外节点）
          </p>
          <div className="rounded bg-zinc-100 p-3 dark:bg-zinc-800">
            <WithFragment />
          </div>
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// ❌ 使用 div - 产生额外 DOM
function WithDiv() {
  return (
    <div>
      <span>元素1</span>
      <span>元素2</span>
    </div>
  );
}

// ✅ 使用 Fragment - 无额外 DOM
function WithFragment() {
  return (
    <>
      <span>元素1</span>
      <span>元素2</span>
    </>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 定义列表 (dl/dt/dd)
// ============================================

interface GlossaryItem {
  id: number;
  term: string;
  definition: string;
}

const glossaryData: GlossaryItem[] = [
  { id: 1, term: "React", definition: "用于构建用户界面的 JavaScript 库" },
  { id: 2, term: "JSX", definition: "JavaScript 的语法扩展，类似 HTML" },
  { id: 3, term: "Component", definition: "可复用的 UI 构建块" },
  { id: 4, term: "Props", definition: "父组件传递给子组件的数据" },
];

function GlossaryItemComponent({ term, definition }: { term: string; definition: string }) {
  return (
    <>
      <dt className="font-semibold text-blue-600 dark:text-blue-400">{term}</dt>
      <dd className="mb-3 ml-4 text-zinc-600 dark:text-zinc-300">{definition}</dd>
    </>
  );
}

export function DefinitionListExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 定义列表</h3>

      <dl className="mb-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
        {glossaryData.map((item) => (
          <Fragment key={item.id}>
            <GlossaryItemComponent term={item.term} definition={item.definition} />
          </Fragment>
        ))}
      </dl>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 定义列表需要 dt 和 dd 是 dl 的直接子元素
function GlossaryItem({ term, definition }) {
  return (
    <Fragment key={id}>
      <dt>{term}</dt>
      <dd>{definition}</dd>
    </Fragment>
  );
}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 在列表渲染中使用 Fragment 时，
        必须使用显式的 <code>&lt;Fragment key=&#123;id&#125;&gt;</code> 语法来传递 key。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 表格中的 Fragment
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "张三", email: "zhang@example.com", role: "管理员" },
  { id: 2, name: "李四", email: "li@example.com", role: "用户" },
  { id: 3, name: "王五", email: "wang@example.com", role: "编辑" },
];

function TableColumns({ user }: { user: User }) {
  return (
    <>
      <td className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        {user.name}
      </td>
      <td className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        {user.email}
      </td>
      <td className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            user.role === "管理员"
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              : user.role === "编辑"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          }`}
        >
          {user.role}
        </span>
      </td>
    </>
  );
}

export function TableFragmentExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 表格中的 Fragment</h3>

      <div className="mb-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="px-4 py-2">姓名</th>
              <th className="px-4 py-2">邮箱</th>
              <th className="px-4 py-2">角色</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <TableColumns user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 表格列组件返回多个 td
function TableColumns({ user }) {
  return (
    <>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: Flex 布局中的 Fragment
// ============================================

function FlexItems() {
  return (
    <>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-500 text-white">
        1
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-500 text-white">
        2
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-500 text-white">
        3
      </div>
    </>
  );
}

function FlexItemsWithDiv() {
  return (
    <div>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-red-500 text-white">
        1
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-500 text-white">
        2
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-yellow-500 text-white">
        3
      </div>
    </div>
  );
}

export function FlexLayoutExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: Flex 布局</h3>

      <div className="mb-4 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-green-600">
            ✅ 使用 Fragment（正确的 flex 布局）
          </p>
          <div className="flex gap-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <FlexItems />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-red-600">
            ❌ 使用 div 包装（布局被破坏）
          </p>
          <div className="flex gap-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <FlexItemsWithDiv />
          </div>
        </div>
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 在 Flex 容器中，额外的 div
        会成为唯一的 flex item，破坏预期的布局。
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 条件渲染中的 Fragment
// ============================================

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

const userProfile: UserProfile = {
  name: "张三",
  email: "zhang@example.com",
  phone: "138-0000-0000",
  address: "北京市朝阳区",
  bio: "热爱编程的前端开发者",
};

export function ConditionalFragmentExample() {
  const [showDetails, setShowDetails] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 条件渲染</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`rounded-md px-4 py-2 ${
            showDetails
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
          }`}
        >
          {showDetails ? "隐藏详情" : "显示详情"}
        </button>
        <button
          onClick={() => setShowContact(!showContact)}
          className={`rounded-md px-4 py-2 ${
            showContact
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
          }`}
        >
          {showContact ? "隐藏联系方式" : "显示联系方式"}
        </button>
      </div>

      <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
        <h4 className="text-xl font-semibold">{userProfile.name}</h4>

        {showDetails && (
          <>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              {userProfile.bio}
            </p>
            <p className="text-sm text-zinc-500">{userProfile.address}</p>
          </>
        )}

        {showContact && (
          <>
            <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
              <p className="text-sm">
                📧 <span className="text-blue-600 dark:text-blue-400">{userProfile.email}</span>
              </p>
              <p className="text-sm">
                📱 <span className="text-blue-600 dark:text-blue-400">{userProfile.phone}</span>
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`{showDetails && (
  <>
    <p>{bio}</p>
    <p>{address}</p>
  </>
)}

{showContact && (
  <>
    <p>📧 {email}</p>
    <p>📱 {phone}</p>
  </>
)}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 两种语法对比
// ============================================

export function SyntaxComparisonExample() {
  const items = [
    { id: 1, title: "项目 1", desc: "描述 1" },
    { id: 2, title: "项目 2", desc: "描述 2" },
    { id: 3, title: "项目 3", desc: "描述 3" },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 两种语法对比</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">简写语法 &lt;&gt;...&lt;/&gt;</p>
          <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <>
              <p className="font-semibold">标题</p>
              <p className="text-sm text-zinc-500">副标题</p>
            </>
          </div>
          <p className="mt-2 text-xs text-zinc-500">适用于：不需要 key 的场景</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">
            显式语法 &lt;Fragment key=...&gt;
          </p>
          <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <dl>
              {items.map((item) => (
                <Fragment key={item.id}>
                  <dt className="font-semibold">{item.title}</dt>
                  <dd className="mb-2 text-sm text-zinc-500">{item.desc}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
          <p className="mt-2 text-xs text-zinc-500">适用于：列表渲染需要 key</p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 简写语法 - 不能传递 key
<>
  <Child1 />
  <Child2 />
</>

// 显式语法 - 可以传递 key
<Fragment key={id}>
  <Child1 />
  <Child2 />
</Fragment>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function FragmentExamples() {
  return (
    <div className="space-y-6">
      <BasicFragmentExample />
      <DefinitionListExample />
      <TableFragmentExample />
      <FlexLayoutExample />
      <ConditionalFragmentExample />
      <SyntaxComparisonExample />
    </div>
  );
}
