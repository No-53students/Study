"use client";

import { Children, cloneElement, isValidElement, useState } from "react";

// ============================================
// 示例 1: 基本 children 用法
// ============================================

function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      {title && (
        <h4 className="mb-3 border-b border-zinc-200 pb-2 font-semibold dark:border-zinc-700">
          {title}
        </h4>
      )}
      <div>{children}</div>
    </div>
  );
}

export function BasicChildrenExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本 children</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <Card title="文本 children">
          <p>这是一段普通文本内容</p>
        </Card>

        <Card title="混合 children">
          <h5 className="font-medium">标题</h5>
          <p className="text-sm text-zinc-500">描述文字</p>
          <button className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95">
            按钮
          </button>
        </Card>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function Card({ children, title }) {
  return (
    <div className="card">
      {title && <h4>{title}</h4>}
      <div>{children}</div>  {/* 渲染 children */}
    </div>
  );
}

// 使用
<Card title="标题">
  <p>这是 children 内容</p>
</Card>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 布局组件
// ============================================

function PageLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700">
      <header className="border-b border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
        <span className="font-medium">Header</span>
      </header>
      <div className="flex">
        {sidebar && (
          <aside className="w-40 border-r border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 p-4">{children}</main>
      </div>
      <footer className="border-t border-zinc-200 bg-zinc-100 p-3 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800">
        Footer
      </footer>
    </div>
  );
}

export function LayoutExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 布局组件</h3>

      <PageLayout
        sidebar={
          <nav className="space-y-2 text-sm">
            <p className="font-medium">导航</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>首页</li>
              <li>关于</li>
              <li>联系</li>
            </ul>
          </nav>
        }
      >
        <h4 className="mb-2 font-medium">主内容区域</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          这里是 children，会渲染在 main 区域中。
          sidebar 是另一个 prop，用于渲染侧边栏。
        </p>
      </PageLayout>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>插槽模式：</strong> 使用多个 props（如 children + sidebar）可以实现多个内容插槽。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 具名插槽
// ============================================

interface DialogProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
}

function Dialog({ title, children, footer, onClose }: DialogProps) {
  return (
    <div className="rounded-lg border border-zinc-300 bg-white shadow-lg dark:border-zinc-600 dark:bg-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-700">
        <div className="font-semibold">{title}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>
        )}
      </div>
      <div className="p-4">{children}</div>
      {footer && (
        <div className="flex justify-end gap-2 border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          {footer}
        </div>
      )}
    </div>
  );
}

export function NamedSlotsExample() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-4 text-lg font-semibold">示例 3: 具名插槽</h3>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          打开对话框
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 具名插槽</h3>

      <Dialog
        title={
          <span className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            确认删除
          </span>
        }
        footer={
          <>
            <button
              onClick={() => setOpen(false)}
              className="rounded bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              取消
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              删除
            </button>
          </>
        }
        onClose={() => setOpen(false)}
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          确定要删除这条记录吗？此操作不可恢复。
        </p>
      </Dialog>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`<Dialog
  title={<span>⚠️ 确认删除</span>}
  footer={
    <>
      <Button>取消</Button>
      <Button variant="danger">删除</Button>
    </>
  }
>
  <p>确定要删除吗？</p>
</Dialog>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: Children API
// ============================================

function ChildrenInfo({ children }: { children: React.ReactNode }) {
  const count = Children.count(children);
  const childArray = Children.toArray(children);

  return (
    <div className="space-y-3">
      <div className="rounded-md bg-blue-100 p-3 text-sm dark:bg-blue-900/30">
        <p className="font-medium text-blue-800 dark:text-blue-200">
          Children.count: {count}
        </p>
      </div>
      <div className="space-y-2">
        {Children.map(children, (child, index) => (
          <div
            key={index}
            className="rounded-md border border-zinc-200 p-2 dark:border-zinc-700"
          >
            <span className="mr-2 text-xs text-zinc-500">#{index + 1}</span>
            {child}
          </div>
        ))}
      </div>
      <div className="rounded-md bg-zinc-100 p-3 text-xs dark:bg-zinc-800">
        <p className="font-medium">toArray 结果：</p>
        <p className="text-zinc-500">[{childArray.length} 个元素]</p>
      </div>
    </div>
  );
}

export function ChildrenAPIExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: Children API</h3>

      <ChildrenInfo>
        <span className="text-blue-600">第一个子元素</span>
        <span className="text-green-600">第二个子元素</span>
        <span className="text-purple-600">第三个子元素</span>
      </ChildrenInfo>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`import { Children } from 'react';

