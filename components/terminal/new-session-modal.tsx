"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { TerminalSessionType } from "@/types/terminal";

export type NewSessionInput = {
  name: string;
  type: TerminalSessionType;
  agent: string;
  cwd: string;
};

type NewSessionModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (values: NewSessionInput) => void;
};

const sessionTypes: TerminalSessionType[] = ["Agent Shell", "Service", "Worker", "System"];

export function NewSessionModal({ open, onClose, onCreate }: NewSessionModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: NewSessionInput = {
      name: String(formData.get("name") ?? "").trim(),
      type: String(formData.get("type") ?? "Agent Shell") as TerminalSessionType,
      agent: String(formData.get("agent") ?? "System").trim(),
      cwd: String(formData.get("cwd") ?? "/Users/owner/jarvis").trim()
    };
    if (!values.name) return;
    onCreate(values);
    onClose();
  };

  return (
    <ModalShell
      description="Create a new terminal session for an agent or service."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="new-session-form" type="submit">
            Create Session
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="New Session"
    >
      <form className="space-y-3" id="new-session-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Session Name</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" name="name" required />
        </label>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Type</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue="Agent Shell" name="type">
            {sessionTypes.map((type) => (
              <option className="bg-[#071523]" key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Agent / Owner</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" defaultValue="System" name="agent" />
        </label>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Working Directory</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500/60" defaultValue="/Users/owner/jarvis" name="cwd" />
        </label>
      </form>
    </ModalShell>
  );
}
