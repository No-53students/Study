/**
 * 从项目题库 (src/app/(algorithms)/problems/data/*.ts) 提取题目和答案
 * 生成到 algorithm-learning/ 目录下
 *
 * 题目文件: problem.mjs  (含描述注释 + 空函数 + 测试用例)
 * 答案文件: answer.mjs   (含完整解法 + 测试用例)
 *
 * 用法: node scripts/extract-problems.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(
  ROOT,
  "src/app/(algorithms)/problems/data"
);
const OUT_DIR = path.join(ROOT, "algorithm-learning");

// category -> 目录映射
const CATEGORY_DIR_MAP = {
  "array-string": "01-basic/array",
  "hash-table": "01-basic/array",
  "two-pointers": "10-two-pointers-and-sliding-window",
  "sliding-window": "10-two-pointers-and-sliding-window",
  stack: "04-stack-and-queue",
  "linked-list": "01-basic/linked-list",
  intervals: "02-sorting/advanced",
  matrix: "01-basic/array",
  "binary-tree": "05-tree/binary-tree",
  bst: "05-tree/bst",
  graph: "06-graph",
  "graph-bfs": "06-graph",
  backtracking: "09-backtracking",
  "binary-search": "03-searching",
  heap: "04-stack-and-queue",
  "dp-1d": "07-dynamic-programming",
  "dp-multi": "07-dynamic-programming",
  "bit-manipulation": "01-basic/array",
  math: "01-basic/array",
  greedy: "08-greedy",
  techniques: "01-basic/array",
};

// 需要解析的数据文件（排除非题目文件）
const PROBLEM_FILES = [
  "array-string.ts",
  "two-pointers.ts",
  "sliding-window.ts",
  "hash-table.ts",
  "stack.ts",
  "linked-list.ts",
  "interval.ts",
  "matrix.ts",
  "binary-tree.ts",
  "graph.ts",
  "backtracking.ts",
  "binary-search.ts",
  "heap.ts",
  "dp-1d.ts",
  "dp-multidimensional.ts",
  "bit-manipulation.ts",
  "math.ts",
];

/**
 * 从 TS 源码文本中提取题目数组
 * 使用正则逐个提取字段，避免 eval
 */
