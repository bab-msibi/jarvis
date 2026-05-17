import { agents } from "@/lib/data/agents";
import { brains } from "@/lib/data/brains";
import { models } from "@/lib/data/models";
import { obsidianStats } from "@/lib/data/obsidian";
import { systemStats } from "@/lib/data/system";
import { tasks } from "@/lib/data/tasks";

export type DashboardData = {
  agents: typeof agents;
  tasks: typeof tasks;
  models: typeof models;
  brains: typeof brains;
  systemStats: typeof systemStats;
  obsidianStats: typeof obsidianStats;
};

export async function getDashboardData(): Promise<DashboardData> {
  return {
    agents,
    tasks,
    models,
    brains,
    systemStats,
    obsidianStats
  };
}
