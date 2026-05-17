import { ReactNode } from "react";

type SettingsFieldProps = {
  label: string;
  description: string;
  error?: string;
  children: ReactNode;
};

export function SettingsField({ label, description, error, children }: SettingsFieldProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/30 p-3">
      <div className="mb-2">
        <p className="text-sm text-cyan-100">{label}</p>
        <p className="text-xs text-cyan-600">{description}</p>
      </div>
      {children}
      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
    </article>
  );
}
