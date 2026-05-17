type SettingsDangerZoneProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function SettingsDangerZone({ title, description, actionLabel, onAction }: SettingsDangerZoneProps) {
  return (
    <section className="rounded-xl border border-rose-500/35 bg-rose-950/20 p-4">
      <h3 className="text-sm text-rose-100">{title}</h3>
      <p className="mt-1 text-xs text-rose-300/90">{description}</p>
      <button
        className="mt-3 inline-flex items-center rounded-md border border-rose-500/55 bg-rose-500/15 px-3 py-1.5 text-sm text-rose-100 transition hover:bg-rose-500/25"
        onClick={onAction}
        type="button"
      >
        {actionLabel}
      </button>
    </section>
  );
}
