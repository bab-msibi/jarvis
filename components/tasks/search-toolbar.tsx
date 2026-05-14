"use client";

import { ArrowDownWideNarrow, CalendarRange, Columns3, ListFilter, Search } from "lucide-react";

import { TaskPriority, TaskStatus } from "@/types/task";
import { cn } from "@/lib/utils";

export type TaskSortOption = "recent" | "oldest" | "priority" | "progress_desc" | "eta";
export type TaskViewMode = "table" | "kanban";

type SearchToolbarProps = {
  searchValue: string;
  statusFilter: "ALL" | TaskStatus;
  priorityFilter: "ALL" | TaskPriority;
  agentFilter: string;
  modelFilter: string;
  brainFilter: string;
  startDate: string;
  endDate: string;
  sortBy: TaskSortOption;
  viewMode: TaskViewMode;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "ALL" | TaskStatus) => void;
  onPriorityChange: (value: "ALL" | TaskPriority) => void;
  onAgentChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onBrainChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSortChange: (value: TaskSortOption) => void;
  onViewModeChange: (value: TaskViewMode) => void;
};

const statusOptions: Array<{ label: string; value: "ALL" | TaskStatus }> = [
  { label: "All Status", value: "ALL" },
  { label: "Not Started", value: "NOT STARTED" },
  { label: "In Progress", value: "IN PROGRESS" },
  { label: "On Hold", value: "ON HOLD" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Failed", value: "FAILED" }
];

const priorityOptions: Array<{ label: string; value: "ALL" | TaskPriority }> = [
  { label: "All Priority", value: "ALL" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
  { label: "None", value: "NONE" }
];

const sortOptions: Array<{ label: string; value: TaskSortOption }> = [
  { label: "Sort: Recently Created", value: "recent" },
  { label: "Sort: Oldest", value: "oldest" },
  { label: "Sort: Priority", value: "priority" },
  { label: "Sort: Progress", value: "progress_desc" },
  { label: "Sort: ETA", value: "eta" }
];

const inputClassName =
  "h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60";

export function SearchToolbar({
  searchValue,
  statusFilter,
  priorityFilter,
  agentFilter,
  modelFilter,
  brainFilter,
  startDate,
  endDate,
  sortBy,
  viewMode,
  agentOptions,
  modelOptions,
  brainOptions,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onAgentChange,
  onModelChange,
  onBrainChange,
  onStartDateChange,
  onEndDateChange,
  onSortChange,
  onViewModeChange
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.1fr)_auto_auto_auto_auto_auto_auto_auto_auto]">
      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          value={searchValue}
        />
      </label>

      <select className={inputClassName} onChange={(event) => onStatusChange(event.target.value as "ALL" | TaskStatus)} value={statusFilter}>
        {statusOptions.map((option) => (
          <option className="bg-[#071523]" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onPriorityChange(event.target.value as "ALL" | TaskPriority)} value={priorityFilter}>
        {priorityOptions.map((option) => (
          <option className="bg-[#071523]" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onAgentChange(event.target.value)} value={agentFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Agents
        </option>
        {agentOptions.map((option) => (
          <option className="bg-[#071523]" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onModelChange(event.target.value)} value={modelFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Models
        </option>
        {modelOptions.map((option) => (
          <option className="bg-[#071523]" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onBrainChange(event.target.value)} value={brainFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Brains
        </option>
        {brainOptions.map((option) => (
          <option className="bg-[#071523]" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <CalendarRange className="h-4 w-4 text-cyan-700" />
        <input className="w-[122px] bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onStartDateChange(event.target.value)} type="date" value={startDate} />
      </label>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <CalendarRange className="h-4 w-4 text-cyan-700" />
        <input className="w-[122px] bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onEndDateChange(event.target.value)} type="date" value={endDate} />
      </label>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-cyan-400">
        <ArrowDownWideNarrow className="h-4 w-4" />
        <select className="bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onSortChange(event.target.value as TaskSortOption)} value={sortBy}>
          {sortOptions.map((option) => (
            <option className="bg-[#071523]" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="inline-flex h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 p-1">
        <button
          className={cn(
            "inline-flex h-full items-center gap-1 rounded-md px-2 text-xs uppercase tracking-[0.08em] transition",
            viewMode === "table" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-500 hover:text-cyan-200"
          )}
          onClick={() => onViewModeChange("table")}
          type="button"
        >
          <ListFilter className="h-3.5 w-3.5" />
          Table
        </button>
        <button
          className={cn(
            "inline-flex h-full items-center gap-1 rounded-md px-2 text-xs uppercase tracking-[0.08em] transition",
            viewMode === "kanban" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-500 hover:text-cyan-200"
          )}
          onClick={() => onViewModeChange("kanban")}
          type="button"
        >
          <Columns3 className="h-3.5 w-3.5" />
          Kanban
        </button>
      </div>
    </div>
  );
}
