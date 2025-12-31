"use client";

import { useState, ComponentProps } from "react";

// ============================================
// 示例 1: 基本 Props 传递
// ============================================

interface GreetingProps {
  name: string;
  message?: string;
}

function Greeting({ name, message = "欢迎" }: GreetingProps) {
  return (
    <div className="rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
      <p className="text-lg font-medium">{message}, {name}!</p>
    </div>
  );
}

export function BasicPropsExample() {
  const [name, setName] = useState("张三");
  const [message, setMessage] = useState("你好");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本 Props 传递</h3>

      <div className="mb-4 flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名字"
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="消息"
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
      </div>

      <Greeting name={name} message={message} />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`interface GreetingProps {
  name: string;
  message?: string;  // 可选，有默认值
}

function Greeting({ name, message = "欢迎" }: GreetingProps) {
  return <p>{message}, {name}!</p>;
}

<Greeting name="${name}" message="${message}" />`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 各种类型的 Props
// ============================================

interface AllTypesProps {
  // 基础类型
  stringProp: string;
  numberProp: number;
  booleanProp: boolean;
  // 数组
  arrayProp: string[];
  // 对象
  objectProp: { name: string; value: number };
  // 函数
  onAction: (value: string) => void;
}

function AllTypesDisplay({
  stringProp,
  numberProp,
  booleanProp,
  arrayProp,
  objectProp,
  onAction,
}: AllTypesProps) {
  return (
    <div className="space-y-2 rounded-md bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
      <p>
        <span className="font-medium">string:</span>{" "}
        <span className="text-blue-600 dark:text-blue-400">{stringProp}</span>
      </p>
      <p>
        <span className="font-medium">number:</span>{" "}
        <span className="text-green-600 dark:text-green-400">{numberProp}</span>
      </p>
      <p>
        <span className="font-medium">boolean:</span>{" "}
        <span className="text-purple-600 dark:text-purple-400">
          {booleanProp ? "true" : "false"}
        </span>
      </p>
      <p>
        <span className="font-medium">array:</span>{" "}
        <span className="text-orange-600 dark:text-orange-400">
          [{arrayProp.join(", ")}]
        </span>
      </p>
      <p>
        <span className="font-medium">object:</span>{" "}
        <span className="text-pink-600 dark:text-pink-400">
          {JSON.stringify(objectProp)}
        </span>
      </p>
      <button
        onClick={() => onAction("clicked!")}
        className="mt-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        调用 onAction
      </button>
    </div>
  );
}

export function AllTypesExample() {
  const [log, setLog] = useState<string>("");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 各种类型的 Props</h3>

      <AllTypesDisplay
        stringProp="Hello"
        numberProp={42}
        booleanProp={true}
        arrayProp={["React", "Vue", "Angular"]}
        objectProp={{ name: "config", value: 100 }}
        onAction={(value) => setLog(`回调被调用: ${value}`)}
      />

      {log && (
        <div className="mt-3 rounded-md bg-green-100 p-2 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200 animate-in fade-in duration-300">
          {log}
        </div>
      )}

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>类型：</strong> Props 可以是字符串、数字、布尔值、数组、对象、函数等任意类型。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: Props 默认值
// ============================================

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

function Button({
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-zinc-200 hover:bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled}
      className={`rounded-md font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {label}
    </button>
  );
}

export function DefaultPropsExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: Props 默认值</h3>

      <div className="mb-4 space-y-4">
        <div>
          <p className="mb-2 text-sm text-zinc-500">只传必需属性（使用默认值）：</p>
          <Button label="默认按钮" />
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-500">不同 variant：</p>
          <div className="flex gap-2">
            <Button label="Primary" variant="primary" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Danger" variant="danger" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-500">不同 size：</p>
          <div className="flex items-center gap-2">
            <Button label="Small" size="small" />
            <Button label="Medium" size="medium" />
            <Button label="Large" size="large" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-500">禁用状态：</p>
          <Button label="Disabled" disabled />
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`interface ButtonProps {
  label: string;                              // 必需
  variant?: "primary" | "secondary" | "danger"; // 可选
  size?: "small" | "medium" | "large";        // 可选
  disabled?: boolean;                         // 可选
}

function Button({
  label,
  variant = "primary",   // 默认值
  size = "medium",       // 默认值
  disabled = false,      // 默认值
}: ButtonProps) { ... }`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 展开运算符传递 Props
// ============================================

interface CardProps {
  title: string;
  content: string;
  footer?: string;
}

function Card({ title, content, footer }: CardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800 transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{content}</p>
      {footer && (
        <p className="mt-3 border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-700">
          {footer}
        </p>
      )}
    </div>
  );
}

export function SpreadPropsExample() {
  const cardData: CardProps = {
    title: "卡片标题",
    content: "这是卡片的内容，使用展开运算符传递所有属性。",
    footer: "卡片底部信息",
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 展开运算符传递</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-zinc-500">逐个传递：</p>
          <Card
            title={cardData.title}
            content={cardData.content}
            footer={cardData.footer}
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-zinc-500">展开传递：</p>
          <Card {...cardData} />
        </div>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const cardData = {
  title: "卡片标题",
  content: "内容...",
  footer: "底部"
};

// 两种方式效果相同
<Card title={cardData.title} content={cardData.content} />
<Card {...cardData} />  // 展开运算符`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 展开运算符要谨慎使用，避免传递不需要的属性。
      </div>
    </div>
  );
}

// ============================================
// 示例 5: Props 透传（Rest Props）
// ============================================

interface CustomInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}

function CustomInput({ label, error, ...inputProps }: CustomInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <input
        {...inputProps}
        className={`w-full rounded-md border px-3 py-2 text-sm ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-300 focus:border-blue-500 dark:border-zinc-600"
        } focus:outline-none dark:bg-zinc-800`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function RestPropsExample() {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: Props 透传</h3>

      <div className="mb-4 space-y-4">
        <CustomInput
          label="用户名"
          placeholder="请输入用户名"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={hasError ? "用户名不能为空" : undefined}
        />

        <CustomInput
          label="邮箱"
          type="email"
          placeholder="请输入邮箱"
          disabled
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasError}
            onChange={(e) => setHasError(e.target.checked)}
          />
          <span className="text-sm">显示错误状态</span>
        </label>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// 继承原生 input 的所有属性
interface CustomInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}

function CustomInput({ label, error, ...inputProps }: CustomInputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />  {/* 透传所有 input 属性 */}
      {error && <p>{error}</p>}
    </div>
  );
}

// 可以使用所有原生 input 属性
<CustomInput
  label="邮箱"
  type="email"
  placeholder="..."
  disabled
  required
/>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 回调函数 Props
// ============================================

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
  onReset?: () => void;
}

