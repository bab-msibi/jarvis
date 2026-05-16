"use client";

import { ArrowDownWideNarrow, Grid2X2, List, Search } from "lucide-react";

import { NoteType, TagStat } from "@/types/obsidian";
import { cn } from "@/lib/utils";
import { NotesViewMode } from "@/components/obsidian/notes-table";

export type NotesSortOption = "updated_newest" | "updated_oldest" | "title_asc" | "backlinks_desc";

type SearchToolbarProps = {
  searchValue: string;
  folderFilter: string;
  tagFilter: string;
  noteTypeFilter: "ALL" | NoteType;
  sortBy: NotesSortOption;
  viewMode: NotesViewMode;
  folderOptions: string[];
  tagOptions: TagStat[];
  onSearchChange: (value: string) => void;
  onFolderChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onNoteTypeChange: (value: "ALL" | NoteType) => void;
  onSortChange: (value: NotesSortOption) => void;
  onViewModeChange: (value: NotesViewMode) => void;
};

const noteTypeOptions: Array<{ label: string; value: "ALL" | NoteType }> = [
  { label: "All Types", value: "ALL" },
  { label: "Notes", value: "note" },
  { label: "Daily", value: "daily" },
  { label: "Templates", value: "template" },
  { label: "Attachments", value: "attachment" },
  { label: "System", value: "system" }
];

const sortOptions: Array<{ label: string; value: NotesSortOption }> = [
  { label: "Sort: Updated (Newest)", value: "updated_newest" },
  { label: "Sort: Updated (Oldest)", value: "updated_oldest" },
  { label: "Sort: Title", value: "title_asc" },
  { label: "Sort: Backlinks", value: "backlinks_desc" }
];

const inputClassName =
  "h-11 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-sm text-cyan-200 outline-none focus:border-cyan-500/60";

export function SearchToolbar({
  searchValue,
  folderFilter,
  tagFilter,
  noteTypeFilter,
  sortBy,
  viewMode,
  folderOptions,
  tagOptions,
  onSearchChange,
  onFolderChange,
  onTagChange,
  onNoteTypeChange,
  onSortChange,
  onViewModeChange
}: SearchToolbarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto]">
      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3">
        <Search className="h-4 w-4 text-cyan-700" />
        <input
          className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search notes..."
          value={searchValue}
        />
      </label>

      <select className={inputClassName} onChange={(event) => onFolderChange(event.target.value)} value={folderFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Folders
        </option>
        {folderOptions.map((folder) => (
          <option className="bg-[#071523]" key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onTagChange(event.target.value)} value={tagFilter}>
        <option className="bg-[#071523]" value="ALL">
          All Tags
        </option>
        {tagOptions.map((tag) => (
          <option className="bg-[#071523]" key={tag.tag} value={tag.tag}>
            {tag.tag}
          </option>
        ))}
      </select>

      <select className={inputClassName} onChange={(event) => onNoteTypeChange(event.target.value as "ALL" | NoteType)} value={noteTypeFilter}>
        {noteTypeOptions.map((type) => (
          <option className="bg-[#071523]" key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      <label className="flex h-11 items-center gap-2 rounded-lg border border-cyan-900/40 bg-sky-950/40 px-3 text-cyan-400">
        <ArrowDownWideNarrow className="h-4 w-4" />
        <select className="bg-transparent text-sm text-cyan-200 outline-none" onChange={(event) => onSortChange(event.target.value as NotesSortOption)} value={sortBy}>
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
            viewMode === "list" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-500 hover:text-cyan-200"
          )}
          onClick={() => onViewModeChange("list")}
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
