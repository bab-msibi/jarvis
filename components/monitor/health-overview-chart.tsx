type HealthOverviewChartProps = {
  slices: Array<{
    label: string;
    value: number;
    color: string;
  }>;
};

export function HealthOverviewChart({ slices }: HealthOverviewChartProps) {
  const total = slices.reduce((sum, item) => sum + item.value, 0);

  const gradientParts = slices.reduce<{ offset: number; parts: string[] }>(
    (acc, slice) => {
      const span = total > 0 ? (slice.value / total) * 100 : 0;
      const start = acc.offset;
      const end = start + span;
      return {
        offset: end,
        parts: [...acc.parts, `${slice.color} ${start}% ${end}%`]
      };
    },
    { offset: 0, parts: [] }
  ).parts;

  const background = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative h-32 w-32 shrink-0">
        <div className="h-full w-full rounded-full border border-cyan-900/40" style={{ background }} />
        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#021024]">
          <p className="text-2xl text-cyan-100">{total}</p>
          <p className="text-[10px] uppercase tracking-[0.08em] text-cyan-600">Total</p>
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
