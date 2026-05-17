import { cn } from "@/lib/utils";

type SettingsToggleProps = {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
};

export function SettingsToggle({ checked, onCheckedChange }: SettingsToggleProps) {
  return (
    <button
      aria-label="Toggle setting"
      className={cn(
        "relative inline-flex h-6 w-12 items-center rounded-full border transition",
        checked ? "border-emerald-400/55 bg-emerald-500/20" : "border-cyan-900/45 bg-sky-950/45"
      )}
      onClick={() => onCheckedChange(!checked)}
      type="button"
    >
      <span
        className={cn(
          "absolute h-4 w-4 rounded-full transition",
          checked ? "left-[26px] bg-emerald-300" : "left-[4px] bg-cyan-500"
        )}
      />
    </button>
  );
}
