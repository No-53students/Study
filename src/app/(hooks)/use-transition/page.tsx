import { HookPageLayout } from "@/components/HookPageLayout";
import UseTransitionExamples from "./components/UseTransitionExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-transition/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseTransitionPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useTransition"
      description="useTransition 用于将状态更新标记为非紧急的过渡更新，保持 UI 响应性。"
      markdown={markdown}
    >
      <UseTransitionExamples />
    </HookPageLayout>
  );
}
