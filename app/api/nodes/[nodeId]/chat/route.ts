import { NextResponse } from "next/server";

import { getRemoteNode, sendRemoteNodeChat } from "@/lib/server/remote-nodes";
import { getErrorMessage } from "@/lib/server/http";
import { RemoteNodeChatRequest } from "@/types/remote-node";

export const runtime = "nodejs";

type Params = { params: Promise<{ nodeId: string }> };

export async function POST(request: Request, { params }: Params) {
  const { nodeId } = await params;
  const node = getRemoteNode(nodeId);
  if (!node) return NextResponse.json({ error: "Unknown remote node" }, { status: 404 });

  try {
    const payload = await request.json() as RemoteNodeChatRequest;
    const result = await sendRemoteNodeChat(node, payload);
    return NextResponse.json({ node, result });
  } catch (error) {
    return NextResponse.json({ node, error: getErrorMessage(error) }, { status: 502 });
  }
}
