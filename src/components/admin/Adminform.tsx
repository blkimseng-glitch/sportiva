import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function AdminField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}{required ? <span className="ml-1 text-blue-400">*</span> : null}</span>
      {children}
    </label>
  );
}

const inputClass = "w-full rounded-xl border border-slate-700/70 bg-[#0b1322] px-3 py-2.5 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-blue-500/60";

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-28 resize-y ${props.className ?? ""}`} />;
}

export function AdminSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}
