"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { MemoryItem } from "@/types/memory";

type DeleteMemoryModalProps = {
  open: boolean;
  memory?: MemoryItem;
  onClose: () => void;
  onDelete: (memoryId: string) => void;
};

export function DeleteMemoryModal({ open, memory, onClose, onDelete }: DeleteMemoryModalProps) {
  return (
    <ModalShell
      description={memory ? `Delete memory ${memory.embeddingId}? This action cannot be undone.` : "Select a memory first."}
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!memory}
            onClick={() => {
              if (!memory) return;
              onDelete(memory.id);
              onClose();
            }}
            type="button"
          >
            Delete Memory
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Delete Memory"
    >
      <p className="text-sm text-cyan-500">Consider exporting this memory before deletion if it may be required for future recall.</p>
    </ModalShell>
  );
}
