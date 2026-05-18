import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { Task, TaskPriority, TaskStatus } from "@/types/task";

const execFileAsync = promisify(execFile);

type OpenClawTaskStatus = "queued" | "running" | "succeeded" | "failed" | "timed_out" | "cancelled" | "lost" | string;

type OpenClawTask = {
  taskId?: string;
  runtime?: string;
  sourceId?: string;
  requesterSessionKey?: string;
  ownerKey?: string;
  scopeKind?: string;
  childSessionKey?: string;
  agentId?: string;
  runId?: string;
  label?: string;
  task?: string;
  status?: OpenClawTaskStatus;
  createdAt?: number;
  startedAt?: number;
  endedAt?: number;
  lastEventAt?: number;
  cleanupAfter?: number;
  error?: string;
  terminalSummary?: string;
};

type OpenClawTasksList = {
  count?: number;
  runtime?: string | null;
  status?: string | null;
  tasks?: OpenClawTask[];
};

function taskStatus(status?: OpenClawTaskStatus): TaskStatus {
  if (status === "running") return "IN PROGRESS";
  if (status === "queued") return "NOT STARTED";
  if (status === "succeeded") return "COMPLETED";
  if (status === "cancelled") return "ON HOLD";
  if (status === "failed" || status === "timed_out" || status === "lost") return "FAILED";
  return "ON HOLD";
}

function priority(status?: OpenClawTaskStatus): TaskPriority {
  if (status === "failed" || status === "timed_out" || status === "lost") return "HIGH";
  if (status === "running" || status === "queued") return "MEDIUM";
  if (status === "cancelled") return "LOW";
  return "NONE";
}

function progress(status?: OpenClawTaskStatus) {
  if (status === "succeeded") return 100;
  if (status === "running") return 50;
  if (status === "queued") return 5;
  return 0;
}

function iso(ms?: number) {
  return ms ? new Date(ms).toISOString() : new Date().toISOString();
}

function durationHours(start?: number, end?: number) {
  if (!start || !end || end < start) return 0;
  return Math.max(0.1, Math.round(((end - start) / 36_000) / 10));
}

function eta(item: OpenClawTask) {
  if (item.status === "succeeded") return "Done";
  if (item.status === "running") return "Running now";
  if (item.status === "queued") return "Queued";
  if (item.status === "failed" || item.status === "timed_out" || item.status === "lost") return "Needs review";
  if (item.status === "cancelled") return "Paused";
  return "Unknown";
}

function description(item: OpenClawTask) {
  const summary = item.terminalSummary || item.error;
  if (summary) return summary.replace(/\s+/g, " ").slice(0, 260);
  return `OpenClaw ${item.runtime ?? "task"} run ${item.runId ?? item.sourceId ?? item.taskId ?? ""}`.trim();
}

async function readOpenClawTasks(): Promise<OpenClawTasksList> {
  const { stdout } = await execFileAsync("openclaw", ["tasks", "list", "--json"], { timeout: 8000, maxBuffer: 1024 * 1024 * 4 });
  return JSON.parse(stdout) as OpenClawTasksList;
}

export async function getLiveTasks(): Promise<Task[]> {
  const payload = await readOpenClawTasks();

  return (payload.tasks ?? []).map((item) => ({
    id: item.taskId ?? item.runId ?? item.sourceId ?? `openclaw-task-${item.createdAt ?? Date.now()}`,
    name: item.label ?? item.task ?? `OpenClaw ${item.runtime ?? "Task"}`,
    description: description(item),
    assignedAgent: item.agentId ? `OpenClaw ${item.agentId}` : item.runtime ? `OpenClaw ${item.runtime}` : "OpenClaw runtime",
    linkedModel: "Configured by OpenClaw runtime",
    linkedBrain: "OpenClaw Memory Brain",
    priority: priority(item.status),
    status: taskStatus(item.status),
    progress: progress(item.status),
    eta: eta(item),
    createdAt: iso(item.createdAt),
    updatedAt: iso(item.lastEventAt ?? item.endedAt ?? item.startedAt ?? item.createdAt),
    dueDate: iso(item.cleanupAfter ?? item.endedAt ?? item.createdAt),
    tags: [item.runtime, item.status, item.scopeKind].filter((tag): tag is string => Boolean(tag)),
    estimatedHours: durationHours(item.startedAt ?? item.createdAt, item.endedAt ?? item.lastEventAt)
  }));
}
