import { CalendarClock, Play, Workflow as WorkflowIcon } from "lucide-react";

import { TriggerBadge } from "@/components/workflows/trigger-badge";
import { WorkflowActionMenu, WorkflowMenuAction } from "@/components/workflows/workflow-action-menu";
import { WorkflowStatusBadge } from "@/components/workflows/workflow-status-badge";
import { Workflow } from "@/types/workflow";

type WorkflowGridProps = {
  workflows: Workflow[];
  onOpen: (workflow: Workflow) => void;
  onRun: (workflow: Workflow) => void;
  onMenuAction: (workflow: Workflow, action: WorkflowMenuAction) => void;
};

export function WorkflowGrid({ workflows, onOpen, onRun, onMenuAction }: WorkflowGridProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {workflows.map((workflow) => (
        <article className="panel-base rounded-2xl p-3.5 transition hover:border-cyan-500/45" key={workflow.id}>
          <div className="flex items-start justify-between gap-2">
            <button className="min-w-0 text-left" onClick={() => onOpen(workflow)} type="button">
              <div className="flex items-center gap-2">
                <WorkflowIcon className="h-4 w-4 text-cyan-300" />
                <p className="truncate text-cyan-100">{workflow.name}</p>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-cyan-600">{workflow.description}</p>
            </button>
            <WorkflowStatusBadge status={workflow.status} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <TriggerBadge trigger={workflow.trigger} />
            <span className="rounded-md border border-cyan-900/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-200">{workflow.assignedAgent}</span>
          </div>

          <p className="mt-2 text-xs text-cyan-600">
            {workflow.linkedModel} / {workflow.linkedBrain}
          </p>

          <div className="mt-2 flex items-center justify-between text-xs">
            <p className="text-cyan-400">
              Runs {workflow.runs} • {workflow.successRate}% success
            </p>
            <p className="inline-flex items-center gap-1 text-cyan-600">
              <CalendarClock className="h-3.5 w-3.5" />
              {workflow.lastRun}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              className="rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100"
              onClick={() => onRun(workflow)}
              type="button"
            >
              <Play className="h-4 w-4" />
            </button>
            <WorkflowActionMenu onAction={(action) => onMenuAction(workflow, action)} />
          </div>
        </article>
      ))}
    </section>
  );
}
