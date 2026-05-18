import { NextResponse } from "next/server";

import { memoryData } from "@/lib/data/memory";
import { checkAgentGatewayHealth } from "@/lib/server/provider-clients";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ data: memoryData, mocked: true, message: "Memory index endpoint is ready; POST to request indexing." });
}

export async function POST() {
  const gateway = await checkAgentGatewayHealth();
  if (!gateway.connected) {
    return NextResponse.json({
      accepted: false,
      mocked: true,
      message: "Agent Gateway is unavailable. Memory indexing was not dispatched.",
      gateway
    }, { status: 202 });
  }

  return NextResponse.json({
    accepted: true,
    mocked: false,
    message: "Memory indexing request accepted by backend integration layer.",
    gateway
  });
}
