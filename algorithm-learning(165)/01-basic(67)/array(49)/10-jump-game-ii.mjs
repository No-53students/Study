// node ./10-jump-game-ii.mjs
/**
 * 45. 跳跃游戏 II (Jump Game II)
 * 难度: medium
 *
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
 *
 * 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
 *
 * - 0 <= j <= nums[i]
 * - i + j < n
 *
 * 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 *
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：2
 * 解释：跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 * 示例 2：
 * 输入：nums = [2,3,0,1,4]
 * 输出：2
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 1000
 * - 题目保证可以到达 nums[n-1]
 *
 * 提示:
 *   1. 贪心：在当前跳跃范围内，找能跳得最远的位置
 *   2. 当到达当前跳跃的边界时，必须跳一次
 *   3. 更新边界为之前记录的最远位置
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 错误答案
// export function solution(nums) {
//   if (nums.length == 1) {
//     return 0;
//   }
//   // 依旧是之前的最后是最大的一步
//   console.log("进入");
//   // 前面的再继续这样寻找
//   let stepArr = [0];
//   let currentIndexStep = nums[0];
//   let index = 0;
//   let findMaxJump = false;
//   while (index + currentIndexStep < nums.length - 1) {
//     console.log("while", index, nums.length - 1);
//     currentIndexStep = nums[index];
//     console.log("当前可以", currentIndexStep);
//     //检查几个步骤
//     for (let itemi = 1; itemi <= currentIndexStep; itemi++) {
//       console.log("分析", itemi, currentIndexStep);
//       // 寻找
//       let maxJumpIndex = itemi + index;
//       // 寻找值
//       let maxJump = nums[maxJumpIndex];
//       console.log("分析1", maxJump, currentIndexStep);
//       // 对比步骤
//       if (maxJump + index + itemi > currentIndexStep + index) {
//         // 更新
//         currentIndexStep = maxJump;
//         index = maxJumpIndex;
//         console.log("获取到最大", maxJump, index);
//         findMaxJump = true;
//       }
//     }
//     if (!findMaxJump) {
//       index++;
//     }

//     console.log("记录", stepArr);
//     stepArr.push(index);
//     console.log("记录1", stepArr);
//     findMaxJump = false;
//     console.log("下一个", index, stepArr);
//   }
//   return stepArr.length;
// }


// 【我的思路】模拟跳跃过程（while + for）
// 每一轮 while 代表一次跳跃，for 在当前能跳的范围内找"下一步能到最远"的位置
// 找到后跳过去，重复直到能直接跳到终点
// 时间 O(n²) 最坏情况（每次跳1步，for扫描剩余所有），空间 O(1)
//
// 【标准答案】边界推进法（单次 for 循环）
// 用 curEnd 记录"当前这一跳最远到哪"，maxReach 记录"下一跳最远到哪"
// 当 i 走到 curEnd 时，说明必须跳一次，把 curEnd 更新为 maxReach
// 时间 O(n)，空间 O(1)
//
// 【核心区别】
// 我的思路：真的模拟"人在跳"，每次选最佳落点，跳过去再看
// 标准答案：不模拟跳跃，只用边界推进，遍历一遍就算出答案
// 标准答案更优雅，但我的思路更直观易懂
export function solution(nums) {
  if (nums.length <= 1) return 0;

  let steps = 0;
  let index = 0;

  while (index + nums[index] < nums.length - 1) {
    let stepCount = nums[index]; // 固定当前步数，不在for里改
    // bestReach 初始为 0，是"擂台赛"的起点
    // 不用当前位置的 reach，因为当前位置是你站的地方，必须跳走
    // 如果让当前位置参赛（i=0），reach 最大时 bestIndex=index，就跳回原地死循环了
    // for 从 i=1 开始，保证至少往前走一步
    let bestReach = 0;
    let bestIndex = index + 1; // 至少走一步

    for (let i = 1; i <= stepCount; i++) {
      let jumpIndex = i + index;
      let reach = jumpIndex + nums[jumpIndex]; // 位置+值 = 能到多远
      // 候选之间互相比，找 reach 最大的落点
      if (reach > bestReach) {
        bestReach = reach;
        bestIndex = jumpIndex; // 只记录，不跳
      }
    }

    index = bestIndex; // for结束后才跳
    steps++;
  }

  return steps + 1; // 最后一跳到终点
}

// ---- 测试用例 ----
console.log("\n📝 题目: 45. 跳跃游戏 II (Jump Game II)");
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

test("基本测试", () => {
  assert.deepStrictEqual(solution([2, 3, 1, 1, 4]), 2);
});

test("有0的情况", () => {
  assert.deepStrictEqual(solution([2, 3, 0, 1, 4]), 2);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([0]), 0);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([2, 1]), 1);
});

test("一步到位", () => {
  assert.deepStrictEqual(solution([5, 1, 1, 1, 1]), 1);
});

test("场景1", () => {
  assert.deepStrictEqual(solution([2, 1, 1, 1, 1]), 3);
});
