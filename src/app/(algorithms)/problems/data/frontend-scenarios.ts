/**
 * 前端算法应用场景映射库
 *
 * 这个文件建立了算法和前端实际应用的完整映射关系
 * 帮助学习者理解「学这个算法有什么用」
 */

// ==================== 类型定义 ====================

export interface FrontendScenario {
  id: string;
  name: string;
  category: ScenarioCategory;
  description: string;

  // 算法关联
  algorithms: AlgorithmMapping[];

  // 详细说明
  problemStatement: string;       // 问题描述
  whyThisAlgorithm: string;       // 为什么用这个算法
  implementation: string;         // 实现思路

  // 代码示例
  codeExample: CodeExample;

  // 性能对比
  performanceComparison?: PerformanceComparison;

  // 实际应用
  realWorldExamples: string[];

  // 相关题目
  relatedProblems: string[];

  // 进阶思考
  advancedTopics?: string[];
}

export interface AlgorithmMapping {
  algorithmId: string;
  algorithmName: string;
  usage: string;               // 这个算法在场景中的作用
  importance: "core" | "optional";
}

export interface CodeExample {
  title: string;
  language: "typescript" | "javascript";
  code: string;
  explanation: string;
  keyPoints: string[];
}

export interface PerformanceComparison {
  naive: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  optimized: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  improvement: string;
  realMetrics?: {
    dataSize: string;
    naiveTime: string;
    optimizedTime: string;
  };
}

export type ScenarioCategory =
  | "performance"     // 性能优化
  | "data-structure"  // 数据结构
  | "ui-interaction"  // UI 交互
  | "data-processing" // 数据处理
  | "state-management"// 状态管理
  | "network"         // 网络相关
  | "animation"       // 动画效果
  | "text-processing" // 文本处理
  | "caching";        // 缓存策略

// ==================== 虚拟列表 ====================

