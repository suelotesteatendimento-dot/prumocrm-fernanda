import { PipelineView } from "@/components/pipeline/pipeline-view";
import { SupabaseSetupCard } from "@/components/app/supabase-setup-card";
import { getLeads } from "@/lib/leads/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function PipelinePage() {
  if (!isSupabaseConfigured()) {
    return (
      <SupabaseSetupCard
        title="Configure o Supabase para ativar o pipeline"
        description="Com a tabela `leads` criada, o kanban passa a refletir o funil comercial real."
      />
    );
  }

  const leads = await getLeads();

  return <PipelineView leads={leads} />;
}
