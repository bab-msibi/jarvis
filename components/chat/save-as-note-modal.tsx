"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type SaveAsNoteValues = {
  title: string;
  destination: "obsidian" | "documents" | "memory";
  includeMetadata: boolean;
};

type SaveAsNoteModalProps = {
  open: boolean;
  defaultTitle: string;
  onClose: () => void;
  onSave: (values: SaveAsNoteValues) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function SaveAsNoteModal({ open, defaultTitle, onClose, onSave }: SaveAsNoteModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSave({
      title: String(formData.get("title") ?? "").trim() || defaultTitle,
      destination: String(formData.get("destination") ?? "obsidian") as SaveAsNoteValues["destination"],
      includeMetadata: formData.get("includeMetadata") === "on"
    });

    onClose();
  };

  return (
    <ModalShell
      description="Save this conversation into your knowledge system for future recall."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="save-note-form" type="submit">
            Save Note
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Save Chat as Note"
    >
      <form className="space-y-3" id="save-note-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Note Title</span>
          <input className={fieldClassName} defaultValue={defaultTitle} name="title" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Destination</span>
          <select className={fieldClassName} defaultValue="obsidian" name="destination">
            <option className="bg-[#071523]" value="obsidian">
              Obsidian Vault
            </option>
            <option className="bg-[#071523]" value="documents">
              Documents
            </option>
            <option className="bg-[#071523]" value="memory">
              Memory System
            </option>
          </select>
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-cyan-300">
          <input className="h-4 w-4 accent-cyan-400" defaultChecked name="includeMetadata" type="checkbox" />
          Include model, token and timestamp metadata
        </label>
      </form>
    </ModalShell>
  );
}
