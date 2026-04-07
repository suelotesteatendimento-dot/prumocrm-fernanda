"use client";

import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Lead } from "@/lib/types/lead";

const dateFormatter = new Intl.DateTimeFormat("pt-BR");

const PipelineCardBody = memo(function PipelineCardBody({ lead }: { lead: Lead }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-brand-950">{lead.nome}</h3>
          <p className="mt-1 text-sm text-brand-600">{lead.telefone}</p>
        </div>
        <div className="inline-flex rounded-full border border-brand-300/45 bg-brand-100/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-brand-600">
          Lead
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="inline-flex rounded-full border border-brand-300/50 bg-white px-3 py-1 text-xs font-medium text-brand-600">
          {lead.procedimento}
        </div>
        <p className="text-xs uppercase tracking-[0.08em] text-brand-600">
          Entrada em{" "}
          {dateFormatter.format(new Date(lead.data_entrada))}
        </p>
      </div>
    </>
  );
});

export const PipelineCard = memo(function PipelineCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: lead.id, data: { type: "lead", status: lead.status } });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      className={`rounded-2xl border border-brand-300/45 bg-white/90 p-4 shadow-[0_16px_30px_-26px_rgba(17,17,17,0.22)] transition-[transform,box-shadow,border-color] ${
        isDragging ? "scale-[1.01] shadow-[0_22px_36px_-24px_rgba(17,17,17,0.28)]" : "hover:-translate-y-px"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <PipelineCardBody lead={lead} />
        </div>
        <button
          type="button"
          aria-label={`Mover ${lead.nome}`}
          className="rounded-lg border border-transparent p-1.5 text-brand-600 transition-colors hover:border-brand-300/45 hover:bg-brand-100/70 hover:text-brand-950"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
});

export const PipelineCardPreview = memo(function PipelineCardPreview({
  lead
}: {
  lead: Lead;
}) {
  return (
    <article className="w-[280px] rounded-2xl border border-brand-300/45 bg-white/95 p-4 shadow-[0_22px_40px_-24px_rgba(17,17,17,0.28)]">
      <PipelineCardBody lead={lead} />
    </article>
  );
});
