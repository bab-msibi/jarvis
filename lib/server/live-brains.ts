import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import { Brain } from "@/types/brain";

const workspaceRoot = process.env.JARVIS_WORKSPACE_DIR ?? "/Users/admin/.openclaw/workspace";

async function pathExists(target: string) {
  return stat(target).then(() => true).catch(() => false);
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const nested = await Promise.all(entries.map(async (entry) => {
      const fullPath = path.join(/*turbopackIgnore: true*/ dir, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(fullPath);
      if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) return [fullPath];
      return [];
    }));
    return nested.flat();
  } catch {
    return [];
  }
}

async function newestMtime(paths: string[]) {
  const stats = await Promise.all(paths.map((file) => stat(file).catch(() => null)));
  const newest = stats.reduce((latest, item) => item ? Math.max(latest, item.mtimeMs) : latest, 0);
  return newest ? new Date(newest).toISOString() : new Date().toISOString();
}

function brain(params: {
  id: string;
  name: string;
  description: string;
  purpose: string;
  files: string[];
  knowledgeSource: string;
  capabilities: string[];
  active: boolean;
}): Brain {
  const now = new Date().toISOString();
  return {
    id: params.id,
    name: params.name,
    version: "live",
    status: params.active ? "ACTIVE" : "IDLE",
    description: params.description,
    purpose: params.purpose,
    linkedAgents: ["OpenClaw main"],
    linkedModels: ["Configured by runtime"],
    knowledgeSource: params.knowledgeSource,
    memorySource: `${params.files.length} markdown files detected`,
    lastUpdated: now,
    createdAt: now,
    capabilities: params.capabilities,
    syncStatus: params.active ? "SYNCED" : "FAILED"
  };
}

export async function getLiveBrains(): Promise<Brain[]> {
  const memoryDir = path.join(/*turbopackIgnore: true*/ workspaceRoot, "memory");
  const secondBrainDir = path.join(/*turbopackIgnore: true*/ workspaceRoot, "second-brain");
  const projectsDir = path.join(/*turbopackIgnore: true*/ workspaceRoot, "projects");
  const jarvisDir = path.join(/*turbopackIgnore: true*/ workspaceRoot, "jarvis");

  const [memoryExists, secondBrainExists, projectsExists, jarvisExists] = await Promise.all([
    pathExists(memoryDir),
    pathExists(secondBrainDir),
    pathExists(projectsDir),
    pathExists(jarvisDir)
  ]);

  const [memoryFiles, secondBrainFiles, projectFiles, jarvisDocs] = await Promise.all([
    memoryExists ? listMarkdownFiles(memoryDir) : [],
    secondBrainExists ? listMarkdownFiles(secondBrainDir) : [],
    projectsExists ? listMarkdownFiles(projectsDir) : [],
    jarvisExists ? listMarkdownFiles(jarvisDir).then((files) => files.filter((file) => !file.includes("node_modules"))) : []
  ]);

  const coreFiles = ["MEMORY.md", "AGENTS.md", "SOUL.md", "USER.md", "TOOLS.md", "HEARTBEAT.md"]
    .map((file) => path.join(/*turbopackIgnore: true*/ workspaceRoot, file));
  const existingCoreFiles = (await Promise.all(coreFiles.map(async (file) => await pathExists(file) ? file : null))).filter((file): file is string => Boolean(file));

  const brains: Brain[] = [
    brain({
      id: "brain-openclaw-memory",
      name: "OpenClaw Memory Brain",
      description: "Live workspace memory from MEMORY.md, daily logs, and core agent files.",
      purpose: "Persistent assistant context and session continuity.",
      files: [...existingCoreFiles, ...memoryFiles],
      knowledgeSource: workspaceRoot,
      capabilities: ["memory-recall", "session-continuity", "workspace-context"],
      active: existingCoreFiles.length > 0 || memoryFiles.length > 0
    }),
    brain({
      id: "brain-second-brain",
      name: "Second Brain",
      description: "Structured Obsidian knowledge base in the workspace.",
      purpose: "Project notes, durable summaries, and knowledge graph context.",
      files: secondBrainFiles,
      knowledgeSource: secondBrainDir,
      capabilities: ["knowledge-graph", "project-notes", "obsidian-links"],
      active: secondBrainFiles.length > 0
    }),
    brain({
      id: "brain-projects",
      name: "Projects Brain",
      description: "Live project documentation and implementation notes.",
      purpose: "Project-specific context for SoccerZone, JARVIS, and workspace projects.",
      files: projectFiles,
      knowledgeSource: projectsDir,
      capabilities: ["project-context", "implementation-notes", "workflow-docs"],
      active: projectFiles.length > 0
    }),
    brain({
      id: "brain-jarvis-build",
      name: "JARVIS Build Brain",
      description: "Documentation and notes inside the JARVIS app repository.",
      purpose: "Track JARVIS architecture, storage, remote nodes, and build decisions.",
      files: jarvisDocs,
      knowledgeSource: jarvisDir,
      capabilities: ["architecture-notes", "build-context", "runtime-docs"],
      active: jarvisDocs.length > 0
    })
  ];

  const enriched = await Promise.all(brains.map(async (item) => ({
    ...item,
    lastUpdated: await newestMtime(item.knowledgeSource === workspaceRoot ? [...existingCoreFiles, ...memoryFiles] : item.knowledgeSource === secondBrainDir ? secondBrainFiles : item.knowledgeSource === projectsDir ? projectFiles : jarvisDocs)
  })));

  return enriched;
}
