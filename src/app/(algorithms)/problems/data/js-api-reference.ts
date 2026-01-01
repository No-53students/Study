/**
 * JavaScript 算法常用 API 速查手册
 *
 * 专为前端开发者学习算法设计，整理 LeetCode 刷题最常用的 JS 方法
 */

// ==================== 类型定义 ====================

export interface JSApiMethod {
  /** 方法名 */
  name: string;
  /** 方法签名 */
  signature: string;
  /** 简短描述 */
  description: string;
  /** 详细说明 */
  detailedDescription?: string;
  /** 是否修改原数据 */
  mutatesOriginal: boolean;
  /** 时间复杂度 */
  timeComplexity: string;
  /** 空间复杂度 */
  spaceComplexity?: string;
  /** 返回值说明 */
  returns: string;
  /** 参数说明 */
  parameters?: {
    name: string;
    type: string;
    description: string;
    optional?: boolean;
  }[];
  /** 代码示例 */
  examples: {
    title?: string;
    code: string;
    output: string;
    explanation?: string;
  }[];
  /** 算法题常见用法 */
  algorithmUseCases: string[];
  /** 相关题目 ID */
  relatedProblems?: string[];
  /** 易错点 */
  pitfalls?: string[];
  /** 相关方法 */
  relatedMethods?: string[];
  /** 对比其他方法 */
  comparison?: {
    method: string;
    difference: string;
  }[];
  /** 性能提示 */
  performanceTips?: string[];
}

export interface JSApiCategory {
  /** 分类 ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类图标 */
  icon: string;
  /** 分类描述 */
  description: string;
  /** 方法列表 */
  methods: JSApiMethod[];
}

// ==================== 数组方法 ====================

