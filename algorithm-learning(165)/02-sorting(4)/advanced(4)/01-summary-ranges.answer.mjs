/**
 * 228. 汇总区间 (Summary Ranges) - 参考答案
 */

export function summaryRanges(nums) {
  const result = [];
  let i = 0;

  while (i < nums.length) {
    const start = nums[i];

    // 找到连续区间的末尾
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }

    // 生成区间字符串
    if (start === nums[i]) {
      result.push(String(start));
    } else {
      result.push(\`\${start}->\${nums[i]}\`);
    }

    i++;
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(summaryRanges([0,1,2,4,5,7]), ["0->2","4->5","7"]);
});

test("示例2", () => {
  assert.deepStrictEqual(summaryRanges([0,2,3,4,6,8,9]), ["0","2->4","6","8->9"]);
});

test("空数组", () => {
  assert.deepStrictEqual(summaryRanges([]), []);
});

test("单元素", () => {
  assert.deepStrictEqual(summaryRanges([-1]), ["-1"]);
});
