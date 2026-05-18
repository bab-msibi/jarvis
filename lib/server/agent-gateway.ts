import { DataResource, getDataResource } from "@/lib/server/database";
import { fetchWithTimeout, getErrorMessage } from "@/lib/server/http";
import { getLiveAgents } from "@/lib/server/live-agents";
import { getLiveBrains } from "@/lib/server/live-brains";
import { getLiveModels } from "@/lib/server/live-models";
import { getLiveTasks } from "@/lib/server/live-tasks";

export type GatewayResourceResponse = {
  data: unknown;
  source: "agent-gateway" | "database";
  gateway?: {
    url: string;
    connected: boolean;
    message: string;
  };
};

const gatewayUrl = () => process.env.AGENT_GATEWAY_URL ?? "http://127.0.0.1:1878";

const resourcePaths: Partial<Record<DataResource, string[]>> = {
  agents: ["/api/agents", "/agents"],
  models: ["/api/models", "/models"],
  brains: ["/api/brains", "/brains"],
  tasks: ["/api/tasks", "/tasks"],
  workflows: ["/api/workflows", "/workflows"],
  documents: ["/api/documents", "/documents"],
  memory: ["/api/memory", "/memory"],
  system: ["/api/system", "/system"],
  monitor: ["/api/monitor", "/monitor"],
  terminal: ["/api/terminal", "/terminal"],
  obsidian: ["/api/obsidian", "/obsidian"],
  settings: ["/api/settings", "/settings"],
  dashboard: ["/api/dashboard", "/dashboard"]
};

async function tryGatewayResource(resource: DataResource) {
  const base = gatewayUrl();
  const paths = resourcePaths[resource] ?? [];

  for (const candidate of paths) {
    try {
      const response = await fetchWithTimeout(`${base}${candidate}`, { cache: "no-store" }, 2500);
      if (!response.ok) continue;
      const payload = await response.json() as { data?: unknown } | unknown;
      return {
        data: typeof payload === "object" && payload !== null && "data" in payload ? (payload as { data: unknown }).data : payload,
        source: "agent-gateway" as const,
        gateway: { url: base, connected: true, message: `Loaded ${resource} from Agent Gateway ${candidate}` }
      };
    } catch {
      // Try the next likely gateway route before falling back to local DB.
    }
  }

  return null;
}

export async function getGatewayBackedResource(resource: DataResource): Promise<GatewayResourceResponse> {
  const gateway = await tryGatewayResource(resource);
  if (gateway) return gateway;

  try {
    if (resource === "agents") {
      const liveAgents = await getLiveAgents();
      return {
        data: liveAgents,
        source: "database",
        gateway: { url: gatewayUrl(), connected: false, message: "Loaded live agents from this Mac via OpenClaw status." }
      };
    }

    if (resource === "brains") {
      const liveBrains = await getLiveBrains();
      return {
        data: liveBrains,
        source: "database",
        gateway: { url: gatewayUrl(), connected: false, message: "Loaded live brains from workspace knowledge sources." }
      };
    }

    if (resource === "models") {
      const liveModels = await getLiveModels();
      return {
        data: liveModels,
        source: "database",
        gateway: { url: gatewayUrl(), connected: false, message: "Loaded live models from this Mac and configured providers." }
      };
    }

    if (resource === "tasks") {
      const liveTasks = await getLiveTasks();
      return {
        data: liveTasks,
        source: "database",
        gateway: { url: gatewayUrl(), connected: false, message: "Loaded live task runs from OpenClaw." }
      };
    }

    const fallback = await getDataResource(resource);
    return {
      data: fallback,
      source: "database",
      gateway: { url: gatewayUrl(), connected: false, message: "Agent Gateway unavailable or route missing; using local database." }
    };
  } catch (error) {
    return {
      data: null,
      source: "database",
      gateway: { url: gatewayUrl(), connected: false, message: getErrorMessage(error) }
    };
  }
}
