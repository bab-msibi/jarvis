import { agents } from "@/lib/mock/agents";
import { brains } from "@/lib/mock/brains";
import { models } from "@/lib/mock/models";
import { obsidianStats } from "@/lib/mock/obsidian";
import { systemStats } from "@/lib/mock/system";
import { tasks } from "@/lib/mock/tasks";

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
