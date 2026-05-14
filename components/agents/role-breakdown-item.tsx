import { cn } from "@/lib/utils";

type RoleBreakdownItemProps = {
  label: string;
  value: number;
  total: number;
  barClassName: string;
};

export function RoleBreakdownItem({ label, value, total, barClassName }: RoleBreakdownItemProps) {
  const percentage = total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <p className="text-cyan-100">{label}</p>
        <p className="text-cyan-600">{value}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sky-950/80">
        <div className={cn("h-full rounded-full transition-all", barClassName)} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
