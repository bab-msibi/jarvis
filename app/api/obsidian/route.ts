import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { obsidianData, obsidianStats } from "@/lib/data/obsidian";

export const runtime = "nodejs";

async function scanVault(vaultPath: string) {
  const files = await readdir(vaultPath, { recursive: true });
  const markdownFiles = files.filter((file) => String(file).endsWith(".md"));
  let totalBytes = 0;
  for (const file of markdownFiles.slice(0, 500)) {
    try {
      const fileStat = await stat(path.join(vaultPath, String(file)));
      totalBytes += fileStat.size;
    } catch {
      // Ignore files deleted during scan.
    }
  }

  return {
    ...obsidianStats,
    vaultPath,
    files: files.length,
    notes: markdownFiles.length,
    size: `${Math.max(1, Math.round(totalBytes / 1024 / 1024))} MB`,
    lastSync: "live scan",
    syncStatus: "synced" as const
  };
}

export async function GET() {
  const vaultPath = process.env.OBSIDIAN_VAULT_PATH;
  if (!vaultPath) return NextResponse.json({ data: obsidianData, stats: obsidianStats, mocked: true, message: "OBSIDIAN_VAULT_PATH is not configured" });

  try {
    const stats = await scanVault(vaultPath);
    return NextResponse.json({ data: obsidianData, stats, mocked: false });
  } catch (error) {
    return NextResponse.json({ data: obsidianData, stats: obsidianStats, mocked: true, message: error instanceof Error ? error.message : String(error) }, { status: 200 });
  }
}
