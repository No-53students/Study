"use client";

import { useState } from "react";
import { SocraticQuestion } from "../../types";

interface SocraticQuestionsProps {
  questions: SocraticQuestion[];
}

const stageConfig = {
  understand: { label: "理解问题", color: "text-blue-400", bg: "bg-blue-500/20", icon: "📖" },
  plan: { label: "制定计划", color: "text-green-400", bg: "bg-green-500/20", icon: "🎯" },
  code: { label: "编写代码", color: "text-purple-400", bg: "bg-purple-500/20", icon: "💻" },
  optimize: { label: "优化改进", color: "text-orange-400", bg: "bg-orange-500/20", icon: "⚡" },
};

/**
 * 苏格拉底式提问组件 - 通过问题引导思考
 */
export function SocraticQuestions({ questions }: SocraticQuestionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = questions[currentIndex];
  const config = stageConfig[currentQuestion.stage];
  const progress = (answeredQuestions.size / questions.length) * 100;

  const handleNext = () => {
    setAnsweredQuestions((prev) => new Set([...prev, currentIndex]));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowHint(false);
    setShowAnswer(false);
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-700/50 overflow-hidden">
      {/* 标题和进度 */}
      <div className="p-4 border-b border-zinc-700/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
            <span className="text-2xl">🤔</span>
            思维引导
          </h3>
          <span className="text-sm text-zinc-400">
            {answeredQuestions.size} / {questions.length} 已思考
          </span>
        </div>

        {/* 进度条 */}
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 问题导航 */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-zinc-700/50 bg-black/20">
        {questions.map((q, index) => {
          const qConfig = stageConfig[q.stage];
          const isAnswered = answeredQuestions.has(index);
          const isCurrent = index === currentIndex;

          return (
            <button
              key={index}
              onClick={() => jumpToQuestion(index)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1 ${
                isCurrent
                  ? `${qConfig.bg} ${qConfig.color} ring-2 ring-offset-2 ring-offset-zinc-900 ring-cyan-500`
                  : isAnswered
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span>{isAnswered ? "✓" : qConfig.icon}</span>
              <span>{index + 1}</span>
            </button>
          );
        })}
      </div>

      {/* 当前问题 */}
      <div className="p-6">
        {/* 阶段标签 */}
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-xs ${config.bg} ${config.color}`}>
            {config.icon} {config.label}
          </span>
        </div>

        {/* 问题 */}
        <div className="text-xl font-medium text-white mb-6">
          {currentQuestion.question}
        </div>

        {/* 提示区域 */}
        <div className="space-y-3">
          {/* 提示按钮/内容 */}
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="w-full p-4 rounded-lg border border-dashed border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <span>💡</span>
                <span>需要提示吗？点击查看</span>
              </span>
            </button>
          ) : (
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 animate-fadeIn">
              <div className="flex items-start gap-2">
                <span className="text-yellow-400">💡</span>
                <div>
                  <span className="text-sm text-yellow-400 font-medium">提示</span>
                  <p className="text-zinc-300 mt-1">{currentQuestion.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* 答案按钮/内容 */}
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full p-4 rounded-lg border border-dashed border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <span>✨</span>
                <span>想好了？点击查看答案</span>
              </span>
            </button>
          ) : (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 animate-fadeIn">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✨</span>
                <div>
                  <span className="text-sm text-green-400 font-medium">答案</span>
                  <p className="text-zinc-300 mt-1">{currentQuestion.answer}</p>
                </div>
              </div>
            </div>
          )}

          {/* 洞见 */}
          {showAnswer && (
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30 animate-fadeIn">
              <div className="flex items-start gap-2">
                <span className="text-purple-400">🎓</span>
                <div>
                  <span className="text-sm text-purple-400 font-medium">这个问题想让你发现</span>
                  <p className="text-zinc-300 mt-1">{currentQuestion.insight}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 导航按钮 */}
      <div className="flex items-center justify-between p-4 border-t border-zinc-700/50 bg-black/20">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← 上一个
        </button>

        <span className="text-sm text-zinc-500">
          {currentIndex + 1} / {questions.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          下一个 →
        </button>
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
