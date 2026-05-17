"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { RotateCcw } from "lucide-react";

import { MonitorService } from "@/types/monitor";
import { MonitorStatusBadge } from "@/components/monitor/monitor-status-badge";
import { ServiceStatusRow } from "@/components/monitor/service-status-row";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";

type ServiceStatusTableProps = {
  services: MonitorService[];
  onRestart: (service: MonitorService) => void;
};

export function ServiceStatusTable({ services, onRestart }: ServiceStatusTableProps) {
  const columns = useMemo<ColumnDef<MonitorService>[]>(
    () => [
      { header: "Service", accessorKey: "name", cell: ({ row }) => <span className="text-cyan-100">{row.original.name}</span> },
      { header: "Status", accessorKey: "status", cell: ({ row }) => <MonitorStatusBadge status={row.original.status} /> },
      { header: "Uptime", accessorKey: "uptime", cell: ({ row }) => <span className="text-cyan-300">{row.original.uptime}</span> },
      { header: "CPU", accessorKey: "cpuUsage", cell: ({ row }) => <span className="text-cyan-500">{row.original.cpuUsage}%</span> },
      { header: "RAM", accessorKey: "ramUsage", cell: ({ row }) => <span className="text-cyan-500">{row.original.ramUsage}%</span> },
      { header: "Last Heartbeat", accessorKey: "lastHeartbeat", cell: ({ row }) => <span className="text-cyan-500">{row.original.lastHeartbeat}</span> },
      { header: "Errors", accessorKey: "errorCount", cell: ({ row }) => <span className="text-cyan-500">{row.original.errorCount}</span> },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }) => (
          <button
            className="inline-flex items-center gap-1 rounded-md border border-cyan-700/45 px-2 py-1 text-xs text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
            onClick={() => onRestart(row.original)}
            type="button"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
        )
      }
    ],
    [onRestart]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({ data: services, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-lg text-cyan-200">AI Services Status</h3>
      </header>

      <DataTableWrapper>
        <table className="table-sticky-head w-full min-w-[980px]">
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
        {services.map((service) => (
          <ServiceStatusRow key={service.id} onRestart={onRestart} service={service} />
        ))}
      </div>

      {!services.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="Service status data is unavailable." title="No services found" />
        </div>
      ) : null}
    </section>
  );
}
