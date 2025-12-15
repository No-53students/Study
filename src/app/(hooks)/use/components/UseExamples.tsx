"use client";

import { use, Suspense, useState, createContext } from "react";

// ============================================
// 创建测试用的 Context
// ============================================

const ThemeContext = createContext({ mode: "light", color: "#3b82f6" });
const UserContext = createContext({ name: "Guest", role: "visitor" });

// ============================================
// 示例 1: 读取 Promise
// ============================================

// 模拟 API 请求
function createDelayedPromise<T>(data: T, delay: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

// 缓存 Promise（避免重复创求）
const postsCache = new Map<string, Promise<Post[]>>();

interface Post {
  id: number;
  title: string;
  likes: number;
}

function fetchPosts(): Promise<Post[]> {
  const key = "posts";
  if (!postsCache.has(key)) {
    postsCache.set(
      key,
      createDelayedPromise<Post[]>(
        [
          { id: 1, title: "React 19 新特性", likes: 42 },
          { id: 2, title: "use Hook 详解", likes: 38 },
          { id: 3, title: "Suspense 进阶", likes: 25 },
        ],
        1500
      )
    );
  }
  return postsCache.get(key)!;
}

function PostList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  const posts = use(postsPromise);

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between rounded-md bg-white p-3 dark:bg-zinc-700"
        >
          <span className="font-medium">{post.title}</span>
          <span className="text-sm text-zinc-500">❤️ {post.likes}</span>
        </div>
      ))}
    </div>
  );
}

function PostListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-12 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700"
        />
      ))}
    </div>
  );
}