export const virtualListScenario: FrontendScenario = {
  id: "virtual-list",
  name: "虚拟列表 / 虚拟滚动",
  category: "performance",
  description: "高效渲染大量列表数据，只渲染可视区域内的元素",

  algorithms: [
    {
      algorithmId: "binary-search",
      algorithmName: "二分查找",
      usage: "根据滚动位置快速定位起始项索引",
      importance: "core",
    },
    {
      algorithmId: "sliding-window",
      algorithmName: "滑动窗口",
      usage: "维护可视区域的元素范围",
      importance: "core",
    },
  ],

  problemStatement: `
当需要渲染 10,000+ 条数据的列表时，直接渲染所有 DOM 元素会导致：
1. 首屏加载极慢（创建上万个 DOM 节点）
2. 滚动卡顿（大量 DOM 导致重绘重排）
3. 内存占用高（每个 DOM 节点约 1KB）

需要一种方法：只渲染用户能看到的部分。
`,

  whyThisAlgorithm: `
1. **二分查找**：假设列表有 10,000 项，用户滚动到某个位置。如何快速知道应该从第几项开始渲染？
   - 暴力法：从头遍历累加高度，O(n) = 10,000 次
   - 二分法：O(log n) ≈ 14 次

2. **滑动窗口**：确定了起始位置后，需要维护「可视窗口」内的元素。
   - 窗口 [startIndex, endIndex] 表示当前渲染的元素范围
   - 用户滚动时，窗口整体移动，类似滑动窗口
`,

  implementation: `
1. 计算每个元素的累积高度（可缓存）
2. 用户滚动时，二分查找确定 startIndex
3. 根据可视区域高度计算 endIndex
4. 只渲染 [startIndex, endIndex] 范围内的元素
5. 使用 padding 或 transform 占位上下空白区域
`,

  codeExample: {
    title: "虚拟列表核心实现",
    language: "typescript",
    code: `interface VirtualListProps<T> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  overscan?: number;  // 额外渲染的缓冲区
}

function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 3,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  // 计算累积高度（用于二分查找）
  const heights = useMemo(() => {
    const result: number[] = [0];
    for (let i = 0; i < items.length; i++) {
      const h = typeof itemHeight === 'function' ? itemHeight(i) : itemHeight;
      result.push(result[i] + h);
    }
    return result;
  }, [items, itemHeight]);

  // 二分查找起始索引
  const findStartIndex = useCallback((scrollTop: number) => {
    let left = 0, right = heights.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (heights[mid] >= scrollTop) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return Math.max(0, left - 1);
  }, [heights]);

  // 计算可视范围
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, findStartIndex(scrollTop) - overscan);
    let endIndex = startIndex;

    // 找到超出可视区域的位置
    while (
      endIndex < items.length &&
      heights[endIndex] < scrollTop + containerHeight
    ) {
      endIndex++;
    }
    endIndex = Math.min(items.length - 1, endIndex + overscan);

    return { startIndex, endIndex };
  }, [scrollTop, containerHeight, overscan, items.length, heights, findStartIndex]);

  // 只渲染可视范围内的元素
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1).map((item, i) => ({
      item,
      index: visibleRange.startIndex + i,
      style: {
        position: 'absolute' as const,
        top: heights[visibleRange.startIndex + i],
        height: heights[visibleRange.startIndex + i + 1] - heights[visibleRange.startIndex + i],
      },
    }));
  }, [items, visibleRange, heights]);

  const totalHeight = heights[heights.length - 1];

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return { visibleItems, totalHeight, onScroll };
}`,
    explanation: "核心是用二分查找快速定位滚动位置对应的元素索引，避免 O(n) 遍历。",
    keyPoints: [
      "预计算累积高度数组",
      "二分查找 O(log n) 定位起始索引",
      "overscan 预渲染减少闪烁",
      "绝对定位避免 reflow",
    ],
  },

  performanceComparison: {
    naive: {
      approach: "渲染所有 DOM 元素",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n) DOM 节点",
    },
    optimized: {
      approach: "虚拟列表 + 二分查找",
      timeComplexity: "O(log n) 定位 + O(k) 渲染（k 为可视数量）",
      spaceComplexity: "O(k) DOM 节点",
    },
    improvement: "10,000 项列表：渲染时间从 3-5s 降到 <100ms，内存从 500MB 降到 <50MB",
    realMetrics: {
      dataSize: "10,000 项",
      naiveTime: "3.2s 首屏 + 卡顿滚动",
      optimizedTime: "60ms 首屏 + 60fps 滚动",
    },
  },

  realWorldExamples: [
    "react-window / react-virtualized",
    "Vue Virtual Scroller",
    "Slack 消息列表",
    "VSCode 文件树",
    "Twitter/微博 信息流",
  ],

  relatedProblems: [
    "binary-search",
    "search-insert-position",
    "sliding-window-maximum",
  ],

  advancedTopics: [
    "动态高度的虚拟列表（需要实时测量）",
    "双向滚动（横向 + 纵向）",
    "无限滚动 + 数据懒加载",
    "列表项内的图片懒加载",
  ],
};

// ==================== LRU 缓存 ====================

