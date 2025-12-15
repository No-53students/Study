import { HookPageLayout } from "@/components/HookPageLayout";
import ForwardRefExamples from "./components/ForwardRefExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/forward-ref/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function ForwardRefPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="forwardRef"
      description="forwardRef 允许组件将 ref 转发给子组件的 DOM 节点。"
      markdown={markdown}
    >
      <ForwardRefExamples />
    </HookPageLayout>
  );
}
