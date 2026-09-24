import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  helper: string;
  icon: LucideIcon;
}

export default function AdminStatCard({ label, value, helper, icon: Icon }: Props) {
  return (
    <div className="rounded-2xl border border-slate-700/70 bg-[#111b2c] p-5 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.9)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{helper}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}
