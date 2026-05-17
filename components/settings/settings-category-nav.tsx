"use client";

import { SettingsCategoryKey } from "@/types/settings";
import { cn } from "@/lib/utils";

type CategoryItem = {
  key: SettingsCategoryKey;
  label: string;
};

type SettingsCategoryNavProps = {
  categories: CategoryItem[];
  activeCategory: SettingsCategoryKey;
  onChange: (category: SettingsCategoryKey) => void;
};

export function SettingsCategoryNav({ categories, activeCategory, onChange }: SettingsCategoryNavProps) {
  return (
    <div className="space-y-3">
      <div className="panel-base rounded-xl p-3 sm:hidden">
        <label className="block space-y-1 text-xs uppercase tracking-[0.08em] text-cyan-600">
          <span>Category</span>
          <select
            className="h-10 w-full rounded-md border border-cyan-900/45 bg-sky-950/45 px-3 text-sm text-cyan-100 outline-none"
            onChange={(event) => onChange(event.target.value as SettingsCategoryKey)}
            value={activeCategory}
          >
            {categories.map((category) => (
              <option className="bg-[#071523]" key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="panel-base hidden rounded-xl p-2 sm:block xl:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              className={cn(
                "rounded-md border px-3 py-2 text-sm whitespace-nowrap transition",
                activeCategory === category.key
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-100"
                  : "border-transparent text-cyan-400 hover:border-cyan-700/45 hover:bg-cyan-500/10 hover:text-cyan-200"
              )}
              key={category.key}
              onClick={() => onChange(category.key)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <aside className="panel-base hidden rounded-xl p-3 xl:block">
        <p className="mb-2 px-2 text-xs uppercase tracking-[0.1em] text-cyan-600">Settings Categories</p>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              className={cn(
                "w-full rounded-md border px-3 py-2 text-left text-sm transition",
                activeCategory === category.key
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-100"
                  : "border-transparent text-cyan-400 hover:border-cyan-700/45 hover:bg-cyan-500/10 hover:text-cyan-200"
              )}
              key={category.key}
              onClick={() => onChange(category.key)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
