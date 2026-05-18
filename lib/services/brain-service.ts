import { brains } from "@/lib/data/brains";

export async function getBrains() {
  return brains;
}

export async function getBrainById(brainId: string) {
  return brains.find((brain) => brain.id === brainId) ?? null;
}
