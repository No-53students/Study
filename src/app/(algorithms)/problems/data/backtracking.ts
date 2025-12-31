import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const backtrackingProblems: Problem[] = [
  // 1. 全排列 (46)
  {
    id: "permutations",
    leetcodeId: 46,
    title: "全排列",
    titleEn: "Permutations",
    difficulty: "medium",
    category: "backtracking",
    tags: ["数组", "回溯"],
    frontendRelevance: "medium",
    frontendNote: "全排列",
    description: `给定一个不含重复数字的数组 \`nums\`，返回其 **所有可能的全排列**。你可以 **按任意顺序** 返回答案。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,1]
输出：[[0,1],[1,0]]
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1]
输出：[[1]]
\`\`\``,
    constraints: `- \`1 <= nums.length <= 6\`
- \`-10 <= nums[i] <= 10\`
- \`nums\` 中的所有整数 **互不相同**`,
    initialCode: `function permute(nums) {
  // 在此处编写你的代码

}`,
    solution: `function permute(nums) {
  const result = [];

  const backtrack = (path, used) => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      path.push(nums[i]);
      used[i] = true;

      backtrack(path, used);

      path.pop();
      used[i] = false;
    }
  };

  backtrack([], new Array(nums.length).fill(false));
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "三元素",
        input: [[[1,2,3]]],
        expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
      },
      {
        id: "2",
        name: "两元素",
        input: [[[0,1]]],
        expected: [[0,1],[1,0]]
      },
      {
        id: "3",
        name: "单元素",
        input: [[[1]]],
        expected: [[1]]
      }
    ],
    hints: [
      "使用回溯法，维护一个used数组标记已使用的元素",
      "每次选择一个未使用的元素加入路径",
      "当路径长度等于数组长度时，记录结果"
    ],
    explanation: `## 解题思路

### 回溯法

1. 维护一个 \`path\` 数组记录当前排列
2. 维护一个 \`used\` 数组标记哪些元素已被使用
3. 遍历所有元素，选择未被使用的加入 path
4. 递归处理下一个位置
5. 回溯：撤销选择（从 path 移除，标记为未使用）

### 复杂度分析
- 时间复杂度：O(n × n!)，n! 个排列，每个需要 O(n) 时间复制
- 空间复杂度：O(n)，递归栈深度`,
    timeComplexity: "O(n × n!)",
    spaceComplexity: "O(n)",
    relatedProblems: ["subsets", "combination-sum"],
    solutions: [
      {
        name: "回溯 + used数组（推荐）",
        code: `/**
 * 全排列 - 回溯 + used 数组
 *
 * 核心思想：
 * 排列问题的本质是"选择"，每个位置都可以选择任意一个未使用的元素
 *
 * 回溯三要素：
 * 1. 路径(path)：已经做出的选择
 * 2. 选择列表：当前可以做的选择（未使用的元素）
 * 3. 结束条件：路径长度等于数组长度
 *
 * 回溯模板：
 * backtrack(路径, 选择列表) {
 *   if (满足结束条件) { 记录结果; return; }
 *   for (选择 in 选择列表) {
 *     做选择;
 *     backtrack(路径, 选择列表);
 *     撤销选择;
 *   }
 * }
 *
 * 时间复杂度：O(n × n!) - n! 个排列，每个需要 O(n) 复制
 * 空间复杂度：O(n) - 递归栈深度 + path + used 数组
 */
function permute(nums) {
  const result = [];  // 存储所有排列结果

  /**
   * 回溯函数
   * @param path - 当前已选择的路径
   * @param used - 标记数组，used[i] 表示 nums[i] 是否已被使用
   */
  const backtrack = (path, used) => {
    // 结束条件：路径长度等于数组长度，找到一个完整排列
    if (path.length === nums.length) {
      result.push([...path]);  // 注意要复制一份，否则会被后续修改
      return;
    }

    // 遍历所有元素，尝试每个选择
    for (let i = 0; i < nums.length; i++) {
      // 跳过已使用的元素
      if (used[i]) continue;

      // 做选择：将 nums[i] 加入路径，标记为已使用
      path.push(nums[i]);
      used[i] = true;

      // 递归：进入下一层决策树
      backtrack(path, used);

      // 撤销选择（回溯）：将 nums[i] 从路径移除，标记为未使用
      path.pop();
      used[i] = false;
    }
  };

  // 从空路径开始回溯
  backtrack([], new Array(nums.length).fill(false));
  return result;
}

/**
 * 决策树示意（nums = [1, 2, 3]）：
 *
 *                    []
 *          /         |         \\
 *        [1]        [2]        [3]
 *       /   \\      /   \\      /   \\
 *    [1,2] [1,3] [2,1] [2,3] [3,1] [3,2]
 *      |     |     |     |     |     |
 *  [1,2,3][1,3,2][2,1,3][2,3,1][3,1,2][3,2,1]
 *
 * 执行过程：
 * 1. path=[], 选择1 → path=[1]
 * 2. path=[1], 选择2 → path=[1,2]
 * 3. path=[1,2], 选择3 → path=[1,2,3] ✓ 记录结果
 * 4. 回溯 → path=[1,2], 无更多选择
 * 5. 回溯 → path=[1], 选择3 → path=[1,3]
 * 6. path=[1,3], 选择2 → path=[1,3,2] ✓ 记录结果
 * ...以此类推
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "全排列回溯演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "待选择" },
              ],
              description: "nums=[1,2,3]。开始回溯，path=[], used=[F,F,F]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "选择1" },
              ],
              description: "选择1加入path。path=[1], used=[T,F,F]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "已选" },
                { indices: [1], color: "blue" as const, label: "选择2" },
              ],
              description: "选择2加入path。path=[1,2], used=[T,T,F]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "[1,2,3]" },
              ],
              description: "选择3，path=[1,2,3]完整！记录结果，回溯",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "已选" },
                { indices: [2], color: "blue" as const, label: "选择3" },
              ],
              description: "回溯到path=[1]，选择3。path=[1,3]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 2, 1], color: "green" as const, label: "[1,3,2]" },
              ],
              description: "选择2，path=[1,3,2]完整！共生成6个排列",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯 + used数组

### 思路
1. 维护一个 \`path\` 数组记录当前排列
2. 维护一个 \`used\` 数组标记哪些元素已被使用
3. 遍历所有元素，选择未被使用的加入 path
4. 递归处理下一个位置
5. 回溯：撤销选择（从 path 移除，标记为未使用）

### 要点
- 每次遍历从0开始，通过 used 数组判断是否可选
- 回溯时要同时恢复 path 和 used 状态`,
        timeComplexity: "O(n × n!)",
        spaceComplexity: "O(n)",
      },
      {
        name: "回溯 + 交换",
        code: `/**
 * 全排列 - 回溯 + 交换法
 *
 * 核心思想：
 * 不使用额外的 used 数组和 path 数组
 * 通过交换数组元素的位置来生成所有排列
 *
 * 算法思路：
 * - 将数组分为"已固定部分"和"待排列部分"
 * - 每次将 start 位置与后面的每个位置交换
 * - start 之前的元素已经固定，start 之后的元素待排列
 *
 * 时间复杂度：O(n × n!)
 * 空间复杂度：O(n) - 只有递归栈，不需要额外数组
 */
function permute(nums) {
  const result = [];

  /**
   * 回溯函数
   * @param start - 当前要固定的位置，[0, start) 已固定，[start, n) 待排列
   */
  const backtrack = (start) => {
    // 结束条件：所有位置都已固定
    if (start === nums.length) {
      result.push([...nums]);  // 复制当前数组状态
      return;
    }

    // 将 start 位置与 [start, n) 中的每个位置交换
    for (let i = start; i < nums.length; i++) {
      // 交换：让 nums[i] 固定在 start 位置
      [nums[start], nums[i]] = [nums[i], nums[start]];

      // 递归：固定下一个位置
      backtrack(start + 1);

      // 回溯：换回来，恢复原状态
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  };

  backtrack(0);
  return result;
}

/**
 * 交换法示意（nums = [1, 2, 3]）：
 *
 * start=0 时，与自己、2、3分别交换：
 *   [1,2,3] - 交换(0,0) → [1,2,3] → 递归
 *   [1,2,3] - 交换(0,1) → [2,1,3] → 递归
 *   [1,2,3] - 交换(0,2) → [3,2,1] → 递归
 *
 * 以第一个分支 [1,2,3] 为例，start=1：
 *   [1,2,3] - 交换(1,1) → [1,2,3] → 递归 start=2
 *   [1,2,3] - 交换(1,2) → [1,3,2] → 递归 start=2
 *
 * 交换法 vs used数组法：
 * - 交换法：空间更优，直接在原数组操作
 * - used数组法：更直观，适合理解回溯思想
 *
 * 注意：交换法生成的排列顺序与 used 数组法不同
 * 但都能生成所有 n! 个排列
 */`,
        explanation: `## 回溯 + 交换法

### 思路
1. 不使用额外的 used 数组
2. 通过交换元素位置来生成排列
3. 每次将 start 位置与后面的每个位置交换
4. 递归处理 start+1 之后的部分
5. 回溯时交换回原来的位置

### 优点
- 空间效率更高，不需要 used 数组
- 直接在原数组上操作`,
        animation: {
          type: "two-pointers" as const,
          title: "全排列交换法演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "gray" as const, label: "nums" }],
              description: "nums=[1,2,3]。通过交换元素生成排列，start=0",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "固定1" }],
              description: "swap(0,0)即不交换，固定位置0为1，递归start=1",
            },
            {
              array: ["1", "2", "3"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "已固定" },
                { indices: [1], color: "blue" as const, label: "固定2" },
              ],
              description: "swap(1,1)，固定位置1为2，递归start=2",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "[1,2,3]" }],
              description: "start=3=length，记录[1,2,3]，回溯",
            },
            {
              array: ["1", "3", "2"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "已固定" },
                { indices: [1, 2], color: "yellow" as const, label: "交换" },
              ],
              description: "回溯后swap(1,2)，交换2和3，递归",
            },
            {
              array: ["1", "3", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "[1,3,2]" }],
              description: "记录[1,3,2]。继续回溯处理其他分支生成全部6个排列",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × n!)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代法（插入）",
        code: `/**
 * 全排列 - 迭代法（插入法）
 *
 * 核心思想：
 * 不使用递归，通过逐步构建的方式生成排列
 * 每次取一个新数字，将它插入到现有排列的每个可能位置
 *
 * 构建过程：
 * - 初始：[[]]（空排列）
 * - 加入1：在[]的每个位置插入1 → [[1]]
 * - 加入2：在[1]的每个位置插入2 → [[2,1], [1,2]]
 * - 加入3：在[2,1]和[1,2]的每个位置插入3
 *         [2,1] → [3,2,1], [2,3,1], [2,1,3]
 *         [1,2] → [3,1,2], [1,3,2], [1,2,3]
 *
 * 时间复杂度：O(n × n!) - 生成 n! 个排列
 * 空间复杂度：O(n!) - 存储所有排列结果
 */
function permute(nums) {
  let result = [[]];  // 初始化为包含空排列的数组

  // 逐个加入数字
  for (const num of nums) {
    const newResult = [];  // 存储本轮生成的新排列

    // 遍历现有的每个排列
    for (const perm of result) {
      // 将 num 插入到 perm 的每个位置
      // 位置范围：0 到 perm.length（共 perm.length + 1 个位置）
      for (let i = 0; i <= perm.length; i++) {
        // 在位置 i 处插入 num
        // [...perm.slice(0, i)] 是前半部分
        // [...perm.slice(i)] 是后半部分
        const newPerm = [...perm.slice(0, i), num, ...perm.slice(i)];
        newResult.push(newPerm);
      }
    }

    result = newResult;  // 更新结果为新一轮的排列
  }

  return result;
}

/**
 * 插入法执行示例（nums = [1, 2, 3]）：
 *
 * 初始：result = [[]]
 *
 * 第1轮，加入 1：
 * - perm = [], 在位置0插入1 → [1]
 * - result = [[1]]
 *
 * 第2轮，加入 2：
 * - perm = [1]
 *   - 位置0插入2 → [2, 1]
 *   - 位置1插入2 → [1, 2]
 * - result = [[2,1], [1,2]]
 *
 * 第3轮，加入 3：
 * - perm = [2, 1]
 *   - 位置0插入3 → [3, 2, 1]
 *   - 位置1插入3 → [2, 3, 1]
 *   - 位置2插入3 → [2, 1, 3]
 * - perm = [1, 2]
 *   - 位置0插入3 → [3, 1, 2]
 *   - 位置1插入3 → [1, 3, 2]
 *   - 位置2插入3 → [1, 2, 3]
 * - result = [[3,2,1], [2,3,1], [2,1,3], [3,1,2], [1,3,2], [1,2,3]]
 *
 * 迭代法的优点：
 * 1. 避免递归，不会栈溢出
 * 2. 思路直观：逐步构建排列
 * 3. 适合需要处理超大规模数据的场景
 */`,
        explanation: `## 迭代法（插入）

### 思路
1. 从空排列开始
2. 每次取一个新数字，插入到现有每个排列的每个位置
3. 例如：[] -> [1] -> [2,1], [1,2] -> [3,2,1], [2,3,1], [2,1,3], ...

### 优点
- 非递归实现，避免栈溢出
- 思路直观：逐步构建排列`,
        animation: {
          type: "two-pointers" as const,
          title: "全排列迭代法演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [],
              description: "nums=[1,2,3]。迭代法：逐个数字插入已有排列的每个位置",
            },
            {
              array: ["[]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "gray" as const, label: "初始" }],
              description: "初始result=[[]]，一个空排列",
            },
            {
              array: ["[1]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "加入1" }],
              description: "加入1: 在[]的位置0插入1→[1]。result=[[1]]",
            },
            {
              array: ["[2,1]", "[1,2]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "位置0" },
                { indices: [1], color: "green" as const, label: "位置1" },
              ],
              description: "加入2: 在[1]的位置0插入→[2,1]，位置1插入→[1,2]",
            },
            {
              array: ["[3,2,1]", "[2,3,1]", "[2,1,3]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "yellow" as const, label: "从[2,1]" }],
              description: "加入3到[2,1]: 位置0→[3,2,1]，1→[2,3,1]，2→[2,1,3]",
            },
            {
              array: ["[3,1,2]", "[1,3,2]", "[1,2,3]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "从[1,2]" }],
              description: "加入3到[1,2]: 位置0→[3,1,2]，1→[1,3,2]，2→[1,2,3]。共6个",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × n!)",
        spaceComplexity: "O(n!)",
      },
    ],
  },

  // 2. 子集 (78)
  {
    id: "subsets",
    leetcodeId: 78,
    title: "子集",
    titleEn: "Subsets",
    difficulty: "medium",
    category: "backtracking",
    tags: ["位运算", "数组", "回溯"],
    frontendRelevance: "medium",
    frontendNote: "子集，回溯/位运算",
    description: `给你一个整数数组 \`nums\`，数组中的元素 **互不相同**。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按 **任意顺序** 返回解集。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0]
输出：[[],[0]]
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10\`
- \`-10 <= nums[i] <= 10\`
- \`nums\` 中的所有元素 **互不相同**`,
    initialCode: `function subsets(nums) {
  // 在此处编写你的代码

}`,
    solution: `function subsets(nums) {
  const result = [];

  const backtrack = (start, path) => {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "三元素",
        input: [[[1,2,3]]],
        expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
      },
      {
        id: "2",
        name: "单元素",
        input: [[[0]]],
        expected: [[],[0]]
      }
    ],
    hints: [
      "使用回溯法，每个元素都有选或不选两种情况",
      "用 start 参数避免重复选择前面的元素",
      "每次递归都将当前 path 加入结果"
    ],
    explanation: `## 解题思路

### 回溯法

1. 每次递归时，先将当前路径加入结果集
2. 从 start 开始遍历，保证不会选择前面的元素（避免重复）
3. 选择当前元素，递归处理后续元素
4. 回溯：撤销选择

### 复杂度分析
- 时间复杂度：O(n × 2^n)，共 2^n 个子集，每个需要 O(n) 复制
- 空间复杂度：O(n)，递归栈深度`,
    timeComplexity: "O(n × 2^n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["permutations", "combination-sum"],
    solutions: [
      {
        name: "回溯法（推荐）",
        code: `/**
 * 子集 - 回溯法
 *
 * 核心思想：
 * 子集问题与排列问题不同：
 * - 排列：元素顺序重要，[1,2] 和 [2,1] 是不同排列
 * - 子集：元素顺序不重要，{1,2} 和 {2,1} 是同一子集
 *
 * 关键点：使用 start 参数避免重复
 * - 每次只从 start 位置开始选择，不回头选前面的元素
 * - 保证子集中元素的相对顺序与原数组一致
 *
 * 与排列问题的区别：
 * - 排列：每个节点都要遍历所有元素（用 used 数组标记）
 * - 子集：每个节点只遍历 start 之后的元素
 *
 * 时间复杂度：O(n × 2^n) - 共 2^n 个子集，每个需要 O(n) 复制
 * 空间复杂度：O(n) - 递归栈深度
 */
function subsets(nums) {
  const result = [];  // 存储所有子集

  /**
   * 回溯函数
   * @param start - 从 nums[start] 开始选择元素
   * @param path - 当前子集
   */
  const backtrack = (start, path) => {
    // 关键：每个节点都是一个有效子集，直接记录
    // （不像排列那样只在叶子节点记录）
    result.push([...path]);

    // 从 start 开始遍历，避免重复选择前面的元素
    for (let i = start; i < nums.length; i++) {
      // 做选择：将 nums[i] 加入当前子集
      path.push(nums[i]);

      // 递归：从 i+1 开始，不能再选 i 及之前的元素
      backtrack(i + 1, path);

      // 撤销选择：移除 nums[i]
      path.pop();
    }
  };

  backtrack(0, []);
  return result;
}

/**
 * 决策树示意（nums = [1, 2, 3]）：
 *
 *                      []              ← 记录 []
 *           /          |          \\
 *         [1]         [2]         [3]   ← 记录 [1], [2], [3]
 *        /   \\         |
 *     [1,2]  [1,3]    [2,3]            ← 记录 [1,2], [1,3], [2,3]
 *       |
 *    [1,2,3]                           ← 记录 [1,2,3]
 *
 * 执行过程：
 * 1. path=[], start=0 → 记录 []
 * 2. 选择1 → path=[1], 记录 [1]
 * 3. 选择2 → path=[1,2], 记录 [1,2]
 * 4. 选择3 → path=[1,2,3], 记录 [1,2,3]
 * 5. 回溯 → path=[1,2]，无更多选择
 * 6. 回溯 → path=[1]，选择3 → path=[1,3], 记录 [1,3]
 * ...
 *
 * 子集个数：2^n = 2^3 = 8
 * 结果：[[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
 *
 * start 的作用：
 * - 保证只向后选择，不回头
 * - 避免产生重复子集（如 [1,2] 和 [2,1]）
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "子集回溯演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[1,2,3]。开始回溯，path=[]，记录空集[]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "[1]" },
              ],
              description: "选择1，path=[1]，记录[1]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "[1,2]" },
              ],
              description: "选择2，path=[1,2]，记录[1,2]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "[1,2,3]" },
              ],
              description: "选择3，path=[1,2,3]，记录[1,2,3]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "已选" },
                { indices: [2], color: "blue" as const, label: "选择3" },
              ],
              description: "回溯到[1]，跳过2，选择3。path=[1,3]，记录[1,3]",
            },
            {
              array: ["1", "2", "3"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1, 2], color: "blue" as const, label: "[2,3]" },
              ],
              description: "回溯到[]，选择2再选3。记录[2],[2,3],[3]。共8个子集",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯法

### 思路
1. 每次递归时，先将当前路径加入结果集
2. 从 start 开始遍历，保证不会选择前面的元素（避免重复）
3. 选择当前元素，递归处理后续元素
4. 回溯：撤销选择

### 要点
- start 参数保证每个子集中元素的顺序是升序
- 每个递归节点都产生一个子集`,
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "位运算枚举",
        code: `/**
 * 子集 - 位运算枚举
 *
 * 核心思想：
 * n 个元素的子集数量是 2^n
 * 可以用一个 n 位二进制数表示每个子集：
 * - 第 i 位为 1 表示选择 nums[i]
 * - 第 i 位为 0 表示不选择 nums[i]
 *
 * 枚举 0 到 2^n-1 的所有数，每个数对应一个子集
 *
 * 示例（nums = [1, 2, 3]）：
 * - 000 (0) → []
 * - 001 (1) → [1]
 * - 010 (2) → [2]
 * - 011 (3) → [1, 2]
 * - 100 (4) → [3]
 * - 101 (5) → [1, 3]
 * - 110 (6) → [2, 3]
 * - 111 (7) → [1, 2, 3]
 *
 * 时间复杂度：O(n × 2^n) - 遍历 2^n 个子集，每个检查 n 位
 * 空间复杂度：O(n) - 每个子集最多 n 个元素
 */
function subsets(nums) {
  const n = nums.length;
  const result = [];

  // 枚举所有可能的二进制掩码：0 到 2^n - 1
  // 1 << n 等于 2^n
  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];

    // 检查 mask 的每一位
    for (let i = 0; i < n; i++) {
      // 检查第 i 位是否为 1
      // mask & (1 << i) 取出 mask 的第 i 位
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }

    result.push(subset);
  }

  return result;
}

