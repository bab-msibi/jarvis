"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type ExportChatValues = {
  format: "markdown" | "json" | "txt";
  includeMeta: boolean;
};

type ExportChatModalProps = {
  open: boolean;
  onClose: () => void;
  onExport: (values: ExportChatValues) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function ExportChatModal({ open, onClose, onExport }: ExportChatModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onExport({
      format: String(formData.get("format") ?? "markdown") as ExportChatValues["format"],
      includeMeta: formData.get("includeMeta") === "on"
    });

    onClose();
  };

  return (
    <ModalShell
      description="Export this chat session for documentation, handovers or archival."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="export-chat-form" type="submit">
            Export
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Export Chat"
    >
      <form className="space-y-3" id="export-chat-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Format</span>
          <select className={fieldClassName} defaultValue="markdown" name="format">
            <option className="bg-[#071523]" value="markdown">
              Markdown (.md)
            </option>
            <option className="bg-[#071523]" value="json">
              JSON (.json)
            </option>
            <option className="bg-[#071523]" value="txt">
              Plain Text (.txt)
            </option>
          </select>
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-cyan-300">
          <input className="h-4 w-4 accent-cyan-400" defaultChecked name="includeMeta" type="checkbox" />
          Include session metadata and token statistics
        </label>
      </form>
    </ModalShell>
  );
}
