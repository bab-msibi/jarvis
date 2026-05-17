import { checkGeminiHealth } from "@/lib/server/provider-clients";

export async function getGeminiHealth() {
  return checkGeminiHealth();
}
