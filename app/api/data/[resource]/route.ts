import { NextResponse } from "next/server";

import { getGatewayBackedResource } from "@/lib/server/agent-gateway";
import { DataResource, updateDataResource } from "@/lib/server/database";

export const runtime = "nodejs";

const resources = new Set<DataResource>([
  "agents",
  "brains",
  "dashboard",
  "documents",
  "memory",
  "models",
  "monitor",
  "obsidian",
  "settings",
  "system",
  "tasks",
  "terminal",
  "workflows"
]);

type Params = { params: Promise<{ resource: string }> };

function isDataResource(resource: string): resource is DataResource {
  return resources.has(resource as DataResource);
}

export async function GET(_request: Request, { params }: Params) {
  const { resource } = await params;
  if (!isDataResource(resource)) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const result = await getGatewayBackedResource(resource);
  return NextResponse.json(result);
}

export async function PUT(request: Request, { params }: Params) {
  const { resource } = await params;
  if (!isDataResource(resource) || resource === "dashboard") return NextResponse.json({ error: "Unsupported writable resource" }, { status: 400 });

  const payload = await request.json();
  const data = await updateDataResource(resource, payload);
  return NextResponse.json({ data, source: "database" });
}
