"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Bot, BrainCircuit, ChevronLeft, ChevronRight, Eye, Pin, Share2 } from "lucide-react";

import { DecayStatusBadge } from "@/components/memory/decay-status-badge";
import { ImportanceBadge } from "@/components/memory/importance-badge";
import { MemoryActionMenu, MemoryMenuAction } from "@/components/memory/memory-action-menu";
import { MemoryRow } from "@/components/memory/memory-row";
import { MemoryTypeBadge } from "@/components/memory/memory-type-badge";
import { getInitials } from "@/components/memory/memory-utils";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { MemoryViewMode } from "@/lib/store/memory-store";
import { MemoryItem } from "@/types/memory";

type MemoriesTableProps = {
  memories: MemoryItem[];
  totalMemories: number;
  totalDisplayCount?: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  viewMode: MemoryViewMode;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onView: (memory: MemoryItem) => void;
  onPin: (memory: MemoryItem) => void;
  onShare: (memory: MemoryItem) => void;
  onMenuAction: (memory: MemoryItem, action: MemoryMenuAction) => void;
};

const pageSizeOptions = [8, 10, 20, 30];

export function MemoriesTable({
  memories,
  totalMemories,
  totalDisplayCount,
  currentPage,
  totalPages,
  pageSize,
  viewMode,
  onPageChange,
  onPageSizeChange,
  onView,
  onPin,
  onShare,
  onMenuAction
}: MemoriesTableProps) {
  const columns = useMemo<ColumnDef<MemoryItem>[]>(
    () => [
      {
        header: "Memory Content",
        accessorKey: "content",
        cell: ({ row }) => {
          const memory = row.original;
          return (
            <button className="min-w-[260px] max-w-[340px] truncate text-left text-cyan-100 hover:text-cyan-50" onClick={() => onView(memory)} type="button">
              {memory.content}
            </button>
          );
        }
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ row }) => <MemoryTypeBadge type={row.original.type} />
      },
      {
        header: "Brain",
        accessorKey: "brain",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-200">
            <BrainCircuit className="h-3 w-3" />
            <span className="rounded bg-violet-500/20 px-1 text-[10px] uppercase">{getInitials(row.original.brain)}</span>
            {row.original.brain}
          </span>
        )
      },
      {
        header: "Agent",
        accessorKey: "agent",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">
            <Bot className="h-3 w-3" />
            <span className="rounded bg-cyan-500/20 px-1 text-[10px] uppercase">{getInitials(row.original.agent)}</span>
            {row.original.agent}
          </span>
        )
      },
      {
        header: "Importance",
        accessorKey: "importance",
        cell: ({ row }) => <ImportanceBadge importance={row.original.importance} />
      },
      {
        header: "Last Accessed",
        accessorKey: "lastAccessed",
        cell: ({ row }) => <span className="whitespace-nowrap text-cyan-500">{row.original.lastAccessed}</span>
      },
      {
        header: "Decay Status",
        accessorKey: "decayStatus",
        cell: ({ row }) => <DecayStatusBadge status={row.original.decayStatus} />
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }) => {
          const memory = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onView(memory)}
                type="button"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button
                className={`rounded-md border p-1.5 transition ${
                  memory.pinned
                    ? "border-amber-500/55 bg-amber-500/20 text-amber-200"
                    : "border-cyan-900/35 bg-sky-950/60 text-cyan-300 hover:border-cyan-500/50 hover:text-cyan-100"
                }`}
                onClick={() => onPin(memory)}
                type="button"
              >
                <Pin className="h-3.5 w-3.5" />
              </button>
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onShare(memory)}
                type="button"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
              <MemoryActionMenu onAction={(action) => onMenuAction(memory, action)} />
            </div>
          );
        }
      }
    ],
    [onMenuAction, onPin, onShare, onView]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: memories,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const start = totalMemories ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalMemories);
  const displayTotal = totalDisplayCount ?? totalMemories;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-xl text-cyan-200">Recent Memories</h3>
      </header>

      {viewMode === "grid" ? (
        <div className="grid gap-3 p-3 sm:grid-cols-2">
          {memories.map((memory) => (
            <MemoryRow key={memory.id} memory={memory} onMenuAction={onMenuAction} onPin={onPin} onShare={onShare} onView={onView} />
          ))}
        </div>
      ) : (
        <>
          <DataTableWrapper>
            <table className="table-sticky-head w-full min-w-[1370px]">
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
            {memories.map((memory) => (
              <MemoryRow key={memory.id} memory={memory} onMenuAction={onMenuAction} onPin={onPin} onShare={onShare} onView={onView} />
            ))}
          </div>
        </>
      )}

      {!memories.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="No memory records are available for the current filter set." title="No memories found" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {displayTotal.toLocaleString()} memories
        </p>

        <div className="flex items-center gap-2">
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

          <select
            className="h-9 rounded-md border border-cyan-900/40 bg-sky-950/40 px-2 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            value={pageSize}
          >
            {pageSizeOptions.map((option) => (
              <option className="bg-[#071523]" key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
