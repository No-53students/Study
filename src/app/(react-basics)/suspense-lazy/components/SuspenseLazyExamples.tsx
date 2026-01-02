"use client";

import { Suspense, lazy, useState, useTransition } from "react";

// ============================================
// 模拟延迟加载的组件
// ============================================

// 模拟网络延迟
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 模拟的重型组件
function HeavyChartComponent() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
      <h4 className="mb-2 text-lg font-semibold">📊 图表组件</h4>
      <div className="grid grid-cols-4 gap-2">
        {[40, 65, 45, 80, 55, 70, 50, 85].map((height, i) => (
          <div
            key={i}
            className="rounded bg-white/30"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
      <p className="mt-3 text-sm opacity-80">这是一个模拟的重型图表组件</p>
    </div>
  );
}

function HeavyEditorComponent() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white">
      <h4 className="mb-2 text-lg font-semibold">📝 编辑器组件</h4>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/30" />
        <div className="h-4 w-3/4 rounded bg-white/30" />
        <div className="h-4 w-5/6 rounded bg-white/30" />
        <div className="h-4 w-2/3 rounded bg-white/30" />
      </div>
      <p className="mt-3 text-sm opacity-80">这是一个模拟的重型编辑器组件</p>
    </div>
  );
}

function HeavyTableComponent() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white">
      <h4 className="mb-2 text-lg font-semibold">📋 数据表格组件</h4>
      <div className="space-y-1">
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="flex gap-1">
            {[1, 2, 3].map((col) => (
              <div key={col} className="h-6 flex-1 rounded bg-white/30" />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm opacity-80">这是一个模拟的重型表格组件</p>
    </div>
  );
}

// ============================================
// 示例 1: 基本的 Suspense 用法
// ============================================

// 创建一个会"挂起"的资源
function createResource<T>(promise: Promise<T>) {
  let status = "pending";
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      error = e;
    }
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw error;
      return result;
    },
  };
}

// 模拟数据获取
function fetchUserData() {
  return delay(2000).then(() => ({
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "👤",
  }));
}

let userResource: ReturnType<typeof createResource<{ name: string; email: string; avatar: string }>> | null = null;

function UserProfile() {
  if (!userResource) {
    userResource = createResource(fetchUserData());
  }
  const user = userResource.read();

  return (
    <div className="flex items-center gap-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <div className="text-4xl">{user.avatar}</div>
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-zinc-500">{user.email}</p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-50 p-4 dark:from-zinc-800 dark:to-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50">
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
      </div>
      <div className="space-y-2.5 flex-1">
        <div className="h-4 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
        <div className="h-3 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" style={{ animationDelay: '0.1s' }} />
      </div>
    </div>
  );
}

