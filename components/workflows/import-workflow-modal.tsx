"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type ImportWorkflowModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (source: string, value: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function ImportWorkflowModal({ open, onClose, onImport }: ImportWorkflowModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const source = String(formData.get("source") ?? "JSON");
    const value = String(formData.get("value") ?? "");
    onImport(source, value);
    onClose();
  };

  return (
    <ModalShell
      description="Import workflows from JSON, file path, or endpoint."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="import-workflow-form" type="submit">
            Import Workflow
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Import Workflow"
    >
      <form className="space-y-3" id="import-workflow-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Import Source</span>
          <select className={fieldClassName} defaultValue="JSON" name="source">
            <option className="bg-[#071523]" value="JSON">
              JSON
            </option>
            <option className="bg-[#071523]" value="FILE">
              File
            </option>
            <option className="bg-[#071523]" value="URL">
              URL
            </option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Value</span>
          <input className={fieldClassName} name="value" placeholder="Paste JSON, file path, or URL" />
        </label>
      </form>
    </ModalShell>
  );
}
