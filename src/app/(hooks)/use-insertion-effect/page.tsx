import { HookPageLayout } from "@/components/HookPageLayout";
import UseInsertionEffectExamples from "./components/UseInsertionEffectExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-insertion-effect/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseInsertionEffectPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useInsertionEffect"
      description="useInsertionEffect 用于在 DOM 变更之前注入样式，主要面向 CSS-in-JS 库作者。"
      markdown={markdown}
    >
      <UseInsertionEffectExamples />
    </HookPageLayout>
  );
}
