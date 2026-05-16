import { DocumentCategoryStat } from "@/types/document";

type TopCategoriesPanelProps = {
  categories: DocumentCategoryStat[];
};

export function TopCategoriesPanel({ categories }: TopCategoriesPanelProps) {
  const max = Math.max(1, ...categories.map((item) => item.count));

  return (
    <div className="space-y-2.5">
      {categories.map((item, index) => {
        const percent = Math.round((item.count / max) * 100);
        return (
          <div className="space-y-1" key={item.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-200">{item.name}</span>
              <span className="text-cyan-500">{item.count}</span>
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
