"use client";

import { ObsidianTab } from "@/types/obsidian";
import { cn } from "@/lib/utils";

type ObsidianTabsProps = {
  activeTab: ObsidianTab;
  onChange: (tab: ObsidianTab) => void;
};

const tabs: ObsidianTab[] = ["Overview", "Notes", "Graph View", "Tags", "Backlinks", "Daily Notes", "Attachments", "Settings"];

export function ObsidianTabs({ activeTab, onChange }: ObsidianTabsProps) {
  return (
    <div className="overflow-x-auto border-b border-cyan-900/35">
      <div className="flex min-w-max items-center gap-1">
        {tabs.map((tab) => (
          <button
            className={cn(
              "relative px-4 py-3 text-sm transition",
              activeTab === tab ? "text-cyan-100" : "text-cyan-600 hover:text-cyan-300"
            )}
            key={tab}
            onClick={() => onChange(tab)}
            type="button"
          >
            {tab}
            {activeTab === tab ? <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-cyan-400" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
