import { workflows } from "@/lib/data/workflows";

export async function getWorkflows() {
  return workflows;
}

export async function getWorkflowById(workflowId: string) {
  return workflows.find((workflow) => workflow.id === workflowId) ?? null;
}
