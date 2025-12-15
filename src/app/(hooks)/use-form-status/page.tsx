import { HookPageLayout } from "@/components/HookPageLayout";
import UseFormStatusExamples from "./components/UseFormStatusExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-form-status/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseFormStatusPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useFormStatus"
      description="useFormStatus 用于获取父级表单的提交状态，必须在 form 的子组件中使用。"
      markdown={markdown}
    >
      <UseFormStatusExamples />
    </HookPageLayout>
  );
}
