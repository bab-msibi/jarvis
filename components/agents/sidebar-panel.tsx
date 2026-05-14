import { ReactNode } from "react";

type SidebarPanelProps = {
  title: string;
  children: ReactNode;
};

export function SidebarPanel({ title, children }: SidebarPanelProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h2 className="text-sm uppercase tracking-[0.08em] text-cyan-300">{title}</h2>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
