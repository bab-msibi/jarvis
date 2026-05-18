import { Agent } from "@/types/agent";

// Intentionally no dummy/demo agents here.
// The /agents page loads real local data from `openclaw status --json` via lib/server/live-agents.ts.
export const agents: Agent[] = [];
