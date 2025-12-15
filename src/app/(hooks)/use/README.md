# use Hook 详解

## 什么是 use？

`use` 是 React 19 引入的特殊 Hook，用于**读取 Promise 或 Context 的值**。它打破了传统 Hook 的规则，可以在条件语句和循环中使用。

```tsx
const value = use(resource);
```

## 为什么需要 use？

### 传统方式的问题

```tsx
// ❌ 传统方式：需要复杂的状态管理
function Comments({ commentsPromise }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    commentsPromise.then(data => {
      setComments(data);
      setLoading(false);
    });
  }, [commentsPromise]);

  if (loading) return <Spinner />;
  return <CommentList comments={comments} />;
}
```

### use 解决方案

```tsx
// ✅ use：简洁直观
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return <CommentList comments={comments} />;
}

// 配合 Suspense 使用
<Suspense fallback={<Spinner />}>
  <Comments commentsPromise={fetchComments()} />
</Suspense>
```

## 基本语法

### 读取 Promise

```tsx
import { use } from 'react';

function Component({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.title}</div>;
}
```

### 读取 Context

```tsx
import { use } from 'react';

function Component() {
  const theme = use(ThemeContext);
  return <div style={{ color: theme.color }}>Hello</div>;
}
```

## 特殊规则

### 1. 可以在条件语句中使用

```tsx
function UserProfile({ user, shouldShowDetails }) {
  // ✅ 这是允许的！
  if (shouldShowDetails) {
    const details = use(fetchUserDetails(user.id));
    return <DetailedProfile details={details} />;
  }

  return <BasicProfile user={user} />;
}
```

### 2. 可以在循环中使用

```tsx
function CommentList({ commentPromises }) {
  return (
    <ul>
      {commentPromises.map((promise, i) => {
        // ✅ 在循环中使用
        const comment = use(promise);
        return <li key={i}>{comment.text}</li>;
      })}
    </ul>
  );
}
```

### 3. 必须在组件或 Hook 中调用

```tsx
// ❌ 错误：在普通函数中使用
function processData(promise) {
  const data = use(promise); // 不允许
  return data;
}

// ✅ 正确：在组件中使用
function DataDisplay({ promise }) {
  const data = use(promise);
  return <div>{data}</div>;
}
```

## 使用场景

### 场景 1：数据获取

```tsx
async function fetchPost(id: string) {
  const response = await fetch(`/api/posts/${id}`);
  return response.json();
}

function Post({ postPromise }) {
  const post = use(postPromise);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// 父组件
function PostPage({ id }) {
  const postPromise = fetchPost(id);

  return (
    <Suspense fallback={<PostSkeleton />}>
      <Post postPromise={postPromise} />
    </Suspense>
  );
}
```

### 场景 2：条件数据加载

```tsx
function ProductDetails({ product, showReviews }) {
  // 只在需要时加载评论
  if (showReviews) {
    const reviews = use(fetchReviews(product.id));
    return (
      <div>
        <ProductInfo product={product} />
        <ReviewList reviews={reviews} />
      </div>
    );
  }

  return <ProductInfo product={product} />;
}
```

### 场景 3：替代 useContext

```tsx
// 传统方式
function OldWay() {
  const theme = useContext(ThemeContext);
  return <div style={{ background: theme.bg }}>Hello</div>;
}

// 使用 use
function NewWay() {
  const theme = use(ThemeContext);
  return <div style={{ background: theme.bg }}>Hello</div>;
}

// use 的优势：可以在条件中读取
function ConditionalTheme({ useCustomTheme }) {
  if (useCustomTheme) {
    const theme = use(CustomThemeContext); // ✅ 允许
    return <div style={theme}>Custom</div>;
  }
  return <div>Default</div>;
}
```

### 场景 4：并行数据加载

```tsx
function Dashboard({ userId }) {
  // 同时开始多个请求
  const userPromise = fetchUser(userId);
  const postsPromise = fetchPosts(userId);
  const statsPromise = fetchStats(userId);

  return (
    <div className="dashboard">
      <Suspense fallback={<UserSkeleton />}>
        <UserCard userPromise={userPromise} />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <PostsList postsPromise={postsPromise} />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsPanel statsPromise={statsPromise} />
      </Suspense>
    </div>
  );
}

function UserCard({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

### 场景 5：嵌套数据加载

```tsx
function ArticleWithAuthor({ articlePromise }) {
  const article = use(articlePromise);

  // 获取到文章后，再获取作者信息
  const authorPromise = fetchAuthor(article.authorId);

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      <Suspense fallback={<AuthorSkeleton />}>
        <AuthorInfo authorPromise={authorPromise} />
      </Suspense>
    </article>
  );
}
```

## 错误处理

### 使用 Error Boundary

```tsx
function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <DataComponent dataPromise={fetchData()} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### 在组件内处理

```tsx
function DataComponent({ dataPromise }) {
  try {
    const data = use(dataPromise);
    return <div>{data}</div>;
  } catch (error) {
    // Promise 被 reject 时
    return <ErrorMessage error={error} />;
  }
}
```

## use vs 传统方式

| 特性 | use | useState + useEffect |
|------|-----|---------------------|
| 代码量 | 少 | 多 |
| 可在条件中使用 | ✅ | ❌ |
| 需要 Suspense | ✅ | ❌ |
| 自动处理加载状态 | ✅ | ❌ |
| 支持 Promise | ✅ | 需手动处理 |
| 支持 Context | ✅ | useContext |

## 最佳实践

### 1. 缓存 Promise

```tsx
// ❌ 每次渲染创建新 Promise
function Bad() {
  const data = use(fetch('/api/data')); // 每次都发请求
}

// ✅ 缓存 Promise
const dataPromise = fetch('/api/data');
function Good() {
  const data = use(dataPromise); // 使用缓存
}

// ✅ 或使用缓存函数
const cache = new Map();
function fetchWithCache(url) {
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then(r => r.json()));
  }
  return cache.get(url);
}
```

### 2. 配合 Suspense 使用

```tsx
// ✅ 推荐：始终用 Suspense 包裹
<Suspense fallback={<Loading />}>
  <ComponentUsingUse />
</Suspense>
```

### 3. 处理取消和竞态

```tsx
function useLatestData(id) {
  const [promise, setPromise] = useState(() => fetchData(id));

  useEffect(() => {
    // 确保使用最新的请求结果
    setPromise(fetchData(id));
  }, [id]);

  return promise;
}
```

## 常见错误

### 错误 1：不缓存 Promise

```tsx
// ❌ 无限循环！
function Bad() {
  const data = use(fetchData()); // 每次渲染创建新 Promise
}
```

### 错误 2：没有 Suspense 边界

```tsx
// ❌ 运行时错误
function App() {
  return <DataComponent promise={fetchData()} />;
}

// ✅ 需要 Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent promise={fetchData()} />
    </Suspense>
  );
}
```

### 错误 3：在普通函数中使用

```tsx
// ❌ 只能在组件/Hook 中使用
function helper(promise) {
  return use(promise); // 错误
}
```

## 总结

| 使用场景 | 是否适合 use |
|----------|-------------|
| 读取 Promise | ✅ |
| 读取 Context | ✅ |
| 条件数据加载 | ✅ |
| 替代 useState + useEffect | ✅ |
| 非组件代码 | ❌ |
| 客户端副作用 | ❌ 使用 useEffect |

`use` 是 React 19 的革命性特性，它简化了异步数据获取和 Context 使用，是构建现代 React 应用的重要工具。