function Component({ children }) {
  // 计数
  const count = Children.count(children);

  // 转为数组
  const array = Children.toArray(children);

  // 遍历
  return Children.map(children, (child, index) => (
    <div key={index}>{child}</div>
  ));
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: cloneElement 修改 children
// ============================================

function Toolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
      {Children.map(children, (child) => {
        if (isValidElement<{ className?: string }>(child)) {
          return cloneElement(child, {
            className: `${child.props.className || ""} rounded-md px-3 py-1.5 text-sm font-medium transition-colors`,
          });
        }
        return child;
      })}
    </div>
  );
}

export function CloneElementExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: cloneElement</h3>

      <div className="mb-4">
        <p className="mb-2 text-sm text-zinc-500">
          Toolbar 组件自动为所有子元素添加统一样式：
        </p>
        <Toolbar>
          <button className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95">
            保存
          </button>
          <button className="bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95">
            发布
          </button>
          <button className="bg-zinc-600 text-white hover:bg-zinc-700 hover:scale-105 active:scale-95">
            取消
          </button>
        </Toolbar>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`import { Children, cloneElement, isValidElement } from 'react';

function Toolbar({ children }) {
  return (
    <div className="toolbar">
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // 克隆并添加额外的 className
          return cloneElement(child, {
            className: \`\${child.props.className} toolbar-item\`,
          });
        }
        return child;
      })}
    </div>
  );
}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> cloneElement 会使 props 来源变得不透明，
        建议优先考虑使用 Context 或组合模式。
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 函数作为 Children (Render Props)
// ============================================

interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => React.ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-48 rounded-md bg-gradient-to-br from-purple-500 to-pink-500"
    >
      {children(position)}
    </div>
  );
}

export function RenderPropsExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 函数作为 Children</h3>

      <div className="mb-4">
        <p className="mb-2 text-sm text-zinc-500">移动鼠标查看坐标：</p>
        <MouseTracker>
          {({ x, y }) => (
            <div className="flex h-full items-center justify-center text-white">
              <div className="text-center">
                <p className="text-4xl font-bold">
                  ({x}, {y})
                </p>
                <p className="mt-2 text-sm opacity-80">鼠标位置</p>
              </div>
            </div>
          )}
        </MouseTracker>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => React.ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={handleMouseMove}>
      {children(position)}  {/* 调用函数，传入数据 */}
    </div>
  );
}

// 使用
<MouseTracker>
  {({ x, y }) => <p>位置: ({x}, {y})</p>}
</MouseTracker>`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>Render Props 模式：</strong> 将函数作为 children，
        让父组件可以将数据传递给子组件的渲染逻辑。
      </div>
    </div>
  );
}

// ============================================
// 示例 7: children 的各种类型
// ============================================

function TypeDisplay({ children }: { children: React.ReactNode }) {
  const count = Children.count(children);
  const childArray = Children.toArray(children);

  return (
    <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-700">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-500">子元素数量:</span>
        <span className="font-medium">{count}</span>
      </div>
      <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
        {childArray.length > 0 ? children : <span className="text-zinc-400">（空）</span>}
      </div>
    </div>
  );
}

export function ChildrenTypesExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 7: children 的各种类型</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">字符串</p>
          <TypeDisplay>Hello World</TypeDisplay>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">数字</p>
          <TypeDisplay>{42}</TypeDisplay>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">JSX 元素</p>
          <TypeDisplay>
            <span className="text-blue-600">React Element</span>
          </TypeDisplay>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">数组</p>
          <TypeDisplay>
            {["A", "B", "C"].map((item) => (
              <span key={item} className="mx-1 rounded bg-purple-100 px-2 py-0.5 dark:bg-purple-900/30">
                {item}
              </span>
            ))}
          </TypeDisplay>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">null（不渲染）</p>
          <TypeDisplay>{null}</TypeDisplay>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">混合内容</p>
          <TypeDisplay>
            文本
            <strong className="mx-1">加粗</strong>
            {123}
          </TypeDisplay>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ChildrenExamples() {
  return (
    <div className="space-y-6">
      <BasicChildrenExample />
      <LayoutExample />
      <NamedSlotsExample />
      <ChildrenAPIExample />
      <CloneElementExample />
      <RenderPropsExample />
      <ChildrenTypesExample />
    </div>
  );
}