/**
 * 位运算技巧：
 *
 * 1. 1 << n：计算 2^n（左移 n 位）
 *    1 << 3 = 8 = 2^3
 *
 * 2. mask & (1 << i)：检查第 i 位是否为 1
 *    mask = 5 = 101
 *    5 & (1 << 0) = 5 & 1 = 1  → 第0位是1
 *    5 & (1 << 1) = 5 & 2 = 0  → 第1位是0
 *    5 & (1 << 2) = 5 & 4 = 4  → 第2位是1
 *
 * 执行示例（nums = [a, b, c]）：
 *
 * mask  二进制   对应子集
 * ─────────────────────
 *  0    000     []
 *  1    001     [a]
 *  2    010     [b]
 *  3    011     [a, b]
 *  4    100     [c]
 *  5    101     [a, c]
 *  6    110     [b, c]
 *  7    111     [a, b, c]
 *
 * 位运算法的优点：
 * 1. 代码简洁，不需要递归
 * 2. 思路清晰：每个元素选/不选
 * 3. 适合元素个数较少（n ≤ 30）的情况
 */`,
        explanation: `## 位运算枚举

### 思路
1. n 个元素共有 2^n 个子集
2. 用一个 n 位二进制数表示选择情况
3. 第 i 位为 1 表示选择 nums[i]
4. 遍历 0 到 2^n-1 的所有数，生成对应子集

### 优点
- 思路简洁，代码紧凑
- 适合元素个数较少的情况`,
        animation: {
          type: "two-pointers" as const,
          title: "子集位运算枚举演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [],
              description: "nums=[1,2,3]。用3位二进制表示选择，枚举0-7",
            },
            {
              array: ["0", "0", "0"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "gray" as const, label: "000→[]" }],
              description: "mask=0(000): 三位都是0→不选任何→[]",
            },
            {
              array: ["1", "0", "0"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "001→[1]" }],
              description: "mask=1(001): 第0位是1→选1→[1]",
            },
            {
              array: ["1", "1", "0"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "011→[1,2]" },
              ],
              description: "mask=3(011): 第0,1位是1→选1,2→[1,2]",
            },
            {
              array: ["1", "0", "1"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 2], color: "blue" as const, label: "101→[1,3]" },
              ],
              description: "mask=5(101): 第0,2位是1→选1,3→[1,3]",
            },
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "111→[1,2,3]" }],
              description: "mask=7(111): 三位都是1→全选→[1,2,3]。共8个子集",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代法（逐步添加）",
        code: `/**
 * 子集 - 迭代法（逐步添加）
 *
 * 核心思想：
 * 不使用递归，逐步构建子集
 * 每遇到一个新元素，将它添加到现有所有子集的副本中
 *
 * 构建过程（nums = [1, 2, 3]）：
 * - 初始：[[]]（只有空集）
 * - 加入1：现有 [[]]，添加1到每个 → [[]] + [[1]] = [[], [1]]
 * - 加入2：现有 [[], [1]]，添加2到每个
 *         → [[], [1]] + [[2], [1,2]] = [[], [1], [2], [1,2]]
 * - 加入3：现有 [[], [1], [2], [1,2]]，添加3到每个
 *         → + [[3], [1,3], [2,3], [1,2,3]]
 *         = [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 *
 * 时间复杂度：O(n × 2^n)
 * 空间复杂度：O(2^n) - 存储所有子集
 */
function subsets(nums) {
  const result = [[]];  // 初始只有空集

  // 遍历每个元素
  for (const num of nums) {
    // 获取当前 result 的长度（不包括本轮新增的）
    const len = result.length;

    // 将 num 添加到现有每个子集的副本中
    for (let i = 0; i < len; i++) {
      // 复制 result[i]，并添加 num
      result.push([...result[i], num]);
    }
  }

  return result;
}

/**
 * 执行示例（nums = [1, 2, 3]）：
 *
 * 初始：result = [[]]
 *
 * 遍历 num = 1：
 * - len = 1
 * - i = 0: result[0] = [] → 添加 [...[], 1] = [1]
 * - result = [[], [1]]
 *
 * 遍历 num = 2：
 * - len = 2
 * - i = 0: result[0] = [] → 添加 [2]
 * - i = 1: result[1] = [1] → 添加 [1, 2]
 * - result = [[], [1], [2], [1, 2]]
 *
 * 遍历 num = 3：
 * - len = 4
 * - i = 0: result[0] = [] → 添加 [3]
 * - i = 1: result[1] = [1] → 添加 [1, 3]
 * - i = 2: result[2] = [2] → 添加 [2, 3]
 * - i = 3: result[3] = [1, 2] → 添加 [1, 2, 3]
 * - result = [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 *
 * 迭代法的思想：
 * - 每个新元素都有"选"和"不选"两种情况
 * - "不选"：保留原有子集
 * - "选"：原有子集 + 新元素 = 新子集
 *
 * 这也解释了为什么子集数量是 2^n：
 * 每个元素都有2种选择，n个元素就是 2×2×...×2 = 2^n
 */`,
        explanation: `## 迭代法（逐步添加）

### 思路
1. 从空集开始
2. 每次遍历一个新元素
3. 将新元素添加到现有所有子集的副本中
4. 例如：[[]] -> [[], [1]] -> [[], [1], [2], [1,2]] -> ...

### 优点
- 非递归实现
- 思路直观：每个元素选或不选`,
        animation: {
          type: "two-pointers" as const,
          title: "子集迭代法演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [],
              description: "nums=[1,2,3]。迭代法：每个新元素添加到现有子集",
            },
            {
              array: ["[]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "gray" as const, label: "空集" }],
              description: "初始result=[[]]，只有空集",
            },
            {
              array: ["[]", "[1]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "+1" }],
              description: "加入1: 复制[]并加1→[1]。result=[[], [1]]",
            },
            {
              array: ["[]", "[1]", "[2]", "[1,2]"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [2, 3], color: "blue" as const, label: "+2" },
              ],
              description: "加入2: 复制每个子集并加2。result=[[], [1], [2], [1,2]]",
            },
            {
              array: ["[3]", "[1,3]", "[2,3]", "[1,2,3]"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "yellow" as const, label: "+3" }],
              description: "加入3: 复制每个子集并加3→[3],[1,3],[2,3],[1,2,3]",
            },
            {
              array: ["8个子集"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "最终8个子集: [], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(2^n)",
      },
    ],
  },

  // 3. 电话号码的字母组合 (17)
  {
    id: "letter-combinations",
    leetcodeId: 17,
    title: "电话号码的字母组合",
    titleEn: "Letter Combinations of a Phone Number",
    difficulty: "medium",
    category: "backtracking",
    tags: ["哈希表", "字符串", "回溯"],
    frontendRelevance: "low",
    frontendNote: "电话号码组合",
    description: `给定一个仅包含数字 \`2-9\` 的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

\`\`\`
2 -> abc
3 -> def
4 -> ghi
5 -> jkl
6 -> mno
7 -> pqrs
8 -> tuv
9 -> wxyz
\`\`\``,
    examples: `**示例 1：**
\`\`\`
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
\`\`\`

**示例 2：**
\`\`\`
输入：digits = ""
输出：[]
\`\`\`

**示例 3：**
\`\`\`
输入：digits = "2"
输出：["a","b","c"]
\`\`\``,
    constraints: `- \`0 <= digits.length <= 4\`
- \`digits[i]\` 是范围 \`['2', '9']\` 的一个数字`,
    initialCode: `function letterCombinations(digits) {
  // 在此处编写你的代码

}`,
    solution: `function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result = [];

  const backtrack = (index, path) => {
    if (index === digits.length) {
      result.push(path);
      return;
    }

    const letters = phone[digits[index]];
    for (const letter of letters) {
      backtrack(index + 1, path + letter);
    }
  };

  backtrack(0, '');
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "两数字",
        input: ["23"],
        expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
      },
      {
        id: "2",
        name: "空输入",
        input: [""],
        expected: []
      },
      {
        id: "3",
        name: "单数字",
        input: ["2"],
        expected: ["a","b","c"]
      }
    ],
    hints: [
      "使用哈希表存储数字到字母的映射",
      "回溯遍历每个数字对应的所有字母",
      "当路径长度等于输入长度时，记录结果"
    ],
    explanation: `## 解题思路

### 回溯法

1. 建立数字到字母的映射表
2. 对于每个数字，遍历它对应的所有字母
3. 递归处理下一个数字
4. 当处理完所有数字时，将当前组合加入结果

### 复杂度分析
- 时间复杂度：O(3^m × 4^n)，m 是对应3个字母的数字个数，n 是对应4个字母的数字个数
- 空间复杂度：O(m + n)，递归栈深度`,
    timeComplexity: "O(3^m × 4^n)",
    spaceComplexity: "O(m + n)",
    relatedProblems: ["permutations", "combination-sum"],
    solutions: [
      {
        name: "回溯法（推荐）",
        code: `/**
 * 电话号码的字母组合 - 回溯法
 *
 * 核心思想：
 * 这是一个典型的组合问题，但不是从同一个数组中选择
 * 而是依次从每个数字对应的字母中选择一个
 *
 * 算法思路：
 * 1. 建立数字到字母的映射表
 * 2. 从第一个数字开始，选择一个字母
 * 3. 递归处理下一个数字
 * 4. 当处理完所有数字时，记录当前组合
 *
 * 与其他回溯问题的区别：
 * - 排列/子集：从同一个数组中选择
 * - 电话号码：每次从不同的"字母池"中选择
 *
 * 时间复杂度：O(3^m × 4^n) - m 是对应3个字母的数字个数，n 是对应4个字母的数字个数
 * 空间复杂度：O(m + n) - 递归栈深度
 */
function letterCombinations(digits) {
  // 边界情况：空输入
  if (!digits || digits.length === 0) return [];

  // 数字到字母的映射表（电话按键）
  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result = [];

  /**
   * 回溯函数
   * @param index - 当前处理第几个数字
   * @param path - 当前组合的字符串
   */
  const backtrack = (index, path) => {
    // 结束条件：处理完所有数字
    if (index === digits.length) {
      result.push(path);
      return;
    }

    // 获取当前数字对应的字母
    const letters = phone[digits[index]];

    // 遍历每个字母，递归处理
    for (const letter of letters) {
      // 注意：这里直接传 path + letter，不需要显式回溯
      // 因为字符串是不可变的，每次 + 都会创建新字符串
      backtrack(index + 1, path + letter);
    }
  };

  backtrack(0, '');
  return result;
}

