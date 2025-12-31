/**
 * 前端实战案例库
 *
 * 解决问题：学了算法不知道有什么用
 * 核心功能：展示算法在前端真实场景中的应用
 */

import { FrontendCase } from "../../types/roadmap";

export type { FrontendCase } from "../../types/roadmap";

// ==================== 虚拟列表 ====================
export const virtualListCase: FrontendCase = {
  id: "virtual-list",
  title: "虚拟列表/虚拟滚动",
  description: "渲染万级列表时，只渲染可视区域的元素，大幅提升性能",
  category: "performance",

  relatedAlgorithms: [
    {
      algorithmName: "二分查找",
      problemIds: ["binary-search", "search-insert-position"],
      explanation: "根据滚动位置快速计算应该渲染哪些元素（找到起始索引）",
    },
    {
      algorithmName: "滑动窗口",
      problemIds: ["sliding-window-maximum"],
      explanation: "可视区域就是一个滑动窗口，窗口随滚动移动",
    },
  ],

  scenario: {
    background: "电商平台商品列表、聊天记录、日志查看器等场景需要展示大量数据",
    problem: "直接渲染 10000+ 条数据会导致页面卡顿，内存占用过高",
    requirement: "实现流畅的长列表滚动，保持 60fps 渲染性能",
  },

  solution: {
    approach: `
1. 计算可视区域能显示多少条目
2. 根据滚动位置计算起始索引（二分查找）
3. 只渲染可视区域 + 缓冲区的元素
4. 使用 transform 模拟完整列表高度
    `,
    code: `interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function VirtualList<T>({ items, itemHeight, containerHeight, renderItem }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  // 计算可视区域参数
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const buffer = 5; // 缓冲区大小

  // 二分查找起始索引（这里简化为直接计算）
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(items.length, startIndex + visibleCount + 2 * buffer);

  // 只渲染可视区域的元素
  const visibleItems = items.slice(startIndex, endIndex);

  // 总高度（撑开滚动条）
  const totalHeight = items.length * itemHeight;

  // 偏移量（让可视元素定位到正确位置）
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, i) => renderItem(item, startIndex + i))}
        </div>
      </div>
    </div>
  );
}`,
    keyPoints: [
      "只渲染可视区域的 DOM 节点，而不是全部",
      "使用 transform 而非 top/margin 来定位，避免重排",
      "添加缓冲区避免快速滚动时出现空白",
      "动态高度场景需要用二分查找定位",
    ],
  },

  performance: {
    before: {
      description: "直接渲染 10000 个列表项",
      metrics: "首次渲染 3-5s，滚动时 FPS 低于 30，内存占用 500MB+",
    },
    after: {
      description: "虚拟滚动只渲染可视区域",
      metrics: "首次渲染 <100ms，滚动 60fps，内存占用 <50MB",
    },
  },

  references: [
    { title: "react-virtualized", url: "https://github.com/bvaughn/react-virtualized" },
    { title: "react-window", url: "https://github.com/bvaughn/react-window" },
  ],
};

