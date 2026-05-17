"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Eye, Power } from "lucide-react";

import { SessionRow } from "@/components/terminal/session-row";
import { TerminalStatusBadge } from "@/components/terminal/terminal-status-badge";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { TerminalSession } from "@/types/terminal";

type SessionTableProps = {
  sessions: TerminalSession[];
  onOpen: (session: TerminalSession) => void;
  onKill: (session: TerminalSession) => void;
};

export function SessionTable({ sessions, onOpen, onKill }: SessionTableProps) {
  const columns = useMemo<ColumnDef<TerminalSession>[]>(
    () => [
      { header: "Session", accessorKey: "name", cell: ({ row }) => <span className="text-cyan-100">{row.original.name}</span> },
      { header: "Type", accessorKey: "type", cell: ({ row }) => <span className="text-cyan-300">{row.original.type}</span> },
      { header: "Agent", accessorKey: "agent", cell: ({ row }) => <span className="text-cyan-300">{row.original.agent}</span> },
      { header: "Command", accessorKey: "currentCommand", cell: ({ row }) => <span className="max-w-[240px] truncate text-cyan-200">{row.original.currentCommand}</span> },
      { header: "Status", accessorKey: "status", cell: ({ row }) => <TerminalStatusBadge status={row.original.status} /> },
      { header: "CPU", accessorKey: "cpuUsage", cell: ({ row }) => <span className="text-cyan-500">{row.original.cpuUsage}%</span> },
      { header: "RAM", accessorKey: "ramUsage", cell: ({ row }) => <span className="text-cyan-500">{row.original.ramUsage}%</span> },
      { header: "Started", accessorKey: "startedAt", cell: ({ row }) => <span className="text-cyan-500">{row.original.startedAt}</span> },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }) => {
          const session = row.original;
          return (
            <div className="flex items-center gap-1">
              <button
                className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
                onClick={() => onOpen(session)}
                type="button"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button
                className="rounded-md border border-rose-900/35 bg-rose-950/20 p-1.5 text-rose-300 transition hover:border-rose-500/50 hover:text-rose-100"
                onClick={() => onKill(session)}
                type="button"
              >
                <Power className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        }
      }
    ],
    [onKill, onOpen]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: sessions,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-lg text-cyan-200">Sessions / Processes</h3>
      </header>

      <DataTableWrapper>
        <table className="table-sticky-head w-full min-w-[1180px]">
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
        {sessions.map((session) => (
          <SessionRow key={session.id} onKill={onKill} onOpen={onOpen} session={session} />
        ))}
      </div>

      {!sessions.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="Create a terminal session to begin command monitoring." title="No sessions found" />
        </div>
      ) : null}
    </section>
  );
}
