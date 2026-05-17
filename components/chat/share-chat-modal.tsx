"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";

export type ShareChatValues = {
  recipientGroup: "pm" | "engineering" | "research" | "all";
  message: string;
};

type ShareChatModalProps = {
  open: boolean;
  onClose: () => void;
  onShare: (values: ShareChatValues) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function ShareChatModal({ open, onClose, onShare }: ShareChatModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onShare({
      recipientGroup: String(formData.get("recipientGroup") ?? "pm") as ShareChatValues["recipientGroup"],
      message: String(formData.get("message") ?? "").trim()
    });

    onClose();
  };

  return (
    <ModalShell
      description="Share this conversation internally for collaboration or approvals."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="share-chat-form" type="submit">
            Share Chat
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Share Chat"
    >
      <form className="space-y-3" id="share-chat-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Share With</span>
          <select className={fieldClassName} defaultValue="pm" name="recipientGroup">
            <option className="bg-[#071523]" value="pm">
              PM Team
            </option>
            <option className="bg-[#071523]" value="engineering">
              Engineering Team
            </option>
            <option className="bg-[#071523]" value="research">
              Research Team
            </option>
            <option className="bg-[#071523]" value="all">
              All Teams
            </option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Share Message (Optional)</span>
          <textarea
            className="h-24 w-full resize-none rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 py-2 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60"
            name="message"
            placeholder="Add context for recipients..."
          />
        </label>
      </form>
    </ModalShell>
  );
}
