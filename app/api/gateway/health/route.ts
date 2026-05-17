import { NextResponse } from "next/server";

import { checkAgentGatewayHealth } from "@/lib/server/provider-clients";

export const runtime = "nodejs";

export async function GET() {
  const gateway = await checkAgentGatewayHealth();
  return NextResponse.json(gateway, { status: gateway.connected ? 200 : 503 });
}
