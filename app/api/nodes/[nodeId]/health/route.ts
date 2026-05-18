import { NextResponse } from "next/server";

import { checkRemoteNodeHealth, getRemoteNode } from "@/lib/server/remote-nodes";

export const runtime = "nodejs";

type Params = { params: Promise<{ nodeId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { nodeId } = await params;
  const node = getRemoteNode(nodeId);
  if (!node) return NextResponse.json({ error: "Unknown remote node" }, { status: 404 });

  const health = await checkRemoteNodeHealth(node);
  return NextResponse.json(health, { status: health.connected ? 200 : 503 });
}
