type CircularOverviewChartProps = {
  total: number;
  online: number;
  busy: number;
  idle: number;
  error: number;
};

type Slice = {
  label: string;
  value: number;
  color: string;
};

export function CircularOverviewChart({ total, online, busy, idle, error }: CircularOverviewChartProps) {
  const slices: Slice[] = [
    { label: "Online", value: online, color: "#22c55e" },
    { label: "Busy", value: busy, color: "#eab308" },
    { label: "Idle", value: idle, color: "#64748b" },
    { label: "Error", value: error, color: "#ef4444" }
  ];

  let offset = 0;
  const gradientParts = slices.map((slice) => {
    const span = total > 0 ? (slice.value / total) * 100 : 0;
    const start = offset;
    const end = offset + span;
    offset = end;
    return `${slice.color} ${start}% ${end}%`;
  });

  const background = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
        <div className="h-full w-full rounded-full border border-cyan-900/40" style={{ background }} />
        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#021024]">
          <p className="text-3xl text-cyan-100">{total}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Total</p>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        {slices.map((slice) => {
          const percent = total ? Math.round((slice.value / total) * 100) : 0;
          return (
            <div className="flex items-center gap-2 text-sm" key={slice.label}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
              <p className="text-cyan-100">
                {slice.value} <span className="text-cyan-600">{slice.label} ({percent}%)</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