// ==================== DOM Diff ====================
export const domDiffCase: FrontendCase = {
  id: "dom-diff",
  title: "虚拟 DOM Diff 算法",
  description: "React/Vue 核心原理，高效对比新旧虚拟 DOM 树，最小化 DOM 操作",
  category: "component",

  relatedAlgorithms: [
    {
      algorithmName: "最长递增子序列",
      problemIds: ["longest-increasing-subsequence"],
      explanation: "Vue3 使用 LIS 算法优化节点移动，找到最少移动次数",
    },
    {
      algorithmName: "树的遍历",
      problemIds: ["binary-tree-level-order-traversal", "same-tree"],
      explanation: "Diff 本质是树的对比，需要遍历树结构",
    },
    {
      algorithmName: "双指针",
      problemIds: ["two-sum", "merge-sorted-array"],
      explanation: "Vue3 用双端 Diff，React 用单指针遍历",
    },
  ],

  scenario: {
    background: "前端框架需要高效更新 UI，直接操作 DOM 性能差",
    problem: "如何快速找出新旧虚拟 DOM 的差异，最小化真实 DOM 操作",
    requirement: "实现高效的 Diff 算法，时间复杂度从 O(n³) 优化到 O(n)",
  },

  solution: {
    approach: `
1. 同层比较：只比较同一层级的节点，不跨层移动
2. Key 的作用：通过 key 识别节点身份，判断是否可复用
3. 双端 Diff：同时从新旧列表两端开始比较
4. LIS 优化：对于乱序节点，找最长递增子序列，最小化移动
    `,
    code: `// 简化版 Diff 核心逻辑
function diff(oldChildren: VNode[], newChildren: VNode[]) {
  const result: Patch[] = [];

  // 建立旧节点 key -> index 映射
  const keyToIndex = new Map<string, number>();
  oldChildren.forEach((child, i) => {
    if (child.key) keyToIndex.set(child.key, i);
  });

  // 找出需要移动的节点
  const toMove: number[] = [];
  newChildren.forEach((newChild, newIndex) => {
    const oldIndex = keyToIndex.get(newChild.key);
    if (oldIndex !== undefined) {
      toMove.push(oldIndex);
    }
  });

  // 使用 LIS 算法找出不需要移动的节点
  const lis = longestIncreasingSubsequence(toMove);

  // LIS 中的节点保持不动，其他节点需要移动
  // ...
}

// 最长递增子序列（Vue3 核心优化）
function longestIncreasingSubsequence(arr: number[]): number[] {
  const n = arr.length;
  const dp = new Array(n).fill(1);
  const prev = new Array(n).fill(-1);

  let maxLen = 0, maxIndex = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      maxIndex = i;
    }
  }

  // 回溯找出 LIS
  const result: number[] = [];
  let index = maxIndex;
  while (index !== -1) {
    result.unshift(index);
    index = prev[index];
  }

  return result;
}`,
    keyPoints: [
      "同层比较将 O(n³) 降为 O(n)",
      "key 帮助识别节点，避免不必要的销毁重建",
      "LIS 保证移动次数最少（Vue3 优化）",
      "React 用 Fiber 架构实现可中断的 Diff",
    ],
  },

  references: [
    { title: "Vue3 Diff 源码", url: "https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts" },
    { title: "React Reconciliation", url: "https://reactjs.org/docs/reconciliation.html" },
  ],
};

// ==================== LRU 缓存 ====================
export const lruCacheCase: FrontendCase = {
  id: "lru-cache",
  title: "LRU 缓存机制",
  description: "实现最近最少使用缓存，用于接口缓存、组件缓存等场景",
  category: "data-structure",

  relatedAlgorithms: [
    {
      algorithmName: "LRU Cache 设计",
      problemIds: ["lru-cache"],
      explanation: "这道题就是实现 LRU，核心是 Map + 双向链表",
    },
    {
      algorithmName: "哈希表",
      problemIds: ["two-sum"],
      explanation: "使用 Map 实现 O(1) 查找",
    },
  ],

  scenario: {
    background: "SPA 应用中，频繁请求相同数据造成资源浪费",
    problem: "需要缓存 API 响应，但内存有限，需要淘汰策略",
    requirement: "实现 LRU 缓存，get/put 操作 O(1) 时间复杂度",
  },

  solution: {
    approach: `
1. 使用 Map 保证插入顺序
2. get 时将元素移到末尾（最近使用）
3. put 时检查容量，超出则删除最早的元素
4. JavaScript Map 天然保持插入顺序，可以简化实现
    `,
    code: `class LRUCache<K, V> {
  private cache: Map<K, V>;
  private capacity: number;

  constructor(capacity: number) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }

    // 获取值并移到末尾（最近使用）
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    // 如果已存在，先删除（后面会重新插入到末尾）
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // 超出容量，删除最早的元素（Map 的第一个）
    if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // 插入新值到末尾
    this.cache.set(key, value);
  }
}

// 使用示例：API 请求缓存
const apiCache = new LRUCache<string, any>(100);

async function fetchWithCache(url: string) {
  const cached = apiCache.get(url);
  if (cached) {
    return cached;
  }

  const response = await fetch(url);
  const data = await response.json();
  apiCache.put(url, data);
  return data;
}`,
    keyPoints: [
      "JavaScript Map 保持插入顺序，简化实现",
      "get 操作需要更新使用时间（移到末尾）",
      "容量满时淘汰最久未使用的（Map 第一个元素）",
      "可扩展：添加 TTL、持久化等功能",
    ],
  },

  references: [
    { title: "LeetCode 146. LRU Cache", url: "https://leetcode.com/problems/lru-cache/" },
  ],
};

