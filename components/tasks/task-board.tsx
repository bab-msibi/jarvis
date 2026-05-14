import { TaskColumn } from "@/components/tasks/task-column";
import { TaskMenuAction } from "@/components/tasks/task-action-menu";
import { getTaskStatusGroup } from "@/components/tasks/task-utils";
import { Task } from "@/types/task";

type TaskBoardProps = {
  tasks: Task[];
  onOpenDetails: (task: Task) => void;
  onMenuAction: (task: Task, action: TaskMenuAction) => void;
};

export function TaskBoard({ tasks, onOpenDetails, onMenuAction }: TaskBoardProps) {
  const grouped = getTaskStatusGroup(tasks);

  return (
    <section className="panel-base rounded-2xl p-3 sm:p-4">
      <header className="mb-3">
        <h2 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Task Board</h2>
      </header>
      <div className="grid gap-3 overflow-x-auto xl:grid-cols-5">
        <TaskColumn onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} tasks={grouped.notStarted} title="Not Started" tone="slate" total={grouped.notStarted.length} />
        <TaskColumn onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} tasks={grouped.inProgress} title="In Progress" tone="cyan" total={grouped.inProgress.length} />
        <TaskColumn onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} tasks={grouped.onHold} title="On Hold" tone="amber" total={grouped.onHold.length} />
        <TaskColumn onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} tasks={grouped.completed} title="Completed" tone="emerald" total={grouped.completed.length} />
        <TaskColumn onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} tasks={grouped.failed} title="Failed" tone="rose" total={grouped.failed.length} />
      </div>
    </section>
  );
}
