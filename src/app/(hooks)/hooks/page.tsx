import { getAppRoutes, ROUTE_GROUPS } from "@/lib/routes";
import { GroupPageLayout } from "@/components/GroupPageLayout";

export default function HooksPage() {
  const routes = getAppRoutes("hooks");
  const groupConfig = ROUTE_GROUPS.find((g) => g.name === "hooks")!;

  return (
    <GroupPageLayout
      title={groupConfig.title}
      subtitle={groupConfig.subtitle}
      icon={groupConfig.icon}
      routes={routes}
      backHref="/"
      backLabel="返回首页"
    />
  );
}
