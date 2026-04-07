"use client";

import { memo, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { PencilLine, Plus, Search, Trash2 } from "lucide-react";
import type { Lead } from "@/lib/types/lead";
import { leadStatuses, leadStatusLabels } from "@/lib/validations/lead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";

type LeadsTableProps = {
  leads: Lead[];
  onCreate: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export const LeadsTable = memo(function LeadsTable({
  leads,
  onCreate,
  onEdit,
  onDelete
}: LeadsTableProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | (typeof leadStatuses)[number]>(
    "todos"
  );
  const normalizedQuery = query.trim().toLowerCase();

  const filteredData = useMemo(
    () =>
      leads.filter((lead) => {
        const matchesName = lead.nome.toLowerCase().includes(normalizedQuery);
        const matchesStatus = statusFilter === "todos" || lead.status === statusFilter;
        return matchesName && matchesStatus;
      }),
    [leads, normalizedQuery, statusFilter]
  );

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: "nome",
        header: "Nome"
      },
      {
        accessorKey: "telefone",
        header: "Telefone"
      },
      {
        accessorKey: "procedimento",
        header: "Procedimento"
      },
      {
        accessorKey: "origem",
        header: "Origem"
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <LeadStatusBadge status={row.original.status} />
      },
      {
        accessorKey: "data_entrada",
        header: "Entrada",
        cell: ({ row }) => dateFormatter.format(new Date(row.original.data_entrada))
      },
      {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
              <PencilLine className="h-4 w-4" />
              Editar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(row.original)}>
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        )
      }
    ],
    [onDelete, onEdit]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Card className="border-brand-300/50">
      <CardHeader className="gap-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold tracking-[-0.03em]">
              Leads cadastrados
            </CardTitle>
            <CardDescription>
              Busque por nome, filtre por status e gerencie o pipeline comercial.
            </CardDescription>
          </div>

          <div className="flex w-full flex-col gap-3 xl:w-auto xl:flex-row xl:items-center">
            <div className="grid gap-3 sm:grid-cols-[1fr_190px] xl:min-w-[560px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-600" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por nome"
                  className="pl-11"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as "todos" | (typeof leadStatuses)[number]
                  )
                }
                className="field-base h-11 w-full px-4"
              >
                <option value="todos">Todos os status</option>
                {leadStatuses.map((status) => (
                  <option key={status} value={status}>
                    {leadStatusLabels[status]}
                  </option>
                ))}
              </select>
            </div>

            <Button className="shrink-0 xl:min-w-[150px]" onClick={onCreate}>
              <Plus className="h-4 w-4" />
              Novo Lead
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="table-surface">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <thead className="bg-brand-100/45">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-brand-300/45">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-brand-300/35 transition-colors hover:bg-white/45 last:border-none"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-5 py-4 align-middle text-sm text-brand-950">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-5 py-12 text-center text-sm text-brand-600"
                    >
                      Nenhum lead encontrado para os filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
