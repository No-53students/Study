"use client";

import { useId, useState } from "react";

// ============================================
// 示例 1: 基本用法 - Label 关联
// ============================================

function SimpleInput({ label }: { label: string }) {
  const id = useId();

  return (
    <div className="mb-3">
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
      />
      <p className="mt-1 text-xs text-zinc-500">生成的 ID: {id}</p>
    </div>
  );
}

export function BasicExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本用法</h3>

      <div className="space-y-2">
        <SimpleInput label="用户名" />
        <SimpleInput label="邮箱" />
        <SimpleInput label="电话" />
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 每个 SimpleInput 组件实例都获得唯一的 ID，
        用于关联 label 和 input。点击 label 文字可以聚焦对应的输入框。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 多个相关元素使用同一前缀
// ============================================

function LoginForm() {
  const id = useId();

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 前缀模式</h3>

      <p className="mb-4 text-sm text-zinc-500">
        基础 ID: <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{id}</code>
      </p>

      <form className="space-y-4">
        <div>
          <label
            htmlFor={`${id}-email`}
            className="mb-1 block text-sm font-medium"
          >
            邮箱
          </label>
          <input
            id={`${id}-email`}
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          />
          <p className="mt-1 text-xs text-zinc-400">ID: {`${id}-email`}</p>
        </div>

        <div>
          <label
            htmlFor={`${id}-password`}
            className="mb-1 block text-sm font-medium"
          >
            密码
          </label>
          <input
            id={`${id}-password`}
            type="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          />
          <p className="mt-1 text-xs text-zinc-400">ID: {`${id}-password`}</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            id={`${id}-remember`}
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-300"
          />
          <label htmlFor={`${id}-remember`} className="text-sm">
            记住我
          </label>
          <span className="text-xs text-zinc-400">
            (ID: {`${id}-remember`})
          </span>
        </div>
      </form>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>技巧：</strong> 使用一个基础 ID 加不同后缀，可以为同一组件内的多个元素生成相关联的唯一 ID。
      </div>
    </div>
  );
}

export { LoginForm as PrefixExample };

// ============================================
// 示例 3: ARIA 属性关联
// ============================================

function AccessibleTooltip({
  trigger,
  content,
}: {
  trigger: string;
  content: string;
}) {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        aria-describedby={isVisible ? id : undefined}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        {trigger}
      </button>
      {isVisible && (
        <div
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-3 py-2 text-sm text-white shadow-lg"
        >
          {content}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </div>
      )}
    </div>
  );
}

export function AriaExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: ARIA 属性关联</h3>

      <div className="mb-6 flex flex-wrap gap-4">
        <AccessibleTooltip trigger="帮助" content="点击获取更多帮助信息" />
        <AccessibleTooltip trigger="设置" content="打开应用设置面板" />
        <AccessibleTooltip trigger="通知" content="查看系统通知" />
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">无障碍性说明：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>
            <code>aria-describedby</code> 将按钮与 tooltip 关联
          </li>
          <li>屏幕阅读器会读出 tooltip 内容</li>
          <li>每个 tooltip 都有唯一的 ID</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 复杂表单组件
// ============================================

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "number";
  error?: string;
  description?: string;
  required?: boolean;
}

function FormField({
  label,
  type = "text",
  error,
  description,
  required,
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const descId = `${id}-description`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : description ? descId : undefined}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-300 focus:border-blue-500 dark:border-zinc-600"
        } dark:bg-zinc-800`}
      />

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!error && description && (
        <p id={descId} className="mt-1 text-sm text-zinc-500">
          {description}
        </p>
      )}

      <div className="mt-1 text-xs text-zinc-400">
        IDs: input={id}, error={errorId}, desc={descId}
      </div>
    </div>
  );
}

export function ComplexFormExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 复杂表单组件</h3>

      <form>
        <FormField
          label="用户名"
          required
          description="3-20个字符，只能包含字母和数字"
        />

        <FormField
          label="邮箱"
          type="email"
          required
          error="请输入有效的邮箱地址"
        />

        <FormField
          label="年龄"
          type="number"
          description="请输入您的真实年龄"
        />
      </form>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>无障碍特性：</strong>
        <ul className="mt-2 list-inside list-disc">
          <li>aria-invalid 标记错误状态</li>
          <li>aria-describedby 关联错误/描述信息</li>
          <li>role=&ldquo;alert&rdquo; 使屏幕阅读器立即播报错误</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: Accordion 组件
// ============================================

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-700">
      <h4>
        <button
          id={`${id}-header`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-3 text-left font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          {title}
          <span
            className="transition-transform"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </button>
      </h4>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        hidden={!isOpen}
        className="pb-4 text-sm text-zinc-600 dark:text-zinc-400"
      >
        {children}
      </div>
    </div>
  );
}

export function AccordionExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: Accordion 组件</h3>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-700">
        <AccordionItem title="什么是 useId？" defaultOpen>
          useId 是 React 18 引入的 Hook，用于生成唯一且稳定的 ID，
          特别适用于需要 SSR 支持的场景。
        </AccordionItem>
        <AccordionItem title="为什么不用 Math.random()？">
          Math.random() 在服务端和客户端会生成不同的值，
          导致 hydration 不匹配错误。useId 保证两端一致。
        </AccordionItem>
        <AccordionItem title="可以用于列表的 key 吗？">
          不推荐。useId 主要用于 DOM 元素的 ID 属性。
          列表的 key 应该使用数据中的唯一标识符。
        </AccordionItem>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">ARIA 属性：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>aria-expanded: 展开/折叠状态</li>
          <li>aria-controls: 控制的面板 ID</li>
          <li>aria-labelledby: 面板的标题</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseIdExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useId Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useId 用于生成唯一且稳定的 ID，主要用于 DOM 元素和 ARIA 属性。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const id = useId();

// 单个元素
<input id={id} />

// 多个相关元素（前缀模式）
<input id={\`\${id}-email\`} />
<input id={\`\${id}-password\`} />`}
          </pre>
        </div>
      </div>

      <BasicExample />
      <LoginForm />
      <AriaExample />
      <ComplexFormExample />
      <AccordionExample />

      {/* 注意事项 */}
      <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
        <h4 className="font-semibold text-red-800 dark:text-red-200">
          ⚠️ 注意事项
        </h4>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-red-700 dark:text-red-300">
          <li>
            <strong>不要用于列表的 key</strong> - Hook 不能在循环中使用
          </li>
          <li>
            <strong>不要用于 CSS 选择器</strong> - ID 包含冒号，需要转义
          </li>
          <li>
            <strong>不要用于数据 ID</strong> - 这是用于 DOM 元素的
          </li>
          <li>
            <strong>不要依赖具体值</strong> - ID 格式可能会变化
          </li>
        </ul>
      </div>
    </div>
  );
}
