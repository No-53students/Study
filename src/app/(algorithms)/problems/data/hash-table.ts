import { Problem } from "../types";

// 哈希表分类题目
export const hashTableProblems: Problem[] = [
  // 1. 两数之和 (1)
  {
    id: "two-sum",
    leetcodeId: 1,
    title: "两数之和",
    titleEn: "Two Sum",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数组"],
    description: `给定一个整数数组 \`nums\` 和一个整数目标值 \`target\`，请你在该数组中找出 **和为目标值** \`target\` 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,2,4], target = 6
输出：[1,2]
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [3,3], target = 6
输出：[0,1]
\`\`\``,
    constraints: `- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **只会存在一个有效答案**

**进阶：** 你可以想出一个时间复杂度小于 O(n²) 的算法吗？`,
    initialCode: `function twoSum(nums, target) {
  // 在此处编写你的代码

}`,
    solution: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // 题目保证有解，不会执行到这里
}`,
    // 多种解法
    solutions: [
      {
        name: "暴力法",
        code: `function twoSum(nums, target) {
  // 暴力枚举：尝试所有可能的两数组合
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
        explanation: `## 暴力枚举法

### 思路
最直接的方法是枚举所有可能的两数组合，检查它们的和是否等于目标值。

### 实现步骤
1. 使用两层循环遍历所有可能的数对
2. 外层循环 i 从 0 到 n-1
3. 内层循环 j 从 i+1 到 n-1（避免重复和使用相同元素）
4. 如果 nums[i] + nums[j] === target，返回 [i, j]

### 优点
- 实现简单，容易理解
- 不需要额外空间

### 缺点
- 时间复杂度较高，对于大数组效率低`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表（推荐）",
        code: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
        explanation: `## 哈希表法（推荐）

### 思路
利用哈希表存储已遍历过的元素及其索引，将查找补数的时间从 O(n) 降低到 O(1)。

### 实现步骤
1. 创建一个哈希表 Map，存储 "数值 -> 索引" 的映射
2. 遍历数组，对于每个元素 nums[i]：
   - 计算补数 complement = target - nums[i]
   - 检查补数是否在哈希表中
   - 如果在，说明找到了答案，返回 [map.get(complement), i]
   - 如果不在，将当前元素和索引存入哈希表

### 为什么边遍历边添加？
避免使用相同元素两次。如果先把所有数加入哈希表再查找：
- 对于 [3, 3], target = 6
- 会错误返回 [0, 0]（使用了同一个元素两次）

边遍历边添加可以确保找到的补数一定是之前遍历过的元素。

### 优点
- 时间复杂度 O(n)，只需遍历一次
- 代码简洁高效`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "两遍哈希表",
        code: `function twoSum(nums, target) {
  const map = new Map();

  // 第一遍：将所有元素及其索引存入哈希表
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  // 第二遍：查找每个元素的补数
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // 确保补数存在且不是当前元素本身
    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }

  return [];
}`,
        explanation: `## 两遍哈希表法

### 思路
分两步进行：先将所有元素存入哈希表，再遍历查找补数。

### 实现步骤
1. **第一遍遍历**：将所有元素及其索引存入哈希表
2. **第二遍遍历**：对于每个元素，查找其补数是否在哈希表中

### 注意事项
需要检查 \`map.get(complement) !== i\`，确保补数不是当前元素本身。

### 与一遍哈希表的区别
- 两遍哈希表需要遍历两次数组
- 但逻辑更清晰，易于理解
- 时间复杂度同样是 O(n)

### 重复元素处理
对于 [3, 3], target = 6：
- 第一遍后，map = {3 -> 1}（后面的索引覆盖前面的）
- 第二遍时，i=0, complement=3, map.get(3)=1 !== 0
- 正确返回 [0, 1]`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { id: "2", name: "示例2", input: [[3, 2, 4], 6], expected: [1, 2] },
      { id: "3", name: "相同元素", input: [[3, 3], 6], expected: [0, 1] },
      { id: "4", name: "负数", input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
    ],
    hints: [
      "暴力解法需要 O(n²) 时间，可以用哈希表优化",
      "遍历数组，对于每个数，检查 target - nums[i] 是否在哈希表中",
      "边遍历边添加到哈希表",
    ],
    explanation: `## 解题思路

### 哈希表法

1. 创建一个哈希表，存储数值到索引的映射
2. 遍历数组，对于每个数 nums[i]：
   - 计算需要的补数 complement = target - nums[i]
   - 检查补数是否在哈希表中
   - 如果在，返回两个索引
   - 如果不在，将当前数和索引加入哈希表

### 为什么边遍历边添加？
- 如果先把所有数加入哈希表，再遍历查找，会有问题
- 比如 [3,3], target=6，会返回 [0,0]
- 边遍历边添加可以确保找到的补数不是自己

### 复杂度分析
- 时间复杂度：O(n)，只遍历一次数组
- 空间复杂度：O(n)，哈希表存储 n 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["two-sum-ii", "three-sum"],
  },

  // 2. 字母异位词分组 (49)
  {
    id: "group-anagrams",
    leetcodeId: 49,
    title: "字母异位词分组",
    titleEn: "Group Anagrams",
    difficulty: "medium",
    category: "hash-table",
    tags: ["哈希表", "字符串", "排序"],
    description: `给你一个字符串数组，请你将 **字母异位词** 组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由重新排列源单词的所有字母得到的一个新单词。`,
    examples: `**示例 1：**
\`\`\`
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

**示例 2：**
\`\`\`
输入: strs = [""]
输出: [[""]]
\`\`\`

**示例 3：**
\`\`\`
输入: strs = ["a"]
输出: [["a"]]
\`\`\``,
    constraints: `- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` 仅包含小写字母`,
    initialCode: `function groupAnagrams(strs) {
  // 在此处编写你的代码

}`,
    solution: `function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 将字符串排序作为 key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}`,
    solutions: [
      {
        name: "排序作为Key",
        code: `function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 将字符串排序作为 key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}`,
        explanation: `## 排序作为Key