// ==================== 防抖节流 ====================
export const debounceThrottleCase: FrontendCase = {
  id: "debounce-throttle",
  title: "防抖与节流",
  description: "控制函数执行频率，优化高频事件处理性能",
  category: "utility",

  relatedAlgorithms: [
    {
      algorithmName: "滑动窗口思想",
      problemIds: ["sliding-window-maximum"],
      explanation: "节流的时间窗口类似滑动窗口，在窗口内只执行一次",
    },
  ],

  scenario: {
    background: "scroll、resize、input 等事件触发频率极高",
    problem: "频繁触发事件处理函数导致性能问题，如：搜索建议请求过多",
    requirement: "控制函数执行频率，减少不必要的计算和请求",
  },

  solution: {
    approach: `
防抖（Debounce）：等待停止触发后执行
- 适用场景：搜索输入、窗口 resize

节流（Throttle）：固定频率执行
- 适用场景：滚动事件、按钮点击
    `,
    code: `// 防抖：等用户停止输入后再搜索
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    // 如果有待执行的定时器，取消它
    if (timer) {
      clearTimeout(timer);
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 节流：固定频率执行
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();

    // 距离上次执行超过间隔才执行
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 使用示例
const searchInput = document.getElementById('search');

// 防抖：用户停止输入 300ms 后才发请求
searchInput.addEventListener('input', debounce((e) => {
  console.log('搜索:', e.target.value);
  // fetch('/api/search?q=' + e.target.value);
}, 300));

// 节流：滚动时每 100ms 最多执行一次
window.addEventListener('scroll', throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 100));`,
    keyPoints: [
      "防抖重置定时器，节流检查时间间隔",
      "防抖适合最终状态，节流适合持续反馈",
      "可以添加 leading/trailing 选项控制首尾执行",
      "React 中可以用 useDeferredValue 实现类似效果",
    ],
  },
};

// ==================== 路径查找 ====================
export const pathFindingCase: FrontendCase = {
  id: "path-finding",
  title: "路径查找/导航算法",
  description: "游戏 AI、地图导航等场景的路径规划算法",
  category: "component",

  relatedAlgorithms: [
    {
      algorithmName: "BFS 广度优先搜索",
      problemIds: ["number-of-islands", "rotting-oranges"],
      explanation: "无权图最短路径用 BFS",
    },
    {
      algorithmName: "DFS 深度优先搜索",
      problemIds: ["number-of-islands"],
      explanation: "探索所有可能路径用 DFS",
    },
  ],

  scenario: {
    background: "H5 游戏中的角色自动寻路、可视化编辑器的连线功能",
    problem: "需要找到从 A 点到 B 点的路径，可能有障碍物",
    requirement: "找到最短路径或任意可行路径",
  },

  solution: {
    approach: `
1. 将地图抽象为网格/图结构
2. 使用 BFS 找最短路径（每步代价相同）
3. 使用 A* 算法优化搜索效率（有启发函数）
    `,
    code: `// BFS 寻路
function findPath(
  grid: number[][],
  start: [number, number],
  end: [number, number]
): [number, number][] | null {
  const m = grid.length, n = grid[0].length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  // BFS 队列：[x, y, 路径]
  const queue: [number, number, [number, number][]][] = [[...start, [start]]];
  const visited = new Set<string>();
  visited.add(\`\${start[0]},\${start[1]}\`);

  while (queue.length > 0) {
    const [x, y, path] = queue.shift()!;

    // 到达终点
    if (x === end[0] && y === end[1]) {
      return path;
    }

    // 探索四个方向
    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      const key = \`\${nx},\${ny}\`;

      // 检查边界、障碍物、已访问
      if (
        nx >= 0 && nx < m &&
        ny >= 0 && ny < n &&
        grid[nx][ny] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nx, ny, [...path, [nx, ny]]]);
      }
    }
  }

  return null; // 无路可达
}

// 使用示例
const grid = [
  [0, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 1, 0],
];

const path = findPath(grid, [0, 0], [3, 3]);
console.log(path);
// [[0,0], [0,1], [0,2], [1,2], [2,2], [2,3], [3,3]]`,
    keyPoints: [
      "BFS 保证找到最短路径",
      "用 Set 记录已访问位置避免重复",
      "A* 算法用启发函数加速搜索",
      "可扩展：不同地形权重、斜向移动等",
    ],
  },
};

