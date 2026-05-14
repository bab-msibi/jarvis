export type TaskPriority = "HIGH" | "MEDIUM" | "LOW" | "NONE";
export type TaskStatus = "NOT STARTED" | "IN PROGRESS" | "ON HOLD" | "COMPLETED" | "FAILED";

export type Task = {
  id: string;
  name: string;
  description: string;
  assignedAgent: string;
  linkedModel: string;
  linkedBrain: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  eta: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  tags: string[];
  estimatedHours: number;
};
