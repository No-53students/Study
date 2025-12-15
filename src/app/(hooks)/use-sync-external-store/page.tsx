import { HookPageLayout } from "@/components/HookPageLayout";
import UseSyncExternalStoreExamples from "./components/UseSyncExternalStoreExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-sync-external-store/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseSyncExternalStorePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useSyncExternalStore"
      description="useSyncExternalStore 用于安全地订阅外部数据源，确保并发渲染的一致性。"
      markdown={markdown}
    >
      <UseSyncExternalStoreExamples />
    </HookPageLayout>
  );
}
