import type { Lead } from "@/lib/types/lead";
import type { LeadStatus } from "@/lib/validations/lead";

export const pipelineStatuses: LeadStatus[] = [
  "em_aberto",
  "follow_up",
  "aprovado",
  "reprovado"
];

export const pipelineColumnMeta: Record<
  LeadStatus,
  { id: LeadStatus; title: string; description: string }
> = {
  em_aberto: {
    id: "em_aberto",
    title: "Em aberto",
    description: "Novos contatos e primeiras conversas"
  },
  follow_up: {
    id: "follow_up",
    title: "Follow up",
    description: "Leads em acompanhamento ativo"
  },
  aprovado: {
    id: "aprovado",
    title: "Aprovado",
    description: "Oportunidades convertidas"
  },
  reprovado: {
    id: "reprovado",
    title: "Reprovado",
    description: "Leads encerrados sem avanço"
  }
};

export type PipelineColumnData = {
  id: LeadStatus;
  title: string;
  description: string;
  leads: Lead[];
};

export function buildPipelineColumns(leads: Lead[]): PipelineColumnData[] {
  return pipelineStatuses.map((status) => ({
    ...pipelineColumnMeta[status],
    leads: leads.filter((lead) => lead.status === status)
  }));
}

export function moveLeadBetweenColumns(
  columns: PipelineColumnData[],
  activeLeadId: string,
  targetColumnId: LeadStatus,
  targetLeadId?: string | null
) {
  const sourceColumnIndex = columns.findIndex((column) =>
    column.leads.some((lead) => lead.id === activeLeadId)
  );

  if (sourceColumnIndex === -1) {
    return columns;
  }

  const sourceColumn = columns[sourceColumnIndex];
  const movingLead = sourceColumn.leads.find((lead) => lead.id === activeLeadId);

  if (!movingLead) {
    return columns;
  }

  const nextColumns = columns.map((column) => ({
    ...column,
    leads: [...column.leads]
  }));

  nextColumns[sourceColumnIndex].leads = nextColumns[sourceColumnIndex].leads.filter(
    (lead) => lead.id !== activeLeadId
  );

  const targetColumnIndex = nextColumns.findIndex((column) => column.id === targetColumnId);

  if (targetColumnIndex === -1) {
    return columns;
  }

  const nextLead: Lead = {
    ...movingLead,
    status: targetColumnId
  };

  const targetLeads = nextColumns[targetColumnIndex].leads;

  if (!targetLeadId) {
    nextColumns[targetColumnIndex].leads = [nextLead, ...targetLeads];
    return nextColumns;
  }

  const targetIndex = targetLeads.findIndex((lead) => lead.id === targetLeadId);

  if (targetIndex === -1) {
    nextColumns[targetColumnIndex].leads = [nextLead, ...targetLeads];
    return nextColumns;
  }

  nextColumns[targetColumnIndex].leads = [
    ...targetLeads.slice(0, targetIndex),
    nextLead,
    ...targetLeads.slice(targetIndex)
  ];

  return nextColumns;
}
