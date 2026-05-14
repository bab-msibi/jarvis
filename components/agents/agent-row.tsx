"use client";

import { Eye, MessageCircle, Cpu, MemoryStick } from "lucide-react";

import { AgentActionMenu, AgentMenuAction } from "@/components/agents/agent-action-menu";
import { AgentAvatar } from "@/components/agents/agent-avatar";
import { AgentStatusBadge } from "@/components/agents/agent-status-badge";
import { Agent } from "@/types/agent";

type AgentRowProps = {
  agent: Agent;
  mobile?: boolean;
  onChat: (agent: Agent) => void;
  onView: (agent: Agent) => void;
  onOpenProfile: (agent: Agent) => void;
  onMenuAction: (agent: Agent, action: AgentMenuAction) => void;
};

const actionButtonClassName =
  "rounded-md border border-cyan-900/35 bg-sky-950/60 p-2 text-cyan-300 transition hover:border-cyan-500/50 hover:text-cyan-100";

export function AgentRow({ agent, mobile, onChat, onView, onMenuAction, onOpenProfile }: AgentRowProps) {
  if (mobile) {
    return (
      <article
        className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/40"
        onClick={() => onOpenProfile(agent)}
      >
        <div className="flex items-start gap-3">
          <AgentAvatar initials={agent.initials} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-base text-cyan-100">{agent.name}</p>
                <p className="text-xs text-cyan-600">Last active: {agent.lastActive}</p>
              </div>
              <AgentStatusBadge status={agent.status} />
            </div>
            <p className="mt-2 text-sm text-cyan-300">{agent.role}</p>
            <p className="mt-2 text-sm text-sky-100">{agent.currentTask}</p>
            <p className="mt-2 text-xs text-cyan-600">Model: {agent.assignedModel}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-cyan-400">
              <p className="flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5" />
                {agent.cpuUsage}%
              </p>
              <p className="flex items-center gap-1">
                <MemoryStick className="h-3.5 w-3.5" />
                {agent.ramUsage}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2" onClick={(event) => event.stopPropagation()}>
          <button className={actionButtonClassName} onClick={() => onChat(agent)} type="button">
            <MessageCircle className="h-4 w-4" />
          </button>
          <button className={actionButtonClassName} onClick={() => onView(agent)} type="button">
            <Eye className="h-4 w-4" />
          </button>
          <AgentActionMenu onAction={(action) => onMenuAction(agent, action)} />
        </div>
      </article>
    );
  }

  return (
    <tr className="cursor-pointer border-b border-cyan-900/25 text-sm transition hover:bg-cyan-500/5" onClick={() => onOpenProfile(agent)}>
      <td className="whitespace-nowrap px-4 py-3">
        <div className="flex items-center gap-3">
          <AgentAvatar className="h-11 w-11" initials={agent.initials} />
          <div>
            <p className="text-base text-cyan-100">{agent.name}</p>
            <p className="text-xs text-cyan-600">Last active: {agent.lastActive}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-cyan-200">{agent.role}</td>
      <td className="px-3 py-3">
        <AgentStatusBadge status={agent.status} />
      </td>
      <td className="max-w-[300px] px-3 py-3 text-cyan-100">{agent.currentTask}</td>
      <td className="whitespace-nowrap px-3 py-3 text-cyan-100">{agent.assignedModel}</td>
      <td className="whitespace-nowrap px-3 py-3 text-cyan-200">
        <span className="inline-flex items-center gap-1">
          <Cpu className="h-4 w-4 text-cyan-400" />
          {agent.cpuUsage}%
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-cyan-200">
        <span className="inline-flex items-center gap-1">
          <MemoryStick className="h-4 w-4 text-cyan-400" />
          {agent.ramUsage}%
        </span>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center justify-end gap-2" onClick={(event) => event.stopPropagation()}>
          <button className={actionButtonClassName} onClick={() => onChat(agent)} type="button">
            <MessageCircle className="h-4 w-4" />
          </button>
          <button className={actionButtonClassName} onClick={() => onView(agent)} type="button">
            <Eye className="h-4 w-4" />
          </button>
          <AgentActionMenu onAction={(action) => onMenuAction(agent, action)} />
        </div>
      </td>
    </tr>
  );
}
