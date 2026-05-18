import { NextResponse } from "next/server";

import { checkAgentGatewayHealth, checkAnthropicHealth, checkGeminiHealth, checkOllamaHealth, checkOpenAiHealth } from "@/lib/server/provider-clients";

export const runtime = "nodejs";

export async function GET() {
  const providers = await Promise.all([
    checkOllamaHealth(),
    checkOpenAiHealth(),
    checkAnthropicHealth(),
    checkGeminiHealth(),
    checkAgentGatewayHealth()
  ]);

  return NextResponse.json({ providers });
}