// ==================== 表单验证 ====================
export const formValidationCase: FrontendCase = {
  id: "form-validation",
  title: "复杂表单验证",
  description: "处理表单联动验证、异步验证等复杂场景",
  category: "utility",

  relatedAlgorithms: [
    {
      algorithmName: "拓扑排序",
      problemIds: ["course-schedule"],
      explanation: "处理字段间的依赖关系，确定验证顺序",
    },
    {
      algorithmName: "图的遍历",
      problemIds: ["clone-graph"],
      explanation: "字段依赖构成图结构，需要图遍历",
    },
  ],

  scenario: {
    background: "复杂表单中字段相互依赖，如：结束日期 > 开始日期",
    problem: "字段间存在依赖，一个字段变化可能触发多个字段重新验证",
    requirement: "高效处理字段依赖，避免循环验证",
  },

  solution: {
    approach: `
1. 构建字段依赖图
2. 使用拓扑排序确定验证顺序
3. 字段变化时触发依赖字段重新验证
    `,
    code: `interface Field {
  name: string;
  value: any;
  dependencies: string[];  // 依赖的字段
  validate: (value: any, formValues: Record<string, any>) => string | null;
}

class FormValidator {
  private fields: Map<string, Field> = new Map();
  private errors: Map<string, string> = new Map();

  addField(field: Field) {
    this.fields.set(field.name, field);
  }

  // 拓扑排序获取验证顺序
  private getValidationOrder(): string[] {
    const inDegree = new Map<string, number>();
    const graph = new Map<string, string[]>();

    // 初始化
    this.fields.forEach((_, name) => {
      inDegree.set(name, 0);
      graph.set(name, []);
    });

    // 构建依赖图
    this.fields.forEach((field) => {
      field.dependencies.forEach((dep) => {
        graph.get(dep)?.push(field.name);
        inDegree.set(field.name, (inDegree.get(field.name) || 0) + 1);
      });
    });

    // BFS 拓扑排序
    const queue: string[] = [];
    const result: string[] = [];

    inDegree.forEach((degree, name) => {
      if (degree === 0) queue.push(name);
    });

    while (queue.length > 0) {
      const name = queue.shift()!;
      result.push(name);

      graph.get(name)?.forEach((next) => {
        inDegree.set(next, inDegree.get(next)! - 1);
        if (inDegree.get(next) === 0) {
          queue.push(next);
        }
      });
    }

    return result;
  }

  validate(): boolean {
    const order = this.getValidationOrder();
    const values: Record<string, any> = {};

    this.fields.forEach((field, name) => {
      values[name] = field.value;
    });

    // 按拓扑顺序验证
    order.forEach((name) => {
      const field = this.fields.get(name)!;
      const error = field.validate(field.value, values);
      if (error) {
        this.errors.set(name, error);
      } else {
        this.errors.delete(name);
      }
    });

    return this.errors.size === 0;
  }
}`,
    keyPoints: [
      "用图表示字段依赖关系",
      "拓扑排序确保依赖字段先验证",
      "检测循环依赖避免死循环",
      "增量验证：只验证变化影响的字段",
    ],
  },
};

