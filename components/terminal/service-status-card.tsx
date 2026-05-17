import { TerminalService } from "@/types/terminal";
import { TerminalStatusBadge } from "@/components/terminal/terminal-status-badge";

type ServiceStatusCardProps = {
  service: TerminalService;
  onRestart: (service: TerminalService) => void;
};

export function ServiceStatusCard({ service, onRestart }: ServiceStatusCardProps) {
  return (
    <div className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-cyan-100">{service.name}</p>
        <TerminalStatusBadge status={service.status} />
      </div>
      <p className="mt-1 text-xs text-cyan-600">{service.description}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-cyan-500">
        <span>{service.port}</span>
        <span>{service.uptime}</span>
      </div>
      <button
        className="mt-2 inline-flex rounded-md border border-cyan-700/45 px-2 py-1 text-xs text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
        onClick={() => onRestart(service)}
        type="button"
      >
        Restart
      </button>
    </div>
  );
}
