import { NextResponse } from "next/server";

import { systemServices, systemStats } from "@/lib/data/system";
import { checkAgentGatewayHealth, checkOllamaHealth } from "@/lib/server/provider-clients";
import { getStorageStatus } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET() {
  const [gateway, ollama, storage] = await Promise.all([checkAgentGatewayHealth(), checkOllamaHealth(), getStorageStatus()]);
  const services = systemServices.map((service) => {
    if (service.name === "Agent Gateway") return { ...service, status: gateway.connected ? "online" : "warning", mocked: false, lastChecked: gateway.message };
    if (service.name === "Ollama Service") return { ...service, status: ollama.connected ? "online" : "warning", mocked: false, lastChecked: ollama.message };
    return service;
  });

  return NextResponse.json({
    stats: systemStats,
    services: [
      ...services,
      {
        id: "system-jarvis-storage",
        name: "JARVIS Storage",
        description: storage.isExternalVolume
          ? "Persistent data is configured on an external volume."
          : "Persistent data is using local project storage.",
        status: storage.status === "online" ? "online" : "warning",
        endpoint: storage.dbPath,
        lastChecked: storage.writable ? `writable via ${storage.source}` : storage.error ?? "not writable",
        mocked: false
      }
    ],
    storage
  });
}
