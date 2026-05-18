import { systemServices, systemStats } from "@/lib/data/system";

export async function getSystemStats() {
  return {
    stats: systemStats,
    mocked: true
  };
}

export async function getSystemServices() {
  return systemServices;
}