/**
 * 决策树示意（digits = "23"）：
 *
 * 数字2对应 abc，数字3对应 def
 *
 *                   ""
 *         /         |         \\
 *       "a"        "b"        "c"      ← 选择数字2的字母
 *      / | \\      / | \\      / | \\
 *    ad ae af   bd be bf   cd ce cf   ← 选择数字3的字母
 *
 * 执行过程：
 * 1. index=0, path="", 遍历 'a','b','c'
 * 2. 选'a' → index=1, path="a", 遍历 'd','e','f'
 * 3. 选'd' → index=2, path="ad" → 记录 "ad"
 * 4. 选'e' → index=2, path="ae" → 记录 "ae"
 * 5. 选'f' → index=2, path="af" → 记录 "af"
 * 6. 回到选'b' → 继续处理...
 *
 * 结果：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
 *
 * 为什么不需要显式回溯？
 * - 使用 path + letter 创建新字符串
 * - 原字符串 path 不变，递归返回后自动"回溯"
 * - 这是一种隐式回溯的技巧
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "电话号码字母组合回溯演示",
          steps: [
            {
              array: ["2", "3"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "blue" as const, label: "abc" },
                { indices: [1], color: "gray" as const, label: "def" },
              ],
              description: "digits=\"23\"。2→abc, 3→def。开始回溯，path=\"\"",
            },
            {
              array: ["a", "b", "c"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "选a" },
              ],
              description: "处理数字2，选择字母'a'。path=\"a\"",
            },
            {
              array: ["d", "e", "f"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "选d" },
              ],
              description: "处理数字3，选择字母'd'。path=\"ad\"，记录结果",
            },
            {
              array: ["d", "e", "f"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "green" as const, label: "选e" },
              ],
              description: "选择字母'e'。path=\"ae\"，记录结果",
            },
            {
              array: ["a", "b", "c"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "blue" as const, label: "选b" },
              ],
              description: "回溯，选择字母'b'。继续处理数字3...",
            },
            {
              array: ["a", "d"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "结果9个" },
              ],
              description: "共生成9个组合: ad,ae,af,bd,be,bf,cd,ce,cf",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯法

### 思路
1. 建立数字到字母的映射表
2. 对于每个数字，遍历它对应的所有字母
3. 递归处理下一个数字
4. 当处理完所有数字时，将当前组合加入结果

### 要点
- 用字符串拼接，不需要显式回溯
- index 表示当前处理第几个数字`,
        timeComplexity: "O(3^m × 4^n)",
        spaceComplexity: "O(m + n)",
      },
      {
        name: "BFS 迭代",
        code: `/**
 * 电话号码的字母组合 - BFS 迭代法
 *
 * 核心思想：
 * 使用广度优先搜索的思想，逐层构建组合
 * 每处理一个数字，就把它的所有字母追加到现有组合后面
 *
 * 构建过程（digits = "23"）：
 * - 初始：[""]
 * - 处理数字2(abc)：[""] → ["a", "b", "c"]
 * - 处理数字3(def)：["a","b","c"] →
 *   ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * 与回溯法的区别：
 * - 回溯法：深度优先，先完成一个组合再回溯
 * - BFS法：广度优先，同时构建所有组合
 *
 * 时间复杂度：O(3^m × 4^n)
 * 空间复杂度：O(3^m × 4^n) - 存储所有中间结果
 */
function letterCombinations(digits) {
  // 边界情况：空输入
  if (!digits || digits.length === 0) return [];

  // 数字到字母的映射表
  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  // 初始化结果数组为空字符串
  let result = [''];

  // 逐个处理每个数字
  for (const digit of digits) {
    const letters = phone[digit];  // 当前数字对应的字母
    const newResult = [];          // 存储本轮生成的新组合

    // 遍历现有的每个组合
    for (const combo of result) {
      // 将每个字母追加到现有组合后面
      for (const letter of letters) {
        newResult.push(combo + letter);
      }
    }

    // 更新结果为新一轮的组合
    result = newResult;
  }

  return result;
}

/**
 * 执行示例（digits = "23"）：
 *
 * 初始：result = [""]
 *
 * 处理数字 '2'（对应 "abc"）：
 * - combo = ""
 *   - + 'a' → "a"
 *   - + 'b' → "b"
 *   - + 'c' → "c"
 * - result = ["a", "b", "c"]
 *
 * 处理数字 '3'（对应 "def"）：
 * - combo = "a"
 *   - + 'd' → "ad"
 *   - + 'e' → "ae"
 *   - + 'f' → "af"
 * - combo = "b"
 *   - + 'd' → "bd"
 *   - + 'e' → "be"
 *   - + 'f' → "bf"
 * - combo = "c"
 *   - + 'd' → "cd"
 *   - + 'e' → "ce"
 *   - + 'f' → "cf"
 * - result = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * BFS 层级示意：
 *
 * 第0层：""
 *         ↓
 * 第1层："a"   "b"   "c"
 *         ↓     ↓     ↓
 * 第2层：ad ae af  bd be bf  cd ce cf
 */`,
        explanation: `## BFS 迭代

### 思路
1. 从空字符串开始
2. 每处理一个数字，将其所有字母追加到现有组合后面
3. 逐层构建，类似 BFS

### 优点
- 非递归实现
- 思路清晰，逐步扩展`,
        animation: {
          type: "two-pointers" as const,
          title: "电话号码BFS迭代演示",
          steps: [
            {
              array: ["2", "3"],
              left: 0,
              right: 1,
              highlights: [],
              description: "digits=\"23\"。BFS迭代：逐层构建组合",
            },
            {
              array: ["\"\""],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "gray" as const, label: "初始" }],
              description: "初始result=[\"\"]",
            },
            {
              array: ["a", "b", "c"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "第1层" }],
              description: "处理数字2(abc): \"\"→[\"a\",\"b\",\"c\"]",
            },
            {
              array: ["ad", "ae", "af"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "从a" }],
              description: "处理数字3: \"a\"→\"ad\",\"ae\",\"af\"",
            },
            {
              array: ["bd", "be", "bf"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "yellow" as const, label: "从b" }],
              description: "\"b\"→\"bd\",\"be\",\"bf\"",
            },
            {
              array: ["9个组合"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "结果: ad,ae,af,bd,be,bf,cd,ce,cf 共9个",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(3^m × 4^n)",
        spaceComplexity: "O(3^m × 4^n)",
      },
      {
        name: "队列迭代",
        code: `/**
 * 电话号码的字母组合 - 队列迭代法
 *
 * 核心思想：
 * 使用队列作为数据结构实现 BFS
 * 每次从队首取出元素，追加新字母后加入队尾
 *
 * 与 BFS 数组法的区别：
 * - BFS 数组法：整轮替换 result
 * - 队列法：标准 BFS，逐个处理队列元素
 *
 * 算法流程：
 * 1. 初始队列：[""]
 * 2. 处理第 i 个数字时，取出所有长度为 i 的元素
 * 3. 追加每个字母后加入队尾
 * 4. 重复直到处理完所有数字
 *
 * 时间复杂度：O(3^m × 4^n)
 * 空间复杂度：O(3^m × 4^n)
 */
function letterCombinations(digits) {
  // 边界情况：空输入
  if (!digits || digits.length === 0) return [];

  // 数字到字母的映射表
  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  // 使用数组模拟队列
  const queue = [''];

  // 遍历每个数字
  for (let i = 0; i < digits.length; i++) {
    const letters = phone[digits[i]];
    const size = queue.length;  // 当前层的元素个数

    // 处理当前层的所有元素
    for (let j = 0; j < size; j++) {
      // 从队首取出一个元素
      const curr = queue.shift();

      // 追加每个字母后加入队尾
      for (const letter of letters) {
        queue.push(curr + letter);
      }
    }
  }

  return queue;
}

/**
 * 队列变化过程（digits = "23"）：
 *
 * 初始：queue = [""]
 *
 * i=0，处理数字'2'(abc)，size=1：
 * - j=0: 取出""，追加 a,b,c
 *        queue = ["a", "b", "c"]
 *
 * i=1，处理数字'3'(def)，size=3：
 * - j=0: 取出"a"，追加 d,e,f
 *        queue = ["b", "c", "ad", "ae", "af"]
 * - j=1: 取出"b"，追加 d,e,f
 *        queue = ["c", "ad", "ae", "af", "bd", "be", "bf"]
 * - j=2: 取出"c"，追加 d,e,f
 *        queue = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * 最终：queue = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * 队列法 vs BFS数组法：
 * - 队列法更接近标准 BFS 写法
 * - BFS 数组法更简洁，不需要 shift 操作
 * - 性能上 BFS 数组法更优（shift 是 O(n) 操作）
 */`,
        explanation: `## 队列迭代

### 思路
1. 使用队列保存中间结果
2. 每次取出队首元素，追加当前数字的所有字母
3. 将新组合加入队尾

### 特点
- 标准的 BFS 实现
- 使用队列作为数据结构`,
        animation: {
          type: "two-pointers" as const,
          title: "电话号码队列迭代演示",
          steps: [
            {
              array: ["2", "3"],
              left: 0,
              right: 1,
              highlights: [],
              description: "digits=\"23\"。队列法：取队首，加字母，入队尾",
            },
            {
              array: ["\"\""],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "gray" as const, label: "队列" }],
              description: "初始queue=[\"\"]",
            },
            {
              array: ["a", "b", "c"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "队列" }],
              description: "取出\"\"，追加abc入队。queue=[\"a\",\"b\",\"c\"]",
            },
            {
              array: ["b", "c", "ad", "ae", "af"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "待处理" },
                { indices: [2, 3, 4], color: "green" as const, label: "新入队" },
              ],
              description: "取出\"a\"，追加def入队→ad,ae,af",
            },
            {
              array: ["c", "ad", "ae", "af", "bd", "be", "bf"],
              left: 0,
              right: 6,
              highlights: [
                { indices: [5, 6], color: "blue" as const, label: "新入队" },
              ],
              description: "取出\"b\"，追加def入队→bd,be,bf",
            },
            {
              array: ["9个组合"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "最终queue=[ad,ae,af,bd,be,bf,cd,ce,cf]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(3^m × 4^n)",
        spaceComplexity: "O(3^m × 4^n)",
      },
    ],
  },

  // 4. 组合总和 (39)
  {
    id: "combination-sum",
    leetcodeId: 39,
    title: "组合总和",
    titleEn: "Combination Sum",
    difficulty: "medium",
    category: "backtracking",
    tags: ["数组", "回溯"],
    frontendRelevance: "medium",
    frontendNote: "组合总和",
    description: `给你一个 **无重复元素** 的整数数组 \`candidates\` 和一个目标整数 \`target\`，找出 \`candidates\` 中可以使数字和为目标数 \`target\` 的所有 **不同组合**，并以列表形式返回。你可以按 **任意顺序** 返回这些组合。

\`candidates\` 中的 **同一个** 数字可以 **无限制重复被选取**。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 \`target\` 的不同组合数少于 \`150\` 个。`,
    examples: `**示例 1：**
\`\`\`
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
\`\`\`

**示例 2：**
\`\`\`
输入：candidates = [2,3,5], target = 8
输出：[[2,2,2,2],[2,3,3],[3,5]]
\`\`\`

**示例 3：**
\`\`\`
输入：candidates = [2], target = 1
输出：[]
\`\`\``,
    constraints: `- \`1 <= candidates.length <= 30\`
- \`2 <= candidates[i] <= 40\`
- \`candidates\` 的所有元素 **互不相同**
- \`1 <= target <= 40\``,
    initialCode: `function combinationSum(candidates, target) {
  // 在此处编写你的代码

}`,
    solution: `function combinationSum(candidates, target) {
  const result = [];

  const backtrack = (start, path, remaining) => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      // 可以重复使用，所以传入 i 而不是 i + 1
      backtrack(i, path, remaining - candidates[i]);
      path.pop();
    }
  };

  backtrack(0, [], target);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[2,3,6,7], 7],
        expected: [[2,2,3],[7]]
      },
      {
        id: "2",
        name: "示例2",
        input: [[2,3,5], 8],
        expected: [[2,2,2,2],[2,3,3],[3,5]]
      },
      {
        id: "3",
        name: "无解",
        input: [[2], 1],
        expected: []
      }
    ],
    hints: [
      "使用回溯法，每个元素可以重复选择",
      "用 start 参数避免产生重复组合",
      "当剩余值为0时记录结果，小于0时剪枝"
    ],
    explanation: `## 解题思路

### 回溯法

1. 从 start 开始遍历，保证不会产生重复组合
2. 因为可以重复使用元素，递归时传入 i 而不是 i + 1
3. 当 remaining 等于 0 时，找到一个有效组合
4. 当 remaining 小于 0 时，剪枝返回

### 复杂度分析
- 时间复杂度：O(S)，S 是所有可行解的长度之和
- 空间复杂度：O(target)，递归栈最大深度`,
    timeComplexity: "O(S)",
    spaceComplexity: "O(target)",
    relatedProblems: ["permutations", "subsets"],
    solutions: [
      {
        name: "回溯法（推荐）",
        code: `/**
 * 组合总和 - 回溯法
 *
 * 核心思想：
 * 这是一个"无限制重复选择"的组合问题
 * 与普通子集问题的区别：同一个元素可以重复选择多次
 *
 * 关键点：
 * 1. 可以重复使用 → 递归时传 i 而不是 i + 1
 * 2. 使用 start 参数 → 避免产生重复组合（如 [2,3] 和 [3,2]）
 * 3. 剪枝条件 → remaining < 0 时提前返回
 *
 * 算法模板（组合问题）：
 * - 允许重复选择：backtrack(i, ...)
 * - 不允许重复选择：backtrack(i + 1, ...)
 *
 * 时间复杂度：O(S)，S 是所有可行解的长度之和
 * 空间复杂度：O(target/min(candidates)) - 递归最大深度
 */
function combinationSum(candidates, target) {
  const result = [];

  /**
   * 回溯函数
   * @param start - 从 candidates[start] 开始选择
   * @param path - 当前组合
   * @param remaining - 距离目标还需要的值
   */
  const backtrack = (start, path, remaining) => {
    // 找到一个有效组合
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    // 剪枝：剩余值为负，无法继续
    if (remaining < 0) return;

    // 从 start 开始遍历，保证不产生重复组合
    for (let i = start; i < candidates.length; i++) {
      // 做选择
      path.push(candidates[i]);

      // 递归：传入 i（不是 i+1），允许重复选择当前元素
      backtrack(i, path, remaining - candidates[i]);

      // 撤销选择
      path.pop();
    }
  };

  backtrack(0, [], target);
  return result;
}

/**
 * 决策树示意（candidates = [2,3,6,7], target = 7）：
 *
 *                          []
 *              /        |        |       \\
 *            [2]       [3]      [6]      [7] ← 找到 [7]
 *          / | \\      / |
 *      [2,2][2,3][2,6] [3,3] ...
 *       /  |
 *  [2,2,2][2,2,3] ← 找到 [2,2,3]
 *     |
 *  [2,2,2,2] ...（超出 target，剪枝）
 *
 * 执行过程：
 * 1. remaining=7, 选2 → remaining=5
 * 2. remaining=5, 选2 → remaining=3
 * 3. remaining=3, 选2 → remaining=1
 * 4. remaining=1, 选2 → remaining=-1 (剪枝)
 * 5. 回溯，选3 → remaining=0 → 记录 [2,2,3] ✓
 * ...
 * 6. remaining=7, 选7 → remaining=0 → 记录 [7] ✓
 *
 * 为什么传 i 而不是 i+1？
 * - 传 i：允许重复选择同一元素 [2,2,2,...]
 * - 传 i+1：每个元素只能选一次
 *
 * 为什么使用 start 参数？
 * - 保证只向后选择，避免 [2,3] 和 [3,2] 重复
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "组合总和回溯演示",
          steps: [
            {
              array: ["2", "3", "6", "7"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0, 1, 2, 3], color: "gray" as const, label: "candidates" },
              ],
              description: "candidates=[2,3,6,7], target=7。开始回溯，remaining=7",
            },
            {
              array: ["2", "3", "6", "7"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "选2" },
              ],
              description: "选择2，path=[2], remaining=7-2=5",
            },
            {
              array: ["2", "3", "6", "7"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "再选2" },
              ],
              description: "可重复选择2，path=[2,2], remaining=5-2=3",
            },
            {
              array: ["2", "3", "6", "7"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "2+2" },
                { indices: [1], color: "green" as const, label: "选3" },
              ],
              description: "选择3，path=[2,2,3], remaining=3-3=0 ✓ 记录结果",
            },
            {
              array: ["2", "3", "6", "7"],
              left: 3,
              right: 3,
              highlights: [
                { indices: [3], color: "green" as const, label: "选7" },
              ],
              description: "回溯到start=0，选择7，path=[7], remaining=0 ✓ 记录结果",
            },
            {
              array: ["2", "3", "6", "7"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 0, 1], color: "red" as const, label: "[2,2,3]" },
                { indices: [3], color: "red" as const, label: "[7]" },
              ],
              description: "找到2个组合: [2,2,3] 和 [7]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯法

### 思路
1. 从 start 开始遍历，保证不会产生重复组合
2. 因为可以重复使用元素，递归时传入 i 而不是 i + 1
3. 当 remaining 等于 0 时，找到一个有效组合
4. 当 remaining 小于 0 时，剪枝返回

### 要点
- 允许重复选择：递归传 i
- 不允许重复选择：递归传 i + 1`,
        timeComplexity: "O(S)",
        spaceComplexity: "O(target)",
      },
      {
        name: "回溯 + 排序剪枝",
        code: `/**
 * 组合总和 - 回溯 + 排序剪枝优化
 *
 * 核心思想：
 * 在基础回溯的基础上，先对数组排序
 * 利用有序性进行更高效的剪枝
 *
 * 剪枝优化：
 * 如果当前元素已经大于 remaining，那么后面的元素更大
 * 更不可能满足条件，可以直接 break 跳出循环
 *
 * 对比普通回溯：
 * - 普通回溯：remaining < 0 才返回，已经进入递归
 * - 排序剪枝：candidates[i] > remaining 直接 break，避免进入递归
 *
 * 时间复杂度：O(S)，但实际运行更快
 * 空间复杂度：O(target/min(candidates))
 */
