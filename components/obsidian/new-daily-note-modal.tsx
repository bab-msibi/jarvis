"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type NewDailyNoteInput = {
  date: string;
  tags: string;
};

type NewDailyNoteModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (values: NewDailyNoteInput) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function NewDailyNoteModal({ open, onClose, onCreate }: NewDailyNoteModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const date = String(formData.get("date") ?? "");
    if (!date) return;
    onCreate({
      date,
      tags: String(formData.get("tags") ?? "")
    });
    onClose();
  };

  return (
    <ModalShell
      description="Create a daily note template instance."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="new-daily-note-form" type="submit">
            Create Daily Note
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="New Daily Note"
    >
      <form className="space-y-3" id="new-daily-note-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Date</span>
          <input className={fieldClassName} defaultValue={new Date().toISOString().slice(0, 10)} name="date" type="date" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Tags</span>
          <input className={fieldClassName} defaultValue="#daily" name="tags" />
        </label>
      </form>
    </ModalShell>
  );
}
