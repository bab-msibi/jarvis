"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { Model } from "@/types/model";

type DeleteModelModalProps = {
  open: boolean;
  model?: Model;
  onClose: () => void;
  onDelete: (modelId: string) => void;
};

export function DeleteModelModal({ open, model, onClose, onDelete }: DeleteModelModalProps) {
  return (
    <ModalShell
      description={`This will remove ${model?.name ?? "this model"} from the orchestration registry.`}
      onClose={onClose}
      open={open}
      title="Delete Model"
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
            className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => {
              if (!model) return;
              onDelete(model.id);
              onClose();
            }}
            type="button"
          >
            Delete Model
          </button>
        </>
      }
    >
      <p className="text-sm text-cyan-300">Connected workloads may fail until a replacement model is assigned.</p>
    </ModalShell>
  );
}
