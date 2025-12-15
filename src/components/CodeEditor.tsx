"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// 动态导入 Monaco Editor 避免 SSR 问题
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center bg-zinc-900">
      <div className="text-zinc-400">加载编辑器中...</div>
    </div>
  ),
});

interface TestCase {
  input: string;
  expected: string;
}

interface CodeEditorProps {
  initialCode: string;
  testCases?: TestCase[];
  height?: string;
}

export function CodeEditor({
  initialCode,
  testCases = [],
  height = "400px",
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [testResults, setTestResults] = useState<
    { passed: boolean; input: string; expected: string; actual: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setError("");
    setTestResults([]);

    await new Promise((resolve) => setTimeout(resolve, 10));

    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(
            args
              .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
              )
              .join(" ")
          );
        },
        error: (...args: unknown[]) => {
          logs.push(`[Error] ${args.map((arg) => String(arg)).join(" ")}`);
        },
        warn: (...args: unknown[]) => {
          logs.push(`[Warn] ${args.map((arg) => String(arg)).join(" ")}`);
        },
        info: (...args: unknown[]) => {
          logs.push(`[Info] ${args.map((arg) => String(arg)).join(" ")}`);
        },
        table: (data: unknown) => {
          logs.push(JSON.stringify(data, null, 2));
        },
      };

      const wrappedCode = `
        return (async () => {
          ${code}
          return typeof solution !== "undefined" ? solution : null;
        })();
      `;

      const fn = new Function(
        "console",
        "setTimeout",
        "setInterval",
        "clearTimeout",
        "clearInterval",
        "Promise",
        wrappedCode
      );
      const solution = await fn(
        customConsole,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval,
        Promise
      );

      if (testCases.length > 0 && solution) {
        const results = await Promise.all(
          testCases.map(async (tc) => {
            try {
              const input = JSON.parse(tc.input);
              const args = Array.isArray(input) ? input : [input];
              let actual = solution(...args);

              if (actual instanceof Promise) {
                actual = await actual;
              }

              const actualStr = JSON.stringify(actual);
              const passed = actualStr === tc.expected;
              return {
                passed,
                input: tc.input,
                expected: tc.expected,
                actual: actualStr,
              };
            } catch (e) {
              return {
                passed: false,
                input: tc.input,
                expected: tc.expected,
                actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
              };
            }
          })
        );
        setTestResults(results);
      }

      setOutput(logs.join("\n"));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsRunning(false);
    }
  }, [code, testCases]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setError("");
    setTestResults([]);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const passedCount = testResults.filter((r) => r.passed).length;

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      {/* 工具栏 */}
      <div className="flex items-center justify-between bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">JavaScript</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyCode}
            className="rounded bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            {copied ? "已复制!" : "复制"}
          </button>
          <button
            onClick={resetCode}
            className="rounded bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            重置
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="rounded bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {isRunning ? "运行中..." : "▶ 运行"}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height={height}
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
        }}
      />

      {/* 输出区 */}
      {(output || error || testResults.length > 0) && (
        <div className="border-t border-zinc-700 bg-zinc-900 p-4">
          {/* 测试结果 */}
          {testResults.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-white">测试结果:</span>
                <span
                  className={`text-sm ${
                    passedCount === testResults.length
                      ? "text-green-400"
                      : "text-amber-400"
                  }`}
                >
                  {passedCount}/{testResults.length} 通过
                </span>
              </div>
              <div className="space-y-2">
                {testResults.map((result, i) => (
                  <div
                    key={i}
                    className={`rounded p-2 text-xs ${
                      result.passed
                        ? "bg-green-900/30 text-green-300"
                        : "bg-red-900/30 text-red-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{result.passed ? "✓" : "✗"}</span>
                      <span>测试 {i + 1}</span>
                    </div>
                    <div className="mt-1 font-mono">
                      <div>输入: {result.input}</div>
                      <div>期望: {result.expected}</div>
                      <div>输出: {result.actual}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 控制台输出 */}
          {output && (
            <div>
              <div className="mb-1 text-sm text-zinc-400">控制台输出:</div>
              <pre className="whitespace-pre-wrap text-sm text-white">{output}</pre>
            </div>
          )}

          {/* 错误信息 */}
          {error && (
            <div>
              <div className="mb-1 text-sm text-red-400">错误:</div>
              <pre className="whitespace-pre-wrap text-sm text-red-300">{error}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