// ==================== 权限控制 ====================
export const permissionCase: FrontendCase = {
  id: "permission-control",
  title: "RBAC 权限控制",
  description: "基于角色的权限控制系统，支持权限继承",
  category: "data-structure",

  relatedAlgorithms: [
    {
      algorithmName: "树的遍历",
      problemIds: ["binary-tree-inorder-traversal"],
      explanation: "权限树的遍历和继承计算",
    },
    {
      algorithmName: "DFS",
      problemIds: ["path-sum"],
      explanation: "查找权限路径，判断是否有某权限",
    },
  ],

  scenario: {
    background: "后台管理系统需要精细化的权限控制",
    problem: "权限存在层级关系，需要支持继承和覆盖",
    requirement: "实现高效的权限查询，O(1) 判断用户是否有某权限",
  },

  solution: {
    approach: `
1. 权限组织为树形结构
2. 角色继承父角色权限
3. 预计算权限集合，查询 O(1)
    `,
    code: `interface Permission {
  id: string;
  name: string;
  children?: Permission[];
}

interface Role {
  id: string;
  name: string;
  permissions: string[];  // 直接权限
  parent?: string;        // 父角色
}

class PermissionManager {
  private permissionTree: Permission[];
  private roles: Map<string, Role> = new Map();
  private rolePermissions: Map<string, Set<string>> = new Map();

  constructor(permissionTree: Permission[], roles: Role[]) {
    this.permissionTree = permissionTree;
    roles.forEach((role) => this.roles.set(role.id, role));
    this.computeAllPermissions();
  }

  // DFS 获取权限节点及其所有子权限
  private getAllChildPermissions(permission: Permission): string[] {
    const result = [permission.id];

    if (permission.children) {
      for (const child of permission.children) {
        result.push(...this.getAllChildPermissions(child));
      }
    }

    return result;
  }

  // 预计算每个角色的所有权限（包括继承的）
  private computeAllPermissions() {
    const compute = (roleId: string): Set<string> => {
      if (this.rolePermissions.has(roleId)) {
        return this.rolePermissions.get(roleId)!;
      }

      const role = this.roles.get(roleId)!;
      const permissions = new Set(role.permissions);

      // 继承父角色权限
      if (role.parent) {
        const parentPerms = compute(role.parent);
        parentPerms.forEach((p) => permissions.add(p));
      }

      this.rolePermissions.set(roleId, permissions);
      return permissions;
    };

    this.roles.forEach((_, roleId) => compute(roleId));
  }

  // O(1) 查询权限
  hasPermission(roleId: string, permissionId: string): boolean {
    const permissions = this.rolePermissions.get(roleId);
    return permissions?.has(permissionId) ?? false;
  }
}`,
    keyPoints: [
      "权限树支持层级结构",
      "角色继承实现权限复用",
      "预计算避免重复遍历",
      "可扩展：权限组、时效权限等",
    ],
  },
};

// ==================== 文件上传 ====================
export const fileUploadCase: FrontendCase = {
  id: "file-upload",
  title: "大文件分片上传",
  description: "将大文件切片并行上传，支持断点续传",
  category: "performance",

  relatedAlgorithms: [
    {
      algorithmName: "分治思想",
      problemIds: ["merge-sort", "maximum-subarray"],
      explanation: "大文件拆分为小片段处理，最后合并",
    },
    {
      algorithmName: "哈希",
      problemIds: ["two-sum"],
      explanation: "计算文件/分片哈希，用于断点续传和秒传",
    },
  ],

  scenario: {
    background: "上传大文件（如视频）时，容易失败或超时",
    problem: "大文件上传慢、易失败、无法恢复",
    requirement: "实现分片上传、断点续传、秒传功能",
  },

  solution: {
    approach: `
1. 文件切片：将大文件切成固定大小的块
2. 计算哈希：用于标识文件和分片
3. 并行上传：多个分片同时上传
4. 断点续传：记录已上传分片，重试只传未完成的
    `,
    code: `interface FileChunk {
  index: number;
  chunk: Blob;
  hash: string;
}

class ChunkedUploader {
  private chunkSize = 2 * 1024 * 1024; // 2MB
  private concurrency = 3; // 并发数

  async upload(file: File): Promise<void> {
    // 1. 计算文件哈希（用于秒传判断）
    const fileHash = await this.calculateHash(file);

    // 2. 检查是否可以秒传
    const uploaded = await this.checkUploaded(fileHash);
    if (uploaded) {
      console.log('秒传成功');
      return;
    }

    // 3. 获取已上传的分片（断点续传）
    const uploadedChunks = await this.getUploadedChunks(fileHash);

    // 4. 切片
    const chunks = this.createChunks(file, fileHash);

    // 5. 过滤掉已上传的分片
    const toUpload = chunks.filter(
      (chunk) => !uploadedChunks.includes(chunk.index)
    );

    // 6. 并发上传
    await this.uploadChunks(toUpload, fileHash);

    // 7. 通知服务端合并
    await this.mergeChunks(fileHash, chunks.length);
  }

  private createChunks(file: File, fileHash: string): FileChunk[] {
    const chunks: FileChunk[] = [];
    let index = 0;

    for (let start = 0; start < file.size; start += this.chunkSize) {
      const chunk = file.slice(start, start + this.chunkSize);
      chunks.push({
        index: index++,
        chunk,
        hash: \`\${fileHash}-\${index}\`,
      });
    }

    return chunks;
  }

  private async uploadChunks(chunks: FileChunk[], fileHash: string) {
    // 控制并发数的上传
    const pool: Promise<void>[] = [];

    for (const chunk of chunks) {
      const task = this.uploadChunk(chunk, fileHash);
      pool.push(task);

      if (pool.length >= this.concurrency) {
        await Promise.race(pool);
        pool.splice(pool.findIndex((p) => p === task), 1);
      }
    }

    await Promise.all(pool);
  }

  private async uploadChunk(chunk: FileChunk, fileHash: string): Promise<void> {
    const formData = new FormData();
    formData.append('chunk', chunk.chunk);
    formData.append('hash', chunk.hash);
    formData.append('fileHash', fileHash);
    formData.append('index', String(chunk.index));

    await fetch('/api/upload', { method: 'POST', body: formData });
  }

  // 其他方法省略...
  private async calculateHash(file: File): Promise<string> { /* ... */ return ''; }
  private async checkUploaded(hash: string): Promise<boolean> { return false; }
  private async getUploadedChunks(hash: string): Promise<number[]> { return []; }
  private async mergeChunks(hash: string, total: number): Promise<void> { }
}`,
    keyPoints: [
      "分片大小通常 2-5MB，太小请求多，太大上传慢",
      "使用 Web Worker 计算哈希避免阻塞主线程",
      "控制并发数避免带宽占满",
      "前端记录进度，后端验证分片完整性",
    ],
  },
};

