"use client";

import { ArrowDownWideNarrow, Grid2X2, List, Search } from "lucide-react";

import { MemoryViewMode } from "@/lib/store/memory-store";
import { MemoryImportance, MemoryType } from "@/types/memory";
import { cn } from "@/lib/utils";

export type MemorySortOption = "accessed_recent" | "accessed_oldest" | "importance" | "type";
export type MemoryTimeRange = "ALL" | "24H" | "7D" | "30D" | "90D";

type SearchToolbarProps = {
  searchValue: string;
  typeFilter: "ALL" | MemoryType;
  brainFilter: string;
  agentFilter: string;
  importanceFilter: "ALL" | MemoryImportance;
  timeRange: MemoryTimeRange;
  sortBy: MemorySortOption;
  viewMode: MemoryViewMode;
  typeOptions: MemoryType[];
  brainOptions: string[];
  agentOptions: string[];
  onSearchChange: (value: string) => void;
  onTypeChange: (value: "ALL" | MemoryType) => void;
  onBrainChange: (value: string) => void;
  onAgentChange: (value: string) => void;
  onImportanceChange: (value: "ALL" | MemoryImportance) => void;
  onTimeRangeChange: (value: MemoryTimeRange) => void;
  onSortChange: (value: MemorySortOption) => void;
  onViewModeChange: (value: MemoryViewMode) => void;
};

const sortOptions: Array<{ label: string; value: MemorySortOption }> = [
  { label: "Sort: Last Accessed (Newest)", value: "accessed_recent" },
  { label: "Sort: Last Accessed (Oldest)", value: "accessed_oldest" },
  { label: "Sort: Importance", value: "importance" },
  { label: "Sort: Type", value: "type" }
];

const timeRangeOptions: MemoryTimeRange[] = ["ALL", "24H", "7D", "30D", "90D"];

const importanceOptions: Array<{ label: string; value: "ALL" | MemoryImportance }> = [
  { label: "All Importance", value: "ALL" },
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
  { label: "Very Low", value: "Very Low" }
];

const inputClassName =
  "h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60";

export function SearchToolbar({
  searchValue,
  typeFilter,
  brainFilter,
  agentFilter,
  importanceFilter,
  timeRange,
  sortBy,
  viewMode,
  typeOptions,
  brainOptions,
  agentOptions,
  onSearchChange,
  onTypeChange,
  onBrainChange,
  onAgentChange,
  onImportanceChange,
  onTimeRangeChange,
  onSortChange,
  onViewModeChange
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto_auto]">
      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search memories..."
          value={searchValue}
        />
      </label>

      <select className={inputClassName} onChange={(event) => onTypeChange(event.target.value as "ALL" | MemoryType)} value={typeFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Types
        </option>
        {typeOptions.map((option) => (
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

      <select className={inputClassName} onChange={(event) => onImportanceChange(event.target.value as "ALL" | MemoryImportance)} value={importanceFilter}>
        {importanceOptions.map((option) => (
          <option className="bg-[#071523]" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onTimeRangeChange(event.target.value as MemoryTimeRange)} value={timeRange}>
        {timeRangeOptions.map((option) => (
          <option className="bg-[#071523]" key={option} value={option}>
            {option === "ALL" ? "All Time" : option}
          </option>
        ))}
      </select>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-cyan-400">
        <ArrowDownWideNarrow className="h-4 w-4" />
        <select className="bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onSortChange(event.target.value as MemorySortOption)} value={sortBy}>
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
          <List className="h-3.5 w-3.5" />
          List
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
    </div>
  );
}
