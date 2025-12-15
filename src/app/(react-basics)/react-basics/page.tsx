import { getAppRoutes, ROUTE_GROUPS } from "@/lib/routes";
import { GroupPageLayout } from "@/components/GroupPageLayout";

export default function ReactBasicsPage() {
  const routes = getAppRoutes("react-basics");
  const groupConfig = ROUTE_GROUPS.find((g) => g.name === "react-basics")!;

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
