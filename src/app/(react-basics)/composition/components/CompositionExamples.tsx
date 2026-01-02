"use client";

import { useState, createContext, useContext, ReactNode } from "react";

// ============================================
// 示例 1: 容器/内容模式
// ============================================

function Card({
  children,
  title,
  footer,
}: {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
      {title && (
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <h4 className="font-medium">{title}</h4>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
          {footer}
        </div>
      )}
    </div>
  );
}

export function ContainerContentExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 容器/内容模式</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <Card title="用户信息">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl text-white">
              张
            </div>
            <div>
              <p className="font-medium">张三</p>
              <p className="text-sm text-zinc-500">前端工程师</p>
            </div>
          </div>
        </Card>

        <Card
          title="操作面板"
          footer={
            <div className="flex justify-end gap-2">
              <button className="rounded bg-zinc-200 px-3 py-1 text-sm dark:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-zinc-300 dark:hover:bg-zinc-600">
                取消
              </button>
              <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-blue-700">
                确认
              </button>
            </div>
          }
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            这是一个带有底部操作栏的卡片组件。
          </p>
        </Card>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`function Card({ children, title, footer }) {
  return (
    <div className="card">
      {title && <header>{title}</header>}
      <div className="content">{children}</div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

<Card title="标题" footer={<Button>确认</Button>}>
  <p>内容...</p>
</Card>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 特化组件
// ============================================

interface AlertProps {
  children: ReactNode;
  type?: "info" | "success" | "warning" | "error";
  title?: string;
}

function Alert({ children, type = "info", title }: AlertProps) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
    error:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
  };

  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[type]} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-2">
        <span>{icons[type]}</span>
        <div>
          {title && <p className="font-medium">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

// 特化组件
function SuccessAlert({ children }: { children: ReactNode }) {
  return (
    <Alert type="success" title="成功">
      {children}
    </Alert>
  );
}

function ErrorAlert({ children }: { children: ReactNode }) {
  return (
    <Alert type="error" title="错误">
      {children}
    </Alert>
  );
}

export function SpecializationExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 特化组件</h3>

      <div className="mb-4 space-y-3">
        <Alert type="info" title="提示">
          这是一个通用的 Alert 组件
        </Alert>
        <SuccessAlert>操作已成功完成！</SuccessAlert>
        <ErrorAlert>发生了一个错误，请重试。</ErrorAlert>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`// 通用组件
function Alert({ children, type, title }) { ... }

// 特化组件：预设了 type 和 title
function SuccessAlert({ children }) {
  return (
    <Alert type="success" title="成功">
      {children}
    </Alert>
  );
}

function ErrorAlert({ children }) {
  return (
    <Alert type="error" title="错误">
      {children}
    </Alert>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 插槽模式
// ============================================

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

function Layout({ header, sidebar, children, footer }: LayoutProps) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700">
      {header && (
        <header className="border-b border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
          {header}
        </header>
      )}
      <div className="flex min-h-[200px]">
        {sidebar && (
          <aside className="w-40 border-r border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 p-4">{children}</main>
      </div>
      {footer && (
        <footer className="border-t border-zinc-200 bg-zinc-100 p-3 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800">
          {footer}
        </footer>
      )}
    </div>
  );
}

export function SlotPatternExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 插槽模式</h3>

      <Layout
        header={
          <div className="flex items-center justify-between">
            <span className="font-medium">Logo</span>
            <nav className="flex gap-4 text-sm">
              <span>首页</span>
              <span>关于</span>
              <span>联系</span>
            </nav>
          </div>
        }
        sidebar={
          <nav className="space-y-2 text-sm">
            <p className="font-medium">菜单</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>仪表盘</li>
              <li>用户</li>
              <li>设置</li>
            </ul>
          </nav>
        }
        footer="© 2024 My App"
      >
        <h4 className="mb-2 font-medium">主内容区域</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          插槽模式允许你在组件的不同位置插入自定义内容。
        </p>
      </Layout>

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  footer={<Footer />}
>
  <MainContent />
</Layout>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 复合组件
// ============================================

// Tab 组件的 Context
interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | null>(null);

function useTabs() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("Tab 组件必须在 Tabs 内使用");
  }
  return context;
}

function Tabs({
  children,
  defaultTab,
}: {
  children: ReactNode;
  defaultTab: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700">
        {children}
      </div>
    </TabContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-700">
      {children}
    </div>
  );
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return <div className="p-4">{children}</div>;
}

export function CompoundComponentExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 复合组件</h3>

      <div className="mb-4">
        <Tabs defaultTab="react">
          <TabList>
            <Tab value="react">React</Tab>
            <Tab value="vue">Vue</Tab>
            <Tab value="angular">Angular</Tab>
          </TabList>
          <TabPanel value="react">
            <h4 className="mb-2 font-medium">React</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              React 是一个用于构建用户界面的 JavaScript 库。
            </p>
          </TabPanel>
          <TabPanel value="vue">
            <h4 className="mb-2 font-medium">Vue</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Vue 是一个渐进式 JavaScript 框架。
            </p>
          </TabPanel>
          <TabPanel value="angular">
            <h4 className="mb-2 font-medium">Angular</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Angular 是一个完整的前端框架。
            </p>
          </TabPanel>
        </Tabs>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`<Tabs defaultTab="react">
  <TabList>
    <Tab value="react">React</Tab>
    <Tab value="vue">Vue</Tab>
  </TabList>
  <TabPanel value="react">React 内容</TabPanel>
  <TabPanel value="vue">Vue 内容</TabPanel>
</Tabs>`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>复合组件：</strong> 多个相关组件共享状态（通过 Context），
        提供灵活的 API 同时保持内部逻辑封装。
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 组合工厂
// ============================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`rounded-md font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// 预配置的按钮变体
function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

function DangerButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="danger" {...props} />;
}

function IconButton({
  icon,
  children,
  ...props
}: ButtonProps & { icon: ReactNode }) {
  return (
    <Button {...props}>
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
    </Button>
  );
}

export function CompositionFactoryExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 组合工厂</h3>

      <div className="mb-4 flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>

        <PrimaryButton size="sm">小按钮</PrimaryButton>
        <DangerButton size="lg">大按钮</DangerButton>

        <IconButton icon="🚀" variant="primary">
          发送
        </IconButton>
        <IconButton icon="🗑️" variant="danger">
          删除
        </IconButton>
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`// 基础 Button 组件
function Button({ variant, size, children, ...props }) { ... }

// 预配置变体
function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}

// 组合扩展
function IconButton({ icon, children, ...props }) {
  return (
    <Button {...props}>
      {icon} {children}
    </Button>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function CompositionExamples() {
  return (
    <div className="space-y-6">
      <ContainerContentExample />
      <SpecializationExample />
      <SlotPatternExample />
      <CompoundComponentExample />
      <CompositionFactoryExample />
    </div>
  );
}
