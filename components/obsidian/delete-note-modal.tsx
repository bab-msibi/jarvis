"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { ObsidianNote } from "@/types/obsidian";

type DeleteNoteModalProps = {
  open: boolean;
  note?: ObsidianNote;
  onClose: () => void;
  onDelete: (noteId: string) => void;
};

export function DeleteNoteModal({ open, note, onClose, onDelete }: DeleteNoteModalProps) {
  if (!note) return null;

  return (
    <ModalShell
      description="This removes the note from the indexed dataset."
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
            className="rounded-md border border-rose-500/50 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => {
              onDelete(note.id);
              onClose();
            }}
            type="button"
          >
            Delete Note
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Delete Note"
    >
      <p className="text-sm text-cyan-300">
        Delete <span className="text-cyan-100">{note.title}</span>? This action cannot be undone.
      </p>
    </ModalShell>
  );
}
