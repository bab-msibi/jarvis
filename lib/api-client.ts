export type ApiDataResponse<T> = {
  data: T;
  source: "agent-gateway" | "database";
  gateway?: {
    url: string;
    connected: boolean;
    message: string;
  };
};

export async function fetchDataResource<T>(resource: string, fallback: T): Promise<ApiDataResponse<T>> {
  try {
    const response = await fetch(`/api/data/${resource}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to fetch ${resource}`);
    return await response.json() as ApiDataResponse<T>;
  } catch (error) {
    return {
      data: fallback,
      source: "database",
      gateway: {
        url: "local fallback",
        connected: false,
        message: error instanceof Error ? error.message : String(error)
      }
    };
  }
}
