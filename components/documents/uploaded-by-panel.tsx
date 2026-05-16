import { DocumentUploaderStat } from "@/types/document";

type UploadedByPanelProps = {
  uploads: DocumentUploaderStat[];
};

export function UploadedByPanel({ uploads }: UploadedByPanelProps) {
  const max = Math.max(1, ...uploads.map((entry) => entry.count));

  return (
    <div className="space-y-2.5">
      {uploads.map((entry) => {
        const percent = Math.round((entry.count / max) * 100);
        return (
          <div className="flex items-center gap-2" key={entry.name}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-700/40 bg-sky-950/60 text-[10px] uppercase text-cyan-300">
              {entry.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="truncate text-xs text-cyan-200">{entry.name}</span>
                <span className="text-xs text-cyan-500">{entry.count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-sky-950/80">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-300" style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
