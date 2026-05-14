"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { BrainStatus } from "@/types/brain";

export type AddBrainInput = {
  name: string;
  version: string;
  status: BrainStatus;
  description: string;
  purpose: string;
  knowledgeSource: string;
  memorySource: string;
};

type AddBrainModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (values: AddBrainInput) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function AddBrainModal({ open, onClose, onAdd }: AddBrainModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;

    onAdd({
      name,
      version: String(formData.get("version") ?? "1.0"),
      status: String(formData.get("status") ?? "ACTIVE") as BrainStatus,
      description: String(formData.get("description") ?? "New brain system"),
      purpose: String(formData.get("purpose") ?? "General purpose orchestration"),
      knowledgeSource: String(formData.get("knowledgeSource") ?? "Obsidian Vault"),
      memorySource: String(formData.get("memorySource") ?? "Default memory graph")
    });
    onClose();
  };

  return (
    <ModalShell
      description="Create a new cognitive brain module for orchestration."
      onClose={onClose}
      open={open}
      title="Add Brain"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="add-brain-form" type="submit">
            Add Brain
          </button>
        </>
      }
    >
      <form className="space-y-3" id="add-brain-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Brain Name</span>
          <input className={fieldClassName} name="name" placeholder="Example: Strategy Brain" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Version</span>
            <input className={fieldClassName} defaultValue="1.0" name="version" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
            <select className={fieldClassName} defaultValue="ACTIVE" name="status">
              <option className="bg-[#071523]" value="ACTIVE">
                ACTIVE
              </option>
              <option className="bg-[#071523]" value="IDLE">
                IDLE
              </option>
              <option className="bg-[#071523]" value="UPDATING">
                UPDATING
              </option>
              <option className="bg-[#071523]" value="ERROR">
                ERROR
              </option>
            </select>
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Description</span>
          <input className={fieldClassName} defaultValue="New brain system" name="description" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Purpose</span>
          <input className={fieldClassName} defaultValue="General purpose orchestration" name="purpose" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Knowledge Source</span>
          <input className={fieldClassName} defaultValue="Obsidian Vault" name="knowledgeSource" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Memory Source</span>
          <input className={fieldClassName} defaultValue="Default memory graph" name="memorySource" />
        </label>
      </form>
    </ModalShell>
  );
}