export const arrayMethods: JSApiCategory = {
  id: "array",
  name: "数组方法",
  icon: "📦",
  description: "JavaScript 数组是算法题最常用的数据结构，掌握这些方法能大幅提升解题效率",
  methods: [
    // ===== 遍历类 =====
    {
      name: "forEach",
      signature: "arr.forEach((item, index, array) => { })",
      description: "遍历数组，无返回值",
      detailedDescription: "对数组的每个元素执行一次给定的函数。与 for 循环不同，forEach 无法使用 break 中断，也无法使用 return 返回外层函数。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "undefined（无返回值）",
      parameters: [
        { name: "callback", type: "(item, index, array) => void", description: "为数组中每个元素执行的函数" },
        { name: "thisArg", type: "any", description: "执行回调时用作 this 的值", optional: true }
      ],
      examples: [
        {
          title: "基本遍历",
          code: `const arr = [1, 2, 3];
arr.forEach((num, i) => console.log(\`索引\${i}: \${num}\`));`,
          output: "索引0: 1\\n索引1: 2\\n索引2: 3",
          explanation: "遍历每个元素，获取值和索引"
        },
        {
          title: "构建哈希表",
          code: `const arr = ['a', 'b', 'a', 'c'];
const map = new Map();
arr.forEach(char => {
  map.set(char, (map.get(char) || 0) + 1);
});
// map: { 'a' => 2, 'b' => 1, 'c' => 1 }`,
          output: "Map { 'a' => 2, 'b' => 1, 'c' => 1 }",
          explanation: "常用于统计字符/元素频率"
        }
      ],
      algorithmUseCases: [
        "遍历数组进行统计",
        "构建哈希表（Map/Object）",
        "副作用操作（如打印、修改外部变量）"
      ],
      pitfalls: [
        "⚠️ 无法用 break/continue 中断循环",
        "⚠️ 无法用 return 返回外层函数的值",
        "⚠️ 无返回值，不能链式调用",
        "⚠️ 遍历过程中删除元素会导致跳过"
      ],
      relatedMethods: ["map", "for...of", "for循环"],
      comparison: [
        { method: "for循环", difference: "for 可以 break/continue，forEach 不行" },
        { method: "map", difference: "map 返回新数组，forEach 返回 undefined" }
      ]
    },
    {
      name: "map",
      signature: "arr.map((item, index, array) => newItem)",
      description: "映射数组，返回新数组",
      detailedDescription: "创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值。不会改变原数组。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n) - 创建新数组",
      returns: "新数组，每个元素都是回调函数的结果",
      parameters: [
        { name: "callback", type: "(item, index, array) => T", description: "生成新数组元素的函数" },
        { name: "thisArg", type: "any", description: "执行回调时用作 this 的值", optional: true }
      ],
      examples: [
        {
          title: "元素转换",
          code: `const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6]
console.log(arr);     // [1, 2, 3] 原数组不变`,
          output: "[2, 4, 6]",
          explanation: "每个元素乘以2，原数组不变"
        },
        {
          title: "字符串转数字",
          code: `const strs = ["1", "2", "3"];
const nums = strs.map(Number);  // [1, 2, 3]
// 等价于 strs.map(s => Number(s))`,
          output: "[1, 2, 3]",
          explanation: "字符串数组转数字数组"
        },
        {
          title: "生成索引数组",
          code: `// 生成 0-4 的数组
const arr = Array.from({length: 5}, (_, i) => i);
// 或者
const arr2 = [...Array(5)].map((_, i) => i);`,
          output: "[0, 1, 2, 3, 4]",
          explanation: "常用于初始化"
        }
      ],
      algorithmUseCases: [
        "数组元素转换/映射",
        "提取对象数组中的某个属性",
        "生成索引数组",
        "配合解构进行数据处理"
      ],
      relatedProblems: ["product-of-array-except-self"],
      pitfalls: [
        "⚠️ map(parseInt) 陷阱：'1,2,3'.split(',').map(parseInt) 结果是 [1, NaN, NaN]",
        "✅ 应该用 map(x => parseInt(x)) 或 map(Number)",
        "⚠️ 必须有返回值，否则新数组元素为 undefined"
      ],
      relatedMethods: ["forEach", "filter", "flatMap"],
      comparison: [
        { method: "forEach", difference: "map 返回新数组，forEach 无返回值" },
        { method: "flatMap", difference: "flatMap 会将结果数组展平一层" }
      ],
      performanceTips: [
        "如果不需要返回值，用 forEach 更语义化",
        "链式调用多个 map 会创建多个中间数组，考虑合并"
      ]
    },
    {
      name: "filter",
      signature: "arr.filter((item, index, array) => boolean)",
      description: "过滤数组，返回满足条件的新数组",
      detailedDescription: "创建一个新数组，包含通过所提供函数测试的所有元素。不会改变原数组。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k) - k为满足条件的元素个数",
      returns: "新数组，包含所有通过测试的元素",
      examples: [
        {
          title: "过滤偶数",
          code: `const arr = [1, 2, 3, 4, 5];
const evens = arr.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]
console.log(arr);   // [1, 2, 3, 4, 5] 原数组不变`,
          output: "[2, 4]",
          explanation: "过滤出偶数，原数组不变"
        },
        {
          title: "去除空值",
          code: `const arr = [0, 1, '', null, 'hello', undefined, false];
const truthy = arr.filter(Boolean);`,
          output: "[1, 'hello']",
          explanation: "filter(Boolean) 是去除假值的常用技巧"
        },
        {
          title: "数组去重",
          code: `const arr = [1, 2, 2, 3, 3, 3];
const unique = arr.filter((item, index) => arr.indexOf(item) === index);`,
          output: "[1, 2, 3]",
          explanation: "利用 indexOf 返回第一次出现的索引"
        }
      ],
      algorithmUseCases: [
        "过滤满足条件的元素",
        "去除空值/假值：filter(Boolean)",
        "数组去重（配合 indexOf）",
        "移除特定元素"
      ],
      relatedProblems: ["move-zeroes", "remove-element"],
      pitfalls: [
        "⚠️ 空数组调用 filter 返回空数组，不会报错",
        "⚠️ 回调必须返回布尔值，否则会隐式转换"
      ],
      relatedMethods: ["find", "findIndex", "some", "every"],
      comparison: [
        { method: "find", difference: "filter 返回所有匹配元素，find 只返回第一个" },
        { method: "some", difference: "filter 返回元素数组，some 只返回是否存在" }
      ]
    },
    {
      name: "reduce",
      signature: "arr.reduce((accumulator, current, index, array) => newAcc, initialValue)",
      description: "累积计算，将数组归约为单个值",
      detailedDescription: "对数组中的每个元素执行一个 reducer 函数，将其结果汇总为单个返回值。是最强大的数组方法之一。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) - 取决于累加器类型",
      returns: "累积计算的最终结果",
      parameters: [
        { name: "callback", type: "(acc, cur, index, array) => acc", description: "reducer 函数" },
        { name: "initialValue", type: "any", description: "累加器初始值（强烈建议提供）", optional: true }
      ],
      examples: [
        {
          title: "数组求和",
          code: `const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, cur) => acc + cur, 0);`,
          output: "10",
          explanation: "累加所有元素"
        },
        {
          title: "统计频率",
          code: `const arr = ['a', 'b', 'a', 'c', 'a'];
const freq = arr.reduce((map, char) => {
  map.set(char, (map.get(char) || 0) + 1);
  return map;
}, new Map());
// Map { 'a' => 3, 'b' => 1, 'c' => 1 }`,
          output: "Map { 'a' => 3, 'b' => 1, 'c' => 1 }",
          explanation: "构建频率统计表"
        },
        {
          title: "数组扁平化",
          code: `const arr = [[1, 2], [3, 4], [5]];
const flat = arr.reduce((acc, cur) => acc.concat(cur), []);`,
          output: "[1, 2, 3, 4, 5]",
          explanation: "展平一层嵌套"
        },
        {
          title: "求最大值",
          code: `const arr = [3, 1, 4, 1, 5, 9];
const max = arr.reduce((a, b) => Math.max(a, b));
// 或者直接用 Math.max(...arr)`,
          output: "9",
          explanation: "找出数组最大值"
        }
      ],
      algorithmUseCases: [
        "求和、求积、求最值",
        "统计频率（构建频率 Map）",
        "数组扁平化",
        "分组聚合",
        "实现其他数组方法（map、filter 等都可以用 reduce 实现）"
      ],
      relatedProblems: ["two-sum", "maximum-subarray", "valid-anagram"],
      pitfalls: [
        "⚠️ 不传初始值时，空数组会报错 TypeError",
        "⚠️ 不传初始值时，第一个元素作为初始值，从第二个开始遍历",
        "✅ 建议始终传入初始值，更安全更清晰"
      ],
      relatedMethods: ["reduceRight", "map", "filter"],
      performanceTips: [
        "reduce 很强大但可读性可能较差，简单场景用专门的方法",
        "累加器如果是对象/数组，注意引用问题"
      ]
    },
    {
      name: "find / findIndex",
      signature: "arr.find(predicate) / arr.findIndex(predicate)",
      description: "查找第一个满足条件的元素或索引",
      detailedDescription: "find 返回第一个满足条件的元素，findIndex 返回其索引。找到后立即停止遍历，性能优于 filter。",
      mutatesOriginal: false,
      timeComplexity: "O(n) 最坏情况",
      spaceComplexity: "O(1)",
      returns: "find: 元素或 undefined | findIndex: 索引或 -1",
      examples: [
        {
          title: "查找元素",
          code: `const arr = [1, 2, 3, 4, 5];
const found = arr.find(x => x > 3);     // 4
const notFound = arr.find(x => x > 10); // undefined`,
          output: "4",
          explanation: "找到第一个大于3的元素"
        },
        {
          title: "查找对象索引",
          code: `const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
const index = users.findIndex(u => u.id === 2); // 1
const user = users.find(u => u.id === 2);       // {id: 2, name: 'Bob'}`,
          output: "1",
          explanation: "查找对象在数组中的位置"
        }
      ],
      algorithmUseCases: [
        "查找满足条件的第一个元素",
        "检查元素是否存在并获取其位置",
        "在对象数组中查找特定对象"
      ],
      relatedProblems: ["search-insert-position", "first-bad-version"],
      pitfalls: [
        "⚠️ 找不到时 find 返回 undefined，findIndex 返回 -1",
        "⚠️ 只能找第一个匹配的，找所有匹配用 filter"
      ],
      relatedMethods: ["indexOf", "includes", "some", "filter"],
      comparison: [
        { method: "indexOf", difference: "indexOf 只能查找值，find 可以用函数判断" },
        { method: "filter", difference: "find 只返回第一个，filter 返回所有匹配的" },
        { method: "some", difference: "some 只返回是否存在，find 返回元素本身" }
      ]
    },
    {
      name: "some / every",
      signature: "arr.some(predicate) / arr.every(predicate)",
      description: "检查数组是否有/所有元素满足条件",
      detailedDescription: "some: 只要有一个元素满足条件就返回 true。every: 所有元素都满足条件才返回 true。都支持短路求值。",
      mutatesOriginal: false,
      timeComplexity: "O(n) 最坏情况",
      spaceComplexity: "O(1)",
      returns: "boolean",
      examples: [
        {
          title: "some 检查是否存在",
          code: `const arr = [1, 2, 3, 4, 5];
arr.some(x => x > 3);   // true，存在大于3的
arr.some(x => x > 10);  // false，不存在大于10的`,
          output: "true / false",
          explanation: "检查是否存在满足条件的元素"
        },
        {
          title: "every 检查是否全部满足",
          code: `const arr = [2, 4, 6, 8];
arr.every(x => x % 2 === 0);  // true，全是偶数
arr.every(x => x > 5);        // false，不是全部大于5`,
          output: "true / false",
          explanation: "检查是否所有元素都满足条件"
        },
        {
          title: "短路特性",
          code: `// some 找到一个 true 就停止
[1, 2, 3].some(x => { console.log(x); return x === 2; });
// 输出: 1, 2（3不会被访问）

// every 找到一个 false 就停止
[1, 2, 3].every(x => { console.log(x); return x < 2; });
// 输出: 1, 2（3不会被访问）`,
          output: "短路求值",
          explanation: "可以提前终止遍历，比 forEach 更灵活"
        }
      ],
      algorithmUseCases: [
        "检查数组中是否存在满足条件的元素",
        "验证所有元素是否符合要求",
        "作为 forEach 的替代品（可以提前终止）"
      ],
      pitfalls: [
        "⚠️ 空数组调用 some 返回 false，every 返回 true",
        "✅ 利用短路特性可以替代 forEach 实现提前退出"
      ],
      relatedMethods: ["find", "findIndex", "filter", "includes"],
      comparison: [
        { method: "find", difference: "find 返回元素，some 只返回 boolean" },
        { method: "includes", difference: "includes 检查值相等，some 可以用函数判断" }
      ]
    },
    {
      name: "includes / indexOf",
      signature: "arr.includes(value, fromIndex?) / arr.indexOf(value, fromIndex?)",
      description: "检查数组是否包含某个值",
      detailedDescription: "includes 返回布尔值，indexOf 返回索引。includes 可以正确检测 NaN，indexOf 不行。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "includes: boolean | indexOf: 索引或 -1",
      examples: [
        {
          title: "基本用法",
          code: `const arr = [1, 2, 3, NaN];
arr.includes(2);     // true
arr.indexOf(2);      // 1
arr.includes(NaN);   // true ✅
arr.indexOf(NaN);    // -1 ❌ 无法检测 NaN`,
          output: "true / 1 / true / -1",
          explanation: "includes 可以正确检测 NaN"
        },
        {
          title: "从指定位置开始查找",
          code: `const arr = [1, 2, 3, 2, 1];
arr.indexOf(2);       // 1（第一次出现）
arr.indexOf(2, 2);    // 3（从索引2开始找）
arr.lastIndexOf(2);   // 3（最后一次出现）`,
          output: "1 / 3 / 3",
          explanation: "可以指定起始位置"
        }
      ],
      algorithmUseCases: [
        "检查元素是否存在",
        "获取元素位置",
        "数组去重判断"
      ],
      relatedProblems: ["contains-duplicate", "two-sum"],
      pitfalls: [
        "⚠️ indexOf 无法检测 NaN",
        "⚠️ 两者都使用严格相等（===），对象需要是同一引用",
        "✅ 高频查找用 Set 或 Map 更高效"
      ],
      relatedMethods: ["find", "findIndex", "some", "lastIndexOf"],
      comparison: [
        { method: "includes", difference: "返回 boolean，可以检测 NaN" },
        { method: "indexOf", difference: "返回索引，不能检测 NaN" }
      ],
      performanceTips: [
        "O(n) 复杂度，多次查找建议用 Set（O(1)）"
      ]
    },
    // ===== 修改原数组的方法 =====
    {
      name: "push / pop",
      signature: "arr.push(...items) / arr.pop()",
      description: "在数组末尾添加/删除元素",
      detailedDescription: "push 在末尾添加一个或多个元素，返回新长度。pop 删除最后一个元素，返回被删除的元素。",
      mutatesOriginal: true,
      timeComplexity: "O(1) 均摊",
      spaceComplexity: "O(1)",
      returns: "push: 新数组长度 | pop: 被删除的元素",
      examples: [
        {
          title: "push 添加元素",
          code: `const arr = [1, 2, 3];
const len = arr.push(4, 5);
console.log(arr);  // [1, 2, 3, 4, 5] ⚠️ 原数组被修改
console.log(len);  // 5（新长度）`,
          output: "[1, 2, 3, 4, 5]",
          explanation: "push 会修改原数组"
        },
        {
          title: "pop 删除元素",
          code: `const arr = [1, 2, 3];
const last = arr.pop();
console.log(arr);   // [1, 2] ⚠️ 原数组被修改
console.log(last);  // 3`,
          output: "[1, 2]",
          explanation: "pop 会修改原数组"
        },
        {
          title: "模拟栈操作",
          code: `const stack = [];
stack.push(1);  // 入栈
stack.push(2);
stack.push(3);
// stack = [1, 2, 3]

stack.pop();    // 出栈，返回 3
stack.pop();    // 出栈，返回 2
// stack = [1]`,
          output: "栈操作",
          explanation: "push/pop 天然适合实现栈"
        }
      ],
      algorithmUseCases: [
        "⭐ 实现栈（Stack）数据结构",
        "动态构建数组",
        "BFS/DFS 中管理遍历顺序"
      ],
      relatedProblems: ["valid-parentheses", "min-stack", "daily-temperatures"],
      pitfalls: [
        "⚠️ 会修改原数组！",
        "⚠️ 空数组 pop 返回 undefined",
        "✅ 栈操作首选 push/pop"
      ],
      relatedMethods: ["unshift", "shift", "concat"],
      comparison: [
        { method: "unshift/shift", difference: "操作数组开头，但时间复杂度 O(n)" },
        { method: "concat", difference: "concat 返回新数组，不修改原数组" }
      ]
    },
    {
      name: "unshift / shift",
      signature: "arr.unshift(...items) / arr.shift()",
      description: "在数组开头添加/删除元素",
      detailedDescription: "unshift 在开头添加元素，shift 删除第一个元素。由于需要移动所有元素，时间复杂度为 O(n)。",
      mutatesOriginal: true,
      timeComplexity: "O(n) ⚠️ 需要移动所有元素",
      spaceComplexity: "O(1)",
      returns: "unshift: 新数组长度 | shift: 被删除的元素",
      examples: [
        {
          title: "unshift 添加到开头",
          code: `const arr = [3, 4, 5];
arr.unshift(1, 2);
console.log(arr);  // [1, 2, 3, 4, 5] ⚠️ 原数组被修改`,
          output: "[1, 2, 3, 4, 5]",
          explanation: "在开头添加元素"
        },
        {
          title: "shift 从开头删除",
          code: `const arr = [1, 2, 3];
const first = arr.shift();
console.log(arr);    // [2, 3] ⚠️ 原数组被修改
console.log(first);  // 1`,
          output: "[2, 3]",
          explanation: "从开头删除元素"
        },
        {
          title: "模拟队列",
          code: `const queue = [];
queue.push(1);    // 入队（尾部）
queue.push(2);
queue.push(3);
// queue = [1, 2, 3]

queue.shift();    // 出队（头部），返回 1
queue.shift();    // 出队，返回 2
// queue = [3]`,
          output: "队列操作",
          explanation: "push + shift 实现队列（但 shift 是 O(n)）"
        }
      ],
      algorithmUseCases: [
        "实现队列（但性能不佳，大数据量建议用链表）",
        "需要在开头操作的场景"
      ],
      relatedProblems: ["binary-tree-level-order-traversal"],
      pitfalls: [
        "⚠️ 会修改原数组！",
        "⚠️ 时间复杂度 O(n)，大数组操作慢",
        "⚠️ 空数组 shift 返回 undefined",
        "✅ 频繁操作头部考虑用双端队列或链表"
      ],
      relatedMethods: ["push", "pop"],
      performanceTips: [
        "⚠️ O(n) 复杂度，避免在大数组上频繁使用",
        "BFS 中如果队列很大，考虑用索引模拟而非真正 shift"
      ]
    },
    {
      name: "splice",
      signature: "arr.splice(start, deleteCount?, ...items)",
      description: "在任意位置删除/插入元素（万能方法）",
      detailedDescription: "最强大的数组修改方法，可以在任意位置删除、插入或替换元素。会修改原数组。",
      mutatesOriginal: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k) - k为被删除的元素个数",
      returns: "被删除的元素组成的数组",
      parameters: [
        { name: "start", type: "number", description: "开始位置（可以为负数）" },
        { name: "deleteCount", type: "number", description: "要删除的元素个数", optional: true },
        { name: "items", type: "...any", description: "要插入的元素", optional: true }
      ],
      examples: [
        {
          title: "删除元素",
          code: `const arr = [1, 2, 3, 4, 5];
const deleted = arr.splice(1, 2);  // 从索引1开始删除2个
console.log(arr);      // [1, 4, 5] ⚠️ 原数组被修改
console.log(deleted);  // [2, 3] 返回被删除的元素`,
          output: "[1, 4, 5]",
          explanation: "删除并返回被删除的元素"
        },
        {
          title: "插入元素",
          code: `const arr = [1, 4, 5];
arr.splice(1, 0, 2, 3);  // 在索引1处插入，不删除
console.log(arr);  // [1, 2, 3, 4, 5]`,
          output: "[1, 2, 3, 4, 5]",
          explanation: "deleteCount 为 0 时只插入不删除"
        },
        {
          title: "替换元素",
          code: `const arr = [1, 2, 3, 4, 5];
arr.splice(1, 2, 'a', 'b', 'c');  // 删除2个，插入3个
console.log(arr);  // [1, 'a', 'b', 'c', 4, 5]`,
          output: "[1, 'a', 'b', 'c', 4, 5]",
          explanation: "同时删除和插入实现替换"
        },
        {
          title: "负数索引",
          code: `const arr = [1, 2, 3, 4, 5];
arr.splice(-2, 1);  // 从倒数第2个开始删除1个
console.log(arr);   // [1, 2, 3, 5]`,
          output: "[1, 2, 3, 5]",
          explanation: "支持负数索引"
        }
      ],
      algorithmUseCases: [
        "在指定位置插入元素",
        "删除指定位置的元素",
        "替换数组中的元素",
        "实现数组的各种修改操作"
      ],
      relatedProblems: ["remove-element", "move-zeroes"],
      pitfalls: [
        "⚠️ 会修改原数组！这是最常见的坑",
        "⚠️ 第二个参数省略时删除从 start 到末尾的所有元素",
        "⚠️ 返回的是被删除的元素数组，不是修改后的数组"
      ],
      relatedMethods: ["slice", "concat"],
      comparison: [
        { method: "slice", difference: "slice 不修改原数组，返回新数组片段" }
      ]
    },
    {
      name: "sort",
      signature: "arr.sort(compareFn?)",
      description: "对数组排序",
      detailedDescription: "原地对数组元素进行排序并返回数组。默认按字符串 Unicode 码点排序，数字排序必须传入比较函数！",
      mutatesOriginal: true,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n) - 取决于具体实现",
      returns: "排序后的原数组（同一引用）",
      parameters: [
        { name: "compareFn", type: "(a, b) => number", description: "比较函数：返回负数a在前，正数b在前，0相等", optional: true }
      ],
      examples: [
        {
          title: "字符串排序（默认）",
          code: `const arr = ['banana', 'apple', 'cherry'];
arr.sort();
console.log(arr);  // ['apple', 'banana', 'cherry']`,
          output: "['apple', 'banana', 'cherry']",
          explanation: "默认按字母顺序排序"
        },
        {
          title: "数字排序 ⚠️ 必须传比较函数",
          code: `const arr = [10, 2, 30, 1];

// ❌ 错误：默认按字符串排序
arr.sort();  // [1, 10, 2, 30]

// ✅ 正确：升序
arr.sort((a, b) => a - b);  // [1, 2, 10, 30]

// ✅ 正确：降序
arr.sort((a, b) => b - a);  // [30, 10, 2, 1]`,
          output: "[1, 2, 10, 30]",
          explanation: "数字排序必须传入比较函数！"
        },
        {
          title: "对象数组排序",
          code: `const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

// 按年龄升序
users.sort((a, b) => a.age - b.age);`,
          output: "按 age 排序的数组",
          explanation: "通过比较函数访问对象属性"
        },
        {
          title: "不修改原数组的排序",
          code: `const arr = [3, 1, 2];
const sorted = [...arr].sort((a, b) => a - b);
// 或 const sorted = arr.slice().sort((a, b) => a - b);
console.log(arr);     // [3, 1, 2] 原数组不变
console.log(sorted);  // [1, 2, 3]`,
          output: "[1, 2, 3]",
          explanation: "先复制再排序，保护原数组"
        }
      ],
      algorithmUseCases: [
        "⭐ 排序是很多算法的基础步骤",
        "双指针算法通常需要先排序",
        "贪心算法常需要按某个属性排序",
        "二分查找需要有序数组"
      ],
      relatedProblems: ["merge-intervals", "three-sum", "meeting-rooms"],
      pitfalls: [
        "⚠️ 会修改原数组！",
        "⚠️⚠️⚠️ 数字排序必须传比较函数，这是最常见的错误",
        "⚠️ 默认按字符串排序：[10, 2] 排序后是 [10, 2] 不是 [2, 10]",
        "✅ 不想修改原数组，先用 [...arr] 或 slice() 复制"
      ],
      relatedMethods: ["reverse", "toSorted (ES2023)"],
      comparison: [
        { method: "toSorted", difference: "ES2023 新增，不修改原数组" }
      ],
      performanceTips: [
        "比较函数尽量简单，复杂比较会影响性能",
        "已经有序的数组，某些引擎会优化"
      ]
    },
    {
      name: "reverse",
      signature: "arr.reverse()",
      description: "反转数组",
      detailedDescription: "将数组中元素的位置颠倒，第一个变成最后一个，最后一个变成第一个。会修改原数组。",
      mutatesOriginal: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "反转后的原数组（同一引用）",
      examples: [
        {
          title: "基本反转",
          code: `const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr);  // [5, 4, 3, 2, 1] ⚠️ 原数组被修改`,
          output: "[5, 4, 3, 2, 1]",
          explanation: "原地反转数组"
        },
        {
          title: "反转字符串",
          code: `const str = "hello";
const reversed = str.split('').reverse().join('');
console.log(reversed);  // "olleh"`,
          output: "olleh",
          explanation: "字符串反转的经典写法"
        },
        {
          title: "不修改原数组",
          code: `const arr = [1, 2, 3];
const reversed = [...arr].reverse();
console.log(arr);       // [1, 2, 3] 原数组不变
console.log(reversed);  // [3, 2, 1]`,
          output: "[3, 2, 1]",
          explanation: "先复制再反转"
        }
      ],
      algorithmUseCases: [
        "反转字符串",
        "反转链表（逻辑类似）",
        "配合排序实现降序"
      ],
      relatedProblems: ["reverse-string", "reverse-linked-list", "palindrome-linked-list"],
      pitfalls: [
        "⚠️ 会修改原数组！",
        "✅ 不想修改原数组，先用 [...arr] 或 slice() 复制"
      ],
      relatedMethods: ["sort", "toReversed (ES2023)"],
      comparison: [
        { method: "toReversed", difference: "ES2023 新增，不修改原数组" }
      ]
    },
    {
      name: "fill",
      signature: "arr.fill(value, start?, end?)",
      description: "用固定值填充数组",
      detailedDescription: "用一个固定值填充数组中从起始索引到结束索引的全部元素，不包括终止索引。会修改原数组。",
      mutatesOriginal: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "修改后的原数组",
      examples: [
        {
          title: "填充整个数组",
          code: `const arr = [1, 2, 3, 4];
arr.fill(0);
console.log(arr);  // [0, 0, 0, 0]`,
          output: "[0, 0, 0, 0]",
          explanation: "用 0 填充整个数组"
        },
        {
          title: "初始化数组",
          code: `// 创建长度为5，元素全为0的数组
const zeros = new Array(5).fill(0);  // [0, 0, 0, 0, 0]

// ⚠️ 填充对象的陷阱
const arr = new Array(3).fill([]);
arr[0].push(1);
console.log(arr);  // [[1], [1], [1]] 全是同一个引用！

// ✅ 正确的做法
const arr2 = Array.from({length: 3}, () => []);
arr2[0].push(1);
console.log(arr2);  // [[1], [], []] 各自独立`,
          output: "[0, 0, 0, 0, 0]",
          explanation: "常用于初始化数组"
        },
        {
          title: "部分填充",
          code: `const arr = [1, 2, 3, 4, 5];
arr.fill(0, 1, 4);  // 从索引1到4（不含4）填充0
console.log(arr);   // [1, 0, 0, 0, 5]`,
          output: "[1, 0, 0, 0, 5]",
          explanation: "可以指定填充范围"
        }
      ],
      algorithmUseCases: [
        "初始化固定大小的数组",
        "重置数组值",
        "创建 DP 表"
      ],
      relatedProblems: ["unique-paths", "climbing-stairs"],
      pitfalls: [
        "⚠️ 会修改原数组！",
        "⚠️⚠️ 填充引用类型（对象/数组）时是同一个引用！",
        "✅ 填充对象要用 Array.from({length: n}, () => ({}))"
      ],
      relatedMethods: ["Array.from", "new Array()"]
    },
    // ===== 不修改原数组的方法 =====
    {
      name: "slice",
      signature: "arr.slice(start?, end?)",
      description: "截取数组片段，返回新数组",
      detailedDescription: "返回一个新数组，包含从 start 到 end（不包括 end）的元素。不会修改原数组。",
      mutatesOriginal: false,
      timeComplexity: "O(k) - k为截取的元素个数",
      spaceComplexity: "O(k)",
      returns: "新数组，包含截取的元素",
      examples: [
        {
          title: "基本截取",
          code: `const arr = [1, 2, 3, 4, 5];
const part = arr.slice(1, 4);
console.log(part);  // [2, 3, 4]
console.log(arr);   // [1, 2, 3, 4, 5] 原数组不变`,
          output: "[2, 3, 4]",
          explanation: "截取索引1到4（不含4）"
        },
        {
          title: "负数索引",
          code: `const arr = [1, 2, 3, 4, 5];
arr.slice(-2);     // [4, 5] 最后两个
arr.slice(-3, -1); // [3, 4] 倒数第3到倒数第1（不含）`,
          output: "[4, 5]",
          explanation: "支持负数索引"
        },
        {
          title: "数组复制",
          code: `const arr = [1, 2, 3];
const copy = arr.slice();  // 浅拷贝
// 等价于 [...arr] 或 Array.from(arr)`,
          output: "[1, 2, 3]",
          explanation: "不传参数相当于浅拷贝整个数组"
        }
      ],
      algorithmUseCases: [
        "获取子数组",
        "浅拷贝数组",
        "配合其他方法前先复制"
      ],
      pitfalls: [
        "✅ 不会修改原数组（这是优点）",
        "⚠️ 只是浅拷贝，嵌套对象还是同一引用"
      ],
      relatedMethods: ["splice", "substring (字符串)"],
      comparison: [
        { method: "splice", difference: "splice 会修改原数组，slice 不会" }
      ]
    },
    {
      name: "concat",
      signature: "arr.concat(...items)",
      description: "合并数组，返回新数组",
      detailedDescription: "合并两个或多个数组。不会改变现有数组，返回一个新数组。",
      mutatesOriginal: false,
      timeComplexity: "O(n) - n为所有元素总数",
      spaceComplexity: "O(n)",
      returns: "新的合并后的数组",
      examples: [
        {
          title: "合并数组",
          code: `const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5];

const merged = arr1.concat(arr2, arr3);
console.log(merged);  // [1, 2, 3, 4, 5]
console.log(arr1);    // [1, 2] 原数组不变`,
          output: "[1, 2, 3, 4, 5]",
          explanation: "合并多个数组"
        },
        {
          title: "使用展开运算符（推荐）",
          code: `const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];  // [1, 2, 3, 4]`,
          output: "[1, 2, 3, 4]",
          explanation: "现代 JS 更推荐用展开运算符"
        }
      ],
      algorithmUseCases: [
        "合并有序数组",
        "构建结果数组"
      ],
      relatedProblems: ["merge-sorted-array"],
      pitfalls: [
        "✅ 不会修改原数组",
        "⚠️ 只是浅拷贝"
      ],
      relatedMethods: ["push", "spread operator"],
      performanceTips: [
        "频繁合并大数组时，push 性能更好（避免创建中间数组）"
      ]
    },
    {
      name: "join",
      signature: "arr.join(separator?)",
      description: "将数组元素连接成字符串",
      detailedDescription: "将数组的所有元素连接成一个字符串。可以指定分隔符，默认是逗号。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "连接后的字符串",
      examples: [
        {
          title: "基本用法",
          code: `const arr = ['a', 'b', 'c'];
arr.join();      // 'a,b,c'
arr.join('-');   // 'a-b-c'
arr.join('');    // 'abc'`,
          output: "'a,b,c' / 'a-b-c' / 'abc'",
          explanation: "不同分隔符的效果"
        },
        {
          title: "数组转字符串",
          code: `const chars = ['h', 'e', 'l', 'l', 'o'];
const str = chars.join('');  // 'hello'`,
          output: "'hello'",
          explanation: "字符数组转字符串"
        }
      ],
      algorithmUseCases: [
        "数组转字符串",
        "反转字符串：str.split('').reverse().join('')",
        "构建输出格式"
      ],
      relatedProblems: ["reverse-string"],
      relatedMethods: ["split (字符串)", "toString"]
    },
    {
      name: "flat / flatMap",
      signature: "arr.flat(depth?) / arr.flatMap(callback)",
      description: "展平嵌套数组",
      detailedDescription: "flat 将嵌套数组展平指定层数。flatMap 先 map 再展平一层，适合一对多映射。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "展平后的新数组",
      examples: [
        {
          title: "flat 展平",
          code: `const arr = [1, [2, 3], [4, [5, 6]]];
arr.flat();     // [1, 2, 3, 4, [5, 6]] 展平一层
arr.flat(2);    // [1, 2, 3, 4, 5, 6] 展平两层
arr.flat(Infinity);  // 完全展平`,
          output: "[1, 2, 3, 4, 5, 6]",
          explanation: "depth 参数指定展平深度"
        },
        {
          title: "flatMap 用法",
          code: `const arr = [1, 2, 3];
// 相当于 arr.map(x => [x, x * 2]).flat()
const result = arr.flatMap(x => [x, x * 2]);
// [1, 2, 2, 4, 3, 6]`,
          output: "[1, 2, 2, 4, 3, 6]",
          explanation: "一对多映射"
        }
      ],
      algorithmUseCases: [
        "处理嵌套数组",
        "一对多映射",
        "过滤同时转换"
      ],
      pitfalls: [
        "✅ 不会修改原数组",
        "⚠️ flat 默认只展平一层"
      ],
      relatedMethods: ["map", "reduce"]
    }
  ]
};

