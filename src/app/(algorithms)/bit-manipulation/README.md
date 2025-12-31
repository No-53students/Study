# 位运算 (Bit Manipulation)

## 概念介绍

**位运算**是直接对整数的二进制位进行操作的运算。由于直接操作硬件级别的位，位运算通常比算术运算更快。

### 为什么学习位运算？

1. **性能优化**：位运算通常比乘除法快
2. **面试必考**：很多面试题考查位运算技巧
3. **底层原理**：理解计算机如何存储和处理数据
4. **实用场景**：权限系统、状态压缩、加密等

## 基本位运算符

| 运算符 | 名称 | 描述 | 示例 |
|-------|------|------|------|
| `&` | 与 | 两位都为1才为1 | `5 & 3 = 1` |
| `\|` | 或 | 任一位为1则为1 | `5 \| 3 = 7` |
| `^` | 异或 | 相同为0，不同为1 | `5 ^ 3 = 6` |
| `~` | 取反 | 0变1，1变0 | `~5 = -6` |
| `<<` | 左移 | 所有位左移，低位补0 | `5 << 1 = 10` |
| `>>` | 右移 | 所有位右移，高位补符号位 | `5 >> 1 = 2` |
| `>>>` | 无符号右移 | 所有位右移，高位补0 | `-1 >>> 1 = 2147483647` |

### 运算示例

```javascript
// 5 的二进制：0101
// 3 的二进制：0011

5 & 3   // 0101 & 0011 = 0001 = 1 (与)
5 | 3   // 0101 | 0011 = 0111 = 7 (或)
5 ^ 3   // 0101 ^ 0011 = 0110 = 6 (异或)
~5      // ~0101 = ...11111010 = -6 (取反，补码表示)
5 << 1  // 0101 << 1 = 1010 = 10 (左移)
5 >> 1  // 0101 >> 1 = 0010 = 2 (右移)
```

## 常用位运算技巧

### 1. 判断奇偶

```javascript
// n & 1 === 1 表示奇数
// n & 1 === 0 表示偶数
function isOdd(n) {
  return (n & 1) === 1;
}

// 原理：奇数的最低位一定是1
// 5 = 0101, 5 & 1 = 0101 & 0001 = 0001 = 1 (奇数)
// 4 = 0100, 4 & 1 = 0100 & 0001 = 0000 = 0 (偶数)
```

### 2. 乘以/除以 2 的幂

```javascript
// 左移 n 位相当于乘以 2^n
const a = 5 << 2;  // 5 * 4 = 20

// 右移 n 位相当于除以 2^n（向下取整）
const b = 20 >> 2;  // 20 / 4 = 5
const c = 21 >> 2;  // Math.floor(21 / 4) = 5

// 注意：负数右移结果可能与预期不同
```

### 3. 交换两个数（不用临时变量）

```javascript
function swap(a, b) {
  a = a ^ b;
  b = a ^ b;  // b = (a ^ b) ^ b = a
  a = a ^ b;  // a = (a ^ b) ^ a = b
  return [a, b];
}

// 原理：a ^ b ^ b = a（异或同一个数两次等于没异或）
```

### 4. 获取、设置、清除特定位

```javascript
/**
 * 获取第 i 位的值（从0开始，从右往左）
 */
function getBit(n, i) {
  return (n >> i) & 1;
}

/**
 * 将第 i 位设为 1
 */
function setBit(n, i) {
  return n | (1 << i);
}

/**
 * 将第 i 位设为 0
 */
function clearBit(n, i) {
  return n & ~(1 << i);
}

/**
 * 翻转第 i 位
 */
function toggleBit(n, i) {
  return n ^ (1 << i);
}

// 示例：n = 5 (0101)
getBit(5, 0);    // 1
getBit(5, 1);    // 0
setBit(5, 1);    // 7 (0111)
clearBit(5, 2);  // 1 (0001)
toggleBit(5, 0); // 4 (0100)
```

### 5. 消除最低位的 1

```javascript
// n & (n - 1) 消除 n 最低位的 1
// 这是非常重要的技巧！

// 原理：
// n - 1 会把最低位的 1 变成 0，同时把它右边的 0 都变成 1
// n & (n - 1) 就会消除最低位的 1

// 示例：n = 12 (1100)
// n - 1 = 11 (1011)
// n & (n-1) = 1100 & 1011 = 1000 = 8
```

### 6. 获取最低位的 1

```javascript
// n & (-n) 或 n & (~n + 1) 获取最低位的 1
function lowbit(n) {
  return n & -n;
}

// 原理：-n 是 n 的补码，即 ~n + 1
// 示例：n = 12 (1100)
// -n = 补码 = ~1100 + 1 = 0011 + 1 = 0100
// n & (-n) = 1100 & 0100 = 0100 = 4
```

