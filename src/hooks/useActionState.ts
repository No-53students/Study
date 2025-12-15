/**
 * useActionState Hook 实现
 *
 * 这是一个参考 React 源码实现的 useActionState hook
 * 用于管理表单 action 的状态，特别适用于处理异步操作
 *
 * React 源码位置: packages/react-dom/src/shared/ReactDOMFormActions.js
 *                packages/react-reconciler/src/ReactFiberHooks.js
 *
 * 精简说明:
 * - 移除了 SSR (Server Side Rendering) 相关逻辑
 *   原版支持服务端渲染时的状态序列化和恢复
 * - 移除了 Transition 优先级调度
 *   原版使用 startTransition 来降低更新优先级，避免阻塞用户交互
 * - 移除了 permalink 参数的完整处理
 *   原版 permalink 用于在 JS 加载前提供渐进增强的表单提交
 * - 简化了错误边界处理
 *   原版有更完善的错误捕获和边界传播机制
 */

import { useState, useCallback, useRef, useTransition } from "react";

/**
 * Action 函数的类型定义
 * @template State - 状态类型
 * @template Payload - action 接收的额外参数类型
 *
 * @param prevState - 上一次的状态值
 * @param payload - 传递给 action 的数据 (通常是 FormData)
 * @returns 新的状态值 (可以是 Promise 支持异步)
 */
type ActionFunction<State, Payload> = (
  prevState: State,
  payload: Payload
) => State | Promise<State>;

/**
 * useActionState 返回值的类型定义
 * @template State - 状态类型
 * @template Payload - payload 类型
 */
type UseActionStateReturn<State, Payload> = [
  state: State, // 当前状态
  dispatch: (payload: Payload) => void, // 触发 action 的函数
  isPending: boolean // 是否正在执行异步操作
];