// ==================== Map 和 Set ====================

export const mapSetMethods: JSApiCategory = {
  id: "map-set",
  name: "映射与集合",
  icon: "🗺️",
  description: "哈希表是算法题的万金油，Map 和 Set 是 JS 中最重要的数据结构",
  methods: [
    {
      name: "new Map()",
      signature: "new Map() / new Map(iterable)",
      description: "创建 Map 对象，键值对集合",
      detailedDescription: "Map 是 ES6 引入的有序键值对集合，是算法题中最重要的数据结构之一。相比 Object，Map 的 key 可以是任意类型，并且保持插入顺序。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "Map 对象",
      parameters: [
        { name: "iterable", type: "Iterable<[K, V]>", description: "可选，包含键值对的可迭代对象", optional: true }
      ],
      examples: [
        {
          title: "基本创建方式",
          code: `const map = new Map();
const map2 = new Map([['a', 1], ['b', 2]]);
const map3 = new Map(Object.entries({a: 1, b: 2}));`,
          output: "Map { 'a' => 1, 'b' => 2 }",
          explanation: "可以从数组或对象创建 Map"
        }
      ],
      algorithmUseCases: [
        "⭐ 存储键值对，O(1) 查找",
        "⭐ 统计频率",
        "⭐ 两数之和等哈希表题",
        "缓存计算结果（记忆化）"
      ],
      relatedProblems: ["two-sum", "lru-cache", "group-anagrams"],
      pitfalls: [
        "✅ Map 的 key 可以是任意类型（Object 的 key 会转字符串）",
        "✅ Map 保持插入顺序",
        "⚠️ 对象作为 key 时比较的是引用"
      ],
      comparison: [
        { method: "Object", difference: "Object 的 key 只能是字符串/Symbol，Map 的 key 可以是任意类型" },
        { method: "WeakMap", difference: "WeakMap 的 key 只能是对象，且是弱引用" }
      ]
    },
    {
      name: "map.set / get / has / delete",
      signature: "map.set(key, value) / map.get(key) / map.has(key) / map.delete(key)",
      description: "Map 的基本操作",
      detailedDescription: "这些是 Map 最核心的操作方法。set 和 delete 会修改 Map，get 和 has 只是查询不会修改。",
      mutatesOriginal: true,
      timeComplexity: "O(1) 平均",
      spaceComplexity: "O(1)",
      returns: "set: Map | get: value/undefined | has: boolean | delete: boolean",
      parameters: [
        { name: "key", type: "any", description: "键" },
        { name: "value", type: "any", description: "值（仅 set 需要）", optional: true }
      ],
      examples: [
        {
          title: "基本操作",
          code: `const map = new Map();
map.set('a', 1);      // Map { 'a' => 1 }
map.get('a');         // 1
map.get('b');         // undefined
map.has('a');         // true
map.delete('a');      // true
map.size;             // 0`,
          output: "1",
          explanation: "get 不存在的 key 返回 undefined，不是报错"
        },
        {
          title: "频率统计模板",
          code: `// 频率统计模板
const count = new Map();
for (const char of str) {
  count.set(char, (count.get(char) || 0) + 1);
}`,
          output: "Map { 'a' => 2, 'b' => 1, ... }",
          explanation: "统计字符频率的经典模式"
        }
      ],
      algorithmUseCases: [
        "O(1) 存取数据",
        "频率统计：count.set(x, (count.get(x) || 0) + 1)",
        "记忆化搜索"
      ],
      relatedProblems: ["valid-anagram", "first-unique-character-in-a-string"],
      pitfalls: [
        "⚠️ set/delete 会修改原 Map",
        "✅ get/has 不会修改原 Map",
        "⚠️ get 不存在的 key 返回 undefined，不是报错",
        "⚠️ delete 返回是否删除成功"
      ],
      performanceTips: [
        "链式调用：map.set('a', 1).set('b', 2)",
        "使用 Map.prototype.size 而不是遍历计数"
      ]
    },
    {
      name: "map.keys / values / entries",
      signature: "map.keys() / map.values() / map.entries()",
      description: "获取 Map 的键/值/键值对迭代器",
      detailedDescription: "返回 Map 的迭代器，用于遍历或转换为数组。迭代顺序与插入顺序一致。",
      mutatesOriginal: false,
      timeComplexity: "O(1) 创建迭代器",
      spaceComplexity: "O(1)",
      returns: "Iterator",
      examples: [
        {
          title: "获取键值迭代器",
          code: `const map = new Map([['a', 1], ['b', 2]]);
[...map.keys()];    // ['a', 'b']
[...map.values()];  // [1, 2]
[...map.entries()]; // [['a', 1], ['b', 2]]

// 遍历 Map
for (const [key, value] of map) {
  console.log(key, value);
}`,
          output: "['a', 'b']",
          explanation: "直接遍历 Map 等同于遍历 entries()"
        }
      ],
      algorithmUseCases: [
        "遍历 Map",
        "转换为数组进行排序等操作"
      ],
      relatedMethods: ["Object.keys", "Object.values", "Object.entries"],
      pitfalls: [
        "✅ 不会修改原 Map",
        "⚠️ 返回的是迭代器，需要展开才能得到数组"
      ]
    },
    {
      name: "new Set()",
      signature: "new Set() / new Set(iterable)",
      description: "创建 Set 对象，存储唯一值",
      detailedDescription: "Set 是 ES6 引入的值的集合，所有值都是唯一的。常用于去重和快速查找。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "Set 对象",
      parameters: [
        { name: "iterable", type: "Iterable<T>", description: "可选，可迭代对象", optional: true }
      ],
      examples: [
        {
          title: "创建和去重",
          code: `const set = new Set();
const set2 = new Set([1, 2, 2, 3]); // Set { 1, 2, 3 }

// 数组去重
const unique = [...new Set(arr)];`,
          output: "Set { 1, 2, 3 }",
          explanation: "重复的值会被自动去除"
        }
      ],
      algorithmUseCases: [
        "⭐ 数组去重",
        "⭐ O(1) 判断元素是否存在",
        "集合运算（交集、并集、差集）"
      ],
      relatedProblems: ["contains-duplicate", "intersection-of-two-arrays"],
      pitfalls: [
        "✅ Set 中的值都是唯一的",
        "⚠️ 对象去重需要自定义（Set 比较引用）",
        "⚠️ NaN 在 Set 中被认为是相等的"
      ],
      comparison: [
        { method: "Array", difference: "Array 允许重复，Set 自动去重" },
        { method: "WeakSet", difference: "WeakSet 只能存对象，且是弱引用" }
      ]
    },
    {
      name: "set.add / has / delete",
      signature: "set.add(value) / set.has(value) / set.delete(value)",
      description: "Set 的基本操作",
      detailedDescription: "这些是 Set 最核心的操作方法。add 和 delete 会修改 Set，has 只是查询不会修改。",
      mutatesOriginal: true,
      timeComplexity: "O(1) 平均",
      spaceComplexity: "O(1)",
      returns: "add: Set | has: boolean | delete: boolean",
      parameters: [
        { name: "value", type: "any", description: "要操作的值" }
      ],
      examples: [
        {
          title: "基本操作",
          code: `const set = new Set();
set.add(1);      // Set { 1 }
set.add(1);      // Set { 1 } 不会重复添加
set.has(1);      // true
set.delete(1);   // true
set.size;        // 0`,
          output: "Set { 1 }",
          explanation: "add 重复值不会报错，只是不生效"
        },
        {
          title: "检查重复模板",
          code: `// 检查重复模板
const seen = new Set();
for (const num of nums) {
  if (seen.has(num)) return true; // 发现重复
  seen.add(num);
}
return false;`,
          output: "检测数组是否有重复元素",
          explanation: "这是 contains-duplicate 问题的标准解法"
        }
      ],
      algorithmUseCases: [
        "快速判断元素是否存在",
        "去重",
        "记录访问过的状态"
      ],
      relatedProblems: ["contains-duplicate", "happy-number"],
      pitfalls: [
        "⚠️ add/delete 会修改原 Set",
        "✅ has 不会修改原 Set",
        "⚠️ add 返回 Set 本身，可链式调用"
      ]
    },
    {
      name: "Set 集合运算",
      signature: "并集 | 交集 | 差集",
      description: "使用 Set 实现集合运算",
      detailedDescription: "ES6 的 Set 没有内置集合运算方法，但可以用展开运算符和 filter 轻松实现。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "新 Set",
      examples: [
        {
          title: "集合运算实现",
          code: `const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 并集
const union = new Set([...a, ...b]); // {1, 2, 3, 4}

// 交集
const intersection = new Set([...a].filter(x => b.has(x))); // {2, 3}

// 差集 (a - b)
const difference = new Set([...a].filter(x => !b.has(x))); // {1}`,
          output: "交集: Set { 2, 3 }",
          explanation: "利用 filter 和 has 实现集合运算"
        }
      ],
      algorithmUseCases: [
        "求两个数组的交集/并集",
        "找出数组中独有的元素"
      ],
      relatedProblems: ["intersection-of-two-arrays"],
      pitfalls: [
        "✅ 这些操作都返回新 Set，不修改原 Set",
        "⚠️ 需要先将 Set 转为数组才能用 filter"
      ]
    }
  ]
};

