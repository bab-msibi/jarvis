type ServiceAvailabilityPanelProps = {
  entries: Array<{
    label: string;
    value: number;
  }>;
};

export function ServiceAvailabilityPanel({ entries }: ServiceAvailabilityPanelProps) {
  return (
    <div className="space-y-2.5">
      {entries.map((entry) => (
        <div className="space-y-1" key={entry.label}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-100">{entry.label}</span>
            <span className="text-cyan-500">{entry.value}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-sky-950/70">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${Math.max(3, entry.value)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
