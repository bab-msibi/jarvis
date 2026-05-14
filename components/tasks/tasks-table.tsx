"use client";

import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TaskActionMenu, TaskMenuAction } from "@/components/tasks/task-action-menu";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { TaskProgressBar } from "@/components/tasks/task-progress-bar";
import { TaskRow } from "@/components/tasks/task-row";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { formatDateTime, getInitials, TaskIcon } from "@/components/tasks/task-utils";
import { Task } from "@/types/task";

type TasksTableProps = {
  tasks: Task[];
  totalTasks: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onOpenDetails: (task: Task) => void;
  onMenuAction: (task: Task, action: TaskMenuAction) => void;
};

export function TasksTable({
  tasks,
  totalTasks,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onOpenDetails,
  onMenuAction
}: TasksTableProps) {
  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        header: "Task Name",
        accessorKey: "name",
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div className="flex min-w-[240px] items-start justify-between gap-2">
              <button className="group flex min-w-0 items-start gap-2 text-left" onClick={() => onOpenDetails(task)} type="button">
                <span className="mt-0.5 rounded-md border border-cyan-900/35 bg-cyan-500/10 p-1.5 text-cyan-300">
                  <TaskIcon className="h-3.5 w-3.5" name={task.name} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-cyan-100 group-hover:text-cyan-50">{task.name}</span>
                  <span className="block text-xs text-cyan-700">{task.description}</span>
                </span>
              </button>
              <TaskActionMenu onAction={(action) => onMenuAction(task, action)} />
            </div>
          );
        }
      },
      {
        header: "Assigned Agent",
        accessorKey: "assignedAgent",
        cell: ({ row }) => {
          const { assignedAgent } = row.original;
          return (
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-200">{getInitials(assignedAgent)}</span>
              <span className="text-cyan-200">{assignedAgent}</span>
            </div>
          );
        }
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
        header: "Priority",
        accessorKey: "priority",
        cell: ({ row }) => <TaskPriorityBadge priority={row.original.priority} />
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => <TaskStatusBadge status={row.original.status} />
      },
      {
        header: "Progress",
        accessorKey: "progress",
        cell: ({ row }) => (
          <div className="flex min-w-[140px] items-center gap-2">
            <span className="w-9 text-xs text-cyan-300">{row.original.progress}%</span>
            <TaskProgressBar value={row.original.progress} />
          </div>
        )
      },
      {
        header: "ETA",
        accessorKey: "eta",
        cell: ({ getValue }) => <span className="whitespace-nowrap text-cyan-300">{String(getValue())}</span>
      },
      {
        header: "Created",
        accessorKey: "createdAt",
        cell: ({ row }) => <span className="whitespace-nowrap text-cyan-600">{formatDateTime(row.original.createdAt)}</span>
      }
    ],
    [onMenuAction, onOpenDetails]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const start = totalTasks ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalTasks);

  return (
    <section className="panel-base rounded-2xl">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1240px]">
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
      </div>

      <div className="space-y-3 p-3 md:hidden">
        {tasks.map((task) => (
          <TaskRow key={task.id} mobile onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} task={task} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {totalTasks} tasks
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
