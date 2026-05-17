"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { TerminalSession } from "@/types/terminal";

export type RunCommandInput = {
  sessionId: string;
  command: string;
};

type RunCommandModalProps = {
  open: boolean;
  sessions: TerminalSession[];
  onClose: () => void;
  onRun: (values: RunCommandInput) => void;
};

export function RunCommandModal({ open, sessions, onClose, onRun }: RunCommandModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: RunCommandInput = {
      sessionId: String(formData.get("sessionId") ?? sessions[0]?.id ?? ""),
      command: String(formData.get("command") ?? "").trim()
    };
    if (!values.command) return;
    onRun(values);
    onClose();
  };

  return (
    <ModalShell
      description="Prepare a command for approval and mocked execution."
      footer={
        <>
          <button className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="run-command-form" type="submit">
            Continue
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Run Command"
    >
      <form className="space-y-3" id="run-command-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Session</span>
          <select className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none" defaultValue={sessions[0]?.id} name="sessionId">
            {sessions.map((session) => (
              <option className="bg-[#071523]" key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Command</span>
          <input className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 font-mono text-cyan-100 outline-none focus:border-cyan-500/60" name="command" placeholder="ollama list" required />
        </label>
      </form>
    </ModalShell>
  );
}
