"use client";

import { ChevronDown, ChevronRight, FolderClosed, FolderOpen } from "lucide-react";

import { VaultFolder } from "@/types/obsidian";
import { cn } from "@/lib/utils";

type FolderTreeItemProps = {
  folder: VaultFolder;
  depth?: number;
  expandedFolderIds: string[];
  selectedFolderId: string | null;
  onToggle: (folderId: string) => void;
  onSelect: (folderId: string) => void;
};

export function FolderTreeItem({
  folder,
  depth = 0,
  expandedFolderIds,
  selectedFolderId,
  onToggle,
  onSelect
}: FolderTreeItemProps) {
  const isExpanded = expandedFolderIds.includes(folder.id);
  const isSelected = selectedFolderId === folder.id;
  const hasChildren = Boolean(folder.children?.length);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm transition",
          isSelected ? "bg-cyan-500/14 text-cyan-100" : "text-cyan-300 hover:bg-cyan-500/10"
        )}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        {hasChildren ? (
          <button
            className="rounded p-0.5 text-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-300"
            onClick={() => onToggle(folder.id)}
            type="button"
          >
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-[18px]" />
        )}

        {isExpanded && hasChildren ? <FolderOpen className="h-3.5 w-3.5 text-cyan-400" /> : <FolderClosed className="h-3.5 w-3.5 text-cyan-500" />}
        <button className="min-w-0 flex-1 truncate text-left" onClick={() => onSelect(folder.id)} type="button">
          {folder.name}
        </button>
        <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[11px] text-cyan-200">{folder.noteCount.toLocaleString()}</span>
      </div>

      {hasChildren && isExpanded ? (
        <div className="mt-0.5 space-y-0.5">
          {folder.children?.map((child) => (
            <FolderTreeItem
              depth={depth + 1}
              expandedFolderIds={expandedFolderIds}
              folder={child}
              key={child.id}
              onSelect={onSelect}
              onToggle={onToggle}
              selectedFolderId={selectedFolderId}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
