import { NextResponse } from "next/server";

import { systemServices, systemStats } from "@/lib/data/system";
import { checkAgentGatewayHealth, checkOllamaHealth } from "@/lib/server/provider-clients";

export const runtime = "nodejs";

export async function GET() {
  const [gateway, ollama] = await Promise.all([checkAgentGatewayHealth(), checkOllamaHealth()]);
  const services = systemServices.map((service) => {
    if (service.name === "Agent Gateway") return { ...service, status: gateway.connected ? "online" : "warning", mocked: false, lastChecked: gateway.message };
    if (service.name === "Ollama Service") return { ...service, status: ollama.connected ? "online" : "warning", mocked: false, lastChecked: ollama.message };
    return service;
  });

  return NextResponse.json({ stats: systemStats, services });
}
