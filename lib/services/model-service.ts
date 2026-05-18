import { models } from "@/lib/data/models";

export async function getModels() {
  return models;
}

export async function getModelById(modelId: string) {
  return models.find((model) => model.id === modelId) ?? null;
}