// ==================== 字符串方法 ====================

export const stringMethods: JSApiCategory = {
  id: "string",
  name: "字符串方法",
  icon: "📝",
  description: "字符串处理是前端最常见的操作，这些方法在算法题中频繁出现。注意：JavaScript 字符串是不可变的，所有方法都返回新字符串。",
  methods: [
    {
      name: "split",
      signature: "str.split(separator, limit?)",
      description: "按分隔符拆分字符串为数组",
      detailedDescription: "将字符串按指定分隔符拆分成数组。是字符串转数组最常用的方法。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "字符串数组",
      parameters: [
        { name: "separator", type: "string | RegExp", description: "分隔符，可以是字符串或正则" },
        { name: "limit", type: "number", description: "限制返回数组长度", optional: true }
      ],
      examples: [
        {
          title: "基本用法",
          code: `'a,b,c'.split(',');   // ['a', 'b', 'c']
'hello'.split('');    // ['h', 'e', 'l', 'l', 'o']
'a b  c'.split(' ');  // ['a', 'b', '', 'c']
'a b  c'.split(/\\s+/); // ['a', 'b', 'c'] 正则分割`,
          output: "['a', 'b', 'c']",
          explanation: "空字符串分隔可得到字符数组"
        }
      ],
      algorithmUseCases: [
        "字符串转数组进行操作",
        "按空格分割单词",
        "反转字符串：str.split('').reverse().join('')"
      ],
      relatedProblems: ["reverse-string", "valid-palindrome"],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ 连续分隔符会产生空字符串",
        "⚠️ 处理多空格用正则 /\\s+/"
      ],
      relatedMethods: ["join", "Array.from"]
    },
    {
      name: "slice / substring",
      signature: "str.slice(start, end?) / str.substring(start, end?)",
      description: "截取子字符串",
      detailedDescription: "从字符串中截取一部分。slice 支持负索引，substring 不支持。",
      mutatesOriginal: false,
      timeComplexity: "O(k)",
      spaceComplexity: "O(k)",
      returns: "新字符串",
      parameters: [
        { name: "start", type: "number", description: "开始索引" },
        { name: "end", type: "number", description: "结束索引（不包含）", optional: true }
      ],
      examples: [
        {
          title: "截取子串",
          code: `const str = 'hello';
str.slice(1, 3);     // 'el'
str.slice(-2);       // 'lo' (负数索引)
str.substring(1, 3); // 'el'`,
          output: "'el'",
          explanation: "slice 更灵活，推荐使用"
        }
      ],
      algorithmUseCases: [
        "截取子串",
        "滑动窗口中获取当前窗口字符串"
      ],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ slice 支持负数索引，substring 不支持",
        "⚠️ end 索引不包含在内"
      ],
      comparison: [
        { method: "slice", difference: "支持负数索引，更灵活" },
        { method: "substring", difference: "不支持负数，参数会自动排序" }
      ],
      relatedMethods: ["substr (deprecated)", "Array.slice"]
    },
    {
      name: "charAt / charCodeAt / fromCharCode",
      signature: "str.charAt(i) / str.charCodeAt(i) / String.fromCharCode(code)",
      description: "字符与 ASCII 码转换",
      detailedDescription: "在字符和 ASCII 码之间转换，算法题中常用于字母索引计算。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "charAt: 字符 | charCodeAt: 数字 | fromCharCode: 字符",
      parameters: [
        { name: "index/code", type: "number", description: "索引或 ASCII 码" }
      ],
      examples: [
        {
          title: "字符与 ASCII 转换",
          code: `'abc'.charAt(0);       // 'a'
'abc'.charCodeAt(0);   // 97
String.fromCharCode(97); // 'a'

// 常用 ASCII 码
// 'a' = 97, 'z' = 122
// 'A' = 65, 'Z' = 90
// '0' = 48, '9' = 57`,
          output: "'a'",
          explanation: "记住常用 ASCII 码很有帮助"
        },
        {
          title: "算法应用",
          code: `// 判断是否为字母
const isLetter = c => {
  const code = c.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

// 字母转数字索引
const index = char.charCodeAt(0) - 'a'.charCodeAt(0); // 0-25`,
          output: "判断字符类型",
          explanation: "用于计数数组索引计算"
        }
      ],
      algorithmUseCases: [
        "字符与 ASCII 码转换",
        "字母转索引（用于计数数组）",
        "判断字符类型"
      ],
      relatedProblems: ["valid-anagram", "first-unique-character-in-a-string"],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ str[i] 也可以访问字符，但超出范围返回 undefined",
        "⚠️ charCodeAt 超出范围返回 NaN"
      ]
    },
    {
      name: "indexOf / includes / startsWith / endsWith",
      signature: "str.indexOf(search) / str.includes(search) / str.startsWith(s) / str.endsWith(s)",
      description: "字符串查找方法",
      detailedDescription: "查找子串位置或判断是否包含子串，是最常用的字符串查找方法。",
      mutatesOriginal: false,
      timeComplexity: "O(n*m) 最坏",
      spaceComplexity: "O(1)",
      returns: "indexOf: 数字 | 其他: boolean",
      parameters: [
        { name: "search", type: "string", description: "要查找的子串" },
        { name: "position", type: "number", description: "开始查找的位置", optional: true }
      ],
      examples: [
        {
          title: "字符串查找",
          code: `const str = 'hello world';
str.indexOf('o');       // 4
str.indexOf('x');       // -1
str.includes('world');  // true
str.startsWith('hello'); // true
str.endsWith('world');   // true`,
          output: "4",
          explanation: "indexOf 返回 -1 表示未找到"
        }
      ],
      algorithmUseCases: [
        "查找子串位置",
        "判断是否包含子串",
        "前缀/后缀匹配"
      ],
      relatedProblems: ["implement-strstr"],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ indexOf 返回 -1 表示未找到",
        "⚠️ includes 是 ES6 新增"
      ],
      relatedMethods: ["match", "search"]
    },
    {
      name: "toLowerCase / toUpperCase",
      signature: "str.toLowerCase() / str.toUpperCase()",
      description: "大小写转换",
      detailedDescription: "将字符串转换为全小写或全大写，常用于忽略大小写的比较。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "新字符串",
      examples: [
        {
          title: "大小写转换",
          code: `'Hello'.toLowerCase(); // 'hello'
'Hello'.toUpperCase(); // 'HELLO'`,
          output: "'hello'",
          explanation: "常用于忽略大小写比较"
        }
      ],
      algorithmUseCases: [
        "忽略大小写比较",
        "统一处理前先转换"
      ],
      relatedProblems: ["valid-palindrome"],
      pitfalls: [
        "✅ 不修改原字符串，返回新字符串"
      ]
    },
    {
      name: "trim / padStart / padEnd",
      signature: "str.trim() / str.padStart(len, char) / str.padEnd(len, char)",
      description: "字符串修剪和填充",
      detailedDescription: "去除首尾空格或用指定字符填充到指定长度。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "新字符串",
      parameters: [
        { name: "len", type: "number", description: "目标长度（pad 方法）" },
        { name: "char", type: "string", description: "填充字符（pad 方法）", optional: true }
      ],
      examples: [
        {
          title: "修剪和填充",
          code: `'  hello  '.trim();       // 'hello'
'5'.padStart(3, '0');     // '005'
'5'.padEnd(3, '0');       // '500'`,
          output: "'hello'",
          explanation: "padStart 常用于数字前补零"
        }
      ],
      algorithmUseCases: [
        "去除首尾空格",
        "数字前补零",
        "格式化输出"
      ],
      pitfalls: [
        "✅ 不修改原字符串"
      ],
      relatedMethods: ["trimStart", "trimEnd"]
    },
    {
      name: "repeat",
      signature: "str.repeat(count)",
      description: "重复字符串",
      detailedDescription: "将字符串重复指定次数并拼接返回。",
      mutatesOriginal: false,
      timeComplexity: "O(n * count)",
      spaceComplexity: "O(n * count)",
      returns: "新字符串",
      parameters: [
        { name: "count", type: "number", description: "重复次数" }
      ],
      examples: [
        {
          title: "重复字符串",
          code: `'ab'.repeat(3); // 'ababab'
'*'.repeat(5);  // '*****'`,
          output: "'ababab'",
          explanation: "count 为 0 返回空字符串"
        }
      ],
      algorithmUseCases: [
        "生成分隔线",
        "填充字符"
      ],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ count 不能为负数"
      ]
    },
    {
      name: "replace / replaceAll",
      signature: "str.replace(search, replacement) / str.replaceAll(search, replacement)",
      description: "替换字符串",
      detailedDescription: "replace 只替换第一个匹配，replaceAll 替换所有匹配。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "新字符串",
      parameters: [
        { name: "search", type: "string | RegExp", description: "要替换的内容" },
        { name: "replacement", type: "string | Function", description: "替换成的内容" }
      ],
      examples: [
        {
          title: "字符串替换",
          code: `'hello'.replace('l', 'L');     // 'heLlo' 只替换第一个
'hello'.replaceAll('l', 'L');  // 'heLLo' 替换所有
'hello'.replace(/l/g, 'L');    // 'heLLo' 正则全局替换`,
          output: "'heLlo'",
          explanation: "replace 只替换第一个匹配"
        }
      ],
      algorithmUseCases: [
        "字符替换",
        "删除特定字符：str.replaceAll('x', '')"
      ],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ replace 只替换第一个匹配",
        "⚠️ 全部替换用 replaceAll 或正则 /g"
      ]
    },
    {
      name: "match",
      signature: "str.match(regexp)",
      description: "正则匹配",
      detailedDescription: "使用正则表达式匹配字符串，返回匹配结果数组。",
      mutatesOriginal: false,
      timeComplexity: "取决于正则复杂度",
      spaceComplexity: "O(k)",
      returns: "匹配数组或 null",
      parameters: [
        { name: "regexp", type: "RegExp", description: "正则表达式" }
      ],
      examples: [
        {
          title: "正则匹配",
          code: `'test123'.match(/\\d+/);  // ['123']
'a1b2c3'.match(/\\d/g);  // ['1', '2', '3']

// 提取数字
const nums = str.match(/-?\\d+/g)?.map(Number) || [];`,
          output: "['123']",
          explanation: "加 g 标志返回所有匹配"
        }
      ],
      algorithmUseCases: [
        "提取数字/字母",
        "验证格式",
        "复杂模式匹配"
      ],
      pitfalls: [
        "✅ 不修改原字符串",
        "⚠️ 无匹配返回 null，需要判空",
        "⚠️ 加 g 标志返回所有匹配"
      ]
    }
  ]
};