export function BasicSuspenseExample() {
  const [showUser, setShowUser] = useState(false);

  const handleShow = () => {
    userResource = null; // 重置资源以重新加载
    setShowUser(true);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: Suspense 基本用法</h3>

      <div className="mb-4">
        <button
          onClick={handleShow}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {showUser ? "重新加载用户" : "加载用户数据"}
        </button>
      </div>

      {showUser && (
        <Suspense fallback={<LoadingSkeleton />}>
          <UserProfile />
        </Suspense>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`<Suspense fallback={<LoadingSkeleton />}>
  <UserProfile />
</Suspense>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 使用 lazy 进行代码分割
// ============================================

// 模拟 lazy 加载（实际项目中会使用真正的动态 import）
const LazyChart = lazy(async () => {
  await delay(1500);
  return { default: HeavyChartComponent };
});

const LazyEditor = lazy(async () => {
  await delay(2000);
  return { default: HeavyEditorComponent };
});

const LazyTable = lazy(async () => {
  await delay(1000);
  return { default: HeavyTableComponent };
});

function ComponentLoadingFallback({ name }: { name: string }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-800/50">
      <div className="text-center">
        <div className="relative inline-block mb-3">
          <div className="h-10 w-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700" />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">正在加载 {name}...</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">请稍候</p>
      </div>
    </div>
  );
}

export function LazyLoadingExample() {
  const [activeTab, setActiveTab] = useState<"chart" | "editor" | "table" | null>(null);

  const tabs = [
    { id: "chart" as const, label: "图表", icon: "📊" },
    { id: "editor" as const, label: "编辑器", icon: "📝" },
    { id: "table" as const, label: "表格", icon: "📋" },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: lazy 代码分割</h3>

      <div className="mb-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-md px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        {activeTab === "chart" && (
          <Suspense fallback={<ComponentLoadingFallback name="图表组件" />}>
            <LazyChart />
          </Suspense>
        )}
        {activeTab === "editor" && (
          <Suspense fallback={<ComponentLoadingFallback name="编辑器组件" />}>
            <LazyEditor />
          </Suspense>
        )}
        {activeTab === "table" && (
          <Suspense fallback={<ComponentLoadingFallback name="表格组件" />}>
            <LazyTable />
          </Suspense>
        )}
        {!activeTab && (
          <div className="flex h-40 items-center justify-center text-zinc-500 dark:text-zinc-400">
            点击上方按钮加载组件
          </div>
        )}
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`const LazyChart = lazy(() => import('./ChartComponent'));

<Suspense fallback={<Loading />}>
  <LazyChart />
</Suspense>`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 每个组件只在首次点击时加载，后续切换使用缓存。
        观察网络请求可以看到代码分割的效果。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 嵌套 Suspense 边界
// ============================================

const LazyHeader = lazy(async () => {
  await delay(500);
  return {
    default: () => (
      <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          🏠 Header 组件
        </h4>
      </div>
    ),
  };
});

const LazySidebar = lazy(async () => {
  await delay(1500);
  return {
    default: () => (
      <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900/30">
        <h4 className="font-semibold text-green-800 dark:text-green-200">
          📑 Sidebar 组件
        </h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• 导航项 1</li>
          <li>• 导航项 2</li>
          <li>• 导航项 3</li>
        </ul>
      </div>
    ),
  };
});

const LazyContent = lazy(async () => {
  await delay(2500);
  return {
    default: () => (
      <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900/30">
        <h4 className="font-semibold text-purple-800 dark:text-purple-200">
          📄 Content 组件
        </h4>
        <p className="mt-2 text-sm">这是主要内容区域...</p>
      </div>
    ),
  };
});

function SectionSkeleton({ name, color }: { name: string; color: string }) {
  return (
    <div
      className={`rounded-xl p-4 ${color} border border-current/10 shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="relative">
          <div className="h-5 w-5 rounded-full bg-current opacity-15" />
          <div className="absolute inset-0 h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin opacity-40" />
        </div>
        <div className="h-5 w-24 rounded-md bg-current opacity-20 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-current opacity-10 animate-pulse" />
        <div className="h-3 w-3/4 rounded bg-current opacity-10 animate-pulse" style={{ animationDelay: '0.1s' }} />
      </div>
    </div>
  );
}

export function NestedSuspenseExample() {
  const [key, setKey] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 嵌套 Suspense 边界</h3>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        重新加载所有组件
      </button>

      <div key={key} className="space-y-4">
        <Suspense
          fallback={<SectionSkeleton name="Header" color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" />}
        >
          <LazyHeader />
        </Suspense>

        <div className="grid gap-4 sm:grid-cols-3">
          <Suspense
            fallback={<SectionSkeleton name="Sidebar" color="bg-green-100 dark:bg-green-900/30 text-green-600" />}
          >
            <LazySidebar />
          </Suspense>

          <div className="sm:col-span-2">
            <Suspense
              fallback={<SectionSkeleton name="Content" color="bg-purple-100 dark:bg-purple-900/30 text-purple-600" />}
            >
              <LazyContent />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> 每个区域独立加载，Header 最先出现（0.5s），
        然后是 Sidebar（1.5s），最后是 Content（2.5s）。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 预加载组件
// ============================================

// 预加载函数 - 模拟预加载行为
let preloadedChart = false;
const preloadChart = () => {
  if (!preloadedChart) {
    preloadedChart = true;
    // 模拟预加载 - 实际项目中这里会是 import('./HeavyComponent')
    delay(1500);
  }
};

const PreloadableChart = lazy(async () => {
  await delay(1500);
  return {
    default: () => (
      <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
        <h4 className="text-lg font-semibold">📈 预加载的图表</h4>
        <p className="mt-2 text-sm opacity-80">这个组件在鼠标悬停时就开始加载了！</p>
      </div>
    ),
  };
});

export function PreloadExample() {
  const [showChart, setShowChart] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);

  const handleMouseEnter = () => {
    setIsPreloading(true);
    preloadChart();
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 预加载组件</h3>

      <div className="mb-4 flex items-center gap-4">
        <button
          onMouseEnter={handleMouseEnter}
          onClick={() => setShowChart(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {showChart ? "已加载" : "悬停预加载，点击显示"}
        </button>
        {isPreloading && !showChart && (
          <span className="text-sm text-zinc-500 animate-pulse">✨ 正在预加载...</span>
        )}
      </div>

      {showChart && (
        <Suspense
          fallback={
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-zinc-300">
              <span className="animate-pulse">加载中...</span>
            </div>
          }
        >
          <PreloadableChart />
        </Suspense>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`// 预加载函数
const preload = () => import('./HeavyComponent');

<button
  onMouseEnter={preload}  // 悬停时预加载
  onClick={show}          // 点击时显示
>
  显示组件
</button>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: useTransition 与 Suspense
// ============================================

type TabId = "photos" | "posts" | "bio";

const tabComponents = {
  photos: lazy(async () => {
    await delay(2000);
    return {
      default: () => (
        <div className="grid grid-cols-3 gap-2">
          {["🌄", "🌅", "🌆", "🌇", "🌉", "🌃"].map((emoji, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-lg bg-zinc-100 text-2xl dark:bg-zinc-800"
            >
              {emoji}
            </div>
          ))}
        </div>
      ),
    };
  }),
  posts: lazy(async () => {
    await delay(1500);
    return {
      default: () => (
        <div className="space-y-2">
          {["今天天气真好！", "学习 React 中...", "周末愉快！"].map((post, i) => (
            <div
              key={i}
              className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800"
            >
              {post}
            </div>
          ))}
        </div>
      ),
    };
  }),
  bio: lazy(async () => {
    await delay(1000);
    return {
      default: () => (
        <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="font-semibold">关于我</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            一名热爱编程的开发者，专注于 React 和 TypeScript。
          </p>
        </div>
      ),
    };
  }),
};

export function TransitionSuspenseExample() {
  const [tab, setTab] = useState<TabId>("bio");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab: TabId) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  const TabContent = tabComponents[tab];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">
        示例 5: useTransition 与 Suspense
      </h3>

      <div className="mb-4 flex gap-2">
        {(["bio", "posts", "photos"] as TabId[]).map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            disabled={isPending}
            className={`rounded-md px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 ${
              tab === t
                ? "bg-blue-600 text-white shadow-md"
                : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200"
            } ${isPending ? "opacity-50" : ""}`}
          >
            {t === "bio" && "📝 简介"}
            {t === "posts" && "📮 帖子"}
            {t === "photos" && "📷 照片"}
          </button>
        ))}
        {isPending && (
          <span className="flex items-center text-sm text-zinc-500 animate-pulse">
            ⏳ 切换中...
          </span>
        )}
      </div>

      <div className={`transition-opacity ${isPending ? "opacity-50" : ""}`}>
        <Suspense
          fallback={
            <div className="flex h-40 items-center justify-center">
              <div className="animate-spin text-2xl">⏳</div>
            </div>
          }
        >
          <TabContent />
        </Suspense>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>优势：</strong> useTransition 让切换时保持旧内容可见（变暗），
        而不是立即显示 fallback，提供更好的用户体验。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function SuspenseLazyExamples() {
  return (
    <div className="space-y-6">
      <BasicSuspenseExample />
      <LazyLoadingExample />
      <NestedSuspenseExample />
      <PreloadExample />
      <TransitionSuspenseExample />
    </div>
  );
}
