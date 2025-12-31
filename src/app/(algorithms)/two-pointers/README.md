# 双指针 (Two Pointers)

## 概念介绍

**双指针**是一种通过使用两个指针在数据结构（通常是数组或链表）上移动来解决问题的技巧。它能将某些 O(n²) 的暴力解法优化到 O(n)。

### 核心思想

通过维护两个指针的相对位置和移动规则，在一次遍历中完成原本需要嵌套循环的操作。

### 双指针类型

| 类型 | 描述 | 典型场景 |
|------|------|---------|
| 对撞指针 | 从两端向中间移动 | 有序数组、回文判断 |
| 快慢指针 | 不同速度移动 | 链表环检测、找中点 |
| 同向指针 | 同一方向移动 | 滑动窗口、删除重复 |

## 对撞指针（相向双指针）

从数组两端向中间移动，通常用于有序数组或需要比较首尾元素的场景。

### 模板

```javascript
function twoPointers(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 根据条件移动指针
    if (满足某条件) {
      left++;
    } else {
      right--;
    }
  }
}
```

### 典型例题：两数之和 II (LeetCode 167)

给定一个已按升序排列的数组，找出两个数使得它们的和等于目标值。

```javascript
/**
 * 两数之和 II - 输入有序数组
 *
 * 核心思想：
 * 因为数组有序，可以用对撞指针：
 * - 如果 nums[left] + nums[right] > target，说明和太大，right--
 * - 如果 nums[left] + nums[right] < target，说明和太小，left++
 * - 相等则找到答案
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1]; // 题目要求1-indexed
    } else if (sum < target) {
      left++;   // 和太小，增大左边
    } else {
      right--;  // 和太大，减小右边
    }
  }

  return [-1, -1];
}

// 示例
twoSum([2, 7, 11, 15], 9);  // [1, 2]
```

### 典型例题：验证回文串 (LeetCode 125)

```javascript
/**
 * 验证回文串
 *
 * 双指针从两端向中间移动，比较字符是否相等
 */
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // 跳过非字母数字字符
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // 比较（忽略大小写）
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char) {
  const code = char.charCodeAt(0);
  return (code >= 48 && code <= 57) ||   // 0-9
         (code >= 65 && code <= 90) ||   // A-Z
         (code >= 97 && code <= 122);    // a-z
}
```

### 典型例题：盛最多水的容器 (LeetCode 11)

```javascript
/**
 * 盛最多水的容器
 *
 * 核心思想：
 * 面积 = min(height[left], height[right]) * (right - left)
 *
 * 为什么移动较小的那一边？
 * 如果移动较大的，宽度减小，高度最多不变（因为受限于较小的一边），面积必然减小
 * 如果移动较小的，宽度减小，但高度可能增大，面积有可能增大
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    // 计算当前水量
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * h);

    // 移动较矮的一边
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}
```

## 快慢指针

两个指针以不同速度移动，常用于链表问题。

### 典型例题：环形链表 (LeetCode 141)

```javascript
/**
 * 检测链表是否有环
 *
 * 核心思想（龟兔赛跑）：
 * - 慢指针每次走1步
 * - 快指针每次走2步
 * - 如果有环，快指针最终会追上慢指针
 * - 如果无环，快指针会先到达终点
 */
function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;        // 慢指针走1步
    fast = fast.next.next;   // 快指针走2步

    if (slow === fast) {
      return true;  // 相遇说明有环
    }
  }

  return false;  // 快指针到终点，无环
}
```

### 典型例题：链表的中间结点 (LeetCode 876)

```javascript
/**
 * 找链表中间节点
 *
 * 当快指针到达末尾时，慢指针正好在中间
 */
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

### 典型例题：环形链表 II (LeetCode 142)

找到环的入口节点。

```javascript
/**
 * 找环的入口
 *
 * 数学推导：
 * 设：起点到环入口距离为 a，环入口到相遇点距离为 b，相遇点到环入口距离为 c
 *
 * 相遇时：
 * - 慢指针走了：a + b
 * - 快指针走了：a + b + n(b + c)  // n 是快指针多绕的圈数
 * - 快指针走的是慢指针的2倍：2(a + b) = a + b + n(b + c)
 * - 简化得：a = (n-1)(b + c) + c
 *
 * 这说明：从起点和相遇点同时走，会在环入口相遇！
 */
function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // 第一阶段：找到相遇点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 第二阶段：从起点和相遇点同时走
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;  // 在环入口相遇
    }
  }

  return null;
}
```

## 同向双指针

两个指针同方向移动，常用于原地修改数组。

### 典型例题：移除元素 (LeetCode 27)

```javascript
/**
 * 原地移除元素
 *
 * slow：指向下一个要填入的位置
 * fast：遍历所有元素
 */
function removeElement(nums, val) {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;  // 返回新数组长度
}
```

### 典型例题：删除有序数组中的重复项 (LeetCode 26)

```javascript
/**
 * 删除有序数组中的重复项
 *
 * slow：指向最后一个不重复元素
 * fast：遍历寻找不重复的元素
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;
}
```

### 典型例题：移动零 (LeetCode 283)

```javascript
/**
 * 将所有0移动到数组末尾
 */
function moveZeroes(nums) {
  let slow = 0;

  // 第一遍：将非零元素移到前面
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // 第二遍：剩余位置填0
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// 更优雅的交换写法
function moveZeroes2(nums) {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
}
```

## 三指针

### 典型例题：三数之和 (LeetCode 15)

```javascript
/**
 * 三数之和
 *
 * 思路：
 * 1. 先排序
 * 2. 固定一个数，然后用双指针找另外两个数
 * 3. 注意去重
 */
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // 去重：跳过相同的第一个数
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 剪枝：如果最小的三个数之和都大于0，不可能找到解
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // 去重：跳过相同的第二个数
        while (left < right && nums[left] === nums[left + 1]) left++;
        // 去重：跳过相同的第三个数
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

## 前端应用场景

### 1. 字符串处理

```javascript
// 反转字符串（原地）
function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}
```

### 2. 数组去重（有序）

```javascript
// 有序数组去重
function deduplicate(arr) {
  if (arr.length === 0) return [];

  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  return arr.slice(0, slow + 1);
}
```

### 3. 合并有序数组

```javascript
// 合并两个有序数组（LeetCode 88）
function merge(nums1, m, nums2, n) {
  // 从后向前填充，避免覆盖
  let p1 = m - 1;  // nums1 的有效元素指针
  let p2 = n - 1;  // nums2 的指针
  let p = m + n - 1;  // 填充位置指针

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
}
```

## 何时使用双指针

| 场景 | 适用的双指针类型 |
|------|-----------------|
| 有序数组找两数之和 | 对撞指针 |
| 判断回文 | 对撞指针 |
| 链表找环/中点 | 快慢指针 |
| 原地删除/移动元素 | 同向指针 |
| 合并有序数组 | 同向指针 |
| N数之和 | 对撞指针 + 固定前几个数 |

## 复杂度分析

| 方法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 暴力双循环 | O(n²) | O(1) |
| 双指针 | O(n) | O(1) |

双指针的优势在于用 O(n) 时间完成 O(n²) 的任务，且通常只需 O(1) 额外空间。

## 总结

双指针是非常重要的算法技巧：

1. **对撞指针**：适用于有序数组，从两端向中间搜索
2. **快慢指针**：适用于链表问题，检测环、找中点
3. **同向指针**：适用于原地修改数组
4. **关键**：根据问题特点选择合适的指针移动策略
