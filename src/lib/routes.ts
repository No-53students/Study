import fs from "fs";
import path from "path";

/**
 * 难度等级
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/**
 * 模块类型
 */
export type ModuleType = "hooks" | "components" | "patterns" | "algorithms" | "other";

/**
 * 路由信息接口
 */
export interface RouteInfo {
  /** 路由路径，如 /about */
  path: string;
  /** 路由名称，如 about */
  name: string;
  /** 显示名称，如 About */
  displayName: string;
  /** 难度等级 */
  difficulty?: DifficultyLevel;
  /** 所属模块 */
  module?: ModuleType;
  /** 排序权重（越小越靠前） */
  order?: number;
}

/**
 * 模块配置
 */
export interface ModuleConfig {
  title: string;
  subtitle: string;
  icon: string;
}

export const MODULE_CONFIG: Record<ModuleType, ModuleConfig> = {
  hooks: {
    title: "React Hooks",
    subtitle: "React 内置 Hooks 详解与实战",
    icon: "🪝",
  },
  components: {
    title: "React 组件",
    subtitle: "组件开发核心概念与模式",
    icon: "🧩",
  },
  patterns: {
    title: "设计模式",
    subtitle: "React 常用设计模式与最佳实践",
    icon: "📐",
  },
  algorithms: {
    title: "算法与数据结构",
    subtitle: "前端必备算法知识与实战",
    icon: "🧮",
  },
  other: {
    title: "其他",
    subtitle: "其他页面",
    icon: "📄",
  },
};

/**
 * 路由元数据配置
 */
interface RouteMetadata {
  difficulty: DifficultyLevel;
  module: ModuleType;
  order: number;
}

