import { HookPageLayout } from "@/components/HookPageLayout";
import PortalExamples from "./components/PortalExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/portal/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function PortalPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Portal"
      description="Portal 提供了将子节点渲染到父组件 DOM 层次结构之外的方法。"
      markdown={markdown}
    >
      <PortalExamples />
    </HookPageLayout>
  );
}
