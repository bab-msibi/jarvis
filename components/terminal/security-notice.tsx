import { ShieldAlert } from "lucide-react";

import { TerminalSecurityNotice } from "@/types/terminal";

type SecurityNoticeProps = {
  notices: TerminalSecurityNotice[];
};

export function SecurityNotice({ notices }: SecurityNoticeProps) {
  return (
    <section className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-3">
      <div className="mb-2 flex items-center gap-2 text-amber-200">
        <ShieldAlert className="h-4 w-4" />
        <h3 className="text-sm uppercase tracking-[0.08em]">Security Notice</h3>
      </div>
      <div className="space-y-1.5 text-xs text-amber-100/90">
        {notices.map((notice) => (
          <p key={notice.id}>- {notice.text}</p>
        ))}
      </div>
    </section>
  );
}
