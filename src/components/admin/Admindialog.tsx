"use client";

import { AlertTriangle } from "lucide-react";
import AdminModal from "@/components/admin/AdminModal";

interface Props {
  open: boolean;
  title: string;
  message: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AdminConfirmDialog({ open, title, message, busy = false, onConfirm, onCancel }: Props) {
  return (
    <AdminModal open={open} title={title} onClose={onCancel} busy={busy}>
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <AlertTriangle size={21} />
        </div>
        <div>
          <p className="text-sm leading-6 text-slate-300">{message}</p>
          <p className="mt-2 text-xs text-slate-500">សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onCancel} disabled={busy} className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50">បោះបង់</button>
        <button type="button" onClick={onConfirm} disabled={busy} className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50">
          {busy ? "កំពុងលុប..." : "លុប"}
        </button>
      </div>
    </AdminModal>
  );
}
