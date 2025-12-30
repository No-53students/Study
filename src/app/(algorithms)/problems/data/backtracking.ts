import { Problem } from "../types";

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
        code: `function permute(nums) {
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
        code: `function permute(nums) {
  const result = [];

  const backtrack = (start) => {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      // 交换
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      // 回溯：换回来
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  };

  backtrack(0);
  return result;
}`,
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
        timeComplexity: "O(n × n!)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代法（插入）",
        code: `function permute(nums) {
  let result = [[]];

  for (const num of nums) {
    const newResult = [];
    for (const perm of result) {
      // 在每个位置插入当前数字
      for (let i = 0; i <= perm.length; i++) {
        const newPerm = [...perm.slice(0, i), num, ...perm.slice(i)];
        newResult.push(newPerm);
      }
    }
    result = newResult;
  }

  return result;
}`,
        explanation: `## 迭代法（插入）

### 思路
1. 从空排列开始
2. 每次取一个新数字，插入到现有每个排列的每个位置
3. 例如：[] -> [1] -> [2,1], [1,2] -> [3,2,1], [2,3,1], [2,1,3], ...

### 优点
- 非递归实现，避免栈溢出
- 思路直观：逐步构建排列`,
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
        code: `function subsets(nums) {
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
        code: `function subsets(nums) {
  const n = nums.length;
  const result = [];

  // 共有 2^n 个子集
  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      // 检查第 i 位是否为 1
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }
    result.push(subset);
  }

  return result;
}`,
        explanation: `## 位运算枚举

### 思路
1. n 个元素共有 2^n 个子集
2. 用一个 n 位二进制数表示选择情况
3. 第 i 位为 1 表示选择 nums[i]
4. 遍历 0 到 2^n-1 的所有数，生成对应子集

### 优点
- 思路简洁，代码紧凑
- 适合元素个数较少的情况`,
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代法（逐步添加）",
        code: `function subsets(nums) {
  const result = [[]];

  for (const num of nums) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      // 复制现有子集，添加新元素
      result.push([...result[i], num]);
    }
  }

  return result;
}`,
        explanation: `## 迭代法（逐步添加）

### 思路
1. 从空集开始
2. 每次遍历一个新元素
3. 将新元素添加到现有所有子集的副本中
4. 例如：[[]] -> [[], [1]] -> [[], [1], [2], [1,2]] -> ...

### 优点
- 非递归实现
- 思路直观：每个元素选或不选`,
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
        code: `function letterCombinations(digits) {
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
        code: `function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  let result = [''];

  for (const digit of digits) {
    const letters = phone[digit];
    const newResult = [];
    for (const combo of result) {
      for (const letter of letters) {
        newResult.push(combo + letter);
      }
    }
    result = newResult;
  }

  return result;
}`,
        explanation: `## BFS 迭代

### 思路
1. 从空字符串开始
2. 每处理一个数字，将其所有字母追加到现有组合后面
3. 逐层构建，类似 BFS

### 优点
- 非递归实现
- 思路清晰，逐步扩展`,
        timeComplexity: "O(3^m × 4^n)",
        spaceComplexity: "O(3^m × 4^n)",
      },
      {
        name: "队列迭代",
        code: `function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const queue = [''];

  for (let i = 0; i < digits.length; i++) {
    const letters = phone[digits[i]];
    const size = queue.length;

    for (let j = 0; j < size; j++) {
      const curr = queue.shift();
      for (const letter of letters) {
        queue.push(curr + letter);
      }
    }
  }

  return queue;
}`,
        explanation: `## 队列迭代

### 思路
1. 使用队列保存中间结果
2. 每次取出队首元素，追加当前数字的所有字母
3. 将新组合加入队尾

