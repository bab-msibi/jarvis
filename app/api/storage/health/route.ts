import { NextResponse } from "next/server";

import { getStorageStatus } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET() {
  const storage = await getStorageStatus();
  return NextResponse.json({ storage });
}
