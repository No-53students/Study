// 算法动画组件库导出
export { ArrayVisualizer, type ArrayVisualizerProps } from './ArrayVisualizer';
export { TwoPointersAnimation, type TwoPointersAnimationProps, type TwoPointersStep } from './TwoPointersAnimation';
export { LinkedListAnimation, type LinkedListAnimationProps, type LinkedListStep, type LinkedListNode } from './LinkedListAnimation';
export { TreeAnimation, type TreeAnimationProps, type TreeStep, type TreeNode } from './TreeAnimation';
export { MatrixAnimation, type MatrixAnimationProps, type MatrixStep } from './MatrixAnimation';
export { SlidingWindowAnimation, type SlidingWindowAnimationProps, type SlidingWindowStep } from './SlidingWindowAnimation';
export { StackAnimation, type StackAnimationProps, type StackStep } from './StackAnimation';
export { HashTableAnimation, type HashTableAnimationProps, type HashTableStep, type HashEntry } from './HashTableAnimation';
export { useAnimationControls, type AnimationState, type AnimationControls } from './useAnimationControls';

// 代码同步动画组件（P0优化：动画代码联动）
export {
  CodeSyncAnimation,
  createVariable,
  createStep,
  type CodeSyncAnimationProps,
  type CodeSyncStep,
} from './CodeSyncAnimation';

export {
  VariableWatcher,
  ExecutionResult,
  type VariableWatcherProps,
  type VariableValue,
  type ExecutionResultProps,
} from './VariableWatcher';

// 代码同步演示组件
export { CodeSyncDemo, QuickCodeSyncDemo, type CodeSyncDemoProps } from './CodeSyncDemo';
