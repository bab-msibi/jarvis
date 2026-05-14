"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Brain, BrainStatus } from "@/types/brain";

type EditBrainModalProps = {
  open: boolean;
  brain?: Brain;
  onClose: () => void;
  onSave: (brainId: string, updates: Partial<Brain>) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function EditBrainModal({ open, brain, onClose, onSave }: EditBrainModalProps) {
  if (!brain) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave(brain.id, {
      name: String(formData.get("name") ?? brain.name).trim() || brain.name,
      version: String(formData.get("version") ?? brain.version),
      status: String(formData.get("status") ?? brain.status) as BrainStatus,
      description: String(formData.get("description") ?? brain.description),
      purpose: String(formData.get("purpose") ?? brain.purpose),
      knowledgeSource: String(formData.get("knowledgeSource") ?? brain.knowledgeSource),
      memorySource: String(formData.get("memorySource") ?? brain.memorySource),
      lastUpdated: "just now"
    });
    onClose();
  };

  return (
    <ModalShell
      description="Edit brain configuration and orchestration behavior."
      onClose={onClose}
      open={open}
      title="Edit Brain"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="edit-brain-form" type="submit">
            Save Changes
          </button>
        </>
      }
    >
      <form className="space-y-3" id="edit-brain-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Brain Name</span>
          <input className={fieldClassName} defaultValue={brain.name} name="name" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Version</span>
            <input className={fieldClassName} defaultValue={brain.version} name="version" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
            <select className={fieldClassName} defaultValue={brain.status} name="status">
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
          <input className={fieldClassName} defaultValue={brain.description} name="description" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Purpose</span>
          <input className={fieldClassName} defaultValue={brain.purpose} name="purpose" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Knowledge Source</span>
          <input className={fieldClassName} defaultValue={brain.knowledgeSource} name="knowledgeSource" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Memory Source</span>
          <input className={fieldClassName} defaultValue={brain.memorySource} name="memorySource" />
        </label>
      </form>
    </ModalShell>
  );
}
