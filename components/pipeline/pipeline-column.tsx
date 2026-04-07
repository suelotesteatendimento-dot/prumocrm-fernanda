"use client";

import { memo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { PipelineColumnData } from "@/lib/pipeline/board";
import { Badge } from "@/components/ui/badge";
import { PipelineCard } from "@/components/pipeline/pipeline-card";

export const PipelineColumn = memo(function PipelineColumn({
  column,
  isPending
}: {
  column: PipelineColumnData;
  isPending: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", status: column.id }
  });

  return (
    <section className="panel-muted flex min-h-[540px] flex-col rounded-[24px] p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-brand-950">
            {column.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-brand-600">{column.description}</p>
        </div>
        <Badge variant="outline" className="bg-white/80">
          {column.leads.length}
        </Badge>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 rounded-2xl border border-dashed px-2 py-2 transition-colors ${
          isOver ? "border-brand-500/65 bg-brand-100/45" : "border-brand-300/20"
        } ${isPending ? "opacity-80" : ""}`}
      >
        <SortableContext
          items={column.leads.map((lead) => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {column.leads.length > 0 ? (
              column.leads.map((lead) => <PipelineCard key={lead.id} lead={lead} />)
            ) : (
              <div className="rounded-2xl border border-dashed border-brand-300/50 bg-white/52 px-4 py-10 text-center text-sm leading-6 text-brand-600">
                Nenhum lead nesta etapa.
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </section>
  );
});
