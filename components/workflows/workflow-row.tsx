"use client";

import { CalendarClock, Eye, Play, RefreshCcw, Workflow as WorkflowIcon } from "lucide-react";

import { TriggerBadge } from "@/components/workflows/trigger-badge";
import { WorkflowActionMenu, WorkflowMenuAction } from "@/components/workflows/workflow-action-menu";
import { WorkflowStatusBadge } from "@/components/workflows/workflow-status-badge";
import { Workflow } from "@/types/workflow";

type WorkflowRowProps = {
  workflow: Workflow;
  mobile?: boolean;
  onOpen: (workflow: Workflow) => void;
  onRun: (workflow: Workflow) => void;
  onMenuAction: (workflow: Workflow, action: WorkflowMenuAction) => void;
};

const actionButtonClass =
  "rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100";

function agentTag(agent: string) {
  const initials = agent
    .split(/\s+/)
    .map((item) => item[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
  return initials || "AG";
}

export function WorkflowRow({ workflow, mobile, onOpen, onRun, onMenuAction }: WorkflowRowProps) {
  if (mobile) {
    return (
      <article
        className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45"
        onClick={() => onOpen(workflow)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <WorkflowIcon className="h-4 w-4 text-cyan-300" />
              <p className="truncate text-base text-cyan-100" title={workflow.name}>
                {workflow.name}
              </p>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-cyan-600">{workflow.description}</p>
          </div>
          <WorkflowStatusBadge status={workflow.status} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <TriggerBadge trigger={workflow.trigger} />
          <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-200">{agentTag(workflow.assignedAgent)}</span>
          <span className="truncate text-sm text-cyan-300">{workflow.assignedAgent}</span>
        </div>

        <div className="mt-2 text-xs text-cyan-600">
          {workflow.linkedModel} / {workflow.linkedBrain}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          <p className="text-cyan-500">
            Runs: {workflow.runs} | Success: {workflow.successRate}%
          </p>
          <p className="inline-flex items-center gap-1 text-cyan-600">
            <CalendarClock className="h-3.5 w-3.5" />
            {workflow.lastRun}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2" onClick={(event) => event.stopPropagation()}>
          <button aria-label={`Run ${workflow.name}`} className={actionButtonClass} onClick={() => onRun(workflow)} type="button">
            <Play className="h-4 w-4" />
          </button>
          <button aria-label={`View ${workflow.name}`} className={actionButtonClass} onClick={() => onOpen(workflow)} type="button">
            <Eye className="h-4 w-4" />
          </button>
          <button aria-label={`Configure trigger for ${workflow.name}`} className={actionButtonClass} onClick={() => onMenuAction(workflow, "trigger")} type="button">
            <RefreshCcw className="h-4 w-4" />
          </button>
          <WorkflowActionMenu onAction={(action) => onMenuAction(workflow, action)} />
        </div>
      </article>
    );
  }

  return (
    <tr className="border-b border-cyan-900/25 text-sm transition hover:bg-cyan-500/5">
      <td className="px-4 py-3">
        <button className="group flex min-w-0 items-start gap-2 text-left" onClick={() => onOpen(workflow)} type="button">
          <WorkflowIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
          <div className="min-w-0">
            <p className="truncate text-cyan-100 group-hover:text-cyan-50">{workflow.name}</p>
            <p className="truncate text-xs text-cyan-700">{workflow.description}</p>
          </div>
        </button>
      </td>
      <td className="max-w-[260px] px-3 py-3 text-cyan-300">
        <span className="line-clamp-1">{workflow.description}</span>
      </td>
      <td className="px-3 py-3">
        <TriggerBadge trigger={workflow.trigger} />
      </td>
      <td className="px-3 py-3">
        <div className="flex max-w-[230px] items-center gap-2">
          <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-200">{agentTag(workflow.assignedAgent)}</span>
          <span className="truncate text-cyan-200">{workflow.assignedAgent}</span>
        </div>
      </td>
      <td className="max-w-[190px] px-3 py-3 text-cyan-200">
        <span className="line-clamp-1">{workflow.linkedModel}</span>
      </td>
      <td className="max-w-[190px] px-3 py-3 text-cyan-200">
        <span className="line-clamp-1">{workflow.linkedBrain}</span>
      </td>
      <td className="px-3 py-3">
        <WorkflowStatusBadge status={workflow.status} />
      </td>
      <td className="px-3 py-3 text-cyan-200">{workflow.runs}</td>
      <td className="px-3 py-3 text-emerald-300">{workflow.successRate}%</td>
      <td className="whitespace-nowrap px-3 py-3 text-cyan-600">{workflow.lastRun}</td>
      <td className="px-3 py-3">
        <div className="flex items-center justify-end gap-2">
          <button aria-label={`Run ${workflow.name}`} className={actionButtonClass} onClick={() => onRun(workflow)} type="button">
            <Play className="h-4 w-4" />
          </button>
          <button aria-label={`View ${workflow.name}`} className={actionButtonClass} onClick={() => onOpen(workflow)} type="button">
            <Eye className="h-4 w-4" />
          </button>
          <button aria-label={`Configure trigger for ${workflow.name}`} className={actionButtonClass} onClick={() => onMenuAction(workflow, "trigger")} type="button">
            <RefreshCcw className="h-4 w-4" />
          </button>
          <WorkflowActionMenu onAction={(action) => onMenuAction(workflow, action)} />
        </div>
      </td>
    </tr>
  );
}
