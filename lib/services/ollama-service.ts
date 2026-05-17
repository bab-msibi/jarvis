import { checkOllamaHealth } from "@/lib/server/provider-clients";

export async function getOllamaHealth() {
  return checkOllamaHealth();
}
