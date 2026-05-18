"use client";

import { Search, Plus } from "lucide-react";

import { AgentStatus } from "@/types/agent";

type SearchToolbarProps = {
  searchValue: string;
  statusFilter: "ALL" | AgentStatus;
  roleFilter: string;
  roleOptions: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "ALL" | AgentStatus) => void;
  onRoleChange: (value: string) => void;
  onCreate: () => void;
  onReset: () => void;
};

const statusOptions: Array<{ label: string; value: "ALL" | AgentStatus }> = [
  { label: "All Status", value: "ALL" },
  { label: "Online", value: "ONLINE" },
  { label: "Busy", value: "BUSY" },
  { label: "Idle", value: "IDLE" },
  { label: "Error", value: "ERROR" }
];

export function SearchToolbar({
  searchValue,
  statusFilter,
  roleFilter,
  roleOptions,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onCreate,
  onReset
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-[auto_1fr_auto_auto_auto]">
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
        onClick={onCreate}
        type="button"
      >
        <Plus className="h-4 w-4" />
        New Agent
        <span className="rounded-full border border-amber-400/30 px-1.5 py-0.5 text-[10px] uppercase text-amber-200">Upcoming</span>
      </button>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search agents..."
          value={searchValue}
        />
      </label>

      <select
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60"
        onChange={(event) => onStatusChange(event.target.value as "ALL" | AgentStatus)}
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
        onChange={(event) => onRoleChange(event.target.value)}
        value={roleFilter}
      >
        <option className="bg-[#071523]" value="ALL">
          All Roles
        </option>
        {roleOptions.map((role) => (
          <option className="bg-[#071523]" key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <button
        className="h-11 rounded-lg border border-cyan-900/40 bg-sky-950/35 px-3 text-sm text-cyan-300 transition hover:border-cyan-500/60 hover:text-cyan-100"
        onClick={onReset}
        type="button"
      >
        Reset Filters
      </button>
    </div>
  );
}
