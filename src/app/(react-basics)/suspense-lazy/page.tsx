import { HookPageLayout } from "@/components/HookPageLayout";
import SuspenseLazyExamples from "./components/SuspenseLazyExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/suspense-lazy/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function SuspenseLazyPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Suspense 与 lazy"
      description="Suspense 和 lazy 是 React 的代码分割和异步加载解决方案。"
      markdown={markdown}
    >
      <SuspenseLazyExamples />
    </HookPageLayout>
  );
}
