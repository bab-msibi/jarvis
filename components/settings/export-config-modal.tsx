"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type ExportConfigValues = {
  format: "json" | "yaml";
  includeSecrets: boolean;
};

type ExportConfigModalProps = {
  open: boolean;
  onClose: () => void;
  onExport: (values: ExportConfigValues) => void;
};

export function ExportConfigModal({ open, onClose, onExport }: ExportConfigModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: ExportConfigValues = {
      format: String(formData.get("format") ?? "json") as ExportConfigValues["format"],
      includeSecrets: formData.get("includeSecrets") === "on"
    };
    onExport(values);
    onClose();
  };

  return (
    <ModalShell
      description="Export the current JARVIS configuration snapshot."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="export-config-form" type="submit">
            Export
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Export Config"
    >
      <form className="space-y-3" id="export-config-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Export Format</span>
          <select className="h-10 w-full rounded-md border border-cyan-900/45 bg-sky-950/45 px-3 text-sm text-cyan-100 outline-none" defaultValue="json" name="format">
            <option className="bg-[#071523]" value="json">
              JSON
            </option>
            <option className="bg-[#071523]" value="yaml">
              YAML
            </option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-cyan-300">
          <input className="accent-cyan-400" name="includeSecrets" type="checkbox" />
          Include masked secret references
        </label>
      </form>
    </ModalShell>
  );
}
