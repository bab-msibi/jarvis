import { TerminalCommandHistoryItem } from "@/types/terminal";
import { cn } from "@/lib/utils";

type CommandHistoryProps = {
  items: TerminalCommandHistoryItem[];
};

const statusStyles: Record<TerminalCommandHistoryItem["status"], string> = {
  SUCCESS: "text-emerald-200 border-emerald-500/35 bg-emerald-500/15",
  FAILED: "text-rose-200 border-rose-500/35 bg-rose-500/15",
  BLOCKED: "text-amber-200 border-amber-500/35 bg-amber-500/15"
};

export function CommandHistory({ items }: CommandHistoryProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-lg text-cyan-200">Command History</h3>
      </header>
      <div className="max-h-[220px] space-y-2 overflow-auto p-4">
        {items.map((item) => (
          <div className="rounded-lg border border-cyan-900/30 bg-sky-950/25 px-3 py-2" key={item.id}>
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-mono text-xs text-cyan-100">{item.command}</p>
              <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px]", statusStyles[item.status])}>{item.status}</span>
            </div>
            <p className="mt-1 text-xs text-cyan-600">
              {item.sessionName} - {item.executedAt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
