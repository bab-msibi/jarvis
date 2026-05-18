import { NextResponse } from "next/server";

import { discoverStorageCandidates } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET() {
  const storage = await discoverStorageCandidates();
  return NextResponse.json(storage);
}
