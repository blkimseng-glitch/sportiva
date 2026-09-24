import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

export function AdminTableLoading({ label = "កំពុងទាញទិន្នន័យ..." }: { label?: string }) {
  return (
    <div className="flex min-h-56 items-center justify-center gap-2 text-sm text-slate-500">
      <LoaderCircle size={17} className="animate-spin text-blue-400" />
      {label}
    </div>
  );
}

export function AdminTableEmpty({ label = "មិនមានទិន្នន័យ" }: { label?: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center text-center">
      <Inbox size={31} className="text-slate-700" />
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  );
}

export function AdminErrorState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center text-center px-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <AlertCircle size={20} />
      </div>
      <p className="mt-3 max-w-md text-sm text-slate-400">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
