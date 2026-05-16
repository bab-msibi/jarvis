import { TagStat } from "@/types/obsidian";

type TopTagsPanelProps = {
  tags: TagStat[];
};

export function TopTagsPanel({ tags }: TopTagsPanelProps) {
  const max = Math.max(1, ...tags.map((item) => item.count));

  return (
    <div className="space-y-2.5">
      {tags.map((item, index) => {
        const percent = Math.round((item.count / max) * 100);
        return (
          <div className="space-y-1" key={item.tag}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-200">{item.tag}</span>
              <span className="text-cyan-500">{item.count.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-sky-950/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-300"
                style={{
                  width: `${percent}%`,
                  opacity: 0.95 - index * 0.06
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
