import { LeadsModule } from "@/components/leads/leads-module";
import { SupabaseSetupCard } from "@/components/app/supabase-setup-card";
import { getLeads } from "@/lib/leads/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function LeadsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SupabaseSetupCard
        title="Configure o Supabase para ativar os leads"
        description="Depois execute o SQL da tabela `leads` no editor SQL do Supabase."
      />
    );
  }

  const leads = await getLeads();

  return (
    <LeadsModule initialLeads={leads} />
  );
}
