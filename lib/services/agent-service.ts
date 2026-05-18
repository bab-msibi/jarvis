import { agents } from "@/lib/data/agents";

export async function getAgents() {
  return agents;
}

export async function getAgentById(agentId: string) {
  return agents.find((agent) => agent.id === agentId) ?? null;
}
