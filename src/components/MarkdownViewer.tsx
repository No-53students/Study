"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义代码块样式
          code({ className, children, ...props }) {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-emerald-600 dark:text-emerald-400 border border-zinc-200/50 dark:border-zinc-700/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // 自定义代码块容器
          pre({ children }) {
            return (
              <pre className="rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 overflow-x-auto border border-zinc-800/50 shadow-sm">
                {children}
              </pre>
            );
          },
          // 自定义表格样式
          table({ children }) {
            return (
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700/50 my-4">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-zinc-50 dark:bg-zinc-800/50">{children}</thead>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">{children}</th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">{children}</td>
            );
          },
          // 自定义链接样式
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline decoration-blue-500/30 underline-offset-2 transition-colors inline-flex items-center gap-0.5"
              >
                {children}
                <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            );
          },
          // 自定义引用样式
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/10 pl-4 py-2 pr-4 my-4 rounded-r-lg text-zinc-600 dark:text-zinc-400 italic">
                {children}
              </blockquote>
            );
          },
          // 自定义分割线样式
          hr() {
            return (
              <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
            );
          },
          // 自定义列表样式
          ul({ children }) {
            return (
              <ul className="my-4 space-y-2 list-none">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="my-4 space-y-2 list-none counter-reset-item">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return (
              <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
                {children}
              </li>
            );
          },
          // 自定义标题样式
          h1({ children }) {
            return (
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-700/50">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-blue-500" />
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mt-5 mb-2">
                {children}
              </h3>
            );
          },
          // 自定义强调样式
          strong({ children }) {
            return (
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {children}
              </strong>
            );
          },
          em({ children }) {
            return (
              <em className="italic text-zinc-600 dark:text-zinc-400">
                {children}
              </em>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