### 思路
字母异位词排序后的结果相同，可以将排序后的字符串作为哈希表的key。

### 实现步骤
1. 遍历所有字符串
2. 对每个字符串的字符进行排序，得到key
3. 将原字符串加入对应key的数组中
4. 返回所有数组

### 优点
- 思路直观，容易理解
- 实现简单`,
        timeComplexity: "O(n × k log k)",
        spaceComplexity: "O(n × k)",
      },
      {
        name: "字符计数（推荐）",
        code: `function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 统计每个字符出现的次数
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - 97]++;
    }
    // 用计数数组生成key，如 "1#2#0#..."
    const key = count.join('#');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}`,
        explanation: `## 字符计数法（推荐）

### 思路
统计每个字符串中各字符的数量，用计数结果作为key。

### 实现步骤
1. 对每个字符串，统计26个字母各出现多少次
2. 将计数数组转换为字符串作为key（如 "1#0#2#..."）
3. 相同key的字符串是异位词

### 为什么更优？
- 避免了排序操作，时间复杂度从 O(k log k) 降为 O(k)
- 特别是当字符串较长时，优势更明显

### 注意事项
- 使用 '#' 分隔计数，避免 "1" + "11" = "11" + "1" 的问题`,
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(n × k)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
      { id: "2", name: "空字符串", input: [[""]], expected: [[""]] },
      { id: "3", name: "单字符", input: [["a"]], expected: [["a"]] },
    ],
    hints: [
      "字母异位词排序后的结果相同",
      "使用排序后的字符串作为哈希表的 key",
      "也可以用字符计数作为 key",
    ],
    explanation: `## 解题思路

### 方法一：排序作为 key

字母异位词的特点是：排序后的字符串相同。

1. 遍历所有字符串
2. 对每个字符串排序，得到 key
3. 将原字符串加入对应 key 的数组中
4. 返回所有数组

### 方法二：字符计数作为 key

1. 统计每个字符串中各字符的数量
2. 用类似 "a1b2c3" 的格式作为 key
3. 相同 key 的字符串是异位词

