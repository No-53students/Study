import { getAppRoutes, ROUTE_GROUPS } from "@/lib/routes";
import { GroupPageLayout } from "@/components/GroupPageLayout";

export default function AlgorithmsPage() {
  const routes = getAppRoutes("algorithms");
  const groupConfig = ROUTE_GROUPS.find((g) => g.name === "algorithms")!;

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
