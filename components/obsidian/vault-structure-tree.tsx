"use client";

import { FolderTreeItem } from "@/components/obsidian/folder-tree-item";
import { VaultFolder } from "@/types/obsidian";

type VaultStructureTreeProps = {
  folders: VaultFolder[];
  expandedFolderIds: string[];
  selectedFolderId: string | null;
  onToggleFolder: (folderId: string) => void;
  onSelectFolder: (folderId: string) => void;
};

export function VaultStructureTree({
  folders,
  expandedFolderIds,
  selectedFolderId,
  onToggleFolder,
  onSelectFolder
}: VaultStructureTreeProps) {
  return (
    <section className="panel-base rounded-2xl p-3">
      <header className="mb-2">
        <h2 className="text-xl text-cyan-200">Vault Structure</h2>
      </header>
      <div className="space-y-0.5">
        {folders.map((folder) => (
          <FolderTreeItem
            expandedFolderIds={expandedFolderIds}
            folder={folder}
            key={folder.id}
            onSelect={onSelectFolder}
            onToggle={onToggleFolder}
            selectedFolderId={selectedFolderId}
          />
        ))}
      </div>
    </section>
  );
}
