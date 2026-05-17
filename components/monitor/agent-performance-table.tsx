"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { AgentPerformanceRow } from "@/components/monitor/agent-performance-row";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AgentPerformance } from "@/types/monitor";

type AgentPerformanceTableProps = {
  agents: AgentPerformance[];
  onView: (agentPerformance: AgentPerformance) => void;
};

export function AgentPerformanceTable({ agents, onView }: AgentPerformanceTableProps) {
  const columns = useMemo<ColumnDef<AgentPerformance>[]>(
    () => [
      { header: "Agent", accessorKey: "agent", cell: ({ row }) => <span className="text-cyan-100">{row.original.agent}</span> },
      { header: "Status", accessorKey: "status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
      {
        header: "Current Task",
        accessorKey: "currentTask",
        cell: ({ row }) => <span className="block max-w-[240px] truncate text-cyan-200">{row.original.currentTask}</span>
      },
      {
        header: "CPU",
        accessorKey: "cpuUsage",
        cell: ({ row }) => (
          <div className="w-28 space-y-1">
            <span className="text-xs text-cyan-400">{row.original.cpuUsage}%</span>
            <ProgressBar value={row.original.cpuUsage} />
          </div>
        )
      },
      {
        header: "RAM",
        accessorKey: "ramUsage",
        cell: ({ row }) => (
          <div className="w-28 space-y-1">
            <span className="text-xs text-cyan-400">{row.original.ramUsage}%</span>
            <ProgressBar value={row.original.ramUsage} />
          </div>
        )
      },
      { header: "Success Rate", accessorKey: "successRate", cell: ({ row }) => <span className="text-emerald-300">{row.original.successRate}%</span> },
      { header: "Errors", accessorKey: "errors", cell: ({ row }) => <span className={row.original.errors > 0 ? "text-amber-300" : "text-cyan-500"}>{row.original.errors}</span> },
      { header: "Last Activity", accessorKey: "lastActivity", cell: ({ row }) => <span className="text-cyan-500">{row.original.lastActivity}</span> },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }) => (
          <button
            className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={() => onView(row.original)}
            type="button"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        )
      }
    ],
    [onView]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: agents,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-lg text-cyan-200">Agent Performance</h3>
      </header>

      <DataTableWrapper>
        <table className="table-sticky-head w-full min-w-[1120px]">
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
        {agents.map((agentPerformance) => (
          <AgentPerformanceRow agentPerformance={agentPerformance} key={agentPerformance.id} onView={onView} />
        ))}
      </div>

      {!agents.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="Agent metrics will appear once agents start running workloads." title="No agent metrics yet" />
        </div>
      ) : null}
    </section>
  );
}
