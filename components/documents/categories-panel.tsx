import { FolderClosed } from "lucide-react";

import { DocumentCategoryStat } from "@/types/document";

type CategoriesPanelProps = {
  categories: DocumentCategoryStat[];
};

export function CategoriesPanel({ categories }: CategoriesPanelProps) {
  return (
    <section className="panel-base rounded-2xl">
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h3 className="text-sm uppercase tracking-[0.08em] text-cyan-300">Document Categories</h3>
      </header>
      <div className="space-y-2 p-4">
        {categories.map((category) => (
          <div className="flex items-center justify-between gap-2 text-sm" key={category.name}>
            <span className="inline-flex items-center gap-2 text-cyan-200">
              <FolderClosed className="h-3.5 w-3.5 text-cyan-500" />
              {category.name}
            </span>
            <span className="text-cyan-500">{category.count}</span>
          </div>
        ))}
        <button className="pt-1 text-sm text-cyan-400 transition hover:text-cyan-200" type="button">
          View all categories
        </button>
      </div>
    </section>
  );
}
