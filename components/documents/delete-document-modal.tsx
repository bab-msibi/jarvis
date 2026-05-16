"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { DocumentItem } from "@/types/document";

type DeleteDocumentModalProps = {
  open: boolean;
  document?: DocumentItem;
  onClose: () => void;
  onDelete: (documentId: string) => void;
};

export function DeleteDocumentModal({ open, document, onClose, onDelete }: DeleteDocumentModalProps) {
  return (
    <ModalShell
      description={document ? `Delete ${document.name}? This action cannot be undone.` : "Select a document first."}
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
            className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!document}
            onClick={() => {
              if (!document) return;
              onDelete(document.id);
              onClose();
            }}
            type="button"
          >
            Delete Document
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Delete Document"
    >
      <p className="text-sm text-cyan-500">Archived documents can be restored later, but permanent deletion removes metadata and indexing history.</p>
    </ModalShell>
  );
}
