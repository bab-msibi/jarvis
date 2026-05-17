import { DocumentTypeBreakdown } from "@/types/document";

type DocumentOverviewChartProps = {
  totalDocuments: number;
  breakdown: DocumentTypeBreakdown[];
};

export function DocumentOverviewChart({ totalDocuments, breakdown }: DocumentOverviewChartProps) {
  const segments = breakdown.reduce<{ segments: string[]; offset: number }>(
    (acc, item) => {
      const span = totalDocuments ? (item.count / totalDocuments) * 100 : 0;
      const start = acc.offset;
      const end = acc.offset + span;
      return {
        offset: end,
        segments: [...acc.segments, `${item.color} ${start}% ${end}%`]
      };
    },
    { segments: [], offset: 0 }
  ).segments;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative h-32 w-32 shrink-0">
        <div className="h-full w-full rounded-full border border-cyan-900/40" style={{ background: `conic-gradient(${segments.join(", ")})` }} />
        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#021024]">
          <p className="text-3xl text-cyan-100">{totalDocuments.toLocaleString()}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Total</p>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        {breakdown.map((item) => {
          const percent = totalDocuments ? Math.round((item.count / totalDocuments) * 100) : 0;
          return (
            <div className="flex items-center gap-2 text-sm" key={item.label}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <p className="text-cyan-100">
                {item.label} <span className="text-cyan-600">{item.count.toLocaleString()} ({percent}%)</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
