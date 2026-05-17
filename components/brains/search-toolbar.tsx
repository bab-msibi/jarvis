"use client";

import { ArrowDownWideNarrow, Grid2X2, List, Search } from "lucide-react";

import { BrainStatus } from "@/types/brain";

export type BrainSortOption = "recent" | "name_asc" | "agents_desc" | "models_desc" | "status";

type SearchToolbarProps = {
  searchValue: string;
  statusFilter: "ALL" | BrainStatus;
  typeFilter: string;
  linkedModelFilter: string;
  linkedAgentFilter: string;
  sortBy: BrainSortOption;
  compactCards: boolean;
  typeOptions: string[];
  modelOptions: string[];
  agentOptions: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "ALL" | BrainStatus) => void;
  onTypeChange: (value: string) => void;
  onLinkedModelChange: (value: string) => void;
  onLinkedAgentChange: (value: string) => void;
  onSortChange: (value: BrainSortOption) => void;
  onToggleLayout: () => void;
  onReset: () => void;
};

const statusOptions: Array<{ label: string; value: "ALL" | BrainStatus }> = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Idle", value: "IDLE" },
  { label: "Error", value: "ERROR" },
  { label: "Updating", value: "UPDATING" }
];

const sortOptions: Array<{ label: string; value: BrainSortOption }> = [
  { label: "Sort: Recently Updated", value: "recent" },
  { label: "Sort: Name", value: "name_asc" },
  { label: "Sort: Linked Agents", value: "agents_desc" },
  { label: "Sort: Linked Models", value: "models_desc" },
  { label: "Sort: Status", value: "status" }
];

export function SearchToolbar({
  searchValue,
  statusFilter,
  typeFilter,
  linkedModelFilter,
  linkedAgentFilter,
  sortBy,
  compactCards,
  typeOptions,
  modelOptions,
  agentOptions,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onLinkedModelChange,
  onLinkedAgentChange,
  onSortChange,
  onToggleLayout,
  onReset
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto_auto]">
      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search brains..."
          value={searchValue}
        />
      </label>

      <select
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
        onChange={(event) => onStatusChange(event.target.value as "ALL" | BrainStatus)}
        value={statusFilter}
      >
        {statusOptions.map((option) => (
          <option className="bg-[#071523]" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
        onChange={(event) => onTypeChange(event.target.value)}
        value={typeFilter}
      >
        <option className="bg-[#071523]" value="ALL">
          All Types
        </option>
        {typeOptions.map((type) => (
          <option className="bg-[#071523]" key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
        onChange={(event) => onLinkedModelChange(event.target.value)}
        value={linkedModelFilter}
      >
        <option className="bg-[#071523]" value="ALL">
          All Linked Models
        </option>
        {modelOptions.map((model) => (
          <option className="bg-[#071523]" key={model} value={model}>
            {model}
          </option>
        ))}
      </select>

      <select
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
        onChange={(event) => onLinkedAgentChange(event.target.value)}
        value={linkedAgentFilter}
      >
        <option className="bg-[#071523]" value="ALL">
          All Linked Agents
        </option>
        {agentOptions.map((agent) => (
          <option className="bg-[#071523]" key={agent} value={agent}>
            {agent}
          </option>
        ))}
      </select>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-cyan-400">
        <ArrowDownWideNarrow className="h-4 w-4" />
        <select
          className="bg-transparent text-sm text-cyan-200 outline-none"
          onChange={(event) => onSortChange(event.target.value as BrainSortOption)}
          value={sortBy}
        >
          {sortOptions.map((option) => (
            <option className="bg-[#071523]" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        className="inline-flex h-11 items-center justify-center rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-cyan-200 transition hover:border-cyan-500/50 hover:text-cyan-100"
        onClick={onToggleLayout}
        type="button"
      >
        {compactCards ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
      </button>

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