// ==================== 数学方法 ====================

export const mathMethods: JSApiCategory = {
  id: "math",
  name: "数学方法",
  icon: "🔢",
  description: "数学计算和数值处理的常用方法。这些都是纯函数，不会修改任何数据。",
  methods: [
    {
      name: "Math.max / Math.min",
      signature: "Math.max(...values) / Math.min(...values)",
      description: "求最大值/最小值",
      detailedDescription: "返回一组数中的最大值或最小值，是 DP 和贪心算法中最常用的方法。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "数字",
      parameters: [
        { name: "values", type: "...number", description: "要比较的数值" }
      ],
      examples: [
        {
          title: "基本用法",
          code: `Math.max(1, 2, 3);        // 3
Math.min(1, 2, 3);        // 1
Math.max(...[1, 2, 3]);   // 3 数组展开
Math.max();               // -Infinity
Math.min();               // Infinity`,
          output: "3",
          explanation: "数组需要展开传入"
        }
      ],
      algorithmUseCases: [
        "求数组最值：Math.max(...arr)",
        "DP 中的状态转移：dp[i] = Math.max(dp[i-1], ...)",
        "贪心算法中的选择"
      ],
      relatedProblems: ["maximum-subarray", "best-time-to-buy-and-sell-stock"],
      pitfalls: [
        "✅ 纯函数，不修改任何数据",
        "⚠️ 空参数：max 返回 -Infinity，min 返回 Infinity",
        "⚠️ 数组太大会栈溢出，用 reduce 代替"
      ],
      performanceTips: [
        "大数组用 arr.reduce((a, b) => Math.max(a, b), -Infinity)"
      ]
    },
    {
      name: "Math.floor / ceil / round / trunc",
      signature: "Math.floor(n) / Math.ceil(n) / Math.round(n) / Math.trunc(n)",
      description: "数值取整",
      detailedDescription: "四种不同的取整方式，在二分查找等算法中非常重要。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "整数",
      parameters: [
        { name: "n", type: "number", description: "要取整的数字" }
      ],
      examples: [
        {
          title: "取整方式比较",
          code: `Math.floor(3.7);  // 3  向下取整
Math.ceil(3.2);   // 4  向上取整
Math.round(3.5);  // 4  四舍五入
Math.trunc(3.7);  // 3  截断小数

// 负数情况
Math.floor(-3.2); // -4
Math.trunc(-3.2); // -3`,
          output: "3",
          explanation: "负数时 floor 和 trunc 结果不同"
        }
      ],
      algorithmUseCases: [
        "⭐ 二分查找中点：Math.floor((left + right) / 2)",
        "分页计算",
        "坐标计算"
      ],
      relatedProblems: ["binary-search"],
      pitfalls: [
        "✅ 纯函数，不修改任何数据",
        "⚠️ floor 向负无穷取整，trunc 向零取整",
        "⚠️ 二分中点防溢出：left + Math.floor((right - left) / 2)"
      ],
      comparison: [
        { method: "floor", difference: "向下取整（向负无穷）" },
        { method: "ceil", difference: "向上取整（向正无穷）" },
        { method: "round", difference: "四舍五入" },
        { method: "trunc", difference: "截断小数（向零取整）" }
      ]
    },
    {
      name: "Math.abs",
      signature: "Math.abs(n)",
      description: "绝对值",
      detailedDescription: "返回数字的绝对值，常用于距离计算。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "非负数",
      parameters: [
        { name: "n", type: "number", description: "数字" }
      ],
      examples: [
        {
          title: "绝对值",
          code: `Math.abs(-5);   // 5
Math.abs(5);    // 5
Math.abs(0);    // 0`,
          output: "5",
          explanation: "常用于计算距离"
        }
      ],
      algorithmUseCases: [
        "计算距离",
        "判断两数接近程度"
      ],
      pitfalls: [
        "✅ 纯函数，不修改任何数据"
      ]
    },
    {
      name: "Math.pow / Math.sqrt",
      signature: "Math.pow(base, exp) / Math.sqrt(n)",
      description: "幂运算和平方根",
      detailedDescription: "计算幂次和平方根，ES7 可用 ** 运算符代替 pow。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "数字",
      parameters: [
        { name: "base/n", type: "number", description: "底数或被开方数" },
        { name: "exp", type: "number", description: "指数（pow）", optional: true }
      ],
      examples: [
        {
          title: "幂运算和平方根",
          code: `Math.pow(2, 10);  // 1024
2 ** 10;          // 1024 (ES7 语法)
Math.sqrt(16);    // 4
Math.sqrt(2);     // 1.414...`,
          output: "1024",
          explanation: "** 运算符更简洁"
        }
      ],
      algorithmUseCases: [
        "计算幂次",
        "判断完全平方数：Math.sqrt(n) % 1 === 0",
        "快速幂算法"
      ],
      relatedProblems: ["pow-x-n", "valid-perfect-square"],
      pitfalls: [
        "✅ 纯函数，不修改任何数据",
        "⚠️ 推荐使用 ** 运算符代替 Math.pow"
      ]
    },
    {
      name: "Number.MAX_SAFE_INTEGER / MIN_SAFE_INTEGER",
      signature: "Number.MAX_SAFE_INTEGER / Number.MIN_SAFE_INTEGER",
      description: "安全整数范围",
      detailedDescription: "JavaScript 能精确表示的最大和最小整数，超过会丢失精度。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "常量值",
      examples: [
        {
          title: "安全整数范围",
          code: `Number.MAX_SAFE_INTEGER;  // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER;  // -9007199254740991
Number.MAX_VALUE;         // 1.7976931348623157e+308
Infinity;                 // 无穷大`,
          output: "9007199254740991",
          explanation: "算法题中常用 Infinity 初始化"
        }
      ],
      algorithmUseCases: [
        "初始化最大/最小值",
        "DP 初始化：dp[0] = -Infinity"
      ],
      pitfalls: [
        "⚠️ 超过安全整数范围会丢失精度",
        "⚠️ 需要更大整数用 BigInt"
      ]
    },
    {
      name: "parseInt / parseFloat / Number",
      signature: "parseInt(str, radix?) / parseFloat(str) / Number(value)",
      description: "字符串转数字",
      detailedDescription: "三种字符串转数字的方式，各有不同的解析规则。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "数字",
      parameters: [
        { name: "str", type: "string", description: "要解析的字符串" },
        { name: "radix", type: "number", description: "进制（parseInt）", optional: true }
      ],
      examples: [
        {
          title: "字符串转数字",
          code: `parseInt('123');      // 123
parseInt('123.45');   // 123 (截断)
parseInt('12px');     // 12 (忽略非数字后缀)
parseInt('abc');      // NaN

parseFloat('123.45'); // 123.45
parseFloat('12.3.4'); // 12.3

Number('123');        // 123
Number('12px');       // NaN (严格)
Number('');           // 0
Number(null);         // 0
Number(undefined);    // NaN`,
          output: "123",
          explanation: "parseInt 更宽松，Number 更严格"
        }
      ],
      algorithmUseCases: [
        "字符串转数字",
        "提取数字部分",
        "进制转换：parseInt('1010', 2) = 10"
      ],
      pitfalls: [
        "✅ 纯函数，不修改任何数据",
        "⚠️ parseInt 会忽略非数字后缀，Number 更严格",
        "⚠️ parseInt 第二个参数是进制！",
        "⚠️ 空字符串：Number('') = 0，parseInt('') = NaN"
      ],
      comparison: [
        { method: "parseInt", difference: "宽松解析，忽略非数字后缀" },
        { method: "parseFloat", difference: "解析浮点数" },
        { method: "Number", difference: "严格解析，任何非数字都返回 NaN" }
      ],
      relatedMethods: ["toString", "toFixed"]
    },
    {
      name: "toString (进制转换)",
      signature: "num.toString(radix?)",
      description: "数字转字符串，支持进制转换",
      detailedDescription: "将数字转为指定进制的字符串表示，配合 parseInt 可实现进制转换。",
      mutatesOriginal: false,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(log n)",
      returns: "字符串",
      parameters: [
        { name: "radix", type: "number", description: "进制，2-36", optional: true }
      ],
      examples: [
        {
          title: "进制转换",
          code: `(255).toString();    // '255'
(255).toString(16);  // 'ff' (十六进制)
(255).toString(2);   // '11111111' (二进制)
(8).toString(8);     // '10' (八进制)

// 进制转换
parseInt('ff', 16);  // 255
parseInt('1010', 2); // 10`,
          output: "'ff'",
          explanation: "配合 parseInt 实现任意进制转换"
        }
      ],
      algorithmUseCases: [
        "二进制相关题目",
        "进制转换",
        "数字转字符串"
      ],
      relatedProblems: ["number-of-1-bits", "reverse-bits"],
      pitfalls: [
        "✅ 纯函数，不修改任何数据",
        "⚠️ 数字字面量需要括号：(255).toString(16)"
      ]
    }
  ]
};