### 复杂度分析（方法一）
- 时间复杂度：O(n × k log k)，n 是字符串数量，k 是最长字符串长度
- 空间复杂度：O(n × k)，存储所有字符串`,
    timeComplexity: "O(n × k log k)",
    spaceComplexity: "O(n × k)",
    relatedProblems: ["valid-anagram", "two-sum"],
  },

  // 3. 有效的字母异位词 (242)
  {
    id: "valid-anagram",
    leetcodeId: 242,
    title: "有效的字母异位词",
    titleEn: "Valid Anagram",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串", "排序"],
    description: `给定两个字符串 \`s\` 和 \`t\`，编写一个函数来判断 \`t\` 是否是 \`s\` 的字母异位词。

**注意：** 若 \`s\` 和 \`t\` 中每个字符出现的次数都相同，则称 \`s\` 和 \`t\` 互为字母异位词。`,
    examples: `**示例 1：**
\`\`\`
输入: s = "anagram", t = "nagaram"
输出: true
\`\`\`

**示例 2：**
\`\`\`
输入: s = "rat", t = "car"
输出: false
\`\`\``,
    constraints: `- \`1 <= s.length, t.length <= 5 * 10^4\`
- \`s\` 和 \`t\` 仅包含小写字母

**进阶：** 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？`,
    initialCode: `function isAnagram(s, t) {
  // 在此处编写你的代码

}`,
    solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}`,
    solutions: [
      {
        name: "排序比较",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  return s.split('').sort().join('') === t.split('').sort().join('');
}`,
        explanation: `## 排序比较法

### 思路
字母异位词排序后的结果相同。

### 实现
1. 如果长度不同，返回 false
2. 将两个字符串排序
3. 比较排序后的字符串是否相等

### 优缺点
- 优点：实现简单，一行代码
- 缺点：排序时间复杂度较高`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "字符计数（推荐）",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}`,
        explanation: `## 字符计数法（推荐）

### 思路
统计两个字符串中各字符的出现次数，如果完全相同则是异位词。

### 实现
1. 使用长度26的数组统计字符出现次数
2. 遍历时，s中的字符+1，t中的字符-1
3. 最后检查数组是否全为0

### 优化点
- 只遍历一次两个字符串
- 使用数组比Map更快`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表（Unicode支持）",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const map = new Map();

  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const char of t) {
    if (!map.has(char) || map.get(char) === 0) {
      return false;
    }
    map.set(char, map.get(char) - 1);
  }

  return true;
}`,
        explanation: `## 哈希表法（支持Unicode）

### 思路
使用Map统计字符频率，支持任意Unicode字符。

### 实现
1. 遍历s，统计每个字符的出现次数
2. 遍历t，减少对应字符的计数
3. 如果字符不存在或计数为0，返回false

### 适用场景
- 当输入包含Unicode字符时
- 字符集不确定时`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: ["anagram", "nagaram"], expected: true },
      { id: "2", name: "示例2", input: ["rat", "car"], expected: false },
      { id: "3", name: "相同字符串", input: ["abc", "abc"], expected: true },
      { id: "4", name: "长度不同", input: ["ab", "abc"], expected: false },
    ],
    hints: [
      "如果两个字符串长度不同，肯定不是异位词",
      "可以用数组统计每个字符出现的次数",
      "s 中的字符加一，t 中的字符减一，最后检查是否全为0",
    ],
    explanation: `## 解题思路

### 方法一：字符计数

1. 如果长度不同，直接返回 false
2. 使用长度为 26 的数组统计字符出现次数
3. 遍历两个字符串，s 中的字符 +1，t 中的字符 -1
4. 最后检查数组是否全为 0

### 方法二：排序

1. 将两个字符串排序
2. 比较排序后的字符串是否相等

### 进阶：Unicode 字符

如果包含 Unicode 字符，可以使用哈希表代替数组：
- 使用 Map 统计字符频率
- 遍历 s 增加计数，遍历 t 减少计数
- 检查所有计数是否为 0

### 复杂度分析
- 时间复杂度：O(n)，n 是字符串长度
- 空间复杂度：O(1)，只使用固定大小的数组（26）`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["group-anagrams"],
  },

  // 4. 快乐数 (202)
  {
    id: "happy-number",
    leetcodeId: 202,
    title: "快乐数",
    titleEn: "Happy Number",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数学", "双指针"],
    description: `编写一个算法来判断一个数 \`n\` 是不是快乐数。

**「快乐数」** 定义为：
- 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
- 然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。
- 如果这个过程 **结果为** 1，那么这个数就是快乐数。

如果 \`n\` 是 *快乐数* 就返回 \`true\`；不是，则返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 19
输出：true
解释：
1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
1² + 0² + 0² = 1
\`\`\`

**示例 2：**
\`\`\`
输入：n = 2
输出：false
\`\`\``,
    constraints: `- \`1 <= n <= 2^31 - 1\``,
    initialCode: `function isHappy(n) {
  // 在此处编写你的代码

}`,
    solution: `function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }

  return n === 1;
}

function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
    solutions: [
      {
        name: "哈希表检测循环",
        code: `function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }

  return n === 1;
}

