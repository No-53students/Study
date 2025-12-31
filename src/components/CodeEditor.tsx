"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// 动态导入 Monaco Editor 避免 SSR 问题
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center bg-zinc-900/95">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-2 border-zinc-700"></div>
          <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
        </div>
        <span className="text-sm text-zinc-400">加载编辑器中...</span>
      </div>
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
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-lg" role="region" aria-label="代码编辑器">
      {/* 工具栏 */}
      <div className="flex items-center justify-between bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/80 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700/50" role="toolbar" aria-label="编辑器工具栏">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 dark:bg-amber-500/20" aria-hidden="true">
              <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JavaScript</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-700/80 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={copied ? "代码已复制" : "复制代码"}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-emerald-600 dark:text-emerald-400">已复制</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/>
                </svg>
                <span>复制</span>
              </>
            )}
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-700/80 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="重置代码"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
            <span>重置</span>
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-1.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-700 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            aria-label={isRunning ? "正在运行代码" : "运行代码"}
          >
            {isRunning ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>运行中...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>运行</span>
              </>
            )}
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
        <div className="border-t border-zinc-700/50 bg-zinc-900/95 p-4" role="region" aria-label="运行结果">
          {/* 测试结果 */}
          {testResults.length > 0 && (
            <div className="mb-4" role="region" aria-label="测试结果">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    passedCount === testResults.length ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} aria-hidden="true">
                    {passedCount === testResults.length ? (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : (
                      <span className="text-xs font-bold text-white">{passedCount}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-white">测试结果</span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    passedCount === testResults.length
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {passedCount}/{testResults.length} 通过
                </span>
              </div>
              <ul className="space-y-2" role="list" aria-label="测试用例列表">
                {testResults.map((result, i) => (
                  <li
                    key={i}
                    className={`rounded-xl p-3 text-sm border ${
                      result.passed
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-red-500/10 border-red-500/20"
                    }`}
                    role="listitem"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        result.passed ? 'bg-emerald-500' : 'bg-red-500'
                      } text-white`} aria-hidden="true">
                        {result.passed ? (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        )}
                      </span>
                      <span className={`font-medium ${result.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                        测试 {i + 1} - {result.passed ? '通过' : '失败'}
                      </span>
                    </div>
                    <div className="font-mono text-xs space-y-1 ml-7">
                      <div className="flex gap-2">
                        <span className="text-zinc-500 w-12">输入:</span>
                        <span className="text-zinc-300">{result.input}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-zinc-500 w-12">期望:</span>
                        <span className="text-zinc-300">{result.expected}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-zinc-500 w-12">输出:</span>
                        <span className={result.passed ? 'text-emerald-400' : 'text-red-400'}>{result.actual}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 控制台输出 */}
          {output && (
            <div className="mb-3" role="log" aria-label="控制台输出">
              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
                </svg>
                <span>控制台输出</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-zinc-200 font-mono bg-zinc-800/50 rounded-lg p-3" aria-live="polite">{output}</pre>
            </div>
          )}

          {/* 错误信息 */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4" role="alert" aria-live="assertive">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>错误</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-red-300 font-mono">{error}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