// ==================== 位运算 ====================

export const bitOperations: JSApiCategory = {
  id: "bit",
  name: "位运算",
  icon: "⚡",
  description: "位运算效率极高，常用于优化和特殊技巧。这些是运算符，不会修改原变量。",
  methods: [
    {
      name: "& (AND) | (OR) ^ (XOR)",
      signature: "a & b | a | b | a ^ b",
      description: "按位与、或、异或",
      detailedDescription: "最常用的三个位运算符。AND 常用于掩码，XOR 常用于查找唯一元素。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "整数",
      examples: [
        {
          title: "位运算基础",
          code: `// 按位与 AND: 都为1才为1
5 & 3;  // 101 & 011 = 001 = 1

// 按位或 OR: 有1就为1
5 | 3;  // 101 | 011 = 111 = 7

// 按位异或 XOR: 不同为1
5 ^ 3;  // 101 ^ 011 = 110 = 6
5 ^ 5;  // 0 (相同数异或为0)
5 ^ 0;  // 5 (任何数异或0为自己)`,
          output: "1, 7, 6",
          explanation: "异或的特性在算法中非常有用"
        }
      ],
      algorithmUseCases: [
        "⭐ n & 1: 判断奇偶（比 n % 2 快）",
        "⭐ n & (n-1): 消除最低位的1",
        "⭐ a ^ a = 0: 找单独出现的数",
        "交换两数：a ^= b; b ^= a; a ^= b;"
      ],
      relatedProblems: ["single-number", "number-of-1-bits", "power-of-two"],
      pitfalls: [
        "✅ 运算符返回新值，不修改操作数",
        "⚠️ 注意运算符优先级，建议加括号"
      ]
    },
    {
      name: "<< >> >>> (位移)",
      signature: "n << k | n >> k | n >>> k",
      description: "左移、右移、无符号右移",
      detailedDescription: "位移操作等价于乘除 2 的幂次，效率更高。在二分查找中常用于计算中点。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "整数",
      examples: [
        {
          title: "位移操作",
          code: `// 左移 (相当于 * 2^k)
5 << 1;   // 1010 (10)
5 << 2;   // 10100 (20)

// 右移 (相当于 / 2^k 向下取整)
20 >> 1;  // 10
20 >> 2;  // 5

// 取中点（防溢出）
const mid = left + ((right - left) >> 1);`,
          output: "10",
          explanation: "位移比乘除更高效"
        }
      ],
      algorithmUseCases: [
        "⭐ n >> 1: 除以2（比 Math.floor(n/2) 快）",
        "⭐ n << 1: 乘以2",
        "⭐ 二分取中点防溢出"
      ],
      relatedProblems: ["divide-two-integers", "power-of-two"],
      pitfalls: [
        "✅ 运算符返回新值，不修改操作数",
        "⚠️ >> 是有符号右移，>>> 是无符号右移"
      ]
    },
    {
      name: "~ (取反)",
      signature: "~n",
      description: "按位取反",
      detailedDescription: "将每一位 0 变 1，1 变 0。在 32 位整数中，~n = -(n+1)。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "整数",
      examples: [
        {
          title: "按位取反",
          code: `~5;    // -6  (对于32位整数：~n = -(n+1))
~(-1); // 0
~~3.7; // 3  (双重取反实现取整，比 Math.floor 快)`,
          output: "-6",
          explanation: "~~ 是一种快速取整技巧"
        }
      ],
      algorithmUseCases: [
        "~~n: 快速取整（向零取整）",
        "~arr.indexOf(x) 作为布尔值（找到为真值）"
      ],
      pitfalls: [
        "✅ 运算符返回新值，不修改操作数",
        "⚠️ ~n = -(n+1)",
        "⚠️ ~~n 对负数是向零取整，不是向下取整"
      ]
    }
  ]
};

