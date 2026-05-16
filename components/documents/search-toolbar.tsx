"use client";

import { ArrowDownWideNarrow, Grid2X2, List, Search } from "lucide-react";

import { DocumentsViewMode } from "@/lib/store/documents-store";
import { DocumentType } from "@/types/document";
import { cn } from "@/lib/utils";

export type DocumentSortOption = "updated_newest" | "updated_oldest" | "name_asc" | "size_desc";

type SearchToolbarProps = {
  searchValue: string;
  categoryFilter: string;
  typeFilter: "ALL" | DocumentType;
  agentFilter: string;
  brainFilter: string;
  sortBy: DocumentSortOption;
  viewMode: DocumentsViewMode;
  categoryOptions: string[];
  typeOptions: DocumentType[];
  agentOptions: string[];
  brainOptions: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: "ALL" | DocumentType) => void;
  onAgentChange: (value: string) => void;
  onBrainChange: (value: string) => void;
  onSortChange: (value: DocumentSortOption) => void;
  onViewModeChange: (value: DocumentsViewMode) => void;
};

const sortOptions: Array<{ label: string; value: DocumentSortOption }> = [
  { label: "Sort: Updated (Newest)", value: "updated_newest" },
  { label: "Sort: Updated (Oldest)", value: "updated_oldest" },
  { label: "Sort: Name", value: "name_asc" },
  { label: "Sort: Size", value: "size_desc" }
];

const inputClassName =
  "h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60";

export function SearchToolbar({
  searchValue,
  categoryFilter,
  typeFilter,
  agentFilter,
  brainFilter,
  sortBy,
  viewMode,
  categoryOptions,
  typeOptions,
  agentOptions,
  brainOptions,
  onSearchChange,
  onCategoryChange,
  onTypeChange,
  onAgentChange,
  onBrainChange,
  onSortChange,
  onViewModeChange
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto]">
      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search documents..."
          value={searchValue}
        />
      </label>

      <select className={inputClassName} onChange={(event) => onCategoryChange(event.target.value)} value={categoryFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Categories
        </option>
        {categoryOptions.map((option) => (
          <option className="bg-[#071523]" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onTypeChange(event.target.value as "ALL" | DocumentType)} value={typeFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Types
        </option>
        {typeOptions.map((option) => (
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
        <select className="bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onSortChange(event.target.value as DocumentSortOption)} value={sortBy}>
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
