
import { agents } from "@/lib/data/agents";
import { brains } from "@/lib/data/brains";
import { documentsData } from "@/lib/data/documents";
import { memoryData } from "@/lib/data/memory";
import { models } from "@/lib/data/models";
import { monitorData } from "@/lib/data/monitor";
import { obsidianData, obsidianStats } from "@/lib/data/obsidian";
import { remoteNodes } from "@/lib/data/remote-nodes";
import { settingsCategories, settingsDefaults, settingsHealthItems, settingsSystemProfile } from "@/lib/data/settings";
import { systemServices, systemStats } from "@/lib/data/system";
import { tasks } from "@/lib/data/tasks";
import { terminalData } from "@/lib/data/terminal";
import { workflowNodeConfigs } from "@/lib/data/workflow-nodes";
import { workflows } from "@/lib/data/workflows";
import { getJarvisStorageConfig, readJsonFile, writeJsonFileAtomic } from "@/lib/server/storage";

export type JarvisDatabase = {
  agents: typeof agents;
  brains: typeof brains;
  documents: typeof documentsData;
  memory: typeof memoryData;
  models: typeof models;
  monitor: typeof monitorData;
  obsidian: typeof obsidianData & { stats: typeof obsidianStats };
  remoteNodes: typeof remoteNodes;
  settings: {
    categories: typeof settingsCategories;
    defaults: typeof settingsDefaults;
    healthItems: typeof settingsHealthItems;
    systemProfile: typeof settingsSystemProfile;
  };
  system: {
    stats: typeof systemStats;
    services: typeof systemServices;
  };
  tasks: typeof tasks;
  terminal: typeof terminalData;
  workflows: {
    items: typeof workflows;
    nodeConfigs: typeof workflowNodeConfigs;
  };
};

export type DataResource = keyof JarvisDatabase | "dashboard";

function getDatabasePath() {
  return getJarvisStorageConfig().dbPath;
}

export function createSeedDatabase(): JarvisDatabase {
  return {
    agents,
    brains,
    documents: documentsData,
    memory: memoryData,
    models,
    monitor: monitorData,
    obsidian: { ...obsidianData, stats: obsidianStats },
    remoteNodes,
    settings: {
      categories: settingsCategories,
      defaults: settingsDefaults,
      healthItems: settingsHealthItems,
      systemProfile: settingsSystemProfile
    },
    system: {
      stats: systemStats,
      services: systemServices
    },
    tasks,
    terminal: terminalData,
    workflows: {
      items: workflows,
      nodeConfigs: workflowNodeConfigs
    }
  };
}

async function writeDatabase(db: JarvisDatabase) {
  await writeJsonFileAtomic(getDatabasePath(), db);
}

export async function getDatabase(): Promise<JarvisDatabase> {
  try {
    const parsed = await readJsonFile<Partial<JarvisDatabase>>(getDatabasePath());
    return { ...createSeedDatabase(), ...parsed };
  } catch {
    const seeded = createSeedDatabase();
    await writeDatabase(seeded);
    return seeded;
  }
}

export async function getDataResource(resource: DataResource) {
  const db = await getDatabase();
  if (resource === "dashboard") {
    return {
      agents: db.agents,
      tasks: db.tasks,
      models: db.models,
      brains: db.brains,
      systemStats: db.system.stats,
      obsidianStats: db.obsidian.stats,
      remoteNodes: db.remoteNodes
    };
  }
  return db[resource];
}

export async function updateDataResource<T extends keyof JarvisDatabase>(resource: T, value: JarvisDatabase[T]) {
  const db = await getDatabase();
  const next = { ...db, [resource]: value };
  await writeDatabase(next);
  return next[resource];
}
