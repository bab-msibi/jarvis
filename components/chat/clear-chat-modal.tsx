"use client";

import { ModalShell } from "@/components/ui/modal-shell";

type ClearChatModalProps = {
  open: boolean;
  sessionTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ClearChatModal({ open, sessionTitle, onClose, onConfirm }: ClearChatModalProps) {
  return (
    <ModalShell
      description={`This will clear all messages from "${sessionTitle}". This action can not be undone in this mock state.`}
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
            onClick={onConfirm}
            type="button"
          >
            Clear Chat
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Clear Chat History"
    >
      <p className="text-sm text-cyan-300">Use this when you want a clean context for a new prompt chain.</p>
    </ModalShell>
  );
}
