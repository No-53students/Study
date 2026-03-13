// node ./27-happy-number.mjs
/**
 * 202. 快乐数 (Happy Number)
 * 难度: easy
 *
 * 编写一个算法来判断一个数 n 是不是快乐数。
 *
 * 「快乐数」 定义为：
 * - 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * - 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * - 如果这个过程 结果为 1，那么这个数就是快乐数。
 *
 * 如果 n 是 *快乐数* 就返回 true；不是，则返回 false。
 *
 * 示例 1：
 * 输入：n = 19
 * 输出：true
 * 解释：
 * 1² + 9² = 82
 * 8² + 2² = 68
 * 6² + 8² = 100
 * 1² + 0² + 0² = 1
 *
 * 示例 2：
 * 输入：n = 2
 * 输出：false
 *
 * 约束条件:
 * - 1 <= n <= 2^31 - 1
 *
 * 提示:
 *   1. 如果不是快乐数，会进入无限循环
 *   2. 使用哈希表记录已经出现过的数，检测循环
 *   3. 也可以使用快慢指针检测循环
 */

export function isHappy(n) {
  // 当前方案：Set 查重 + while 循环，时间 O(log n)，空间 O(log n)
  //
  // ✅ 用 Set 而非数组查重：
  //   Set.has(n)  → O(1) 哈希查找
  //   Array.includes(n) → O(n) 遍历查找，性能差
  //   Set 只存实际出现的值，内存 ∝ 元素个数，不浪费
  //
  // ⚠️ return n == 1  建议改为  return n === 1
  //   两者都是 number，结果一样，但 === 不做类型转换，更严谨规范
  //   == 会触发隐式类型转换（如 "1" == 1 → true），容易埋坑
  //
  // ⚠️ 取每位数字：字符串遍历 vs 数学取位
  //   当前写法：转字符串后遍历（可读，但有额外字符串分配）
  //     let newN = `${n}`;
  //     res += newN[i] * newN[i];  ← JS 字符串 * 字符串会隐式转为数字
  //   标准写法：用 % 10 取个位，Math.floor(n/10) 去掉个位（纯数学，无转换）
  //     while (n > 0) { const d = n % 10; sum += d * d; n = Math.floor(n/10); }
  const hasAppearArr = new Set();
  while (n !== 1 && !hasAppearArr.has(n)) {
    hasAppearArr.add(n);
    let newN = `${n}`;
    let res = 0;
    for (let i = 0; i < newN.length; i++) {
      res += Number(newN[i]) * Number(newN[i]);
    }
    n = res;
  }
  return n === 1;
}

// export function isHappy(n) {
//   console.log("输入的参数", n);
//   const hasAppearArr = new Set();
//   function nextNum(val) {
//     let str = `${val}`;
//     if (str == "1") {
//       return true;
//     } else {
//       if (hasAppearArr.has(str)) {
//         return false;
//       }
//       hasAppearArr.add(str);
//     }

//     let newStr = 0;
//     for (let i = 0; i < str.length; i++) {
//       newStr += str[i] * str[i];
//     }
//     return nextNum(newStr);
//   }
//   // 在此处编写你的代码
//   return nextNum(n);
// }

// ---- 测试用例 ----
console.log("\n📝 题目: 202. 快乐数 (Happy Number)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(
      `结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? "✅ 通过" : "❌ 不通过"}`,
    );
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? "✅ 通过" : "❌ 不通过"}`);
  },
};

test("示例1", () => {
  assert.deepStrictEqual(isHappy(19), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isHappy(2), false);
});

test("1", () => {
  assert.deepStrictEqual(isHappy(1), true);
});

test("7", () => {
  assert.deepStrictEqual(isHappy(7), true);
});