function combinationSum(candidates, target) {
  const result = [];
  // 排序，便于剪枝
  candidates.sort((a, b) => a - b);

  /**
   * 回溯函数
   */
  const backtrack = (start, path, remaining) => {
    // 找到有效组合
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 关键剪枝：当前元素已经大于剩余值
      // 后面的元素更大，不可能满足条件，直接跳出
      if (candidates[i] > remaining) break;

      // 做选择
      path.push(candidates[i]);
      // 递归
      backtrack(i, path, remaining - candidates[i]);
      // 撤销选择
      path.pop();
    }
  };

  backtrack(0, [], target);
  return result;
}

/**
 * 剪枝效果对比：
 *
 * candidates = [2, 3, 6, 7], target = 7
 * 排序后：[2, 3, 6, 7]（本来就有序）
 *
 * 不剪枝的情况：
 * - [2,2,2] → 选2 → remaining=1
 *   - 选2 → remaining=-1 → 返回（已进入递归）
 *   - 选3 → remaining=-2 → 返回（已进入递归）
 *   ...
 *
 * 剪枝的情况：
 * - [2,2,2] → 选2 → remaining=1
 *   - candidates[i]=2 > 1 → break（不进入递归！）
 *
 * 性能提升：
 * - 避免了大量无效的递归调用
 * - 对于大规模数据效果更明显
 *
 * 适用场景：
 * - 候选数组元素较大或分布不均匀时效果好
 * - 如 [2, 50, 100, 200]，target = 10
 */`,
        explanation: `## 回溯 + 排序剪枝

### 思路
1. 先对候选数组排序
2. 当当前元素大于剩余目标值时，直接 break
3. 因为后面的元素更大，不可能满足条件

### 优点
- 通过排序实现更高效的剪枝
- 减少无效递归`,
        animation: {
          type: "two-pointers" as const,
          title: "组合总和排序剪枝演示",
          steps: [
            {
              array: ["2", "3", "6", "7"],
              left: 0,
              right: 3,
              highlights: [],
              description: "candidates=[2,3,6,7], target=7。先排序（已有序）",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "选2" }],
              description: "选2，remaining=5。继续选",
            },
            {
              array: ["2", "2"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "2+2" }],
              description: "再选2，remaining=3。继续",
            },
            {
              array: ["2", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "[2,2,3]=7" }],
              description: "选3，remaining=0！记录[2,2,3]",
            },
            {
              array: ["7"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "7=7" }],
              description: "回溯后选7，remaining=0！记录[7]",
            },
            {
              array: ["剪枝"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "剪枝" }],
              description: "选6时remaining=1<6，直接break剪枝。结果:[[2,2,3],[7]]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(S)",
        spaceComplexity: "O(target)",
      },
      {
        name: "动态规划（记录路径）",
        code: `/**
 * 组合总和 - 动态规划（完全背包变体）
 *
 * 核心思想：
 * 这是完全背包问题的变体，需要记录所有路径
 *
 * 状态定义：
 * dp[i] = 和为 i 的所有组合列表
 *
 * 状态转移：
 * 对于每个候选数 num，遍历 dp[i-num]
 * dp[i].push(...dp[i-num] 的每个组合 + num)
 *
 * 去重策略：
 * 只添加有序组合（最后一个元素 <= 当前 num）
 * 这样可以避免 [2,3] 和 [3,2] 的重复
 *
 * 时间复杂度：O(target × n × 组合数)
 * 空间复杂度：O(target × 组合数)
 */
function combinationSum(candidates, target) {
  // dp[i] 表示和为 i 的所有组合
  const dp = Array.from({ length: target + 1 }, () => []);

  // 初始化：和为 0 只有空组合
  dp[0] = [[]];

  // 遍历每个候选数
  for (const num of candidates) {
    // 从 num 开始遍历到 target（完全背包的正序遍历）
    for (let i = num; i <= target; i++) {
      // 遍历 dp[i - num] 中的每个组合
      for (const combo of dp[i - num]) {
        // 去重：只添加有序组合
        // combo 的最后一个元素 <= num 才添加
        // 这保证了组合内元素是升序的
        if (combo.length === 0 || combo[combo.length - 1] <= num) {
          dp[i].push([...combo, num]);
        }
      }
    }
  }

  return dp[target];
}

/**
 * 执行示例（candidates = [2, 3], target = 7）：
 *
 * 初始：dp[0] = [[]]
 *
 * 处理 num = 2：
 * - i=2: dp[0]=[[]] → dp[2]=[[2]]
 * - i=4: dp[2]=[[2]] → dp[4]=[[2,2]]
 * - i=6: dp[4]=[[2,2]] → dp[6]=[[2,2,2]]
 *
 * 处理 num = 3：
 * - i=3: dp[0]=[[]] → dp[3]=[[3]]
 * - i=5: dp[2]=[[2]] → 2<=3 → dp[5]=[[2,3]]
 * - i=6: dp[3]=[[3]] → 3<=3 → dp[6]=[[2,2,2],[3,3]]
 * - i=7: dp[4]=[[2,2]] → 2<=3 → dp[7]=[[2,2,3]]
 *
 * 结果：dp[7] = [[2,2,3]]
 *
 * 完全背包 vs 01背包：
 * - 完全背包：物品可无限使用，正序遍历
 * - 01背包：物品只能用一次，逆序遍历
 *
 * 为什么要检查 combo 的最后元素？
 * - 保证组合内元素升序
 * - [2,3] 会被添加（因为 2 <= 3）
 * - [3,2] 不会被添加（因为会从 [3] + 2 产生，但 3 > 2）
 */`,
        explanation: `## 动态规划（记录路径）

### 思路
1. dp[i] 存储和为 i 的所有组合
2. 对于每个候选数，更新 dp 数组
3. 通过检查最后元素保证组合有序，避免重复

### 特点
- 完全背包问题的变体
- 适合需要记录所有路径的场景`,
        animation: {
          type: "two-pointers" as const,
          title: "组合总和DP演示",
          steps: [
            {
              array: ["dp[0]", "dp[1]", "dp[2]", "dp[3]"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "green" as const, label: "[[]]" }],
              description: "candidates=[2,3], target=3。初始dp[0]=[[]]",
            },
            {
              array: ["[[]]", "[]", "[[2]]", "[]"],
              left: 0,
              right: 3,
              highlights: [{ indices: [2], color: "green" as const, label: "+2" }],
              description: "处理num=2: dp[2]=dp[0]+2=[[2]]",
            },
            {
              array: ["[[]]", "[]", "[[2]]", "[[3]]"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "blue" as const, label: "+3" }],
              description: "处理num=3: dp[3]=dp[0]+3=[[3]]",
            },
            {
              array: ["[[]]", "[]", "[[2]]", "[[3]]"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "结果" }],
              description: "dp[3]=[[3]]。组合总和为3的只有[3]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(target × n × 组合数)",
        spaceComplexity: "O(target × 组合数)",
      },
    ],
  },

  // 5. 括号生成 (22)
  {
    id: "generate-parentheses",
    leetcodeId: 22,
    title: "括号生成",
    titleEn: "Generate Parentheses",
    difficulty: "medium",
    category: "backtracking",
    tags: ["字符串", "动态规划", "回溯"],
    frontendRelevance: "medium",
    frontendNote: "括号生成，回溯入门",
    description: `数字 \`n\` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
\`\`\`

**示例 2：**
\`\`\`
输入：n = 1
输出：["()"]
\`\`\``,
    constraints: `- \`1 <= n <= 8\``,
    initialCode: `function generateParenthesis(n) {
  // 在此处编写你的代码

}`,
    solution: `function generateParenthesis(n) {
  const result = [];

  const backtrack = (str, open, close) => {
    if (str.length === 2 * n) {
      result.push(str);
      return;
    }

    // 只要左括号没用完，就可以加左括号
    if (open < n) {
      backtrack(str + '(', open + 1, close);
    }

    // 只有右括号数量小于左括号时，才能加右括号
    if (close < open) {
      backtrack(str + ')', open, close + 1);
    }
  };

  backtrack('', 0, 0);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "三对括号",
        input: [3],
        expected: ["((()))","(()())","(())()","()(())","()()()"]
      },
      {
        id: "2",
        name: "一对括号",
        input: [1],
        expected: ["()"]
      }
    ],
    hints: [
      "左括号数量不能超过 n",
      "右括号数量不能超过左括号数量",
      "当字符串长度为 2n 时，记录结果"
    ],
    explanation: `## 解题思路

### 回溯法

1. 维护当前字符串，以及左右括号的使用数量
2. 只要左括号没用完（open < n），就可以加左括号
3. 只有右括号数量小于左括号时（close < open），才能加右括号
4. 当字符串长度等于 2n 时，找到一个有效组合

### 复杂度分析
- 时间复杂度：O(4^n / √n)，第 n 个卡特兰数
- 空间复杂度：O(n)，递归栈深度`,
    timeComplexity: "O(4^n / √n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["letter-combinations", "combination-sum"],
    solutions: [
      {
        name: "回溯法（推荐）",
        code: `/**
 * 括号生成 - 回溯法
 *
 * 核心思想：
 * 生成有效括号的关键是保持括号的"合法性"：
 * 1. 左括号数量不能超过 n
 * 2. 右括号数量不能超过左括号数量
 *
 * 换句话说：
 * - 随时可以加左括号（只要没用完）
 * - 只有右括号数 < 左括号数时，才能加右括号
 *
 * 这样生成的字符串一定是有效的，不需要事后验证
 *
 * 时间复杂度：O(4^n / √n) - 第 n 个卡特兰数
 * 空间复杂度：O(n) - 递归栈深度
 */
function generateParenthesis(n) {
  const result = [];

  /**
   * 回溯函数
   * @param str - 当前生成的字符串
   * @param open - 已使用的左括号数量
   * @param close - 已使用的右括号数量
   */
  const backtrack = (str, open, close) => {
    // 结束条件：字符串长度达到 2n
    if (str.length === 2 * n) {
      result.push(str);
      return;
    }

    // 选择1：添加左括号（只要还有剩余）
    if (open < n) {
      // 不需要显式回溯，因为字符串是不可变的
      backtrack(str + '(', open + 1, close);
    }

    // 选择2：添加右括号（只有右括号数 < 左括号数时才合法）
    if (close < open) {
      backtrack(str + ')', open, close + 1);
    }
  };

  backtrack('', 0, 0);
  return result;
}

/**
 * 决策树示意（n = 2）：
 *
 *                    ""
 *                     |
 *                    "("
 *                  /     \\
 *              "(("      "()"
 *               |        |
 *             "(()"     "()("
 *               |        |
 *            "(())"    "()()"
 *
 * 有效括号的条件图解：
 *
 * 在任意位置，必须满足：left >= right
 *
 * 位置 0 1 2 3 4 5
 * 字符 ( ( ) ( ) )
 * left 1 2 2 3 3 3
 * right 0 0 1 1 2 3
 * 差值 1 2 1 2 1 0  ← 始终 >= 0，最终 = 0
 *
 * 为什么这个约束能生成所有有效括号？
 * - open < n：还可以加左括号
 * - close < open：还有未匹配的左括号，可以加右括号
 * - 两个条件组合，确保了所有有效路径
 *
 * 卡特兰数：
 * C(n) = C(2n, n) / (n + 1)
 * n=1: 1  ["()"]
 * n=2: 2  ["(())", "()()"]
 * n=3: 5  ["((()))", "(()())", "(())()", "()(())", "()()()"]
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "括号生成回溯演示",
          steps: [
            {
              array: ["(", "(", ")", "(", ")", ")"],
              left: 0,
              right: 0,
              highlights: [],
              description: "n=3，生成3对有效括号。开始回溯，str=\"\", open=0, close=0",
            },
            {
              array: ["(", "", "", "", "", ""],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "加(" },
              ],
              description: "open<3，可加'('。str=\"(\", open=1, close=0",
            },
            {
              array: ["(", "(", "", "", "", ""],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "((" },
              ],
              description: "open<3，继续加'('。str=\"((\", open=2, close=0",
            },
            {
              array: ["(", "(", "(", "", "", ""],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "(((" },
              ],
              description: "open<3，加'('。str=\"(((\", open=3, close=0",
            },
            {
              array: ["(", "(", "(", ")", ")", ")"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "((()))" },
              ],
              description: "open=3无法再加'('，只能加')'。str=\"((()))\" ✓ 记录",
            },
            {
              array: ["(", ")", "(", ")", "(", ")"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0, 1, 2, 3, 4, 5], color: "blue" as const, label: "()()()" },
              ],
              description: "回溯生成其他组合...共5种: ((())), (()()), (())(), ()(()), ()()()",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯法

### 思路
1. 维护当前字符串，以及左右括号的使用数量
2. 只要左括号没用完（open < n），就可以加左括号
3. 只有右括号数量小于左括号时（close < open），才能加右括号
4. 当字符串长度等于 2n 时，找到一个有效组合

### 要点
- 通过限制条件保证生成的括号一定有效
- 不需要事后检验有效性`,
        timeComplexity: "O(4^n / √n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划",
        code: `/**
 * 括号生成 - 动态规划
 *
 * 核心思想：
 * 任何有效括号序列都可以表示为：( left ) right
 * 其中 left 和 right 都是有效的括号序列
 *
 * 递推关系：
 * 如果总共 n 对括号，第一对括号把序列分成两部分：
 * - 第一个 ( 和它匹配的 )：中间包含 j 对括号
 * - 剩余部分：包含 n-1-j 对括号
 *
 * 状态定义：
 * dp[i] = i 对括号的所有有效组合
 *
 * 状态转移：
 * dp[n] = { "(" + dp[j] + ")" + dp[n-1-j] | 0 ≤ j < n }
 *
 * 时间复杂度：O(4^n / √n)
 * 空间复杂度：O(4^n / √n) - 存储所有结果
 */
function generateParenthesis(n) {
  // dp[i] 存储 i 对括号的所有有效组合
  const dp = [['']];  // dp[0] = ['']，0 对括号只有空串

  // 逐步计算 1 到 n 对括号的情况
  for (let i = 1; i <= n; i++) {
    dp[i] = [];

    // 枚举第一对括号内部有 j 对括号
    // j 的范围是 0 到 i-1
    for (let j = 0; j < i; j++) {
      // 第一对括号外部有 i-1-j 对括号
      // 遍历所有组合
      for (const left of dp[j]) {
        for (const right of dp[i - 1 - j]) {
          // 构造：( + 内部 + ) + 外部
          dp[i].push('(' + left + ')' + right);
        }
      }
    }
  }

  return dp[n];
}

/**
 * 递推关系图解：
 *
 * n=2 的所有有效括号可以这样构造：
 *
 * "(" + dp[0] + ")" + dp[1] = "(" + "" + ")" + "()" = "()()"
 * "(" + dp[1] + ")" + dp[0] = "(" + "()" + ")" + "" = "(())"
 *
 * 执行示例（n = 3）：
 *
 * dp[0] = [""]
 * dp[1] = ["()"]  // "(" + "" + ")" + ""
 * dp[2] = ["()()", "(())"]
 * dp[3] = [
 *   // j=0: "(" + "" + ")" + dp[2]
 *   "()()()", "()(())",
 *   // j=1: "(" + "()" + ")" + dp[1]
 *   "(())()",
 *   // j=2: "(" + dp[2] + ")" + ""
 *   "(()())", "((()))"
 * ]
 *
 * 为什么这个递推是完备的？
 * - 任何有效括号序列的第一个 ( 一定有一个匹配的 )
 * - 这个 ) 把序列分成两个独立部分
 * - 枚举所有可能的分割点，就能生成所有有效序列
 */`,
        explanation: `## 动态规划

### 思路
1. dp[i] 存储 i 对括号的所有有效组合
2. 对于 n 对括号，可以表示为 (left)right 的形式
3. 其中 left 有 j 对括号，right 有 n-1-j 对括号
4. 枚举所有可能的 j 值

