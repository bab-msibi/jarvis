"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TriggerBadge } from "@/components/workflows/trigger-badge";
import { WorkflowActionMenu, WorkflowMenuAction } from "@/components/workflows/workflow-action-menu";
import { WorkflowRow } from "@/components/workflows/workflow-row";
import { WorkflowStatusBadge } from "@/components/workflows/workflow-status-badge";
import { Workflow } from "@/types/workflow";

type WorkflowsTableProps = {
  workflows: Workflow[];
  totalWorkflows: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onOpen: (workflow: Workflow) => void;
  onRun: (workflow: Workflow) => void;
  onMenuAction: (workflow: Workflow, action: WorkflowMenuAction) => void;
};

function agentTag(agent: string) {
  const initials = agent
    .split(/\s+/)
    .map((item) => item[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
  return initials || "AG";
}

export function WorkflowsTable({
  workflows,
  totalWorkflows,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onOpen,
  onRun,
  onMenuAction
}: WorkflowsTableProps) {
  const columns = useMemo<ColumnDef<Workflow>[]>(
    () => [
      {
        header: "Workflow Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <button className="max-w-[210px] truncate text-left text-cyan-100 hover:text-cyan-50" onClick={() => onOpen(row.original)} type="button">
            {row.original.name}
          </button>
        )
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => <span className="line-clamp-1 max-w-[260px] text-cyan-300">{String(getValue())}</span>
      },
      {
        header: "Trigger",
        accessorKey: "trigger",
        cell: ({ row }) => <TriggerBadge trigger={row.original.trigger} />
      },
      {
        header: "Agent",
        accessorKey: "assignedAgent",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-200">{agentTag(row.original.assignedAgent)}</span>
            <span className="text-cyan-200">{row.original.assignedAgent}</span>
          </div>
        )
      },
      {
        header: "Model",
        accessorKey: "linkedModel",
        cell: ({ getValue }) => <span className="text-cyan-200">{String(getValue())}</span>
      },
      {
        header: "Brain",
        accessorKey: "linkedBrain",
        cell: ({ getValue }) => <span className="text-cyan-200">{String(getValue())}</span>
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => <WorkflowStatusBadge status={row.original.status} />
      },
      {
        header: "Runs",
        accessorKey: "runs",
        cell: ({ getValue }) => <span className="text-cyan-200">{Number(getValue())}</span>
      },
      {
        header: "Success Rate",
        accessorKey: "successRate",
        cell: ({ row }) => <span className="text-emerald-300">{row.original.successRate}%</span>
      },
      {
        header: "Last Run",
        accessorKey: "lastRun",
        cell: ({ getValue }) => <span className="whitespace-nowrap text-cyan-600">{String(getValue())}</span>
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => <WorkflowActionMenu onAction={(action) => onMenuAction(row.original, action)} />
      }
    ],
    [onMenuAction, onOpen]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: workflows,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const start = totalWorkflows ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalWorkflows);

  return (
    <section className="panel-base rounded-2xl">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1500px]">
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
            {workflows.map((workflow) => (
              <WorkflowRow key={workflow.id} onMenuAction={onMenuAction} onOpen={onOpen} onRun={onRun} workflow={workflow} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-3 md:hidden">
        {workflows.map((workflow) => (
          <WorkflowRow key={workflow.id} mobile onMenuAction={onMenuAction} onOpen={onOpen} onRun={onRun} workflow={workflow} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {totalWorkflows} workflows
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

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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