const ROUTES_METADATA: Record<string, RouteMetadata> = {
  // ==========================================
  // Hooks 模块 (1-100)
  // ==========================================
  // 入门级 (1-10)
  "use-state": { difficulty: "beginner", module: "hooks", order: 1 },
  "use-effect": { difficulty: "beginner", module: "hooks", order: 2 },
  "use-ref": { difficulty: "beginner", module: "hooks", order: 3 },
  "use-context": { difficulty: "beginner", module: "hooks", order: 4 },
  "use-reducer": { difficulty: "beginner", module: "hooks", order: 5 },
  "use-id": { difficulty: "beginner", module: "hooks", order: 6 },
  // 中级 (11-20)
  "use-memo": { difficulty: "intermediate", module: "hooks", order: 11 },
  "use-callback": { difficulty: "intermediate", module: "hooks", order: 12 },
  "use-layout-effect": { difficulty: "intermediate", module: "hooks", order: 13 },
  "use-imperative-handle": { difficulty: "intermediate", module: "hooks", order: 14 },
  "use-transition": { difficulty: "intermediate", module: "hooks", order: 15 },
  "use-deferred-value": { difficulty: "intermediate", module: "hooks", order: 16 },
  "use-form-status": { difficulty: "intermediate", module: "hooks", order: 17 },
  "use-action-state": { difficulty: "intermediate", module: "hooks", order: 18 },
  "use-optimistic": { difficulty: "intermediate", module: "hooks", order: 19 },
  // 高级 (21-30)
  use: { difficulty: "advanced", module: "hooks", order: 21 },
  "use-sync-external-store": { difficulty: "advanced", module: "hooks", order: 22 },
  "use-effect-event": { difficulty: "advanced", module: "hooks", order: 23 },
  "use-insertion-effect": { difficulty: "advanced", module: "hooks", order: 24 },
  "use-debug-value": { difficulty: "advanced", module: "hooks", order: 25 },

  // ==========================================
  // 组件模块 (101-200)
  // ==========================================
  // 入门级 (101-110)
  "component-basics": { difficulty: "beginner", module: "components", order: 101 },
  props: { difficulty: "beginner", module: "components", order: 102 },
  children: { difficulty: "beginner", module: "components", order: 103 },
  "conditional-rendering": { difficulty: "beginner", module: "components", order: 104 },
  "list-rendering": { difficulty: "beginner", module: "components", order: 105 },
  "event-handling": { difficulty: "beginner", module: "components", order: 106 },
  forms: { difficulty: "beginner", module: "components", order: 107 },
  // 中级 (111-120)
  composition: { difficulty: "intermediate", module: "components", order: 111 },
  "react-memo": { difficulty: "intermediate", module: "components", order: 112 },
  "forward-ref": { difficulty: "intermediate", module: "components", order: 113 },
  "suspense-lazy": { difficulty: "intermediate", module: "components", order: 114 },
  fragment: { difficulty: "intermediate", module: "components", order: 115 },
  portal: { difficulty: "intermediate", module: "components", order: 116 },
  context: { difficulty: "intermediate", module: "components", order: 117 },
  // 高级 (121-130)
  "error-boundary": { difficulty: "advanced", module: "components", order: 121 },
  hoc: { difficulty: "advanced", module: "components", order: 122 },
  "render-props": { difficulty: "advanced", module: "components", order: 123 },
  "compound-components": { difficulty: "advanced", module: "components", order: 124 },
  "controlled-uncontrolled": { difficulty: "advanced", module: "components", order: 125 },

  // ==========================================
  // 数据结构模块 (201-210)
  // ==========================================
  stack: { difficulty: "beginner", module: "algorithms", order: 201 },
  queue: { difficulty: "beginner", module: "algorithms", order: 202 },
  "linked-list": { difficulty: "beginner", module: "algorithms", order: 203 },
  "hash-table": { difficulty: "beginner", module: "algorithms", order: 204 },
  "binary-tree": { difficulty: "intermediate", module: "algorithms", order: 205 },

  // ==========================================
  // 算法技巧模块 (211-230)
  // ==========================================
  sorting: { difficulty: "intermediate", module: "algorithms", order: 211 },
  searching: { difficulty: "intermediate", module: "algorithms", order: 212 },
  "two-pointers": { difficulty: "intermediate", module: "algorithms", order: 213 },
  "sliding-window": { difficulty: "intermediate", module: "algorithms", order: 214 },
  backtracking: { difficulty: "intermediate", module: "algorithms", order: 215 },
  "dynamic-programming": { difficulty: "advanced", module: "algorithms", order: 216 },
  "bit-manipulation": { difficulty: "advanced", module: "algorithms", order: 217 },
  graph: { difficulty: "advanced", module: "algorithms", order: 218 },
  heap: { difficulty: "intermediate", module: "algorithms", order: 219 },
  algorithms: { difficulty: "beginner", module: "algorithms", order: 220 },
  "frontend-algorithms": { difficulty: "advanced", module: "algorithms", order: 221 },

  // ==========================================
  // 刷题训练模块 (231-240)
  // ==========================================
  problems: { difficulty: "beginner", module: "algorithms", order: 231 },
  leetcode: { difficulty: "intermediate", module: "algorithms", order: 232 },
  roadmap: { difficulty: "beginner", module: "algorithms", order: 233 },
  cases: { difficulty: "intermediate", module: "algorithms", order: 234 },
  templates: { difficulty: "beginner", module: "algorithms", order: 235 },

  // ==========================================
  // 学习资源模块 (241-250)
  // ==========================================
  concepts: { difficulty: "beginner", module: "algorithms", order: 241 },
  "animation-demo": { difficulty: "beginner", module: "algorithms", order: 242 },
  animations: { difficulty: "beginner", module: "algorithms", order: 243 },
  "js-api": { difficulty: "beginner", module: "algorithms", order: 244 },
  "knowledge-graph": { difficulty: "beginner", module: "algorithms", order: 245 },
  "题库": { difficulty: "intermediate", module: "algorithms", order: 246 },

  // ==========================================
  // 编程题模块 (301-400)
  // ==========================================
  "interview-questions": { difficulty: "intermediate", module: "other", order: 301 },
};

/**
 * 路由分组配置
 */
export interface RouteGroupConfig {
  name: string;
  title: string;
  subtitle: string;
  icon: string;
  path: string;
}

