"use client";

import { Eye, Power } from "lucide-react";

import { TerminalSession } from "@/types/terminal";
import { TerminalStatusBadge } from "@/components/terminal/terminal-status-badge";

type SessionRowProps = {
  session: TerminalSession;
  onOpen: (session: TerminalSession) => void;
  onKill: (session: TerminalSession) => void;
};

export function SessionRow({ session, onOpen, onKill }: SessionRowProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45">
      <div className="flex items-center justify-between gap-2">
        <button className="text-left" onClick={() => onOpen(session)} type="button">
          <p className="text-sm text-cyan-100">{session.name}</p>
          <p className="text-xs text-cyan-600">{session.type} / {session.agent}</p>
        </button>
        <TerminalStatusBadge status={session.status} />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-cyan-500">
        <p>CPU {session.cpuUsage}%</p>
        <p>RAM {session.ramUsage}%</p>
        <p className="col-span-2 truncate">{session.currentCommand}</p>
      </div>

      <div className="mt-2 flex items-center gap-1">
        <button
          className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-1.5 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
          onClick={() => onOpen(session)}
          type="button"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button
          className="rounded-md border border-rose-900/35 bg-rose-950/20 p-1.5 text-rose-300 transition hover:border-rose-500/50 hover:text-rose-100"
          onClick={() => onKill(session)}
          type="button"
        >
          <Power className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