// ==================== 特殊技巧 ====================

export const specialTechniques: JSApiCategory = {
  id: "techniques",
  name: "算法特殊技巧",
  icon: "🎯",
  description: "ES6+ 语法糖和算法中的实用技巧。这些是编程模式和模板，不是具体方法。",
  methods: [
    {
      name: "解构赋值交换",
      signature: "[a, b] = [b, a]",
      description: "不用临时变量交换两个值",
      detailedDescription: "ES6 解构赋值可以在一行代码内完成变量交换，非常适合算法中的元素交换。",
      mutatesOriginal: true,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "无",
      examples: [
        {
          title: "变量和数组元素交换",
          code: `let a = 1, b = 2;
[a, b] = [b, a];
// a = 2, b = 1

// 数组元素交换
const arr = [1, 2, 3];
[arr[0], arr[2]] = [arr[2], arr[0]];
// arr = [3, 2, 1]`,
          output: "a = 2, b = 1",
          explanation: "比传统三变量交换更简洁"
        }
      ],
      algorithmUseCases: [
        "⭐ 双指针交换元素",
        "⭐ 排序算法中交换",
        "反转数组元素"
      ],
      relatedProblems: ["reverse-string", "sort-colors"],
      pitfalls: [
        "⚠️ 会修改原变量或数组元素"
      ]
    },
    {
      name: "展开运算符",
      signature: "[...arr] | {...obj} | fn(...args)",
      description: "展开数组/对象",
      detailedDescription: "展开运算符可以快速复制数组/对象或作为函数参数传入，是 ES6 最常用的语法之一。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      returns: "新数组/对象",
      examples: [
        {
          title: "展开运算符用法",
          code: `// 数组拷贝
const copy = [...arr];

// 合并数组
const merged = [...arr1, ...arr2];

// 函数参数展开
Math.max(...arr);

// 对象拷贝合并
const newObj = {...obj1, ...obj2};`,
          output: "新数组或对象",
          explanation: "创建新对象，不修改原数据"
        }
      ],
      algorithmUseCases: [
        "数组浅拷贝",
        "合并数组",
        "Math.max/min 传入数组"
      ],
      pitfalls: [
        "✅ 不修改原数组/对象，创建新的",
        "⚠️ 只是浅拷贝",
        "⚠️ 大数组展开可能栈溢出"
      ]
    },
    {
      name: "可选链 ?.  空值合并 ??",
      signature: "obj?.prop | arr?.[i] | a ?? b",
      description: "安全访问和默认值",
      detailedDescription: "可选链避免访问 undefined/null 属性时报错，空值合并提供默认值。",
      mutatesOriginal: false,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      returns: "值或 undefined",
      examples: [
        {
          title: "安全访问和默认值",
          code: `// 可选链
const name = user?.profile?.name; // 安全访问
const first = arr?.[0];           // 数组安全访问

// 空值合并 (只有 null/undefined 时用默认值)
const val = input ?? 'default';
0 ?? 'default';     // 0 (0 不是 nullish)
'' ?? 'default';    // '' (空字符串不是 nullish)

// 对比 ||
0 || 'default';     // 'default' (0 是 falsy)`,
          output: "安全访问嵌套属性",
          explanation: "?? 只对 null/undefined 生效，|| 对所有 falsy 值生效"
        }
      ],
      algorithmUseCases: [
        "安全访问链表/树节点",
        "防止 undefined 报错",
        "提供默认值"
      ],
      pitfalls: [
        "✅ 只是访问，不修改任何数据",
        "⚠️ ?? 和 || 的行为不同"
      ]
    },
    {
      name: "二维数组初始化",
      signature: "Array.from({length: m}, () => Array(n).fill(0))",
      description: "正确创建二维数组",
      detailedDescription: "DP 和矩阵题目中必备的初始化模式，注意避免 fill 引用类型的陷阱。",
      mutatesOriginal: false,
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
      returns: "二维数组",
      examples: [
        {
          title: "二维数组初始化方式",
          code: `// ❌ 错误方式 (所有行引用同一数组)
const wrong = new Array(3).fill(new Array(4).fill(0));
wrong[0][0] = 1; // 所有行都变了！

// ✅ 正确方式1: Array.from
const dp = Array.from({length: 3}, () => Array(4).fill(0));

// ✅ 正确方式2: map
const dp2 = new Array(3).fill(null).map(() => new Array(4).fill(0));

// ✅ 正确方式3: for 循环
const dp3 = [];
for (let i = 0; i < 3; i++) {
  dp3[i] = new Array(4).fill(0);
}`,
          output: "[[0,0,0,0], [0,0,0,0], [0,0,0,0]]",
          explanation: "必须保证每行是独立的数组"
        }
      ],
      algorithmUseCases: [
        "⭐ DP 二维数组初始化",
        "⭐ 矩阵题目",
        "图的邻接矩阵"
      ],
      relatedProblems: ["unique-paths", "minimum-path-sum", "longest-common-subsequence"],
      pitfalls: [
        "✅ Array.from 创建新数组",
        "⚠️ fill 引用类型会导致所有元素指向同一对象！",
        "⚠️ 必须用 Array.from 或 map 创建独立的行"
      ]
    },
    {
      name: "频率计数模板",
      signature: "Map 或 Object 计数",
      description: "统计元素出现次数",
      detailedDescription: "算法题中最常用的模式之一，用于统计字符/数字出现频率。",
      mutatesOriginal: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
      returns: "频率表",
      examples: [
        {
          title: "三种频率统计方式",
          code: `// 方式1: Map (推荐)
const count = new Map();
for (const item of arr) {
  count.set(item, (count.get(item) || 0) + 1);
}

// 方式2: Object
const count2 = {};
for (const item of arr) {
  count2[item] = (count2[item] || 0) + 1;
}

// 方式3: reduce
const count3 = arr.reduce((map, item) => {
  map.set(item, (map.get(item) || 0) + 1);
  return map;
}, new Map());`,
          output: "Map { 'a' => 2, 'b' => 1 }",
          explanation: "Map 比 Object 更适合任意类型的 key"
        }
      ],
      algorithmUseCases: [
        "⭐ 字符/数字频率统计",
        "⭐ 变位词检测",
        "⭐ 滑动窗口计数"
      ],
      relatedProblems: ["valid-anagram", "top-k-frequent-elements", "minimum-window-substring"],
      pitfalls: [
        "⚠️ 会修改创建的 Map/Object",
        "✅ 不修改原数组"
      ]
    },
    {
      name: "双指针模板",
      signature: "左右指针 | 快慢指针",
      description: "双指针常用模式",
      detailedDescription: "双指针是最常用的算法技巧之一，分为相向双指针、同向双指针和快慢指针三种。",
      mutatesOriginal: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      returns: "取决于具体问题",
      examples: [
        {
          title: "三种双指针模式",
          code: `// 相向双指针 (有序数组两数之和)
let left = 0, right = arr.length - 1;
while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum === target) return [left, right];
  if (sum < target) left++;
  else right--;
}

// 同向双指针 (移除元素)
let slow = 0;
for (let fast = 0; fast < arr.length; fast++) {
  if (arr[fast] !== val) {
    arr[slow++] = arr[fast];
  }
}

// 快慢指针 (链表环检测)
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true; // 有环
}`,
          output: "双指针模板",
          explanation: "根据问题类型选择合适的双指针模式"
        }
      ],
      algorithmUseCases: [
        "⭐ 有序数组问题",
        "⭐ 原地修改数组",
        "⭐ 链表环检测",
        "回文判断"
      ],
      relatedProblems: ["two-sum-ii-input-array-is-sorted", "move-zeroes", "linked-list-cycle", "valid-palindrome"],
      pitfalls: [
        "⚠️ 同向双指针通常会修改原数组",
        "✅ 相向双指针和快慢指针通常不修改"
      ]
    },
    {
      name: "滑动窗口模板",
      signature: "定长窗口 | 变长窗口",
      description: "滑动窗口常用模式",
      detailedDescription: "滑动窗口是解决子串/子数组问题的核心技巧，通过维护一个窗口来避免重复计算。",
      mutatesOriginal: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
      returns: "取决于具体问题",
      examples: [
        {
          title: "变长滑动窗口模板",
          code: `// 变长滑动窗口模板 (最长无重复子串)
const window = new Map(); // 或 Set
let left = 0, result = 0;

for (let right = 0; right < s.length; right++) {
  const c = s[right];
  // 1. 扩大窗口，更新状态
  window.set(c, (window.get(c) || 0) + 1);

  // 2. 收缩窗口条件
  while (window.get(c) > 1) {
    const d = s[left];
    window.set(d, window.get(d) - 1);
    left++;
  }

  // 3. 更新结果
  result = Math.max(result, right - left + 1);
}`,
          output: "滑动窗口模板",
          explanation: "扩大窗口 → 判断是否收缩 → 更新结果"
        }
      ],
      algorithmUseCases: [
        "⭐ 子串/子数组问题",
        "⭐ 最长/最短满足条件的区间",
        "连续元素问题"
      ],
      relatedProblems: ["longest-substring-without-repeating-characters", "minimum-window-substring", "find-all-anagrams-in-a-string"],
      pitfalls: [
        "✅ 不修改原字符串/数组",
        "⚠️ 窗口状态（Map/Set）会被修改"
      ]
    }
  ]
};

