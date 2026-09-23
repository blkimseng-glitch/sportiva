import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  tone?: "default" | "danger";
}

export default function AdminIconButton({ label, children, tone = "default", className = "", ...props }: Props) {
  const toneClass = tone === "danger"
    ? "text-slate-500 hover:bg-red-500/10 hover:text-red-400"
    : "text-slate-500 hover:bg-slate-700/70 hover:text-slate-100";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${toneClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