/**
 * useActionState Hook
 *
 * 用于管理基于 action 的状态更新，特别适合表单提交场景
 *
 * 核心原理 (参考 React 源码):
 * 1. 使用 useState 存储当前状态
 * 2. 使用 useTransition 处理异步更新的 pending 状态
 *    (源码中使用的是更底层的 startTransition 和 isPending 标记)
 * 3. 通过 dispatch 函数封装 action 调用
 * 4. action 执行完成后更新状态
 *
 * 源码中的关键实现:
 * ```
 * // ReactFiberHooks.js 中的简化逻辑
 * function mountActionState(action, initialState, permalink) {
 *   // 创建状态 hook
 *   const stateHook = mountWorkInProgressHook();
 *   stateHook.memoizedState = initialState;
 *
 *   // 创建 action 队列 hook
 *   const actionQueueHook = mountWorkInProgressHook();
 *   const actionQueue = {
 *     state: initialState,
 *     dispatch: null,
 *     action: action,
 *     pending: null,
 *   };
 *
 *   // dispatch 函数绑定
 *   const dispatch = dispatchActionState.bind(null, fiber, actionQueue);
 *   actionQueue.dispatch = dispatch;
 *
 *   return [initialState, dispatch, false];
 * }
 * ```
 *
 * @template State - 状态类型
 * @template Payload - action payload 类型，默认为 FormData
 *
 * @param action - 处理状态更新的函数，接收 (prevState, payload) 返回新状态
 * @param initialState - 初始状态值
 * @param _permalink - 可选，用于渐进增强的 URL (本实现中未完整支持)
 *
 * @returns [state, dispatch, isPending] 元组
 *
 * @example
 * ```tsx
 * async function submitForm(prevState, formData) {
 *   const result = await api.submit(formData);
 *   return { success: true, data: result };
 * }
 *
 * function MyForm() {
 *   const [state, dispatch, isPending] = useActionState(submitForm, { success: false });
 *
 *   return (
 *     <form action={dispatch}>
 *       <input name="email" />
 *       <button disabled={isPending}>
 *         {isPending ? '提交中...' : '提交'}
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useActionState<State, Payload = FormData>(
  action: ActionFunction<State, Payload>,
  initialState: State,
  _permalink?: string
): UseActionStateReturn<State, Payload> {
  /**
   * 状态管理
   *
   * 源码中使用的是 Fiber 的 memoizedState 链表结构:
   * hook.memoizedState = initialState;
   * hook.baseState = initialState;
   *
   * 这里简化为 useState
   */
  const [state, setState] = useState<State>(initialState);

  /**
   * 使用 useTransition 管理 pending 状态
   *
   * 源码中的实现更复杂，使用了:
   * - ReactCurrentBatchConfig.transition 来标记过渡更新
   * - isPending 状态通过 updateReducerImpl 单独管理
   * - 支持多个 action 排队执行时的状态合并
   *
   * 精简内容:
   * - 原版会将多个 dispatch 调用合并到同一个 transition 中
   * - 原版有更细粒度的优先级控制 (Lane 机制)
   */
  const [isPending, startTransition] = useTransition();

  /**
   * 使用 ref 存储最新的 action 引用
   *
   * 源码中通过 actionQueue.action 存储:
   * const actionQueue = {
   *   state: initialState,
   *   dispatch: null,
   *   action: action,  // <-- action 引用
   *   pending: null,
   * };
   *
   * 这样做的目的是:
   * 1. 避免闭包陷阱，始终使用最新的 action
   * 2. 支持 action 函数在组件重渲染时更新
   */
  const actionRef = useRef(action);
  actionRef.current = action;

  /**
   * dispatch 函数 - 触发 action 执行
   *
   * 源码中的实现 (dispatchActionState):
   * ```
   * function dispatchActionState(fiber, actionQueue, payload) {
   *   // 1. 创建更新对象
   *   const update = {
   *     payload,
   *     next: null,
   *   };
   *
   *   // 2. 将更新加入队列
   *   const pending = actionQueue.pending;
   *   if (pending === null) {
   *     update.next = update; // 循环链表
   *   } else {
   *     update.next = pending.next;
   *     pending.next = update;
   *   }
   *   actionQueue.pending = update;
   *
   *   // 3. 在 transition 中执行
   *   startTransition(() => {
   *     // 执行 action 并更新状态
   *   });
   * }
   * ```
   *
   * 精简内容:
   * - 移除了更新队列的链表结构 (用于批量处理多个 dispatch)
   * - 移除了 action 的排队机制 (原版支持并发调用时的顺序执行)
   * - 移除了 entangle 逻辑 (用于协调多个相关 transition)
   */
  const dispatch = useCallback((payload: Payload) => {
    /**
     * 使用 startTransition 包裹状态更新
     *
     * 作用:
     * 1. 将更新标记为"过渡"优先级，不会阻塞用户输入
     * 2. 自动设置 isPending = true 直到更新完成
     * 3. 支持 Suspense 边界的 pending 状态展示
     *
     * 源码中的额外处理:
     * - 会设置 ReactCurrentBatchConfig.transition
     * - 通过 Lane 机制分配更新优先级
     * - 支持中断和恢复
     */
    startTransition(async () => {
      try {
        /**
         * 执行 action 函数
         *
         * 源码中的执行逻辑:
         * ```
         * const returnValue = action(prevState, payload);
         * if (returnValue !== null && typeof returnValue === 'object' &&
         *     typeof returnValue.then === 'function') {
         *   // 处理 Promise
         *   const thenable = returnValue;
         *   // ... 异步处理
         * }
         * ```
         *
         * 这里简化:
         * - 直接 await 处理，不区分同步/异步
         * - 移除了 thenable 的特殊处理逻辑
         */
        const result = await actionRef.current(state, payload);

        /**
         * 更新状态
         *
         * 源码中通过 dispatchSetState 更新:
         * dispatchSetState(fiber, queue, result);
         *
         * 这里简化为直接调用 setState
         */
        setState(result);
      } catch (error) {
        /**
         * 错误处理
         *
         * 源码中的错误处理更复杂:
         * 1. 会将错误传播到最近的错误边界
         * 2. 支持 onCaughtError 回调
         * 3. 会记录错误到开发者工具
         *
         * 精简内容:
         * - 移除了错误边界的自动传播
         * - 移除了 onCaughtError 回调支持
         */
        console.error("Action execution failed:", error);
        throw error;
      }
    });
  }, [state]); // 依赖 state 以获取最新值

  /**
   * 返回值元组
   *
   * 源码中的返回处理:
   * ```
   * // mount 阶段
   * return [initialState, dispatch, false];
   *
   * // update 阶段
   * return [newState, dispatch, isPending];
   * ```
   *
   * isPending 的计算在源码中更复杂:
   * - 需要检查 actionQueue.pending 是否为空
   * - 需要检查当前是否在 transition 中
   */
  return [state, dispatch, isPending];
}

/**
 * 导出默认
 */
export default useActionState;

/**
 * ============================================
 * 附录: React 源码中的关键概念解释
 * ============================================
 *
 * 1. Fiber 架构
 *    - React 内部使用 Fiber 节点树来表示组件
 *    - 每个 hook 存储在 Fiber.memoizedState 链表中
 *    - useActionState 会创建多个 hook 节点 (state hook + action queue hook)
 *
 * 2. Lane 优先级
 *    - React 使用 Lane 模型来管理更新优先级
 *    - Transition 更新被分配较低的 Lane
 *    - 这允许高优先级更新 (如用户输入) 中断低优先级更新
 *
 * 3. Action Queue
 *    - 源码中使用循环链表存储待处理的 action
 *    - 支持批量处理和顺序执行
 *    - 每个 action 完成后会检查队列中是否有更多待处理项
 *
 * 4. Entanglement (纠缠)
 *    - 用于协调多个相关的 transition 更新
 *    - 确保相关更新在同一批次中处理
 *    - 防止状态不一致
 *
 * 5. Progressive Enhancement (渐进增强)
 *    - permalink 参数用于在 JS 未加载时提供表单提交 URL
 *    - 表单可以在无 JS 情况下也能工作
 *    - JS 加载后会拦截表单提交并使用 action 处理
 */
