import type { DashboardMetric } from "@/lib/dashboard/summary";
import { MetricCard } from "@/components/dashboard/metric-card";

export function MetricsGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.key}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          accent={metric.accent}
        />
      ))}
    </section>
  );
}
