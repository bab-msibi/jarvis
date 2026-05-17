import { memoryData } from "@/lib/data/memory";

export async function getMemoryOverview() {
  return {
    data: memoryData,
    mocked: true
  };
}
