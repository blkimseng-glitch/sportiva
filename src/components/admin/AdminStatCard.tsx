import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  helper: string;
  icon: LucideIcon;
}

export default function AdminStatCard({ label, value, helper, icon: Icon }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-xs font-medium text-slate-400">{helper}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}