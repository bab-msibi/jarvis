import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bot,
  BrainCircuit,
  Database,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  MonitorCheck,
  Network,
  NotebookTabs,
  Settings,
  TerminalSquare,
  Workflow
} from "lucide-react";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

export const sidebarSections: SidebarSection[] = [
  {
    label: "Main",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
  },
  {
    label: "Core",
    items: [
      { label: "Agents", href: "/agents", icon: Bot },
      { label: "Models", href: "/models", icon: Activity },
      { label: "Brains", href: "/brains", icon: BrainCircuit },
      { label: "Tasks", href: "/tasks", icon: NotebookTabs },
      { label: "Workflows", href: "/workflows", icon: Workflow },
      { label: "Chat", href: "/chat", icon: MessageSquareText }
    ]
  },
  {
    label: "Knowledge",
    items: [
      { label: "Obsidian", href: "/obsidian", icon: Network },
      { label: "Documents", href: "/documents", icon: FileText },
      { label: "Memory", href: "/memory", icon: Database }
    ]
  },
  {
    label: "System",
    items: [
      { label: "Terminal", href: "/terminal", icon: TerminalSquare },
      { label: "Monitor", href: "/monitor", icon: MonitorCheck },
      { label: "Settings", href: "/settings", icon: Settings }
    ]
  }
];