export const ROUTE_GROUPS: RouteGroupConfig[] = [
  {
    name: "hooks",
    title: "React Hooks",
    subtitle: "React 内置 Hooks 详解与实战",
    icon: "🪝",
    path: "/hooks",
  },
  {
    name: "react-basics",
    title: "React 组件基础",
    subtitle: "组件开发核心概念与模式",
    icon: "🧩",
    path: "/react-basics",
  },
  {
    name: "algorithms",
    title: "算法与数据结构",
    subtitle: "前端必备算法知识与实战",
    icon: "🧮",
    path: "/algorithms",
  },
  // ========== 算法分类拆分 ==========
  {
    name: "data-structures",
    title: "数据结构",
    subtitle: "栈、队列、链表、哈希表、树",
    icon: "📦",
    path: "/algorithms",
  },
  {
    name: "algorithm-techniques",
    title: "算法技巧",
    subtitle: "排序、搜索、双指针、动态规划",
    icon: "🧮",
    path: "/algorithms",
  },
  {
    name: "problems",
    title: "刷题训练",
    subtitle: "LeetCode 题解与实战练习",
    icon: "📝",
    path: "/problems",
  },
  {
    name: "learning-resources",
    title: "学习资源",
    subtitle: "概念、模板、动画、手册",
    icon: "📚",
    path: "/concepts",
  },
  {
    name: "interview",
    title: "编程挑战",
    subtitle: "前端高频算法题，在线编码实战",
    icon: "🎯",
    path: "/interview-questions",
  },
];

/**
 * 虚拟分组映射 - 将虚拟分组映射到实际的文件夹和路由过滤规则
 */
const VIRTUAL_GROUP_MAPPING: Record<string, {
  sourceGroup: string;  // 实际的文件夹分组名
  routeFilter: (routePath: string, routeName: string) => boolean;  // 路由过滤函数
}> = {
  "data-structures": {
    sourceGroup: "algorithms",
    routeFilter: (_, name) => ["stack", "queue", "linked-list", "hash-table", "binary-tree"].includes(name),
  },
  "algorithm-techniques": {
    sourceGroup: "algorithms",
    routeFilter: (_, name) => [
      "sorting", "searching", "two-pointers", "sliding-window",
      "backtracking", "dynamic-programming", "bit-manipulation",
      "graph", "heap", "algorithms", "frontend-algorithms"
    ].includes(name),
  },
  "problems": {
    sourceGroup: "algorithms",
    routeFilter: (path, _name) => {
      // problems 主页和其下的刷题相关页面
      if (path === "/problems") return true;
      if (path.startsWith("/problems/")) {
        const subPath = path.replace("/problems/", "").split("/")[0];
        return ["leetcode", "roadmap", "cases", "templates"].includes(subPath);
      }
      return false;
    },
  },
  "learning-resources": {
    sourceGroup: "algorithms",
    routeFilter: (path, name) => {
      // 学习资源相关
      if (path === "/concepts" || path.startsWith("/concepts/")) return true;
      if (path === "/题库") return true;
      if (path.startsWith("/problems/")) {
        const subPath = path.replace("/problems/", "").split("/")[0];
        return ["animation-demo", "animations", "js-api", "knowledge-graph"].includes(subPath);
      }
      return false;
    },
  },
};

/**
 * 获取 app 目录下的所有路由
 * 只在服务端运行（Server Component）
 * @param groupName 可选，指定路由分组名称（如 "hooks", "react-basics", "data-structures"）
 */
