"use client";

import { useState } from "react";
import { ThinkingCheckpoint } from "../../types";

interface ThinkingCheckpointsProps {
  checkpoints: ThinkingCheckpoint[];
}

/**
 * 思维检查点组件 - 验证理解程度
 */
export function ThinkingCheckpoints({ checkpoints }: ThinkingCheckpointsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentCheckpoint = checkpoints[currentIndex];
  const isCorrect = selectedOption === currentCheckpoint.correctAnswer;
  const isComplete = currentIndex >= checkpoints.length;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
  };

  if (isComplete) {
    const percentage = Math.round((correctCount / checkpoints.length) * 100);
    const isExcellent = percentage >= 80;

    return (
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
        <div className="text-center">
          <div className={`text-6xl mb-4 ${isExcellent ? "" : "grayscale"}`}>
            {isExcellent ? "🏆" : "📚"}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {isExcellent ? "太棒了！" : "继续加油！"}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            你答对了 {correctCount} / {checkpoints.length} 题（{percentage}%）
          </p>

          {/* 进度条 */}
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-6 max-w-xs mx-auto">
            <div
              className={`h-full transition-all duration-500 ${
                isExcellent
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-yellow-500 to-orange-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
          >
            再试一次
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
      {/* 标题和进度 */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-700/50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          理解检验
        </h3>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {currentIndex + 1} / {checkpoints.length}
        </span>
      </div>

      {/* 问题 */}
      <div className="p-6">
        <div className="text-lg font-medium text-white mb-6">
          {currentCheckpoint.question}
        </div>

        {/* 选项 */}
        <div className="space-y-3">
          {currentCheckpoint.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isAnswer = index === currentCheckpoint.correctAnswer;

            let optionClass = "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600";
            if (showResult) {
              if (isAnswer) {
                optionClass = "bg-green-500/20 border-green-500";
              } else if (isSelected && !isAnswer) {
                optionClass = "bg-red-500/20 border-red-500";
              }
            } else if (isSelected) {
              optionClass = "bg-cyan-500/20 border-cyan-500";
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedOption(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg border text-left transition-all ${optionClass} ${
                  showResult ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      showResult && isAnswer
                        ? "bg-green-500 text-white"
                        : showResult && isSelected && !isAnswer
                        ? "bg-red-500 text-white"
                        : isSelected
                        ? "bg-cyan-500 text-white"
                        : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {showResult && isAnswer ? "✓" : showResult && isSelected && !isAnswer ? "✗" : String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-zinc-200">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 解释 */}
        {showResult && (
          <div
            className={`mt-4 p-4 rounded-lg border animate-fadeIn ${
              isCorrect
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                {isCorrect ? "✓" : "✗"}
              </span>
              <div>
                <span className={`text-sm font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                  {isCorrect ? "正确！" : "错误"}
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 mt-1">{currentCheckpoint.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 按钮 */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-700/50 bg-black/20 flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            提交答案
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
          >
            {currentIndex < checkpoints.length - 1 ? "下一题" : "查看结果"}
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