### 7. 判断是否是 2 的幂

```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

// 原理：2 的幂的二进制只有一个 1
// 4 = 0100, 4 & 3 = 0100 & 0011 = 0000
// 6 = 0110, 6 & 5 = 0110 & 0101 = 0100 ≠ 0
```

## 典型例题

### 位1的个数 (LeetCode 191)

```javascript
/**
 * 计算二进制中 1 的个数（汉明重量）
 *
 * 方法1：Brian Kernighan 算法
 * 每次消除最低位的 1，计数
 */
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1);  // 消除最低位的 1
    count++;
  }
  return count;
}

/**
 * 方法2：逐位检查
 */
function hammingWeight2(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;   // 检查最低位
    n = n >>> 1;      // 无符号右移
  }
  return count;
}
```

### 只出现一次的数字 (LeetCode 136)

```javascript
/**
 * 数组中只有一个数出现一次，其他都出现两次，找出那个数
 *
 * 利用异或性质：
 * - a ^ a = 0
 * - a ^ 0 = a
 * - 异或满足交换律和结合律
 */
function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

// 示例：[4, 1, 2, 1, 2]
// 4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ^ (1 ^ 1) ^ (2 ^ 2) = 4 ^ 0 ^ 0 = 4
```

### 只出现一次的数字 II (LeetCode 137)

```javascript
/**
 * 每个元素出现三次，只有一个出现一次
 *
 * 思路：统计每一位上 1 出现的次数，模 3 得到结果
 */
function singleNumber(nums) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    let count = 0;
    for (const num of nums) {
      count += (num >> i) & 1;
    }
    // 如果该位上 1 的个数不是 3 的倍数，则结果的该位为 1
    if (count % 3 !== 0) {
      result |= (1 << i);
    }
  }

  return result;
}
```

### 只出现一次的数字 III (LeetCode 260)

```javascript
/**
 * 数组中有两个数只出现一次，其他都出现两次
 * 找出这两个数
 */
function singleNumber(nums) {
  // 1. 全部异或，得到两个不同数的异或结果
  let xor = 0;
  for (const num of nums) {
    xor ^= num;
  }

  // 2. 找到任意一个为 1 的位（说明两个数在这一位不同）
  // 使用 lowbit 获取最低位的 1
  const diff = xor & -xor;

  // 3. 根据这一位将数组分成两组，分别异或
  let a = 0, b = 0;
  for (const num of nums) {
    if (num & diff) {
      a ^= num;
    } else {
      b ^= num;
    }
  }

  return [a, b];
}
```

### 比特位计数 (LeetCode 338)

```javascript
/**
 * 计算 0 到 n 每个数的二进制中 1 的个数
 *
 * 动态规划 + 位运算
 * dp[i] = dp[i & (i-1)] + 1
 */
function countBits(n) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    // i & (i-1) 消除最低位的 1，结果一定小于 i
    dp[i] = dp[i & (i - 1)] + 1;
  }

  return dp;
}

// 另一种思路：奇偶性
// dp[i] = dp[i >> 1] + (i & 1)
```

### 颠倒二进制位 (LeetCode 190)

```javascript
/**
 * 颠倒给定的 32 位无符号整数的二进制位
 */
function reverseBits(n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    // 取出 n 的最低位
    const bit = n & 1;
    // 移除 n 的最低位
    n = n >>> 1;
    // 将 bit 放到 result 的高位
    result = (result << 1) | bit;
  }

  // 处理 JavaScript 负数问题
  return result >>> 0;
}
```

### 2的幂 (LeetCode 231)

```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
```

### 4的幂 (LeetCode 342)

```javascript
/**
 * 判断是否是 4 的幂
 *
 * 4 的幂的特点：
 * 1. 是 2 的幂（只有一个 1）
 * 2. 这个 1 在偶数位上（从 0 开始）
 */
function isPowerOfFour(n) {
  // 0x55555555 = 01010101...01010101 (偶数位都是 1)
  return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
}

// 另一种方法：4^n % 3 = 1
function isPowerOfFour2(n) {
  return n > 0 && (n & (n - 1)) === 0 && n % 3 === 1;
}
```

### 汉明距离 (LeetCode 461)

```javascript
/**
 * 两个整数的汉明距离：对应位置上不同的位数
 */
function hammingDistance(x, y) {
  // 异或后 1 的个数就是不同的位数
  let xor = x ^ y;
  let count = 0;

  while (xor !== 0) {
    xor = xor & (xor - 1);
    count++;
  }

  return count;
}
```

## 前端应用场景

### 1. 权限系统

