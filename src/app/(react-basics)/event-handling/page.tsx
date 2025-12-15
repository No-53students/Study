import { HookPageLayout } from "@/components/HookPageLayout";
import EventHandlingExamples from "./components/EventHandlingExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/event-handling/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function EventHandlingPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="事件处理"
      description="React 事件处理让你响应用户交互，如点击、输入、提交等。"
      markdown={markdown}
    >
      <EventHandlingExamples />
    </HookPageLayout>
  );
}
