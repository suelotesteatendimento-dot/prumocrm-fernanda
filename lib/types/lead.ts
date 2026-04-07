import type { Database } from "@/lib/supabase/database.types";
import type {
  CreateLeadInput,
  LeadFormInput,
  UpdateLeadInput
} from "@/lib/validations/lead";

export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];

export type Lead = LeadRow;

export type LeadFormValues = LeadFormInput;

export function createLeadInsert(input: CreateLeadInput): LeadInsert {
  return {
    nome: input.nome,
    telefone: input.telefone,
    procedimento: input.procedimento,
    origem: input.origem,
    status: "em_aberto",
    observacoes: input.observacoes ?? null,
    data_entrada: input.data_entrada
  };
}

export function createLeadUpdate(input: UpdateLeadInput): LeadUpdate {
  return {
    nome: input.nome,
    telefone: input.telefone,
    procedimento: input.procedimento,
    origem: input.origem,
    status: input.status,
    observacoes: input.observacoes ?? null,
    data_entrada: input.data_entrada
  };
}

export function mapLeadToFormValues(lead?: Lead | null): LeadFormValues {
  return {
    nome: lead?.nome ?? "",
    telefone: lead?.telefone ?? "",
    procedimento: lead?.procedimento ?? "",
    origem: lead?.origem ?? "Instagram",
    status: lead?.status ?? "em_aberto",
    observacoes: lead?.observacoes ?? "",
    data_entrada: lead?.data_entrada ?? new Date().toISOString().slice(0, 10)
  };
}
