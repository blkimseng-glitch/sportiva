"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  busy?: boolean;
}

export default function AdminModal({ open, title, children, onClose, busy = false }: Props) {
  useEffect(() => {
    if (!open || busy) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [busy, onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
      {/* Backdrop ពណ៌ខ្មៅស្រទន់ស្រាលៗ */}
      <button className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-label="បិទ" onClick={busy ? undefined : onClose} />
      
      {/* Modal Card - ប្រែជា bg-white និង border-slate-200 */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 id="admin-modal-title" className="text-base font-semibold text-slate-800">{title}</h2>
          <AdminCloseButton disabled={busy} onClick={onClose} />
        </div>
        <div className="min-h-0 overflow-y-auto px-5 py-5 text-slate-700">{children}</div>
      </div>
    </div>
  );
}

function AdminCloseButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:opacity-40"
      aria-label="បិទបង្អួច"
    >
      <X size={18} />
    </button>
  );
}