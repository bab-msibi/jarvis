import { DocumentStorageOverview } from "@/types/document";

type StorageOverviewChartProps = {
  storage: DocumentStorageOverview;
};

export function StorageOverviewChart({ storage }: StorageOverviewChartProps) {
  const segments = storage.slices.reduce<{ segments: string[]; offset: number }>(
    (acc, slice) => {
      const span = storage.usedGB > 0 ? (slice.valueGB / storage.usedGB) * 100 : 0;
      const start = acc.offset;
      const end = acc.offset + span;
      return {
        offset: end,
        segments: [...acc.segments, `${slice.color} ${start}% ${end}%`]
      };
    },
    { segments: [], offset: 0 }
  ).segments;

  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Storage Overview</h3>
      </header>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative h-36 w-36">
            <div className="h-full w-full rounded-full border border-cyan-900/40" style={{ background: `conic-gradient(${segments.join(", ")})` }} />
            <div className="absolute inset-[12px] flex flex-col items-center justify-center rounded-full bg-[#021024] text-center">
              <p className="text-3xl text-cyan-100">{storage.usedGB.toFixed(1)} GB</p>
              <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Used</p>
            </div>
          </div>

          <div className="space-y-2">
            {storage.slices.map((slice) => {
              const percent = storage.usedGB ? Math.round((slice.valueGB / storage.usedGB) * 100) : 0;
              return (
                <div className="flex items-center gap-2 text-sm" key={slice.label}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                  <span className="text-cyan-200">{slice.label}</span>
                  <span className="text-cyan-500">{slice.valueGB.toFixed(1)} GB ({percent}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-cyan-900/35 pt-3 text-sm text-cyan-500">
          <span>Total Storage: {storage.totalGB.toFixed(0)} GB</span>
          <span>Available: {storage.availableGB.toFixed(1)} GB</span>
        </div>
      </div>
    </section>
  );
}
