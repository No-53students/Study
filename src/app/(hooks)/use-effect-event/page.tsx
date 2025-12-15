import { HookPageLayout } from "@/components/HookPageLayout";
import UseEffectEventExamples from "./components/UseEffectEventExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-effect-event/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseEffectEventPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useEffectEvent"
      description="useEffectEvent 用于从 Effect 中提取非响应式逻辑，避免不必要的重执行。"
      markdown={markdown}
    >
      <UseEffectEventExamples />
    </HookPageLayout>
  );
}