function extractProblems(source) {
  const problems = [];

  // 匹配每个题目对象块
  // 题目的 id 是 slug 格式 (含字母和连字符)，而 testCase 的 id 是纯数字
  const idPattern = /\{\s*\n?\s*id:\s*"([a-z][a-z0-9-]+)"/g;
  let match;
  const idPositions = [];

  while ((match = idPattern.exec(source)) !== null) {
    idPositions.push({ id: match[1], start: match.index });
  }

  for (let i = 0; i < idPositions.length; i++) {
    const startPos = idPositions[i].start;
    const searchEnd =
      i + 1 < idPositions.length
        ? idPositions[i + 1].start
        : source.length;
    const chunk = source.slice(startPos, searchEnd);

    const problem = { id: idPositions[i].id };

    // 提取简单字符串字段
    const strField = (name) => {
      const re = new RegExp(`${name}:\\s*"([^"]*)"`, "s");
      const m = chunk.match(re);
      return m ? m[1] : "";
    };

    // leetcodeId 是数字，用专门的正则
    const lcMatch = chunk.match(/leetcodeId:\s*(\d+)/);
    problem.leetcodeId = lcMatch ? parseInt(lcMatch[1]) : 0;
    problem.title = strField("title");
    problem.titleEn = strField("titleEn");
    problem.difficulty = strField("difficulty");
    problem.category = strField("category");

    // 提取模板字符串字段 (用反引号)
    const tmplField = (name) => {
      const idx = chunk.indexOf(`${name}: \``);
      if (idx === -1) return "";
      const contentStart = idx + name.length + 3; // skip ": `"
      let pos = contentStart;
      while (pos < chunk.length) {
        if (chunk[pos] === "\\" && pos + 1 < chunk.length) {
          pos += 2; // 跳过转义字符 (如 \` \$ \\)
          continue;
        }
        if (chunk[pos] === "`") break;
        pos++;
      }
      return chunk.slice(contentStart, pos);
    };

    problem.description = tmplField("description");
    problem.examples = tmplField("examples");
    problem.constraints = tmplField("constraints");
    problem.initialCode = tmplField("initialCode");
    problem.solution = tmplField("solution");

    // 提取 testCases 数组
    const tcIdx = chunk.indexOf("testCases:");
    if (tcIdx !== -1) {
      // 找到 testCases: [ ... ] 的范围
      const bracketStart = chunk.indexOf("[", tcIdx);
      if (bracketStart !== -1) {
        let depth = 1;
        let pos = bracketStart + 1;
        while (pos < chunk.length && depth > 0) {
          if (chunk[pos] === "[") depth++;
          if (chunk[pos] === "]") depth--;
          pos++;
        }
        const tcStr = chunk.slice(bracketStart, pos);
        try {
          // 安全解析: 把 JS 对象字面量转为 JSON
          // 1. 给没引号的 key 加引号
          // 2. 移除尾部逗号
          // 3. 处理未定义值
          const jsonStr = tcStr
            .replace(/(?<=[{,\[\s])(\w+)\s*:/g, '"$1":')
            .replace(/,\s*([}\]])/g, "$1")
            .replace(/\bundefined\b/g, "null")
            .replace(/'/g, '"');
          problem.testCases = JSON.parse(jsonStr);
        } catch (e) {
          // 尝试更宽松的解析
          try {
            // 使用 Function 构造器安全解析（仅处理纯数据）
            const fn = new Function(`return ${tcStr}`);
            problem.testCases = fn();
          } catch {
            problem.testCases = [];
          }
        }
      }
    } else {
      problem.testCases = [];
    }

    // 提取 hints
    const hintsIdx = chunk.indexOf("hints:");
    if (hintsIdx !== -1) {
      const bracketStart = chunk.indexOf("[", hintsIdx);
      if (bracketStart !== -1) {
        let depth = 1;
        let pos = bracketStart + 1;
        while (pos < chunk.length && depth > 0) {
          if (chunk[pos] === "[") depth++;
          if (chunk[pos] === "]") depth--;
          pos++;
        }
        const hStr = chunk.slice(bracketStart + 1, pos - 1);
        problem.hints = [...hStr.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
      }
    }
    if (!problem.hints) problem.hints = [];

    if (problem.initialCode && problem.solution) {
      problems.push(problem);
    }
  }

  return problems;
}

/**
 * 清理 markdown 用于注释: 去掉反引号语法，保留纯文本
 */
function mdToComment(md) {
  return md
    .replace(/\\`/g, "`")
    .replace(/\\\$/g, "$")
    .replace(/```[\s\S]*?```/g, (m) =>
      m
        .replace(/```\w*\n?/g, "")
        .replace(/```/g, "")
        .trim()
    )
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\\n/g, "\n")
    .trim();
}

/**
 * 根据 testCases 生成测试代码
 */
function generateTests(problem, isAnswer) {
  const fn = problem.initialCode.match(/function\s+(\w+)/)?.[1] || "solution";
  const lines = [];

  lines.push(`import { test } from "node:test";`);
  lines.push(`import assert from "node:assert/strict";`);
  lines.push("");

  if (problem.testCases.length > 0) {
    for (const tc of problem.testCases) {
      const inputArgs = (tc.input || []).map((v) => JSON.stringify(v)).join(", ");
      const expected = JSON.stringify(tc.expected);
      const name = tc.name || tc.id;
      lines.push(`test("${name}", () => {`);
      lines.push(`  assert.deepStrictEqual(${fn}(${inputArgs}), ${expected});`);
      lines.push(`});`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * 生成题目文件 (problem.mjs)
 */
function generateProblemFile(problem) {
  const lines = [];

  // 头部注释: 题目信息
  lines.push(`/**`);
  lines.push(
    ` * ${problem.leetcodeId}. ${problem.title} (${problem.titleEn})`
  );
  lines.push(` * 难度: ${problem.difficulty}`);
  lines.push(` *`);

  if (problem.description) {
    for (const line of mdToComment(problem.description).split("\n")) {
      lines.push(` * ${line}`);
    }
  }

  if (problem.examples) {
    lines.push(` *`);
    for (const line of mdToComment(problem.examples).split("\n")) {
      lines.push(` * ${line}`);
    }
  }

  if (problem.constraints) {
    lines.push(` *`);
    lines.push(` * 约束条件:`);
    for (const line of mdToComment(problem.constraints).split("\n")) {
      lines.push(` * ${line}`);
    }
  }

  if (problem.hints.length > 0) {
    lines.push(` *`);
    lines.push(` * 提示:`);
    problem.hints.forEach((h, i) => {
      lines.push(` *   ${i + 1}. ${h}`);
    });
  }

  lines.push(` */`);
  lines.push("");

  // 函数模板: 将 JSDoc 注释和函数声明分开，确保 export 紧贴 function
  const code = problem.initialCode.trim();
  const jsdocMatch = code.match(/^(\/\*\*[\s\S]*?\*\/)\s*(function[\s\S]*)$/);
  if (jsdocMatch) {
    lines.push(jsdocMatch[1]);
    lines.push(`export ${jsdocMatch[2]}`);
  } else {
    lines.push(`export ${code}`);
  }
  lines.push("");

  // 测试
  lines.push(`// ---- 测试用例 ----`);
  lines.push(generateTests(problem, false));

  return lines.join("\n");
}

/**
 * 生成答案文件 (answer.mjs)
 */
function generateAnswerFile(problem) {
  const lines = [];

  lines.push(`/**`);
  lines.push(
    ` * ${problem.leetcodeId}. ${problem.title} (${problem.titleEn}) - 参考答案`
  );
  lines.push(` */`);
  lines.push("");
  const solCode = problem.solution.trim();
  const solJsdoc = solCode.match(/^(\/\*\*[\s\S]*?\*\/)\s*(function[\s\S]*)$/);
  if (solJsdoc) {
    lines.push(solJsdoc[1]);
    lines.push(`export ${solJsdoc[2]}`);
  } else {
    lines.push(`export ${solCode}`);
  }
  lines.push("");

  // 测试
  lines.push(`// ---- 测试用例 ----`);
  lines.push(generateTests(problem, true));

  return lines.join("\n");
}

// ====== 主流程 ======

// 先删除旧的 algorithm-learning 目录下的 .mjs 文件，保留目录结构
console.log("开始提取题目...\n");

let totalCount = 0;
const categoryCounters = {};

for (const file of PROBLEM_FILES) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.log(`  跳过: ${file} (不存在)`);
    continue;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const problems = extractProblems(source);
  console.log(`  ${file}: 提取到 ${problems.length} 道题`);

  for (const p of problems) {
    const dirName = CATEGORY_DIR_MAP[p.category] || "01-basic/array";

    // 每个分类内的序号
    if (!categoryCounters[dirName]) categoryCounters[dirName] = 0;
    categoryCounters[dirName]++;
    const num = String(categoryCounters[dirName]).padStart(2, "0");

    const outDir = path.join(OUT_DIR, dirName);
    fs.mkdirSync(outDir, { recursive: true });

    const baseName = `${num}-${p.id}`;
    const problemPath = path.join(outDir, `${baseName}.mjs`);
    const answerPath = path.join(outDir, `${baseName}.answer.mjs`);

    fs.writeFileSync(problemPath, generateProblemFile(p), "utf-8");
    fs.writeFileSync(answerPath, generateAnswerFile(p), "utf-8");
    totalCount++;
  }
}

console.log(`\n完成! 共生成 ${totalCount} 道题目 (每题 2 个文件: problem + answer)`);
console.log(`输出目录: ${OUT_DIR}`);

// 统计
console.log("\n各分类题目数:");
for (const [dir, count] of Object.entries(categoryCounters).sort()) {
  console.log(`  ${dir}: ${count} 题`);
}