export const lruCacheScenario: FrontendScenario = {
  id: "lru-cache",
  name: "LRU 缓存",
  category: "caching",
  description: "最近最少使用缓存策略，自动淘汰最久未使用的数据",

  algorithms: [
    {
      algorithmId: "hash-table",
      algorithmName: "哈希表",
      usage: "O(1) 时间查找缓存项",
      importance: "core",
    },
    {
      algorithmId: "linked-list",
      algorithmName: "双向链表",
      usage: "O(1) 时间调整元素顺序和删除最老元素",
      importance: "core",
    },
  ],

  problemStatement: `
前端经常需要缓存数据（API 响应、计算结果、图片等）来提高性能。
但内存有限，不能无限缓存。需要一种策略：
1. 快速读写缓存 O(1)
2. 空间满时自动淘汰最久未使用的数据
3. 每次访问自动更新「最近使用」状态
`,

  whyThisAlgorithm: `
**为什么需要哈希表 + 双向链表？**

1. **哈希表**：O(1) 查找
   - cache.get(key) 需要立即返回结果
   - 单独用数组或链表查找是 O(n)

2. **双向链表**：O(1) 移动和删除
   - 访问某个 key 后，需要把它移到「最近使用」的位置
   - 淘汰时需要删除「最久未使用」的元素
   - 双向链表可以 O(1) 完成这些操作

**JavaScript 的 Map 天然保持插入顺序**，可以简化实现！
`,

  implementation: `
1. 使用 Map 作为缓存存储（天然有序）
2. get 时：删除再重新插入（移到末尾）
3. put 时：先删除旧值，再插入新值
4. 容量满时：删除 Map 的第一个元素（最老的）
`,

  codeExample: {
    title: "LRU 缓存实现",
    language: "typescript",
    code: `class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }

    // 删除再重新插入，移动到末尾（最近使用）
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key: K, value: V): void {
    // 如果 key 已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // 插入新值
    this.cache.set(key, value);

    // 检查容量，淘汰最老的
    if (this.cache.size > this.capacity) {
      // Map 的第一个元素就是最老的（先插入的）
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

// 使用示例：API 响应缓存
const apiCache = new LRUCache<string, any>(100);

async function fetchWithCache(url: string) {
  if (apiCache.has(url)) {
    return apiCache.get(url);
  }

  const response = await fetch(url);
  const data = await response.json();
  apiCache.put(url, data);

  return data;
}`,
    explanation: "利用 JavaScript Map 的插入顺序特性，简化了传统的双向链表实现。",
    keyPoints: [
      "Map 天然保持插入顺序",
      "get 时删除再插入，移动到末尾",
      "容量满时删除第一个元素",
      "所有操作都是 O(1)",
    ],
  },

  performanceComparison: {
    naive: {
      approach: "数组 + 遍历查找",
      timeComplexity: "O(n) 查找，O(n) 移动",
      spaceComplexity: "O(n)",
    },
    optimized: {
      approach: "Map（哈希表 + 有序）",
      timeComplexity: "O(1) 查找，O(1) 移动",
      spaceComplexity: "O(n)",
    },
    improvement: "查找和更新从 O(n) 降到 O(1)",
  },

  realWorldExamples: [
    "浏览器缓存策略",
    "React Query / SWR 的缓存",
    "图片懒加载的内存缓存",
    "API 响应缓存",
    "Keep-Alive 组件缓存",
  ],

  relatedProblems: [
    "lru-cache",
    "design-hashmap",
    "design-linked-list",
  ],

  advancedTopics: [
    "LFU 缓存（最不常使用）",
    "带 TTL 的缓存",
    "分布式缓存",
    "缓存穿透和雪崩",
  ],
};

// ==================== 防抖节流 ====================

