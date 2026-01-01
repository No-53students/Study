/**
 * 学习路线图数据导出
 */

import { LearningPath } from "../../types/roadmap";
import { frontend50Path } from "./frontend-50";

// 所有可用的学习路线
export const roadmaps: LearningPath[] = [
  frontend50Path,
];

// 通过ID获取路线
export function getRoadmapById(id: string): LearningPath | undefined {
  return roadmaps.find(r => r.id === id);
}

// 获取所有路线
export function getAllRoadmaps(): LearningPath[] {
  return roadmaps;
}

// 导出单个路线
export { frontend50Path };

// 重新导出辅助函数
export {
  calculatePathProgress,
  getDayProblemIds,
  getStageProblemIds,
  isStageUnlocked,
} from "./frontend-50";
