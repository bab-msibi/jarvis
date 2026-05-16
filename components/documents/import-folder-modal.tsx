"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type ImportFolderModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (folderPath: string, recursive: boolean) => void;
};

export function ImportFolderModal({ open, onClose, onImport }: ImportFolderModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const folderPath = String(formData.get("folderPath") ?? "").trim();
    const recursive = formData.get("recursive") === "on";
    if (!folderPath) return;
    onImport(folderPath, recursive);
    onClose();
  };

  return (
    <ModalShell
      description="Import an entire folder for document indexing and orchestration."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
            form="import-folder-form"
            type="submit"
          >
            Import
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Import Folder"
    >
      <form className="space-y-3" id="import-folder-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Folder Path</span>
          <input
            className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
            defaultValue="/Users/owner/Documents/JARVIS"
            name="folderPath"
            required
          />
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-cyan-300">
          <input className="h-4 w-4 rounded border-cyan-700/40 bg-sky-950/40" defaultChecked name="recursive" type="checkbox" />
          Scan subfolders recursively
        </label>
      </form>
    </ModalShell>
  );
}
