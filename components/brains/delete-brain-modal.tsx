"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { Brain } from "@/types/brain";

type DeleteBrainModalProps = {
  open: boolean;
  brain?: Brain;
  onClose: () => void;
  onDelete: (brainId: string) => void;
};

export function DeleteBrainModal({ open, brain, onClose, onDelete }: DeleteBrainModalProps) {
  return (
    <ModalShell
      description={`This will remove ${brain?.name ?? "this brain"} from the cognition system.`}
      onClose={onClose}
      open={open}
      title="Delete Brain"
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
              if (!brain) return;
              onDelete(brain.id);
              onClose();
            }}
            type="button"
          >
            Delete Brain
          </button>
        </>
      }
    >
      <p className="text-sm text-cyan-300">Linked agents and models should be reassigned before deletion in production.</p>
    </ModalShell>
  );
}
