import { Clock3, Gauge, MessageSquare, Sparkles, User } from "lucide-react";

import { ChatAgent, ChatModel, ChatSession } from "@/types/chat";

type SessionDetailsPanelProps = {
  session: ChatSession | undefined;
  agent: ChatAgent | undefined;
  model: ChatModel | undefined;
  sessionsForAgent: ChatSession[];
  onSelectSession: (sessionId: string) => void;
  onViewDetails: () => void;
};

function formatContextPercent(session: ChatSession | undefined) {
  if (!session || !session.contextWindow) return 0;
  const ratio = session.tokensUsed / session.contextWindow;
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}

export function SessionDetailsPanel({ session, agent, model, sessionsForAgent, onSelectSession, onViewDetails }: SessionDetailsPanelProps) {
  const contextPercent = formatContextPercent(session);

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h2 className="text-sm uppercase tracking-[0.08em] text-cyan-200">Current Session</h2>
      </header>

      <div className="space-y-3 p-4">
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Session</span>
          <select
            className="h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/45 px-3 text-sm text-cyan-100 outline-none focus:border-cyan-500/60"
            onChange={(event) => onSelectSession(event.target.value)}
            value={session?.id ?? ""}
          >
            {sessionsForAgent.length ? (
              sessionsForAgent.map((entry) => (
                <option className="bg-[#071523]" key={entry.id} value={entry.id}>
                  {entry.title}
                </option>
              ))
            ) : (
              <option className="bg-[#071523]" value="">
                No sessions
              </option>
            )}
          </select>
        </label>

        <div className="space-y-2 rounded-xl border border-cyan-900/35 bg-sky-950/35 p-3 text-sm">
          <p className="inline-flex items-center gap-2 text-cyan-400">
            <User className="h-4 w-4" />
            <span className="text-cyan-600">Selected Agent:</span>
            <span className="truncate text-cyan-100">{agent?.name ?? "None"}</span>
          </p>
          <p className="inline-flex items-center gap-2 text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-cyan-600">Current Model:</span>
            <span className="truncate text-cyan-100">{model?.name ?? "None"}</span>
          </p>
          <p className="inline-flex items-center gap-2 text-cyan-400">
            <Clock3 className="h-4 w-4" />
            <span className="text-cyan-600">Started:</span>
            <span className="truncate text-cyan-100">{session?.startedAt ?? "-"}</span>
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-cyan-900/35 bg-sky-950/35 p-3">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-cyan-600">
              <MessageSquare className="h-3.5 w-3.5" />
              Message Count
            </p>
            <p className="mt-1 text-lg text-cyan-100">{session?.messageCount ?? 0}</p>
          </div>
          <div className="rounded-xl border border-cyan-900/35 bg-sky-950/35 p-3">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-cyan-600">
              <Gauge className="h-3.5 w-3.5" />
              Tokens Used
            </p>
            <p className="mt-1 text-lg text-cyan-100">{session?.tokensUsed ?? 0}</p>
          </div>
        </div>

        <div className="rounded-xl border border-cyan-900/35 bg-sky-950/35 p-3">
          <div className="mb-1 flex items-center justify-between gap-2 text-xs text-cyan-600">
            <span>Context Window</span>
            <span className="text-cyan-300">{contextPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-cyan-950/70">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400" style={{ width: `${contextPercent}%` }} />
          </div>
        </div>

        <button
          className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-cyan-500/45 bg-cyan-500/12 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/22"
          onClick={onViewDetails}
          type="button"
        >
          View Full Session Details
        </button>
      </div>
    </section>
  );
}
