const fs = require('fs');
const path = require('path');

const dataDir = 'src/app/(algorithms)/problems/data';
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let totalSolutions = 0;
let solutionsWithAnimation = 0;
let missing = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');

  // 找到每个题目
  const problemRegex = /{\s*id:\s*["']([^"']+)["']/g;
  let problemMatch;
  let problemPositions = [];

  while ((problemMatch = problemRegex.exec(content)) !== null) {
    problemPositions.push({ id: problemMatch[1], start: problemMatch.index });
  }

  // 为每个题目找到其 solutions 范围
  problemPositions.forEach((problem, idx) => {
    const start = problem.start;
    const end = idx < problemPositions.length - 1 ? problemPositions[idx + 1].start : content.length;
    const problemBlock = content.substring(start, end);

    // 找 solutions 数组的内容
    const solutionsMatch = problemBlock.match(/solutions:\s*\[([\s\S]*?)\],?\s*(?:testCases|$)/);
    if (!solutionsMatch) return;

    const solutionsBlock = solutionsMatch[1];

    // 分割出每个 solution 对象
    // 方法：找到所有的 { name: "xxx" 开头的块
    const solutionBlocks = solutionsBlock.split(/(?={\s*name:\s*["'])/);

    solutionBlocks.forEach(block => {
      if (!block.trim() || !block.includes('name:')) return;

      const nameMatch = block.match(/name:\s*["']([^"']+)["']/);
      if (!nameMatch) return;

      totalSolutions++;
      const hasAnimation = block.includes('animation:');

      if (hasAnimation) {
        solutionsWithAnimation++;
      } else {
        missing.push({
          file,
          id: problem.id,
          solution: nameMatch[1]
        });
      }
    });
  });
});

console.log('=== 解法动画统计 ===');
console.log('总解法数:', totalSolutions);
console.log('有动画:', solutionsWithAnimation);
console.log('缺少动画:', missing.length);
console.log('');
console.log('=== 缺少动画的解法 ===');

// 按文件分组
const byFile = {};
missing.forEach(m => {
  if (!byFile[m.file]) byFile[m.file] = [];
  byFile[m.file].push(m);
});

Object.keys(byFile).sort().forEach(file => {
  console.log(`\n【${file}】`);
  const byProblem = {};
  byFile[file].forEach(m => {
    if (!byProblem[m.id]) byProblem[m.id] = [];
    byProblem[m.id].push(m.solution);
  });
  Object.keys(byProblem).forEach(id => {
    console.log(`  ${id}:`);
    byProblem[id].forEach(sol => {
      console.log(`    - ${sol}`);
    });
  });
});
