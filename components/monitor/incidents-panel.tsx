import { Incident } from "@/types/monitor";
import { IncidentCard } from "@/components/monitor/incident-card";

type IncidentsPanelProps = {
  incidents: Incident[];
  onResolve: (incident: Incident) => void;
};

export function IncidentsPanel({ incidents, onResolve }: IncidentsPanelProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-lg text-cyan-200">Incidents & Alerts</h3>
      </header>

      <div className="max-h-[360px] space-y-2 overflow-y-auto p-4">
        {incidents.length ? (
          incidents.map((incident) => <IncidentCard incident={incident} key={incident.id} onResolve={onResolve} />)
        ) : (
          <div className="rounded-lg border border-dashed border-cyan-900/45 px-4 py-6 text-center text-sm text-cyan-600">No incidents detected.</div>
        )}
      </div>
    </section>
  );
}
