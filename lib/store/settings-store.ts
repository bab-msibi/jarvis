"use client";

import { create } from "zustand";

import { settingsDefaults } from "@/lib/data/settings";
import { JarvisSettings, SettingsCategoryKey } from "@/types/settings";

type SettingsStoreState = {
  selectedCategory: SettingsCategoryKey;
  savedSettings: JarvisSettings;
  draftSettings: JarvisSettings;
  hasUnsavedChanges: boolean;
  setSelectedCategory: (category: SettingsCategoryKey) => void;
  setDraftSettings: (settings: JarvisSettings) => void;
  saveSettings: (settings: JarvisSettings) => void;
  resetToSaved: () => void;
  resetToDefaults: () => void;
};

function isEqual(a: JarvisSettings, b: JarvisSettings) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  selectedCategory: "general",
  savedSettings: settingsDefaults,
  draftSettings: settingsDefaults,
  hasUnsavedChanges: false,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setDraftSettings: (settings) =>
    set((state) => ({
      draftSettings: settings,
      hasUnsavedChanges: !isEqual(settings, state.savedSettings)
    })),
  saveSettings: (settings) =>
    set({
      savedSettings: settings,
      draftSettings: settings,
      hasUnsavedChanges: false
    }),
  resetToSaved: () =>
    set((state) => ({
      draftSettings: state.savedSettings,
      hasUnsavedChanges: false
    })),
  resetToDefaults: () =>
    set({
      savedSettings: settingsDefaults,
      draftSettings: settingsDefaults,
      hasUnsavedChanges: false
    })
}));
