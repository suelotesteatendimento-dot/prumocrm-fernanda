import type { Lead } from "@/lib/types/lead";
import type { LeadStatus } from "@/lib/validations/lead";

export type DashboardMetric = {
  key: string;
  title: string;
  value: string;
  description: string;
  accent?: "default" | "champagne";
};

export type DashboardChartItem = {
  status: LeadStatus;
  label: string;
  total: number;
};

export type DashboardSummary = {
  metrics: DashboardMetric[];
  chartData: DashboardChartItem[];
  recentLeads: Lead[];
  totalLeads: number;
  conversionRate: number;
};

const statusLabels: Record<LeadStatus, string> = {
  em_aberto: "Em aberto",
  follow_up: "Follow up",
  aprovado: "Aprovados",
  reprovado: "Reprovados"
};

export function getDashboardSummary(leads: Lead[]): DashboardSummary {
  const totalLeads = leads.length;
  const emAberto = leads.filter((lead) => lead.status === "em_aberto").length;
  const followUp = leads.filter((lead) => lead.status === "follow_up").length;
  const aprovados = leads.filter((lead) => lead.status === "aprovado").length;
  const reprovados = leads.filter((lead) => lead.status === "reprovado").length;
  const conversionRate = totalLeads > 0 ? (aprovados / totalLeads) * 100 : 0;

  return {
    metrics: [
      {
        key: "total",
        title: "Total de leads",
        value: String(totalLeads),
        description: "Todos os contatos registrados no CRM"
      },
      {
        key: "em_aberto",
        title: "Em aberto",
        value: String(emAberto),
        description: "Leads aguardando evolução comercial"
      },
      {
        key: "follow_up",
        title: "Follow up",
        value: String(followUp),
        description: "Contatos em acompanhamento ativo"
      },
      {
        key: "aprovados",
        title: "Aprovados",
        value: String(aprovados),
        description: "Leads convertidos em oportunidade fechada",
        accent: "champagne"
      },
      {
        key: "reprovados",
        title: "Reprovados",
        value: String(reprovados),
        description: "Contatos perdidos ou sem avanço"
      },
      {
        key: "conversao",
        title: "Taxa de conversão",
        value: `${conversionRate.toFixed(1)}%`,
        description: "Aprovados sobre o total de leads",
        accent: "champagne"
      }
    ],
    chartData: [
      { status: "em_aberto", label: statusLabels.em_aberto, total: emAberto },
      { status: "follow_up", label: statusLabels.follow_up, total: followUp },
      { status: "aprovado", label: statusLabels.aprovado, total: aprovados },
      { status: "reprovado", label: statusLabels.reprovado, total: reprovados }
    ],
    recentLeads: [...leads].slice(0, 5),
    totalLeads,
    conversionRate
  };
}
