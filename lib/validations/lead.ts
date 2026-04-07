import { z } from "zod";

export const leadStatuses = [
  "em_aberto",
  "follow_up",
  "aprovado",
  "reprovado"
] as const;

export const leadOrigins = [
  "Instagram",
  "WhatsApp",
  "Indicação",
  "Site",
  "Tráfego pago",
  "Outro"
] as const;

export const leadStatusLabels: Record<(typeof leadStatuses)[number], string> = {
  em_aberto: "Em aberto",
  follow_up: "Follow-up",
  aprovado: "Aprovado",
  reprovado: "Reprovado"
};

export const leadOriginLabels = leadOrigins.reduce<Record<string, string>>((acc, origin) => {
  acc[origin] = origin;
  return acc;
}, {});

export const leadSchema = z.object({
  nome: z.string().trim().min(3, "Informe o nome completo."),
  telefone: z.string().trim().min(8, "Informe um telefone válido."),
  procedimento: z.string().trim().min(3, "Informe o procedimento."),
  origem: z.enum(leadOrigins, {
    errorMap: () => ({ message: "Selecione uma origem válida." })
  }),
  status: z.enum(leadStatuses, {
    errorMap: () => ({ message: "Selecione um status válido." })
  }),
  observacoes: z.string().trim().max(1000, "Máximo de 1000 caracteres.").nullable(),
  data_entrada: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data valida no formato YYYY-MM-DD.")
});

export const leadFormSchema = leadSchema.extend({
  observacoes: z.string().trim().max(1000, "Máximo de 1000 caracteres.")
});

export const createLeadSchema = leadSchema.omit({ status: true }).extend({
  observacoes: z
    .string()
    .trim()
    .max(1000, "Máximo de 1000 caracteres.")
    .optional()
    .transform((value) => (value ? value : null))
});

export const updateLeadSchema = leadSchema.extend({
  id: z.string().uuid("Lead inválido."),
  observacoes: z
    .string()
    .trim()
    .max(1000, "Máximo de 1000 caracteres.")
    .optional()
    .transform((value) => (value ? value : null))
});

export const deleteLeadSchema = z.object({
  id: z.string().uuid("Lead inválido.")
});

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadOrigin = (typeof leadOrigins)[number];
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadFormInput = z.infer<typeof leadFormSchema>;