### 递推公式
dp[n] = { "(" + dp[j] + ")" + dp[n-1-j] | 0 ≤ j < n }`,
        animation: {
          type: "two-pointers" as const,
          title: "括号生成DP演示",
          steps: [
            {
              array: ["dp[0]", "dp[1]", "dp[2]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "gray" as const, label: "[\"\"]" }],
              description: "n=2。初始dp[0]=[\"\"]（0对括号是空串）",
            },
            {
              array: ["[\"\"]", "[\"()\"]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "dp[1]" }],
              description: "dp[1]: \"(\"+dp[0]+\")\"+dp[0]=\"()\"",
            },
            {
              array: ["j=0", "j=1"],
              left: 0,
              right: 1,
              highlights: [],
              description: "计算dp[2]: 枚举j=0,1（内部括号对数）",
            },
            {
              array: ["()", "()"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "()()从j=0" }],
              description: "j=0: \"(\"+\"\"+\")\"+\"()\"=\"()()\"",
            },
            {
              array: ["(())"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "(())从j=1" }],
              description: "j=1: \"(\"+\"()\"+\")\"+\"\"=\"(())\"",
            },
            {
              array: ["()()", "(())"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "dp[2]=[\"()()\",\"(())\"]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(4^n / √n)",
        spaceComplexity: "O(4^n / √n)",
      },
      {
        name: "闭合数法",
        code: `/**
 * 括号生成 - 闭合数法（分治递归）
 *
 * 核心思想：
 * 这是动态规划思想的递归实现
 * 将问题分解为更小的子问题
 *
 * 分治策略：
 * 任何有效括号序列可以写成 (left)right 的形式
 * - left 是第一对括号内部的有效序列
 * - right 是第一对括号外部的有效序列
 *
 * 如果总共 n 对括号：
 * - left 有 c 对括号（c 从 0 到 n-1）
 * - right 有 n-1-c 对括号
 *
 * 时间复杂度：O(4^n / √n)
 * 空间复杂度：O(4^n / √n)
 */
function generateParenthesis(n) {
  // 递归基：0 对括号只有空串
  if (n === 0) return [''];

  const result = [];

  // c = 第一对括号内部的括号对数
  // c 的范围是 0 到 n-1
  for (let c = 0; c < n; c++) {
    // 递归获取内部所有可能的组合
    // left 中有 c 对括号
    for (const left of generateParenthesis(c)) {
      // 递归获取外部所有可能的组合
      // right 中有 n-1-c 对括号
      for (const right of generateParenthesis(n - 1 - c)) {
        // 构造：( + 内部 + ) + 外部
        result.push('(' + left + ')' + right);
      }
    }
  }

  return result;
}

/**
 * 分治过程示意（n = 2）：
 *
 * generateParenthesis(2):
 *   c=0: "(" + generateParenthesis(0) + ")" + generateParenthesis(1)
 *        "(" + "" + ")" + "()" = "()()"
 *   c=1: "(" + generateParenthesis(1) + ")" + generateParenthesis(0)
 *        "(" + "()" + ")" + "" = "(())"
 *
 * 结果：["()()", "(())"]
 *
 * 闭合数的含义：
 * "闭合数" c 表示第一个 ( 和它匹配的 ) 之间的括号对数
 *
 * 例如 "(())()" 中：
 * - 第一个 ( 在位置 0
 * - 它匹配的 ) 在位置 3
 * - 中间 "()" 有 1 对括号，所以 c = 1
 *
 * 递归调用树（n = 2）：
 *
 * generateParenthesis(2)
 * ├── c=0: left=f(0), right=f(1)
 * │   ├── f(0) = [""]
 * │   └── f(1) = ["()"]
 * │   └── → "()()"
 * └── c=1: left=f(1), right=f(0)
 *     ├── f(1) = ["()"]
 *     └── f(0) = [""]
 *     └── → "(())"
 *
 * 与动态规划的关系：
 * - 闭合数法是自顶向下的递归
 * - 动态规划是自底向上的迭代
 * - 两者本质相同，只是实现方式不同
 */`,
        explanation: `## 闭合数法（递归）

### 思路
1. 任何有效括号序列都可以写成 (left)right 的形式
2. left 和 right 本身也是有效括号序列
3. 如果总共 n 对，则 left 有 c 对，right 有 n-1-c 对