### 特点
- 标准的 BFS 实现
- 使用队列作为数据结构`,
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
        code: `function combinationSum(candidates, target) {
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
        code: `function combinationSum(candidates, target) {
  const result = [];
  // 排序便于剪枝
  candidates.sort((a, b) => a - b);

  const backtrack = (start, path, remaining) => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 剪枝：如果当前元素已经大于剩余值，后面的更大，直接跳过
      if (candidates[i] > remaining) break;

      path.push(candidates[i]);
      backtrack(i, path, remaining - candidates[i]);
      path.pop();
    }
  };

  backtrack(0, [], target);
  return result;
}`,
        explanation: `## 回溯 + 排序剪枝

### 思路
1. 先对候选数组排序
2. 当当前元素大于剩余目标值时，直接 break
3. 因为后面的元素更大，不可能满足条件

### 优点
- 通过排序实现更高效的剪枝
- 减少无效递归`,
        timeComplexity: "O(S)",
        spaceComplexity: "O(target)",
      },
      {
        name: "动态规划（记录路径）",
        code: `function combinationSum(candidates, target) {
  // dp[i] 表示和为 i 的所有组合
  const dp = Array.from({ length: target + 1 }, () => []);
  dp[0] = [[]];

  for (const num of candidates) {
    for (let i = num; i <= target; i++) {
      for (const combo of dp[i - num]) {
        // 只添加有序组合，避免重复
        if (combo.length === 0 || combo[combo.length - 1] <= num) {
          dp[i].push([...combo, num]);
        }
      }
    }
  }

  return dp[target];
}`,
        explanation: `## 动态规划（记录路径）

### 思路
1. dp[i] 存储和为 i 的所有组合
2. 对于每个候选数，更新 dp 数组
3. 通过检查最后元素保证组合有序，避免重复

### 特点
- 完全背包问题的变体
- 适合需要记录所有路径的场景`,
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
        code: `function generateParenthesis(n) {
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
        code: `function generateParenthesis(n) {
  // dp[i] 存储 i 对括号的所有有效组合
  const dp = [['']];

  for (let i = 1; i <= n; i++) {
    dp[i] = [];
    // 枚举第一对括号内部有 j 对括号
    for (let j = 0; j < i; j++) {
      for (const left of dp[j]) {
        for (const right of dp[i - 1 - j]) {
          dp[i].push('(' + left + ')' + right);
        }
      }
    }
  }

  return dp[n];
}`,
        explanation: `## 动态规划

### 思路
1. dp[i] 存储 i 对括号的所有有效组合
2. 对于 n 对括号，可以表示为 (left)right 的形式
3. 其中 left 有 j 对括号，right 有 n-1-j 对括号
4. 枚举所有可能的 j 值

### 递推公式
dp[n] = { "(" + dp[j] + ")" + dp[n-1-j] | 0 ≤ j < n }`,
        timeComplexity: "O(4^n / √n)",
        spaceComplexity: "O(4^n / √n)",
      },
      {
        name: "闭合数法",
        code: `function generateParenthesis(n) {
  if (n === 0) return [''];

  const result = [];

  for (let c = 0; c < n; c++) {
    // 左边放 c 对括号（在第一个括号内）
    // 右边放 n-1-c 对括号（在第一个括号外）
    for (const left of generateParenthesis(c)) {
      for (const right of generateParenthesis(n - 1 - c)) {
        result.push('(' + left + ')' + right);
      }
    }
  }

  return result;
}`,
        explanation: `## 闭合数法（递归）

### 思路
1. 任何有效括号序列都可以写成 (left)right 的形式
2. left 和 right 本身也是有效括号序列
3. 如果总共 n 对，则 left 有 c 对，right 有 n-1-c 对

### 特点
- 递归实现动态规划的思想
- 更容易理解的分治策略`,
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
        code: `function exist(board, word) {
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
        code: `function exist(board, word) {
  const m = board.length;
  const n = board[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || i >= m || j < 0 || j >= n) return false;
    if (visited[i][j] || board[i][j] !== word[k]) return false;

    visited[i][j] = true;

    for (const [di, dj] of dirs) {
      if (dfs(i + di, j + dj, k + 1)) {
        return true;
      }
    }

    visited[i][j] = false;
    return false;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}`,
        explanation: `## DFS + visited 数组

### 思路
1. 使用独立的 visited 数组标记访问状态
2. 不修改原数组
3. 使用方向数组简化代码

### 优点
- 不修改原数组
- 代码结构更清晰`,
        timeComplexity: "O(m × n × 3^L)",
        spaceComplexity: "O(m × n + L)",
      },
      {
        name: "优化：字符频率剪枝",
        code: `function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  // 统计 board 中字符频率
  const boardCount = {};
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      boardCount[board[i][j]] = (boardCount[board[i][j]] || 0) + 1;
    }
  }

  // 检查 word 中每个字符是否都存在
  const wordCount = {};
  for (const c of word) {
    wordCount[c] = (wordCount[c] || 0) + 1;
    if (!boardCount[c] || wordCount[c] > boardCount[c]) {
      return false;
    }
  }

  // 如果 word 末尾字符更少，反转搜索
  if ((boardCount[word[0]] || 0) > (boardCount[word[word.length - 1]] || 0)) {
    word = word.split('').reverse().join('');
  }

  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    const temp = board[i][j];
    board[i][j] = '#';

    const found = dfs(i + 1, j, k + 1) || dfs(i - 1, j, k + 1) ||
                  dfs(i, j + 1, k + 1) || dfs(i, j - 1, k + 1);

    board[i][j] = temp;
    return found;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}`,
        explanation: `## 优化：字符频率剪枝

### 思路
1. 先统计 board 中字符频率
2. 检查 word 中字符是否都存在且数量足够
3. 如果 word 末尾字符出现次数更少，反转搜索
4. 从出现次数少的字符开始可以更快剪枝

### 优点
- 快速排除不可能的情况
- 对大规模测试用例效果显著`,
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
        code: `function partition(s) {
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
        code: `function partition(s) {
  const n = s.length;
  const result = [];

  // DP 预处理：dp[i][j] 表示 s[i..j] 是否是回文
  const dp = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
      }
    }
  }

  const backtrack = (start, path) => {
    if (start === n) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < n; end++) {
      if (dp[start][end]) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };

  backtrack(0, []);
  return result;
}`,
        explanation: `## 回溯 + DP预处理

