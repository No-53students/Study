import { HookPageLayout } from "@/components/HookPageLayout";
import UseEffectExamples from "./components/UseEffectExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-effect/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseEffectPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useEffect"
      description="useEffect 用于处理副作用，如数据获取、订阅、手动 DOM 操作等。"
      markdown={markdown}
    >
      <UseEffectExamples />
    </HookPageLayout>
  );
}
