import type { Lead } from "@/lib/types/lead";
import { formatDateOnly } from "@/lib/utils/date";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";

export function RecentLeadsList({ leads }: { leads: Lead[] }) {
  return (
    <Card className="h-full border-brand-300/50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
          Leads recentes
        </CardTitle>
        <CardDescription>
          Últimos registros adicionados ao CRM.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-brand-300/40 bg-white/70 p-4 shadow-[0_12px_24px_-24px_rgba(17,17,17,0.14)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-brand-950">{lead.nome}</p>
                  <p className="mt-1 text-sm text-brand-600">{lead.procedimento}</p>
                </div>
                <LeadStatusBadge status={lead.status} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-600">
                <span>{lead.origem}</span>
                <span>{lead.telefone}</span>
                <span>{formatDateOnly(lead.data_entrada)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-300/50 bg-white/52 p-8 text-center text-sm leading-6 text-brand-600">
            Nenhum lead encontrado para exibir no dashboard.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
