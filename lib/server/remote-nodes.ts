import { remoteNodes as seedRemoteNodes } from "@/lib/data/remote-nodes";
import { fetchWithTimeout, getErrorMessage } from "@/lib/server/http";
import { RemoteNode, RemoteNodeChatRequest, RemoteNodeHealth } from "@/types/remote-node";
import { SystemStats } from "@/types/system";

const REMOTE_NODE_TIMEOUT_MS = 3500;

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

function parseEnvRemoteNodes(): RemoteNode[] {
  const raw = process.env.JARVIS_REMOTE_NODES?.trim();
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Partial<RemoteNode>[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((node): node is RemoteNode => Boolean(node.id && node.name && node.baseUrl))
      .map((node) => ({
        id: node.id,
        name: node.name,
        role: node.role ?? "remote",
        baseUrl: normalizeBaseUrl(node.baseUrl),
        description: node.description ?? "Remote JARVIS node",
        enabled: node.enabled ?? true,
        requiresApprovalForActions: node.requiresApprovalForActions ?? true,
        tags: node.tags ?? ["remote"]
      }));
  } catch {
    return [];
  }
}

export function getRemoteNodes(): RemoteNode[] {
  const configured = parseEnvRemoteNodes();
  const nodes = [...seedRemoteNodes, ...configured];
  const seen = new Set<string>();
  return nodes
    .map((node) => ({ ...node, baseUrl: normalizeBaseUrl(node.baseUrl) }))
    .filter((node) => {
      if (seen.has(node.id)) return false;
      seen.add(node.id);
      return node.enabled;
    });
}

export function getRemoteNode(nodeId: string) {
  return getRemoteNodes().find((node) => node.id === nodeId);
}

function localHealth(node: RemoteNode): RemoteNodeHealth {
  return {
    node,
    status: "online",
    connected: true,
    checkedAt: new Date().toISOString(),
    latencyMs: 0,
    message: "Local node is this JARVIS runtime."
  };
}

export async function checkRemoteNodeHealth(node: RemoteNode): Promise<RemoteNodeHealth> {
  if (node.baseUrl === "local" || node.baseUrl.includes("127.0.0.1:3000")) return localHealth(node);

  const started = Date.now();
  try {
    const response = await fetchWithTimeout(`${node.baseUrl}/api/system/health`, { cache: "no-store" }, REMOTE_NODE_TIMEOUT_MS);
    const latencyMs = Date.now() - started;
    if (!response.ok) {
      return {
        node,
        status: "warning",
        connected: false,
        checkedAt: new Date().toISOString(),
        latencyMs,
        message: `Node returned ${response.status}`
      };
    }

    const payload = await response.json() as { stats?: SystemStats };
    return {
      node,
      status: payload.stats?.status ?? "online",
      connected: true,
      checkedAt: new Date().toISOString(),
      latencyMs,
      message: "Remote node reachable",
      system: payload.stats
    };
  } catch (error) {
    return {
      node,
      status: "offline",
      connected: false,
      checkedAt: new Date().toISOString(),
      message: getErrorMessage(error)
    };
  }
}

export async function getRemoteNodeHealthList() {
  const nodes = getRemoteNodes();
  const health = await Promise.all(nodes.map(checkRemoteNodeHealth));
  return { nodes, health, checkedAt: new Date().toISOString() };
}

export async function sendRemoteNodeChat(node: RemoteNode, payload: RemoteNodeChatRequest) {
  if (!payload.prompt?.trim()) throw new Error("Prompt is required");
  if (node.baseUrl === "local" || node.baseUrl.includes("127.0.0.1:3000")) throw new Error("Local node chat should use /api/chat/message directly");

  const response = await fetchWithTimeout(`${node.baseUrl}/api/chat/message`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }, 30000);

  if (!response.ok) throw new Error(`Remote chat returned ${response.status}`);
  return await response.json() as unknown;
}
