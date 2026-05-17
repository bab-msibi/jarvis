"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { ChatModel } from "@/types/chat";

type ChangeModelModalProps = {
  open: boolean;
  models: ChatModel[];
  currentModelId: string;
  onClose: () => void;
  onChangeModel: (modelId: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function ChangeModelModal({ open, models, currentModelId, onClose, onChangeModel }: ChangeModelModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const modelId = String(formData.get("modelId") ?? currentModelId);
    onChangeModel(modelId);
    onClose();
  };

  return (
    <ModalShell
      description="Switch the model used by the current session."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="change-model-form" type="submit">
            Apply Model
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Change Session Model"
    >
      <form className="space-y-3" id="change-model-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Select Model</span>
          <select className={fieldClassName} defaultValue={currentModelId} name="modelId">
            {models.map((model) => (
              <option className="bg-[#071523]" key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
