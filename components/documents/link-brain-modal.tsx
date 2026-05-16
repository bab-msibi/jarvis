"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { DocumentItem } from "@/types/document";

type LinkBrainModalProps = {
  open: boolean;
  document?: DocumentItem;
  brainOptions: string[];
  onClose: () => void;
  onLink: (documentId: string, brain: string) => void;
};

export function LinkBrainModal({ open, document, brainOptions, onClose, onLink }: LinkBrainModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!document) return;
    const formData = new FormData(event.currentTarget);
    const brain = String(formData.get("brain") ?? "");
    if (!brain) return;
    onLink(document.id, brain);
    onClose();
  };

  return (
    <ModalShell
      description={document ? `Assign ${document.name} to another brain.` : "Select a document first."}
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
            form="link-brain-form"
            type="submit"
          >
            Link Brain
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Link To Brain"
    >
      <form className="space-y-3" id="link-brain-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Brain</span>
          <select
            className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none"
            defaultValue={document?.linkedBrain ?? brainOptions[0] ?? ""}
            name="brain"
          >
            {brainOptions.map((brain) => (
              <option className="bg-[#071523]" key={brain} value={brain}>
                {brain}
              </option>
            ))}
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
