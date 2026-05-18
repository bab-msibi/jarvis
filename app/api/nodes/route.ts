import { NextResponse } from "next/server";

import { getRemoteNodeHealthList } from "@/lib/server/remote-nodes";

export const runtime = "nodejs";

export async function GET() {
  const result = await getRemoteNodeHealthList();
  return NextResponse.json(result);
}
