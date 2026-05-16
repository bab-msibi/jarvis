"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { DocumentItem } from "@/types/document";

type ShareDocumentModalProps = {
  open: boolean;
  document?: DocumentItem;
  onClose: () => void;
  onShare: (documentId: string, recipients: string, permission: "view" | "edit") => void;
};

export function ShareDocumentModal({ open, document, onClose, onShare }: ShareDocumentModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!document) return;
    const formData = new FormData(event.currentTarget);
    const recipients = String(formData.get("recipients") ?? "").trim();
    const permission = String(formData.get("permission") ?? "view") as "view" | "edit";
    onShare(document.id, recipients, permission);
    onClose();
  };

  return (
    <ModalShell
      description={document ? `Share ${document.name} with collaborators.` : "Select a document first."}
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
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!document}
            form="share-document-form"
            type="submit"
          >
            Share
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Share Document"
    >
      <form className="space-y-3" id="share-document-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Recipients</span>
          <input
            className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60"
            name="recipients"
            placeholder="john@jarvis.local, sarah@jarvis.local"
            required
          />
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Permission</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" name="permission">
            <option className="bg-[#071523]" value="view">
              View only
            </option>
            <option className="bg-[#071523]" value="edit">
              Can edit
            </option>
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