function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
        explanation: `## 哈希表检测循环

### 思路
如果不是快乐数，会进入无限循环。使用哈希表记录已出现的数来检测循环。

### 实现
1. 使用Set记录出现过的数
2. 重复计算各位数字的平方和
3. 如果结果为1，返回true
4. 如果结果已在Set中，说明进入循环，返回false`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "快慢指针（推荐）",
        code: `function isHappy(n) {
  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1;
}

function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
        explanation: `## 快慢指针法（推荐）

### 思路
类似于检测链表循环，使用快慢指针。

### 实现
1. 慢指针每次计算一次平方和
2. 快指针每次计算两次平方和
3. 如果是快乐数，快指针会先到达1
4. 如果不是，快慢指针会在循环中相遇

### 优点
- 空间复杂度O(1)，不需要额外存储`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "数学规律",
        code: `function isHappy(n) {
  // 已知的循环数集合（不快乐的数最终会进入这个循环）
  const cycle = new Set([4, 16, 37, 58, 89, 145, 42, 20]);

  while (n !== 1 && !cycle.has(n)) {
    n = getNext(n);
  }

  return n === 1;
}

function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
        explanation: `## 数学规律法

### 思路
数学证明：不快乐的数最终都会进入一个固定的循环：4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4

### 实现
1. 预先知道循环中的数
2. 如果遇到循环中的数，返回false
3. 如果到达1，返回true

### 优点
- 利用数学规律，直接判断`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [19], expected: true },
      { id: "2", name: "示例2", input: [2], expected: false },
      { id: "3", name: "1", input: [1], expected: true },
      { id: "4", name: "7", input: [7], expected: true },
    ],
    hints: [
      "如果不是快乐数，会进入无限循环",
      "使用哈希表记录已经出现过的数，检测循环",
      "也可以使用快慢指针检测循环",
    ],
    explanation: `## 解题思路

### 方法一：哈希表检测循环

1. 使用 Set 记录出现过的数
2. 重复计算各位数字的平方和
3. 如果结果为 1，返回 true
4. 如果结果已在 Set 中，说明进入循环，返回 false

### 方法二：快慢指针

类似于检测链表循环：
1. 慢指针每次计算一次平方和
2. 快指针每次计算两次平方和
3. 如果最终相遇且值为 1，是快乐数
4. 如果相遇但值不为 1，不是快乐数

### 复杂度分析
- 时间复杂度：O(log n)，数字的位数决定了迭代次数
- 空间复杂度：O(log n)，哈希表存储的数的个数`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["two-sum", "contains-duplicate"],
  },

  // 5. 存在重复元素 (217)
  {
    id: "contains-duplicate",
    leetcodeId: 217,
    title: "存在重复元素",
    titleEn: "Contains Duplicate",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数组", "排序"],
    description: `给你一个整数数组 \`nums\`。如果任一值在数组中出现 **至少两次**，返回 \`true\`；如果数组中每个元素互不相同，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3,1]
输出：true
解释：元素 1 在下标 0 和 3 出现了两次。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,2,3,4]
输出：false
解释：所有元素都不同。
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    initialCode: `function containsDuplicate(nums) {
  // 在此处编写你的代码

}`,
    solution: `function containsDuplicate(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }

  return false;
}`,
    solutions: [
      {
        name: "暴力法",
        code: `function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
}`,
        explanation: `## 暴力枚举法

