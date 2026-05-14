type CircularOverviewChartProps = {
  total: number;
  inProgress: number;
  completed: number;
  onHold: number;
  failed: number;
  backlog: number;
};

type Slice = {
  label: string;
  value: number;
  color: string;
};

export function CircularOverviewChart({ total, inProgress, completed, onHold, failed, backlog }: CircularOverviewChartProps) {
  const slices: Slice[] = [
    { label: "In Progress", value: inProgress, color: "#22d3ee" },
    { label: "Completed", value: completed, color: "#22c55e" },
    { label: "On Hold", value: onHold, color: "#f59e0b" },
    { label: "Failed", value: failed, color: "#ef4444" },
    { label: "Backlog", value: backlog, color: "#64748b" }
  ];

  let offset = 0;
  const segments = slices.map((slice) => {
    const span = total > 0 ? (slice.value / total) * 100 : 0;
    const start = offset;
    const end = offset + span;
    offset = end;
    return `${slice.color} ${start}% ${end}%`;
  });

  const background = `conic-gradient(${segments.join(", ")})`;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-36 w-36">
        <div className="h-full w-full rounded-full border border-cyan-900/40" style={{ background }} />
        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#021024]">
          <p className="text-3xl text-cyan-100">{total}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Total</p>
        </div>
      </div>

      <div className="space-y-2">
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