// ==================== 树形选择器 ====================
export const treeSelectorCase: FrontendCase = {
  id: "tree-selector",
  title: "树形选择器（级联选择）",
  description: "部门选择、分类选择等树形数据的交互处理",
  category: "component",

  relatedAlgorithms: [
    {
      algorithmName: "树的遍历",
      problemIds: ["binary-tree-level-order-traversal"],
      explanation: "遍历树节点处理选中状态",
    },
    {
      algorithmName: "DFS",
      problemIds: ["path-sum"],
      explanation: "递归更新子节点选中状态",
    },
  ],

  scenario: {
    background: "选择部门、地区、商品分类等树形数据",
    problem: "需要处理父子节点的选中联动：全选、半选状态",
    requirement: "选中父节点自动选中所有子节点，子节点全选则父节点也选中",
  },

  solution: {
    approach: `
1. 选中父节点：递归选中所有子节点
2. 取消父节点：递归取消所有子节点
3. 选中/取消子节点：向上检查父节点状态
    `,
    code: `interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

type CheckState = 'checked' | 'unchecked' | 'indeterminate';

function useTreeSelector(data: TreeNode[]) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  // DFS 获取所有子节点 ID
  const getAllChildIds = (node: TreeNode): string[] => {
    const ids = [node.id];
    node.children?.forEach((child) => {
      ids.push(...getAllChildIds(child));
    });
    return ids;
  };

  // 获取父节点路径
  const getParentPath = (targetId: string, nodes: TreeNode[], path: TreeNode[] = []): TreeNode[] | null => {
    for (const node of nodes) {
      if (node.id === targetId) {
        return path;
      }
      if (node.children) {
        const result = getParentPath(targetId, node.children, [...path, node]);
        if (result) return result;
      }
    }
    return null;
  };

  // 获取节点状态
  const getCheckState = (node: TreeNode): CheckState => {
    if (!node.children?.length) {
      return checkedIds.has(node.id) ? 'checked' : 'unchecked';
    }

    const childStates = node.children.map(getCheckState);
    if (childStates.every((s) => s === 'checked')) return 'checked';
    if (childStates.every((s) => s === 'unchecked')) return 'unchecked';
    return 'indeterminate';
  };

  // 切换节点选中状态
  const toggle = (node: TreeNode) => {
    const newChecked = new Set(checkedIds);
    const isChecked = checkedIds.has(node.id);

    // 获取所有子节点
    const allIds = getAllChildIds(node);

    if (isChecked) {
      // 取消选中：移除自己和所有子节点
      allIds.forEach((id) => newChecked.delete(id));
    } else {
      // 选中：添加自己和所有子节点
      allIds.forEach((id) => newChecked.add(id));
    }

    // 更新父节点状态
    const parents = getParentPath(node.id, data) || [];
    parents.reverse().forEach((parent) => {
      const childIds = parent.children?.map((c) => c.id) || [];
      const allChecked = childIds.every((id) => newChecked.has(id));
      if (allChecked) {
        newChecked.add(parent.id);
      } else {
        newChecked.delete(parent.id);
      }
    });

    setCheckedIds(newChecked);
  };

  return { checkedIds, getCheckState, toggle };
}`,
    keyPoints: [
      "三态：选中、未选中、半选（部分子节点选中）",
      "向下传递：选中父节点选中所有子节点",
      "向上更新：子节点变化更新父节点状态",
      "性能优化：大数据量用虚拟滚动",
    ],
  },
};

