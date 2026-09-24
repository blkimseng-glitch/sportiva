import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function AdminPageHeader({ title, description, action }: Props) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
