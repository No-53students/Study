import { Problem } from "../types";

// 滑动窗口分类题目
export const slidingWindowProblems: Problem[] = [
  // 1. 长度最小的子数组 (209)
  {
    id: "minimum-size-subarray-sum",
    leetcodeId: 209,
    title: "长度最小的子数组",
    titleEn: "Minimum Size Subarray Sum",
    difficulty: "medium",
    category: "sliding-window",
    tags: ["滑动窗口", "数组", "二分查找"],
    description: `给定一个含有 \`n\` 个正整数的数组和一个正整数 \`target\`。

找出该数组中满足其总和大于等于 \`target\` 的长度最小的 **连续子数组** \`[numsl, numsl+1, ..., numsr-1, numsr]\`，并返回其长度。如果不存在符合条件的子数组，返回 \`0\`。`,
    examples: `**示例 1：**
\`\`\`
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
\`\`\`

**示例 2：**
\`\`\`
输入：target = 4, nums = [1,4,4]
输出：1
\`\`\`

**示例 3：**
\`\`\`
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
\`\`\``,
    constraints: `- \`1 <= target <= 10^9\`
- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`

**进阶：** 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。`,
    initialCode: `function minSubArrayLen(target, nums) {
  // 在此处编写你的代码

}`,
    solution: `function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    // 扩展窗口，加入右边元素
    sum += nums[right];

    // 收缩窗口，直到和小于 target
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
      { id: "2", name: "示例2", input: [4, [1, 4, 4]], expected: 1 },
      { id: "3", name: "无解", input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
      { id: "4", name: "整个数组", input: [15, [1, 2, 3, 4, 5]], expected: 5 },
    ],
    hints: [
      "使用滑动窗口，维护一个和大于等于 target 的窗口",
      "右指针负责扩展窗口，左指针负责收缩窗口",
      "当窗口和 >= target 时，尝试收缩窗口并更新最小长度",
    ],
    explanation: `## 解题思路

### 滑动窗口法

1. 使用两个指针 left 和 right 表示窗口的左右边界
2. right 指针向右移动，扩展窗口，累加和
3. 当窗口和 >= target 时：
   - 更新最小长度
   - left 指针右移，收缩窗口
   - 重复直到窗口和 < target
4. 继续移动 right，重复上述过程

### 为什么这样做是正确的？

- 数组元素都是正整数，所以窗口越大，和越大
- 当和 >= target 时，继续扩大窗口只会得到更长的子数组
- 所以应该尝试收缩窗口，找到最小长度

### 复杂度分析
- 时间复杂度：O(n)，每个元素最多被访问两次（一次被 right 访问，一次被 left 访问）
- 空间复杂度：O(1)，只使用常数额外空间`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["longest-substring-without-repeating"],
    solutions: [
      {
        name: "滑动窗口（推荐）",
        code: `function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
        explanation: `## 滑动窗口

### 思路
1. 右指针扩展窗口，累加和
2. 当和 >= target 时，收缩窗口并更新最小长度
3. 左指针右移，减去离开窗口的元素

### 为什么正确？
数组元素都是正整数，窗口越大和越大。
当和 >= target 时，应该尝试收缩窗口找最小长度。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "前缀和 + 二分查找",
        code: `function minSubArrayLen(target, nums) {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0);

  // 计算前缀和
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1];
  }

  let minLen = Infinity;

  // 对于每个位置，二分查找满足条件的最短子数组
  for (let i = 0; i <= n; i++) {
    const targetSum = prefix[i] + target;

    // 二分查找第一个 >= targetSum 的前缀和位置
    let left = i + 1, right = n;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (prefix[mid] >= targetSum) {
        minLen = Math.min(minLen, mid - i);
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
        explanation: `## 前缀和 + 二分查找

### 思路
1. 计算前缀和数组
2. 对于每个位置 i，需要找最小的 j 使得 prefix[j] - prefix[i] >= target
3. 由于元素都是正数，前缀和递增，可以用二分查找

### 复杂度
时间 O(n log n)，空间 O(n)。
进阶解法，展示了二分查找的应用。`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 2. 无重复字符的最长子串 (3)
  {
    id: "longest-substring-without-repeating",
    leetcodeId: 3,
    title: "无重复字符的最长子串",
    titleEn: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    category: "sliding-window",
    tags: ["滑动窗口", "哈希表", "字符串"],
    description: `给定一个字符串 \`s\`，请你找出其中不含有重复字符的 **最长子串** 的长度。`,
    examples: `**示例 1：**
\`\`\`
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
\`\`\`

**示例 2：**
\`\`\`
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
\`\`\`

**示例 3：**
\`\`\`
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
\`\`\``,
    constraints: `- \`0 <= s.length <= 5 * 10^4\`
- \`s\` 由英文字母、数字、符号和空格组成`,
    initialCode: `function lengthOfLongestSubstring(s) {
  // 在此处编写你的代码

}`,
    solution: `function lengthOfLongestSubstring(s) {
  const charIndex = new Map(); // 记录字符最后出现的位置
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // 如果字符已存在且在窗口内，移动左指针
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }

    // 更新字符位置
    charIndex.set(char, right);

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["abcabcbb"], expected: 3 },
      { id: "2", name: "全相同", input: ["bbbbb"], expected: 1 },
      { id: "3", name: "示例3", input: ["pwwkew"], expected: 3 },
      { id: "4", name: "空字符串", input: [""], expected: 0 },
      { id: "5", name: "单字符", input: ["a"], expected: 1 },
    ],
    hints: [
      "使用滑动窗口，维护一个无重复字符的窗口",
      "使用哈希表记录每个字符最后出现的位置",
      "遇到重复字符时，将左指针移动到重复字符的下一个位置",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 哈希表

1. 使用哈希表记录每个字符最后出现的位置
2. 右指针遍历字符串，扩展窗口
3. 如果当前字符已在窗口中存在（检查其位置是否 >= left）：
   - 将左指针移动到重复字符的下一个位置
4. 更新字符位置和最大长度

### 关键点
- 判断重复时，需要检查字符的位置是否在当前窗口内（>= left）
- 使用哈希表可以O(1)时间查找字符位置

### 复杂度分析
- 时间复杂度：O(n)，只遍历一次字符串
- 空间复杂度：O(min(m, n))，m 是字符集大小，n 是字符串长度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    relatedProblems: ["minimum-size-subarray-sum", "minimum-window-substring"],
    solutions: [
      {
        name: "滑动窗口 + 哈希表（推荐）",
        code: `function lengthOfLongestSubstring(s) {
  const charIndex = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }

    charIndex.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        explanation: `## 滑动窗口 + 哈希表

### 思路
1. 用哈希表记录每个字符最后出现的位置
2. 遇到重复字符时，直接跳转左指针
3. 注意判断重复字符是否在当前窗口内

### 优点
- 左指针可以直接跳转，不需要逐步移动
- 时间复杂度稳定 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
      },
      {
        name: "滑动窗口 + Set",
        code: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }

    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        explanation: `## 滑动窗口 + Set

### 思路
1. 用 Set 记录窗口内的字符
2. 遇到重复字符时，逐步移动左指针直到消除重复
3. 更新最大长度

### 对比哈希表方法
- 思路更直观
- 但左指针需要逐步移动，最坏情况下每个字符访问两次`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
      },
      {
        name: "数组代替哈希表",
        code: `function lengthOfLongestSubstring(s) {
  // 使用数组记录字符位置（假设 ASCII）
  const lastIndex = new Array(128).fill(-1);
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const code = s.charCodeAt(right);

    if (lastIndex[code] >= left) {
      left = lastIndex[code] + 1;
    }

    lastIndex[code] = right;
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        explanation: `## 数组代替哈希表

### 思路
使用长度 128 的数组代替哈希表存储字符位置。

### 优点
- 数组访问比哈希表更快
- 适用于 ASCII 字符集

### 适用场景
当字符集较小（如 ASCII）时，性能更优。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 3. 最小覆盖子串 (76)
  {
    id: "minimum-window-substring",
    leetcodeId: 76,
    title: "最小覆盖子串",
    titleEn: "Minimum Window Substring",
    difficulty: "hard",
    category: "sliding-window",
    tags: ["滑动窗口", "哈希表", "字符串"],
    description: `给你一个字符串 \`s\` 、一个字符串 \`t\`。返回 \`s\` 中涵盖 \`t\` 所有字符的最小子串。如果 \`s\` 中不存在涵盖 \`t\` 所有字符的子串，则返回空字符串 \`""\`。

**注意：**
- 对于 \`t\` 中重复字符，我们寻找的子字符串中该字符数量必须不少于 \`t\` 中该字符数量。
- 如果 \`s\` 中存在这样的子串，我们保证它是唯一的答案。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。
\`\`\`

**示例 3：**
\`\`\`
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
\`\`\``,
    constraints: `- \`m == s.length\`
- \`n == t.length\`
- \`1 <= m, n <= 10^5\`
- \`s\` 和 \`t\` 由英文字母组成

**进阶：** 你能设计一个在 O(m + n) 时间内解决此问题的算法吗？`,
    initialCode: `function minWindow(s, t) {
  // 在此处编写你的代码

}`,
    solution: `function minWindow(s, t) {
  if (s.length < t.length) return "";

  // 统计 t 中每个字符的数量
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map();
  let left = 0;
  let valid = 0; // 窗口中满足 need 条件的字符个数
  let start = 0;
  let minLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // 扩展窗口
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    // 收缩窗口
    while (valid === need.size) {
      // 更新最小覆盖子串
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      const d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { id: "2", name: "示例2", input: ["a", "a"], expected: "a" },
      { id: "3", name: "无解", input: ["a", "aa"], expected: "" },
      { id: "4", name: "相同字符串", input: ["abc", "abc"], expected: "abc" },
    ],
    hints: [
      "使用滑动窗口，维护一个包含 t 所有字符的窗口",
      "使用两个哈希表，一个记录需要的字符，一个记录窗口中的字符",
      "当窗口满足条件时，尝试收缩窗口并更新最小长度",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 双哈希表

1. 使用 need 哈希表统计 t 中每个字符的数量
2. 使用 window 哈希表统计当前窗口中的字符数量
3. 使用 valid 记录窗口中满足 need 条件的字符种类数
4. 右指针扩展窗口：
   - 如果当前字符在 need 中，加入 window
   - 如果该字符数量达到 need 的要求，valid++
5. 当 valid === need.size 时，窗口满足条件：
   - 更新最小覆盖子串
   - 左指针收缩窗口

### 关键点
- valid 记录的是"种类数"，不是"字符数"
- 只有当某个字符的数量恰好等于需要的数量时，才更新 valid
- 这样可以正确处理重复字符

### 复杂度分析
- 时间复杂度：O(m + n)，m 和 n 分别是 s 和 t 的长度
- 空间复杂度：O(k)，k 是字符集大小`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(k)",
    relatedProblems: ["longest-substring-without-repeating", "substring-with-concatenation"],
    solutions: [
      {
        name: "滑动窗口 + 双哈希表（推荐）",
        code: `function minWindow(s, t) {
  if (s.length < t.length) return "";

  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map();
  let left = 0;
  let valid = 0;
  let start = 0;
  let minLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      const d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
        explanation: `## 滑动窗口 + 双哈希表

### 思路
1. need 哈希表统计 t 中每个字符的数量
2. window 哈希表统计窗口中的字符数量
3. valid 记录满足条件的字符种类数
4. 当 valid === need.size 时，窗口满足条件，尝试收缩

### 关键点
valid 记录的是"种类数"，只有当某个字符数量恰好等于需要的数量时才更新。`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(k)",
      },
      {
        name: "计数器优化",
        code: `function minWindow(s, t) {
  const count = {};
  for (const char of t) {
    count[char] = (count[char] || 0) + 1;
  }

  let required = Object.keys(count).length;
  let left = 0;
  let formed = 0;
  let start = 0;
  let minLen = Infinity;

  const windowCounts = {};

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    windowCounts[c] = (windowCounts[c] || 0) + 1;

    if (count[c] && windowCounts[c] === count[c]) {
      formed++;
    }

    while (formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        start = left;
      }

      const d = s[left];
      windowCounts[d]--;
      if (count[d] && windowCounts[d] < count[d]) {
        formed--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
        explanation: `## 计数器优化

### 思路
使用普通对象代替 Map，逻辑相同但更简洁。

### 变量说明
- count：目标字符串 t 中每个字符的计数
- required：t 中不同字符的数量
- formed：当前窗口中满足条件的字符种类数
- windowCounts：当前窗口中每个字符的计数`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(k)",
      },
    ],
  },

  // 4. 串联所有单词的子串 (30)
  {
    id: "substring-with-concatenation",
    leetcodeId: 30,
    title: "串联所有单词的子串",
    titleEn: "Substring with Concatenation of All Words",
    difficulty: "hard",
    category: "sliding-window",
    tags: ["滑动窗口", "哈希表", "字符串"],
    description: `给定一个字符串 \`s\` 和一个字符串数组 \`words\`。\`words\` 中所有字符串 **长度相同**。

\`s\` 中的 **串联子串** 是指一个包含 \`words\` 中所有字符串以任意顺序排列连接起来的子串。

- 例如，如果 \`words = ["ab","cd","ef"]\`，那么 \`"abcdef"\`，\`"abefcd"\`，\`"cdabef"\`，\`"cdefab"\`，\`"efabcd"\`，和 \`"efcdab"\` 都是串联子串。\`"acdbef"\` 不是串联子串，因为他不是任何 \`words\` 排列的连接。

返回所有串联子串在 \`s\` 中的开始索引。你可以以 **任意顺序** 返回答案。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
输出顺序无关紧要。返回 [9,0] 也是可以的。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]
解释：因为 words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。
s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。
所以我们返回一个空数组。
\`\`\`

**示例 3：**
\`\`\`
输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
解释：因为 words.length == 3 并且 words[i].length == 3，所以串联子串的长度必须为 9。
子串 "foobarthe" 开始位置是 6。它是 words 中以 ["foo","bar","the"] 顺序排列的连接。
子串 "barthefoo" 开始位置是 9。它是 words 中以 ["bar","the","foo"] 顺序排列的连接。
子串 "thefoobar" 开始位置是 12。它是 words 中以 ["the","foo","bar"] 顺序排列的连接。
\`\`\``,
    constraints: `- \`1 <= s.length <= 10^4\`
- \`1 <= words.length <= 5000\`
- \`1 <= words[i].length <= 30\`
- \`words[i]\` 和 \`s\` 由小写英文字母组成`,
    initialCode: `function findSubstring(s, words) {
  // 在此处编写你的代码

}`,
    solution: `function findSubstring(s, words) {
  if (!s || !words.length) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const totalLen = wordLen * wordCount;
  const result = [];

  // 统计 words 中每个单词的数量
  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // 从 0 到 wordLen-1 开始滑动窗口
  for (let i = 0; i < wordLen; i++) {
    let left = i;
    let count = 0;
    const window = new Map();

    for (let right = i; right <= s.length - wordLen; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (wordMap.has(word)) {
        window.set(word, (window.get(word) || 0) + 1);
        count++;

        // 如果当前单词数量超过需要的数量，收缩窗口
        while (window.get(word) > wordMap.get(word)) {
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }

        // 如果窗口中包含所有单词
        if (count === wordCount) {
          result.push(left);
          // 移动左边界
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }
      } else {
        // 遇到不在 words 中的单词，重置窗口
        window.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["barfoothefoobarman", ["foo", "bar"]], expected: [0, 9] },
      { id: "2", name: "无解", input: ["wordgoodgoodgoodbestword", ["word", "good", "best", "word"]], expected: [] },
      { id: "3", name: "多个解", input: ["barfoofoobarthefoobarman", ["bar", "foo", "the"]], expected: [6, 9, 12] },
    ],
    hints: [
      "所有单词长度相同，可以将问题转化为滑动窗口",
      "从 0 到 wordLen-1 个起点分别进行滑动窗口",
      "使用哈希表统计窗口中每个单词的数量",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 哈希表

由于所有单词长度相同，可以将字符串按单词长度分组处理。

1. 统计 words 中每个单词的数量
2. 从 0 到 wordLen-1 个起点分别进行滑动窗口
3. 对于每个起点：
   - 右指针每次移动一个单词长度
   - 如果遇到有效单词，加入窗口
   - 如果某个单词数量超标，收缩窗口
   - 如果窗口包含所有单词，记录结果
   - 如果遇到无效单词，重置窗口

### 为什么需要多个起点？
- 单词长度为 wordLen，起点可以是 0, 1, ..., wordLen-1
- 例如 wordLen=3，起点为 0 时处理索引 0,3,6,9...
- 起点为 1 时处理索引 1,4,7,10...
- 这样可以覆盖所有可能的起始位置

### 复杂度分析
- 时间复杂度：O(n × wordLen)，n 是字符串长度
- 空间复杂度：O(m × wordLen)，m 是单词数量`,
    timeComplexity: "O(n × wordLen)",
    spaceComplexity: "O(m × wordLen)",
    relatedProblems: ["minimum-window-substring"],
    solutions: [
      {
        name: "滑动窗口（推荐）",
        code: `function findSubstring(s, words) {
  if (!s || !words.length) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const totalLen = wordLen * wordCount;
  const result = [];

  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  for (let i = 0; i < wordLen; i++) {
    let left = i;
    let count = 0;
    const window = new Map();

    for (let right = i; right <= s.length - wordLen; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (wordMap.has(word)) {
        window.set(word, (window.get(word) || 0) + 1);
        count++;

        while (window.get(word) > wordMap.get(word)) {
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }

        if (count === wordCount) {
          result.push(left);
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }
      } else {
        window.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}`,
        explanation: `## 滑动窗口

### 思路
由于所有单词长度相同，可以按单词长度分组处理。

### 实现步骤
1. 从 0 到 wordLen-1 个起点分别进行滑动窗口
2. 每次窗口移动一个单词长度
3. 维护窗口内单词计数
4. 当某个单词超标时，收缩窗口

### 为什么需要多个起点？
起点可以是 0, 1, ..., wordLen-1，覆盖所有可能的起始位置。`,
        timeComplexity: "O(n × wordLen)",
        spaceComplexity: "O(m × wordLen)",
      },
      {
        name: "暴力匹配",
        code: `function findSubstring(s, words) {
  if (!s || !words.length) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const totalLen = wordLen * wordCount;
  const result = [];

  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  for (let i = 0; i <= s.length - totalLen; i++) {
    const seen = new Map();
    let j = 0;

    while (j < wordCount) {
      const word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);

      if (!wordMap.has(word)) break;

      seen.set(word, (seen.get(word) || 0) + 1);
      if (seen.get(word) > wordMap.get(word)) break;

      j++;
    }

    if (j === wordCount) {
      result.push(i);
    }
  }

  return result;
}`,
        explanation: `## 暴力匹配

### 思路
对每个可能的起始位置，检查是否能匹配所有单词。

### 实现
1. 遍历每个起始位置
2. 从该位置开始，逐个单词匹配
3. 如果所有单词都匹配成功，记录结果

### 复杂度
时间 O(n × m × wordLen)，n 是字符串长度，m 是单词数量。
虽然更慢，但思路直接。`,
        timeComplexity: "O(n × m × wordLen)",
        spaceComplexity: "O(m × wordLen)",
      },
    ],
  },
];
