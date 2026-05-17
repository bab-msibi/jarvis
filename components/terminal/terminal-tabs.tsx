import { TerminalSession } from "@/types/terminal";
import { TerminalStatusBadge } from "@/components/terminal/terminal-status-badge";
import { cn } from "@/lib/utils";

type TerminalTabsProps = {
  sessions: TerminalSession[];
  activeSessionId: string | null;
  onChange: (sessionId: string) => void;
};

export function TerminalTabs({ sessions, activeSessionId, onChange }: TerminalTabsProps) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto border-b border-cyan-900/35 px-3 py-2">
      {sessions.map((session) => {
        const active = activeSessionId === session.id;
        return (
          <button
            className={cn(
              "inline-flex max-w-[240px] shrink-0 items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition",
              active
                ? "border-cyan-500/55 bg-cyan-500/15 text-cyan-100"
                : "border-cyan-900/35 bg-sky-950/45 text-cyan-400 hover:border-cyan-500/45 hover:text-cyan-200"
            )}
            key={session.id}
            onClick={() => onChange(session.id)}
            type="button"
          >
            <span className="truncate">{session.name}</span>
            <TerminalStatusBadge status={session.status} />
          </button>
        );
      })}
    </div>
  );
}
