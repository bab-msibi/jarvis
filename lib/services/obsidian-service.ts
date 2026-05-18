import { obsidianData, obsidianStats } from "@/lib/data/obsidian";

export async function getObsidianOverview() {
  return {
    data: obsidianData,
    stats: obsidianStats,
    mocked: true
  };
}
