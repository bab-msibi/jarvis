import { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="panel-base rounded-2xl p-4 sm:p-5">
      <header>
        <h2 className="text-xl text-cyan-100">{title}</h2>
        <p className="mt-1 text-sm text-cyan-600">{description}</p>
      </header>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
