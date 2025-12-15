import { HookPageLayout } from "@/components/HookPageLayout";
import FormsExamples from "./components/FormsExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/forms/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function FormsPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="表单处理"
      description="React 表单处理包括受控组件、非受控组件、表单验证等核心概念。"
      markdown={markdown}
    >
      <FormsExamples />
    </HookPageLayout>
  );
}