export const debounceThrottleScenario: FrontendScenario = {
  id: "debounce-throttle",
  name: "防抖与节流",
  category: "performance",
  description: "控制函数执行频率，优化高频事件处理",

  algorithms: [
    {
      algorithmId: "sliding-window",
      algorithmName: "滑动窗口（时间窗口）",
      usage: "节流在固定时间窗口内只执行一次",
      importance: "core",
    },
  ],

  problemStatement: `
某些事件触发非常频繁：
- scroll 事件：每秒可触发数十次
- resize 事件：拖动时连续触发
- input 事件：每次输入都触发

直接处理会导致：
1. 性能问题（频繁计算、重渲染）
2. 请求风暴（搜索框每输入一个字符就发请求）
3. 用户体验差（动画卡顿）

需要控制执行频率。
`,

  whyThisAlgorithm: `
**防抖 (Debounce)**：
- 等用户「停下来」再执行
- 类似电梯：有人进来就重新计时，没人进入才关门
- 适合：搜索框输入、窗口 resize

**节流 (Throttle)**：
- 固定时间间隔执行一次
- 类似技能 CD：释放后冷却期内无法再次释放
- 适合：滚动事件、鼠标移动

两者都用到**时间窗口**的概念。
`,

  implementation: `
**防抖**：
1. 设置定时器
2. 每次触发时取消之前的定时器，重新计时
3. 定时器到期才执行

**节流**：
1. 记录上次执行时间
2. 触发时检查是否超过冷却时间
3. 超过才执行，并更新时间戳
`,

  codeExample: {
    title: "防抖与节流实现",
    language: "typescript",
    code: `// 防抖：等用户停止操作后执行
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  const { leading = false, trailing = true } = options;

  return function (this: any, ...args: Parameters<T>) {
    const shouldCallNow = leading && !timer;

    if (timer) {
      clearTimeout(timer);
    }

    lastArgs = args;

    timer = setTimeout(() => {
      timer = null;
      if (trailing && lastArgs) {
        fn.apply(this, lastArgs);
        lastArgs = null;
      }
    }, delay);

    if (shouldCallNow) {
      fn.apply(this, args);
    }
  };
}

// 节流：固定间隔执行
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  const { leading = true, trailing = true } = options;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    if (remaining <= 0 || remaining > interval) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      if (leading || lastTime !== 0) {
        fn.apply(this, args);
      }
    } else if (!timer && trailing) {
      lastArgs = args;
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };
}

// 使用示例
const handleSearch = debounce((query: string) => {
  console.log('Searching:', query);
  // 发起 API 请求
}, 300);

const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
  // 更新 UI
}, 100);

// React Hook 版本
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
    explanation: "防抖适合「等用户停下来」的场景，节流适合「持续但降频」的场景。",
    keyPoints: [
      "防抖：每次触发重新计时",
      "节流：冷却期内忽略触发",
      "leading/trailing 控制首尾是否执行",
      "React Hook 版本更易集成",
    ],
  },

  performanceComparison: {
    naive: {
      approach: "直接处理每次事件",
      timeComplexity: "O(n) 次执行（n = 事件次数）",
      spaceComplexity: "O(1)",
    },
    optimized: {
      approach: "防抖/节流",
      timeComplexity: "O(1) 或 O(n/k) 次执行",
      spaceComplexity: "O(1)",
    },
    improvement: "搜索框：从每秒 10 次请求降到最多 1 次",
    realMetrics: {
      dataSize: "用户输入 10 个字符",
      naiveTime: "10 次 API 请求",
      optimizedTime: "1 次 API 请求",
    },
  },

  realWorldExamples: [
    "搜索框自动补全（防抖）",
    "窗口 resize 响应（防抖）",
    "滚动懒加载（节流）",
    "鼠标移动跟踪（节流）",
    "按钮防重复点击（节流）",
  ],

  relatedProblems: [
    "sliding-window-maximum",
    "moving-average-from-data-stream",
  ],

  advancedTopics: [
    "requestAnimationFrame 节流",
    "取消能力（AbortController）",
    "React Concurrent Mode 下的处理",
    "Web Worker 中的防抖",
  ],
};

// ==================== 树形组件 ====================

export const treeComponentScenario: FrontendScenario = {
  id: "tree-component",
  name: "树形组件 (文件树 / 目录树)",
  category: "ui-interaction",
  description: "递归渲染和操作树形数据结构",

  algorithms: [
    {
      algorithmId: "dfs",
      algorithmName: "深度优先搜索",
      usage: "递归遍历树结构",
      importance: "core",
    },
    {
      algorithmId: "bfs",
      algorithmName: "广度优先搜索",
      usage: "层级遍历、展开动画",
      importance: "optional",
    },
  ],

  problemStatement: `
前端经常需要处理树形数据：
- 文件目录树
- 组织架构图
- 多级菜单
- 评论嵌套

需要解决：
1. 如何渲染任意深度的嵌套结构
2. 如何高效查找/更新某个节点
3. 如何实现展开/折叠、选中、拖拽等交互
`,

  whyThisAlgorithm: `
**DFS（深度优先）**：
- 递归渲染组件天然是 DFS
- 先渲染父节点，再渲染子节点
- 适合展开折叠、节点查找

**BFS（广度优先）**：
- 按层级处理
- 适合层级动画、找最近的父节点
`,

  implementation: `
1. 使用递归组件渲染树结构
2. 维护展开状态 Set<nodeId>
3. 维护选中状态（单选或多选）
4. 使用 Map 建立 id -> node 映射加速查找
`,

  codeExample: {
    title: "树形组件核心实现",
    language: "typescript",
    code: `interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeProps {
  data: TreeNode[];
  expandedIds?: Set<string>;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggle?: (id: string) => void;
}

// 递归树组件
function TreeView({ data, expandedIds, selectedId, onSelect, onToggle }: TreeProps) {
  return (
    <ul className="tree">
      {data.map(node => (
        <TreeItem
          key={node.id}
          node={node}
          expandedIds={expandedIds}
          selectedId={selectedId}
          onSelect={onSelect}
          onToggle={onToggle}
          level={0}
        />
      ))}
    </ul>
  );
}

function TreeItem({
  node,
  expandedIds,
  selectedId,
  onSelect,
  onToggle,
  level,
}: {
  node: TreeNode;
  expandedIds?: Set<string>;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggle?: (id: string) => void;
  level: number;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds?.has(node.id) ?? false;
  const isSelected = selectedId === node.id;

  return (
    <li>
      <div
        className={\`tree-item \${isSelected ? 'selected' : ''}\`}
        style={{ paddingLeft: level * 20 }}
        onClick={() => onSelect?.(node.id)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.(node.id);
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        <span>{node.label}</span>
      </div>

      {/* 递归渲染子节点 - DFS */}
      {hasChildren && isExpanded && (
        <ul>
          {node.children!.map(child => (
            <TreeItem
              key={child.id}
              node={child}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onSelect={onSelect}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// DFS 遍历查找节点
function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

// DFS 获取所有后代 ID（用于全选/取消）
function getAllDescendantIds(node: TreeNode): string[] {
  const ids: string[] = [];

  function dfs(n: TreeNode) {
    ids.push(n.id);
    n.children?.forEach(dfs);
  }

  dfs(node);
  return ids;
}

// BFS 查找所有祖先（用于展开路径）
function findAncestors(nodes: TreeNode[], targetId: string): string[] {
  const parentMap = new Map<string, string>();

  // 建立 child -> parent 映射
  function buildMap(nodeList: TreeNode[], parentId: string | null) {
    for (const node of nodeList) {
      if (parentId) parentMap.set(node.id, parentId);
      if (node.children) buildMap(node.children, node.id);
    }
  }

  buildMap(nodes, null);

  // 回溯找祖先
  const ancestors: string[] = [];
  let currentId = targetId;
  while (parentMap.has(currentId)) {
    const parentId = parentMap.get(currentId)!;
    ancestors.push(parentId);
    currentId = parentId;
  }

  return ancestors;
}`,
    explanation: "递归组件天然实现 DFS 渲染。辅助函数用于查找、展开路径等操作。",
    keyPoints: [
      "递归组件 = DFS 渲染",
      "level 参数控制缩进",
      "expandedIds Set 控制展开状态",
      "建立 parentMap 加速祖先查找",
    ],
  },

  realWorldExamples: [
    "VSCode 文件资源管理器",
    "Antd Tree 组件",
    "文件上传的目录选择",
    "组织架构图",
    "评论嵌套回复",
  ],

  relatedProblems: [
    "maximum-depth-of-binary-tree",
    "binary-tree-level-order-traversal",
    "lowest-common-ancestor-of-a-binary-tree",
    "serialize-and-deserialize-binary-tree",
  ],

  advancedTopics: [
    "虚拟化大型树（只渲染可见节点）",
    "拖拽排序",
    "懒加载子节点",
    "多选和半选状态",
  ],
};

// ==================== Diff 算法 ====================

export const diffAlgorithmScenario: FrontendScenario = {
  id: "diff-algorithm",
  name: "Diff 算法",
  category: "data-processing",
  description: "比较两个序列的差异，用于 Virtual DOM 更新和文本比较",

  algorithms: [
    {
      algorithmId: "longest-common-subsequence",
      algorithmName: "最长公共子序列 (LCS)",
      usage: "找出两个序列的公共部分",
      importance: "core",
    },
    {
      algorithmId: "edit-distance",
      algorithmName: "编辑距离",
      usage: "计算最小修改次数",
      importance: "core",
    },
  ],

  problemStatement: `
前端 Diff 需求：
1. Virtual DOM Diff：找出新旧虚拟 DOM 树的差异，最小化真实 DOM 操作
2. 文本 Diff：代码 review、版本对比
3. 列表 Diff：找出列表项的增删移动

核心问题：如何高效比较两个序列的差异？
`,

  whyThisAlgorithm: `
**最长公共子序列 (LCS)**：
- 找出两个序列共有的部分（保持顺序）
- 差异 = 总长度 - LCS 长度
- 时间复杂度 O(mn)，可用于文本 diff

**编辑距离**：
- 计算最小的插入/删除/替换次数
- 可以回溯出具体的编辑路径
- 用于模糊匹配、拼写检查
`,

  implementation: `
1. 使用 DP 计算 LCS 或编辑距离
2. 回溯 DP 表格得到具体差异
3. Virtual DOM 通常使用更简化的 O(n) 算法（同层比较 + key）
`,

  codeExample: {
    title: "简化版 Diff 实现",
    language: "typescript",
    code: `// 最长公共子序列
function lcs(text1: string, text2: string): string {
  const m = text1.length, n = text2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 回溯找出 LCS
  let i = m, j = n;
  const result: string[] = [];
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      result.unshift(text1[i - 1]);
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result.join('');
}

// 生成 Diff 输出
interface DiffResult {
  type: 'equal' | 'add' | 'remove';
  content: string;
}

function diff(oldText: string, newText: string): DiffResult[] {
  const common = lcs(oldText, newText);
  const result: DiffResult[] = [];

  let oi = 0, ni = 0, ci = 0;

  while (ci < common.length) {
    // 旧文本中被删除的
    while (oldText[oi] !== common[ci]) {
      result.push({ type: 'remove', content: oldText[oi] });
      oi++;
    }
    // 新文本中新增的
    while (newText[ni] !== common[ci]) {
      result.push({ type: 'add', content: newText[ni] });
      ni++;
    }
    // 相同的部分
    result.push({ type: 'equal', content: common[ci] });
    oi++; ni++; ci++;
  }

  // 处理剩余部分
  while (oi < oldText.length) {
    result.push({ type: 'remove', content: oldText[oi++] });
  }
  while (ni < newText.length) {
    result.push({ type: 'add', content: newText[ni++] });
  }

  return result;
}

// React 列表 Diff 简化版（基于 key）
function diffList<T extends { key: string }>(
  oldList: T[],
  newList: T[]
): { type: 'add' | 'remove' | 'move' | 'keep'; item: T; fromIndex?: number; toIndex?: number }[] {
  const oldMap = new Map(oldList.map((item, i) => [item.key, { item, index: i }]));
  const newMap = new Map(newList.map((item, i) => [item.key, { item, index: i }]));
  const ops: any[] = [];

  // 找出需要删除的
  for (const [key, { item, index }] of oldMap) {
    if (!newMap.has(key)) {
      ops.push({ type: 'remove', item, fromIndex: index });
    }
  }

  // 找出需要添加或移动的
  for (const [key, { item, index: toIndex }] of newMap) {
    const old = oldMap.get(key);
    if (!old) {
      ops.push({ type: 'add', item, toIndex });
    } else if (old.index !== toIndex) {
      ops.push({ type: 'move', item, fromIndex: old.index, toIndex });
    } else {
      ops.push({ type: 'keep', item, fromIndex: old.index, toIndex });
    }
  }

  return ops;
}`,
    explanation: "LCS 找出公共部分，差异就是不在公共部分的元素。列表 Diff 使用 key 加速。",
    keyPoints: [
      "LCS 是 Diff 的核心",
      "回溯 DP 表格得到具体差异",
      "列表 Diff 使用 key 优化",
      "React/Vue 的 Diff 更复杂但思想类似",
    ],
  },

  performanceComparison: {
    naive: {
      approach: "暴力比较",
      timeComplexity: "O(n²) 或更高",
      spaceComplexity: "O(n)",
    },
    optimized: {
      approach: "LCS + DP",
      timeComplexity: "O(mn)",
      spaceComplexity: "O(mn)，可优化到 O(n)",
    },
    improvement: "Virtual DOM Diff 使用 O(n) 同层比较 + key",
  },

  realWorldExamples: [
    "React Virtual DOM Diff",
    "Vue Template Diff",
    "Git Diff",
    "Monaco Editor 差异视图",
    "代码 Review 工具",
  ],

  relatedProblems: [
    "longest-common-subsequence",
    "edit-distance",
    "delete-operation-for-two-strings",
  ],

  advancedTopics: [
    "Myers Diff 算法（Git 使用）",
    "Virtual DOM 的 O(n) Diff",
    "Fiber 架构的增量 Diff",
    "语义化 Diff（理解代码结构）",
  ],
};

// ==================== 权限系统 ====================

export const permissionSystemScenario: FrontendScenario = {
  id: "permission-system",
  name: "权限系统",
  category: "data-structure",
  description: "基于角色的访问控制 (RBAC) 和权限树遍历",

  algorithms: [
    {
      algorithmId: "dfs",
      algorithmName: "深度优先搜索",
      usage: "遍历权限树，检查继承权限",
      importance: "core",
    },
    {
      algorithmId: "hash-table",
      algorithmName: "哈希表",
      usage: "O(1) 权限查找",
      importance: "core",
    },
    {
      algorithmId: "bit-manipulation",
      algorithmName: "位运算",
      usage: "高效存储和检查多个权限",
      importance: "optional",
    },
  ],

  problemStatement: `
前端权限控制需求：
1. 根据用户角色显示/隐藏菜单
2. 控制按钮的可用状态
3. 处理权限继承（管理员 > 编辑 > 查看）
4. 支持多角色组合

需要高效的权限检查机制。
`,

  whyThisAlgorithm: `
**DFS**：权限可能有继承关系（树形），需要递归检查。

**哈希表**：O(1) 判断是否有某个权限。

**位运算**：如果权限是枚举型的，可以用位来表示，非常高效。
- 读=1, 写=2, 删除=4
- 全部权限 = 1|2|4 = 7
- 检查写权限 = (perm & 2) !== 0
`,

  implementation: `
1. 定义权限树结构
2. 用户登录时获取权限列表
3. 存入 Set/位图 加速查找
4. 组件/路由使用权限检查
`,

  codeExample: {
    title: "权限系统实现",
    language: "typescript",
    code: `// 权限定义
interface Permission {
  id: string;
  name: string;
  parent?: string;  // 父权限，用于继承
}

// 角色定义
interface Role {
  id: string;
  name: string;
  permissions: string[];
}

// 权限管理类
class PermissionManager {
  private permissionTree: Map<string, Permission> = new Map();
  private userPermissions: Set<string> = new Set();

  // 初始化权限树
  initPermissions(permissions: Permission[]) {
    for (const perm of permissions) {
      this.permissionTree.set(perm.id, perm);
    }
  }

  // 设置用户权限（展开继承）
  setUserPermissions(permissions: string[]) {
    this.userPermissions.clear();

    // DFS 展开所有子权限
    const expand = (permId: string) => {
      this.userPermissions.add(permId);

      // 找所有子权限
      for (const [id, perm] of this.permissionTree) {
        if (perm.parent === permId && !this.userPermissions.has(id)) {
          expand(id);
        }
      }
    };

    for (const perm of permissions) {
      expand(perm);
    }
  }

  // O(1) 检查权限
  hasPermission(permissionId: string): boolean {
    return this.userPermissions.has(permissionId);
  }

  // 检查多个权限（全部满足）
  hasAllPermissions(permissionIds: string[]): boolean {
    return permissionIds.every(id => this.userPermissions.has(id));
  }

  // 检查多个权限（任一满足）
  hasAnyPermission(permissionIds: string[]): boolean {
    return permissionIds.some(id => this.userPermissions.has(id));
  }
}

// 位运算版本（更高效，适合简单权限）
enum PermissionFlag {
  READ = 1 << 0,    // 1
  WRITE = 1 << 1,   // 2
  DELETE = 1 << 2,  // 4
  ADMIN = 1 << 3,   // 8
}

class BitPermission {
  private flags: number = 0;

  grant(permission: PermissionFlag) {
    this.flags |= permission;
  }

  revoke(permission: PermissionFlag) {
    this.flags &= ~permission;
  }

  has(permission: PermissionFlag): boolean {
    return (this.flags & permission) !== 0;
  }

  hasAll(permissions: PermissionFlag): boolean {
    return (this.flags & permissions) === permissions;
  }
}

// React 权限组件
const PermissionContext = createContext<PermissionManager | null>(null);

function RequirePermission({
  permission,
  children,
  fallback = null,
}: {
  permission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const manager = useContext(PermissionContext);

  const hasPermission = Array.isArray(permission)
    ? manager?.hasAnyPermission(permission)
    : manager?.hasPermission(permission);

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}

// 使用示例
function AdminPanel() {
  return (
    <RequirePermission permission="admin" fallback={<NoAccess />}>
      <h1>管理面板</h1>
      <RequirePermission permission="user:delete">
        <button>删除用户</button>
      </RequirePermission>
    </RequirePermission>
  );
}`,
    explanation: "DFS 展开继承权限，Set 提供 O(1) 查找，位运算适合简单场景。",
    keyPoints: [
      "权限树支持继承",
      "Set 提供 O(1) 查找",
      "位运算更高效但不够灵活",
      "React Context 注入权限管理器",
    ],
  },

  realWorldExamples: [
    "后台管理系统菜单权限",
    "按钮级别权限控制",
    "SaaS 多租户权限",
    "GitHub 仓库权限",
  ],

  relatedProblems: [
    "number-of-1-bits",
    "power-of-two",
    "subsets", // 生成权限组合
  ],

  advancedTopics: [
    "ABAC (基于属性的访问控制)",
    "权限缓存和失效",
    "细粒度数据权限",
    "权限审计日志",
  ],
};

// ==================== 导出所有场景 ====================

export const frontendScenarios: Record<string, FrontendScenario> = {
  "virtual-list": virtualListScenario,
  "lru-cache": lruCacheScenario,
  "debounce-throttle": debounceThrottleScenario,
  "tree-component": treeComponentScenario,
  "diff-algorithm": diffAlgorithmScenario,
  "permission-system": permissionSystemScenario,
};

export const allScenarios = Object.values(frontendScenarios);

// 按类别获取场景
export function getScenariosByCategory(category: ScenarioCategory): FrontendScenario[] {
  return allScenarios.filter(s => s.category === category);
}

// 根据算法获取相关场景
export function getScenariosForAlgorithm(algorithmId: string): FrontendScenario[] {
  return allScenarios.filter(s =>
    s.algorithms.some(a => a.algorithmId === algorithmId)
  );
}

// 获取场景中使用的所有算法
export function getAlgorithmsInScenario(scenarioId: string): AlgorithmMapping[] {
  const scenario = frontendScenarios[scenarioId];
  return scenario?.algorithms ?? [];
}
