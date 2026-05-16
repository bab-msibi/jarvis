import { DocumentActivityLog } from "@/types/document";

import { DocumentTypeIcon } from "@/components/documents/document-utils";

type RecentActivityPanelProps = {
  logs: DocumentActivityLog[];
};

export function RecentActivityPanel({ logs }: RecentActivityPanelProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Recent Document Activity</h3>
      </header>
      <div className="space-y-3 p-4">
        {logs.map((log) => (
          <div className="flex items-start gap-2" key={log.id}>
            <span className="mt-0.5 rounded-md border border-cyan-900/35 bg-cyan-500/10 p-1.5 text-cyan-300">
              <DocumentTypeIcon className="h-3.5 w-3.5" type={log.type} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-cyan-100">{log.documentName}</p>
              <p className="truncate text-xs text-cyan-600">{log.action}</p>
            </div>
            <span className="whitespace-nowrap text-xs text-cyan-500">{log.timestamp}</span>
          </div>
        ))}
        <button className="pt-1 text-sm text-cyan-400 transition hover:text-cyan-200" type="button">
          View all activity
        </button>
      </div>
    </section>
  );
}
