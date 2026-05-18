import { access, mkdir, readFile, readdir, rename, stat, statfs, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const projectRoot = process.env.JARVIS_PROJECT_ROOT ?? process.env.PWD ?? ".";

export type StorageSource = "DATABASE_URL" | "JARVIS_DATA_DIR" | "default";

export type JarvisStorageConfig = {
  source: StorageSource;
  dataDir: string;
  dbPath: string;
  isExternalVolume: boolean;
};

export type JarvisStorageStatus = JarvisStorageConfig & {
  status: "online" | "error";
  writable: boolean;
  dbExists: boolean;
  checkedAt: string;
  error?: string;
};

export type StorageCandidate = {
  id: string;
  label: string;
  mountPath: string;
  suggestedDataDir: string;
  suggestedDatabaseUrl: string;
  isExternalVolume: boolean;
  readable: boolean;
  totalBytes?: number;
  freeBytes?: number;
  error?: string;
};

function resolveFileDatabasePath(databaseUrl: string) {
  const rawPath = databaseUrl.replace(/^file:/, "");
  if (!rawPath) return null;
  return path.isAbsolute(rawPath) ? rawPath : path.join(/*turbopackIgnore: true*/ projectRoot, rawPath);
}

export function getJarvisStorageConfig(): JarvisStorageConfig {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl?.startsWith("file:")) {
    const dbPath = resolveFileDatabasePath(databaseUrl);
    if (dbPath) {
      const dataDir = path.dirname(dbPath);
      return {
        source: "DATABASE_URL",
        dataDir,
        dbPath,
        isExternalVolume: dbPath.startsWith("/Volumes/")
      };
    }
  }

  const configuredDataDir = process.env.JARVIS_DATA_DIR?.trim();
  const expandedDataDir = configuredDataDir?.replace(/^~(?=\/|$)/, os.homedir());
  const dataDir = expandedDataDir
    ? path.isAbsolute(expandedDataDir) ? expandedDataDir : path.join(/*turbopackIgnore: true*/ projectRoot, expandedDataDir)
    : path.join(/*turbopackIgnore: true*/ projectRoot, ".jarvis-data");

  return {
    source: configuredDataDir ? "JARVIS_DATA_DIR" : "default",
    dataDir,
    dbPath: path.join(dataDir, "database.json"),
    isExternalVolume: dataDir.startsWith("/Volumes/")
  };
}

export async function ensureJarvisDataDir() {
  const config = getJarvisStorageConfig();
  await mkdir(config.dataDir, { recursive: true });
  return config;
}

export async function readJsonFile<T>(filePath: string) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFileAtomic(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(tempPath, filePath);
}

async function getFilesystemStats(targetPath: string) {
  const stats = await statfs(targetPath);
  return {
    totalBytes: Number(stats.blocks) * Number(stats.bsize),
    freeBytes: Number(stats.bavail) * Number(stats.bsize)
  };
}

async function getStorageCandidate(label: string, mountPath: string, isExternalVolume: boolean): Promise<StorageCandidate> {
  const suggestedDataDir = path.join(mountPath, "JARVIS");
  try {
    await access(mountPath);
    const stats = await getFilesystemStats(mountPath);
    return {
      id: Buffer.from(mountPath).toString("base64url"),
      label,
      mountPath,
      suggestedDataDir,
      suggestedDatabaseUrl: `file:${path.join(suggestedDataDir, "database.json")}`,
      isExternalVolume,
      readable: true,
      ...stats
    };
  } catch (error) {
    return {
      id: Buffer.from(mountPath).toString("base64url"),
      label,
      mountPath,
      suggestedDataDir,
      suggestedDatabaseUrl: `file:${path.join(suggestedDataDir, "database.json")}`,
      isExternalVolume,
      readable: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function discoverStorageCandidates() {
  const candidates = [await getStorageCandidate("Current JARVIS project", projectRoot, false)];

  if (process.platform === "darwin") {
    const volumes = await readdir("/Volumes", { withFileTypes: true }).catch(() => []);
    const externalCandidates = await Promise.all(
      volumes
        .filter((entry) => entry.isDirectory() || entry.isSymbolicLink())
        .map((entry) => getStorageCandidate(entry.name, path.join("/Volumes", entry.name), true))
    );
    candidates.push(...externalCandidates);
  }

  return {
    platform: process.platform,
    detectedAt: new Date().toISOString(),
    candidates
  };
}

export async function getStorageStatus(): Promise<JarvisStorageStatus> {
  const config = getJarvisStorageConfig();
  const startedAt = new Date().toISOString();

  try {
    await ensureJarvisDataDir();
    await access(config.dataDir);
    const dbExists = await stat(config.dbPath).then(() => true).catch(() => false);

    return {
      ...config,
      status: "online" as const,
      writable: true,
      dbExists,
      checkedAt: startedAt
    };
  } catch (error) {
    return {
      ...config,
      status: "error" as const,
      writable: false,
      dbExists: false,
      checkedAt: startedAt,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
