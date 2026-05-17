import { checkOpenAiHealth } from "@/lib/server/provider-clients";

export async function getOpenAiHealth() {
  return checkOpenAiHealth();
}