### 思路
检查每一对元素是否相等。

### 实现
使用两层循环比较所有可能的元素对。

### 缺点
时间复杂度太高，大数据量会超时。`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
      {
        name: "排序法",
        code: `function containsDuplicate(nums) {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return true;
    }
  }
  return false;
}`,
        explanation: `## 排序法

### 思路
排序后，相同元素会相邻，只需检查相邻元素。

### 实现
1. 排序数组
2. 遍历检查相邻元素是否相等

### 注意
会修改原数组`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "哈希表（推荐）",
        code: `function containsDuplicate(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }

  return false;
}`,
        explanation: `## 哈希表法（推荐）

### 思路
使用Set存储已遍历的元素，O(1)时间检查重复。

### 实现
1. 遍历数组
2. 如果当前元素在Set中，返回true
3. 否则将元素加入Set

### 一行解法
\`return new Set(nums).size !== nums.length;\``,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 1]], expected: true },
      { id: "2", name: "示例2", input: [[1, 2, 3, 4]], expected: false },
      { id: "3", name: "多重复", input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
      { id: "4", name: "单元素", input: [[1]], expected: false },
    ],
    hints: [
      "使用 Set 存储已遍历的元素",
      "如果当前元素已在 Set 中，说明有重复",
      "也可以比较 Set 的大小和数组长度",
    ],
    explanation: `## 解题思路

### 方法一：哈希表（Set）

1. 遍历数组
2. 如果当前元素在 Set 中，返回 true
3. 否则将元素加入 Set
4. 遍历结束返回 false

### 方法二：一行解法

\`\`\`javascript
return new Set(nums).size !== nums.length;
\`\`\`

### 方法三：排序

1. 排序数组
2. 检查相邻元素是否相同

### 复杂度分析
- 时间复杂度：O(n)，遍历一次数组
- 空间复杂度：O(n)，Set 最多存储 n 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["happy-number", "contains-duplicate-ii"],
  },

  // 6. 存在重复元素 II (219)
  {
    id: "contains-duplicate-ii",
    leetcodeId: 219,
    title: "存在重复元素 II",
    titleEn: "Contains Duplicate II",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数组", "滑动窗口"],
    description: `给你一个整数数组 \`nums\` 和一个整数 \`k\`，判断数组中是否存在两个 **不同的索引** \`i\` 和 \`j\`，满足 \`nums[i] == nums[j]\` 且 \`abs(i - j) <= k\`。如果存在，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3,1], k = 3
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,0,1,1], k = 1
输出：true
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1,2,3,1,2,3], k = 2
输出：false
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`0 <= k <= 10^5\``,
    initialCode: `function containsNearbyDuplicate(nums, k) {
  // 在此处编写你的代码

}`,
    solution: `function containsNearbyDuplicate(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }

  return false;
}`,
    solutions: [
      {
        name: "哈希表记录位置",
        code: `function containsNearbyDuplicate(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }

  return false;
}`,
        explanation: `## 哈希表记录位置

### 思路
使用Map记录每个数最后出现的索引，判断距离是否满足条件。

### 实现
1. 遍历数组，对于每个数
2. 如果已在Map中，检查当前索引与记录索引的差是否 <= k
3. 更新Map中该数的索引为当前索引

### 为什么记录最后出现的位置？
如果一个数出现多次，只需检查最近的两次出现。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, k))",
      },
      {
        name: "滑动窗口（推荐）",
        code: `function containsNearbyDuplicate(nums, k) {
  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    // 维护窗口大小为 k
    if (i > k) {
      set.delete(nums[i - k - 1]);
    }
    // 检查当前元素是否在窗口中
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
  }

  return false;
}`,
        explanation: `## 滑动窗口法（推荐）

### 思路
维护一个大小为k的滑动窗口，检查当前元素是否在窗口中。

### 实现
1. 使用Set维护窗口中的元素
2. 如果窗口大小超过k，删除最左边的元素
3. 检查当前元素是否在Set中

### 优点
- 空间复杂度严格为 O(min(n, k))
- 思路更清晰`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, k))",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 1], 3], expected: true },
      { id: "2", name: "示例2", input: [[1, 0, 1, 1], 1], expected: true },
      { id: "3", name: "示例3", input: [[1, 2, 3, 1, 2, 3], 2], expected: false },
      { id: "4", name: "k=0", input: [[1, 2, 1], 0], expected: false },
    ],
    hints: [
      "使用哈希表记录每个数最后出现的位置",
      "如果当前数已在哈希表中，检查距离是否 <= k",
      "更新哈希表中的位置为当前位置",
    ],
    explanation: `## 解题思路

### 哈希表记录位置

1. 使用 Map 记录每个数最后出现的索引
2. 遍历数组，对于每个数：
   - 如果已在 Map 中，检查当前索引与记录索引的差是否 <= k
   - 如果满足条件，返回 true
   - 更新 Map 中该数的索引为当前索引
3. 遍历结束返回 false

### 为什么记录最后出现的位置？

如果一个数出现多次，我们只需要检查最近的两次出现。
因为如果最近两次的距离都 > k，更早的出现距离只会更大。

### 复杂度分析
- 时间复杂度：O(n)，遍历一次数组
- 空间复杂度：O(min(n, k))，Map 最多存储 min(n, k+1) 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, k))",
    relatedProblems: ["contains-duplicate", "longest-consecutive-sequence"],
  },

  // 7. 最长连续序列 (128)
  {
    id: "longest-consecutive-sequence",
    leetcodeId: 128,
    title: "最长连续序列",
    titleEn: "Longest Consecutive Sequence",
    difficulty: "medium",
    category: "hash-table",
    tags: ["哈希表", "数组", "并查集"],
    description: `给定一个未排序的整数数组 \`nums\`，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 \`O(n)\` 的算法解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
\`\`\``,
    constraints: `- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    initialCode: `function longestConsecutive(nums) {
  // 在此处编写你的代码

}`,
    solution: `function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // 只从序列的起点开始计数
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}`,
    solutions: [
      {
        name: "排序法",
        code: `function longestConsecutive(nums) {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);

  let maxLength = 1;
  let currentLength = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      continue; // 跳过重复元素
    }
    if (nums[i] === nums[i - 1] + 1) {
      currentLength++;
    } else {
      maxLength = Math.max(maxLength, currentLength);
      currentLength = 1;
    }
  }

  return Math.max(maxLength, currentLength);
}`,
        explanation: `## 排序法