export function getAppRoutes(groupName?: string): RouteInfo[] {
  const appDir = path.join(process.cwd(), "src/app");
  const routes: RouteInfo[] = [];

  // 检查是否是虚拟分组
  const virtualMapping = groupName ? VIRTUAL_GROUP_MAPPING[groupName] : undefined;
  const actualGroupName = virtualMapping?.sourceGroup || groupName;

  // 递归扫描目录
  function scanDirectory(dir: string, basePath: string = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (!item.isDirectory()) continue;

      const itemName = item.name;

      // 处理路由分组 (group)
      if (itemName.startsWith("(") && itemName.endsWith(")")) {
        const groupDirName = itemName.slice(1, -1); // 去掉括号
        // 如果指定了分组，只扫描该分组
        if (actualGroupName && groupDirName !== actualGroupName) {
          continue;
        }
        // 扫描分组内的目录，但不改变 basePath（分组不影响 URL）
        const fullPath = path.join(dir, itemName);
        scanDirectory(fullPath, basePath);
        continue;
      }

      // 跳过其他特殊目录
      if (
        itemName.startsWith("_") || // _components 等私有目录
        itemName.startsWith(".") || // .git 等隐藏目录
        itemName.startsWith("@") || // @parallel 并行路由
        itemName.startsWith("[") || // [id] 等动态路由
        itemName === "api" || // API 路由
        itemName === "components" || // 组件目录
        itemName === "data" // 数据目录
      ) {
        continue;
      }

      const fullPath = path.join(dir, itemName);
      const routePath = `${basePath}/${itemName}`;

      // 检查是否有 page.tsx 或 page.js 文件
      const hasPage =
        fs.existsSync(path.join(fullPath, "page.tsx")) ||
        fs.existsSync(path.join(fullPath, "page.js"));

      if (hasPage) {
        const metadata = ROUTES_METADATA[itemName];
        routes.push({
          path: routePath,
          name: itemName,
          displayName: formatDisplayName(itemName),
          difficulty: metadata?.difficulty,
          module: metadata?.module,
          order: metadata?.order ?? 999,
        });
      }

      // 递归扫描子目录
      scanDirectory(fullPath, routePath);
    }
  }

  // 如果指定了分组，直接扫描分组目录
  if (actualGroupName) {
    const groupDir = path.join(appDir, `(${actualGroupName})`);
    if (fs.existsSync(groupDir)) {
      scanDirectory(groupDir);
    }
  } else {
    scanDirectory(appDir);
  }

  // 如果是虚拟分组，应用过滤器
  let filteredRoutes = routes;
  if (virtualMapping) {
    filteredRoutes = routes.filter(route =>
      virtualMapping.routeFilter(route.path, route.name)
    );
  }

  // 按模块和难度排序
  return filteredRoutes.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/**
 * 按模块分组路由
 */
export function groupRoutesByModule(
  routes: RouteInfo[]
): Record<ModuleType, RouteInfo[]> {
  const grouped: Record<ModuleType, RouteInfo[]> = {
    hooks: [],
    components: [],
    patterns: [],
    algorithms: [],
    other: [],
  };

  for (const route of routes) {
    const module = route.module ?? "other";
    grouped[module].push(route);
  }

  return grouped;
}

/**
 * 格式化显示名称
 */
function formatDisplayName(name: string): string {
  // 特殊名称映射
  const specialNames: Record<string, string> = {
    hoc: "高阶组件 (HOC)",
    "react-memo": "React.memo",
    "forward-ref": "forwardRef",
    "suspense-lazy": "Suspense & lazy",
    "error-boundary": "Error Boundary",
    "render-props": "Render Props",
    "compound-components": "复合组件",
    "controlled-uncontrolled": "受控与非受控",
    "component-basics": "组件基础",
    "conditional-rendering": "条件渲染",
    "list-rendering": "列表渲染",
    "event-handling": "事件处理",
    forms: "表单处理",
    composition: "组件组合",
    fragment: "Fragment",
    portal: "Portal",
    context: "Context",
    // 算法与数据结构
    stack: "栈",
    queue: "队列",
    "linked-list": "链表",
    "hash-table": "哈希表",
    "binary-tree": "二叉树",
    sorting: "排序算法",
    searching: "搜索算法",
    "frontend-algorithms": "前端常用算法",
    algorithms: "算法总览",
    // 算法分类
    "two-pointers": "双指针",
    "sliding-window": "滑动窗口",
    backtracking: "回溯算法",
    graph: "图论",
    heap: "堆",
    "dynamic-programming": "动态规划",
    "bit-manipulation": "位运算",
    // 题库相关
    problems: "算法题库",
    concepts: "基础概念",
    templates: "代码模板",
    roadmap: "学习路线",
    cases: "实战案例",
    leetcode: "LeetCode 题解",
    "animation-demo": "动画演示",
    animations: "算法动画",
    "js-api": "JS API 手册",
    "knowledge-graph": "知识图谱",
    "题库": "LeetCode 题库",
    // 编程题
    "interview-questions": "前端编程挑战",
  };

  if (specialNames[name]) {
    return specialNames[name];
  }

  // 处理 kebab-case (use-callback -> useCallback)
  if (name.includes("-")) {
    return name
      .split("-")
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("");
  }

  // 首字母大写
  return name.charAt(0).toUpperCase() + name.slice(1);
}
