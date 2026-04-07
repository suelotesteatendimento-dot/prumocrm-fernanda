"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { updateLeadStatusAction } from "@/app/(app)/pipeline/actions";
import { buildPipelineColumns, moveLeadBetweenColumns, pipelineStatuses, type PipelineColumnData } from "@/lib/pipeline/board";
import type { Lead } from "@/lib/types/lead";
import type { LeadStatus } from "@/lib/validations/lead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PipelineCardPreview } from "@/components/pipeline/pipeline-card";
import { PipelineColumn } from "@/components/pipeline/pipeline-column";

export function PipelineBoard({ leads }: { leads: Lead[] }) {
  const [columns, setColumns] = useState<PipelineColumnData[]>(() => buildPipelineColumns(leads));
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setColumns(buildPipelineColumns(leads));
  }, [leads]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  );

  const leadsById = useMemo(
    () => Object.fromEntries(leads.map((lead) => [lead.id, lead])) as Record<string, Lead>,
    [leads]
  );

  const getColumnForLead = useCallback(
    (leadId: string, sourceColumns: PipelineColumnData[]) =>
      sourceColumns.find((column) => column.leads.some((lead) => lead.id === leadId)),
    []
  );

  const getDestination = useCallback(
    (
      overId: string,
      sourceColumns: PipelineColumnData[]
    ): { columnId: LeadStatus; targetLeadId?: string } | null => {
      if (pipelineStatuses.includes(overId as LeadStatus)) {
        return { columnId: overId as LeadStatus };
      }

      const destinationColumn = getColumnForLead(overId, sourceColumns);

      if (!destinationColumn) {
        return null;
      }

      return {
        columnId: destinationColumn.id,
        targetLeadId: overId
      };
    },
    [getColumnForLead]
  );

  const reorderInsideColumn = useCallback(
    (
      sourceColumns: PipelineColumnData[],
      columnId: LeadStatus,
      activeId: string,
      overId: string
    ) =>
      sourceColumns.map((column) => {
        if (column.id !== columnId) {
          return column;
        }

        const oldIndex = column.leads.findIndex((lead) => lead.id === activeId);
        const newIndex = column.leads.findIndex((lead) => lead.id === overId);

        if (oldIndex === -1 || newIndex === -1) {
          return column;
        }

        return {
          ...column,
          leads: arrayMove(column.leads, oldIndex, newIndex)
        };
      }),
    []
  );

  const handleDragStart = useCallback((leadId: string) => {
    setActiveLead(leadsById[leadId] ?? null);
  }, [leadsById]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLead(null);

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = String(active.id);
    const previousColumns = columns;
    const sourceColumn = getColumnForLead(activeId, previousColumns);

    if (!sourceColumn) {
      return;
    }

    const destination = getDestination(String(over.id), previousColumns);

    if (!destination) {
      return;
    }

    const previousStatus = sourceColumn.id;

    if (previousStatus === destination.columnId && !destination.targetLeadId) {
      return;
    }

    const nextColumns =
      previousStatus === destination.columnId && destination.targetLeadId
        ? reorderInsideColumn(previousColumns, previousStatus, activeId, destination.targetLeadId)
        : moveLeadBetweenColumns(
            previousColumns,
            activeId,
            destination.columnId,
            destination.targetLeadId
          );

    setColumns(nextColumns);

    if (previousStatus === destination.columnId) {
      return;
    }

    setFeedback(null);

    startTransition(async () => {
      const result = await updateLeadStatusAction({
        id: activeId,
        status: destination.columnId
      });

      setFeedback(result.message);

      if (!result.success) {
        setColumns(previousColumns);
        return;
      }
    });
  }, [columns, getColumnForLead, getDestination, reorderInsideColumn]);

  return (
    <div className="space-y-5">
      {feedback ? (
        <div className="rounded-2xl border border-brand-300/50 bg-white/80 px-4 py-3 text-sm text-brand-600 shadow-[0_14px_24px_-24px_rgba(17,17,17,0.16)]">
          {feedback}
        </div>
      ) : null}

      <Card className="border-brand-300/50">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
                Pipeline comercial
              </CardTitle>
              <CardDescription>
                Arraste os leads entre as etapas para atualizar o funil em tempo real.
              </CardDescription>
            </div>
            {isPending ? (
              <div className="inline-flex w-fit rounded-full border border-brand-300/55 bg-brand-100/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-brand-600">
                Salvando movimentação...
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            onDragStart={(event) => handleDragStart(String(event.active.id))}
            onDragEnd={handleDragEnd}
          >
            <div className="grid gap-4 xl:grid-cols-4">
              {columns.map((column) => (
                <PipelineColumn key={column.id} column={column} isPending={isPending} />
              ))}
            </div>

            <DragOverlay>
              {activeLead ? <PipelineCardPreview lead={activeLead} /> : null}
            </DragOverlay>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}
