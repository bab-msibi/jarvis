"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

type ImportTasksModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (source: string, value: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function ImportTasksModal({ open, onClose, onImport }: ImportTasksModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const source = String(formData.get("source") ?? "CSV");
    const value = String(formData.get("value") ?? "").trim();
    onImport(source, value);
    onClose();
  };

  return (
    <ModalShell
      description="Import task data from CSV, JSON, or workflow endpoint."
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
            form="import-tasks-form"
            type="submit"
          >
            Import Tasks
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Import Tasks"
    >
      <form className="space-y-3" id="import-tasks-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Source Type</span>
          <select className={fieldClassName} defaultValue="CSV" name="source">
            <option className="bg-[#071523]" value="CSV">
              CSV File
            </option>
            <option className="bg-[#071523]" value="JSON">
              JSON Payload
            </option>
            <option className="bg-[#071523]" value="API">
              API Endpoint
            </option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Source Path / URL</span>
          <input className={fieldClassName} name="value" placeholder="D:\\data\\tasks.csv or https://api/tasks" />
        </label>
      </form>
    </ModalShell>
  );
}
