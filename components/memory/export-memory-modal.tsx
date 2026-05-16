"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type ExportMemoryModalProps = {
  open: boolean;
  onClose: () => void;
  onExport: (format: "json" | "csv" | "md", scope: "filtered" | "all") => void;
};

export function ExportMemoryModal({ open, onClose, onExport }: ExportMemoryModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const format = String(formData.get("format") ?? "json") as "json" | "csv" | "md";
    const scope = String(formData.get("scope") ?? "filtered") as "filtered" | "all";
    onExport(format, scope);
    onClose();
  };

  return (
    <ModalShell
      description="Export memory snapshots for external analysis or backup."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="export-memory-form" type="submit">
            Export
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Export Memories"
    >
      <form className="space-y-3" id="export-memory-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Format</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="json" name="format">
            <option className="bg-[#071523]" value="json">
              JSON
            </option>
            <option className="bg-[#071523]" value="csv">
              CSV
            </option>
            <option className="bg-[#071523]" value="md">
              Markdown
            </option>
          </select>
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Scope</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="filtered" name="scope">
            <option className="bg-[#071523]" value="filtered">
              Current filtered memories
            </option>
            <option className="bg-[#071523]" value="all">
              All memories
            </option>
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
