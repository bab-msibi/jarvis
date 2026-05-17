import { TerminalSession } from "@/types/terminal";
import { TerminalTabs } from "@/components/terminal/terminal-tabs";
import { TerminalOutput } from "@/components/terminal/terminal-output";
import { TerminalInput } from "@/components/terminal/terminal-input";
import { TerminalStatusBadge } from "@/components/terminal/terminal-status-badge";

type TerminalWindowProps = {
  sessions: TerminalSession[];
  activeSession: TerminalSession;
  activeSessionId: string;
  commandInput: string;
  onSessionChange: (sessionId: string) => void;
  onCommandChange: (command: string) => void;
  onRunCommand: () => void;
};

export function TerminalWindow({
  sessions,
  activeSession,
  activeSessionId,
  commandInput,
  onSessionChange,
  onCommandChange,
  onRunCommand
}: TerminalWindowProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-900/35 px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg text-cyan-100">Terminal Window</h3>
          <p className="truncate text-xs text-cyan-600">Session: {activeSession.name}</p>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="max-w-[160px] truncate rounded-md border border-cyan-900/35 bg-sky-950/40 px-2 py-1 text-xs text-cyan-300" title={activeSession.agent}>
            {activeSession.agent}
          </span>
          <TerminalStatusBadge status={activeSession.status} />
        </div>
      </header>

      <TerminalTabs activeSessionId={activeSessionId} onChange={onSessionChange} sessions={sessions} />
      <TerminalOutput lines={activeSession.logs} />
      <TerminalInput currentPath={activeSession.cwd} onChange={onCommandChange} onRun={onRunCommand} value={commandInput} />
    </section>
  );
}
