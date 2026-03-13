// node ./11-h-index2.mjs
/**
 * 274. H 指数 (H-Index)
 * 难度: medium
 *
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
 * 
 * 根据维基百科上 h 指数的定义：h 代表"高引用次数" ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 至少 有 h 篇论文被引用次数大于等于 h 。如果 h 有多种可能的值，h 指数 是其中最大的那个。
 *
 * 示例 1：
 * 输入：citations = [3,0,6,1,5]
 * 输出：3
 * 解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
 *      由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。
 * 
 * 示例 2：
 * 输入：citations = [1,3,1]
 * 输出：1
 *
 * 约束条件:
 * - n == citations.length
 * - 1 <= n <= 5000
 * - 0 <= citations[i] <= 1000
 *
 * 提示:
 *   1. 先对数组降序排序
 *   2. 从大到小遍历，找满足 citations[i] >= i+1 的最大 i+1
 *   3. 也可以使用计数排序达到 O(n) 时间
 */

/**
 * @param {number[]} citations
 * @return {number}
 */
export function solution(citations) {
  let h = 0;
  //  计数
  const count = new Array(citations.length+1).fill(0);
  for (let i = 0; i < citations.length; i++){
    // 大于h篇论文的引用统一记录为引用了h次
    if (citations[i] >= count.length) {
      count[count.length-1]++
    } else {
      count[citations[i]]++;
    } 
  }
  console.log("统计后的数组", count)
  // 从后向前查找第一个 论文数的数> 篇数的位置返回论文篇数；
  for (let i = citations.length; i>= 0; i--){
    console.log("进入循环", i, count[i])
     h += count[i];
    if ( h >= i) {
      return i;
    }
  }
  // for寻找citations[i] >= i+1
}

// ---- 测试用例 ----
console.log("\n📝 题目: 274. H 指数 (H-Index)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? '✅ 通过' : '❌ 不通过'}`);
  },
};

test("基本测试", () => {
  assert.deepStrictEqual(solution([3,0,6,1,5]), 3);
});

test("简单情况", () => {
  assert.deepStrictEqual(solution([1,3,1]), 1);
});

test("全0", () => {
  assert.deepStrictEqual(solution([0,0,0]), 0);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([100]), 1);
});

test("相同值", () => {
  assert.deepStrictEqual(solution([5,5,5,5,5]), 5);
});
