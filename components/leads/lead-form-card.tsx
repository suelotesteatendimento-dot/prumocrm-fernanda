"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Lead, LeadFormValues } from "@/lib/types/lead";
import { mapLeadToFormValues } from "@/lib/types/lead";
import {
  leadFormSchema,
  leadOriginLabels,
  leadOrigins,
  leadStatusLabels,
  leadStatuses
} from "@/lib/validations/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type LeadFormCardProps = {
  selectedLead?: Lead | null;
  isPending: boolean;
  onSubmit: (values: LeadFormValues, selectedLead?: Lead | null) => void;
  onCancelEdit: () => void;
};

export function LeadFormCard({
  selectedLead,
  isPending,
  onSubmit,
  onCancelEdit
}: LeadFormCardProps) {
  const isEditing = Boolean(selectedLead);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: mapLeadToFormValues(selectedLead)
  });

  useEffect(() => {
    reset(mapLeadToFormValues(selectedLead));
  }, [reset, selectedLead]);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => onSubmit(values, selectedLead))}
    >
      <div className="inline-flex w-fit rounded-full border border-brand-300/50 bg-brand-100/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-brand-600">
        {isEditing ? "Edição" : "Cadastro"}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium text-brand-950">Nome</label>
          <Input placeholder="Nome completo" {...register("nome")} />
          {errors.nome ? <p className="text-sm text-red-700">{errors.nome.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-950">Telefone</label>
          <Input placeholder="(11) 99999-9999" {...register("telefone")} />
          {errors.telefone ? (
            <p className="text-sm text-red-700">{errors.telefone.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-950">Data de entrada</label>
          <Input type="date" {...register("data_entrada")} />
          {errors.data_entrada ? (
            <p className="text-sm text-red-700">{errors.data_entrada.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-950">Procedimento</label>
        <Input placeholder="Ex: Acupuntura integrativa" {...register("procedimento")} />
        {errors.procedimento ? (
          <p className="text-sm text-red-700">{errors.procedimento.message}</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-950">Origem</label>
          <select {...register("origem")} className="field-base h-11 w-full px-4">
            {leadOrigins.map((origin) => (
              <option key={origin} value={origin}>
                {leadOriginLabels[origin]}
              </option>
            ))}
          </select>
          {errors.origem ? (
            <p className="text-sm text-red-700">{errors.origem.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-950">Status</label>
          <select
            {...register("status")}
            disabled={!isEditing}
            className="field-base h-11 w-full px-4 disabled:bg-brand-100/70"
          >
            {leadStatuses.map((status) => (
              <option key={status} value={status}>
                {leadStatusLabels[status]}
              </option>
            ))}
          </select>
          {!isEditing ? (
            <p className="text-xs text-brand-600">
              Novos leads são criados sempre como em aberto.
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-950">Observações</label>
        <Textarea placeholder="Detalhes relevantes sobre o lead" {...register("observacoes")} />
        {errors.observacoes ? (
          <p className="text-sm text-red-700">{errors.observacoes.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-brand-300/35 pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancelEdit}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : "Salvar lead"}
        </Button>
      </div>
    </form>
  );
}