export function PromiseExample() {
  const [key, setKey] = useState(0);

  const refreshPosts = () => {
    postsCache.clear();
    setKey((k) => k + 1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 读取 Promise</h3>

      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <Suspense fallback={<PostListSkeleton />}>
          <PostList key={key} postsPromise={fetchPosts()} />
        </Suspense>
      </div>

      <button
        onClick={refreshPosts}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        刷新数据
      </button>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> use(promise) 会等待 Promise
        resolve，期间显示 Suspense fallback。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 读取 Context
// ============================================

function ThemedButton() {
  const theme = use(ThemeContext);

  return (
    <button
      className="rounded-md px-4 py-2 text-white"
      style={{ backgroundColor: theme.color }}
    >
      {theme.mode === "light" ? "☀️ 浅色主题" : "🌙 深色主题"}
    </button>
  );
}

function UserInfo() {
  const user = use(UserContext);

  return (
    <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-zinc-500">角色: {user.role}</p>
    </div>
  );
}

export function ContextExample() {
  const [theme, setTheme] = useState({ mode: "light", color: "#3b82f6" });
  const [user, setUser] = useState({ name: "张三", role: "管理员" });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 读取 Context</h3>

      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={user}>
          <div className="mb-4 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">主题按钮：</p>
              <ThemedButton />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">用户信息：</p>
              <UserInfo />
            </div>
          </div>
        </UserContext.Provider>
      </ThemeContext.Provider>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            setTheme((t) =>
              t.mode === "light"
                ? { mode: "dark", color: "#6366f1" }
                : { mode: "light", color: "#3b82f6" }
            )
          }
          className="rounded-md bg-zinc-600 px-3 py-1 text-sm text-white hover:bg-zinc-700"
        >
          切换主题
        </button>
        <button
          onClick={() =>
            setUser((u) =>
              u.name === "张三"
                ? { name: "李四", role: "访客" }
                : { name: "张三", role: "管理员" }
            )
          }
          className="rounded-md bg-zinc-600 px-3 py-1 text-sm text-white hover:bg-zinc-700"
        >
          切换用户
        </button>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>对比 useContext：</strong> use(Context) 可以在条件语句中使用，而 useContext 不行。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 条件数据加载
// ============================================

interface UserDetails {
  id: number;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

const detailsCache = new Map<number, Promise<UserDetails>>();

function fetchUserDetails(userId: number): Promise<UserDetails> {
  if (!detailsCache.has(userId)) {
    detailsCache.set(
      userId,
      createDelayedPromise<UserDetails>(
        {
          id: userId,
          email: `user${userId}@example.com`,
          phone: "138****1234",
          address: "北京市朝阳区xxx街道",
          joinDate: "2024-01-15",
        },
        1000
      )
    );
  }
  return detailsCache.get(userId)!;
}

function UserDetailsComponent({ detailsPromise }: { detailsPromise: Promise<UserDetails> }) {
  const details = use(detailsPromise);

  return (
    <div className="space-y-2 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
      <p>
        <strong>邮箱:</strong> {details.email}
      </p>
      <p>
        <strong>电话:</strong> {details.phone}
      </p>
      <p>
        <strong>地址:</strong> {details.address}
      </p>
      <p>
        <strong>注册日期:</strong> {details.joinDate}
      </p>
    </div>
  );
}

function UserProfile({
  userId,
  showDetails,
}: {
  userId: number;
  showDetails: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="font-medium">用户 #{userId}</p>
        <p className="text-sm text-zinc-500">基本信息展示</p>
      </div>

      {/* 条件使用 use - 这是 use 的特殊能力！ */}
      {showDetails && (
        <Suspense
          fallback={
            <div className="h-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
          }
        >
          <UserDetailsComponent detailsPromise={fetchUserDetails(userId)} />
        </Suspense>
      )}
    </div>
  );
}

export function ConditionalExample() {
  const [showDetails, setShowDetails] = useState(false);
  const [userId, setUserId] = useState(1);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 条件数据加载</h3>

      <div className="mb-4 flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showDetails}
            onChange={(e) => setShowDetails(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">显示详细信息</span>
        </label>
        <select
          value={userId}
          onChange={(e) => {
            detailsCache.clear();
            setUserId(Number(e.target.value));
          }}
          className="rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        >
          {[1, 2, 3].map((id) => (
            <option key={id} value={id}>
              用户 {id}
            </option>
          ))}
        </select>
      </div>

      <UserProfile userId={userId} showDetails={showDetails} />

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>特殊能力：</strong> use 可以在条件语句中使用（if/&&），
        这是传统 Hooks 做不到的！只有勾选&ldquo;显示详细信息&rdquo;时才会加载数据。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 并行加载
// ============================================

interface Stats {
  views: number;
  users: number;
  posts: number;
}

interface Activity {
  action: string;
  time: string;
}

const parallelCache = new Map<string, Promise<Stats | Activity[]>>();

function fetchStats(): Promise<Stats> {
  if (!parallelCache.has("stats")) {
    parallelCache.set(
      "stats",
      createDelayedPromise<Stats>({ views: 12580, users: 856, posts: 234 }, 800)
    );
  }
  return parallelCache.get("stats")! as Promise<Stats>;
}

function fetchActivity(): Promise<Activity[]> {
  if (!parallelCache.has("activity")) {
    parallelCache.set(
      "activity",
      createDelayedPromise<Activity[]>(
        [
          { action: "新用户注册", time: "刚刚" },
          { action: "发布新文章", time: "5分钟前" },
          { action: "用户点赞", time: "10分钟前" },
        ],
        1200
      )
    );
  }
  return parallelCache.get("activity")! as Promise<Activity[]>;
}

function StatsPanel({ statsPromise }: { statsPromise: Promise<Stats> }) {
  const stats = use(statsPromise);

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-md bg-blue-100 p-3 text-center dark:bg-blue-900/30">
        <p className="text-2xl font-bold text-blue-600">{stats.views}</p>
        <p className="text-xs text-blue-500">浏览量</p>
      </div>
      <div className="rounded-md bg-green-100 p-3 text-center dark:bg-green-900/30">
        <p className="text-2xl font-bold text-green-600">{stats.users}</p>
        <p className="text-xs text-green-500">用户数</p>
      </div>
      <div className="rounded-md bg-purple-100 p-3 text-center dark:bg-purple-900/30">
        <p className="text-2xl font-bold text-purple-600">{stats.posts}</p>
        <p className="text-xs text-purple-500">文章数</p>
      </div>
    </div>
  );
}

function ActivityList({
  activityPromise,
}: {
  activityPromise: Promise<Activity[]>;
}) {
  const activities = use(activityPromise);

  return (
    <div className="space-y-2">
      {activities.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-md bg-zinc-100 p-2 dark:bg-zinc-800"
        >
          <span className="text-sm">{item.action}</span>
          <span className="text-xs text-zinc-500">{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function SmallSkeleton() {
  return (
    <div className="h-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
  );
}

export function ParallelExample() {
  const [key, setKey] = useState(0);

  const refresh = () => {
    parallelCache.clear();
    setKey((k) => k + 1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 并行加载</h3>

      <div key={key} className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">统计数据 (800ms)</p>
          <Suspense fallback={<SmallSkeleton />}>
            <StatsPanel statsPromise={fetchStats()} />
          </Suspense>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">最近活动 (1200ms)</p>
          <Suspense fallback={<SmallSkeleton />}>
            <ActivityList activityPromise={fetchActivity()} />
          </Suspense>
        </div>
      </div>

      <button
        onClick={refresh}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        刷新数据
      </button>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">并行加载优势：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>两个请求同时发起</li>
          <li>各自独立的 Suspense 边界</li>
          <li>先完成的先显示</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">use Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          use 是 React 19 的新 Hook，可以读取 Promise 或 Context，且可以在条件语句中使用。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`// 读取 Promise
const data = use(dataPromise);

// 读取 Context
const theme = use(ThemeContext);

// 条件使用（特殊能力！）
if (shouldLoad) {
  const extra = use(extraDataPromise);
}`}
          </pre>
        </div>
      </div>

      <PromiseExample />
      <ContextExample />
      <ConditionalExample />
      <ParallelExample />

      {/* 对比说明 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          use vs 传统方式
        </h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <th className="py-2 text-left">特性</th>
                <th className="py-2 text-left">use</th>
                <th className="py-2 text-left">useState + useEffect</th>
              </tr>
            </thead>
            <tbody className="text-blue-700 dark:text-blue-300">
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2">代码量</td>
                <td>少</td>
                <td>多</td>
              </tr>
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2">条件使用</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2">需要 Suspense</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td className="py-2">加载状态</td>
                <td>自动</td>
                <td>手动管理</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
