"use client";

import { useState, useEffect, useCallback } from "react";
import { CompletedProblem, StudyStats, CategoryStat } from "../types/roadmap";

// 本地存储 key
const STORAGE_KEY = "algorithm-learning-progress";

// 存储数据结构
interface StorageData {
  completedProblems: CompletedProblemRecord[];
  lastUpdated: string;
  totalStudyMinutes: number;
  streak: number;
  lastStudyDate: string;
}

// 完成记录（简化版，用于存储）
interface CompletedProblemRecord {
  problemId: string;
  completedAt: string;
  timeSpentMinutes: number;
  attempts: number;
}

// 默认存储数据
const defaultStorageData: StorageData = {
  completedProblems: [],
  lastUpdated: new Date().toISOString(),
  totalStudyMinutes: 0,
  streak: 0,
  lastStudyDate: "",
};

/**
 * 学习进度追踪 Hook
 *
 * 功能：
 * 1. 跟踪题目完成状态
 * 2. 记录学习时间
 * 3. 计算连续学习天数
 * 4. 提供学习统计数据
 */
export function useProgress() {
  const [data, setData] = useState<StorageData>(defaultStorageData);
  const [isLoaded, setIsLoaded] = useState(false);

  // 加载数据
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // 兼容旧版本数据
        if (Array.isArray(parsed.completedProblems) && typeof parsed.completedProblems[0] === "string") {
          // 旧版本是字符串数组，转换为新格式
          const migrated: StorageData = {
            completedProblems: parsed.completedProblems.map((id: string) => ({
              problemId: id,
              completedAt: new Date().toISOString(),
              timeSpentMinutes: 0,
              attempts: 1,
            })),
            lastUpdated: parsed.lastUpdated || new Date().toISOString(),
            totalStudyMinutes: parsed.totalStudyMinutes || 0,
            streak: parsed.streak || 0,
            lastStudyDate: parsed.lastStudyDate || "",
          };
          setData(migrated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        } else {
          setData({ ...defaultStorageData, ...parsed });
        }
      } catch {
        setData(defaultStorageData);
      }
    }
    setIsLoaded(true);
  }, []);

  // 保存数据
  const saveData = useCallback((newData: StorageData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  // 获取已完成题目ID列表
  const completedProblemIds = data.completedProblems.map((p) => p.problemId);

  // 检查题目是否已完成
  const isProblemCompleted = useCallback(
    (problemId: string) => completedProblemIds.includes(problemId),
    [completedProblemIds]
  );

  // 标记题目完成
  const markProblemComplete = useCallback(
    (problemId: string, timeSpentMinutes: number = 0) => {
      if (isProblemCompleted(problemId)) return;

      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      // 计算连续天数
      let newStreak = data.streak;
      if (data.lastStudyDate === today) {
        // 今天已经学习过，不更新 streak
      } else if (data.lastStudyDate === yesterday) {
        // 昨天学习过，streak + 1
        newStreak = data.streak + 1;
      } else {
        // 中断了，重置为 1
        newStreak = 1;
      }

      const newRecord: CompletedProblemRecord = {
        problemId,
        completedAt: new Date().toISOString(),
        timeSpentMinutes,
        attempts: 1,
      };

      const newData: StorageData = {
        completedProblems: [...data.completedProblems, newRecord],
        lastUpdated: new Date().toISOString(),
        totalStudyMinutes: data.totalStudyMinutes + timeSpentMinutes,
        streak: newStreak,
        lastStudyDate: today,
      };

      saveData(newData);
    },
    [data, isProblemCompleted, saveData]
  );

  // 取消完成标记
  const unmarkProblemComplete = useCallback(
    (problemId: string) => {
      const newData: StorageData = {
        ...data,
        completedProblems: data.completedProblems.filter(
          (p) => p.problemId !== problemId
        ),
        lastUpdated: new Date().toISOString(),
      };
      saveData(newData);
    },
    [data, saveData]
  );

  // 切换完成状态
  const toggleProblemComplete = useCallback(
    (problemId: string) => {
      if (isProblemCompleted(problemId)) {
        unmarkProblemComplete(problemId);
      } else {
        markProblemComplete(problemId);
      }
    },
    [isProblemCompleted, markProblemComplete, unmarkProblemComplete]
  );

  // 获取学习统计
  const getStats = useCallback((): Partial<StudyStats> => {
    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000);

    // 计算本周完成的题目
    const thisWeekProblems = data.completedProblems.filter(
      (p) => new Date(p.completedAt) >= weekAgo
    );

    // 计算学习天数
    const studyDays = new Set(
      data.completedProblems.map((p) =>
        new Date(p.completedAt).toISOString().split("T")[0]
      )
    );

    return {
      completedProblems: data.completedProblems.length,
      currentStreak: data.streak,
      totalStudyDays: studyDays.size,
      averageTimePerProblem:
        data.completedProblems.length > 0
          ? Math.round(
              data.totalStudyMinutes / data.completedProblems.length
            )
          : 0,
    };
  }, [data]);

  // 重置进度
  const resetProgress = useCallback(() => {
    if (confirm("确定要重置所有学习进度吗？此操作不可撤销。")) {
      saveData(defaultStorageData);
    }
  }, [saveData]);

  return {
    isLoaded,
    completedProblemIds,
    isProblemCompleted,
    markProblemComplete,
    unmarkProblemComplete,
    toggleProblemComplete,
    getStats,
    resetProgress,
    streak: data.streak,
    totalStudyMinutes: data.totalStudyMinutes,
  };
}

/**
 * 计时器 Hook，用于记录做题时间
 */
export function useTimer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const start = useCallback(() => {
    setStartTime(Date.now());
    setIsRunning(true);
    setElapsedSeconds(0);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (startTime) {
      setIsRunning(true);
    }
  }, [startTime]);

  const stop = useCallback(() => {
    setIsRunning(false);
    const finalSeconds = elapsedSeconds;
    setStartTime(null);
    setElapsedSeconds(0);
    return Math.ceil(finalSeconds / 60); // 返回分钟数
  }, [elapsedSeconds]);

  const reset = useCallback(() => {
    setStartTime(null);
    setIsRunning(false);
    setElapsedSeconds(0);
  }, []);

  // 格式化时间显示
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  return {
    elapsedSeconds,
    isRunning,
    formattedTime: formatTime(elapsedSeconds),
    start,
    pause,
    resume,
    stop,
    reset,
  };
}

/**
 * 复习提醒 Hook
 * 基于艾宾浩斯遗忘曲线
 */
export function useReviewReminder() {
  const { completedProblemIds } = useProgress();

  // 艾宾浩斯复习间隔（天）
  const reviewIntervals = [1, 2, 4, 7, 15, 30];

  const getProblemsToReview = useCallback(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return parsed.completedProblems
        .filter((p: CompletedProblemRecord) => {
          const completedDate = new Date(p.completedAt);
          const daysSince = Math.floor(
            (today.getTime() - completedDate.getTime()) / 86400000
          );

          // 检查是否到了复习时间点
          return reviewIntervals.some(
            (interval) =>
              daysSince >= interval && daysSince < interval + 1
          );
        })
        .map((p: CompletedProblemRecord) => p.problemId);
    } catch {
      return [];
    }
  }, []);

  return {
    getProblemsToReview,
  };
}
