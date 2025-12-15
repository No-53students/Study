import { HookPageLayout } from "@/components/HookPageLayout";
import ErrorBoundaryExamples from "./components/ErrorBoundaryExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/error-boundary/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function ErrorBoundaryPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Error Boundary"
      description="Error Boundary 用于捕获子组件树中的 JavaScript 错误，显示备用 UI。"
      markdown={markdown}
    >
      <ErrorBoundaryExamples />
    </HookPageLayout>
  );
}
