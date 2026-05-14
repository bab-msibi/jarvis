import {
  BarChart3,
  Brush,
  Bug,
  ClipboardCheck,
  FolderKanban,
  MonitorCog,
  ShieldCheck,
  type LucideProps
} from "lucide-react";
import { JSX } from "react";

import { Task } from "@/types/task";

export function TaskIcon({ name, ...props }: { name: string } & LucideProps): JSX.Element {
  if (/roadmap|planning|workflow/i.test(name)) return <FolderKanban {...props} />;
  if (/auth|security|access/i.test(name)) return <ShieldCheck {...props} />;
  if (/market|analysis|trend|insight|sales|report/i.test(name)) return <BarChart3 {...props} />;
  if (/design|ui|ux|creative|content/i.test(name)) return <Brush {...props} />;
  if (/qa|bug|test/i.test(name)) return <Bug {...props} />;
  if (/deploy|monitor/i.test(name)) return <MonitorCog {...props} />;
  return <ClipboardCheck {...props} />;
}

export function getInitials(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return "NA";
  const words = cleaned.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export function toInputDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function getTaskStatusGroup(tasks: Task[]) {
  return {
    notStarted: tasks.filter((task) => task.status === "NOT STARTED"),
    inProgress: tasks.filter((task) => task.status === "IN PROGRESS"),
    onHold: tasks.filter((task) => task.status === "ON HOLD"),
    completed: tasks.filter((task) => task.status === "COMPLETED"),
    failed: tasks.filter((task) => task.status === "FAILED")
  };
}
