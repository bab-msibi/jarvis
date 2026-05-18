import { RemoteNode } from "@/types/remote-node";

export const remoteNodes: RemoteNode[] = [
  {
    id: "local-admins-macbook-pro",
    name: "Admin’s MacBook Pro",
    role: "primary",
    baseUrl: "http://127.0.0.1:3000",
    description: "Primary local JARVIS node for development, storage setup, and orchestration.",
    enabled: true,
    requiresApprovalForActions: true,
    tags: ["local", "primary", "macos"]
  }
];
