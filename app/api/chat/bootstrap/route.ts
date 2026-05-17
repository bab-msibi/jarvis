import { NextResponse } from "next/server";

import { getChatBootstrap } from "@/lib/server/chat-persistence";

export const runtime = "nodejs";

export async function GET() {
  const data = await getChatBootstrap();
  return NextResponse.json(data);
}