### 特点
- 递归实现动态规划的思想
- 更容易理解的分治策略`,
        animation: {
          type: "two-pointers" as const,
          title: "闭合数法演示",
          steps: [
            {
              array: ["f(2)"],
              left: 0,
              right: 0,
              highlights: [],
              description: "n=2。分治: f(n)=∑(left)right，枚举c=0到n-1",
            },
            {
              array: ["c=0", "c=1"],
              left: 0,
              right: 1,
              highlights: [],
              description: "c=内部括号对数。c=0: left有0对，right有1对",
            },
            {
              array: ["(", "f(0)", ")", "f(1)"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [1], color: "gray" as const, label: "\"\"" },
                { indices: [3], color: "blue" as const, label: "\"()\"" },
              ],
              description: "c=0: \"(\"+f(0)+\")\"+f(1)=\"(\"+\"\"+\")\"+\"()\"",
            },
            {
              array: ["()()" ],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "c=0结果" }],
              description: "c=0得到\"()()\"",
            },
            {
              array: ["(", "f(1)", ")", "f(0)"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [1], color: "blue" as const, label: "\"()\"" },
                { indices: [3], color: "gray" as const, label: "\"\"" },
              ],
              description: "c=1: \"(\"+f(1)+\")\"+f(0)=\"(\"+\"()\"+\")\"+\"\"",
            },
            {
              array: ["()()", "(())"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "f(2)=[\"()()\",\"(())\"]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(4^n / √n)",
        spaceComplexity: "O(4^n / √n)",
      },
    ],
  },

  // 6. 单词搜索 (79)
  {
    id: "word-search",
    leetcodeId: 79,
    title: "单词搜索",
    titleEn: "Word Search",
    difficulty: "medium",
    category: "backtracking",
    tags: ["数组", "字符串", "回溯", "矩阵"],
    frontendRelevance: "medium",
    frontendNote: "DFS搜索",
    description: `给定一个 \`m x n\` 二维字符网格 \`board\` 和一个字符串单词 \`word\`。如果 \`word\` 存在于网格中，返回 \`true\`；否则，返回 \`false\`。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。`,
    examples: `**示例 1：**
\`\`\`
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true
\`\`\`

**示例 3：**
\`\`\`
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false
\`\`\``,
    constraints: `- \`m == board.length\`
- \`n = board[i].length\`
- \`1 <= m, n <= 6\`
- \`1 <= word.length <= 15\`
- \`board\` 和 \`word\` 仅由大小写英文字母组成`,
    initialCode: `function exist(board, word) {
  // 在此处编写你的代码

}`,
    solution: `function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  const dfs = (i, j, k) => {
    // 边界检查和字符匹配
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    // 找到完整单词
    if (k === word.length - 1) {
      return true;
    }

    // 标记已访问
    const temp = board[i][j];
    board[i][j] = '#';

    // 四个方向搜索
    const found = dfs(i + 1, j, k + 1) ||
                  dfs(i - 1, j, k + 1) ||
                  dfs(i, j + 1, k + 1) ||
                  dfs(i, j - 1, k + 1);

    // 回溯
    board[i][j] = temp;

    return found;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
}`,
    testCases: [
      {
        id: "1",
        name: "存在ABCCED",
        input: [[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "ABCCED"],
        expected: true
      },
      {
        id: "2",
        name: "存在SEE",
        input: [[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "SEE"],
        expected: true
      },
      {
        id: "3",
        name: "不存在ABCB",
        input: [[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "ABCB"],
        expected: false
      }
    ],
    hints: [
      "从每个格子开始尝试 DFS",
      "访问过的格子临时标记，避免重复使用",
      "回溯时恢复格子的原始值"
    ],
    explanation: `## 解题思路

### DFS + 回溯

1. 从每个格子开始尝试匹配单词
2. DFS 搜索四个方向，匹配下一个字符
3. 临时标记已访问的格子（如改为 '#'）
4. 回溯时恢复格子的原始值
5. 如果匹配到单词末尾，返回 true

### 复杂度分析
- 时间复杂度：O(m × n × 3^L)，L 是单词长度
- 空间复杂度：O(L)，递归栈深度`,
    timeComplexity: "O(m × n × 3^L)",
    spaceComplexity: "O(L)",
    relatedProblems: ["number-of-islands", "permutations"],
    solutions: [
      {
        name: "DFS + 原地标记（推荐）",
        code: `/**
 * 单词搜索 - DFS + 原地标记
 *
 * 核心思想：
 * 在二维网格中搜索单词，这是一个典型的 DFS + 回溯问题
 *
 * 算法思路：
 * 1. 从每个格子开始尝试匹配单词
 * 2. DFS 向四个方向搜索，匹配下一个字符
 * 3. 使用原地修改标记已访问的格子（改为特殊字符如 '#'）
 * 4. 回溯时恢复格子的原始值
 *
 * 为什么用原地标记？
 * - 节省空间，不需要额外的 visited 数组
 * - 回溯时恢复原值即可
 *
 * 时间复杂度：O(m × n × 3^L)，L 是单词长度
 *   - m × n 个起点
 *   - 每个起点最多 3^L 个路径（不走回头路，所以是3不是4）
 * 空间复杂度：O(L) - 递归栈深度
 */
function exist(board, word) {
  const m = board.length;     // 行数
  const n = board[0].length;  // 列数

  /**
   * DFS 搜索函数
   * @param i, j - 当前位置
   * @param k - 当前匹配到单词的第 k 个字符
   * @returns 是否找到匹配
   */
  const dfs = (i, j, k) => {
    // 边界检查 + 字符匹配检查
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    // 成功匹配到单词最后一个字符
    if (k === word.length - 1) {
      return true;
    }

    // 标记当前格子为已访问（原地修改）
    const temp = board[i][j];
    board[i][j] = '#';  // 使用 '#' 表示已访问

    // 向四个方向搜索下一个字符
    const found = dfs(i + 1, j, k + 1) ||  // 下
                  dfs(i - 1, j, k + 1) ||  // 上
                  dfs(i, j + 1, k + 1) ||  // 右
                  dfs(i, j - 1, k + 1);    // 左

    // 回溯：恢复格子的原始值
    board[i][j] = temp;

    return found;
  };

  // 尝试从每个格子开始搜索
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) {
        return true;  // 找到就立即返回
      }
    }
  }

  return false;  // 所有起点都搜索完，未找到
}

/**
 * 搜索过程示意：
 *
 * board = [["A","B","C","E"],    word = "ABCCED"
 *          ["S","F","C","S"],
 *          ["A","D","E","E"]]
 *
 * 从 (0,0) 开始搜索 "ABCCED"：
 *
 * 1. (0,0)='A' ✓ 匹配 word[0]
 *    标记为 '#'
 *
 * 2. 尝试四个方向，(0,1)='B' ✓ 匹配 word[1]
 *    标记为 '#'
 *
 * 3. (0,2)='C' ✓ 匹配 word[2]
 *    标记为 '#'
 *
 * 4. (1,2)='C' ✓ 匹配 word[3]
 *    标记为 '#'
 *
 * 5. (2,2)='E' ✓ 匹配 word[4]
 *    标记为 '#'
 *
 * 6. (2,1)='D' ✓ 匹配 word[5]
 *    k === word.length - 1，返回 true
 *
 * 路径：A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1)
 *
 * 为什么是 3^L 而不是 4^L？
 * - 每一步有4个方向
 * - 但来的方向不能再走回去（已标记为 '#'）
 * - 所以实际只有3个选择
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "单词搜索DFS演示",
          steps: [
            {
              array: ["A", "B", "C", "E"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "A" },
              ],
              description: "word=\"ABCCED\"。从(0,0)='A'开始，匹配word[0]='A' ✓",
            },
            {
              array: ["A", "B", "C", "E"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "#" },
                { indices: [1], color: "green" as const, label: "B" },
              ],
              description: "标记A为'#'。向右搜索(0,1)='B'，匹配word[1]='B' ✓",
            },
            {
              array: ["A", "B", "C", "E"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "已访问" },
                { indices: [2], color: "green" as const, label: "C" },
              ],
              description: "向右搜索(0,2)='C'，匹配word[2]='C' ✓",
            },
            {
              array: ["S", "F", "C", "S"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [2], color: "green" as const, label: "C" },
              ],
              description: "向下搜索(1,2)='C'，匹配word[3]='C' ✓",
            },
            {
              array: ["A", "D", "E", "E"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [2], color: "green" as const, label: "E" },
                { indices: [1], color: "blue" as const, label: "D" },
              ],
              description: "向下(2,2)='E'匹配word[4]，向左(2,1)='D'匹配word[5] ✓",
            },
            {
              array: ["A", "B", "C", "C", "E", "D"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "ABCCED" },
              ],
              description: "找到完整路径: A→B→C→C→E→D，返回true",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## DFS + 原地标记

### 思路
1. 从每个格子开始尝试匹配单词
2. DFS 搜索四个方向，匹配下一个字符
3. 临时标记已访问的格子（如改为 '#'）
4. 回溯时恢复格子的原始值
5. 如果匹配到单词末尾，返回 true

### 要点
- 原地修改避免额外空间
- 回溯时必须恢复原值`,
        timeComplexity: "O(m × n × 3^L)",
        spaceComplexity: "O(L)",
      },
      {
        name: "DFS + visited 数组",
        code: `/**
 * 单词搜索 - DFS + visited 数组
 *
 * 核心思想：
 * 与原地标记方法思路相同，但使用独立的 visited 数组
 * 优点是不修改原始数据，缺点是需要额外 O(m×n) 空间
 *
 * 实现要点：
 * 1. 使用 visited[i][j] 记录格子 (i,j) 是否已访问
 * 2. 使用方向数组 dirs 简化四个方向的遍历
 * 3. 访问前标记，回溯时取消标记
 *
 * 时间复杂度：O(m × n × 3^L)
 * 空间复杂度：O(m × n + L) - visited 数组 + 递归栈
 */
function exist(board, word) {
  const m = board.length;     // 行数
  const n = board[0].length;  // 列数

  // visited[i][j] 表示格子 (i,j) 是否已被访问
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  // 方向数组：右、左、下、上
  // 使用方向数组可以用循环代替四个独立的递归调用
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  /**
   * DFS 搜索函数
   * @param i, j - 当前位置
   * @param k - 当前匹配到单词的第 k 个字符
   */
  const dfs = (i, j, k) => {
    // 已匹配完所有字符，返回成功
    if (k === word.length) return true;

    // 边界检查
    if (i < 0 || i >= m || j < 0 || j >= n) return false;

    // 已访问或字符不匹配
    if (visited[i][j] || board[i][j] !== word[k]) return false;

    // 标记当前格子为已访问
    visited[i][j] = true;

    // 尝试四个方向
    for (const [di, dj] of dirs) {
      if (dfs(i + di, j + dj, k + 1)) {
        return true;  // 找到就立即返回
      }
    }

    // 回溯：取消访问标记
    visited[i][j] = false;
    return false;
  };

  // 尝试从每个格子开始搜索
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}

/**
 * visited 数组 vs 原地标记 对比：
 *
 * 原地标记：
 * - 空间：O(L)，只需要递归栈
 * - 优点：空间效率高
 * - 缺点：修改了原数组，不适合多线程或只读数据
 *
 * visited 数组：
 * - 空间：O(m × n + L)
 * - 优点：不修改原数组，更安全
 * - 缺点：需要额外空间
 *
 * 方向数组的优势：
 * - 代码更简洁，避免写四次类似的递归调用
 * - 易于扩展（如八方向、骑士走法等）
 * - 但循环略有性能开销
 *
 * 回溯的本质：
 *   dfs(i, j, k)
 *   └── visited[i][j] = true    // 做选择
 *   └── for each direction      // 探索
 *   │   └── dfs(ni, nj, k+1)
 *   └── visited[i][j] = false   // 撤销选择
 */`,
        explanation: `## DFS + visited 数组

### 思路
1. 使用独立的 visited 数组标记访问状态
2. 不修改原数组
3. 使用方向数组简化代码

### 优点
- 不修改原数组
- 代码结构更清晰`,
        animation: {
          type: "two-pointers" as const,
          title: "DFS+visited数组演示",
          steps: [
            {
              array: ["A", "B", "C", "E"],
              left: 0,
              right: 3,
              highlights: [],
              description: "使用visited数组标记访问状态，不修改原board",
            },
            {
              array: ["T", "F", "F", "F"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "visited" }],
              description: "访问(0,0)，visited[0][0]=true",
            },
            {
              array: ["T", "T", "F", "F"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "A→B" }],
              description: "访问(0,1)，visited[0][1]=true。匹配AB",
            },
            {
              array: ["T", "T", "T", "F"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "ABC" }],
              description: "继续匹配...visited标记路径",
            },
            {
              array: ["T", "F", "F", "F"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "回溯" }],
              description: "回溯时: visited[i][j]=false 取消标记",
            },
            {
              array: ["A", "B", "C", "E"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "gray" as const, label: "原数组不变" }],
              description: "原数组board保持不变，更安全",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(m × n × 3^L)",
        spaceComplexity: "O(m × n + L)",
      },
      {
        name: "优化：字符频率剪枝",
        code: `/**
 * 单词搜索 - 字符频率剪枝优化
 *
 * 核心思想：
 * 在 DFS 之前，先进行两个预处理优化：
 * 1. 字符存在性检查：word 中的字符是否都在 board 中存在
 * 2. 反向搜索优化：从出现次数少的端点开始搜索
 *
 * 优化原理：
 * - 如果 word 的首字符在 board 中出现很多次，会尝试很多起点
 * - 如果 word 的尾字符出现次数更少，反转 word 后起点更少
 * - 更少的起点 = 更少的 DFS 调用
 *
 * 时间复杂度：O(m × n × 3^L)，但实际运行更快
 * 空间复杂度：O(L) - 递归栈深度
 */
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  // ========== 优化1：统计 board 中字符频率 ==========
  const boardCount = {};
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      boardCount[board[i][j]] = (boardCount[board[i][j]] || 0) + 1;
    }
  }

  // ========== 优化2：检查 word 中每个字符是否都存在且数量足够 ==========
  const wordCount = {};
  for (const c of word) {
    wordCount[c] = (wordCount[c] || 0) + 1;
    // 如果 board 中没有这个字符，或数量不够，直接返回 false
    if (!boardCount[c] || wordCount[c] > boardCount[c]) {
      return false;  // 快速失败！
    }
  }

  // ========== 优化3：如果 word 末尾字符更稀少，反转搜索 ==========
  // 从稀少的字符开始，可以更快地剪枝
  if ((boardCount[word[0]] || 0) > (boardCount[word[word.length - 1]] || 0)) {
    word = word.split('').reverse().join('');
  }

  // ========== 标准 DFS 搜索 ==========
  const dfs = (i, j, k) => {
    // 匹配完成
    if (k === word.length) return true;

    // 边界检查 + 字符匹配
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    // 原地标记
    const temp = board[i][j];
    board[i][j] = '#';

    // 四方向搜索
    const found = dfs(i + 1, j, k + 1) || dfs(i - 1, j, k + 1) ||
                  dfs(i, j + 1, k + 1) || dfs(i, j - 1, k + 1);

    // 回溯
    board[i][j] = temp;
    return found;
  };

  // 从每个格子开始搜索
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}

/**
 * 优化效果示例：
 *
 * 假设 board 中：
 * - 'A' 出现 100 次
 * - 'Z' 出现 1 次
 *
 * 搜索 word = "ABC...XYZ"：
 * - 正向搜索：从 100 个 'A' 开始尝试
 * - 反向搜索：从 1 个 'Z' 开始尝试
 *
 * 反向搜索只需要尝试 1 个起点！
 *
 * 剪枝策略总结：
 * ┌─────────────────────────────────────────────┐
 * │ 剪枝类型      │ 时机        │ 效果         │
 * ├─────────────────────────────────────────────┤
 * │ 字符不存在    │ DFS 之前    │ O(1) 返回    │
 * │ 字符数量不足  │ DFS 之前    │ O(1) 返回    │
 * │ 反向搜索      │ DFS 之前    │ 减少起点数   │
 * │ 边界检查      │ DFS 中      │ 减少递归     │
 * │ 字符不匹配    │ DFS 中      │ 减少递归     │
 * └─────────────────────────────────────────────┘
 *
 * 适用场景：
 * - 大规模 board（如 1000×1000）
 * - 长单词
 * - 字符分布不均匀的测试用例
 *
 * 在 LeetCode 上，这种优化可以将运行时间从超时变为通过
 */`,
        explanation: `## 优化：字符频率剪枝

### 思路
1. 先统计 board 中字符频率
2. 检查 word 中字符是否都存在且数量足够
3. 如果 word 末尾字符出现次数更少，反转搜索
4. 从出现次数少的字符开始可以更快剪枝

### 优点
- 快速排除不可能的情况
- 对大规模测试用例效果显著`,
        animation: {
          type: "two-pointers" as const,
          title: "字符频率剪枝演示",
          steps: [
            {
              array: ["A:1", "B:1", "C:2", "E:2"],
              left: 0,
              right: 3,
              highlights: [],
              description: "统计board字符频率。word=\"ABCCED\"",
            },
            {
              array: ["A:1", "B:1", "C:2", "E:1", "D:1"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "都存在" }],
              description: "检查word字符: A,B,C,C,E,D 都在board中存在 ✓",
            },
            {
              array: ["word首:A", "word尾:D"],
              left: 0,
              right: 1,
              highlights: [],
              description: "比较首尾字符频率: A出现1次, D出现1次",
            },
            {
              array: ["从A开始"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "正向搜索" }],
              description: "频率相同，从首字符A开始搜索",
            },
            {
              array: ["X", "X", "X", "X"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "red" as const, label: "快速失败" }],
              description: "若word含board没有的字符，直接返回false（剪枝）",
            },
            {
              array: ["从稀少字符开始"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "优化" }],
              description: "若尾字符更稀少，反转word从尾字符开始搜索",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(m × n × 3^L)",
        spaceComplexity: "O(L)",
      },
    ],
  },

  // 7. 分割回文串 (131)
  {
    id: "palindrome-partitioning",
    leetcodeId: 131,
    title: "分割回文串",
    titleEn: "Palindrome Partitioning",
    difficulty: "medium",
    category: "backtracking",
    tags: ["字符串", "动态规划", "回溯"],
    frontendRelevance: "low",
    frontendNote: "分割回文串",
    description: `给你一个字符串 \`s\`，请你将 \`s\` 分割成一些子串，使每个子串都是 **回文串**。返回 \`s\` 所有可能的分割方案。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
\`\`\`

**示例 2：**
\`\`\`
输入：s = "a"
输出：[["a"]]
\`\`\``,
    constraints: `- \`1 <= s.length <= 16\`
- \`s\` 仅由小写英文字母组成`,
    initialCode: `function partition(s) {
  // 在此处编写你的代码

}`,
    solution: `function partition(s) {
  const result = [];

  const isPalindrome = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  const backtrack = (start, path) => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };

  backtrack(0, []);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例aab",
        input: ["aab"],
        expected: [["a","a","b"],["aa","b"]]
      },
      {
        id: "2",
        name: "单字符",
        input: ["a"],
        expected: [["a"]]
      }
    ],
    hints: [
      "回溯法，尝试所有可能的分割点",
      "只有当前子串是回文串时，才继续递归",
      "可以预处理回文判断，优化时间复杂度"
    ],
    explanation: `## 解题思路

### 回溯法

1. 从字符串开头开始，尝试每个可能的分割点
2. 如果当前子串是回文串，加入路径，继续处理剩余部分
3. 当处理完整个字符串时，记录当前分割方案
4. 回溯：移除最后加入的子串，尝试其他分割

### 复杂度分析
- 时间复杂度：O(n × 2^n)，n 是字符串长度
- 空间复杂度：O(n)，递归栈深度`,
    timeComplexity: "O(n × 2^n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["subsets", "word-search"],
    solutions: [
      {
        name: "回溯法（推荐）",
        code: `/**
 * 分割回文串 - 回溯法
 *
 * 核心思想：
 * 将字符串分割成若干子串，使每个子串都是回文串
 * 这是一个典型的"分割问题"，可以用回溯解决
 *
 * 与子集问题的关系：
 * - 子集：选择哪些元素放入子集
 * - 分割：选择在哪些位置切割
 * - 本质都是选择问题
 *
 * 算法思路：
 * 1. 从位置 start 开始，尝试所有可能的切割点 end
 * 2. 如果 s[start..end] 是回文，则加入路径，继续处理剩余部分
 * 3. 当 start 到达字符串末尾，说明整个字符串都被有效分割
 *
 * 时间复杂度：O(n × 2^n) - 最坏情况有 2^(n-1) 种分割方式
 * 空间复杂度：O(n) - 递归栈深度
 */
function partition(s) {
  const result = [];  // 存储所有有效分割方案

  /**
   * 判断 s[left..right] 是否是回文串
   * 使用双指针从两端向中间收缩
   */
  const isPalindrome = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  /**
   * 回溯函数
   * @param start - 当前待分割的起始位置
   * @param path - 当前已分割出的回文子串列表
   */
  const backtrack = (start, path) => {
    // 结束条件：已处理完整个字符串
    if (start === s.length) {
      result.push([...path]);  // 找到一个有效分割方案
      return;
    }

    // 尝试所有可能的切割点
    // end 从 start 到 s.length-1，代表切割后的子串 s[start..end]
    for (let end = start; end < s.length; end++) {
      // 剪枝：只有当前子串是回文时才继续
      if (isPalindrome(s, start, end)) {
        // 做选择：将回文子串加入路径
        path.push(s.slice(start, end + 1));

        // 递归：处理剩余部分，从 end+1 开始
        backtrack(end + 1, path);

        // 撤销选择：移除最后加入的子串
        path.pop();
      }
      // 如果不是回文，跳过这个切割点
    }
  };

  backtrack(0, []);
  return result;
}

/**
 * 决策树示意（s = "aab"）：
 *
 *                    ""
 *         /          |          \\
 *    "a"(0,0)    "aa"(0,1)   "aab"(0,2) ✗
 *      /    \\        |
 *  "a"(1,1) "ab" ✗  "b"(2,2)
 *     |              |
 *  "b"(2,2)         结束
 *     |              ↓
 *   结束           ["aa","b"]
 *     ↓
 * ["a","a","b"]
 *
 * 执行过程：
 * 1. start=0, 尝试 end=0: "a" 是回文 ✓
 *    path=["a"], 递归 start=1
 * 2. start=1, 尝试 end=1: "a" 是回文 ✓
 *    path=["a","a"], 递归 start=2
 * 3. start=2, 尝试 end=2: "b" 是回文 ✓
 *    path=["a","a","b"], start=3=length, 记录结果
 * 4. 回溯 → 尝试 end=2: "ab" 不是回文 ✗
 * 5. 回溯到 start=0, 尝试 end=1: "aa" 是回文 ✓
 *    path=["aa"], 递归 start=2
 * 6. start=2, 尝试 end=2: "b" 是回文 ✓
 *    path=["aa","b"], start=3=length, 记录结果
 *
 * 结果：[["a","a","b"], ["aa","b"]]
 *
 * 为什么是 2^n？
 * - n 个字符之间有 n-1 个间隙
 * - 每个间隙可以选择切或不切
 * - 最多 2^(n-1) 种分割方式
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "分割回文串回溯演示",
          steps: [
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "aab" },
              ],
              description: "s=\"aab\"。开始回溯，start=0，path=[]",
            },
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "a是回文" },
              ],
              description: "尝试s[0..0]=\"a\"，是回文 ✓。path=[\"a\"]，递归start=1",
            },
            {
              array: ["a", "a", "b"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "a" },
                { indices: [1], color: "green" as const, label: "a是回文" },
              ],
              description: "尝试s[1..1]=\"a\"，是回文 ✓。path=[\"a\",\"a\"]，递归start=2",
            },
            {
              array: ["a", "a", "b"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0], color: "blue" as const, label: "a" },
                { indices: [1], color: "blue" as const, label: "a" },
                { indices: [2], color: "green" as const, label: "b是回文" },
              ],
              description: "s[2..2]=\"b\"是回文 ✓。path=[\"a\",\"a\",\"b\"]，记录结果！",
            },
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "aa是回文" },
              ],
              description: "回溯。尝试s[0..1]=\"aa\"，是回文 ✓。path=[\"aa\"]",
            },
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "aa" },
                { indices: [2], color: "green" as const, label: "b" },
              ],
              description: "s[2..2]=\"b\"是回文。path=[\"aa\",\"b\"] ✓。共2种分割方案",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯法

### 思路
1. 从字符串开头开始，尝试每个可能的分割点
2. 如果当前子串是回文串，加入路径，继续处理剩余部分
3. 当处理完整个字符串时，记录当前分割方案
4. 回溯：移除最后加入的子串，尝试其他分割

### 要点
- 只有当前子串是回文时才继续递归
- 这是一种隐式剪枝`,
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "回溯 + DP预处理",
        code: `/**
 * 分割回文串 - 回溯 + DP预处理
 *
 * 核心思想：
 * 在回溯搜索之前，先用动态规划预计算所有子串的回文性
 * 这样在回溯过程中，判断回文只需 O(1) 时间
 *
 * DP 预处理：
 * - dp[i][j] 表示 s[i..j] 是否是回文串
 * - 转移方程：dp[i][j] = (s[i] === s[j]) && (j-i <= 2 || dp[i+1][j-1])
 *
 * 回文的判断条件：
 * 1. 首尾字符相同：s[i] === s[j]
 * 2. 中间部分是回文：
 *    - j-i <= 2：长度 ≤ 3，如 "a", "aa", "aba"，首尾相同即回文
 *    - dp[i+1][j-1] = true：中间子串是回文
 *
 * 时间复杂度：O(n² + n × 2^n)
 *   - O(n²) 预处理
 *   - O(n × 2^n) 回溯
 * 空间复杂度：O(n²) - DP 表
 */
function partition(s) {
  const n = s.length;
  const result = [];

  // ========== DP 预处理：计算所有子串是否是回文 ==========
  // dp[i][j] = true 表示 s[i..j] 是回文串
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  // 从后往前填表，确保计算 dp[i][j] 时 dp[i+1][j-1] 已知
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      // s[i..j] 是回文的条件：
      // 1. 首尾字符相同
      // 2. 中间部分是回文（或长度 <= 2）
      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
      }
    }
  }

  /**
   * 回溯函数
   */
  const backtrack = (start, path) => {
    // 结束条件：处理完整个字符串
    if (start === n) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < n; end++) {
      // O(1) 判断回文！直接查表
      if (dp[start][end]) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };

  backtrack(0, []);
  return result;
}

/**
 * DP 预处理示例（s = "aab"）：
 *
 * 填表过程（从 i=2 到 i=0）：
 *
 *      j=0  j=1  j=2
 * i=0 [ T    T    F ]   s[0..0]="a" ✓, s[0..1]="aa" ✓, s[0..2]="aab" ✗
 * i=1 [ -    T    F ]   s[1..1]="a" ✓, s[1..2]="ab" ✗
 * i=2 [ -    -    T ]   s[2..2]="b" ✓
 *
 * 判断 s[0][1]="aa" 时：
 * - s[0]='a' === s[1]='a' ✓
 * - j-i = 1 <= 2 ✓
 * - 所以 dp[0][1] = true
 *
 * 判断 s[0][2]="aab" 时：
 * - s[0]='a' !== s[2]='b' ✗
 * - 所以 dp[0][2] = false
 *
 * 为什么从后往前填表？
 * - dp[i][j] 依赖 dp[i+1][j-1]
 * - 需要先计算 i 较大的情况
 *
 * 优化效果：
 * - 普通回溯：判断回文 O(n)，总时间 O(n² × 2^n)
 * - DP优化：判断回文 O(1)，总时间 O(n² + n × 2^n)
 *
 * 当 n 较大且有很多重复子串时，优化效果显著
 */`,
        explanation: `## 回溯 + DP预处理

### 思路
1. 先用动态规划预处理所有子串是否为回文
2. dp[i][j] 表示 s[i..j] 是否是回文
3. 回溯时直接查表，避免重复计算

### 优点
- 判断回文 O(1) 时间
- 适合字符串较长的情况`,
        animation: {
          type: "two-pointers" as const,
          title: "分割回文串DP预处理演示",
          steps: [
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 2,
              highlights: [],
              description: "s=\"aab\"。先用DP预计算所有子串是否回文",
            },
            {
              array: ["dp[0][0]", "dp[1][1]", "dp[2][2]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "T T T" }],
              description: "单字符都是回文: dp[0][0]=dp[1][1]=dp[2][2]=T",
            },
            {
              array: ["dp[0][1]", "dp[1][2]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "T(aa)" },
                { indices: [1], color: "red" as const, label: "F(ab)" },
              ],
              description: "长度2: dp[0][1]=\"aa\"是回文T, dp[1][2]=\"ab\"不是F",
            },
            {
              array: ["dp[0][2]=F"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "aab不是回文" }],
              description: "长度3: dp[0][2]=\"aab\"不是回文F",
            },
            {
              array: ["查表O(1)"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "dp[i][j]" }],
              description: "回溯时判断回文只需查dp表，O(1)时间",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n²)",
      },
      {
        name: "记忆化搜索",
        code: `/**
 * 分割回文串 - 记忆化搜索
 *
 * 核心思想：
 * 使用自顶向下的记忆化搜索代替回溯
 * 对于相同的起始位置，缓存其所有可能的分割方案
 *
 * 与回溯的区别：
 * - 回溯：逐个构建路径，找到完整方案时记录
 * - 记忆化：返回从某位置开始的所有方案，组合构建最终结果
 *
 * 算法思路：
 * 1. dfs(start) 返回从位置 start 开始的所有分割方案
 * 2. 枚举第一个切割点 end，如果 s[start..end] 是回文
 * 3. 递归获取 dfs(end+1)，然后将当前子串与后续方案组合
 * 4. 使用 memo 缓存避免重复计算
 *
 * 时间复杂度：O(n × 2^n)
 * 空间复杂度：O(n × 2^n) - 缓存所有可能的分割方案
 */