### 思路
排序后，连续的数字会相邻。

### 实现
1. 排序数组
2. 遍历，跳过重复元素
3. 如果当前数等于前一个数+1，长度加1
4. 否则重新开始计数

### 注意
- 需要处理重复元素
- 时间复杂度不满足O(n)要求`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "哈希表+序列起点（推荐）",
        code: `function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // 只从序列的起点开始计数
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}`,
        explanation: `## 哈希表+序列起点（推荐）

### 思路
使用Set存储所有数字，只从序列起点开始计数。

### 实现
1. 将所有数字加入Set
2. 遍历Set中的每个数
3. 只有当num-1不在Set中时，num才是起点
4. 从起点开始，不断检查num+1是否在Set中

### 为什么只从起点开始？
避免重复计算，保证每个数只被访问一次。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "并查集",
        code: `function longestConsecutive(nums) {
  if (nums.length === 0) return 0;

  const parent = new Map();
  const size = new Map();

  const find = (x) => {
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)));
    }
    return parent.get(x);
  };

  const union = (x, y) => {
    const px = find(x);
    const py = find(y);
    if (px !== py) {
      parent.set(px, py);
      size.set(py, size.get(py) + size.get(px));
    }
  };

  // 初始化
  for (const num of nums) {
    if (!parent.has(num)) {
      parent.set(num, num);
      size.set(num, 1);
    }
  }

  // 合并相邻的数
  for (const num of nums) {
    if (parent.has(num + 1)) {
      union(num, num + 1);
    }
  }

  let maxLength = 0;
  for (const s of size.values()) {
    maxLength = Math.max(maxLength, s);
  }

  return maxLength;
}`,
        explanation: `## 并查集法

### 思路
将相邻的数合并到同一个集合中。

### 实现
1. 初始化每个数的父节点为自己
2. 遍历数组，如果num+1存在，合并num和num+1
3. 返回最大集合的大小

### 适用场景
- 需要动态维护连续序列时
- 可以扩展处理更复杂的问题`,
        timeComplexity: "O(n × α(n))",
        spaceComplexity: "O(n)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { id: "2", name: "示例2", input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { id: "3", name: "空数组", input: [[]], expected: 0 },
      { id: "4", name: "单元素", input: [[1]], expected: 1 },
    ],
    hints: [
      "使用 Set 存储所有数字，O(1) 查找",
      "只从序列的起点开始计数，避免重复",
      "如果 num-1 不在 Set 中，说明 num 是序列起点",
    ],
    explanation: `## 解题思路

### 哈希表 + 序列起点

1. 将所有数字加入 Set
2. 遍历 Set 中的每个数：
   - 只有当 num-1 不在 Set 中时，num 才是一个序列的起点
   - 从起点开始，不断检查 num+1 是否在 Set 中
   - 统计序列长度
3. 返回最长序列长度

### 为什么只从起点开始？

假设序列是 [1,2,3,4]：
- 如果从 2 开始计数，会得到长度 3
- 但从 1 开始计数，会得到长度 4
- 如果每个数都作为起点，会有重复计算
- 只从起点开始，保证每个数只被访问一次

### 复杂度分析
- 时间复杂度：O(n)，每个数最多被访问两次
- 空间复杂度：O(n)，Set 存储所有数字`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["contains-duplicate-ii", "ransom-note"],
  },

  // 8. 赎金信 (383)
  {
    id: "ransom-note",
    leetcodeId: 383,
    title: "赎金信",
    titleEn: "Ransom Note",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串", "计数"],
    description: `给你两个字符串：\`ransomNote\` 和 \`magazine\`，判断 \`ransomNote\` 能不能由 \`magazine\` 里面的字符构成。

如果可以，返回 \`true\`；否则返回 \`false\`。

\`magazine\` 中的每个字符只能在 \`ransomNote\` 中使用一次。`,
    examples: `**示例 1：**
\`\`\`
输入：ransomNote = "a", magazine = "b"
输出：false
\`\`\`

**示例 2：**
\`\`\`
输入：ransomNote = "aa", magazine = "ab"
输出：false
\`\`\`

**示例 3：**
\`\`\`
输入：ransomNote = "aa", magazine = "aab"
输出：true
\`\`\``,
    constraints: `- \`1 <= ransomNote.length, magazine.length <= 10^5\`
- \`ransomNote\` 和 \`magazine\` 由小写英文字母组成`,
    initialCode: `function canConstruct(ransomNote, magazine) {
  // 在此处编写你的代码

}`,
    solution: `function canConstruct(ransomNote, magazine) {
  const count = new Array(26).fill(0);

  // 统计 magazine 中每个字符的数量
  for (const char of magazine) {
    count[char.charCodeAt(0) - 97]++;
  }

  // 检查 ransomNote 中的字符是否足够
  for (const char of ransomNote) {
    const index = char.charCodeAt(0) - 97;
    if (count[index] === 0) {
      return false;
    }
    count[index]--;
  }

  return true;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["a", "b"], expected: false },
      { id: "2", name: "示例2", input: ["aa", "ab"], expected: false },
      { id: "3", name: "示例3", input: ["aa", "aab"], expected: true },
      { id: "4", name: "相同字符串", input: ["abc", "abc"], expected: true },
    ],
    hints: [
      "统计 magazine 中每个字符的数量",
      "遍历 ransomNote，检查每个字符是否足够",
      "可以使用数组或 Map 来统计",
    ],
    explanation: `## 解题思路

### 字符计数

1. 使用长度为 26 的数组统计 magazine 中每个字符的数量
2. 遍历 ransomNote：
   - 如果当前字符的计数为 0，返回 false
   - 否则将计数减 1
3. 遍历结束返回 true

### 为什么这样做是正确的？

- magazine 的字符只能用一次，所以用完就减 1
- 如果某个字符用完了（计数为 0），就无法构成 ransomNote

### 复杂度分析
- 时间复杂度：O(m + n)，m 和 n 分别是两个字符串的长度
- 空间复杂度：O(1)，只使用固定大小的数组（26）`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["longest-consecutive-sequence", "word-pattern"],
  },

  // 9. 单词规律 (290)
  {
    id: "word-pattern",
    leetcodeId: 290,
    title: "单词规律",
    titleEn: "Word Pattern",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串"],
    description: `给定一种规律 \`pattern\` 和一个字符串 \`s\`，判断 \`s\` 是否遵循相同的规律。

这里的 **遵循** 指完全匹配，例如，\`pattern\` 里的每个字母和字符串 \`s\` 中的每个非空单词之间存在着双向连接的对应规律。`,
    examples: `**示例 1：**
\`\`\`
输入：pattern = "abba", s = "dog cat cat dog"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：pattern = "abba", s = "dog cat cat fish"
输出：false
\`\`\`

**示例 3：**
\`\`\`
输入：pattern = "aaaa", s = "dog cat cat dog"
输出：false
\`\`\``,
    constraints: `- \`1 <= pattern.length <= 300\`
- \`pattern\` 只包含小写英文字母
- \`1 <= s.length <= 3000\`
- \`s\` 只包含小写英文字母和 \`' '\`
- \`s\` **不包含** 任何前导或尾随对空格
- \`s\` 中每个单词都被 **单个空格** 分隔`,
    initialCode: `function wordPattern(pattern, s) {
  // 在此处编写你的代码

}`,
    solution: `function wordPattern(pattern, s) {
  const words = s.split(' ');

  if (pattern.length !== words.length) {
    return false;
  }

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    // 检查双向映射
    if (charToWord.has(char) && charToWord.get(char) !== word) {
      return false;
    }
    if (wordToChar.has(word) && wordToChar.get(word) !== char) {
      return false;
    }

    charToWord.set(char, word);
    wordToChar.set(word, char);
  }

  return true;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["abba", "dog cat cat dog"], expected: true },
      { id: "2", name: "示例2", input: ["abba", "dog cat cat fish"], expected: false },
      { id: "3", name: "示例3", input: ["aaaa", "dog cat cat dog"], expected: false },
      { id: "4", name: "长度不同", input: ["abc", "dog cat"], expected: false },
    ],
    hints: [
      "需要建立双向映射：字符到单词，单词到字符",
      "先检查 pattern 和单词数量是否相同",
      "遍历时检查映射是否一致",
    ],
    explanation: `## 解题思路

### 双向哈希表

1. 将字符串按空格分割成单词数组
2. 检查 pattern 长度和单词数量是否相同
3. 使用两个 Map 建立双向映射：
   - charToWord: 字符 -> 单词
   - wordToChar: 单词 -> 字符
4. 遍历 pattern 和单词：
   - 如果字符已有映射且不等于当前单词，返回 false
   - 如果单词已有映射且不等于当前字符，返回 false
   - 建立双向映射

### 为什么需要双向映射？

- 示例 3 中，pattern = "aaaa"，s = "dog cat cat dog"
- 如果只检查 charToWord，'a' 先映射到 "dog"，然后 "cat" 不等于 "dog"，可以检测
- 但考虑 pattern = "abba", s = "dog dog dog dog"
- 只检查 charToWord：'a'->"dog", 'b'->"dog"，都合法
- 但这违反了双向对应，所以需要 wordToChar

### 复杂度分析
- 时间复杂度：O(n + m)，n 是 pattern 长度，m 是 s 长度
- 空间复杂度：O(n)，两个 Map 存储映射`,
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(n)",
    relatedProblems: ["ransom-note", "isomorphic-strings"],
  },
];
