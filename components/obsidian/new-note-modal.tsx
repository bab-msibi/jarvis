"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type NewNoteInput = {
  title: string;
  folder: string;
  tags: string;
  noteType: "note" | "template" | "system";
};

type NewNoteModalProps = {
  open: boolean;
  folders: string[];
  onClose: () => void;
  onCreate: (values: NewNoteInput) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function NewNoteModal({ open, folders, onClose, onCreate }: NewNoteModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    if (!title) return;
    onCreate({
      title,
      folder: String(formData.get("folder") ?? folders[0] ?? "01 - Inbox"),
      tags: String(formData.get("tags") ?? ""),
      noteType: String(formData.get("noteType") ?? "note") as "note" | "template" | "system"
    });
    onClose();
  };

  return (
    <ModalShell
      description="Create a new note in your Obsidian vault."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="new-note-form" type="submit">
            Create Note
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="New Note"
    >
      <form className="space-y-3" id="new-note-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Title</span>
          <input className={fieldClassName} name="title" placeholder="Note title" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Folder</span>
          <select className={fieldClassName} defaultValue={folders[0] ?? "01 - Inbox"} name="folder">
            {folders.map((folder) => (
              <option className="bg-[#071523]" key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Tags</span>
            <input className={fieldClassName} name="tags" placeholder="#planning, #ai" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Type</span>
            <select className={fieldClassName} defaultValue="note" name="noteType">
              <option className="bg-[#071523]" value="note">
                Note
              </option>
              <option className="bg-[#071523]" value="template">
                Template
              </option>
              <option className="bg-[#071523]" value="system">
                System
              </option>
            </select>
          </label>
        </div>
      </form>
    </ModalShell>
  );
}
