import { SettingsSystemProfile } from "@/types/settings";

type SystemProfilePanelProps = {
  profile: SettingsSystemProfile;
};

export function SystemProfilePanel({ profile }: SystemProfilePanelProps) {
  return (
    <div className="space-y-2 text-sm">
      <ProfileLine label="Version" value={profile.version} />
      <ProfileLine label="Device" value={profile.device} />
      <ProfileLine label="OS" value={profile.osVersion} />
      <ProfileLine label="Active Agents" value={String(profile.activeAgents)} />
      <ProfileLine label="Active Models" value={String(profile.activeModels)} />
      <ProfileLine label="Active Brains" value={String(profile.activeBrains)} />
    </div>
  );
}

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-cyan-900/30 bg-sky-950/30 px-3 py-2">
      <span className="text-cyan-500">{label}</span>
      <span className="text-cyan-100">{value}</span>
    </div>
  );
}
