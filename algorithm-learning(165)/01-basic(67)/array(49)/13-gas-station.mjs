// node ./13-gas-station.mjs
/**
 * 134. 加油站 (Gas Station)
 * 难度: medium
 *
 * 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
 * 
 * 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。
 *
 * 示例 1：
 * 输入：gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * 输出：3
 * 解释：
 * 从 3 号加油站出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
 * 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
 * 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
 * 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
 * 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
 * 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
 * 因此，3 可为起始索引。
 * 
 * 示例 2：
 * 输入：gas = [2,3,4], cost = [3,4,3]
 * 输出：-1
 * 解释：
 * 你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
 * 我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
 * 开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
 * 开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
 * 你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
 * 因此，无论怎样，你都不可能绑环路行驶一周。
 *
 * 约束条件:
 * - gas.length == n
 * - cost.length == n
 * - 1 <= n <= 10^5
 * - 0 <= gas[i], cost[i] <= 10^4
 *
 * 提示:
 *   1. 如果总油量 < 总消耗，一定无解
 *   2. 如果从 i 出发到不了 j，那么从 i 到 j 之间的任何站点出发也到不了 j
 *   3. 一次遍历同时计算总油量和当前油量
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
export function solution(gas, cost) {
  const diffArr = [];
  // 在这里编写你的代码
  for (let i = 0; i < cost.length; i++){
    diffArr[i] =  gas[i]-cost[i];
  }
  console.log('计算出来的差值', diffArr);
  let count = 0;
  let resCount = 0;
  let start = 0
  for (let j = 0; j < diffArr.length; j++){
    count += diffArr[j];
    resCount += diffArr[j];
    if (count < 0) {
      start += 1;
      count = 0;
    }
  }
  console.log("最后记录", start, count, resCount);
  if (resCount < 0) {
    return -1;
  } else {
    return start;
  }
}

// ---- 测试用例 ----
console.log("\n📝 题目: 134. 加油站 (Gas Station)");
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

test("可以完成", () => {
  assert.deepStrictEqual(solution([1,2,3,4,5], [3,4,5,1,2]), 3);
});

test("无法完成", () => {
  assert.deepStrictEqual(solution([2,3,4], [3,4,3]), -1);
});

test("单站点可完成", () => {
  assert.deepStrictEqual(solution([5], [4]), 0);
});

test("单站点不可完成", () => {
  assert.deepStrictEqual(solution([2], [3]), -1);
});

test("从0开始", () => {
  assert.deepStrictEqual(solution([3,1,1], [1,2,2]), 0);
});
