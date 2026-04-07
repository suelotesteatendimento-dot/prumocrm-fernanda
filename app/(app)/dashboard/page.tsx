import { SupabaseSetupCard } from "@/components/app/supabase-setup-card";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { getDashboardSummary } from "@/lib/dashboard/summary";
import { getLeads } from "@/lib/leads/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SupabaseSetupCard
        title="Configure o Supabase para ativar o dashboard"
        description="Com a tabela `leads` criada, o dashboard passa a calcular todas as métricas automaticamente."
      />
    );
  }

  const leads = await getLeads();
  const summary = getDashboardSummary(leads);

  return <DashboardView summary={summary} />;
}
