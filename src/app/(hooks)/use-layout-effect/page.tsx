import { HookPageLayout } from "@/components/HookPageLayout";
import UseLayoutEffectExamples from "./components/UseLayoutEffectExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-layout-effect/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseLayoutEffectPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useLayoutEffect"
      description="useLayoutEffect 在浏览器绘制之前同步执行，用于 DOM 测量和同步更新。"
      markdown={markdown}
    >
      <UseLayoutEffectExamples />
    </HookPageLayout>
  );
}
