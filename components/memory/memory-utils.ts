import { MemoryType } from "@/types/memory";

export function getInitials(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "NA";
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

export function getMemoryTypeLabel(type: MemoryType) {
  return type.charAt(0) + type.slice(1).toLowerCase();
}
