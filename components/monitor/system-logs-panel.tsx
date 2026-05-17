import { Trash2 } from "lucide-react";

import { LogEntry } from "@/components/monitor/log-entry";
import { MonitorLog } from "@/types/monitor";

type SystemLogsPanelProps = {
  logs: MonitorLog[];
  onClear: () => void;
};

export function SystemLogsPanel({ logs, onClear }: SystemLogsPanelProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="flex items-center justify-between border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-lg text-cyan-200">System Logs</h3>
        <button
          className="inline-flex items-center gap-1 rounded-md border border-cyan-700/45 px-2 py-1 text-xs text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
          onClick={onClear}
          type="button"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear
        </button>
      </header>

      <div className="max-h-[360px] space-y-2 overflow-y-auto p-4">
        {logs.length ? (
          logs.map((log) => <LogEntry key={log.id} log={log} />)
        ) : (
          <div className="rounded-lg border border-dashed border-cyan-900/45 px-4 py-6 text-center text-sm text-cyan-600">No logs available.</div>
        )}
      </div>
    </section>
  );
}
