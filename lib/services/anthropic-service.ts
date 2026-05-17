import { checkAnthropicHealth } from "@/lib/server/provider-clients";

export async function getAnthropicHealth() {
  return checkAnthropicHealth();
}
