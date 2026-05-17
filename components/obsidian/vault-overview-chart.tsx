import { VaultOverviewDistribution } from "@/types/obsidian";

type VaultOverviewChartProps = {
  totalNotes: number;
  distribution: VaultOverviewDistribution;
};

type Slice = { label: string; value: number; color: string };

export function VaultOverviewChart({ totalNotes, distribution }: VaultOverviewChartProps) {
  const slices: Slice[] = [
    { label: "Projects", value: distribution.projects, color: "#22d3ee" },
    { label: "Areas", value: distribution.areas, color: "#a855f7" },
    { label: "Resources", value: distribution.resources, color: "#60a5fa" },
    { label: "Archive", value: distribution.archive, color: "#14b8a6" },
    { label: "Inbox", value: distribution.inbox, color: "#f59e0b" }
  ];

  let offset = 0;
  const segments = slices.map((slice) => {
    const span = totalNotes > 0 ? (slice.value / totalNotes) * 100 : 0;
    const start = offset;
    const end = offset + span;
    offset = end;
    return `${slice.color} ${start}% ${end}%`;
  });

  const background = `conic-gradient(${segments.join(", ")})`;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
        <div className="h-full w-full rounded-full border border-cyan-900/40" style={{ background }} />
        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#021024]">
          <p className="text-3xl text-cyan-100">{totalNotes.toLocaleString()}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Total Notes</p>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        {slices.map((slice) => {
          const percent = totalNotes ? Math.round((slice.value / totalNotes) * 100) : 0;
          return (
            <div className="flex items-center gap-2 text-sm" key={slice.label}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
              <p className="text-cyan-100">
                {slice.label} <span className="text-cyan-600">{percent}% ({slice.value.toLocaleString()})</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