function Counter({ value, onChange, onReset }: CounterProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
      <button
        onClick={() => onChange(value - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        -
      </button>
      <span className="min-w-[3rem] text-center text-2xl font-bold">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        +
      </button>
      {onReset && (
        <button
          onClick={onReset}
          className="ml-2 rounded bg-zinc-500 px-3 py-1 text-sm text-white hover:bg-zinc-600 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          重置
        </button>
      )}
    </div>
  );
}

export function CallbackPropsExample() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const handleChange = (newValue: number) => {
    setCount(newValue);
    setHistory((h) => [...h, `值变为 ${newValue}`]);
  };

  const handleReset = () => {
    setCount(0);
    setHistory((h) => [...h, "重置为 0"]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 回调函数 Props</h3>

      <div className="mb-4">
        <Counter value={count} onChange={handleChange} onReset={handleReset} />
      </div>

      {history.length > 0 && (
        <div className="mb-4 max-h-32 overflow-y-auto rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
          <p className="mb-2 text-sm font-medium">操作历史：</p>
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {history.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
  onReset?: () => void;  // 可选回调
}

// 父组件
const [count, setCount] = useState(0);

<Counter
  value={count}
  onChange={(newValue) => setCount(newValue)}
  onReset={() => setCount(0)}
/>`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>模式：</strong> 通过回调函数，子组件可以通知父组件状态变化，实现"状态提升"。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function PropsExamples() {
  return (
    <div className="space-y-6">
      <BasicPropsExample />
      <AllTypesExample />
      <DefaultPropsExample />
      <SpreadPropsExample />
      <RestPropsExample />
      <CallbackPropsExample />
    </div>
  );
}