function partition(s) {
  const n = s.length;

  // 记忆化缓存：memo.get(start) = 从位置 start 开始的所有分割方案
  const memo = new Map();

  /**
   * 判断 s[left..right] 是否是回文串
   */
  const isPalindrome = (left, right) => {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  /**
   * 记忆化搜索：返回从 start 开始的所有分割方案
   * @param start - 起始位置
   * @returns 所有分割方案的数组
   */
  const dfs = (start) => {
    // 结束条件：到达字符串末尾，返回空方案（空数组表示一种完成）
    if (start === n) return [[]];

    // 检查缓存
    if (memo.has(start)) return memo.get(start);

    const result = [];

    // 枚举第一个切割点
    for (let end = start; end < n; end++) {
      // 如果 s[start..end] 是回文
      if (isPalindrome(start, end)) {
        const substr = s.slice(start, end + 1);  // 当前回文子串

        // 递归获取剩余部分的所有分割方案
        const suffixes = dfs(end + 1);

        // 将当前子串与每个后续方案组合
        for (const suffix of suffixes) {
          result.push([substr, ...suffix]);
        }
      }
    }

    // 缓存结果
    memo.set(start, result);
    return result;
  };

  return dfs(0);
}

/**
 * 执行过程示例（s = "aab"）：
 *
 * dfs(0) 被调用：
 * ├── end=0: "a" 是回文
 * │   └── suffixes = dfs(1)
 * │       ├── end=1: "a" 是回文
 * │       │   └── suffixes = dfs(2)
 * │       │       └── end=2: "b" 是回文
 * │       │           └── suffixes = dfs(3) = [[]]
 * │       │           └── 结果: [["b"]]
 * │       │   └── 组合: [["a", "b"]]
 * │       └── end=2: "ab" 不是回文，跳过
 * │       └── dfs(1) 返回 [["a", "b"]]
 * │   └── 组合: [["a", "a", "b"]]
 * ├── end=1: "aa" 是回文
 * │   └── suffixes = dfs(2) = [["b"]]
 * │   └── 组合: [["aa", "b"]]
 * └── end=2: "aab" 不是回文，跳过
 *
 * dfs(0) 返回: [["a", "a", "b"], ["aa", "b"]]
 *
 * 记忆化的价值：
 * - 如果有多个路径都需要 dfs(k)，只计算一次
 * - 例如 s = "aaa"，dfs(2) 会被多次需要
 *   - "a" + dfs(1) → "a" + dfs(2)
 *   - "aa" + dfs(2)
 *   - 使用缓存避免重复计算
 *
 * 回溯 vs 记忆化：
 * ┌──────────────┬─────────────────┬─────────────────┐
 * │              │ 回溯            │ 记忆化搜索      │
 * ├──────────────┼─────────────────┼─────────────────┤
 * │ 方向         │ 构建路径        │ 返回所有方案    │
 * │ 结果存储     │ 外部 result     │ 返回值          │
 * │ 重复计算     │ 可能有          │ 通过缓存避免    │
 * │ 空间         │ O(n)            │ O(n × 2^n)      │
 * └──────────────┴─────────────────┴─────────────────┘
 */`,
        explanation: `## 记忆化搜索

### 思路
1. 从每个位置开始，返回所有可能的分割方案
2. 使用 memo 缓存每个起始位置的结果
3. 递归组合当前子串和后续所有分割方案

### 特点
- 自顶向下的动态规划
- 避免重复计算相同子问题`,
        animation: {
          type: "two-pointers" as const,
          title: "分割回文串记忆化搜索演示",
          steps: [
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 2,
              highlights: [],
              description: "s=\"aab\"。记忆化: dfs(start)返回从start开始的所有分割方案",
            },
            {
              array: ["dfs(0)"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "调用" }],
              description: "调用dfs(0)，枚举第一个切割点",
            },
            {
              array: ["dfs(1)", "dfs(2)", "dfs(3)"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "[[]]" }],
              description: "dfs(3)=[[]]（空方案表示完成）",
            },
            {
              array: ["dfs(2)"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "[[b]]" }],
              description: "dfs(2): 'b'是回文，dfs(3)=[[]] → [[\"b\"]]",
            },
            {
              array: ["dfs(1)"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "[[a,b]]" }],
              description: "dfs(1): 'a'+dfs(2)=[[\"a\",\"b\"]]（缓存结果）",
            },
            {
              array: ["[[a,a,b]]", "[[aa,b]]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "dfs(0): 'a'+dfs(1)和'aa'+dfs(2) → 2种方案",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n × 2^n)",
      },
    ],
  },

  // 8. N 皇后 (51)
  {
    id: "n-queens",
    leetcodeId: 51,
    title: "N 皇后",
    titleEn: "N-Queens",
    difficulty: "hard",
    category: "backtracking",
    tags: ["数组", "回溯"],
    frontendRelevance: "low",
    frontendNote: "N皇后Hard",
    description: `按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

**n 皇后问题** 研究的是如何将 \`n\` 个皇后放置在 \`n×n\` 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 \`n\`，返回所有不同的 **n 皇后问题** 的解决方案。

每一种解法包含一个不同的 **n 皇后问题** 的棋子放置方案，该方案中 \`'Q'\` 和 \`'.'\` 分别代表了皇后和空位。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：4 皇后问题存在两个不同的解法。
\`\`\`

**示例 2：**
\`\`\`
输入：n = 1
输出：[["Q"]]
\`\`\``,
    constraints: `- \`1 <= n <= 9\``,
    initialCode: `function solveNQueens(n) {
  // 在此处编写你的代码

}`,
    solution: `function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  // 检查是否可以放置皇后
  const isValid = (row, col) => {
    // 检查列
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // 检查左上对角线
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // 检查右上对角线
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  };

  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  };

  backtrack(0);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "4皇后",
        input: [4],
        expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
      },
      {
        id: "2",
        name: "1皇后",
        input: [1],
        expected: [["Q"]]
      }
    ],
    hints: [
      "逐行放置皇后，每行只能放一个",
      "检查列、左上对角线、右上对角线是否有冲突",
      "使用集合优化冲突检测"
    ],
    explanation: `## 解题思路

### 回溯法

1. 逐行放置皇后，每行尝试每个列位置
2. 放置前检查是否与已放置的皇后冲突：
   - 同一列
   - 左上对角线
   - 右上对角线
3. 如果可以放置，递归处理下一行
4. 当所有行都放置完毕，记录当前解
5. 回溯：移除皇后，尝试下一个位置

### 复杂度分析
- 时间复杂度：O(n!)，每行的选择逐渐减少
- 空间复杂度：O(n)，递归栈和棋盘`,
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n)",
    relatedProblems: ["permutations", "combination-sum"],
    solutions: [
      {
        name: "回溯 + 逐行检查（推荐）",
        code: `/**
 * N 皇后问题 - 回溯 + 逐行检查
 *
 * 核心思想：
 * 在 n×n 的棋盘上放置 n 个皇后，使它们不能相互攻击
 * 皇后可以攻击同行、同列、同对角线的棋子
 *
 * 关键洞察：
 * 每行必须恰好有一个皇后（因为皇后不能同行）
 * 因此可以逐行放置，每行只需决定放在哪一列
 *
 * 冲突检测：
 * - 同列冲突：board[i][col] === 'Q'（某行的同列有皇后）
 * - 左上对角线：row-col 值相同的格子
 * - 右上对角线：row+col 值相同的格子
 *
 * 时间复杂度：O(n!) - 每行的选择逐渐减少
 * 空间复杂度：O(n²) - 棋盘 + 递归栈
 */
function solveNQueens(n) {
  const result = [];  // 存储所有解法

  // 初始化棋盘，全部填充 '.'
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  /**
   * 检查在 (row, col) 位置放置皇后是否合法
   * 只需检查上方，因为下方还没有皇后
   */
  const isValid = (row, col) => {
    // 检查同列上方是否有皇后
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // 检查左上对角线
    // 从 (row-1, col-1) 开始，每次 i--, j--
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // 检查右上对角线
    // 从 (row-1, col+1) 开始，每次 i--, j++
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    return true;  // 无冲突，可以放置
  };

  /**
   * 回溯函数：在第 row 行放置皇后
   */
  const backtrack = (row) => {
    // 结束条件：所有行都已放置皇后
    if (row === n) {
      // 将棋盘转换为字符串数组，记录这个解
      result.push(board.map(r => r.join('')));
      return;
    }

    // 尝试在当前行的每一列放置皇后
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        // 做选择：放置皇后
        board[row][col] = 'Q';

        // 递归：处理下一行
        backtrack(row + 1);

        // 撤销选择：移除皇后
        board[row][col] = '.';
      }
    }
  };

  backtrack(0);
  return result;
}

/**
 * 4 皇后问题示例：
 *
 * 解法1：          解法2：
 * . Q . .         . . Q .
 * . . . Q         Q . . .
 * Q . . .         . . . Q
 * . . Q .         . Q . .
 *
 * 搜索过程（4皇后）：
 *
 * row=0: 尝试 col=0
 *   Q . . .
 *   . . . .
 *   . . . .
 *   . . . .
 *
 * row=1: col=0 冲突（同列），col=1 冲突（对角线），尝试 col=2
 *   Q . . .
 *   . . Q .
 *   . . . .
 *   . . . .
 *
 * row=2: col=0~3 都冲突 → 回溯到 row=1
 * row=1: 尝试 col=3
 *   Q . . .
 *   . . . Q
 *   . . . .
 *   . . . .
 *
 * row=2: 尝试 col=1
 *   Q . . .
 *   . . . Q
 *   . Q . .
 *   . . . .
 *
 * row=3: col=0~3 都冲突 → 回溯...
 *
 * 最终找到两个解：
 * - [".Q..","...Q","Q...","..Q."]
 * - ["..Q.","Q...","...Q",".Q.."]
 *
 * 为什么只检查上方？
 * - 我们是逐行从上到下放置
 * - 当前行下方还没有皇后
 * - 所以只需要检查上方的冲突
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "N皇后回溯演示",
          steps: [
            {
              array: [".", ".", ".", "."],
              left: 0,
              right: 0,
              highlights: [],
              description: "n=4。4×4棋盘，放置4个互不攻击的皇后。从第0行开始",
            },
            {
              array: [".", "Q", ".", "."],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "green" as const, label: "Q" },
              ],
              description: "row=0，尝试col=1。放置皇后，board[0][1]='Q'",
            },
            {
              array: [".", ".", ".", "Q"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [3], color: "green" as const, label: "Q" },
              ],
              description: "row=1，col=0/1/2都冲突。放置col=3，board[1][3]='Q'",
            },
            {
              array: ["Q", ".", ".", "."],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "Q" },
              ],
              description: "row=2，col=0无冲突。放置board[2][0]='Q'",
            },
            {
              array: [".", ".", "Q", "."],
              left: 0,
              right: 2,
              highlights: [
                { indices: [2], color: "green" as const, label: "Q" },
              ],
              description: "row=3，col=2无冲突。放置board[3][2]='Q'。找到解！",
            },
            {
              array: [".Q..", "...Q", "Q...", "..Q."],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "解法1" },
              ],
              description: "解法1: [\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]。共2种解法",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 回溯 + 逐行检查

### 思路
1. 逐行放置皇后，每行尝试每个列位置
2. 放置前检查是否与已放置的皇后冲突：
   - 同一列
   - 左上对角线
   - 右上对角线
3. 如果可以放置，递归处理下一行
4. 当所有行都放置完毕，记录当前解
5. 回溯：移除皇后，尝试下一个位置

### 要点
- 因为逐行放置，所以不需要检查同行
- 只需要检查上方的冲突`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
      },
      {
        name: "回溯 + 集合优化",
        code: `/**
 * N 皇后问题 - 回溯 + 集合优化
 *
 * 核心思想：
 * 使用集合来记录已占用的列和对角线
 * 将冲突检测从 O(n) 优化到 O(1)
 *
 * 对角线的数学特性：
 * - 主对角线（↘方向）：同一条对角线上的格子 row - col 值相同
 *   例如 (0,0), (1,1), (2,2) 的 row-col 都是 0
 *   例如 (0,1), (1,2), (2,3) 的 row-col 都是 -1
 * - 副对角线（↙方向）：同一条对角线上的格子 row + col 值相同
 *   例如 (0,2), (1,1), (2,0) 的 row+col 都是 2
 *
 * 时间复杂度：O(n!) - 但常数因子更小
 * 空间复杂度：O(n) - 集合 + 递归栈
 */
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  // 三个集合记录被占用的位置
  const cols = new Set();   // 已占用的列
  const diag1 = new Set();  // 已占用的主对角线（row - col）
  const diag2 = new Set();  // 已占用的副对角线（row + col）

  /**
   * 回溯函数
   */
  const backtrack = (row) => {
    // 结束条件：所有行都放置了皇后
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    // 尝试每一列
    for (let col = 0; col < n; col++) {
      // O(1) 冲突检测：检查列、主对角线、副对角线
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;  // 有冲突，跳过
      }

      // 做选择：放置皇后
      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // 递归：处理下一行
      backtrack(row + 1);

      // 撤销选择：移除皇后
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };

  backtrack(0);
  return result;
}

/**
 * 对角线编号示意（n=4）：
 *
 * 主对角线 (row - col)：
 * ┌───┬───┬───┬───┐
 * │ 0 │-1 │-2 │-3 │  row=0
 * ├───┼───┼───┼───┤
 * │ 1 │ 0 │-1 │-2 │  row=1
 * ├───┼───┼───┼───┤
 * │ 2 │ 1 │ 0 │-1 │  row=2
 * ├───┼───┼───┼───┤
 * │ 3 │ 2 │ 1 │ 0 │  row=3
 * └───┴───┴───┴───┘
 *
 * 副对角线 (row + col)：
 * ┌───┬───┬───┬───┐
 * │ 0 │ 1 │ 2 │ 3 │  row=0
 * ├───┼───┼───┼───┤
 * │ 1 │ 2 │ 3 │ 4 │  row=1
 * ├───┼───┼───┼───┤
 * │ 2 │ 3 │ 4 │ 5 │  row=2
 * ├───┼───┼───┼───┤
 * │ 3 │ 4 │ 5 │ 6 │  row=3
 * └───┴───┴───┴───┘
 *
 * 如果 (0,1) 有皇后：
 * - cols 加入 1（第1列被占）
 * - diag1 加入 -1（row-col = 0-1 = -1）
 * - diag2 加入 1（row+col = 0+1 = 1）
 *
 * 检查 (1,0) 是否冲突：
 * - cols.has(0)? No
 * - diag1.has(1-0=1)? No
 * - diag2.has(1+0=1)? Yes! → 在同一副对角线，冲突！
 *
 * 集合法 vs 遍历法：
 * ┌──────────────┬───────────────┬───────────────┐
 * │              │ 遍历法        │ 集合法        │
 * ├──────────────┼───────────────┼───────────────┤
 * │ 检测复杂度   │ O(n)          │ O(1)          │
 * │ 空间         │ O(n²) 棋盘    │ O(n) 集合     │
 * │ 代码复杂度   │ 中等          │ 简单          │
 * └──────────────┴───────────────┴───────────────┘
 */`,
        explanation: `## 回溯 + 集合优化

### 思路
1. 使用三个集合分别记录：
   - cols：已占用的列
   - diag1：已占用的主对角线（row - col 相同）
   - diag2：已占用的副对角线（row + col 相同）
2. 判断冲突从 O(n) 优化到 O(1)

