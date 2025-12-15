import { HookPageLayout } from "@/components/HookPageLayout";
import ChildrenExamples from "./components/ChildrenExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/children/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function ChildrenPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Children"
      description="children 是一个特殊的 prop，用于接收组件标签之间的内容，实现灵活的组件组合。"
      markdown={markdown}
    >
      <ChildrenExamples />
    </HookPageLayout>
  );
}