// ==================== 导出所有分类 ====================

export const jsApiCategories: JSApiCategory[] = [
  arrayMethods,
  mapSetMethods,
  stringMethods,
  mathMethods,
  bitOperations,
  specialTechniques
];

/**
 * 根据分类 ID 获取分类
 */
export function getApiCategoryById(id: string): JSApiCategory | undefined {
  return jsApiCategories.find(cat => cat.id === id);
}

/**
 * 根据方法名搜索
 */
export function searchApiMethods(query: string): { category: JSApiCategory; method: JSApiMethod }[] {
  const results: { category: JSApiCategory; method: JSApiMethod }[] = [];
  const lowerQuery = query.toLowerCase();

  for (const category of jsApiCategories) {
    for (const method of category.methods) {
      if (
        method.name.toLowerCase().includes(lowerQuery) ||
        method.description.toLowerCase().includes(lowerQuery) ||
        method.algorithmUseCases.some(use => use.toLowerCase().includes(lowerQuery))
      ) {
        results.push({ category, method });
      }
    }
  }

  return results;
}

/**
 * 获取某题目相关的 API 方法
 */
export function getApiMethodsByProblemId(problemId: string): { category: JSApiCategory; method: JSApiMethod }[] {
  const results: { category: JSApiCategory; method: JSApiMethod }[] = [];

  for (const category of jsApiCategories) {
    for (const method of category.methods) {
      if (method.relatedProblems?.includes(problemId)) {
        results.push({ category, method });
      }
    }
  }

  return results;
}