### 优点
- 冲突检测更高效
- 代码更清晰`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "N皇后集合优化演示",
          steps: [
            {
              array: [".", ".", ".", "."],
              left: 0,
              right: 3,
              highlights: [],
              description: "n=4。使用3个Set：cols(列), diag1(主对角线), diag2(副对角线)",
            },
            {
              array: [".", "Q", ".", "."],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "row0" }],
              description: "row0,col1放皇后。cols={1}, diag1={-1}, diag2={1}",
            },
            {
              array: [".", "Q", ".", "Q"],
              left: 1,
              right: 3,
              highlights: [
                { indices: [1], color: "green" as const, label: "row0" },
                { indices: [3], color: "blue" as const, label: "row1" },
              ],
              description: "row1：col0冲突(diag2)，col1冲突(cols)，col2冲突(diag1)，col3可用！",
            },
            {
              array: ["Q", ".", ".", "."],
              left: 2,
              right: 0,
              highlights: [
                { indices: [1], color: "gray" as const, label: "row0" },
                { indices: [3], color: "gray" as const, label: "row1" },
                { indices: [0], color: "purple" as const, label: "row2" },
              ],
              description: "row2,col0可用。继续递归到row3...",
            },
            {
              array: [".", ".", "Q", "."],
              left: 3,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "row3" }],
              description: "row3,col2可用。找到解：[.Q..,...Q,Q...,..Q.]。O(1)判断冲突！",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "位运算优化",
        code: `/**
 * N 皇后问题 - 位运算优化
 *
 * 核心思想：
 * 使用整数的二进制位来表示占用状态
 * 位运算比集合操作更快，是 N 皇后问题的终极优化
 *
 * 位表示法：
 * - cols：已占用的列（位为1表示该列已有皇后）
 * - diag1：主对角线（每下一行，整体左移1位）
 * - diag2：副对角线（每下一行，整体右移1位）
 *
 * 关键位运算技巧：
 * 1. (1 << n) - 1：生成 n 个 1，表示全部可用
 * 2. ~x：取反，表示可用位置
 * 3. x & -x：获取最低位的 1（lowbit）
 * 4. x & (x-1)：清除最低位的 1
 *
 * 时间复杂度：O(n!) - 常数因子极小
 * 空间复杂度：O(n) - 递归栈
 */
function solveNQueens(n) {
  const result = [];

  /**
   * 位运算回溯
   * @param row - 当前行
   * @param cols - 列占用情况（二进制）
   * @param diag1 - 主对角线占用（二进制）
   * @param diag2 - 副对角线占用（二进制）
   * @param board - 当前棋盘
   */
  const solve = (row, cols, diag1, diag2, board) => {
    // 结束条件：所有行都放置了皇后
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    // 计算当前行可用位置：
    // (1 << n) - 1：全1，表示所有列
    // cols | diag1 | diag2：所有被占用的位置
    // ~(...)：取反得到可用位置
    // & 全1：只保留有效的 n 位
    let availablePositions = ((1 << n) - 1) & ~(cols | diag1 | diag2);

    // 遍历所有可用位置
    while (availablePositions) {
      // 获取最低位的 1（选择一个可用位置）
      // x & -x 的原理：-x 是 x 的补码，只有最低位的 1 保持不变
      const position = availablePositions & (-availablePositions);

      // 清除最低位的 1（从可用位置中移除）
      availablePositions &= (availablePositions - 1);

      // 计算列号：position = 2^col，所以 col = log2(position)
      const col = Math.log2(position);

      // 放置皇后
      board[row][col] = 'Q';

      // 递归到下一行
      solve(
        row + 1,
        cols | position,            // 新增列占用
        (diag1 | position) << 1,    // 主对角线左移（向下一行传递）
        (diag2 | position) >> 1,    // 副对角线右移（向下一行传递）
        board
      );

      // 回溯：移除皇后
      board[row][col] = '.';
    }
  };

  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  solve(0, 0, 0, 0, board);
  return result;
}

/**
 * 位运算图解（n=4）：
 *
 * 初始状态（row=0）：
 * cols  = 0000, diag1 = 0000, diag2 = 0000
 * available = 1111 & ~(0000) = 1111（全部可用）
 *
 * 假设选择 col=1（position = 0010）：
 * cols  = 0010
 * diag1 = 0010 → 下一行左移 → 0100
 * diag2 = 0010 → 下一行右移 → 0001
 *
 * row=1 的可用位置：
 * occupied = 0010 | 0100 | 0001 = 0111
 * available = 1111 & ~0111 = 1000（只有 col=3 可用）
 *
 * lowbit 原理：
 * x = 12 = 1100
 * -x = 补码 = 0100
 * x & -x = 1100 & 0100 = 0100（最低位的1）
 *
 * 清除 lowbit：
 * x = 1100
 * x - 1 = 1011
 * x & (x-1) = 1100 & 1011 = 1000（清除了最低位的1）
 *
 * 对角线左移/右移的含义：
 *
 *   col  0 1 2 3
 * row 0: . Q . .   ← 皇后在 (0,1)
 * row 1: . . X .   ← 主对角线影响 (1,2)，副对角线影响 (1,0)
 *
 * 主对角线（↘）：position << 1 = 从 col 移到 col+1
 * 副对角线（↙）：position >> 1 = 从 col 移到 col-1
 *
 * 位运算 vs 集合 vs 遍历：
 * ┌─────────────┬───────────┬───────────┬───────────┐
 * │             │ 遍历      │ 集合      │ 位运算    │
 * ├─────────────┼───────────┼───────────┼───────────┤
 * │ 检测        │ O(n)      │ O(1)      │ O(1)      │
 * │ 找可用位置  │ O(n)      │ O(n)      │ O(1)*     │
 * │ 实际速度    │ 慢        │ 中等      │ 极快      │
 * └─────────────┴───────────┴───────────┴───────────┘
 * * 使用 lowbit 技巧，只遍历可用位置
 */`,
        explanation: `## 位运算优化

### 思路
1. 用整数的二进制位表示占用情况
2. cols：已占用的列
3. diag1：主对角线（每行左移一位）
4. diag2：副对角线（每行右移一位）
5. 用位运算快速找到所有可用位置

### 优点
- 极致的性能优化
- 适合大规模计算`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "N皇后位运算优化演示",
          steps: [
            {
              array: ["1111"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "gray" as const, label: "available" }],
              description: "n=4。cols=0000,diag1=0000,diag2=0000。available=1111(全部可用)",
            },
            {
              array: ["0010"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "position" }],
              description: "row0：lowbit取0001(col=0)。放置后：cols=0001, diag1=0010, diag2=0000",
            },
            {
              array: ["1100"],
              left: 1,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "available" }],
              description: "row1：occupied=0001|0010|0000=0011。available=1100(col=2,3可用)",
            },
            {
              array: ["0100"],
              left: 1,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "position" }],
              description: "选col=2(position=0100)。继续递归...",
            },
            {
              array: ["0000"],
              left: 2,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "死胡同" }],
              description: "row2：available=0000(无可用位置)。回溯！",
            },
            {
              array: ["count=2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "位运算完成遍历。n=4共2种解法。位操作比集合更快！",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 9. N 皇后 II (52)
  {
    id: "n-queens-ii",
    leetcodeId: 52,
    title: "N 皇后 II",
    titleEn: "N-Queens II",
    difficulty: "hard",
    category: "backtracking",
    tags: ["回溯"],
    frontendRelevance: "low",
    frontendNote: "N皇后II",
    description: `n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 4
输出：2
解释：如图所示，4 皇后问题存在两个不同的解法。
\`\`\`

**示例 2：**
\`\`\`
输入：n = 1
输出：1
\`\`\``,
    constraints: `- \`1 <= n <= 9\``,
    initialCode: `function totalNQueens(n) {
  // 在此处编写代码
}`,
    solution: `function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); // 主对角线 row - col
  const diag2 = new Set(); // 副对角线 row + col

  const backtrack = (row) => {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;
      }

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      backtrack(row + 1);

      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };

  backtrack(0);
  return count;
}`,
    testCases: [
      { id: "1", name: "n=4", input: [4], expected: 2 },
      { id: "2", name: "n=1", input: [1], expected: 1 },
      { id: "3", name: "n=8", input: [8], expected: 92 },
    ],
    hints: [
      "与 N 皇后问题类似，但只需要计数",
      "使用集合记录已占用的列和对角线",
      "可以使用位运算优化",
    ],
    explanation: `## 解题思路

### 回溯法

与 N 皇后问题 (51) 相同的思路，但只计数不记录解：
1. 逐行放置皇后
2. 用集合记录已占用的列、主对角线、副对角线
3. 找到有效放置时递归下一行
4. 到达最后一行时计数加一

### 对角线规律

- 主对角线：同一条主对角线上 row - col 相同
- 副对角线：同一条副对角线上 row + col 相同

### 复杂度分析
- 时间复杂度：O(n!)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n)",
    relatedProblems: ["n-queens"],
    solutions: [
      {
        name: "回溯 + 集合",
        code: `/**
 * N 皇后 II - 回溯 + 集合
 *
 * 核心思想：
 * 与 N 皇后问题 (51) 相同的回溯策略
 * 区别在于只需要计数，不需要记录具体的棋盘布局
 *
 * 简化点：
 * - 不需要维护 board 数组
 * - 找到解时直接 count++
 * - 代码更简洁，空间更省
 *
 * 时间复杂度：O(n!) - 与 N 皇后问题相同
 * 空间复杂度：O(n) - 三个集合 + 递归栈
 */
function totalNQueens(n) {
  let count = 0;  // 解的数量

  // 三个集合记录占用状态
  const cols = new Set();   // 已占用的列
  const diag1 = new Set();  // 已占用的主对角线（row - col）
  const diag2 = new Set();  // 已占用的副对角线（row + col）

  /**
   * 回溯函数：在第 row 行放置皇后
   */
  const backtrack = (row) => {
    // 结束条件：成功放置了 n 个皇后
    if (row === n) {
      count++;  // 找到一个有效解
      return;
    }

    // 尝试当前行的每一列
    for (let col = 0; col < n; col++) {
      // O(1) 冲突检测
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;  // 有冲突，跳过
      }

      // 做选择：标记占用
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // 递归：处理下一行
      backtrack(row + 1);

      // 撤销选择：取消占用
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };

  backtrack(0);
  return count;
}

/**
 * N 皇后问题解的数量（已知结论）：
 *
 * n  |  解的数量
 * ---|----------
 * 1  |     1
 * 2  |     0
 * 3  |     0
 * 4  |     2
 * 5  |    10
 * 6  |     4
 * 7  |    40
 * 8  |    92
 * 9  |   352
 * 10 |   724
 * 11 |  2680
 * 12 | 14200
 *
 * 与 N 皇后问题的区别：
 * ┌────────────────┬─────────────────┬─────────────────┐
 * │                │ N 皇后 (51)     │ N 皇后 II (52)  │
 * ├────────────────┼─────────────────┼─────────────────┤
 * │ 返回值         │ 所有解的棋盘    │ 解的数量        │
 * │ board 数组     │ 需要            │ 不需要          │
 * │ 结果存储       │ result.push()   │ count++         │
 * │ 空间复杂度     │ O(n × 解数)     │ O(n)            │
 * └────────────────┴─────────────────┴─────────────────┘
 *
 * 适用场景：
 * - 只需要知道解的个数，不需要具体解法时
 * - 作为验证其他算法的基准测试
 */`,
        animation: {
          type: "two-pointers" as const,
          title: "N皇后II计数回溯演示",
          steps: [
            {
              array: [".", ".", ".", "."],
              left: 0,
              right: 0,
              highlights: [],
              description: "n=4。统计4皇后有多少种解法。只计数不记录棋盘。count=0",
            },
            {
              array: ["Q", ".", ".", "."],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "row0" }],
              description: "第0行：尝试col=0放置皇后。标记cols={0}, diag1={0}, diag2={0}",
            },
            {
              array: ["Q", ".", "Q", "."],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "row0" },
                { indices: [2], color: "blue" as const, label: "row1" },
              ],
              description: "第1行：col=0,1冲突，尝试col=2。继续递归...",
            },
            {
              array: [".", "Q", ".", "."],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "row0" }],
              description: "回溯后尝试：第0行col=1。找到第一个解，count=1",
            },
            {
              array: [".", ".", "Q", "."],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "row0" }],
              description: "继续回溯：第0行col=2。找到第二个解，count=2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "遍历完成。n=4的N皇后问题共有2种解法",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 集合法

### 核心思想
使用三个集合分别记录已占用的：
1. 列
2. 主对角线 (row - col)
3. 副对角线 (row + col)`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
      },
      {
        name: "位运算优化",
        code: `/**
 * N 皇后 II - 位运算优化
 *
 * 核心思想：
 * 用位运算代替集合操作，达到极致的性能优化
 * 这是 N 皇后计数问题的最优解法
 *
 * 位表示法：
 * - cols：已占用列的二进制表示
 * - diag1：主对角线占用（每行左移传递）
 * - diag2：副对角线占用（每行右移传递）
 *
 * 关键技巧：
 * 1. ~(cols | diag1 | diag2) & mask：获取所有可用位置
 * 2. x & -x：取出最低位的 1（lowbit）
 * 3. x & (x-1)：清除最低位的 1
 *
 * 时间复杂度：O(n!) - 但常数因子极小
 * 空间复杂度：O(n) - 只有递归栈
 */
function totalNQueens(n) {
  let count = 0;  // 解的数量

  /**
   * 位运算回溯
   * @param row - 当前行号
   * @param cols - 列占用的二进制表示
   * @param diag1 - 主对角线占用
   * @param diag2 - 副对角线占用
   */
  const solve = (row, cols, diag1, diag2) => {
    // 结束条件：所有行都放置了皇后
    if (row === n) {
      count++;
      return;
    }

    // 计算所有可用位置
    // (1 << n) - 1：全1掩码，表示所有列
    // ~(cols | diag1 | diag2)：取反得到可用位置
    // & mask：只保留有效的 n 位
    let availablePositions = ((1 << n) - 1) & ~(cols | diag1 | diag2);

    // 遍历所有可用位置（只遍历为1的位）
    while (availablePositions) {
      // 取出最低位的 1
      // x & -x 的原理：-x 是 x 的补码，与 x 相与只保留最低位的 1
      const position = availablePositions & -availablePositions;

      // 清除最低位的 1，准备处理下一个可用位置
      availablePositions &= availablePositions - 1;

      // 递归到下一行
      solve(
        row + 1,
        cols | position,            // 新增列占用
        (diag1 | position) << 1,    // 主对角线左移
        (diag2 | position) >> 1     // 副对角线右移
      );
    }
  };

  solve(0, 0, 0, 0);
  return count;
}

/**
 * 位运算执行示例（n=4）：
 *
 * 初始：solve(0, 0000, 0000, 0000)
 * available = 1111（全部可用）
 *
 * 选择 col=0（position = 0001）：
 * solve(1, 0001, 0010, 0000)
 * available = 1111 & ~(0001 | 0010 | 0000) = 1100
 *
 * 选择 col=2（position = 0100）：
 * solve(2, 0101, 1010, 0010)
 * available = 1111 & ~(0101 | 1010 | 0010) = 0000
 * → 死胡同，回溯
 *
 * ... 继续搜索 ...
 *
 * 位运算优势：
 * 1. 无需额外数据结构，直接用整数表示状态
 * 2. 位操作比集合操作快得多（CPU 级别优化）
 * 3. 只遍历可用位置，不需要遍历全部 n 列
 *
 * 性能对比（n=14）：
 * - 遍历法：几十秒
 * - 集合法：几秒
 * - 位运算：毫秒级
 *
 * 为什么不需要显式回溯？
 * - 状态（cols, diag1, diag2）作为参数传递
 * - 每次递归调用创建新的状态值
 * - 函数返回时自动恢复到调用前的状态
 * - 这是"值传递"的天然优势
 */`,
        explanation: `## 位运算优化

### 核心思想
用整数的二进制位表示占用情况：
- cols：已占用的列
- diag1：主对角线（每行左移一位）
- diag2：副对角线（每行右移一位）

### 位运算技巧
- \`x & -x\`：获取最低位的 1
- \`x & (x-1)\`：清除最低位的 1

### 优点
- 极致的性能优化
- 常数时间判断冲突`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "N皇后II位运算计数演示",
          steps: [
            {
              array: ["1111"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "gray" as const, label: "available" }],
              description: "n=4。只计数不记录解。初始available=1111，count=0",
            },
            {
              array: ["0001"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "lowbit" }],
              description: "row0：position=lowbit(1111)=0001。选col=0，递归下一行",
            },
            {
              array: ["1100"],
              left: 1,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "available" }],
              description: "row1：cols=0001,diag1=0010,diag2=0000。available=1100",
            },
            {
              array: ["count++"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "找到解" }],
              description: "继续递归...row=n时count++。找到第一个解！count=1",
            },
            {
              array: ["count++"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "找到解" }],
              description: "继续搜索...找到第二个解！count=2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "最终" }],
              description: "搜索完成。返回count=2。位运算：毫秒级完成！",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },
];
