"use client";

import { ArrowDownWideNarrow, Grid2X2, Search, Table } from "lucide-react";

import { WorkflowStatus, WorkflowTrigger } from "@/types/workflow";
import { cn } from "@/lib/utils";

export type WorkflowSortOption = "recent" | "name_asc" | "runs_desc" | "success_desc" | "status";
export type WorkflowViewMode = "table" | "grid";

type SearchToolbarProps = {
  searchValue: string;
  statusFilter: "ALL" | WorkflowStatus;
  triggerFilter: "ALL" | WorkflowTrigger;
  agentFilter: string;
  modelFilter: string;
  brainFilter: string;
  sortBy: WorkflowSortOption;
  viewMode: WorkflowViewMode;
  agentOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "ALL" | WorkflowStatus) => void;
  onTriggerChange: (value: "ALL" | WorkflowTrigger) => void;
  onAgentChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onBrainChange: (value: string) => void;
  onSortChange: (value: WorkflowSortOption) => void;
  onViewModeChange: (value: WorkflowViewMode) => void;
  onReset: () => void;
};

const statusOptions: Array<{ label: string; value: "ALL" | WorkflowStatus }> = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Running", value: "RUNNING" },
  { label: "Failed", value: "FAILED" },
  { label: "Draft", value: "DRAFT" },
  { label: "Completed", value: "COMPLETED" }
];

const triggerOptions: Array<{ label: string; value: "ALL" | WorkflowTrigger }> = [
  { label: "All Triggers", value: "ALL" },
  { label: "Schedule", value: "Schedule" },
  { label: "Webhook", value: "Webhook" },
  { label: "Manual", value: "Manual" },
  { label: "Event", value: "Event" },
  { label: "API", value: "API" }
];

const sortOptions: Array<{ label: string; value: WorkflowSortOption }> = [
  { label: "Sort: Recently Updated", value: "recent" },
  { label: "Sort: Name", value: "name_asc" },
  { label: "Sort: Runs", value: "runs_desc" },
  { label: "Sort: Success Rate", value: "success_desc" },
  { label: "Sort: Status", value: "status" }
];

const inputClassName =
  "h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60";

export function SearchToolbar({
  searchValue,
  statusFilter,
  triggerFilter,
  agentFilter,
  modelFilter,
  brainFilter,
  sortBy,
  viewMode,
  agentOptions,
  modelOptions,
  brainOptions,
  onSearchChange,
  onStatusChange,
  onTriggerChange,
  onAgentChange,
  onModelChange,
  onBrainChange,
  onSortChange,
  onViewModeChange,
  onReset
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto_auto_auto]">
      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search workflows..."
          value={searchValue}
        />
      </label>

      <select className={inputClassName} onChange={(event) => onStatusChange(event.target.value as "ALL" | WorkflowStatus)} value={statusFilter}>
        {statusOptions.map((option) => (
          <option className="bg-[#071523]" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onTriggerChange(event.target.value as "ALL" | WorkflowTrigger)} value={triggerFilter}>
        {triggerOptions.map((option) => (
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

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-cyan-400">
        <ArrowDownWideNarrow className="h-4 w-4" />
        <select className="bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onSortChange(event.target.value as WorkflowSortOption)} value={sortBy}>
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
          <Table className="h-3.5 w-3.5" />
          Table
        </button>
        <button
          className={cn(
            "inline-flex h-full items-center gap-1 rounded-md px-2 text-xs uppercase tracking-[0.08em] transition",
            viewMode === "grid" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-500 hover:text-cyan-200"
          )}
          onClick={() => onViewModeChange("grid")}
          type="button"
        >
          <Grid2X2 className="h-3.5 w-3.5" />
          Grid
        </button>
      </div>

      <button
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/35 px-3 text-sm text-cyan-300 transition hover:border-cyan-500/60 hover:text-cyan-100"
        onClick={onReset}
        type="button"
      >
        Reset
      </button>
    </div>
  );
}