```javascript
/**
 * 使用位掩码管理权限
 */
const Permissions = {
  READ:    1,       // 0001
  WRITE:   1 << 1,  // 0010
  DELETE:  1 << 2,  // 0100
  ADMIN:   1 << 3,  // 1000
};

class User {
  constructor(permissions = 0) {
    this.permissions = permissions;
  }

  // 添加权限
  grant(permission) {
    this.permissions |= permission;
  }

  // 移除权限
  revoke(permission) {
    this.permissions &= ~permission;
  }

  // 检查权限
  has(permission) {
    return (this.permissions & permission) === permission;
  }

  // 切换权限
  toggle(permission) {
    this.permissions ^= permission;
  }
}

// 使用示例
const user = new User();
user.grant(Permissions.READ | Permissions.WRITE);  // 授予读写权限
user.has(Permissions.READ);    // true
user.has(Permissions.DELETE);  // false
user.revoke(Permissions.WRITE);
user.has(Permissions.WRITE);   // false
```

### 2. 状态管理

```javascript
/**
 * 使用位掩码管理多个布尔状态
 */
const States = {
  LOADING:  1 << 0,
  ERROR:    1 << 1,
  SUCCESS:  1 << 2,
  DISABLED: 1 << 3,
};

function ComponentState() {
  let state = 0;

  return {
    set(flag) { state |= flag; },
    clear(flag) { state &= ~flag; },
    has(flag) { return (state & flag) !== 0; },
    reset() { state = 0; },
  };
}

// 使用
const buttonState = ComponentState();
buttonState.set(States.LOADING);
buttonState.has(States.LOADING);  // true
buttonState.clear(States.LOADING);
buttonState.set(States.SUCCESS);
```

### 3. 颜色处理

```javascript
/**
 * RGB 颜色与数值转换
 */
function rgbToNumber(r, g, b) {
  return (r << 16) | (g << 8) | b;
}

function numberToRgb(n) {
  return {
    r: (n >> 16) & 0xFF,
    g: (n >> 8) & 0xFF,
    b: n & 0xFF,
  };
}

// 示例
rgbToNumber(255, 128, 64);  // 16744512
numberToRgb(16744512);      // { r: 255, g: 128, b: 64 }

// 混合两种颜色
function blendColors(c1, c2, ratio = 0.5) {
  const rgb1 = numberToRgb(c1);
  const rgb2 = numberToRgb(c2);

  return rgbToNumber(
    Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio),
    Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio),
    Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio)
  );
}
```

### 4. 高效的集合操作

```javascript
/**
 * 使用位运算实现小规模集合
 * 适用于元素范围在 0-31 的集合
 */
class BitSet {
  constructor() {
    this.bits = 0;
  }

  add(n) { this.bits |= (1 << n); }
  remove(n) { this.bits &= ~(1 << n); }
  has(n) { return (this.bits & (1 << n)) !== 0; }

  // 集合运算
  union(other) { return this.bits | other.bits; }
  intersect(other) { return this.bits & other.bits; }
  difference(other) { return this.bits & ~other.bits; }

  // 元素个数
  size() {
    let count = 0;
    let n = this.bits;
    while (n) {
      n &= (n - 1);
      count++;
    }
    return count;
  }
}
```

## 位运算技巧速查表

| 操作 | 代码 | 说明 |
|------|------|------|
| 判断奇偶 | `n & 1` | 1 为奇，0 为偶 |
| 乘以 2^k | `n << k` | 左移 k 位 |
| 除以 2^k | `n >> k` | 右移 k 位 |
| 取第 i 位 | `(n >> i) & 1` | 0 或 1 |
| 第 i 位置 1 | `n \| (1 << i)` | |
| 第 i 位置 0 | `n & ~(1 << i)` | |
| 第 i 位取反 | `n ^ (1 << i)` | |
| 消除最低位 1 | `n & (n - 1)` | Brian Kernighan |
| 获取最低位 1 | `n & -n` | lowbit |
| 是否 2 的幂 | `n > 0 && (n & (n-1)) === 0` | |
| 交换两数 | `a ^= b; b ^= a; a ^= b;` | 无临时变量 |

## 复杂度分析

| 操作 | 时间复杂度 |
|------|-----------|
| 单次位运算 | O(1) |
| 数 1 的个数 | O(k)，k 是 1 的个数 |
| 逐位检查 | O(log n) 或 O(32) |

## 总结

位运算的关键技巧：

1. **n & (n-1)**：消除最低位的 1，用于数 1 的个数、判断 2 的幂
2. **n & (-n)**：获取最低位的 1
3. **异或性质**：a ^ a = 0, a ^ 0 = a，用于找唯一元素
4. **位掩码**：用于权限系统、状态压缩

注意事项：
- JavaScript 中位运算针对 32 位有符号整数
- 大数需要使用 BigInt
- `>>>` 是无符号右移，处理负数时常用