// ==================== 撤销重做 ====================
export const undoRedoCase: FrontendCase = {
  id: "undo-redo",
  title: "撤销/重做功能",
  description: "编辑器、画板等场景的操作历史管理",
  category: "data-structure",

  relatedAlgorithms: [
    {
      algorithmName: "栈",
      problemIds: ["valid-parentheses", "min-stack"],
      explanation: "使用两个栈分别存储撤销和重做操作",
    },
  ],

  scenario: {
    background: "可视化编辑器、富文本编辑器需要撤销重做功能",
    problem: "需要记录操作历史，支持任意撤销和重做",
    requirement: "实现 Ctrl+Z 撤销、Ctrl+Y 重做",
  },

  solution: {
    approach: `
1. 使用两个栈：undoStack 和 redoStack
2. 执行操作：压入 undoStack，清空 redoStack
3. 撤销：从 undoStack 弹出，压入 redoStack
4. 重做：从 redoStack 弹出，压入 undoStack
    `,
    code: `interface Action {
  type: string;
  payload: any;
  // 逆操作，用于撤销
  inverse: () => Action;
}

class UndoRedoManager<T> {
  private undoStack: T[] = [];
  private redoStack: T[] = [];
  private maxHistory: number;

  constructor(maxHistory = 50) {
    this.maxHistory = maxHistory;
  }

  // 执行新操作
  push(state: T) {
    this.undoStack.push(state);

    // 超出历史记录限制时删除最早的
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }

    // 新操作后清空重做栈
    this.redoStack = [];
  }

  // 撤销
  undo(): T | null {
    if (this.undoStack.length === 0) return null;

    const state = this.undoStack.pop()!;
    this.redoStack.push(state);
    return this.undoStack[this.undoStack.length - 1] || null;
  }

  // 重做
  redo(): T | null {
    if (this.redoStack.length === 0) return null;

    const state = this.redoStack.pop()!;
    this.undoStack.push(state);
    return state;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}

// React Hook 版本
function useUndoRedo<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  const undoStack = useRef<T[]>([initialState]);
  const redoStack = useRef<T[]>([]);
  const [, forceUpdate] = useState({});

  const set = (newState: T) => {
    undoStack.current.push(newState);
    redoStack.current = [];
    setState(newState);
  };

  const undo = () => {
    if (undoStack.current.length <= 1) return;
    const current = undoStack.current.pop()!;
    redoStack.current.push(current);
    setState(undoStack.current[undoStack.current.length - 1]);
  };

  const redo = () => {
    if (redoStack.current.length === 0) return;
    const state = redoStack.current.pop()!;
    undoStack.current.push(state);
    setState(state);
  };

  return {
    state,
    set,
    undo,
    redo,
    canUndo: undoStack.current.length > 1,
    canRedo: redoStack.current.length > 0,
  };
}`,
    keyPoints: [
      "双栈结构：undoStack 和 redoStack",
      "新操作会清空 redoStack",
      "可以存储完整状态或操作指令（Command 模式）",
      "限制历史记录数量避免内存问题",
    ],
  },
};

// 导出所有案例
export const allCases: FrontendCase[] = [
  virtualListCase,
  domDiffCase,
  lruCacheCase,
  debounceThrottleCase,
  pathFindingCase,
  formValidationCase,
  permissionCase,
  fileUploadCase,
  treeSelectorCase,
  undoRedoCase,
];

// 根据 ID 获取案例
export function getCaseById(id: string): FrontendCase | undefined {
  return allCases.find((c) => c.id === id);
}

// 根据分类获取案例
export function getCasesByCategory(category: FrontendCase["category"]): FrontendCase[] {
  return allCases.filter((c) => c.category === category);
}

// 根据关联算法题目获取案例
export function getCasesForProblem(problemId: string): FrontendCase[] {
  return allCases.filter((c) =>
    c.relatedAlgorithms.some((alg) => alg.problemIds.includes(problemId))
  );
}
