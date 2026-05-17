"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Eye, RefreshCw, SquarePen } from "lucide-react";

import { BrainActionMenu, BrainMenuAction } from "@/components/brains/brain-action-menu";
import { BrainKnowledgeBadge } from "@/components/brains/brain-knowledge-badge";
import { BrainRow } from "@/components/brains/brain-row";
import { BrainStatusBadge } from "@/components/brains/brain-status-badge";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { Brain } from "@/types/brain";

type BrainsTableProps = {
  brains: Brain[];
  totalBrains: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onViewDetails: (brain: Brain) => void;
  onMenuAction: (brain: Brain, action: BrainMenuAction) => void;
};

export function BrainsTable({
  brains,
  totalBrains,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onViewDetails,
  onMenuAction
}: BrainsTableProps) {
  const columns = useMemo<ColumnDef<Brain>[]>(
    () => [
      {
        header: "Brain Name",
        accessorKey: "name",
        cell: ({ row }) => {
          const brain = row.original;
          return (
            <div>
              <p className="text-cyan-100">{brain.name}</p>
              <p className="text-xs text-cyan-700">v{brain.version}</p>
            </div>
          );
        }
      },
      {
        header: "Version",
        accessorKey: "version",
        cell: ({ getValue }) => <span className="text-cyan-200">v{String(getValue())}</span>
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => <BrainStatusBadge status={row.original.status} />
      },
      {
        header: "Purpose",
        accessorKey: "purpose",
        cell: ({ getValue }) => <span className="line-clamp-2 max-w-[290px] text-cyan-200">{String(getValue())}</span>
      },
      {
        header: "Linked Agents",
        accessorFn: (brain) => brain.linkedAgents.length,
        cell: ({ getValue }) => <span className="text-cyan-200">{Number(getValue())}</span>
      },
      {
        header: "Linked Models",
        accessorFn: (brain) => brain.linkedModels.length,
        cell: ({ getValue }) => <span className="text-cyan-200">{Number(getValue())}</span>
      },
      {
        header: "Knowledge Source",
        accessorKey: "knowledgeSource",
        cell: ({ row }) => <BrainKnowledgeBadge source={row.original.knowledgeSource} />
      },
      {
        header: "Last Updated",
        accessorKey: "lastUpdated",
        cell: ({ getValue }) => <span className="whitespace-nowrap text-cyan-600">{String(getValue())}</span>
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
          const brain = row.original;
          return (
            <div className="flex items-center justify-end gap-2">
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onMenuAction(brain, "edit")}
                type="button"
              >
                <SquarePen className="h-4 w-4" />
              </button>
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onMenuAction(brain, "sync")}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onViewDetails(brain)}
                type="button"
              >
                <Eye className="h-4 w-4" />
              </button>
              <BrainActionMenu onAction={(action) => onMenuAction(brain, action)} />
            </div>
          );
        }
      }
    ],
    [onMenuAction, onViewDetails]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: brains,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const start = totalBrains ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalBrains);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <section className="panel-base rounded-2xl">
      <DataTableWrapper>
        <table className="table-sticky-head w-full min-w-[1250px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="border-b border-cyan-900/35 text-left text-xs uppercase tracking-[0.08em] text-cyan-600" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="px-4 py-4" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="border-b border-cyan-900/25 text-sm transition hover:bg-cyan-500/5" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="px-4 py-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableWrapper>

      <div className="space-y-3 p-3 md:hidden">
        {brains.map((brain) => (
          <BrainRow brain={brain} key={brain.id} mobile onMenuAction={onMenuAction} onViewDetails={onViewDetails} />
        ))}
      </div>

      {!brains.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="Create a new brain or clear filters to see results." title="No brains found" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {totalBrains} brains
        </p>

        <div className="flex items-center gap-1">
          <button
            className="rounded-md border border-cyan-900/40 p-2 text-cyan-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pages.map((page) => (
            <button
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                page === currentPage
                  ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-100"
                  : "border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50 hover:text-cyan-100"
              }`}
              key={page}
              onClick={() => onPageChange(page)}
              type="button"
            >
              {page}
            </button>
          ))}

          <button
            className="rounded-md border border-cyan-900/40 p-2 text-cyan-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