### 思路
1. 先用动态规划预处理所有子串是否为回文
2. dp[i][j] 表示 s[i..j] 是否是回文
3. 回溯时直接查表，避免重复计算

### 优点
- 判断回文 O(1) 时间
- 适合字符串较长的情况`,
        timeComplexity: "O(n × 2^n)",
        spaceComplexity: "O(n²)",
      },
      {
        name: "记忆化搜索",
        code: `function partition(s) {
  const n = s.length;
  const memo = new Map();

  const isPalindrome = (left, right) => {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  const dfs = (start) => {
    if (start === n) return [[]];
    if (memo.has(start)) return memo.get(start);

    const result = [];
    for (let end = start; end < n; end++) {
      if (isPalindrome(start, end)) {
        const substr = s.slice(start, end + 1);
        const suffixes = dfs(end + 1);
        for (const suffix of suffixes) {
          result.push([substr, ...suffix]);
        }
      }
    }

    memo.set(start, result);
    return result;
  };

  return dfs(0);
}`,
        explanation: `## 记忆化搜索

### 思路
1. 从每个位置开始，返回所有可能的分割方案
2. 使用 memo 缓存每个起始位置的结果
3. 递归组合当前子串和后续所有分割方案

### 特点
- 自顶向下的动态规划
- 避免重复计算相同子问题`,
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
        code: `function solveNQueens(n) {
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
        code: `function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  // 使用集合记录已占用的列和对角线
  const cols = new Set();
  const diag1 = new Set(); // 主对角线：row - col
  const diag2 = new Set(); // 副对角线：row + col

  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;
      }

      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      backtrack(row + 1);

      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };

  backtrack(0);
  return result;
}`,
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
      },
      {
        name: "位运算优化",
        code: `function solveNQueens(n) {
  const result = [];

  const solve = (row, cols, diag1, diag2, board) => {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    // 可用位置：取反后与全1进行与运算
    let availablePositions = ((1 << n) - 1) & ~(cols | diag1 | diag2);

    while (availablePositions) {
      // 取最低位的1
      const position = availablePositions & (-availablePositions);
      availablePositions &= (availablePositions - 1);

      // 计算列号
      const col = Math.log2(position);

      board[row][col] = 'Q';
      solve(
        row + 1,
        cols | position,
        (diag1 | position) << 1,
        (diag2 | position) >> 1,
        board
      );
      board[row][col] = '.';
    }
  };

  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  solve(0, 0, 0, 0, board);
  return result;
}`,
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
      },
    ],
  },
];
