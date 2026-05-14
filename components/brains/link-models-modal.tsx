"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Brain } from "@/types/brain";

type LinkModelsModalProps = {
  open: boolean;
  brain?: Brain;
  modelOptions: string[];
  onClose: () => void;
  onSave: (brainId: string, models: string[]) => void;
};

export function LinkModelsModal({ open, brain, modelOptions, onClose, onSave }: LinkModelsModalProps) {
  if (!brain) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const models = formData.getAll("models").map((value) => String(value));
    onSave(brain.id, models);
    onClose();
  };

  return (
    <ModalShell
      description={`Update linked models for ${brain.name}.`}
      onClose={onClose}
      open={open}
      title="Link Models"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="link-models-form" type="submit">
            Save Links
          </button>
        </>
      }
    >
      <form className="space-y-2" id="link-models-form" onSubmit={onSubmit}>
        {modelOptions.map((model) => (
          <label className="flex items-center gap-2 rounded-md border border-cyan-900/30 bg-sky-950/30 px-3 py-2 text-sm text-cyan-100" key={model}>
            <input className="accent-cyan-400" defaultChecked={brain.linkedModels.includes(model)} name="models" type="checkbox" value={model} />
            {model}
          </label>
        ))}
      </form>
    </ModalShell>
  );
}
