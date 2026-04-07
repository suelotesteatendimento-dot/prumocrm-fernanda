import type { DashboardSummary } from "@/lib/dashboard/summary";
import { DashboardHighlight } from "@/components/dashboard/dashboard-highlight";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { RecentLeadsList } from "@/components/dashboard/recent-leads-list";
import { StatusChart } from "@/components/dashboard/status-chart";

export function DashboardView({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="space-y-6">
      <DashboardHighlight
        totalLeads={summary.totalLeads}
        conversionRate={summary.conversionRate}
      />
      <MetricsGrid metrics={summary.metrics} />
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <StatusChart data={summary.chartData} />
        <RecentLeadsList leads={summary.recentLeads} />
      </section>
    </div>
  );
}
