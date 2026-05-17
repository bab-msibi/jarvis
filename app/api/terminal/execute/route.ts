import { NextResponse } from "next/server";

import { executeTerminalCommand, TerminalExecutionRequest } from "@/lib/server/terminal-policy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json() as Partial<TerminalExecutionRequest>;
  if (!payload.sessionId || !payload.command) {
    return NextResponse.json({ error: "sessionId and command are required" }, { status: 400 });
  }

  const result = await executeTerminalCommand({
    sessionId: payload.sessionId,
    sessionName: payload.sessionName,
    command: payload.command,
    confirmed: Boolean(payload.confirmed)
  });

  return NextResponse.json(result, { status: result.allowed ? 200 : 403 });
}
